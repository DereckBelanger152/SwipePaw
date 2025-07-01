// React imports
import { useEffect } from "react";
// Expo Router imports for navigation
import { Stack } from "expo-router";
// Status bar component to control the phone's status bar
import { StatusBar } from "expo-status-bar";
// Gesture handler for swipe interactions throughout the app
import { GestureHandlerRootView } from "react-native-gesture-handler";
// Custom hook to signal when framework is ready
import { useFrameworkReady } from "@/hooks/useFrameworkReady";
import React from "react";

// Root layout component - this wraps the entire app
// Everything in your app will be rendered inside this component
export default function RootLayout() {
  // Initialize the framework ready hook
  useFrameworkReady();

  return (
    // GestureHandlerRootView enables swipe gestures throughout the app
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* Stack navigator manages screen transitions */}
      <Stack screenOptions={{ headerShown: false }}>
        {/* Main tabs screen - contains the bottom tab navigation */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        {/* 404 not found screen */}
        <Stack.Screen name="+not-found" />
      </Stack>
      {/* Status bar configuration - "auto" adapts to light/dark mode */}
      <StatusBar style="auto" />
    </GestureHandlerRootView>
  );
}
