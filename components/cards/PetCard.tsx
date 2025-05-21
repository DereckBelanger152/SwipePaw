// components/cards/PetCard.tsx
import React, { useRef, useCallback } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
  PanResponder,
  Platform,
} from "react-native";
import { Heart, MapPin, Info } from "lucide-react-native";
import { Colors, shadowStyles } from "@/constants/Colors";
import { Layout } from "@/constants/Layout";
import { Pet } from "@/types";
import Badge from "../ui/Badge";

interface PetCardProps {
  pet: Pet;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  onSwipeUp: () => void;
}

export default function PetCard({
  pet,
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
}: PetCardProps) {
  // Animation values
  const position = useRef(new Animated.ValueXY()).current;
  const opacity = useRef(new Animated.Value(1)).current;

  const rotate = position.x.interpolate({
    inputRange: [-Layout.window.width / 2, 0, Layout.window.width / 2],
    outputRange: ["-10deg", "0deg", "10deg"],
    extrapolate: "clamp",
  });

  // Opacity for like/nope labels
  const likeOpacity = position.x.interpolate({
    inputRange: [0, Layout.window.width / 4],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  const nopeOpacity = position.x.interpolate({
    inputRange: [-Layout.window.width / 4, 0],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  const infoOpacity = position.y.interpolate({
    inputRange: [-Layout.window.height / 10, 0],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  const animateSwipe = useCallback(
    (direction: "left" | "right" | "up", callback: () => void) => {
      const x =
        direction === "left"
          ? -Layout.window.width - 100
          : direction === "right"
          ? Layout.window.width + 100
          : 0;
      const y = direction === "up" ? -Layout.window.height - 100 : 0;

      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: Platform.OS !== "web",
        }),
        Animated.timing(position, {
          toValue: { x, y },
          duration: 300,
          useNativeDriver: Platform.OS !== "web",
        }),
      ]).start(() => {
        callback();
        // Reset position and opacity immediately after callback
        position.setValue({ x: 0, y: 0 });
        opacity.setValue(1);
      });
    },
    [position, opacity]
  );

  // Pan responder for swipe gestures
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx > 120) {
          animateSwipe("right", onSwipeRight);
        } else if (gesture.dx < -120) {
          animateSwipe("left", onSwipeLeft);
        } else if (gesture.dy < -120) {
          animateSwipe("up", onSwipeUp);
        } else {
          Animated.spring(position, {
            toValue: { x: 0, y: 0 },
            friction: 4,
            useNativeDriver: Platform.OS !== "web",
          }).start();
        }
      },
    })
  ).current;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [
            { translateX: position.x },
            { translateY: position.y },
            { rotate: rotate },
          ],
          opacity: opacity,
        },
      ]}
      {...panResponder.panHandlers}
    >
      {/* Rest of the component remains the same */}
      {/* Like and Nope overlays */}
      <Animated.View
        style={[
          styles.overlayLabel,
          styles.likeLabel,
          { opacity: likeOpacity },
        ]}
      >
        <Text style={styles.overlayText}>LIKE</Text>
      </Animated.View>

      <Animated.View
        style={[
          styles.overlayLabel,
          styles.nopeLabel,
          { opacity: nopeOpacity },
        ]}
      >
        <Text style={styles.overlayText}>NOPE</Text>
      </Animated.View>

      <Animated.View
        style={[
          styles.overlayLabel,
          styles.infoLabel,
          { opacity: infoOpacity },
        ]}
      >
        <Text style={styles.overlayText}>INFO</Text>
      </Animated.View>

      {/* Card content */}
      <View style={styles.cardContent}>
        <Image
          source={{ uri: pet.photos[0] }}
          style={styles.image}
          resizeMode="cover"
        />

        {/* Adoptable badge */}
        {pet.adoptable && (
          <View style={styles.badgeContainer}>
            <Badge
              label="Adoptable"
              variant="verified"
              icon={<Heart size={12} color="white" />}
            />
          </View>
        )}

        <View style={styles.infoContainer}>
          <View style={styles.nameContainer}>
            <Text style={styles.name}>{pet.name}</Text>
            <Text style={styles.age}>{pet.age}</Text>
          </View>

          <Text style={styles.breed}>{pet.breed}</Text>

          <View style={styles.locationContainer}>
            <MapPin size={16} color={Colors.text.secondary} />
            <Text style={styles.location}>{pet.distance}</Text>
          </View>
        </View>
      </View>
    </Animated.View>
  );
}

// Styles remain the same
const styles = StyleSheet.create({
  container: {
    width: Layout.card.width,
    height: Layout.card.height,
    borderRadius: Layout.borderRadius.medium,
    backgroundColor: Colors.ui.cardBackground,
    ...shadowStyles.medium,
    overflow: "hidden",
  },
  cardContent: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: Layout.card.imageHeight,
    borderTopLeftRadius: Layout.borderRadius.medium,
    borderTopRightRadius: Layout.borderRadius.medium,
  },
  infoContainer: {
    padding: Layout.spacing.md,
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: Layout.spacing.xs,
  },
  name: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 24,
    color: Colors.text.primary,
  },
  age: {
    fontFamily: "Inter-Regular",
    fontSize: 16,
    color: Colors.text.secondary,
  },
  breed: {
    fontFamily: "Inter-Regular",
    fontSize: 16,
    color: Colors.text.secondary,
    marginBottom: Layout.spacing.sm,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  location: {
    fontFamily: "Inter-Regular",
    fontSize: 14,
    color: Colors.text.secondary,
    marginLeft: Layout.spacing.xs,
  },
  badgeContainer: {
    position: "absolute",
    top: Layout.spacing.md,
    left: Layout.spacing.md,
  },
  overlayLabel: {
    position: "absolute",
    padding: Layout.spacing.sm,
    borderWidth: 4,
    borderRadius: Layout.borderRadius.small,
    zIndex: 10,
  },
  likeLabel: {
    top: 50,
    right: 20,
    borderColor: Colors.secondary.green,
    transform: [{ rotate: "30deg" }],
  },
  nopeLabel: {
    top: 50,
    left: 20,
    borderColor: Colors.secondary.red,
    transform: [{ rotate: "-30deg" }],
  },
  infoLabel: {
    top: 50,
    alignSelf: "center",
    borderColor: Colors.primary.accent2,
  },
  overlayText: {
    fontFamily: "Poppins-Bold",
    fontSize: 32,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 2,
  },
});
