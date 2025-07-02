import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Text } from "react-native";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/services/firebaseAuth";
import { router } from "expo-router";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("✅ User logged in:", userCredential.user);
      // Navigate to main app after successful login
      router.replace("/(tabs)");
    } catch (error) {
      console.error("❌ Login error:", error);
    }
  };

  const goToRegister = () => {
    router.push("/register");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Swipepaw Login</Text>
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
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});
