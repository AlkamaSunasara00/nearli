import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAppTheme } from '../../src/hooks/useAppTheme';
import { Typography } from '../../src/components/ui/Typography';
import { Button } from '../../src/components/ui/Button';
import { Wrench, Star } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function WelcomeScreen() {
  const { theme } = useAppTheme();
  const router = useRouter();

  const handleGetStarted = async () => {
    try {
      await AsyncStorage.setItem('onboarding_completed', 'true');
    } catch (e) {
      console.error('Failed to save onboarding state', e);
    }
    // Navigate to phone login (login screen)
    router.replace('/(auth)/login');
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: 'transparent' }]}>
      <View style={styles.container}>
        
        {/* Custom Illustration */}
        <View style={styles.illustrationContainer}>
          <View style={[styles.circle, { backgroundColor: theme.colors.primarySoft }]}>
             <Wrench size={80} color={theme.colors.primary} />
          </View>
          <View style={[styles.floatingBadge, { backgroundColor: theme.colors.surface }]}>
            <Star size={24} color={theme.colors.warning} fill={theme.colors.warning} />
            <Typography variant="body" weight="bold" style={styles.badgeText}>4.9</Typography>
          </View>
        </View>

        {/* Content */}
        <View style={styles.content}>
          <Typography variant="display" weight="bold" align="center" style={styles.title}>
            Your <Typography variant="display" weight="bold" color="primary">Garage</Typography>{'\n'}Is Just Around the Corner
          </Typography>
          
          <Typography variant="body" color="textSecondary" align="center" style={styles.subtitle}>
            Find nearby trusted garages, compare services, and connect instantly whenever your vehicle needs help.
          </Typography>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Button
            title="Get Started"
            variant="primary"
            onPress={handleGetStarted}
            style={styles.button}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: 40,
  },
  illustrationContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    position: 'relative',
  },
  circle: {
    width: width * 0.6,
    height: width * 0.6,
    borderRadius: (width * 0.6) / 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  floatingBadge: {
    position: 'absolute',
    bottom: '20%',
    right: 40,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  badgeText: {
    marginLeft: 8,
  },
  content: {
    paddingHorizontal: 32,
    alignItems: 'center',
    paddingBottom: 24,
  },
  title: {
    marginBottom: 16,
    lineHeight: 36,
  },
  subtitle: {
    lineHeight: 24,
  },
  footer: {
    padding: 32,
    paddingBottom: 48,
  },
  button: {
    height: 56,
    borderRadius: 16,
  },
});
