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
  withTiming,
  Extrapolate,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Heart, X, Star } from 'lucide-react-native';
import ActionButton from './ActionButton';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Responsive card dimensions
const getCardDimensions = () => {
  const cardWidth = Math.min(screenWidth * 0.9, 350);
  const cardHeight = cardWidth * 1.4;
  return { cardWidth, cardHeight };
};

const { cardWidth, cardHeight } = getCardDimensions();

// Swipe thresholds and animation constants
const SWIPE_THRESHOLD = cardWidth * 0.25;
const ROTATION_FACTOR = 0.1;
const SCALE_FACTOR = 0.02;

// Spring animation config matching Tinder's feel
const springConfig = {
  damping: 20,
  stiffness: 300,
  mass: 1,
};

const timingConfig = {
  duration: 400,
};

interface Pet {
  id: string;
  name: string;
  image: string;
  caption: string;
  age: string;
  breed: string;
  distance?: string;
}

interface SwipePawProps {
  pet: Pet;
  onSwipe: (direction: 'left' | 'right' | 'super', petId: string) => void;
  style?: any;
}

export default function SwipePaw({ pet, onSwipe, style }: SwipePawProps) {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: () => {
      // Subtle scale down on touch start
      scale.value = withSpring(0.98, springConfig);
    },
    onActive: (event) => {
      // Follow finger movement with slight vertical dampening
      translateX.value = event.translationX;
      translateY.value = event.translationY * 0.1;
    },
    onEnd: (event) => {
      // Reset scale
      scale.value = withSpring(1, springConfig);
      
      const velocity = event.velocityX;
      const translation = event.translationX;
      
      // Determine swipe direction based on translation and velocity
      const shouldSwipeRight = translation > SWIPE_THRESHOLD || velocity > 500;
      const shouldSwipeLeft = translation < -SWIPE_THRESHOLD || velocity < -500;
      const shouldSuperLike = event.translationY < -100 && Math.abs(translation) < 50;
      
      if (shouldSuperLike) {
        // Super like animation - slide up
        translateY.value = withTiming(-screenHeight, timingConfig);
        opacity.value = withTiming(0, timingConfig);
        runOnJS(onSwipe)('super', pet.id);
      } else if (shouldSwipeRight) {
        // Like animation - slide right
        translateX.value = withTiming(screenWidth + cardWidth, timingConfig);
        opacity.value = withTiming(0, timingConfig);
        runOnJS(onSwipe)('right', pet.id);
      } else if (shouldSwipeLeft) {
        // Dislike animation - slide left
        translateX.value = withTiming(-screenWidth - cardWidth, timingConfig);
        opacity.value = withTiming(0, timingConfig);
        runOnJS(onSwipe)('left', pet.id);
      } else {
        // Spring back to center
        translateX.value = withSpring(0, springConfig);
        translateY.value = withSpring(0, springConfig);
      }
    },
  });

  const cardStyle = useAnimatedStyle(() => {
    // Calculate rotation based on horizontal translation
    const rotate = interpolate(
      translateX.value,
      [-cardWidth, 0, cardWidth],
      [-15, 0, 15],
      Extrapolate.CLAMP
    );

    // Calculate scale based on vertical translation for super like
    const superLikeScale = interpolate(
      translateY.value,
      [-100, 0],
      [1.05, 1],
      Extrapolate.CLAMP
    );

    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { rotate: `${rotate}deg` },
        { scale: scale.value * superLikeScale },
      ],
      opacity: opacity.value,
    };
  });

  // Like indicator animation
  const likeOpacity = useAnimatedStyle(() => ({
    opacity: interpolate(
      translateX.value,
      [0, SWIPE_THRESHOLD],
      [0, 1],
      Extrapolate.CLAMP
    ),
    transform: [
      {
        scale: interpolate(
          translateX.value,
          [0, SWIPE_THRESHOLD],
          [0.8, 1.1],
          Extrapolate.CLAMP
        ),
      },
    ],
  }));

  // Dislike indicator animation
  const dislikeOpacity = useAnimatedStyle(() => ({
    opacity: interpolate(
      translateX.value,
      [-SWIPE_THRESHOLD, 0],
      [1, 0],
      Extrapolate.CLAMP
    ),
    transform: [
      {
        scale: interpolate(
          translateX.value,
          [-SWIPE_THRESHOLD, 0],
          [1.1, 0.8],
          Extrapolate.CLAMP
        ),
      },
    ],
  }));

  // Super like indicator animation
  const superLikeOpacity = useAnimatedStyle(() => ({
    opacity: interpolate(
      translateY.value,
      [-100, 0],
      [1, 0],
      Extrapolate.CLAMP
    ),
    transform: [
      {
        scale: interpolate(
          translateY.value,
          [-100, 0],
          [1.2, 0.8],
          Extrapolate.CLAMP
        ),
      },
    ],
  }));

  const handleLike = () => {
    translateX.value = withTiming(screenWidth + cardWidth, timingConfig);
    opacity.value = withTiming(0, timingConfig);
    onSwipe('right', pet.id);
  };

  const handleDislike = () => {
    translateX.value = withTiming(-screenWidth - cardWidth, timingConfig);
    opacity.value = withTiming(0, timingConfig);
    onSwipe('left', pet.id);
  };

  const handleSuperLike = () => {
    translateY.value = withTiming(-screenHeight, timingConfig);
    opacity.value = withTiming(0, timingConfig);
    onSwipe('super', pet.id);
  };

  return (
    <View style={[styles.container, style]}>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={[styles.card, cardStyle]}>
          <Image source={{ uri: pet.image }} style={styles.image} />
          
          {/* Gradient overlay */}
          <LinearGradient
            colors={['transparent', 'transparent', 'rgba(0,0,0,0.8)']}
            style={styles.gradient}
          >
            <View style={styles.petInfo}>
              <View style={styles.nameRow}>
                <Text style={styles.petName}>{pet.name}</Text>
                <Text style={styles.petAge}>{pet.age}</Text>
              </View>
              <Text style={styles.petBreed}>{pet.breed}</Text>
              {pet.distance && (
                <Text style={styles.petDistance}>{pet.distance} away</Text>
              )}
              <Text style={styles.petCaption}>{pet.caption}</Text>
            </View>
          </LinearGradient>

          {/* Like indicator */}
          <Animated.View style={[styles.indicator, styles.likeIndicator, likeOpacity]}>
            <Text style={[styles.indicatorText, styles.likeText]}>LIKE</Text>
          </Animated.View>

          {/* Dislike indicator */}
          <Animated.View style={[styles.indicator, styles.dislikeIndicator, dislikeOpacity]}>
            <Text style={[styles.indicatorText, styles.dislikeText]}>NOPE</Text>
          </Animated.View>

          {/* Super like indicator */}
          <Animated.View style={[styles.indicator, styles.superLikeIndicator, superLikeOpacity]}>
            <Text style={[styles.indicatorText, styles.superLikeText]}>SUPER LIKE</Text>
          </Animated.View>
        </Animated.View>
      </PanGestureHandler>

      {/* Action buttons */}
      <View style={styles.buttonContainer}>
        <ActionButton
          onPress={handleDislike}
          style={styles.dislikeButton}
          icon={<X color="#FF4458" size={24} strokeWidth={2.5} />}
        />
        <ActionButton
          onPress={handleSuperLike}
          style={styles.superLikeButton}
          icon={<Star color="#42CDF7" size={20} strokeWidth={2.5} />}
        />
        <ActionButton
          onPress={handleLike}
          style={styles.likeButton}
          icon={<Heart color="#42DCA3" size={24} strokeWidth={2.5} />}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: cardWidth,
    height: cardHeight,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60%',
    justifyContent: 'flex-end',
  },
  petInfo: {
    padding: 20,
    paddingBottom: 24,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 4,
  },
  petName: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginRight: 8,
  },
  petAge: {
    fontSize: 24,
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF',
  },
  petBreed: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#F3F4F6',
    marginBottom: 4,
  },
  petDistance: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#D1D5DB',
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
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 3,
  },
  likeIndicator: {
    right: 20,
    backgroundColor: 'rgba(66, 220, 163, 0.1)',
    borderColor: '#42DCA3',
    transform: [{ rotate: '15deg' }],
  },
  dislikeIndicator: {
    left: 20,
    backgroundColor: 'rgba(255, 68, 88, 0.1)',
    borderColor: '#FF4458',
    transform: [{ rotate: '-15deg' }],
  },
  superLikeIndicator: {
    alignSelf: 'center',
    backgroundColor: 'rgba(66, 205, 247, 0.1)',
    borderColor: '#42CDF7',
  },
  indicatorText: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    letterSpacing: 1,
  },
  likeText: {
    color: '#42DCA3',
  },
  dislikeText: {
    color: '#FF4458',
  },
  superLikeText: {
    color: '#42CDF7',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 24,
    gap: 16,
    alignItems: 'center',
  },
  dislikeButton: {
    backgroundColor: '#FFFFFF',
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  superLikeButton: {
    backgroundColor: '#FFFFFF',
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  likeButton: {
    backgroundColor: '#FFFFFF',
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
});