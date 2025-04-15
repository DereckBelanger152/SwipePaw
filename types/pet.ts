export interface Pet {
  id: string;
  name: string;
  age: string;
  description: string;
  image: string;
  isShelter: boolean;
  shelterName?: string;
  species: string;
}

export interface Match {
  petId: string;
  timestamp: number;
  isMatch: boolean;
}

export interface Message {
  id: string;
  text: string;
  timestamp: number;
  isUser: boolean;
}

export interface Conversation {
  petId: string;
  messages: Message[];
  lastMessageTime: number;
}