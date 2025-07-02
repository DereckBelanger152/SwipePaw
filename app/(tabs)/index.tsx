// React hooks for state management and side effects
import { useCallback, useState } from "react";
// React Native UI components
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
// Animation library for smooth swipe animations
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  runOnJS,
} from "react-native-reanimated";
// Gesture handling for swipe detection
import { Gesture, GestureDetector } from "react-native-gesture-handler";
// Vector icons for action buttons
import { Ionicons } from "@expo/vector-icons";
// Local storage for persisting user data
import AsyncStorage from "@react-native-async-storage/async-storage";
// App data and types
import { SAMPLE_PETS } from "@/data/pets";
import { Match, Pet } from "@/types/pet";
import MatchModal from "@/components/MatchModal";
import React from "react";
// Firebase authentication
import { signOut } from "firebase/auth";
import { auth } from "@/services/firebaseAuth";
import { router } from "expo-router";

// Get screen dimensions for responsive design
const SCREEN_WIDTH = Dimensions.get("window").width;
const CARD_WIDTH = SCREEN_WIDTH * 0.9; // Cards take up 90% of screen width

// Main swipe screen component - this is the "Tinder for pets" interface
export default function SwipeScreen() {
  // State to track which pet we're currently showing
  const [currentIndex, setCurrentIndex] = useState(0);
  // State to control the match modal visibility
  const [showMatch, setShowMatch] = useState(false);

  // Animated values for smooth card movement
  const translateX = useSharedValue(0); // Horizontal position of card
  const rotate = useSharedValue(0); // Rotation angle of card

  // Function to handle when user makes a choice (swipe left/right)
  const handleMatch = useCallback(async (petId: string, liked: boolean) => {
    try {
      // Create a match object to store the user's choice
      const match: Match = {
        petId,
        timestamp: Date.now(),
        // 10% chance of mutual match if user liked the pet
        // In a real app, this would be determined by the pet owner/shelter
        isMatch: liked && Math.random() < 0.1,
      };

      // Load existing matches from phone storage
      const matches = await AsyncStorage.getItem("matches");
      const existingMatches = matches ? JSON.parse(matches) : [];

      // Save the new match to storage
      await AsyncStorage.setItem(
        "matches",
        JSON.stringify([...existingMatches, match])
      );

      // Show match modal if it's a mutual match
      if (match.isMatch) {
        setShowMatch(true);
      }
    } catch (error) {
      console.error("Error saving match:", error);
    }
  }, []);

  // Function called when card is swiped off screen
  const onSwipe = useCallback(
    (direction: "left" | "right") => {
      const currentPet = SAMPLE_PETS[currentIndex];
      // Save the match with liked = true for right swipe, false for left
      handleMatch(currentPet.id, direction === "right");
      // Move to next pet
      setCurrentIndex((prev) => prev + 1);
      // Reset card position for next card
      translateX.value = 0;
      rotate.value = 0;
    },
    [currentIndex, handleMatch]
  );

  // Gesture handler for swipe detection
  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      // Update card position as user drags
      translateX.value = event.translationX;
      // Rotate card based on horizontal movement (like Tinder cards)
      rotate.value = event.translationX / CARD_WIDTH;
    })
    .onEnd((event) => {
      // Check if user swiped fast enough to trigger action
      if (Math.abs(event.velocityX) > 400) {
        // Animate card off screen
        translateX.value = withSpring(
          Math.sign(event.velocityX) * SCREEN_WIDTH * 1.5
        );
        // Trigger swipe action (right if positive velocity, left if negative)
        runOnJS(onSwipe)(event.velocityX > 0 ? "right" : "left");
      } else {
        // Snap back to center if swipe wasn't strong enough
        translateX.value = withSpring(0);
        rotate.value = withTiming(0);
      }
    });

  // Animated style that applies to the card
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value }, // Move horizontally
      { rotate: `${rotate.value * 15}deg` }, // Rotate (15 degrees max)
    ],
  }));

  // Show "no more pets" message when we've gone through all pets
  if (currentIndex >= SAMPLE_PETS.length) {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={{ position: "absolute", top: 40, right: 20, zIndex: 10 }}
          onPress={async () => {
            await signOut(auth);
            router.replace("/(auth)/login");
          }}
        >
          <Text style={{ color: "#FF4757", fontWeight: "bold" }}>Sign Out</Text>
        </TouchableOpacity>
        <Text style={styles.noMoreText}>No more pets to show!</Text>
      </View>
    );
  }

  // Get the current pet to display
  const pet = SAMPLE_PETS[currentIndex];

  return (
    <View style={styles.container}>
      {/* Sign Out button */}
      <TouchableOpacity
        style={{ position: "absolute", top: 40, right: 20, zIndex: 10 }}
        onPress={async () => {
          await signOut(auth);
          router.replace("/(auth)/login");
        }}
      >
        <Text style={{ color: "#FF4757", fontWeight: "bold" }}>Sign Out</Text>
      </TouchableOpacity>
      {/* Gesture detector wraps the card to enable swipe gestures */}
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.card, animatedStyle]}>
          {/* Pet photo */}
          <Image source={{ uri: pet.image }} style={styles.image} />

          {/* Pet information section */}
          <View
            style={[
              styles.infoContainer,
              // Special styling for shelter pets
              pet.isShelter && styles.shelterContainer,
            ]}
          >
            <Text style={styles.name}>{pet.name}</Text>
            <Text style={styles.age}>{pet.age}</Text>
            <Text style={styles.description}>{pet.description}</Text>

            {/* Special badge for shelter pets */}
            {pet.isShelter && (
              <View style={styles.shelterBadge}>
                <Text style={styles.shelterText}>Shelter Pet</Text>
              </View>
            )}
          </View>
        </Animated.View>
      </GestureDetector>

      {/* Action buttons at bottom - alternative to swiping */}
      <View style={styles.actionButtons}>
        {/* Pass button (equivalent to swiping left) */}
        <TouchableOpacity
          style={[styles.actionButton, styles.passButton]}
          onPress={() => onSwipe("left")}
        >
          <Ionicons name="close" size={32} color="#FF4B4B" />
        </TouchableOpacity>

        {/* Like button (equivalent to swiping right) */}
        <TouchableOpacity
          style={[styles.actionButton, styles.likeButton]}
          onPress={() => onSwipe("right")}
        >
          <Ionicons name="heart" size={32} color="#FFB5C2" />
        </TouchableOpacity>
      </View>

      {/* Modal that appears when there's a mutual match */}
      <MatchModal
        isVisible={showMatch}
        pet={pet}
        onClose={() => setShowMatch(false)}
      />
    </View>
  );
}

// Styles for the swipe screen
const styles = StyleSheet.create({
  container: {
    flex: 1, // Take full screen height
    alignItems: "center", // Center items horizontally
    justifyContent: "center", // Center items vertically
    backgroundColor: "#F8F8F8", // Light gray background
  },

  // Main pet card styling
  card: {
    width: CARD_WIDTH, // 90% of screen width
    height: CARD_WIDTH * 1.5, // Maintain 2:3 aspect ratio
    borderRadius: 20, // Rounded corners
    backgroundColor: "white", // White background
    overflow: "hidden", // Hide content that extends beyond borders
    // Shadow effects for depth
    elevation: 5, // Android shadow
    shadowColor: "#000", // iOS shadow color
    shadowOffset: { width: 0, height: 2 }, // iOS shadow position
    shadowOpacity: 0.25, // iOS shadow transparency
    shadowRadius: 3.84, // iOS shadow blur
  },

  // Pet photo styling
  image: {
    width: "100%", // Full card width
    height: "70%", // 70% of card height
    resizeMode: "cover", // Crop image to fit, maintaining aspect ratio
  },

  // Container for pet information
  infoContainer: {
    padding: 20, // Space around text content
    backgroundColor: "white", // White background
  },

  // Special background for shelter pets
  shelterContainer: {
    backgroundColor: "#FFF9FA", // Very light pink background
  },

  // Pet name styling
  name: {
    fontSize: 24, // Large, prominent text
    fontWeight: "600", // Semi-bold
    marginBottom: 4, // Small space below
  },

  // Pet age styling
  age: {
    fontSize: 16, // Medium text size
    color: "#666", // Gray color
    marginBottom: 8, // Space below
  },

  // Pet description styling
  description: {
    fontSize: 14, // Smaller text for descriptions
    color: "#444", // Dark gray for readability
    lineHeight: 20, // Line spacing for better readability
  },

  // Shelter badge positioning and styling
  shelterBadge: {
    position: "absolute", // Position relative to parent container
    top: -15, // Move up to overlap card border
    right: 20, // Position from right edge
    backgroundColor: "#FFB5C2", // App's signature pink color
    paddingHorizontal: 12, // Horizontal padding
    paddingVertical: 6, // Vertical padding
    borderRadius: 20, // Fully rounded corners
  },

  // Text inside shelter badge
  shelterText: {
    color: "white", // White text on pink background
    fontSize: 12, // Small text
    fontWeight: "600", // Semi-bold
  },

  // Container for action buttons at bottom
  actionButtons: {
    flexDirection: "row", // Arrange buttons horizontally
    justifyContent: "space-around", // Equal spacing between buttons
    width: "80%", // 80% of screen width
    position: "absolute", // Position relative to screen
    bottom: 50, // 50px from bottom of screen
  },

  // Base styling for action buttons
  actionButton: {
    width: 64, // Fixed width
    height: 64, // Fixed height (circular)
    borderRadius: 32, // Half of width/height for perfect circle
    backgroundColor: "white", // White background
    alignItems: "center", // Center icon horizontally
    justifyContent: "center", // Center icon vertically
    // Shadow effects
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  // Pass button specific styling
  passButton: {
    backgroundColor: "white", // White background
  },

  // Like button specific styling
  likeButton: {
    backgroundColor: "white", // White background
  },

  // Text shown when no more pets available
  noMoreText: {
    fontSize: 18, // Medium text size
    color: "#666", // Gray color
  },
});
