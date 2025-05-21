import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Check } from "lucide-react-native";
import { Colors } from "@/constants/Colors";
import { Layout } from "@/constants/Layout";
import Button from "@/components/ui/Button";

interface PetTypeSelectorProps {
  visible: boolean;
  selectedTypes: string[];
  onClose: () => void;
  onSave: (types: string[]) => void;
}

const PET_TYPES = [
  "Dog",
  "Cat",
  "Bird",
  "Rabbit",
  "Hamster",
  "Guinea Pig",
  "Fish",
  "Reptile",
  "Other",
];

export default function PetTypeSelector({
  visible,
  selectedTypes,
  onClose,
  onSave,
}: PetTypeSelectorProps) {
  const [selected, setSelected] = useState<string[]>(selectedTypes);

  const toggleType = (type: string) => {
    setSelected((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleSave = () => {
    onSave(selected);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Pet Types</Text>
          <Text style={styles.subtitle}>
            Select the types of pets you're interested in
          </Text>

          <ScrollView style={styles.list}>
            {PET_TYPES.map((type) => (
              <TouchableOpacity
                key={type}
                style={styles.option}
                onPress={() => toggleType(type)}
              >
                <Text style={styles.optionText}>{type}</Text>
                {selected.includes(type) && (
                  <Check size={24} color={Colors.primary.accent1} />
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={styles.buttons}>
            <Button
              title="Cancel"
              onPress={onClose}
              variant="ghost"
              style={styles.button}
            />
            <Button
              title="Save"
              onPress={handleSave}
              variant="primary"
              style={styles.button}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.ui.overlay,
    justifyContent: "flex-end",
  },
  content: {
    backgroundColor: Colors.ui.cardBackground,
    borderTopLeftRadius: Layout.borderRadius.large,
    borderTopRightRadius: Layout.borderRadius.large,
    padding: Layout.spacing.lg,
    maxHeight: "80%",
  },
  title: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 24,
    color: Colors.text.primary,
    marginBottom: Layout.spacing.xs,
  },
  subtitle: {
    fontFamily: "Inter-Regular",
    fontSize: 16,
    color: Colors.text.secondary,
    marginBottom: Layout.spacing.lg,
  },
  list: {
    marginBottom: Layout.spacing.lg,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: Layout.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.ui.border,
  },
  optionText: {
    fontFamily: "Inter-Medium",
    fontSize: 16,
    color: Colors.text.primary,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    marginHorizontal: Layout.spacing.xs,
  },
});
