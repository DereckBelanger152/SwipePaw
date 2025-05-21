import React, { useState } from "react";
import { View, Text, StyleSheet, Modal, TextInput } from "react-native";
import { Colors } from "@/constants/Colors";
import { Layout } from "@/constants/Layout";
import Button from "@/components/ui/Button";

interface RangeSelectorProps {
  visible: boolean;
  title: string;
  value: [number, number];
  min: number;
  max: number;
  step: number;
  unit: string;
  onClose: () => void;
  onSave: (range: [number, number]) => void;
}

export default function RangeSelector({
  visible,
  title,
  value,
  min,
  max,
  step,
  unit,
  onClose,
  onSave,
}: RangeSelectorProps) {
  const [range, setRange] = useState<[number, number]>(value);

  const handleChange = (index: number, val: string) => {
    // Assure conversion sécuritaire en nombre
    let num = parseInt(val.replace(/[^0-9]/g, ""), 10);
    if (isNaN(num)) num = min;
    if (num < min) num = min;
    if (num > max) num = max;

    let updated: [number, number] = [...range] as [number, number];
    updated[index] = num;
    setRange(updated);
  };

  const handleSave = () => {
    // Optionnel: Valider que min <= max avant de save
    onSave([Math.min(range[0], range[1]), Math.max(range[0], range[1])]);
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
          <Text style={styles.title}>{title}</Text>
          <View style={styles.inputsContainer}>
            <View style={styles.inputBlock}>
              <Text style={styles.label}>Min</Text>
              <TextInput
                style={styles.input}
                keyboardType="number-pad"
                value={range[0].toString()}
                onChangeText={(val) => handleChange(0, val)}
                maxLength={5}
              />
              <Text style={styles.unit}>{unit}</Text>
            </View>
            <View style={styles.inputBlock}>
              <Text style={styles.label}>Max</Text>
              <TextInput
                style={styles.input}
                keyboardType="number-pad"
                value={range[1].toString()}
                onChangeText={(val) => handleChange(1, val)}
                maxLength={5}
              />
              <Text style={styles.unit}>{unit}</Text>
            </View>
          </View>
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
  },
  title: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 24,
    color: Colors.text.primary,
    marginBottom: Layout.spacing.lg,
  },
  inputsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: Layout.spacing.lg,
  },
  inputBlock: {
    flex: 1,
    alignItems: "center",
  },
  label: {
    fontFamily: "Inter-Medium",
    fontSize: 14,
    color: Colors.text.secondary,
    marginBottom: 4,
  },
  input: {
    fontFamily: "Inter-Medium",
    fontSize: 20,
    borderWidth: 1,
    borderColor: Colors.ui.border,
    borderRadius: 8,
    padding: 8,
    width: 80,
    textAlign: "center",
    color: Colors.text.primary,
    backgroundColor: Colors.ui.cardBackground,
  },
  unit: {
    fontFamily: "Inter-Regular",
    fontSize: 12,
    color: Colors.text.secondary,
    marginTop: 2,
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
