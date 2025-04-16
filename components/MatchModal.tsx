import { useEffect, useRef } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { Pet } from '@/types/pet';

const { width } = Dimensions.get('window');

interface MatchModalProps {
  isVisible: boolean;
  pet: Pet;
  onClose: () => void;
}

export default function MatchModal({
  isVisible,
  pet,
  onClose,
}: MatchModalProps) {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isVisible) {
      Animated.parallel([
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Reset to initial state (for next time it's shown)
      scaleAnim.setValue(0);
      opacityAnim.setValue(0);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <Modal transparent visible={isVisible} animationType="fade">
      <Animated.View style={[styles.container, { opacity: opacityAnim }]}>
        <Animated.View
          style={[styles.content, { transform: [{ scale: scaleAnim }] }]}
        >
          {pet?.image && (
            <Image source={{ uri: pet.image }} style={styles.image} />
          )}
          <View style={styles.textContainer}>
            <Text style={styles.matchText}>It's a Match!</Text>
            <Text style={styles.description}>
              You and {pet.name} liked each other!
            </Text>
          </View>
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>Start Chatting</Text>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    width: width * 0.8,
    alignItems: 'center',
  },
  image: {
    width: width * 0.4,
    height: width * 0.4,
    borderRadius: width * 0.2,
    marginBottom: 20,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  matchText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFB5C2',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#FFB5C2',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
