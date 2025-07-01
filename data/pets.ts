// Import the Pet type definition to ensure our sample data matches the expected structure
import { Pet } from '@/types/pet';

// Sample pet data for the app demo
// In a real app, this would come from a database or API
// Each pet object follows the Pet interface defined in types/pet.ts
export const SAMPLE_PETS: Pet[] = [
  {
    id: '1',
    name: 'Luna',
    age: '2 years',
    species: 'Dog',
    description: 'Playful Golden Retriever who loves cuddles and long walks on the beach. Great with kids and other pets!',
    image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=662&auto=format&fit=crop',
    isShelter: true,                    // This pet is from a shelter
    shelterName: 'Happy Paws Shelter',  // Name of the shelter
  },
  {
    id: '2',
    name: 'Max',
    age: '1 year',
    species: 'Dog',
    description: 'Energetic Husky mix looking for an active family. Loves running and adventure!',
    image: 'https://images.unsplash.com/photo-1605568427561-40dd23c2acea?q=80&w=1974&auto=format&fit=crop',
    isShelter: false,  // This pet is from a private owner (no shelterName needed)
  },
  {
    id: '3',
    name: 'Whiskers',
    age: '3 years',
    species: 'Cat',
    description: 'Gentle Persian cat who enjoys peaceful afternoons and window watching.',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=2043&auto=format&fit=crop',
    isShelter: true,
    shelterName: 'Feline Friends Rescue',
  },
  {
    id: '4',
    name: 'Rocky',
    age: '4 years',
    species: 'Dog',
    description: 'Loyal German Shepherd with excellent training. Perfect for security-minded families.',
    image: 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?q=80&w=2940&auto=format&fit=crop',
    isShelter: true,
    shelterName: 'Guardian Dog Shelter',
  },
  {
    id: '5',
    name: 'Oreo',
    age: '6 months',
    species: 'Cat',
    description: 'Playful tuxedo kitten full of energy and curiosity. Loves laser pointers!',
    image: 'https://images.unsplash.com/photo-1638667168629-58c2516fbd22?q=80&w=2940&auto=format&fit=crop',
    isShelter: false,  // Private owner
  },
];