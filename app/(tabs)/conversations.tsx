// React hooks for state management and side effects
import { useState, useEffect } from "react";
// React Native UI components
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
// Local storage for persisting data
import AsyncStorage from "@react-native-async-storage/async-storage";
// App data and types
import { SAMPLE_PETS } from "@/data/pets";
import { Match, Pet, Message, Conversation } from "@/types/pet";
import React from "react";

// Conversations screen - shows list of matched pets and handles messaging
export default function ConversationsScreen() {
  // State for which pet is currently selected for chatting (null = show list)
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  // Current message being typed
  const [message, setMessage] = useState("");
  // All matches (both liked and mutual matches)
  const [matches, setMatches] = useState<Match[]>([]);
  // All conversation data
  const [conversations, setConversations] = useState<Conversation[]>([]);

  // Load data when component mounts
  useEffect(() => {
    loadMatches();
  }, []);

  // Function to load matches and conversations from device storage
  const loadMatches = async () => {
    try {
      // Load matches (swipe history)
      const matchesData = await AsyncStorage.getItem("matches");
      const savedMatches = matchesData ? JSON.parse(matchesData) : [];
      setMatches(savedMatches);

      // Load conversations (message history)
      const conversationsData = await AsyncStorage.getItem("conversations");
      const savedConversations = conversationsData
        ? JSON.parse(conversationsData)
        : [];
      setConversations(savedConversations);
    } catch (error) {
      console.error("Error loading matches:", error);
    }
  };

  // Function to get pets that can be messaged
  // Includes: mutual matches OR all shelter pets (they always respond)
  const getMatchedPets = () => {
    const matchedPetIds = matches
      .filter(
        (match) =>
          match.isMatch || // Mutual matches
          SAMPLE_PETS.find((pet) => pet.id === match.petId)?.isShelter // Shelter pets
      )
      .map((match) => match.petId);

    return SAMPLE_PETS.filter((pet) => matchedPetIds.includes(pet.id));
  };

  // Function to send a new message
  const handleSendMessage = async () => {
    // Don't send if no pet selected or message is empty
    if (!selectedPet || !message.trim()) return;

    try {
      // Create new message object
      const newMessage: Message = {
        id: Date.now().toString(), // Use timestamp as unique ID
        text: message.trim(), // Remove extra whitespace
        timestamp: Date.now(), // When message was sent
        isUser: true, // This message is from the user
      };

      // Find existing conversation or create new one
      const existingConversation = conversations.find(
        (c) => c.petId === selectedPet.id
      );
      let updatedConversations: Conversation[];

      if (existingConversation) {
        // Add message to existing conversation
        updatedConversations = conversations.map((c) =>
          c.petId === selectedPet.id
            ? {
                ...c,
                messages: [...c.messages, newMessage], // Add new message
                lastMessageTime: newMessage.timestamp, // Update last message time
              }
            : c
        );
      } else {
        // Create new conversation
        updatedConversations = [
          ...conversations,
          {
            petId: selectedPet.id,
            messages: [newMessage],
            lastMessageTime: newMessage.timestamp,
          },
        ];
      }

      // Save to device storage
      await AsyncStorage.setItem(
        "conversations",
        JSON.stringify(updatedConversations)
      );

      // Update state
      setConversations(updatedConversations);
      // Clear message input
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Render function for each conversation item in the list
  const renderItem = ({ item: pet }: { item: Pet }) => {
    // Find conversation data for this pet
    const conversation = conversations.find((c) => c.petId === pet.id);
    // Get the most recent message to show as preview
    const lastMessage =
      conversation?.messages[conversation.messages.length - 1];

    return (
      <TouchableOpacity
        style={[
          styles.conversationItem,
          // Special styling for shelter pets
          pet.isShelter && styles.shelterItem,
        ]}
        onPress={() => setSelectedPet(pet)} // Open chat when tapped
      >
        {/* Pet avatar */}
        <Image source={{ uri: pet.image }} style={styles.avatar} />

        <View style={styles.conversationInfo}>
          {/* Pet name */}
          <Text style={styles.petName}>{pet.name}</Text>

          {/* Show shelter name if applicable */}
          {pet.isShelter && (
            <Text style={styles.shelterName}>{pet.shelterName}</Text>
          )}

          {/* Last message preview or prompt to start conversation */}
          <Text style={styles.lastMessage} numberOfLines={1}>
            {lastMessage?.text || "Start a conversation!"}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  // Render function for the chat interface
  const renderMessages = () => {
    if (!selectedPet) return null;

    // Get conversation data for selected pet
    const conversation = conversations.find((c) => c.petId === selectedPet.id);
    const messages = conversation?.messages || [];

    return (
      <View style={styles.chatContainer}>
        {/* Chat header with back button and pet name */}
        <View style={styles.chatHeader}>
          <TouchableOpacity onPress={() => setSelectedPet(null)}>
            <Text style={styles.backButton}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.chatTitle}>{selectedPet.name}</Text>
        </View>

        {/* Messages list */}
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          style={styles.messagesList}
          renderItem={({ item }) => (
            <View
              style={[
                styles.messageContainer,
                // Different styling for user vs pet messages
                item.isUser ? styles.userMessage : styles.petMessage,
              ]}
            >
              <Text style={styles.messageText}>{item.text}</Text>
            </View>
          )}
        />

        {/* Message input area */}
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
        // Show chat interface if pet is selected
        renderMessages()
      ) : (
        // Show conversations list if no pet selected
        <>
          <Text style={styles.title}>Messages</Text>
          <FlatList
            data={getMatchedPets()} // Show only matched pets
            renderItem={renderItem} // How to render each item
            keyExtractor={(item) => item.id} // Unique key for each item
            contentContainerStyle={styles.listContainer}
          />
        </>
      )}
    </View>
  );
}

// Styles for the conversations screen
const styles = StyleSheet.create({
  container: {
    flex: 1, // Take full screen height
    backgroundColor: "#F8F8F8", // Light gray background
  },

  // Main title for the conversations list
  title: {
    fontSize: 24, // Large title text
    fontWeight: "600", // Semi-bold
    padding: 20, // Space around title
    backgroundColor: "white", // White background
  },

  // Container for the conversations list
  listContainer: {
    padding: 10, // Space around list items
  },

  // Individual conversation item styling
  conversationItem: {
    flexDirection: "row", // Arrange avatar and info horizontally
    padding: 15, // Space inside each item
    backgroundColor: "white", // White background
    borderRadius: 12, // Rounded corners
    marginBottom: 10, // Space between items
    // Shadow effects for depth
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },

  // Special styling for shelter pet conversations
  shelterItem: {
    backgroundColor: "#FFF9FA", // Very light pink background
    borderWidth: 1, // Thin border
    borderColor: "#FFE5E9", // Light pink border
  },

  // Pet avatar/profile picture
  avatar: {
    width: 50, // Fixed size
    height: 50,
    borderRadius: 25, // Circular (half of width/height)
    marginRight: 15, // Space between avatar and text
  },

  // Container for pet info text
  conversationInfo: {
    flex: 1, // Take remaining space
  },

  // Pet name in conversation list
  petName: {
    fontSize: 16, // Medium text size
    fontWeight: "600", // Semi-bold
    marginBottom: 2, // Small space below
  },

  // Shelter name (if applicable)
  shelterName: {
    fontSize: 12, // Small text
    color: "#FFB5C2", // App's signature pink color
    marginBottom: 4, // Space below
  },

  // Last message preview
  lastMessage: {
    fontSize: 14, // Small text
    color: "#666", // Gray color
  },

  // Chat interface container
  chatContainer: {
    flex: 1, // Take full screen height
    backgroundColor: "white", // White background
  },

  // Chat header with back button and pet name
  chatHeader: {
    padding: 20, // Space around header content
    backgroundColor: "white", // White background
    borderBottomWidth: 1, // Thin border at bottom
    borderBottomColor: "#EEE", // Light gray border
    flexDirection: "row", // Arrange items horizontally
    alignItems: "center", // Center items vertically
  },

  // Back button text
  backButton: {
    fontSize: 16, // Medium text
    color: "#FFB5C2", // App's signature pink color
    marginRight: 15, // Space between back button and title
  },

  // Chat title (pet name)
  chatTitle: {
    fontSize: 18, // Larger text for title
    fontWeight: "600", // Semi-bold
  },

  // Messages list container
  messagesList: {
    flex: 1, // Take remaining space
    padding: 15, // Space around messages
  },

  // Individual message container
  messageContainer: {
    maxWidth: "80%", // Don't take full width
    marginBottom: 10, // Space between messages
    padding: 12, // Space inside message bubble
    borderRadius: 16, // Rounded corners
  },

  // User's messages (appear on right side)
  userMessage: {
    alignSelf: "flex-end", // Align to right side
    backgroundColor: "#FFB5C2", // App's signature pink color
  },

  // Pet's messages (appear on left side)
  petMessage: {
    alignSelf: "flex-start", // Align to left side
    backgroundColor: "#F0F0F0", // Light gray background
  },

  // Text inside message bubbles
  messageText: {
    fontSize: 14, // Small text
    color: "#333", // Dark gray for readability
  },

  // Message input area at bottom
  inputContainer: {
    padding: 15, // Space around input
    backgroundColor: "white", // White background
    flexDirection: "row", // Arrange input and button horizontally
    alignItems: "center", // Center items vertically
    borderTopWidth: 1, // Thin border on top
    borderTopColor: "#EEE", // Light gray border
  },

  // Text input field
  input: {
    flex: 1, // Take most of available space
    height: 40, // Fixed height
    backgroundColor: "#F8F8F8", // Light gray background
    borderRadius: 20, // Rounded corners
    paddingHorizontal: 15, // Horizontal padding inside input
    marginRight: 10, // Space between input and send button
  },

  // Send button
  sendButton: {
    backgroundColor: "#FFB5C2", // App's signature pink color
    paddingHorizontal: 20, // Horizontal padding
    paddingVertical: 10, // Vertical padding
    borderRadius: 20, // Rounded corners
  },

  // Send button text
  sendButtonText: {
    color: "white", // White text on pink background
    fontWeight: "600", // Semi-bold
  },
});
