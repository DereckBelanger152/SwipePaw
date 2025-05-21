import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useLanguage } from "@/context/LanguageContext";
import { Colors } from "@/constants/Colors";
import { Layout } from "@/constants/Layout";

export default function LanguageSwitch() {
  const { language, setLanguage } = useLanguage();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, language === "en" && styles.activeButton]}
        onPress={() => setLanguage("en")}
      >
        <Text style={[styles.text, language === "en" && styles.activeText]}>
          EN
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, language === "fr" && styles.activeButton]}
        onPress={() => setLanguage("fr")}
      >
        <Text style={[styles.text, language === "fr" && styles.activeText]}>
          FR
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: Colors.ui.cardBackground,
    borderRadius: Layout.borderRadius.medium,
    padding: 2,
  },
  button: {
    paddingHorizontal: Layout.spacing.md,
    paddingVertical: Layout.spacing.xs,
    borderRadius: Layout.borderRadius.small,
  },
  activeButton: {
    backgroundColor: Colors.primary.accent1,
  },
  text: {
    fontFamily: "Inter-Medium",
    fontSize: 14,
    color: Colors.text.secondary,
  },
  activeText: {
    color: Colors.text.light,
  },
});
