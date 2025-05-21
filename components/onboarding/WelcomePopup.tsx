import React from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { X } from "lucide-react-native";
import { Colors, shadowStyles } from "@/constants/Colors";
import { Layout } from "@/constants/Layout";
import Button from "@/components/ui/Button";

interface WelcomePopupProps {
  visible: boolean;
  onClose: () => void;
}

export default function WelcomePopup({ visible, onClose }: WelcomePopupProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.popup}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <X size={24} color={Colors.text.tertiary} />
          </TouchableOpacity>

          <Image
            source={{
              uri: "https://images.pexels.com/photos/1404819/pexels-photo-1404819.jpeg",
            }}
            style={styles.image}
          />

          <Text style={styles.title}>Bienvenue sur SwipePaw! 🐾</Text>

          <Text style={styles.description}>
            SwipePaw est un moyen amusant de passer le temps en swipant des
            animaux. Mais ce n'est pas que ça ! Nous avons également ajouté des
            cartes spéciales sponsorisées SPCA qui représentent de vrais animaux
            près de chez vous en besoin d'un foyer.
          </Text>

          <View style={styles.features}>
            <View style={styles.featureItem}>
              <Text style={styles.featureTitle}>Données SPCA vérifiées</Text>
              <Text style={styles.featureText}>
                Toutes les cartes sponsorisées proviennent de banque de donnée
                officielle de la SPCA et sont vérifiées pour leur exactitude.
              </Text>
            </View>

            <View style={styles.featureItem}>
              <Text style={styles.featureTitle}>Adoption Facile</Text>
              <Text style={styles.featureText}>
                Si vous avez un coup de cœur pour un animal, un simple swipe à
                droite vous ouvrira la porte à une adoption facile et rapide.
                Jettez un coup d'oeil à vos conversartions!
              </Text>
            </View>
          </View>

          <Button
            title="C'est compris!"
            onPress={onClose}
            variant="primary"
            size="large"
            style={styles.button}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.ui.overlay,
    justifyContent: "center",
    alignItems: "center",
    padding: Layout.spacing.lg,
  },
  popup: {
    backgroundColor: Colors.ui.cardBackground,
    borderRadius: Layout.borderRadius.large,
    padding: Layout.spacing.xl,
    width: "100%",
    maxWidth: 400,
    alignItems: "center",
    ...shadowStyles.large,
  },
  closeButton: {
    position: "absolute",
    top: Layout.spacing.md,
    right: Layout.spacing.md,
    padding: Layout.spacing.xs,
    zIndex: 1,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: Layout.spacing.lg,
  },
  title: {
    fontFamily: "Poppins-Bold",
    fontSize: 24,
    color: Colors.text.primary,
    marginBottom: Layout.spacing.md,
    textAlign: "center",
  },
  description: {
    fontFamily: "Inter-Regular",
    fontSize: 16,
    color: Colors.text.secondary,
    textAlign: "center",
    marginBottom: Layout.spacing.xl,
    lineHeight: 24,
  },
  features: {
    width: "100%",
    marginBottom: Layout.spacing.xl,
  },
  featureItem: {
    marginBottom: Layout.spacing.lg,
  },
  featureTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 18,
    color: Colors.text.primary,
    marginBottom: Layout.spacing.xs,
  },
  featureText: {
    fontFamily: "Inter-Regular",
    fontSize: 14,
    color: Colors.text.secondary,
    lineHeight: 20,
  },
  button: {
    width: "100%",
  },
});
