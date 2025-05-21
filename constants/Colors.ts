export const Colors = {
  // Primary palette
  primary: {
    background: '#F5F0E8', // Warm neutral
    accent1: '#FF7E54',    // Playful orange/coral
    accent2: '#4ECDC4',    // Teal
  },
  
  // Secondary palette
  secondary: {
    purple: '#9B5DE5',     // For verified badges
    green: '#2ECC71',      // Success states
    red: '#E74C3C',        // Error/negative states
    yellow: '#F1C40F',     // Warning states
  },
  
  // Neutral palette for text and UI
  text: {
    primary: '#333333',    // Dark text
    secondary: '#666666',  // Medium contrast text
    tertiary: '#999999',   // Low contrast text
    light: '#FFFFFF',      // Light text for dark backgrounds
  },
  
  // UI elements
  ui: {
    cardBackground: '#FFFFFF',
    shadow: 'rgba(0, 0, 0, 0.08)',
    border: 'rgba(0, 0, 0, 0.12)',
    overlay: 'rgba(0, 0, 0, 0.6)',
  }
};

export const shadowStyles = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 5,
    elevation: 3,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6,
  },
};