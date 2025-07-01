// Expo Router component for tab navigation
import { Tabs } from "expo-router";
// Vector icons for tab bar icons
import { Ionicons } from "@expo/vector-icons";
import React from "react";

// App's signature pink color - used consistently throughout the app
const PASTEL_PINK = "#FFB5C2";

// Tab layout component - creates the bottom tab navigation
// The folder structure (tabs) creates the tab navigation automatically
export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false, // Hide the header for all tab screens
        tabBarStyle: {
          backgroundColor: "#FFFFFF", // White background for tab bar
          borderTopColor: "#F0F0F0", // Light gray border on top
        },
        tabBarActiveTintColor: PASTEL_PINK, // Pink color for active tab
      }}
    >
      {/* Home/Discover tab - shows the main swiping interface */}
      <Tabs.Screen
        name="index" // Corresponds to index.tsx file
        options={{
          title: "Discover", // Text shown under the icon
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <Ionicons name="heart" size={size} color={color} />
          ),
        }}
      />

      {/* Messages/Conversations tab - shows matched pets and chat */}
      <Tabs.Screen
        name="conversations" // Corresponds to conversations.tsx file
        options={{
          title: "Messages",
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <Ionicons name="chatbubble" size={size} color={color} />
          ),
        }}
      />

      {/* Profile tab - user settings and preferences */}
      <Tabs.Screen
        name="profile" // Corresponds to profile.tsx file
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
