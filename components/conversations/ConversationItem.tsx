import React from 'react';
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  TouchableOpacity,
} from 'react-native';
import { Colors, shadowStyles } from '@/constants/Colors';
import { Layout } from '@/constants/Layout';
import { formatRelativeTime } from '@/utils/dateUtils';
import { Conversation, Pet } from '@/types';

interface ConversationItemProps {
  conversation: Conversation;
  pet: Pet;
  onPress: () => void;
}

export default function ConversationItem({ 
  conversation, 
  pet, 
  onPress 
}: ConversationItemProps) {
  // Format the timestamp
  const formattedTime = formatRelativeTime(conversation.lastMessage.timestamp);
  
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.avatarContainer}>
        <Image source={{ uri: pet.photos[0] }} style={styles.avatar} />
        {pet.shelterVerified && (
          <View style={styles.verifiedBadge} />
        )}
      </View>
      
      <View style={styles.contentContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.name}>{pet.name}</Text>
          <Text style={styles.time}>{formattedTime}</Text>
        </View>
        
        <Text
          style={[
            styles.messagePreview,
            conversation.unreadCount > 0 && styles.unreadMessage,
          ]}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {conversation.lastMessage.text}
        </Text>
      </View>
      
      {conversation.unreadCount > 0 && (
        <View style={styles.unreadBadge}>
          <Text style={styles.unreadCount}>
            {conversation.unreadCount}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: Layout.spacing.md,
    backgroundColor: Colors.ui.cardBackground,
    borderRadius: Layout.borderRadius.medium,
    marginBottom: Layout.spacing.md,
    ...shadowStyles.small,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: Layout.spacing.md,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: Colors.secondary.purple,
    borderWidth: 2,
    borderColor: Colors.ui.cardBackground,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: Colors.text.primary,
  },
  time: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.text.tertiary,
  },
  messagePreview: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.text.secondary,
  },
  unreadMessage: {
    fontFamily: 'Inter-SemiBold',
    color: Colors.text.primary,
  },
  unreadBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Colors.primary.accent1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginLeft: Layout.spacing.sm,
  },
  unreadCount: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 11,
    color: Colors.text.light,
  },
});