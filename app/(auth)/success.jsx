import React, { useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Check } from 'lucide-react-native';
import Animated, { FadeInDown, FadeIn, withSpring, useAnimatedStyle, useSharedValue, withDelay } from 'react-native-reanimated';
import { useAppTheme } from '../../src/hooks/useAppTheme';
import { Typography } from '../../src/components/ui/Typography';
import { Button } from '../../src/components/ui/Button';

export default function SuccessScreen() {
  const router = useRouter();
  const { theme } = useAppTheme();
  
  const scale = useSharedValue(0);

  useEffect(() => {
    scale.value = withDelay(150, withSpring(1, { damping: 10, stiffness: 100 }));
  }, []);

  const animatedCheckStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.content}>
        
        {/* Animated Checkmark Illustration */}
        <Animated.View entering={FadeIn.duration(400)} style={styles.illustrationContainer}>
          <Animated.View style={[styles.circle, { backgroundColor: theme.colors.success }, animatedCheckStyle]}>
            <Check size={48} color="#FFFFFF" strokeWidth={3} />
          </Animated.View>
          
          {/* Decorative small particles mimicking confetti */}
          <Animated.View entering={FadeIn.delay(300).duration(400)} style={[styles.particle, { top: -20, left: -10, backgroundColor: theme.colors.primary, width: 8, height: 8 }]} />
          <Animated.View entering={FadeIn.delay(400).duration(400)} style={[styles.particle, { top: 20, right: -20, backgroundColor: theme.colors.warning, width: 6, height: 6 }]} />
          <Animated.View entering={FadeIn.delay(500).duration(400)} style={[styles.particle, { bottom: -10, left: 10, backgroundColor: theme.colors.accent, width: 10, height: 10 }]} />
        </Animated.View>

        {/* Text Content */}
        <Animated.View entering={FadeInDown.duration(600).delay(200)} style={styles.textContainer}>
          <Typography variant="display" weight="bold" color="textPrimary" style={styles.title}>
            Phone Number Verified
          </Typography>
          <Typography variant="body" color="textSecondary" style={styles.subtitle}>
            Your mobile number has been successfully verified. Your account is now ready.
          </Typography>
        </Animated.View>
      </View>

      {/* Actions */}
      <Animated.View entering={FadeInDown.duration(600).delay(400)} style={styles.footer}>
        <Button
          title="Continue"
          variant="primary"
          onPress={() => router.replace('/(auth)/role')}
          fullWidth
          style={styles.button}
        />
        <TouchableOpacity style={styles.secondaryButton} onPress={() => router.replace('/(auth)/login')}>
          <Typography variant="body" weight="medium" color="primary">
            Back to Login
          </Typography>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  illustrationContainer: {
    position: 'relative',
    marginBottom: 48,
  },
  circle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#22C55E',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 24,
    elevation: 8,
  },
  particle: {
    position: 'absolute',
    borderRadius: 999,
  },
  textContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    lineHeight: 24,
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  button: {
    height: 56,
    borderRadius: 16,
    marginBottom: 16,
  },
  secondaryButton: {
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
