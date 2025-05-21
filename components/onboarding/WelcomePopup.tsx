import React, { useEffect } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  BackHandler,
} from "react-native";
import { X } from "lucide-react-native";
import { Colors, shadowStyles } from "@/constants/Colors";
import { Layout } from "@/constants/Layout";
import Button from "@/components/ui/Button";
import { useLanguage } from "@/context/LanguageContext";

interface WelcomePopupProps {
  visible: boolean;
  onClose: () => void;
}

export default function WelcomePopup({ visible, onClose }: WelcomePopupProps) {
  const { t } = useLanguage();

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        if (visible) {
          onClose();
          return true;
        }
        return false;
      }
    );

    return () => backHandler.remove();
  }, [visible, onClose]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.popup}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
            activeOpacity={0.7}
          >
            <X size={24} color={Colors.text.tertiary} />
          </TouchableOpacity>

          <Image
            source={{
              uri: "https://images.pexels.com/photos/1404819/pexels-photo-1404819.jpeg",
            }}
            style={styles.image}
          />

          <Text style={styles.title}>{t("welcome.title")}</Text>

          <Text style={styles.description}>{t("welcome.description")}</Text>

          <View style={styles.features}>
            <View style={styles.featureItem}>
              <Text style={styles.featureTitle}>
                {t("welcome.features.shelters.title")}
              </Text>
              <Text style={styles.featureText}>
                {t("welcome.features.shelters.description")}
              </Text>
            </View>

            <View style={styles.featureItem}>
              <Text style={styles.featureTitle}>
                {t("welcome.features.matching.title")}
              </Text>
              <Text style={styles.featureText}>
                {t("welcome.features.matching.description")}
              </Text>
            </View>
          </View>

          <Button
            title={t("welcome.getStarted")}
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
