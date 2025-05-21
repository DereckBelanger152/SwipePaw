import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Image, Send } from 'lucide-react-native';
import { Colors, shadowStyles } from '@/constants/Colors';
import { Layout } from '@/constants/Layout';

interface ChatInputProps {
  onSend: (text: string) => void;
  onAttach?: () => void;
}

export default function ChatInput({ onSend, onAttach }: ChatInputProps) {
  const [message, setMessage] = useState('');
  
  const handleSend = () => {
    if (message.trim()) {
      onSend(message.trim());
      setMessage('');
    }
  };
  
  return (
    <View style={styles.container}>
      {/* Attachment button */}
      <TouchableOpacity
        style={styles.attachButton}
        onPress={onAttach}
        disabled={!onAttach}
      >
        <Image
          size={24}
          color={onAttach ? Colors.text.secondary : Colors.text.tertiary}
        />
      </TouchableOpacity>
      
      {/* Message input */}
      <TextInput
        style={styles.input}
        placeholder="Type a message..."
        placeholderTextColor={Colors.text.tertiary}
        value={message}
        onChangeText={setMessage}
        multiline
        maxLength={500}
        returnKeyType="default"
        autoCapitalize="sentences"
        onSubmitEditing={Platform.OS === 'web' ? handleSend : undefined}
      />
      
      {/* Send button */}
      <TouchableOpacity
        style={[
          styles.sendButton,
          message.trim() === '' && styles.disabledSendButton,
        ]}
        onPress={handleSend}
        disabled={message.trim() === ''}
      >
        <Send
          size={22}
          color={message.trim() !== '' ? Colors.text.light : Colors.text.tertiary}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Layout.spacing.md,
    paddingVertical: Layout.spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.ui.border,
    backgroundColor: Colors.ui.cardBackground,
    ...shadowStyles.small,
  },
  attachButton: {
    padding: Layout.spacing.xs,
    marginRight: Layout.spacing.xs,
  },
  input: {
    flex: 1,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.text.primary,
    maxHeight: 100,
    paddingHorizontal: Layout.spacing.md,
    paddingVertical: Layout.spacing.xs,
    backgroundColor: '#F0F0F0',
    borderRadius: Layout.borderRadius.medium,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary.accent1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: Layout.spacing.xs,
  },
  disabledSendButton: {
    backgroundColor: '#F0F0F0',
  },
});