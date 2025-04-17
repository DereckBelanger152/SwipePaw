import { useState, useRef } from 'react';
import {
  Animated,
  PanResponder,
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Button,
} from 'react-native';
import { SAMPLE_PETS } from '@/data/pets';
import MatchModal from '@/components/MatchModal';
import { Heart, X } from 'lucide-react-native';
import { signOut } from 'firebase/auth';
import { auth } from '@/config/firebaseConfig';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function SwipeScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showMatch, setShowMatch] = useState(false);

  const position = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) =>
        Math.abs(gestureState.dx) > 10,
      onPanResponderMove: Animated.event(
        [null, { dx: position.x, dy: position.y }],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: (_, gesture) => {
        if (Math.abs(gesture.dx) > 120) {
          Animated.timing(position, {
            toValue: { x: gesture.dx > 0 ? SCREEN_WIDTH : -SCREEN_WIDTH, y: 0 },
            duration: 250,
            useNativeDriver: false,
          }).start(() => {
            position.setValue({ x: 0, y: 0 });
            setCurrentIndex((prev) => prev + 1);
            if (Math.random() < 0.1) setShowMatch(true);
          });
        } else {
          Animated.spring(position, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  if (currentIndex >= SAMPLE_PETS.length) {
    return (
      <View style={styles.container}>
        <View style={styles.logoutContainer}>
          <Button title="Logout" onPress={() => signOut(auth)} />
        </View>
        <Text style={styles.noMoreText}>No more pets to show!</Text>
      </View>
    );
  }

  const pet = SAMPLE_PETS[currentIndex];
  const rotate = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
    outputRange: ['-20deg', '0deg', '20deg'],
    extrapolate: 'clamp',
  });

  const animatedStyle = {
    transform: [...position.getTranslateTransform(), { rotate }],
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoutContainer}>
        <Button title="Logout" onPress={() => signOut(auth)} />
      </View>

      <Animated.View
        {...panResponder.panHandlers}
        style={[styles.card, animatedStyle]}
      >
        <Image source={{ uri: pet.image }} style={styles.image} />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{pet.name}</Text>
          <Text style={styles.age}>{pet.age}</Text>
          <Text style={styles.description}>{pet.description}</Text>
        </View>
      </Animated.View>

      <View style={styles.actionButtons}>
        <TouchableOpacity onPress={() => setCurrentIndex((prev) => prev + 1)}>
          <X color="#FF4B4B" size={32} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setCurrentIndex((prev) => prev + 1);
            if (Math.random() < 0.1) setShowMatch(true);
          }}
        >
          <Heart color="#FFB5C2" size={32} fill="#FFB5C2" />
        </TouchableOpacity>
      </View>

      <MatchModal
        isVisible={showMatch}
        pet={pet}
        onClose={() => setShowMatch(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
  },
  logoutContainer: {
    marginTop: 50,
    width: '100%',
    paddingHorizontal: 20,
    alignItems: 'flex-end',
  },
  card: {
    width: SCREEN_WIDTH * 0.9,
    height: SCREEN_WIDTH * 1.3,
    backgroundColor: '#fff',
    borderRadius: 20,
    elevation: 5,
    overflow: 'hidden',
    position: 'absolute',
    top: 100,
  },
  image: { width: '100%', height: '70%' },
  infoContainer: { padding: 20 },
  name: { fontSize: 24, fontWeight: 'bold' },
  age: { fontSize: 16, color: '#666' },
  description: { fontSize: 14, color: '#444' },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    position: 'absolute',
    bottom: 50,
  },
  noMoreText: { fontSize: 18, color: '#666', marginTop: 100 },
});
