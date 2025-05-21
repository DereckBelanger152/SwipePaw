import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { View } from 'react-native';
import { Colors } from '@/constants/Colors';

export default function RootLayout() {
  useFrameworkReady();

  return (
    <View style={{ flex: 1, backgroundColor: Colors.primary.background }}>
      <Stack screenOptions={{ 
        headerShown: false,
        contentStyle: { backgroundColor: Colors.primary.background }
      }}>
        <Stack.Screen name="(tabs)" />
      </Stack>
      <StatusBar style="auto" />
    </View>
  );
}