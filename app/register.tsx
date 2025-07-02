import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Text } from "react-native";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/services/firebaseAuth";
import { router } from "expo-router";

export default function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("✅ User registered:", userCredential.user);
      // Navigate to main app after successful registration
      router.replace("/(tabs)");
    } catch (error) {
      console.error("❌ Registration error:", error);
    }
  };

  const goToLogin = () => {
    router.push("/login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Swipepaw Register</Text>
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
      <Button title="Register" onPress={register} />
      <Button title="Back to Login" onPress={goToLogin} />
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
