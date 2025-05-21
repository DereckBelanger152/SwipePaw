export interface Pet {
  id: string;
  name: string;
  photos: string[];
  age: string;
  breed: string;
  location: string;
  distance: string;
  description: string;
  adoptable: boolean;
  shelterName?: string;
  shelterVerified?: boolean;
  facts: PetFact[];
  likedBy?: string[];
}

export interface PetFact {
  icon: string;
  label: string;
  value: string;
}

export interface User {
  id: string;
  name: string;
  photo: string;
  preferences: UserPreferences;
  matches: string[]; // IDs of matched pets
  conversations: string[]; // IDs of conversations
}

export interface UserPreferences {
  petTypes: string[];
  ageRange: [number, number];
  maxDistance: number;
  notifications: boolean;
}

export interface Conversation {
  id: string;
  petId: string;
  lastMessage: Message;
  messages: Message[];
  unreadCount: number;
  updatedAt: Date;
}

export interface Message {
  id: string;
  senderId: string; // 'user' or pet ID
  text: string;
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read';
  attachments?: string[]; // URLs to images
}