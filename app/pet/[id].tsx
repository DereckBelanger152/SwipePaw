import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { X, MapPin, Heart } from 'lucide-react-native';
import { Colors, shadowStyles } from '@/constants/Colors';
import { Layout } from '@/constants/Layout';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { mockPets } from '@/data/mockData';

export default function PetDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { width } = useWindowDimensions();
  
  // Find pet by ID
  const pet = mockPets.find(p => p.id === id);
  
  if (!pet) {
    return (
      <View style={styles.container}>
        <Text>Pet not found</Text>
      </View>
    );
  }
  
  // Handle close button
  const handleClose = () => {
    router.back();
  };
  
  // Handle adopt button
  const handleAdopt = () => {
    // In a real app, this would initiate the adoption process
    // For this demo, we'll just go back
    router.back();
  };

  return (
    <View style={styles.container}>
      {/* Close button */}
      <TouchableOpacity
        style={styles.closeButton}
        onPress={handleClose}
      >
        <X size={24} color={Colors.text.primary} />
      </TouchableOpacity>
      
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        {/* Pet images */}
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          style={styles.imageCarousel}
        >
          {pet.photos.map((photo, index) => (
            <Image
              key={index}
              source={{ uri: photo }}
              style={[styles.petImage, { width }]}
              resizeMode="cover"
            />
          ))}
        </ScrollView>
        
        {/* Pet info section */}
        <View style={styles.infoContainer}>
          <View style={styles.headerSection}>
            <View style={styles.nameContainer}>
              <Text style={styles.petName}>{pet.name}</Text>
              <Text style={styles.petAge}>{pet.age}</Text>
            </View>
            
            <Text style={styles.breed}>{pet.breed}</Text>
            
            <View style={styles.locationContainer}>
              <MapPin size={16} color={Colors.text.secondary} />
              <Text style={styles.location}>{pet.location}</Text>
              <Text style={styles.distance}>• {pet.distance}</Text>
            </View>
          </View>
          
          {/* Shelter info */}
          {pet.shelterName && (
            <View style={styles.shelterContainer}>
              <View style={styles.shelterInfo}>
                <Text style={styles.shelterLabel}>Shelter</Text>
                <Text style={styles.shelterName}>{pet.shelterName}</Text>
              </View>
              
              {pet.shelterVerified && (
                <Badge
                  label="Verified"
                  variant="verified"
                  size="medium"
                />
              )}
            </View>
          )}
          
          {/* Pet facts */}
          <View style={styles.factsContainer}>
            {pet.facts.map((fact, index) => (
              <View key={index} style={styles.factItem}>
                <Text style={styles.factValue}>{fact.value}</Text>
                <Text style={styles.factLabel}>{fact.label}</Text>
              </View>
            ))}
          </View>
          
          {/* Description */}
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionTitle}>About</Text>
            <Text style={styles.description}>{pet.description}</Text>
          </View>
          
          {/* Adoption info */}
          {pet.adoptable && (
            <View style={styles.adoptionContainer}>
              <Button
                title="Start Adoption Process"
                onPress={handleAdopt}
                variant="primary"
                size="large"
                icon={<Heart size={16} color="white" style={{ marginRight: 8 }} />}
                iconPosition="left"
              />
              
              <Text style={styles.adoptionNote}>
                By proceeding, you'll be connected with {pet.shelterName || 'the shelter'} to schedule a meet and greet.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.ui.cardBackground,
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    ...shadowStyles.small,
  },
  imageCarousel: {
    height: 300,
  },
  petImage: {
    height: 300,
  },
  infoContainer: {
    backgroundColor: Colors.ui.cardBackground,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -20,
    paddingHorizontal: Layout.spacing.lg,
    paddingTop: Layout.spacing.lg,
    paddingBottom: Layout.spacing.xxl,
  },
  headerSection: {
    marginBottom: Layout.spacing.lg,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Layout.spacing.xs,
  },
  petName: {
    fontFamily: 'Poppins-Bold',
    fontSize: 28,
    color: Colors.text.primary,
  },
  petAge: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: Colors.text.secondary,
  },
  breed: {
    fontFamily: 'Inter-Medium',
    fontSize: 18,
    color: Colors.text.secondary,
    marginBottom: Layout.spacing.sm,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.text.secondary,
    marginLeft: Layout.spacing.xs,
  },
  distance: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.text.secondary,
    marginLeft: Layout.spacing.xs,
  },
  shelterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.primary.background,
    padding: Layout.spacing.md,
    borderRadius: Layout.borderRadius.medium,
    marginBottom: Layout.spacing.lg,
  },
  shelterInfo: {
    flex: 1,
  },
  shelterLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.text.secondary,
    marginBottom: 2,
  },
  shelterName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: Colors.text.primary,
  },
  factsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: Layout.spacing.lg,
  },
  factItem: {
    width: '48%',
    backgroundColor: Colors.primary.background,
    padding: Layout.spacing.md,
    borderRadius: Layout.borderRadius.medium,
    marginBottom: Layout.spacing.sm,
  },
  factValue: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: Colors.text.primary,
    marginBottom: 2,
  },
  factLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.text.secondary,
  },
  descriptionContainer: {
    marginBottom: Layout.spacing.xl,
  },
  descriptionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: Colors.text.primary,
    marginBottom: Layout.spacing.sm,
  },
  description: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    lineHeight: 24,
    color: Colors.text.secondary,
  },
  adoptionContainer: {
    borderTopWidth: 1,
    borderTopColor: Colors.ui.border,
    paddingTop: Layout.spacing.lg,
  },
  adoptionNote: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.text.tertiary,
    textAlign: 'center',
    marginTop: Layout.spacing.md,
  },
});