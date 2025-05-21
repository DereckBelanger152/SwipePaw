import React from 'react';
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  TouchableOpacity,
} from 'react-native';
import { Colors, shadowStyles } from '@/constants/Colors';
import { Layout } from '@/constants/Layout';
import { Pet } from '@/types';

interface RecentMatchProps {
  pet: Pet;
  onPress: () => void;
}

export default function RecentMatch({ pet, onPress }: RecentMatchProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Image source={{ uri: pet.photos[0] }} style={styles.avatar} />
      <Text style={styles.name} numberOfLines={1}>
        {pet.name}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginRight: Layout.spacing.md,
    width: 70,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: Colors.primary.accent1,
    marginBottom: 4,
    ...shadowStyles.small,
  },
  name: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: Colors.text.primary,
    textAlign: 'center',
  },
});