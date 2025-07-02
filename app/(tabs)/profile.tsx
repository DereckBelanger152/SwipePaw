// React Native UI components
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
// Vector icons for menu items
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { router } from "expo-router";

// Firebase auth imports
import { signOut } from "firebase/auth";
import { auth } from "@/services/firebaseAuth";

// Profile screen - user settings and app information
// Currently shows a guest user profile with placeholder menu items
export default function ProfileScreen() {
  // Handle user logout
  const handleDisconnect = async () => {
    Alert.alert("Disconnect", "Are you sure you want to log out?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Log Out",
        style: "destructive",
        onPress: async () => {
          try {
            await signOut(auth);
            // The onAuthStateChanged listener in _layout.tsx will handle navigation
          } catch (error) {
            Alert.alert("Error", "Failed to log out. Please try again.");
          }
        },
      },
    ]);
  };
  return (
    <ScrollView style={styles.container}>
      {/* Profile header section */}
      <View style={styles.header}>
        {/* Profile picture placeholder - circular with user initial */}
        <View style={styles.profileImage}>
          <Text style={styles.profileInitial}>G</Text>
        </View>
        {/* User name (currently hardcoded as guest) */}
        <Text style={styles.name}>Guest User</Text>
      </View>

      {/* Settings menu section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Settings</Text>

        {/* Account Settings menu item */}
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => router.push("/account-settings")}
        >
          <Ionicons name="settings" size={20} color="#666" />
          <Text style={styles.menuText}>Account Settings</Text>
        </TouchableOpacity>

        {/* Favorites menu item */}
        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="heart" size={20} color="#666" />
          <Text style={styles.menuText}>Favorites</Text>
        </TouchableOpacity>

        {/* Notifications menu item */}
        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="notifications" size={20} color="#666" />
          <Text style={styles.menuText}>Notifications</Text>
        </TouchableOpacity>

        {/* Privacy menu item */}
        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="shield" size={20} color="#666" />
          <Text style={styles.menuText}>Privacy</Text>
        </TouchableOpacity>

        {/* Help & Support menu item */}
        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="help-circle" size={20} color="#666" />
          <Text style={styles.menuText}>Help & Support</Text>
        </TouchableOpacity>
      </View>

      {/* Disconnect button section */}
      <View style={styles.section}>
        <TouchableOpacity
          style={styles.disconnectButton}
          onPress={handleDisconnect}
        >
          <Ionicons name="log-out" size={20} color="#FF4757" />
          <Text style={styles.disconnectText}>Disconnect</Text>
        </TouchableOpacity>
      </View>

      {/* App version info at bottom */}
      <Text style={styles.version}>Version 1.0.0</Text>
    </ScrollView>
  );
}

// Styles for the profile screen
const styles = StyleSheet.create({
  container: {
    flex: 1, // Take full screen height
    backgroundColor: "#F8F8F8", // Light gray background
  },

  // Profile header section
  header: {
    backgroundColor: "white", // White background
    padding: 20, // Space around content
    alignItems: "center", // Center items horizontally
    borderBottomWidth: 1, // Thin border at bottom
    borderBottomColor: "#EEE", // Light gray border
  },

  // Circular profile picture placeholder
  profileImage: {
    width: 80, // Fixed size
    height: 80,
    borderRadius: 40, // Circular (half of width/height)
    backgroundColor: "#007AFF", // Blue background
    alignItems: "center", // Center content horizontally
    justifyContent: "center", // Center content vertically
    marginBottom: 10, // Space below image
  },

  // User initial inside profile circle
  profileInitial: {
    fontSize: 32, // Large text
    color: "white", // White text on blue background
    fontWeight: "600", // Semi-bold
  },

  // User name display
  name: {
    fontSize: 24, // Large text
    fontWeight: "600", // Semi-bold
    marginBottom: 4, // Small space below
  },

  // Settings section container
  section: {
    backgroundColor: "white", // White background
    marginTop: 20, // Space above section
    padding: 20, // Space around content
  },

  // Section title (e.g., "Settings")
  sectionTitle: {
    fontSize: 18, // Medium-large text
    fontWeight: "600", // Semi-bold
    marginBottom: 15, // Space below title
  },

  // Individual menu item
  menuItem: {
    flexDirection: "row", // Arrange icon and text horizontally
    alignItems: "center", // Center items vertically
    paddingVertical: 12, // Vertical padding
    borderBottomWidth: 1, // Thin border at bottom
    borderBottomColor: "#F0F0F0", // Very light gray border
  },

  // Menu item text
  menuText: {
    marginLeft: 15, // Space between icon and text
    fontSize: 16, // Medium text size
    color: "#333", // Dark gray for readability
  },

  // App version text at bottom
  version: {
    textAlign: "center", // Center the text
    color: "#999", // Gray color (subtle)
    marginTop: 20, // Space above
    marginBottom: 20, // Space below (for safe area)
  },

  // Disconnect button
  disconnectButton: {
    flexDirection: "row", // Arrange icon and text horizontally
    alignItems: "center", // Center items vertically
    justifyContent: "center", // Center content horizontally
    paddingVertical: 15, // Vertical padding
    backgroundColor: "#FFF5F5", // Light red background
    borderRadius: 8, // Rounded corners
    borderWidth: 1, // Border
    borderColor: "#FFD6DD", // Light red border
  },

  // Disconnect button text
  disconnectText: {
    marginLeft: 10, // Space between icon and text
    fontSize: 16, // Medium text size
    color: "#FF4757", // Red color for logout
    fontWeight: "600", // Semi-bold
  },
});
