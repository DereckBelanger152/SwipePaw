import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function AccountSettingsScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Header with back button */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Account Settings</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Personal Information Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Personal Information</Text>

        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="person" size={20} color="#666" />
          <Text style={styles.menuText}>Edit Profile</Text>
          <Ionicons name="chevron-forward" size={20} color="#CCC" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="mail" size={20} color="#666" />
          <Text style={styles.menuText}>Email Address</Text>
          <Ionicons name="chevron-forward" size={20} color="#CCC" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="key" size={20} color="#666" />
          <Text style={styles.menuText}>Change Password</Text>
          <Ionicons name="chevron-forward" size={20} color="#CCC" />
        </TouchableOpacity>
      </View>

      {/* Pet Preferences Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Pet Preferences</Text>

        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="heart" size={20} color="#666" />
          <Text style={styles.menuText}>Preferred Pet Types</Text>
          <Ionicons name="chevron-forward" size={20} color="#CCC" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="location" size={20} color="#666" />
          <Text style={styles.menuText}>Search Distance</Text>
          <Ionicons name="chevron-forward" size={20} color="#CCC" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="calendar" size={20} color="#666" />
          <Text style={styles.menuText}>Age Range</Text>
          <Ionicons name="chevron-forward" size={20} color="#CCC" />
        </TouchableOpacity>
      </View>

      {/* Account Actions Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account Actions</Text>

        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="download" size={20} color="#666" />
          <Text style={styles.menuText}>Download My Data</Text>
          <Ionicons name="chevron-forward" size={20} color="#CCC" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.dangerMenuItem}>
          <Ionicons name="trash" size={20} color="#FF4757" />
          <Text style={styles.dangerMenuText}>Delete Account</Text>
          <Ionicons name="chevron-forward" size={20} color="#FF4757" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },

  // Header section
  header: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    paddingTop: 60, // Account for status bar
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },

  backButton: {
    padding: 5,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },

  placeholder: {
    width: 34, // Same width as back button for centering
  },

  // Section container
  section: {
    backgroundColor: "white",
    marginTop: 20,
    padding: 20,
  },

  // Section title
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 15,
    color: "#333",
  },

  // Regular menu item
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },

  // Menu item text
  menuText: {
    flex: 1,
    marginLeft: 15,
    fontSize: 16,
    color: "#333",
  },

  // Danger menu item (for delete account)
  dangerMenuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
  },

  // Danger menu text
  dangerMenuText: {
    flex: 1,
    marginLeft: 15,
    fontSize: 16,
    color: "#FF4757",
  },
});
