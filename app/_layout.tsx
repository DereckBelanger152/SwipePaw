import { useEffect, useState } from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useFrameworkReady } from "@/hooks/useFrameworkReady";
import { View, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";
import { UserPreferencesProvider } from "@/context/UserPreferencesContext";
import { LanguageProvider } from "@/context/LanguageContext";
import WelcomePopup from "@/components/onboarding/WelcomePopup";
import { useFonts } from "@/hooks/useFonts";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RootLayout() {
  useFrameworkReady();
  const { appIsReady, onLayoutRootView } = useFonts();
  const [showWelcome, setShowWelcome] = useState(false);
  const [hasCheckedStorage, setHasCheckedStorage] = useState(false);

  useEffect(() => {
    // Vérifie si l'utilisateur a déjà vu le popup
    AsyncStorage.getItem("hasSeenWelcomePopup").then((value) => {
      if (!value) {
        setShowWelcome(true);
      }
      setHasCheckedStorage(true);
    });
  }, []);

  const handleCloseWelcome = async () => {
    setShowWelcome(false);
    await AsyncStorage.setItem("hasSeenWelcomePopup", "true");
  };

  if (!appIsReady || !hasCheckedStorage) {
    return null;
  }

  return (
    <LanguageProvider>
      <UserPreferencesProvider>
        <View style={styles.container} onLayout={onLayoutRootView}>
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

          <WelcomePopup visible={showWelcome} onClose={handleCloseWelcome} />
        </View>
      </UserPreferencesProvider>
    </LanguageProvider>
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
