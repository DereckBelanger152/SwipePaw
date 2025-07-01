### 📁 Project Structure

**Configuration Files:**

- `package.json` - Lists all dependencies and project scripts
- `app.json` - Expo app configuration (name, icons, etc.)
- `tsconfig.json` - TypeScript configuration
- `babel.config.js` - JavaScript/TypeScript compilation settings

**Core App Structure:**

- `app/_layout.tsx` - Root layout that wraps the entire app
- `app/(tabs)/` - Tab navigation structure
  - `_layout.tsx` - Tab bar configuration
  - `index.tsx` - Main swipe screen (Discover tab)
  - `conversations.tsx` - Messages screen
  - `profile.tsx` - User profile screen
- `app/+not-found.tsx` - 404 error page

**Supporting Files:**

- `types/pet.ts` - TypeScript interfaces for data structures
- `data/pets.ts` - Sample pet data for the demo
- `components/MatchModal.tsx` - Popup that appears when you match
- `hooks/useFrameworkReady.ts` - Hook for web compatibility

### 🔄 App Flow

1. **User opens app** → Loads root layout → Shows tab navigation
2. **Discover tab** → User swipes through pet cards → Matches are saved locally
3. **Messages tab** → Shows matched pets → User can chat with them
4. **Profile tab** → Settings and user info (placeholder for now)

### 🎯 Key Features Explained

**Swipe Mechanics:**

- Cards respond to touch gestures (pan gestures)
- Swiping right = like, left = pass
- 10% chance of mutual match when you like a pet
- Matches are stored in phone's local storage

**Messaging System:**

- Can message mutual matches OR any shelter pet
- Messages stored locally on device
- Simple chat interface with user/pet message bubbles

**Data Flow:**

- Pet data comes from `SAMPLE_PETS` array
- User actions (swipes, messages) saved to AsyncStorage
- State managed with React hooks

### 🎨 Design System

- **Primary Color:** `#FFB5C2` (pastel pink)
- **Background:** `#F8F8F8` (light gray)
- **Cards:** White with rounded corners and shadows
- **Special styling for shelter pets** (pink accents)

### 🔧 Technologies Used

- **React Native + Expo** - Cross-platform mobile development
- **TypeScript** - Type-safe JavaScript
- **React Navigation** - Tab and screen navigation
- **Reanimated** - Smooth animations for swiping
- **AsyncStorage** - Local data persistence
- **Gesture Handler** - Touch gesture recognition

### 📚 Learning Path

As you continue developing, focus on:

1. **React Hooks** - useState, useEffect, useCallback
2. **React Native Components** - View, Text, Image, TouchableOpacity
3. **Navigation** - How screens connect and data flows between them
4. **State Management** - How data is stored and updated
5. **Animations** - Making the UI feel smooth and responsive

The comments in each file will help you understand the specific implementation details!
