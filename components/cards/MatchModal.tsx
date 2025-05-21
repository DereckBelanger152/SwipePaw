import React, { useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  Modal, 
  Animated,
  Platform
} from 'react-native';
import { Heart } from 'lucide-react-native';
import { Colors, shadowStyles } from '@/constants/Colors';
import { Layout } from '@/constants/Layout';
import Button from '../ui/Button';
import { Pet, User } from '@/types';

interface MatchModalProps {
  visible: boolean;
  pet: Pet;
  user: User;
  onClose: () => void;
  onStartChat: () => void;
}

export default function MatchModal({ 
  visible, 
  pet, 
  user, 
  onClose, 
  onStartChat 
}: MatchModalProps) {
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const heartScale = useRef(new Animated.Value(0.3)).current;
  
  useEffect(() => {
    if (visible) {
      // Reset animations when modal becomes visible
      fadeAnim.setValue(0);
      scaleAnim.setValue(0.5);
      heartScale.setValue(0.3);
      
      // Start animations
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: Platform.OS !== 'web',
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 8,
          useNativeDriver: Platform.OS !== 'web',
        }),
        Animated.sequence([
          Animated.delay(300),
          Animated.spring(heartScale, {
            toValue: 1.2,
            friction: 3,
            useNativeDriver: Platform.OS !== 'web',
          }),
          Animated.spring(heartScale, {
            toValue: 1,
            friction: 5,
            useNativeDriver: Platform.OS !== 'web',
          }),
        ]),
      ]).start();
      
      // Play haptic feedback on match
      if (Platform.OS !== 'web') {
        // This would be implemented with Expo Haptics
        // But we skip it for web compatibility
      }
    }
  }, [visible, fadeAnim, scaleAnim, heartScale]);
  
  if (!pet || !user) {
    return null;
  }

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      onRequestClose={onClose}
    >
      <Animated.View 
        style={[
          styles.container,
          { 
            opacity: fadeAnim,
          }
        ]}
      >
        <Animated.View 
          style={[
            styles.content,
            {
              transform: [{ scale: scaleAnim }],
            }
          ]}
        >
          <Text style={styles.matchTitle}>It's a Match!</Text>
          
          <View style={styles.imagesContainer}>
            <View style={[styles.imageWrapper, styles.userImageWrapper]}>
              <Image source={{ uri: user.photo }} style={styles.image} />
            </View>
            
            <Animated.View 
              style={[
                styles.heartContainer,
                {
                  transform: [{ scale: heartScale }],
                }
              ]}
            >
              <Heart size={48} color={Colors.primary.accent1} fill={Colors.primary.accent1} />
            </Animated.View>
            
            <View style={[styles.imageWrapper, styles.petImageWrapper]}>
              <Image source={{ uri: pet.photos[0] }} style={styles.image} />
            </View>
          </View>
          
          <Text style={styles.matchDescription}>
            You and {pet.name} have liked each other!
          </Text>
          
          <View style={styles.factsList}>
            {pet.facts.slice(0, 2).map((fact, index) => (
              <View key={index} style={styles.factItem}>
                <Text style={styles.factValue}>{fact.value}</Text>
                <Text style={styles.factLabel}>{fact.label}</Text>
              </View>
            ))}
          </View>
          
          <View style={styles.buttonsContainer}>
            <Button
              title="Start Chat"
              onPress={onStartChat}
              variant="primary"
              size="large"
              style={styles.button}
            />
            
            <Button
              title="Keep Browsing"
              onPress={onClose}
              variant="ghost"
              size="medium"
              style={styles.secondaryButton}
            />
          </View>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.ui.overlay,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Layout.spacing.lg,
  },
  content: {
    backgroundColor: Colors.ui.cardBackground,
    borderRadius: Layout.borderRadius.medium,
    padding: Layout.spacing.xl,
    width: '100%',
    maxWidth: 360,
    alignItems: 'center',
    ...shadowStyles.large,
  },
  matchTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: Colors.primary.accent1,
    marginBottom: Layout.spacing.lg,
    textAlign: 'center',
  },
  imagesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Layout.spacing.lg,
  },
  imageWrapper: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
    ...shadowStyles.medium,
  },
  userImageWrapper: {
    borderWidth: 2,
    borderColor: Colors.primary.accent1,
  },
  petImageWrapper: {
    borderWidth: 2,
    borderColor: Colors.primary.accent2,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  heartContainer: {
    marginHorizontal: Layout.spacing.md,
  },
  matchDescription: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: Colors.text.primary,
    textAlign: 'center',
    marginBottom: Layout.spacing.md,
  },
  factsList: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: Layout.spacing.xl,
  },
  factItem: {
    alignItems: 'center',
  },
  factValue: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: Colors.text.primary,
  },
  factLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.text.secondary,
  },
  buttonsContainer: {
    width: '100%',
  },
  button: {
    marginBottom: Layout.spacing.md,
  },
  secondaryButton: {
    marginBottom: Layout.spacing.xs,
  },
});