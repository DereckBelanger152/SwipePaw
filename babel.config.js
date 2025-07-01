// Babel configuration for Expo React Native project
// Babel transforms modern JavaScript/TypeScript into code that runs on devices
module.exports = function (api) {
  api.cache(true);  // Cache the config for better performance
  
  return {
    // Use Expo's preset which includes React Native transforms
    presets: ['babel-preset-expo'],
    
    plugins: [
      [
        // Module resolver plugin allows using @ aliases in imports
        // Example: import { Pet } from '@/types/pet' instead of '../../types/pet'
        'module-resolver',
        {
          root: ['./'],           // Start resolving from project root
          alias: {
            '@': '.',             // @ symbol points to project root
          },
        },
      ],
    ],
  };
};