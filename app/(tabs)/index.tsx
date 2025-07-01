import { useCallback, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  runOnJS,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SAMPLE_PETS } from "@/data/pets";
import { Match, Pet } from "@/types/pet";
import MatchModal from "@/components/MatchModal";
import React from "react";

const SCREEN_WIDTH = Dimensions.get("window").width;
const CARD_WIDTH = SCREEN_WIDTH * 0.9;

export default function SwipeScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showMatch, setShowMatch] = useState(false);
  const translateX = useSharedValue(0);
  const rotate = useSharedValue(0);

  const handleMatch = useCallback(async (petId: string, liked: boolean) => {
    try {
      const match: Match = {
        petId,
        timestamp: Date.now(),
        isMatch: liked && Math.random() < 0.1, // 10% match rate
      };

      const matches = await AsyncStorage.getItem("matches");
      const existingMatches = matches ? JSON.parse(matches) : [];
      await AsyncStorage.setItem(
        "matches",
        JSON.stringify([...existingMatches, match])
      );

      if (match.isMatch) {
        setShowMatch(true);
      }
    } catch (error) {
      console.error("Error saving match:", error);
    }
  }, []);

  const onSwipe = useCallback(
    (direction: "left" | "right") => {
      const currentPet = SAMPLE_PETS[currentIndex];
      handleMatch(currentPet.id, direction === "right");
      setCurrentIndex((prev) => prev + 1);
      translateX.value = 0;
      rotate.value = 0;
    },
    [currentIndex, handleMatch]
  );

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = event.translationX;
      rotate.value = event.translationX / CARD_WIDTH;
    })
    .onEnd((event) => {
      if (Math.abs(event.velocityX) > 400) {
        translateX.value = withSpring(
          Math.sign(event.velocityX) * SCREEN_WIDTH * 1.5
        );
        runOnJS(onSwipe)(event.velocityX > 0 ? "right" : "left");
      } else {
        translateX.value = withSpring(0);
        rotate.value = withTiming(0);
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { rotate: `${rotate.value * 15}deg` },
    ],
  }));

  if (currentIndex >= SAMPLE_PETS.length) {
    return (
      <View style={styles.container}>
        <Text style={styles.noMoreText}>No more pets to show!</Text>
      </View>
    );
  }

  const pet = SAMPLE_PETS[currentIndex];

  return (
    <View style={styles.container}>
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.card, animatedStyle]}>
          <Image source={{ uri: pet.image }} style={styles.image} />
          <View
            style={[
              styles.infoContainer,
              pet.isShelter && styles.shelterContainer,
            ]}
          >
            <Text style={styles.name}>{pet.name}</Text>
            <Text style={styles.age}>{pet.age}</Text>
            <Text style={styles.description}>{pet.description}</Text>
            {pet.isShelter && (
              <View style={styles.shelterBadge}>
                <Text style={styles.shelterText}>Shelter Pet</Text>
              </View>
            )}
          </View>
        </Animated.View>
      </GestureDetector>

      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={[styles.actionButton, styles.passButton]}
          onPress={() => onSwipe("left")}
        >
          <Ionicons name="close" size={32} color="#FF4B4B" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.likeButton]}
          onPress={() => onSwipe("right")}
        >
          <Ionicons name="heart" size={32} color="#FFB5C2" />
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
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F8F8F8",
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_WIDTH * 1.5,
    borderRadius: 20,
    backgroundColor: "white",
    overflow: "hidden",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  image: {
    width: "100%",
    height: "70%",
    resizeMode: "cover",
  },
  infoContainer: {
    padding: 20,
    backgroundColor: "white",
  },
  shelterContainer: {
    backgroundColor: "#FFF9FA",
  },
  name: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 4,
  },
  age: {
    fontSize: 16,
    color: "#666",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: "#444",
    lineHeight: 20,
  },
  shelterBadge: {
    position: "absolute",
    top: -15,
    right: 20,
    backgroundColor: "#FFB5C2",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  shelterText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
    position: "absolute",
    bottom: 50,
  },
  actionButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  passButton: {
    backgroundColor: "white",
  },
  likeButton: {
    backgroundColor: "white",
  },
  noMoreText: {
    fontSize: 18,
    color: "#666",
  },
});
