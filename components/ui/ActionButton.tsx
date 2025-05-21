import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { Colors } from '@/constants/Colors';
import { Layout } from '@/constants/Layout';

interface ActionButtonProps {
  onPress: () => void;
  icon: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'negative' | 'info';
  size?: 'small' | 'medium' | 'large';
  style?: ViewStyle;
}

export default function ActionButton({
  onPress,
  icon,
  variant = 'primary',
  size = 'medium',
  style,
}: ActionButtonProps) {
  // Animation values
  const scale = useSharedValue(1);

  // Get button size based on size prop
  const buttonSize = size === 'small' ? 44 : size === 'medium' ? 56 : 68;

  // Get background color based on variant
  const getBackgroundColor = () => {
    switch (variant) {
      case 'primary':
        return Colors.primary.accent1;
      case 'secondary':
        return Colors.primary.accent2;
      case 'negative':
        return Colors.secondary.red;
      case 'info':
        return 'white';
      default:
        return Colors.primary.accent1;
    }
  };

  // Animated styles
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  // Handle press animations
  const handlePressIn = () => {
    scale.value = withSpring(0.9, { damping: 12 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 12 });
  };

  return (
    <Animated.View style={[animatedStyle, style]}>
      <TouchableOpacity
        style={[
          styles.button,
          {
            width: buttonSize,
            height: buttonSize,
            backgroundColor: getBackgroundColor(),
            borderWidth: variant === 'info' ? 1 : 0,
          },
        ]}
        onPress={onPress}
        activeOpacity={0.8}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        {icon}
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.ui.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
});
