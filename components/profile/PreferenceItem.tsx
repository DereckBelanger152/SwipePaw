import React from 'react';
import { View, Text, StyleSheet, Switch, ViewStyle } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Layout } from '@/constants/Layout';

interface PreferenceItemProps {
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  description?: string;
  style?: ViewStyle;
}

export default function PreferenceItem({
  label,
  value,
  onValueChange,
  description,
  style,
}: PreferenceItemProps) {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.textContainer}>
        <Text style={styles.label}>{label}</Text>
        {description && (
          <Text style={styles.description}>{description}</Text>
        )}
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{
          false: '#e0e0e0',
          true: Colors.primary.accent1,
        }}
        thumbColor="#ffffff"
        ios_backgroundColor="#e0e0e0"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Layout.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.ui.border,
  },
  textContainer: {
    flex: 1,
    marginRight: Layout.spacing.md,
  },
  label: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: Colors.text.primary,
    marginBottom: 2,
  },
  description: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.text.secondary,
  },
});