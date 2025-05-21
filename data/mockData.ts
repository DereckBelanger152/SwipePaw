import { Pet, User, Conversation, Message } from '../types';

export const mockPets: Pet[] = [
  {
    id: '1',
    name: 'Luna',
    photos: [
      'https://images.pexels.com/photos/4588052/pexels-photo-4588052.jpeg',
      'https://images.pexels.com/photos/4588048/pexels-photo-4588048.jpeg'
    ],
    age: '2 years',
    breed: 'Australian Shepherd',
    location: 'San Francisco, CA',
    distance: '3.2 miles away',
    description: 'Luna is a playful and energetic Australian Shepherd who loves outdoor adventures.',
    adoptable: true,
    shelterName: 'Paws & Pals Rescue',
    shelterVerified: true,
    facts: [
      { icon: 'heart', label: 'Temperament', value: 'Friendly' },
      { icon: 'zap', label: 'Energy', value: 'High' },
      { icon: 'heart', label: 'Good with', value: 'Dogs, Kids' },
      { icon: 'home', label: 'Needs', value: 'Active Home' },
    ],
  },
  {
    id: '2',
    name: 'Oliver',
    photos: [
      'https://images.pexels.com/photos/2061057/pexels-photo-2061057.jpeg',
      'https://images.pexels.com/photos/2558605/pexels-photo-2558605.jpeg'
    ],
    age: '4 years',
    breed: 'Tabby Cat',
    location: 'Oakland, CA',
    distance: '5.7 miles away',
    description: 'Oliver is a laid-back tabby with a love for sunny spots and gentle pets.',
    adoptable: true,
    shelterName: 'Furry Friends Shelter',
    shelterVerified: true,
    facts: [
      { icon: 'heart', label: 'Temperament', value: 'Calm' },
      { icon: 'zap', label: 'Energy', value: 'Low' },
      { icon: 'heart', label: 'Good with', value: 'Cats, Adults' },
      { icon: 'home', label: 'Needs', value: 'Quiet Home' },
    ],
  },
  {
    id: '3',
    name: 'Bella',
    photos: [
      'https://images.pexels.com/photos/3361739/pexels-photo-3361739.jpeg',
      'https://images.pexels.com/photos/551628/pexels-photo-551628.jpeg'
    ],
    age: '1 year',
    breed: 'Labrador Mix',
    location: 'Berkeley, CA',
    distance: '8.3 miles away',
    description: 'Bella is a young Lab mix with lots of love to give. She knows basic commands and is great with children.',
    adoptable: true,
    shelterName: 'Happy Tails Adoption',
    shelterVerified: true,
    facts: [
      { icon: 'heart', label: 'Temperament', value: 'Playful' },
      { icon: 'zap', label: 'Energy', value: 'High' },
      { icon: 'heart', label: 'Good with', value: 'All Ages' },
      { icon: 'home', label: 'Needs', value: 'Family Home' },
    ],
  },
  {
    id: '4',
    name: 'Max',
    photos: [
      'https://images.pexels.com/photos/1490908/pexels-photo-1490908.jpeg',
      'https://images.pexels.com/photos/551628/pexels-photo-551628.jpeg'
    ],
    age: '3 years',
    breed: 'Golden Retriever',
    location: 'San Jose, CA',
    distance: '12.1 miles away',
    description: 'Max is a gentle golden who loves swimming and playing fetch. He gets along with both dogs and cats.',
    adoptable: true,
    shelterName: 'Golden Hearts Rescue',
    shelterVerified: true,
    facts: [
      { icon: 'heart', label: 'Temperament', value: 'Gentle' },
      { icon: 'zap', label: 'Energy', value: 'Medium' },
      { icon: 'heart', label: 'Good with', value: 'All Pets' },
      { icon: 'home', label: 'Needs', value: 'Loving Home' },
    ],
  },
  {
    id: '5',
    name: 'Charlie',
    photos: [
      'https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg',
      'https://images.pexels.com/photos/1854494/pexels-photo-1854494.jpeg'
    ],
    age: '5 years',
    breed: 'Beagle',
    location: 'San Mateo, CA',
    distance: '15.3 miles away',
    description: 'Charlie is a sweet beagle with a nose for adventure. He enjoys walks, treats, and afternoon naps.',
    adoptable: true,
    shelterName: 'Bay Area Pet Rescue',
    shelterVerified: true,
    facts: [
      { icon: 'heart', label: 'Temperament', value: 'Sweet' },
      { icon: 'zap', label: 'Energy', value: 'Medium' },
      { icon: 'heart', label: 'Good with', value: 'Adults' },
      { icon: 'home', label: 'Needs', value: 'Solo Pet Home' },
    ],
  },
];

export const mockUser: User = {
  id: 'user1',
  name: 'Alex Johnson',
  photo: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
  preferences: {
    petTypes: ['Dog', 'Cat'],
    ageRange: [0, 10],
    maxDistance: 25,
    notifications: true,
  },
  matches: ['1', '2'],
  conversations: ['conv1', 'conv2'],
};

export const mockConversations: Conversation[] = [
  {
    id: 'conv1',
    petId: '1',
    lastMessage: {
      id: 'msg3',
      senderId: 'shelter1',
      text: 'Luna would love to meet you! When would you like to schedule a visit?',
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      status: 'read',
    },
    messages: [
      {
        id: 'msg1',
        senderId: 'user1',
        text: 'Hi! I am interested in meeting Luna.',
        timestamp: new Date(Date.now() - 86400000), // 1 day ago
        status: 'read',
      },
      {
        id: 'msg2',
        senderId: 'shelter1',
        text: 'Great! Luna is a wonderful dog. What would you like to know about her?',
        timestamp: new Date(Date.now() - 82800000), // 23 hours ago
        status: 'read',
      },
      {
        id: 'msg3',
        senderId: 'shelter1',
        text: 'Luna would love to meet you! When would you like to schedule a visit?',
        timestamp: new Date(Date.now() - 3600000), // 1 hour ago
        status: 'read',
      },
    ],
    unreadCount: 0,
    updatedAt: new Date(Date.now() - 3600000),
  },
  {
    id: 'conv2',
    petId: '2',
    lastMessage: {
      id: 'msg6',
      senderId: 'shelter2',
      text: 'Oliver is still available for adoption. Would you like to come see him this weekend?',
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
      status: 'delivered',
    },
    messages: [
      {
        id: 'msg4',
        senderId: 'user1',
        text: 'Hello, I saw Oliver on SwipePaw and he looks like a perfect match!',
        timestamp: new Date(Date.now() - 172800000), // 2 days ago
        status: 'read',
      },
      {
        id: 'msg5',
        senderId: 'shelter2',
        text: 'Thanks for your interest! Oliver is a very sweet cat who loves to cuddle.',
        timestamp: new Date(Date.now() - 169200000), // 47 hours ago
        status: 'read',
      },
      {
        id: 'msg6',
        senderId: 'shelter2',
        text: 'Oliver is still available for adoption. Would you like to come see him this weekend?',
        timestamp: new Date(Date.now() - 7200000), // 2 hours ago
        status: 'delivered',
      },
    ],
    unreadCount: 1,
    updatedAt: new Date(Date.now() - 7200000),
  },
];