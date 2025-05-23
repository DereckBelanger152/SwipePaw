// app/(tabs)/index.tsx
import React, { useState, useRef, useCallback } from "react";
import { View, StyleSheet, SafeAreaView, Text } from "react-native";
import { useRouter } from "expo-router";
import { X, Heart, Info } from "lucide-react-native";
import { Colors } from "@/constants/Colors";
import { Layout } from "@/constants/Layout";
import PetCard from "@/components/cards/PetCard";
import ActionButton from "@/components/ui/ActionButton";
import MatchModal from "@/components/cards/MatchModal";
import { mockPets, mockUser } from "@/data/mockData";
import { Pet, Conversation } from "@/types";
import { useLanguage } from "@/context/LanguageContext";

export default function DiscoverScreen() {
  const router = useRouter();
  const { t } = useLanguage();
  const [pets, setPets] = useState(mockPets);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [matchVisible, setMatchVisible] = useState(false);
  const [matchedPet, setMatchedPet] = useState<Pet | null>(null);
  const swipedPetsRef = useRef<Set<string>>(new Set());
  const [conversations, setConversations] = useState<Conversation[]>([]);

  // Current pet to display
  const currentPet = pets[currentIndex];

  // Create a new conversation
  const createConversation = (pet: Pet) => {
    const newConversation: Conversation = {
      id: `conv-${Date.now()}`,
      petId: pet.id,
      messages: [],
      lastMessage: {
        id: `msg-${Date.now()}`,
        senderId: pet.id,
        text: `Hi! Thanks for matching with ${pet.name}! How can I help you today?`,
        timestamp: new Date(),
        status: "delivered",
      },
      unreadCount: 1,
      updatedAt: new Date(),
    };

    setConversations((prev) => [...prev, newConversation]);
    return newConversation;
  };

  // Handle swipe actions
  const handleSwipeLeft = useCallback(() => {
    if (currentPet) {
      swipedPetsRef.current.add(currentPet.id);
      moveToNextPet();
    }
  }, [currentPet]);

  const handleSwipeRight = useCallback(() => {
    if (currentPet) {
      swipedPetsRef.current.add(currentPet.id);

      // Only create matches for adoptable pets
      if (currentPet.adoptable) {
        const conversation = createConversation(currentPet);
        setMatchedPet(currentPet);
        setMatchVisible(true);
      }

      moveToNextPet();
    }
  }, [currentPet]);

  const handleSwipeUp = useCallback(() => {
    if (currentPet) {
      router.push(`/pet/${currentPet.id}`);
    }
  }, [currentPet, router]);

  const moveToNextPet = useCallback(() => {
    setCurrentIndex((prevIndex) => {
      // If we've reached the end, reset to beginning
      if (prevIndex >= pets.length - 1) {
        return 0;
      }
      return prevIndex + 1;
    });
  }, [pets.length]);

  // Handle match modal actions
  const handleCloseMatch = () => {
    setMatchVisible(false);
    setMatchedPet(null);
  };

  const handleStartChat = () => {
    setMatchVisible(false);
    if (matchedPet) {
      const conversation = conversations.find((c) => c.petId === matchedPet.id);
      if (conversation) {
        router.push(`/chat/${conversation.id}`);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.appName}>{t("appName")}</Text>
      </View>

      <View style={styles.cardContainer}>
        {currentPet ? (
          <PetCard
            key={currentPet.id}
            pet={currentPet}
            onSwipeLeft={handleSwipeLeft}
            onSwipeRight={handleSwipeRight}
            onSwipeUp={handleSwipeUp}
          />
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>{t("messages.noMatches")}</Text>
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
    paddingBottom: 80,
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
