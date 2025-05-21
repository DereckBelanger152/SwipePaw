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
import { mockConversations, mockPets } from "@/data/mockData";

export default function ConversationsScreen() {
  const router = useRouter();

  // Get matched pets for the Recent Matches section
  const matchedPets = mockPets.filter((pet) =>
    mockConversations.some((conv) => conv.petId === pet.id)
  );

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
              onPress={() =>
                handleOpenChat(
                  mockConversations.find((c) => c.petId === pet.id)?.id || ""
                )
              }
            />
          ))}
        </ScrollView>
      </View>

      {/* Conversation list */}
      <View style={styles.conversationsContainer}>
        <Text style={styles.sectionTitle}>Messages</Text>
        <FlatList
          data={mockConversations}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            const pet = getPetById(item.petId);

            if (!pet) return null;

            return (
              <ConversationItem
                conversation={item}
                pet={pet}
                onPress={() => handleOpenChat(item.id)}
              />
            );
          }}
          contentContainerStyle={styles.conversationsList}
        />
      </View>
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
});
