import { useEffect } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { Pet } from "@/types/pet";
import React from "react";

const { width } = Dimensions.get("window");

interface MatchModalProps {
  isVisible: boolean;
  pet: Pet;
  onClose: () => void;
}

export default function MatchModal({
  isVisible,
  pet,
  onClose,
}: MatchModalProps) {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (isVisible) {
      scale.value = withSequence(withSpring(1.2), withSpring(1));
      opacity.value = withTiming(1, { duration: 300 });
    } else {
      scale.value = withSpring(0);
      opacity.value = withTiming(0);
    }
  }, [isVisible]);

  const containerStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const contentStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Modal transparent visible={isVisible} animationType="fade">
      <Animated.View style={[styles.container, containerStyle]}>
        <Animated.View style={[styles.content, contentStyle]}>
          <Image source={{ uri: pet.image }} style={styles.image} />
          <View style={styles.textContainer}>
            <Text style={styles.matchText}>It's a Match!</Text>
            <Text style={styles.description}>
              You and {pet.name} liked each other!
            </Text>
          </View>
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>Start Chatting</Text>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    width: width * 0.8,
    alignItems: "center",
  },
  image: {
    width: width * 0.4,
    height: width * 0.4,
    borderRadius: width * 0.2,
    marginBottom: 20,
  },
  textContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  matchText: {
    fontSize: 24,
    fontWeight: "600",
    color: "#FFB5C2",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#FFB5C2",
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
