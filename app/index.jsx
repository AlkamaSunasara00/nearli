import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../src/hooks/useAuth';
import { useAppTheme } from '../src/hooks/useAppTheme';
import { Typography } from '../src/components/ui/Typography';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withDelay,
  Easing,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path, Circle, Defs, RadialGradient as SvgRadialGradient, Stop } from 'react-native-svg';
import { Wrench } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

// Abstract SVG Background (Subtle Map/Location Atmosphere)
const LocationAtmosphere = ({ theme }) => (
  <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
    <Svg width={width} height={height} opacity={0.06}>
      <Defs>
        <SvgRadialGradient id="glow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <Stop offset="0%" stopColor={theme.colors.accentBlue} stopOpacity="1" />
          <Stop offset="100%" stopColor={theme.colors.primarySoft} stopOpacity="0" />
        </SvgRadialGradient>
      </Defs>
      <Circle cx={width / 2} cy={height / 2} r={width * 0.8} fill="url(#glow)" />
      
      {/* Subtle Map Lines */}
      <Path d={`M -50 ${height * 0.3} Q ${width * 0.5} ${height * 0.2} ${width + 50} ${height * 0.4}`} stroke={theme.colors.white} strokeWidth="1" opacity="0.3" fill="none" />
      <Path d={`M -50 ${height * 0.6} Q ${width * 0.5} ${height * 0.7} ${width + 50} ${height * 0.5}`} stroke={theme.colors.white} strokeWidth="1" opacity="0.2" fill="none" />
      <Path d={`M ${width * 0.3} -50 Q ${width * 0.4} ${height * 0.5} ${width * 0.2} ${height + 50}`} stroke={theme.colors.white} strokeWidth="1" opacity="0.15" fill="none" />
      
      {/* Tiny Location Nodes */}
      <Circle cx={width * 0.2} cy={height * 0.35} r={3} fill={theme.colors.accentPurple} opacity="0.6" />
      <Circle cx={width * 0.8} cy={height * 0.65} r={4} fill={theme.colors.accentBlue} opacity="0.5" />
      <Circle cx={width * 0.6} cy={height * 0.2} r={2} fill={theme.colors.accentOrange} opacity="0.4" />
    </Svg>
  </View>
);

export default function IndexScreen() {
  const { user, role } = useAuth();
  const { theme } = useAppTheme();
  const router = useRouter();

  // Animation Values
  const logoScale = useSharedValue(0.94);
  const logoOpacity = useSharedValue(0);
  const textOpacity = useSharedValue(0);
  const textTranslateY = useSharedValue(10);
  const loadingProgress = useSharedValue(0);
  const loadingOpacity = useSharedValue(0);

  useEffect(() => {
    // 1. Start Initial Entry Animations
    logoOpacity.value = withTiming(1, { duration: theme.animation.normal });
    logoScale.value = withTiming(1, { duration: theme.animation.slow, easing: Easing.out(Easing.ease) });
    
    textTranslateY.value = withDelay(150, withTiming(0, { duration: theme.animation.normal, easing: Easing.out(Easing.ease) }));
    textOpacity.value = withDelay(150, withTiming(1, { duration: theme.animation.normal }));
    
    loadingOpacity.value = withDelay(400, withTiming(1, { duration: theme.animation.normal }));

    // 2. Perform Initialization & Routing
    const initializeApp = async () => {
      const startTime = Date.now();

      // Ensure minimum display time so it doesn't flash violently if storage is fast
      const elapsed = Date.now() - startTime;
      const minDisplayTime = 1200; 
      
      if (elapsed < minDisplayTime) {
        // Animate the loading bar while we wait for the remaining time
        const remainingTime = minDisplayTime - elapsed;
        loadingProgress.value = withTiming(1, { duration: remainingTime, easing: Easing.linear });
        await new Promise(resolve => setTimeout(resolve, remainingTime));
      } else {
        loadingProgress.value = 1; // Snap to complete if it took longer
      }

      // Route
      if (!user) {
        router.replace('/(auth)/onboarding');
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

    initializeApp();
  }, [user, role, router]);

  // Animated Styles
  const logoAnimatedStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
    transform: [{ scale: logoScale.value }],
  }));

  const textAnimatedStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
    transform: [{ translateY: textTranslateY.value }],
  }));

  const loaderAnimatedStyle = useAnimatedStyle(() => ({
    width: `${loadingProgress.value * 100}%`,
  }));
  
  const loadingContainerStyle = useAnimatedStyle(() => ({
    opacity: loadingOpacity.value,
  }));

  return (
    <LinearGradient
      colors={theme.gradients.darkBackground.colors}
      start={theme.gradients.darkBackground.start}
      end={theme.gradients.darkBackground.end}
      style={styles.container}
    >
      <LocationAtmosphere theme={theme} />

      {/* Main Content */}
      <View style={styles.centerContent}>
        
        {/* Animated Logo */}
        <Animated.View style={[styles.logoWrapper, logoAnimatedStyle]}>
          {/* Subtle Ambient Glow Behind Logo */}
          <View style={styles.logoGlow} />
          <LinearGradient
            colors={theme.gradients.primary.colors}
            start={theme.gradients.primary.start}
            end={theme.gradients.primary.end}
            style={styles.logoInner}
          >
            <Wrench size={48} color={theme.colors.white} />
          </LinearGradient>
        </Animated.View>

        {/* Animated Text */}
        <Animated.View style={[styles.textWrapper, textAnimatedStyle]}>
          <Typography variant="h1" color="text" align="center" style={styles.brandName}>
            NEARIST
          </Typography>
          <Typography variant="bodyMedium" color="textSecondary" align="center">
            Whatever You Need, Nearist.
          </Typography>
        </Animated.View>

      </View>

      {/* Loading Area */}
      <Animated.View style={[styles.loadingArea, loadingContainerStyle]}>
        <View style={styles.loadingTrack}>
          <Animated.View style={[styles.loadingFill, loaderAnimatedStyle]}>
            <LinearGradient
              colors={theme.gradients.primary.colors}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={StyleSheet.absoluteFillObject}
            />
          </Animated.View>
        </View>
        <Typography variant="caption" color="textMuted" align="center">
          Finding the best near you...
        </Typography>
      </Animated.View>
      
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between', // Push loading to bottom
  },
  centerContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  logoWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  logoGlow: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(186,85,211,0.20)',
    transform: [{ scale: 1.5 }],
  },
  logoInner: {
    width: 88,
    height: 88,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textWrapper: {
    alignItems: 'center',
  },
  brandName: {
    marginBottom: 4,
    letterSpacing: 1.2,
  },
  loadingArea: {
    paddingBottom: 60,
    alignItems: 'center',
    width: '100%',
  },
  loadingTrack: {
    width: 140,
    height: 4,
    backgroundColor: '#D9D9D9',
    borderRadius: 2,
    marginBottom: 16,
    overflow: 'hidden',
  },
  loadingFill: {
    height: '100%',
    borderRadius: 2,
  }
});
