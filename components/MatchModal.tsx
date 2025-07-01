// React hooks
import { useEffect } from "react";
// React Native UI components
import {
  Modal,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
// Animation library for smooth entrance effects
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withSequence,
  withTiming,
} from "react-native-reanimated";
// Type definitions
import { Pet } from "@/types/pet";
import React from "react";

// Get screen width for responsive sizing
const { width } = Dimensions.get("window");

// Props interface for the MatchModal component
interface MatchModalProps {
  isVisible: boolean; // Whether the modal should be shown
  pet: Pet; // The pet that was matched with
  onClose: () => void; // Function to call when modal is closed
}

// MatchModal component - celebratory popup when user gets a mutual match
// Similar to Tinder's "It's a Match!" screen
export default function MatchModal({
  isVisible,
  pet,
  onClose,
}: MatchModalProps) {
  // Animated values for entrance effects
  const scale = useSharedValue(0); // Size animation (starts at 0)
  const opacity = useSharedValue(0); // Fade in animation (starts invisible)

  // Effect to trigger animations when modal visibility changes
  useEffect(() => {
    if (isVisible) {
      // When showing: scale up with bounce effect, then settle
      scale.value = withSequence(
        withSpring(1.2), // First spring to 120% size
        withSpring(1) // Then spring back to normal size
      );
      // Fade in smoothly
      opacity.value = withTiming(1, { duration: 300 });
    } else {
      // When hiding: scale down and fade out
      scale.value = withSpring(0);
      opacity.value = withTiming(0);
    }
  }, [isVisible]);

  // Animated style for the background overlay
  const containerStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  // Animated style for the modal content (the white card)
  const contentStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    // Modal wrapper - covers full screen
    <Modal transparent visible={isVisible} animationType="fade">
      {/* Dark background overlay */}
      <Animated.View style={[styles.container, containerStyle]}>
        {/* Main modal content card */}
        <Animated.View style={[styles.content, contentStyle]}>
          {/* Pet's photo in circular frame */}
          <Image source={{ uri: pet.image }} style={styles.image} />

          {/* Text content */}
          <View style={styles.textContainer}>
            <Text style={styles.matchText}>It's a Match!</Text>
            <Text style={styles.description}>
              You and {pet.name} liked each other!
            </Text>
          </View>

          {/* Call-to-action button */}
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>Start Chatting</Text>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
}

// Styles for the match modal
const styles = StyleSheet.create({
  // Full screen overlay container
  container: {
    flex: 1, // Take full screen height
    backgroundColor: "rgba(0, 0, 0, 0.8)", // Semi-transparent black background
    justifyContent: "center", // Center content vertically
    alignItems: "center", // Center content horizontally
  },

  // Main modal content card
  content: {
    backgroundColor: "white", // White background
    borderRadius: 20, // Rounded corners
    padding: 20, // Space around content
    width: width * 0.8, // 80% of screen width
    alignItems: "center", // Center all content horizontally
  },

  // Pet's circular profile image
  image: {
    width: width * 0.4, // 40% of screen width
    height: width * 0.4, // Same height (square)
    borderRadius: width * 0.2, // Circular (half of width)
    marginBottom: 20, // Space below image
  },

  // Container for text content
  textContainer: {
    alignItems: "center", // Center text horizontally
    marginBottom: 20, // Space below text
  },

  // "It's a Match!" text
  matchText: {
    fontSize: 24, // Large, prominent text
    fontWeight: "600", // Semi-bold
    color: "#FFB5C2", // App's signature pink color
    marginBottom: 10, // Space below
  },

  // Description text
  description: {
    fontSize: 16, // Medium text size
    color: "#666", // Gray color
    textAlign: "center", // Center align text
  },

  // Start chatting button
  button: {
    backgroundColor: "#FFB5C2", // App's signature pink color
    paddingHorizontal: 30, // Horizontal padding
    paddingVertical: 12, // Vertical padding
    borderRadius: 25, // Fully rounded corners
  },

  // Button text
  buttonText: {
    color: "white", // White text on pink background
    fontSize: 16, // Medium text size
    fontWeight: "600", // Semi-bold
  },
});
