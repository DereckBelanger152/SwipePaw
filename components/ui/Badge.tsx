import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Layout } from '@/constants/Layout';

interface BadgeProps {
  label: string;
  variant?: 'primary' | 'verified' | 'success' | 'warning' | 'error' | 'neutral';
  size?: 'small' | 'medium';
  icon?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export default function Badge({
  label,
  variant = 'primary',
  size = 'small',
  icon,
  style,
  textStyle,
}: BadgeProps) {
  // Determine badge color based on variant
  const getBackgroundColor = () => {
    switch (variant) {
      case 'primary':
        return Colors.primary.accent1;
      case 'verified':
        return Colors.secondary.purple;
      case 'success':
        return Colors.secondary.green;
      case 'warning':
        return Colors.secondary.yellow;
      case 'error':
        return Colors.secondary.red;
      case 'neutral':
        return Colors.text.tertiary;
      default:
        return Colors.primary.accent1;
    }
  };

  return (
    <View
      style={[
        styles.badge,
        styles[`${size}Badge`],
        { backgroundColor: getBackgroundColor() },
        style,
      ]}
    >
      {icon && <View style={styles.iconContainer}>{icon}</View>}
      <Text
        style={[
          styles.text,
          styles[`${size}Text`],
          textStyle,
        ]}
      >
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 999,
    paddingHorizontal: Layout.spacing.sm,
  },
  
  // Size variations
  smallBadge: {
    height: 22,
    paddingHorizontal: Layout.spacing.xs,
  },
  mediumBadge: {
    height: 28,
    paddingHorizontal: Layout.spacing.sm,
  },
  
  // Text styles
  text: {
    color: Colors.text.light,
    fontFamily: 'Inter-Medium',
  },
  smallText: {
    fontSize: 10,
  },
  mediumText: {
    fontSize: 12,
  },
  
  // Icon container
  iconContainer: {
    marginRight: 4,
  },
});