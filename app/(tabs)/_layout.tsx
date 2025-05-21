import React from "react";
import { Tabs } from "expo-router";
import { View } from "react-native";
import { Chrome as Home, MessageCircle, User } from "lucide-react-native";
import { Colors } from "@/constants/Colors";
import { useFonts } from "@/hooks/useFonts";
import { useLanguage } from "@/context/LanguageContext";
import LanguageSwitch from "@/components/ui/LanguageSwitch";

export default function TabLayout() {
  const { appIsReady, onLayoutRootView } = useFonts();
  const { t } = useLanguage();

  if (!appIsReady) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: Colors.primary.accent1,
          tabBarInactiveTintColor: Colors.text.tertiary,
          tabBarStyle: {
            backgroundColor: Colors.ui.cardBackground,
            borderTopWidth: 1,
            borderTopColor: Colors.ui.border,
            height: 60,
            paddingBottom: 5,
            paddingTop: 5,
          },
          tabBarLabelStyle: {
            fontFamily: "Inter-Medium",
            fontSize: 12,
          },
          headerRight: () => <LanguageSwitch />,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: t("tabs.discover"),
            tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="conversations"
          options={{
            title: t("tabs.chats"),
            tabBarIcon: ({ color, size }) => (
              <MessageCircle size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: t("tabs.profile"),
            tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
          }}
        />
      </Tabs>
    </View>
  );
}
