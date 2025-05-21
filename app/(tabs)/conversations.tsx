import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  FlatList,
} from "react-native";
import { useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import { Layout } from "@/constants/Layout";
import RecentMatch from "@/components/conversations/RecentMatch";
import ConversationItem from "@/components/conversations/ConversationItem";
import { mockPets } from "@/data/mockData";

export default function ConversationsScreen() {
  const router = useRouter();

  // Get matched pets (only adoptable pets that have been matched)
  const matchedPets = mockPets.filter((pet) => pet.adoptable);

  // Handle navigating to a chat
  const handleOpenChat = (conversationId: string) => {
    router.push(`/chat/${conversationId}`);
  };

  // Find pet info by ID
  const getPetById = (petId: string) => {
    return mockPets.find((pet) => pet.id === petId);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Messages</Text>
      </View>

      {matchedPets.length > 0 ? (
        <>
          {/* Recent matches */}
          <View style={styles.recentMatchesContainer}>
            <Text style={styles.sectionTitle}>Recent Matches</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.recentMatchesContent}
            >
              {matchedPets.map((pet) => (
                <RecentMatch
                  key={pet.id}
                  pet={pet}
                  onPress={() => handleOpenChat(pet.id)}
                />
              ))}
            </ScrollView>
          </View>

          {/* Conversation list */}
          <View style={styles.conversationsContainer}>
            <Text style={styles.sectionTitle}>Messages</Text>
            <FlatList
              data={matchedPets}
              keyExtractor={(item) => item.id}
              renderItem={({ item: pet }) => (
                <ConversationItem
                  conversation={{
                    id: pet.id,
                    petId: pet.id,
                    lastMessage: {
                      id: `msg-${pet.id}`,
                      senderId: pet.id,
                      text: `Hi! Thanks for matching with ${pet.name}! How can I help you today?`,
                      timestamp: new Date(),
                      status: "delivered",
                    },
                    messages: [],
                    unreadCount: 1,
                    updatedAt: new Date(),
                  }}
                  pet={pet}
                  onPress={() => handleOpenChat(pet.id)}
                />
              )}
              contentContainerStyle={styles.conversationsList}
            />
          </View>
        </>
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateTitle}>No Matches Yet</Text>
          <Text style={styles.emptyStateText}>
            Start swiping to match with adoptable pets and chat with shelters!
          </Text>
        </View>
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
  },
  title: {
    fontFamily: "Poppins-Bold",
    fontSize: 24,
    color: Colors.text.primary,
  },
  recentMatchesContainer: {
    marginBottom: Layout.spacing.lg,
  },
  sectionTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 18,
    color: Colors.text.primary,
    marginBottom: Layout.spacing.sm,
    paddingHorizontal: Layout.spacing.lg,
  },
  recentMatchesContent: {
    paddingHorizontal: Layout.spacing.lg,
    paddingVertical: Layout.spacing.md,
  },
  conversationsContainer: {
    flex: 1,
  },
  conversationsList: {
    paddingHorizontal: Layout.spacing.lg,
    paddingBottom: Layout.spacing.xl,
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: Layout.spacing.xl,
  },
  emptyStateTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 20,
    color: Colors.text.primary,
    marginBottom: Layout.spacing.md,
    textAlign: "center",
  },
  emptyStateText: {
    fontFamily: "Inter-Regular",
    fontSize: 16,
    color: Colors.text.secondary,
    textAlign: "center",
    lineHeight: 24,
  },
});
