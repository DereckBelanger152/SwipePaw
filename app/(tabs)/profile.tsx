import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Settings, Heart, MessageCircle, Camera } from 'lucide-react-native';
import ActionButton from '@/components/ActionButton';
import ProfileCard from '@/components/ProfileCard';

export default function ProfileScreen() {
  return (
    <LinearGradient
      colors={['#F0F9FF', '#FEF3C7', '#F0FDF4']}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <View style={styles.profileImageContainer}>
              <Image
                source={{ uri: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400' }}
                style={styles.profileImage}
              />
              <View style={styles.cameraButton}>
                <Camera color="#FFFFFF" size={16} />
              </View>
            </View>
            
            <Text style={styles.userName}>Alex Johnson</Text>
            <Text style={styles.userBio}>Pet lover • Dog parent • Cat enthusiast</Text>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Heart color="#FF6B8A" size={24} />
              <Text style={styles.statNumber}>127</Text>
              <Text style={styles.statLabel}>Pets Liked</Text>
            </View>
            <View style={styles.statItem}>
              <MessageCircle color="#6BB6FF" size={24} />
              <Text style={styles.statNumber}>23</Text>
              <Text style={styles.statLabel}>Matches</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Preferences</Text>
            <ProfileCard
              title="Favorite Pet Types"
              subtitle="Dogs, Cats, Rabbits"
              icon={<Heart color="#FF6B8A" size={20} />}
            />
            <ProfileCard
              title="Account Settings"
              subtitle="Privacy, notifications, and more"
              icon={<Settings color="#6B7280" size={20} />}
            />
          </View>

          <ActionButton
            title="Edit Profile"
            onPress={() => {}}
            style={styles.editButton}
          />
        </ScrollView>
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
  content: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 24,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#FFFFFF',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: '#6BB6FF',
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  userName: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  userBio: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 20,
    marginHorizontal: 8,
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
    marginTop: 8,
  },
  statLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginTop: 4,
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  editButton: {
    backgroundColor: '#4ECDC4',
    marginHorizontal: 24,
    marginBottom: 32,
  },
});