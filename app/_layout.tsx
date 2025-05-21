import { useEffect } from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useFrameworkReady } from "@/hooks/useFrameworkReady";
import { View, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";
import { UserPreferencesProvider } from "@/context/UserPreferencesContext";

export default function RootLayout() {
  useFrameworkReady();

  return (
    <UserPreferencesProvider>
      <View style={styles.container}>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: styles.content,
            animation: "slide_from_right",
          }}
        >
          <Stack.Screen name="(tabs)" />
          <Stack.Screen
            name="pet/[id]"
            options={{
              presentation: "modal",
              animation: "slide_from_bottom",
            }}
          />
          <Stack.Screen
            name="chat/[id]"
            options={{
              headerShown: true,
              headerTitle: "",
              headerBackTitle: "Back",
              headerTintColor: Colors.primary.accent1,
              headerStyle: {
                backgroundColor: Colors.ui.cardBackground,
              },
            }}
          />
        </Stack>
        <StatusBar style="auto" />
      </View>
    </UserPreferencesProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary.background,
  },
  content: {
    backgroundColor: Colors.primary.background,
  },
});
