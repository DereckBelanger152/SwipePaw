import React, { useRef } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, Platform } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  runOnJS,
  interpolate,
  withSpring,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Heart, X } from 'lucide-react-native';
import ActionButton from './ActionButton';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 40;
const SWIPE_THRESHOLD = 100;

interface Pet {
  id: string;
  name: string;
  image: string;
  caption: string;
  age: string;
  breed: string;
}

interface PetCardProps {
  pet: Pet;
  onSwipe: (direction: 'left' | 'right', petId: string) => void;
}

export default function PetCard({ pet, onSwipe }: PetCardProps) {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: () => {
      scale.value = withSpring(0.98);
    },
    onActive: (event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY * 0.2;
    },
    onEnd: (event) => {
      scale.value = withSpring(1);
      
      const shouldSwipeRight = event.translationX > SWIPE_THRESHOLD;
      const shouldSwipeLeft = event.translationX < -SWIPE_THRESHOLD;
      
      if (shouldSwipeRight) {
        translateX.value = withSpring(width);
        runOnJS(onSwipe)('right', pet.id);
      } else if (shouldSwipeLeft) {
        translateX.value = withSpring(-width);
        runOnJS(onSwipe)('left', pet.id);
      } else {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      }
    },
  });

  const cardStyle = useAnimatedStyle(() => {
    const rotate = interpolate(
      translateX.value,
      [-width / 2, 0, width / 2],
      [-15, 0, 15]
    );

    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { rotate: `${rotate}deg` },
        { scale: scale.value },
      ],
    };
  });

  const likeOpacity = useAnimatedStyle(() => ({
    opacity: interpolate(translateX.value, [0, SWIPE_THRESHOLD], [0, 1]),
  }));

  const passOpacity = useAnimatedStyle(() => ({
    opacity: interpolate(translateX.value, [-SWIPE_THRESHOLD, 0], [1, 0]),
  }));

  const handleLike = () => {
    translateX.value = withSpring(width);
    onSwipe('right', pet.id);
  };

  const handlePass = () => {
    translateX.value = withSpring(-width);
    onSwipe('left', pet.id);
  };

  return (
    <View style={styles.container}>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={[styles.card, cardStyle]}>
          <Image source={{ uri: pet.image }} style={styles.image} />
          
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.6)']}
            style={styles.gradient}
          >
            <View style={styles.petInfo}>
              <Text style={styles.petName}>{pet.name}</Text>
              <Text style={styles.petDetails}>{pet.age} • {pet.breed}</Text>
              <Text style={styles.petCaption}>{pet.caption}</Text>
            </View>
          </LinearGradient>

          {/* Like indicator */}
          <Animated.View style={[styles.indicator, styles.likeIndicator, likeOpacity]}>
            <Text style={styles.indicatorText}>LIKE</Text>
          </Animated.View>

          {/* Pass indicator */}
          <Animated.View style={[styles.indicator, styles.passIndicator, passOpacity]}>
            <Text style={styles.indicatorText}>PASS</Text>
          </Animated.View>
        </Animated.View>
      </PanGestureHandler>

      <View style={styles.buttonContainer}>
        <ActionButton
          onPress={handlePass}
          style={styles.passButton}
          icon={<X color="#FF6B8A" size={28} strokeWidth={2.5} />}
        />
        <ActionButton
          onPress={handleLike}
          style={styles.likeButton}
          icon={<Heart color="#4ECDC4" size={28} strokeWidth={2.5} />}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_WIDTH * 1.3,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '70%',
    resizeMode: 'cover',
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
    justifyContent: 'flex-end',
  },
  petInfo: {
    padding: 24,
  },
  petName: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  petDetails: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#F3F4F6',
    marginBottom: 8,
  },
  petCaption: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#E5E7EB',
    lineHeight: 20,
  },
  indicator: {
    position: 'absolute',
    top: 60,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 3,
  },
  likeIndicator: {
    right: 24,
    backgroundColor: 'rgba(78, 205, 196, 0.1)',
    borderColor: '#4ECDC4',
  },
  passIndicator: {
    left: 24,
    backgroundColor: 'rgba(255, 107, 138, 0.1)',
    borderColor: '#FF6B8A',
  },
  indicatorText: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 32,
    gap: 32,
  },
  passButton: {
    backgroundColor: '#FFFFFF',
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: '#FF6B8A',
  },
  likeButton: {
    backgroundColor: '#FFFFFF',
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: '#4ECDC4',
  },
});