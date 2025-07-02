import React, { useEffect, useState } from "react";
import { Stack } from "expo-router";
// Status bar component to control the phone's status bar
import { StatusBar } from "expo-status-bar";
// Gesture handler for swipe interactions throughout the app
import { GestureHandlerRootView } from "react-native-gesture-handler";

// Firebase auth imports
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/services/firebaseAuth";

// Your custom hook
import { useFrameworkReady } from "@/hooks/useFrameworkReady";

export default function RootLayout() {
  useFrameworkReady();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) {
    return null; // or a loading spinner component
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack
        screenOptions={{ headerShown: false }}
        initialRouteName={user ? "(tabs)" : "login"}
      >
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="register" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="account-settings"
          options={{ headerShown: false }}
        />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </GestureHandlerRootView>
  );
}
