import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SAMPLE_PETS } from "@/data/pets";
import { Match, Pet, Message, Conversation } from "@/types/pet";
import React from "react";

export default function ConversationsScreen() {
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [message, setMessage] = useState("");
  const [matches, setMatches] = useState<Match[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);

  useEffect(() => {
    loadMatches();
  }, []);

  const loadMatches = async () => {
    try {
      const matchesData = await AsyncStorage.getItem("matches");
      const savedMatches = matchesData ? JSON.parse(matchesData) : [];
      setMatches(savedMatches);

      const conversationsData = await AsyncStorage.getItem("conversations");
      const savedConversations = conversationsData
        ? JSON.parse(conversationsData)
        : [];
      setConversations(savedConversations);
    } catch (error) {
      console.error("Error loading matches:", error);
    }
  };

  const getMatchedPets = () => {
    const matchedPetIds = matches
      .filter(
        (match) =>
          match.isMatch ||
          SAMPLE_PETS.find((pet) => pet.id === match.petId)?.isShelter
      )
      .map((match) => match.petId);

    return SAMPLE_PETS.filter((pet) => matchedPetIds.includes(pet.id));
  };

  const handleSendMessage = async () => {
    if (!selectedPet || !message.trim()) return;

    try {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: message.trim(),
        timestamp: Date.now(),
        isUser: true,
      };

      const existingConversation = conversations.find(
        (c) => c.petId === selectedPet.id
      );
      let updatedConversations: Conversation[];

      if (existingConversation) {
        updatedConversations = conversations.map((c) =>
          c.petId === selectedPet.id
            ? {
                ...c,
                messages: [...c.messages, newMessage],
                lastMessageTime: newMessage.timestamp,
              }
            : c
        );
      } else {
        updatedConversations = [
          ...conversations,
          {
            petId: selectedPet.id,
            messages: [newMessage],
            lastMessageTime: newMessage.timestamp,
          },
        ];
      }

      await AsyncStorage.setItem(
        "conversations",
        JSON.stringify(updatedConversations)
      );
      setConversations(updatedConversations);
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const renderItem = ({ item: pet }: { item: Pet }) => {
    const conversation = conversations.find((c) => c.petId === pet.id);
    const lastMessage =
      conversation?.messages[conversation.messages.length - 1];

    return (
      <TouchableOpacity
        style={[styles.conversationItem, pet.isShelter && styles.shelterItem]}
        onPress={() => setSelectedPet(pet)}
      >
        <Image source={{ uri: pet.image }} style={styles.avatar} />
        <View style={styles.conversationInfo}>
          <Text style={styles.petName}>{pet.name}</Text>
          {pet.isShelter && (
            <Text style={styles.shelterName}>{pet.shelterName}</Text>
          )}
          <Text style={styles.lastMessage} numberOfLines={1}>
            {lastMessage?.text || "Start a conversation!"}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderMessages = () => {
    if (!selectedPet) return null;

    const conversation = conversations.find((c) => c.petId === selectedPet.id);
    const messages = conversation?.messages || [];

    return (
      <View style={styles.chatContainer}>
        <View style={styles.chatHeader}>
          <TouchableOpacity onPress={() => setSelectedPet(null)}>
            <Text style={styles.backButton}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.chatTitle}>{selectedPet.name}</Text>
        </View>
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          style={styles.messagesList}
          renderItem={({ item }) => (
            <View
              style={[
                styles.messageContainer,
                item.isUser ? styles.userMessage : styles.petMessage,
              ]}
            >
              <Text style={styles.messageText}>{item.text}</Text>
            </View>
          )}
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            value={message}
            onChangeText={setMessage}
            placeholderTextColor="#999"
          />
          <TouchableOpacity
            style={styles.sendButton}
            onPress={handleSendMessage}
          >
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {selectedPet ? (
        renderMessages()
      ) : (
        <>
          <Text style={styles.title}>Messages</Text>
          <FlatList
            data={getMatchedPets()}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContainer}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    padding: 20,
    backgroundColor: "white",
  },
  listContainer: {
    padding: 10,
  },
  conversationItem: {
    flexDirection: "row",
    padding: 15,
    backgroundColor: "white",
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  shelterItem: {
    backgroundColor: "#FFF9FA",
    borderWidth: 1,
    borderColor: "#FFE5E9",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  conversationInfo: {
    flex: 1,
  },
  petName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 2,
  },
  shelterName: {
    fontSize: 12,
    color: "#FFB5C2",
    marginBottom: 4,
  },
  lastMessage: {
    fontSize: 14,
    color: "#666",
  },
  chatContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  chatHeader: {
    padding: 20,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    fontSize: 16,
    color: "#FFB5C2",
    marginRight: 15,
  },
  chatTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  messagesList: {
    flex: 1,
    padding: 15,
  },
  messageContainer: {
    maxWidth: "80%",
    marginBottom: 10,
    padding: 12,
    borderRadius: 16,
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#FFB5C2",
  },
  petMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#F0F0F0",
  },
  messageText: {
    fontSize: 14,
    color: "#333",
  },
  inputContainer: {
    padding: 15,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#EEE",
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: "#F8F8F8",
    borderRadius: 20,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: "#FFB5C2",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  sendButtonText: {
    color: "white",
    fontWeight: "600",
  },
});
