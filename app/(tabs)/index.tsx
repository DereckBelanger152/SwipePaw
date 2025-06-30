import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import SwipePaw from '@/components/SwipePaw';
import WelcomeHeader from '@/components/WelcomeHeader';
import { petData } from '@/data/petData';

const { width, height } = Dimensions.get('window');

export default function DiscoverScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedPets, setLikedPets] = useState<string[]>([]);
  const [superLikedPets, setSuperLikedPets] = useState<string[]>([]);

  const handleSwipe = (direction: 'left' | 'right' | 'super', petId: string) => {
    // Trigger haptic feedback on supported platforms
    if (Platform.OS !== 'web') {
      if (direction === 'super') {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      } else {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      }
    }

    // Update state based on swipe direction
    if (direction === 'right') {
      setLikedPets(prev => [...prev, petId]);
    } else if (direction === 'super') {
      setSuperLikedPets(prev => [...prev, petId]);
    }

    // Move to next pet after a short delay to allow animation to complete
    setTimeout(() => {
      setCurrentIndex(prev => prev + 1);
    }, 100);
  };

  const currentPet = petData[currentIndex];

  return (
    <LinearGradient
      colors={['#F8FAFC', '#F1F5F9', '#E2E8F0']}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <WelcomeHeader />
        
        <View style={styles.cardContainer}>
          {currentPet ? (
            <SwipePaw
              pet={currentPet}
              onSwipe={handleSwipe}
            />
          ) : (
            <View style={styles.noMorePets}>
              <Text style={styles.noMorePetsTitle}>🐾 That's all for now!</Text>
              <Text style={styles.noMorePetsSubtitle}>
                Check back later for more adorable pets
              </Text>
              <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>{likedPets.length}</Text>
                  <Text style={styles.statLabel}>Liked</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>{superLikedPets.length}</Text>
                  <Text style={styles.statLabel}>Super Liked</Text>
                </View>
              </View>
            </View>
          )}
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  noMorePets: {
    alignItems: 'center',
    padding: 40,
  },
  noMorePetsTitle: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    marginBottom: 12,
    textAlign: 'center',
  },
  noMorePetsSubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 24,
  },
  statItem: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statNumber: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
  },
  statLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginTop: 4,
  },
});