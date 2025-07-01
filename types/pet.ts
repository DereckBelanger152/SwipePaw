// Pet interface - defines the data structure for each pet in the app
export interface Pet {
  id: string;           // Unique identifier for each pet (used for tracking swipes/matches)
  name: string;         // Pet's name (e.g., "Luna", "Max")
  age: string;          // Pet's age as a string (e.g., "2 years", "6 months")
  description: string;  // Detailed description of the pet's personality and traits
  image: string;        // URL to the pet's photo (from Unsplash in this demo)
  isShelter: boolean;   // Whether this pet is from a shelter or private owner
  shelterName?: string; // Optional shelter name (only present if isShelter is true)
  species: string;      // Type of animal (e.g., "Dog", "Cat")
}

// Match interface - tracks when a user swipes on a pet
export interface Match {
  petId: string;        // ID of the pet that was swiped on
  timestamp: number;    // When the swipe happened (milliseconds since epoch)
  isMatch: boolean;     // Whether it resulted in a mutual match (enables messaging)
}

// Message interface - individual messages in conversations
export interface Message {
  id: string;           // Unique identifier for the message
  text: string;         // The actual message content
  timestamp: number;    // When the message was sent (milliseconds since epoch)
  isUser: boolean;      // Whether this message was sent by the user (true) or received (false)
}

// Conversation interface - groups messages by pet
export interface Conversation {
  petId: string;            // Which pet this conversation is with
  messages: Message[];      // Array of all messages in this conversation
  lastMessageTime: number;  // Timestamp of the most recent message (for sorting conversations)
}