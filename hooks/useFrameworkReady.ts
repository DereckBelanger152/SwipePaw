// React hook imports
import { useEffect } from 'react';

// TypeScript declaration to extend the global Window interface
// This tells TypeScript that window.frameworkReady might exist
declare global {
  interface Window {
    frameworkReady?: () => void;  // Optional function that gets called when framework is ready
  }
}

// Custom hook that signals when the React framework is ready
// This is typically used in web environments where external code needs to know
// when React has finished loading and is ready to receive commands
export function useFrameworkReady() {
  useEffect(() => {
    // Call the frameworkReady function if it exists on the window object
    // The ?. is optional chaining - only calls the function if it exists
    window.frameworkReady?.();
  }, []); // Empty dependency array means this only runs once when component mounts
}