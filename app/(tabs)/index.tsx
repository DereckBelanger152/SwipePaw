import React, { useState, useRef } from "react";
import { View, StyleSheet, SafeAreaView, Text } from "react-native";
import { useRouter } from "expo-router";
import { X, Heart, Info } from "lucide-react-native";
import { Colors } from "@/constants/Colors";
import { Layout } from "@/constants/Layout";
import PetCard from "@/components/cards/PetCard";
import ActionButton from "@/components/ui/ActionButton";
import MatchModal from "@/components/cards/MatchModal";
import { mockPets, mockUser } from "@/data/mockData";
import { Pet } from "@/types";

export default function DiscoverScreen() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [matchVisible, setMatchVisible] = useState(false);
  const [matchedPet, setMatchedPet] = useState<Pet | null>(null);
  const swipedPetsRef = useRef<Set<string>>(new Set());

  // Current pet to display
  const currentPet = mockPets[currentIndex];

  // Handle swipe actions
  const handleSwipeLeft = () => {
    // Skip this pet
    swipedPetsRef.current.add(currentPet.id);
    // Move to next pet
    moveToNextPet();
  };

  const handleSwipeRight = () => {
    // Like this pet
    swipedPetsRef.current.add(currentPet.id);

    // Simulate a match (for demo purposes, every other like is a match)
    if (currentIndex % 2 === 0) {
      setMatchedPet(currentPet);
      setMatchVisible(true);
    }

    // Move to next pet
    moveToNextPet();
  };

  const handleSwipeUp = () => {
    // Navigate to pet details
    router.push(`/pet/${currentPet.id}`);
  };

  const moveToNextPet = () => {
    if (currentIndex < mockPets.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } else {
      // Reached the end of the list
      // In a real app, you'd fetch more pets
      setCurrentIndex(0); // For demo, loop back to start
    }
  };

  // Handle match modal actions
  const handleCloseMatch = () => {
    setMatchVisible(false);
    setMatchedPet(null);
  };

  const handleStartChat = () => {
    // In a real app, this would create a conversation
    setMatchVisible(false);
    if (matchedPet) {
      // Navigate to chat
      router.push(`/chat/${matchedPet.id}`);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.appName}>SwipePaw</Text>
      </View>

      <View style={styles.cardContainer}>
        {currentPet ? (
          <PetCard
            pet={currentPet}
            onSwipeLeft={handleSwipeLeft}
            onSwipeRight={handleSwipeRight}
            onSwipeUp={handleSwipeUp}
          />
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>
              No more pets to discover. Check back later!
            </Text>
          </View>
        )}
      </View>

      <View style={styles.actionsContainer}>
        <ActionButton
          icon={<X size={32} color="white" />}
          variant="negative"
          onPress={handleSwipeLeft}
          style={styles.actionButton}
        />

        <ActionButton
          icon={<Info size={32} color={Colors.primary.accent2} />}
          variant="info"
          onPress={handleSwipeUp}
          style={styles.actionButton}
        />

        <ActionButton
          icon={<Heart size={32} color="white" />}
          variant="primary"
          onPress={handleSwipeRight}
          style={styles.actionButton}
        />
      </View>

      {/* Match modal */}
      {matchedPet && (
        <MatchModal
          visible={matchVisible}
          pet={matchedPet}
          user={mockUser}
          onClose={handleCloseMatch}
          onStartChat={handleStartChat}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary.background,
  },
  header: {
    paddingHorizontal: Layout.spacing.lg,
    paddingVertical: Layout.spacing.md,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  appName: {
    fontFamily: "Poppins-Bold",
    fontSize: 24,
    color: Colors.primary.accent1,
  },
  cardContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 80, // Space for action buttons
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    paddingHorizontal: Layout.spacing.lg,
  },
  actionButton: {
    marginHorizontal: Layout.spacing.xs,
  },
  emptyState: {
    padding: Layout.spacing.xl,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyStateText: {
    fontFamily: "Poppins-Medium",
    fontSize: 18,
    color: Colors.text.secondary,
    textAlign: "center",
  },
});
