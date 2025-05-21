import { Platform } from 'react-native';

export type Language = 'en' | 'fr';

export const translations = {
  en: {
    appName: 'SwipePaw',
    welcome: {
      title: 'Welcome to SwipePaw! 🐾',
      description: 'Find your perfect furry companion through our trusted network of animal shelters and rescue organizations.',
      features: {
        shelters: {
          title: 'Verified Shelters',
          description: 'Connect with trusted and verified animal shelters in your area'
        },
        matching: {
          title: 'Easy Matching',
          description: 'Swipe through profiles and instantly connect when you find the right pet'
        }
      },
      getStarted: "Let's Get Started!"
    },
    tabs: {
      discover: 'Discover',
      chats: 'Chats',
      profile: 'Profile'
    },
    messages: {
      title: 'Messages',
      recentMatches: 'Recent Matches',
      noMatches: 'No Matches Yet',
      noMatchesDesc: 'Start swiping to match with adoptable pets and chat with shelters!'
    },
    profile: {
      preferences: 'Preferences',
      petTypes: 'Pet Types',
      ageRange: 'Age Range',
      maxDistance: 'Max Distance',
      notifications: {
        title: 'Push Notifications',
        description: 'Receive notifications for new matches and messages'
      },
      support: 'Support',
      helpSupport: 'Help & Support',
      privacyPolicy: 'Privacy Policy',
      termsOfService: 'Terms of Service',
      logout: 'Log Out',
      version: 'SwipePaw v1.0.0'
    },
    common: {
      years: 'years',
      miles: 'miles',
      cancel: 'Cancel',
      save: 'Save',
      back: 'Back'
    }
  },
  fr: {
    appName: 'SwipePaw',
    welcome: {
      title: 'Bienvenue sur SwipePaw! 🐾',
      description: 'Trouvez votre compagnon idéal grâce à notre réseau de refuges et d\'organisations de sauvetage.',
      features: {
        shelters: {
          title: 'Refuges Vérifiés',
          description: 'Connectez-vous avec des refuges de confiance dans votre région'
        },
        matching: {
          title: 'Matching Facile',
          description: 'Parcourez les profils et connectez-vous instantanément avec l\'animal qui vous correspond'
        }
      },
      getStarted: 'Commencer'
    },
    tabs: {
      discover: 'Découvrir',
      chats: 'Messages',
      profile: 'Profil'
    },
    messages: {
      title: 'Messages',
      recentMatches: 'Matchs Récents',
      noMatches: 'Pas Encore de Matchs',
      noMatchesDesc: 'Commencez à swiper pour matcher avec des animaux à adopter et discuter avec les refuges !'
    },
    profile: {
      preferences: 'Préférences',
      petTypes: 'Types d\'Animaux',
      ageRange: 'Tranche d\'Âge',
      maxDistance: 'Distance Maximum',
      notifications: {
        title: 'Notifications Push',
        description: 'Recevez des notifications pour les nouveaux matchs et messages'
      },
      support: 'Support',
      helpSupport: 'Aide & Support',
      privacyPolicy: 'Politique de Confidentialité',
      termsOfService: 'Conditions d\'Utilisation',
      logout: 'Déconnexion',
      version: 'SwipePaw v1.0.0'
    },
    common: {
      years: 'ans',
      miles: 'km',
      cancel: 'Annuler',
      save: 'Enregistrer',
      back: 'Retour'
    }
  }
};