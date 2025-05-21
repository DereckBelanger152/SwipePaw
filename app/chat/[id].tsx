import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { Layout } from '@/constants/Layout';
import Message from '@/components/conversations/Message';
import ChatInput from '@/components/conversations/ChatInput';
import { mockConversations, mockPets } from '@/data/mockData';
import { Message as MessageType } from '@/types';

export default function ChatScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [conversation, setConversation] = useState(
    mockConversations.find(c => c.id === id || c.petId === id)
  );
  const flatListRef = useRef<FlatList>(null);
  
  // Get pet info
  const pet = mockPets.find(p => p.id === conversation?.petId);
  
  useEffect(() => {
    // Set up messages from conversation
    if (conversation) {
      setMessages(conversation.messages);
      
      // Set up the header
      router.setParams({ title: pet?.name || '' });
    }
  }, [conversation, pet?.name, router]);
  
  // Handle send message
  const handleSendMessage = (text: string) => {
    const newMessage: MessageType = {
      id: `msg-${Date.now()}`,
      senderId: 'user1',
      text,
      timestamp: new Date(),
      status: 'sent',
    };
    
    setMessages(prev => [...prev, newMessage]);
    
    // Scroll to bottom
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
    
    // Simulate reply after delay (for demo purposes)
    setTimeout(() => {
      const replyMessage: MessageType = {
        id: `msg-reply-${Date.now()}`,
        senderId: conversation?.petId || 'shelter',
        text: `Thanks for your message about ${pet?.name}! I'll get back to you shortly.`,
        timestamp: new Date(),
        status: 'delivered',
      };
      
      setMessages(prev => [...prev, replyMessage]);
      
      // Scroll to bottom again
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }, 2000);
  };
  
  if (!conversation || !pet) {
    return (
      <View style={styles.container}>
        <Text>Conversation not found</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardAvoid}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        {/* Chat header with pet info */}
        <View style={styles.chatHeader}>
          <Image source={{ uri: pet.photos[0] }} style={styles.petAvatar} />
          <View style={styles.petInfo}>
            <Text style={styles.petName}>{pet.name}</Text>
            <Text style={styles.petBreed}>{pet.breed}</Text>
          </View>
        </View>
        
        {/* Messages list */}
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Message
              message={item}
              isUser={item.senderId === 'user1'}
            />
          )}
          contentContainerStyle={styles.messagesList}
          onLayout={() => flatListRef.current?.scrollToEnd({ animated: false })}
        />
        
        {/* Input area */}
        <ChatInput
          onSend={handleSendMessage}
          onAttach={() => {}}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary.background,
  },
  keyboardAvoid: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Layout.spacing.md,
    backgroundColor: Colors.ui.cardBackground,
    borderBottomWidth: 1,
    borderBottomColor: Colors.ui.border,
  },
  petAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: Layout.spacing.md,
  },
  petInfo: {
    flex: 1,
  },
  petName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: Colors.text.primary,
  },
  petBreed: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.text.secondary,
  },
  messagesList: {
    padding: Layout.spacing.md,
    flexGrow: 1,
  },
});