import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Heart } from 'lucide-react-native';

export default function WelcomeHeader() {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Heart color="#FF4458" size={28} fill="#FF4458" />
        <Text style={styles.title}>SwipePaw</Text>
      </View>
      <Text style={styles.subtitle}>Find your perfect furry companion</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    marginLeft: 12,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
});