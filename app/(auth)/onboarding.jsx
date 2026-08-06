import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MapPin, User, CheckCircle, MessageSquare, Phone, ShieldCheck, Star, Wrench, Zap } from 'lucide-react-native';
import Animated, { 
  useAnimatedStyle, 
  withTiming, 
  useSharedValue, 
  interpolate, 
  Extrapolation,
  withDelay,
  Easing,
  withSequence,
  withRepeat,
  withSpring
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Circle, Path, Defs, RadialGradient as SvgRadialGradient, Stop } from 'react-native-svg';

import { useAppTheme } from '../../src/hooks/useAppTheme';
import { Typography } from '../../src/components/ui/Typography';
import { Button } from '../../src/components/ui/Button';

const { width, height } = Dimensions.get('window');

// --- Screen 1 Visual: Discover ---
const DiscoverVisual = ({ isActive, theme }) => {
  const scale = useSharedValue(0.8);
  const ringScale = useSharedValue(0.5);
  const ringOpacity = useSharedValue(0);

  useEffect(() => {
    if (isActive) {
      scale.value = withSpring(1, { damping: 12 });
      ringScale.value = withRepeat(withSequence(withTiming(1.5, { duration: 1500 }), withTiming(0.5, { duration: 0 })), -1, false);
      ringOpacity.value = withRepeat(withSequence(withTiming(0, { duration: 1500 }), withTiming(0.4, { duration: 0 })), -1, false);
    } else {
      scale.value = 0.8;
      ringScale.value = 0.5;
      ringOpacity.value = 0;
    }
  }, [isActive]);

  const centerStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }]
  }));

  const ringStyle = useAnimatedStyle(() => ({
    transform: [{ scale: ringScale.value }],
    opacity: ringOpacity.value,
  }));

  return (
    <View style={styles.visualContainer}>
      <Svg style={StyleSheet.absoluteFill} width="100%" height="100%">
        <Defs>
          <SvgRadialGradient id="glow1" cx="50%" cy="50%" r="50%">
            <Stop offset="0%" stopColor="#3B82F6" stopOpacity="0.15" />
            <Stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
          </SvgRadialGradient>
        </Defs>
        <Circle cx="50%" cy="50%" r="120" fill="url(#glow1)" />
        <Path d="M40 80 Q 150 50 200 120 T 320 180" stroke="rgba(255,255,255,0.05)" strokeWidth="1" fill="none" />
      </Svg>
      
      <Animated.View style={[styles.ring, { borderColor: theme.colors.primary }, ringStyle]} />
      
      <Animated.View style={[styles.centerNode, centerStyle]}>
        <LinearGradient
          colors={theme.gradients.primary.colors}
          style={styles.centerNodeGradient}
          start={theme.gradients.primary.start}
          end={theme.gradients.primary.end}
        >
          <User color="#FFF" size={24} />
        </LinearGradient>
      </Animated.View>

      <View style={[styles.floatingNode, { top: 40, left: 40, backgroundColor: theme.colors.surfaceElevated }]}>
        <Wrench color={theme.colors.icon} size={16} />
      </View>
      <View style={[styles.floatingNode, { bottom: 60, right: 30, backgroundColor: theme.colors.surfaceElevated }]}>
        <Zap color={theme.colors.icon} size={16} />
      </View>
      <View style={[styles.floatingNode, { top: 120, right: 20, backgroundColor: theme.colors.surfaceElevated }]}>
        <ShieldCheck color={theme.colors.primary} size={16} />
      </View>
    </View>
  );
};

// --- Screen 2 Visual: Compare ---
const CompareVisual = ({ isActive, theme }) => {
  const card1Y = useSharedValue(20);
  const card2Y = useSharedValue(30);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (isActive) {
      opacity.value = withTiming(1, { duration: 500 });
      card1Y.value = withSpring(0, { damping: 14 });
      card2Y.value = withDelay(150, withSpring(0, { damping: 14 }));
    } else {
      opacity.value = 0;
      card1Y.value = 20;
      card2Y.value = 30;
    }
  }, [isActive]);

  const card1Style = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: card1Y.value }, { scale: 0.9 }],
  }));
  const card2Style = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: card2Y.value }],
  }));

  return (
    <View style={styles.visualContainer}>
      <Svg style={StyleSheet.absoluteFill} width="100%" height="100%">
        <Defs>
          <SvgRadialGradient id="glow2" cx="50%" cy="50%" r="50%">
            <Stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.1" />
            <Stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
          </SvgRadialGradient>
        </Defs>
        <Circle cx="50%" cy="50%" r="120" fill="url(#glow2)" />
      </Svg>

      <Animated.View style={[styles.previewCard, { backgroundColor: theme.colors.surfaceElevated, top: -20 }, card1Style]}>
        <View style={styles.cardRow}>
          <Typography variant="bodyMedium" color="text">Auto Masters</Typography>
          <View style={styles.ratingBadge}>
            <Star size={12} color={theme.colors.warning} fill={theme.colors.warning} />
            <Typography variant="caption" style={{marginLeft: 4}}>4.6</Typography>
          </View>
        </View>
        <Typography variant="caption" color="textMuted">2.4 km away</Typography>
      </Animated.View>

      <Animated.View style={[styles.previewCard, { backgroundColor: theme.colors.surface, borderColor: theme.colors.primary, borderWidth: 1, shadowColor: theme.colors.primary, shadowOpacity: 0.1, shadowRadius: 10 }, card2Style]}>
        <View style={styles.cardRow}>
          <Typography variant="title" color="text">QuickFix Garage</Typography>
          <View style={styles.ratingBadge}>
            <Star size={12} color={theme.colors.warning} fill={theme.colors.warning} />
            <Typography variant="caption" style={{marginLeft: 4, fontWeight: '700'}}>4.9</Typography>
          </View>
        </View>
        
        <View style={[styles.cardRow, { marginTop: 12 }]}>
          <Typography variant="caption" color="textSecondary">1.2 km away</Typography>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{width: 6, height: 6, borderRadius: 3, backgroundColor: theme.colors.success, marginRight: 4}} />
            <Typography variant="caption" color="success">Available</Typography>
          </View>
        </View>
        
        <View style={{position: 'absolute', top: -10, right: -10, backgroundColor: theme.colors.surface, borderRadius: 10}}>
          <ShieldCheck color={theme.colors.primary} size={20} />
        </View>
      </Animated.View>
    </View>
  );
};

// --- Screen 3 Visual: Connect ---
const ConnectVisual = ({ isActive, theme }) => {
  const lineProgress = useSharedValue(0);
  const iconOpacity = useSharedValue(0);

  useEffect(() => {
    if (isActive) {
      lineProgress.value = withTiming(1, { duration: 600, easing: Easing.bezier(0.25, 0.1, 0.25, 1) });
      iconOpacity.value = withDelay(400, withTiming(1, { duration: 400 }));
    } else {
      lineProgress.value = 0;
      iconOpacity.value = 0;
    }
  }, [isActive]);

  const lineStyle = useAnimatedStyle(() => ({
    width: `${lineProgress.value * 100}%`,
  }));

  const iconStyle = useAnimatedStyle(() => ({
    opacity: iconOpacity.value,
    transform: [{ scale: interpolate(iconOpacity.value, [0, 1], [0.8, 1]) }],
  }));

  return (
    <View style={styles.visualContainer}>
      <Svg style={StyleSheet.absoluteFill} width="100%" height="100%">
        <Defs>
          <SvgRadialGradient id="glow3" cx="50%" cy="50%" r="50%">
            <Stop offset="0%" stopColor="#22D3EE" stopOpacity="0.08" />
            <Stop offset="100%" stopColor="#22D3EE" stopOpacity="0" />
          </SvgRadialGradient>
        </Defs>
        <Circle cx="50%" cy="50%" r="120" fill="url(#glow3)" />
      </Svg>

      <View style={styles.connectRow}>
        <View style={[styles.connectNode, { backgroundColor: theme.colors.surfaceElevated }]}>
          <User color={theme.colors.text} size={20} />
        </View>

        <View style={styles.connectLineContainer}>
          <View style={[styles.connectLineBg, { backgroundColor: theme.colors.surfaceSecondary }]} />
          <Animated.View style={[styles.connectLineFill, lineStyle]}>
            <LinearGradient
              colors={theme.gradients.primary.colors}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={StyleSheet.absoluteFillObject}
            />
          </Animated.View>
        </View>

        <View style={[styles.connectNode, { backgroundColor: theme.colors.surfaceElevated }]}>
          <Wrench color={theme.colors.primary} size={20} />
        </View>
      </View>

      <Animated.View style={[styles.floatingIcon, { top: 40, left: 60, backgroundColor: theme.colors.surface }, iconStyle]}>
        <MessageSquare color={theme.colors.icon} size={14} />
      </Animated.View>
      <Animated.View style={[styles.floatingIcon, { bottom: 60, right: 60, backgroundColor: theme.colors.surface }, iconStyle]}>
        <Phone color={theme.colors.icon} size={14} />
      </Animated.View>
    </View>
  );
};

// --- Data ---
const slides = [
  {
    id: '1',
    headline: 'Find trusted help nearby.',
    description: 'Discover reliable local professionals based on your location, ratings and availability.',
    Visual: DiscoverVisual,
  },
  {
    id: '2',
    headline: 'Choose with confidence.',
    description: 'Compare services, ratings, reviews and availability before you connect.',
    Visual: CompareVisual,
  },
  {
    id: '3',
    headline: 'Help is just a tap away.',
    description: 'Connect with trusted local professionals whenever you need them.',
    Visual: ConnectVisual,
  },
];

// --- Main Component ---
export default function OnboardingScreen() {
  const { theme } = useAppTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const activeIndex = useSharedValue(0);
  const flatListRef = useRef(null);

  const onScroll = (e) => {
    const slideIndex = e.nativeEvent.contentOffset.x / width;
    activeIndex.value = slideIndex;
    setCurrentIndex(Math.round(slideIndex));
  };

  const completeOnboarding = async () => {
    try {
      await AsyncStorage.setItem('onboarding_completed', 'true');
      // Proceed to the normal authentication flow
      router.replace('/(auth)/login');
    } catch (error) {
      console.error('Error saving onboarding state:', error);
      router.replace('/(auth)/login');
    }
  };

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1, animated: true });
    } else {
      completeOnboarding();
    }
  };

  const handleSkip = () => {
    completeOnboarding();
  };

  const renderSegment = (index) => {
    const isActive = currentIndex === index;
    const isCompleted = currentIndex > index;
    
    let backgroundColor = theme.colors.surfaceSecondary;
    if (isCompleted) backgroundColor = 'rgba(99,102,241,0.5)'; // Subtle indigo
    
    return (
      <View key={index} style={[styles.segment, { backgroundColor }]}>
        {isActive && (
          <LinearGradient
            colors={theme.gradients.primary.colors}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={StyleSheet.absoluteFillObject}
          />
        )}
      </View>
    );
  };

  return (
    <View
      style={styles.container}
    >
      {/* Top Bar with Skip */}
      <View style={[styles.topBar, { top: insets.top + 16 }]}>
        {currentIndex < 2 ? (
          <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
            <Typography variant="bodyMedium" style={{color: '#64748B'}}>Skip</Typography>
          </TouchableOpacity>
        ) : <View style={styles.skipButton} />}
      </View>

      <FlatList
        ref={flatListRef}
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View style={[styles.slide, { width }]}>
            <View style={styles.visualArea}>
              <item.Visual isActive={currentIndex === index} theme={theme} />
            </View>
            <View style={styles.textArea}>
              <Typography variant="h1" weight="bold" style={[styles.headline, {color: '#0F172A'}]}>
                {item.headline}
              </Typography>
              <Typography variant="bodyMedium" style={[styles.description, {color: '#64748B'}]}>
                {item.description}
              </Typography>
            </View>
          </View>
        )}
      />

      {/* Bottom Area: Progress & CTA */}
      <View style={[styles.bottomArea, { paddingBottom: Math.max(insets.bottom + 24, 24) }]}>
        <View style={styles.progressContainer}>
          {slides.map((_, index) => renderSegment(index))}
        </View>

        <Button
          title={currentIndex === 2 ? 'Get Started' : 'Continue'}
          onPress={handleNext}
          fullWidth
          variant="primary"
          style={styles.ctaButton}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    position: 'absolute',
    right: 20,
    zIndex: 10,
  },
  skipButton: {
    padding: 8,
    minWidth: 44,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  slide: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  visualArea: {
    width: '100%',
    height: 280,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  textArea: {
    width: '100%',
    alignItems: 'flex-start',
  },
  headline: {
    marginBottom: 12,
  },
  description: {
    lineHeight: 24,
  },
  bottomArea: {
    paddingHorizontal: 24,
    width: '100%',
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 32,
    gap: 8,
  },
  segment: {
    height: 4,
    width: 32,
    borderRadius: 2,
    overflow: 'hidden',
  },
  ctaButton: {
    width: '100%',
  },

  // Visual Components Specific Styles
  visualContainer: {
    width: 240,
    height: 240,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Screen 1
  centerNode: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(59,130,246,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerNodeGradient: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ring: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 1,
  },
  floatingNode: {
    position: 'absolute',
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  // Screen 2
  previewCard: {
    width: 200,
    padding: 16,
    borderRadius: 16,
    position: 'absolute',
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  // Screen 3
  connectRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  connectNode: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  connectLineContainer: {
    flex: 1,
    height: 2,
    marginHorizontal: 12,
    position: 'relative',
    justifyContent: 'center',
  },
  connectLineBg: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  connectLineFill: {
    position: 'absolute',
    height: '100%',
    left: 0,
  },
  floatingIcon: {
    position: 'absolute',
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
