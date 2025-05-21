import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { ChevronRight, Bell, Shield, CircleHelp as HelpCircle, LogOut } from 'lucide-react-native';
import { Colors, shadowStyles } from '@/constants/Colors';
import { Layout } from '@/constants/Layout';
import PreferenceItem from '@/components/profile/PreferenceItem';
import { mockUser } from '@/data/mockData';

export default function ProfileScreen() {
  const [preferences, setPreferences] = useState(mockUser.preferences);
  
  // Toggle preference value
  const togglePreference = (key: keyof typeof preferences) => {
    if (typeof preferences[key] === 'boolean') {
      setPreferences({
        ...preferences,
        [key]: !preferences[key],
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header with profile info */}
        <View style={styles.header}>
          <Image
            source={{ uri: mockUser.photo }}
            style={styles.profileImage}
          />
          <Text style={styles.name}>{mockUser.name}</Text>
        </View>
        
        {/* Preferences Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          
          <View style={styles.card}>
            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuItemContent}>
                <Text style={styles.menuItemTitle}>Pet Types</Text>
                <Text style={styles.menuItemValue}>
                  {preferences.petTypes.join(', ')}
                </Text>
              </View>
              <ChevronRight size={20} color={Colors.text.tertiary} />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuItemContent}>
                <Text style={styles.menuItemTitle}>Age Range</Text>
                <Text style={styles.menuItemValue}>
                  {preferences.ageRange[0]} - {preferences.ageRange[1]} years
                </Text>
              </View>
              <ChevronRight size={20} color={Colors.text.tertiary} />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuItemContent}>
                <Text style={styles.menuItemTitle}>Max Distance</Text>
                <Text style={styles.menuItemValue}>
                  {preferences.maxDistance} miles
                </Text>
              </View>
              <ChevronRight size={20} color={Colors.text.tertiary} />
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Notifications Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          
          <View style={styles.card}>
            <PreferenceItem
              label="Push Notifications"
              value={preferences.notifications}
              onValueChange={() => togglePreference('notifications')}
              description="Receive notifications for new matches and messages"
            />
          </View>
        </View>
        
        {/* Support Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          
          <View style={styles.card}>
            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuItemIcon}>
                <HelpCircle size={24} color={Colors.primary.accent1} />
              </View>
              <View style={styles.menuItemContent}>
                <Text style={styles.menuItemTitle}>Help & Support</Text>
              </View>
              <ChevronRight size={20} color={Colors.text.tertiary} />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuItemIcon}>
                <Shield size={24} color={Colors.primary.accent1} />
              </View>
              <View style={styles.menuItemContent}>
                <Text style={styles.menuItemTitle}>Privacy Policy</Text>
              </View>
              <ChevronRight size={20} color={Colors.text.tertiary} />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuItemIcon}>
                <Bell size={24} color={Colors.primary.accent1} />
              </View>
              <View style={styles.menuItemContent}>
                <Text style={styles.menuItemTitle}>Terms of Service</Text>
              </View>
              <ChevronRight size={20} color={Colors.text.tertiary} />
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton}>
          <LogOut size={20} color={Colors.secondary.red} />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
        
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>SwipePaw v1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary.background,
  },
  scrollContent: {
    paddingBottom: Layout.spacing.xxl,
  },
  header: {
    alignItems: 'center',
    paddingTop: Layout.spacing.xl,
    paddingBottom: Layout.spacing.lg,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: Colors.primary.accent1,
    marginBottom: Layout.spacing.md,
    ...shadowStyles.medium,
  },
  name: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 24,
    color: Colors.text.primary,
  },
  section: {
    marginTop: Layout.spacing.lg,
    paddingHorizontal: Layout.spacing.lg,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: Colors.text.primary,
    marginBottom: Layout.spacing.sm,
  },
  card: {
    backgroundColor: Colors.ui.cardBackground,
    borderRadius: Layout.borderRadius.medium,
    ...shadowStyles.small,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Layout.spacing.md,
    paddingHorizontal: Layout.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.ui.border,
  },
  menuItemIcon: {
    marginRight: Layout.spacing.md,
  },
  menuItemContent: {
    flex: 1,
  },
  menuItemTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: Colors.text.primary,
  },
  menuItemValue: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.text.secondary,
    marginTop: 2,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Layout.spacing.xl,
    paddingVertical: Layout.spacing.md,
    marginHorizontal: Layout.spacing.lg,
    backgroundColor: 'rgba(231, 76, 60, 0.1)',
    borderRadius: Layout.borderRadius.medium,
  },
  logoutText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: Colors.secondary.red,
    marginLeft: Layout.spacing.sm,
  },
  versionContainer: {
    alignItems: 'center',
    marginTop: Layout.spacing.xl,
  },
  versionText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.text.tertiary,
  },
});