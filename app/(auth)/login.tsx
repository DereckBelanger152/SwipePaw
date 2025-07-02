import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Text, Alert } from "react-native";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/services/firebaseAuth";
import { router } from "expo-router";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const login = async () => {
    try {
      setErrorMessage("");

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      router.replace("/(tabs)");
    } catch (error: any) {
      // Handle specific error types
      if (error.code === "auth/network-request-failed") {
        setErrorMessage(
          "Network error: Please check your internet connection and try again."
        );
      } else if (error.code === "auth/invalid-email") {
        setErrorMessage("Please enter a valid email address.");
      } else if (
        error.code === "auth/wrong-password" ||
        error.code === "auth/invalid-credential"
      ) {
        setErrorMessage("Incorrect email or password. Please try again.");
      } else if (error.code === "auth/user-not-found") {
        setErrorMessage("No account found with this email address.");
      } else {
        setErrorMessage("Login failed. Please try again.");
      }
    }
  };

  const goToRegister = () => {
    router.push("/(auth)/register");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Swipepaw Login</Text>

      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      <Button title="Login" onPress={login} />
      <Button title="Register" onPress={goToRegister} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  error: {
    color: "#FF4757",
    textAlign: "center",
    marginBottom: 15,
    fontSize: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});
