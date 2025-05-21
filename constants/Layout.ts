import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const Layout = {
  window: {
    width,
    height,
  },
  screen: Dimensions.get('screen'),
  isSmallDevice: width < 375,
  
  // Spacing system (8px base)
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  
  // Border radius
  borderRadius: {
    small: 6,
    medium: 12, // Primary radius for cards
    large: 24,
    full: 999,
  },
  
  // Card dimensions
  card: {
    width: width - 32, // Card width with 16px margins on each side
    height: height * 0.65, // Card takes about 65% of screen height
    imageHeight: height * 0.45, // Image takes 70% of card height
  },
};