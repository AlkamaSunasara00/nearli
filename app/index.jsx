import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../src/hooks/useAuth';
import { useAppTheme } from '../src/hooks/useAppTheme';
import { Typography } from '../src/components/ui/Typography';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { Wrench } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

export default function IndexScreen() {
  const { user, role } = useAuth();
  const { theme } = useAppTheme();
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const checkStateAndNavigate = async () => {
      // Minimum 2-second splash screen duration
      const splashDelay = new Promise(resolve => setTimeout(resolve, 2000));
      let hasCompletedOnboarding = false;

      try {
        const onboardingState = await AsyncStorage.getItem('onboarding_completed');
        hasCompletedOnboarding = onboardingState === 'true';
      } catch (e) {
        console.error('Error reading onboarding state', e);
      }

      await splashDelay;
      setIsReady(true);

      // Routing Logic
      if (!user) {
        if (hasCompletedOnboarding) {
          router.replace('/(auth)/login');
        } else {
          router.replace('/(auth)/onboarding');
        }
        return;
      }

      if (!role) {
        router.replace('/(auth)/role');
        return;
      }

      if (role === 'provider') {
        router.replace('/(provider)/dashboard');
        return;
      }

      router.replace('/(customer)/home');
    };

    checkStateAndNavigate();
  }, [user, role, router]);

  // While checking state, show the Splash Screen
  return (
    <View style={[styles.container, { backgroundColor: theme.colors.brandDark }]}>
      <Animated.View 
        entering={FadeIn.duration(800)} 
        exiting={FadeOut.duration(300)}
        style={styles.content}
      >
        <View style={styles.logoContainer}>
          <Wrench size={64} color="#FFFFFF" />
        </View>
        <Typography variant="display" weight="bold" style={styles.brandName}>
          GarageConnect
        </Typography>
        <Typography variant="body" style={styles.tagline}>
          Find trusted garages nearby
        </Typography>
      </Animated.View>

      <Animated.View 
        entering={FadeIn.delay(400).duration(800)}
        style={styles.footer}
      >
        <Typography variant="caption" style={styles.footerText}>
          Powered by Nearli
        </Typography>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  logoContainer: {
    width: 100,
    height: 100,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  brandName: {
    color: '#FFFFFF',
    marginBottom: 8,
  },
  tagline: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 16,
  },
  footer: {
    position: 'absolute',
    bottom: 40,
  },
  footerText: {
    color: 'rgba(255,255,255,0.6)',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
});

