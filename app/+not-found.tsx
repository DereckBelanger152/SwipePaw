// React import
import * as React from "react";
// Expo Router imports for navigation and dynamic screen options
import { Link, Stack } from "expo-router";
// React Native UI components
import { StyleSheet, Text, View } from "react-native";

// 404 Not Found screen - shown when user navigates to a route that doesn't exist
// The filename starts with "+" which tells Expo Router this is a special route
export default function NotFoundScreen() {
  return (
    <>
      {/* Dynamically set the screen title in the header */}
      <Stack.Screen options={{ title: "Oops!" }} />

      {/* Main content container */}
      <View style={styles.container}>
        {/* Error message */}
        <Text style={styles.text}>This screen doesn't exist.</Text>

        {/* Link back to home screen */}
        <Link href="/" style={styles.link}>
          <Text>Go to home screen!</Text>
        </Link>
      </View>
    </>
  );
}

// Styles for the 404 screen
const styles = StyleSheet.create({
  container: {
    flex: 1, // Take up full screen height
    alignItems: "center", // Center horizontally
    justifyContent: "center", // Center vertically
    padding: 20, // Add padding around content
  },
  text: {
    fontSize: 20,
    fontWeight: 600, // Make text semi-bold
  },
  link: {
    marginTop: 15, // Space above the link
    paddingVertical: 15, // Vertical padding to make link easier to tap
  },
});
