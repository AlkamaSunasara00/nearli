import React, { useState, useRef } from 'react';
import { View, StyleSheet, Dimensions, FlatList, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { ShieldCheck, MapPin, MessageSquare, Car, Star, Wrench, Clock, User, ChevronRight } from 'lucide-react-native';
import Animated, { useAnimatedStyle, withTiming, useSharedValue, interpolate, Extrapolation } from 'react-native-reanimated';
import { useAppTheme } from '../../src/hooks/useAppTheme';
import { Typography } from '../../src/components/ui/Typography';
import { Button } from '../../src/components/ui/Button';

const { width } = Dimensions.get('window');

// Custom Illustrations
const Illustration1 = ({ theme }) => (
  <View style={styles.illustrationBase}>
    <View style={[styles.cardLayer, { backgroundColor: theme.colors.surface, shadowColor: theme.colors.primary }]}>
      <Car size={40} color={theme.colors.primary} />
      <View style={{ marginLeft: 16 }}>
        <View style={[styles.skeletonLine, { width: 80, backgroundColor: theme.colors.border }]} />
        <View style={[styles.skeletonLine, { width: 40, backgroundColor: theme.colors.border }]} />
      </View>
    </View>
    <View style={[styles.floatingPin, { backgroundColor: theme.colors.accent }]}>
      <MapPin size={24} color={theme.colors.surface} />
    </View>
    <View style={[styles.verifiedBadge, { backgroundColor: theme.colors.primarySoft }]}>
      <ShieldCheck size={20} color={theme.colors.primary} />
    </View>
  </View>
);

const Illustration2 = ({ theme }) => (
  <View style={styles.illustrationBase}>
    <View style={[styles.cardLayer, { backgroundColor: theme.colors.surface, top: -20, opacity: 0.7 }]}>
      <Wrench size={24} color={theme.colors.icon} />
      <View style={{ marginLeft: 12 }}>
        <View style={[styles.skeletonLine, { width: 100, backgroundColor: theme.colors.border }]} />
      </View>
    </View>
    <View style={[styles.cardLayer, { backgroundColor: theme.colors.surface, zIndex: 2, shadowColor: theme.colors.primary }]}>
      <View style={[styles.iconCircle, { backgroundColor: theme.colors.primarySoft }]}>
        <Wrench size={24} color={theme.colors.primary} />
      </View>
      <View style={{ marginLeft: 16, flex: 1 }}>
        <View style={[styles.skeletonLine, { width: 80, backgroundColor: theme.colors.border }]} />
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
          <Star size={14} color={theme.colors.warning} fill={theme.colors.warning} />
          <Typography variant="caption" style={{ marginLeft: 4, marginRight: 12 }}>4.8</Typography>
          <Clock size={14} color={theme.colors.icon} />
          <Typography variant="caption" style={{ marginLeft: 4 }}>Open</Typography>
        </View>
      </View>
    </View>
  </View>
);

const Illustration3 = ({ theme }) => (
  <View style={styles.illustrationBase}>
    <View style={[styles.chatBubbleLeft, { backgroundColor: theme.colors.surface }]}>
      <View style={[styles.skeletonLine, { width: 100, backgroundColor: theme.colors.border }]} />
    </View>
    <View style={[styles.chatBubbleRight, { backgroundColor: theme.colors.primary }]}>
      <MessageSquare size={16} color={theme.colors.surface} style={{ marginRight: 8 }} />
      <View style={[styles.skeletonLine, { width: 60, backgroundColor: 'rgba(255,255,255,0.5)' }]} />
    </View>
    <View style={[styles.mechanicBadge, { backgroundColor: theme.colors.accent, borderColor: theme.colors.surface }]}>
      <User size={24} color={theme.colors.surface} />
    </View>
  </View>
);

const slides = [
  {
    id: '1',
    title: 'Find Trusted Garages Nearby',
    description: 'Discover verified garages near your location and quickly find the right service for your vehicle.',
    Illustration: Illustration1,
  },
  {
    id: '2',
    title: 'Compare Before You Visit',
    description: 'Compare services, ratings, distance, opening hours and live availability before making your choice.',
    Illustration: Illustration2,
  },
  {
    id: '3',
    title: 'Message Garages Instantly',
    description: 'Chat directly with verified garages, ask questions, confirm availability and receive quick replies.',
    Illustration: Illustration3,
  },
];

const PaginationDot = ({ index, activeIndex, theme }) => {
  const animatedStyle = useAnimatedStyle(() => {
    const isActive = activeIndex.value === index;
    return {
      width: withTiming(isActive ? 24 : 8, { duration: 300 }),
      backgroundColor: withTiming(isActive ? theme.colors.primary : theme.colors.border, { duration: 300 }),
    };
  });

  return <Animated.View style={[styles.dot, animatedStyle]} />;
};

export default function OnboardingScreen() {
  const { theme } = useAppTheme();
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const activeIndex = useSharedValue(0);
  const flatListRef = useRef(null);

  const onScroll = (e) => {
    const slideIndex = e.nativeEvent.contentOffset.x / width;
    activeIndex.value = slideIndex;
    setCurrentIndex(Math.round(slideIndex));
  };

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1, animated: true });
    } else {
      router.push('/(auth)/welcome');
    }
  };

  const handleSkip = () => {
    router.push('/(auth)/welcome');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <FlatList
        ref={flatListRef}
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.slide, { width }]}>
            <View style={styles.illustrationContainer}>
               <item.Illustration theme={theme} />
            </View>
            <Typography variant="h1" weight="bold" align="center" style={styles.title}>
              {item.title}
            </Typography>
            <Typography variant="body" color="textSecondary" align="center" style={styles.description}>
              {item.description}
            </Typography>
          </View>
        )}
      />
      
      <View style={styles.footer}>
        <View style={styles.indicators}>
          {slides.map((_, idx) => (
            <PaginationDot key={idx} index={idx} activeIndex={activeIndex} theme={theme} />
          ))}
        </View>
        
        <View style={styles.actions}>
          <Button
            title="Skip"
            variant="ghost"
            onPress={handleSkip}
            style={styles.btnSkip}
            textStyle={{ color: theme.colors.textMuted }}
          />
          <Button
            title={currentIndex === slides.length - 1 ? "Finish" : "Next"}
            variant="primary"
            onPress={handleNext}
            style={styles.btnNext}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  slide: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingTop: 60,
  },
  illustrationContainer: {
    width: '100%',
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  illustrationBase: {
    width: 240,
    height: 240,
    backgroundColor: '#E2E8F0', // Light base for illustration - better to keep as light grey, or use theme in style array but can't inject here
    borderRadius: 120,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  cardLayer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    width: 200,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
    position: 'absolute',
  },
  skeletonLine: {
    height: 8,
    borderRadius: 4,
    marginBottom: 8,
  },
  floatingPin: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatBubbleLeft: {
    position: 'absolute',
    top: 40,
    left: -10,
    padding: 16,
    borderRadius: 16,
    borderBottomLeftRadius: 0,
    width: 140,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  chatBubbleRight: {
    position: 'absolute',
    bottom: 60,
    right: -10,
    padding: 16,
    borderRadius: 16,
    borderBottomRightRadius: 0,
    flexDirection: 'row',
    alignItems: 'center',
    width: 120,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  mechanicBadge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    // borderColor: '#FFF', (moved to dynamic style)
  },
  title: {
    marginBottom: 16,
    lineHeight: 32,
  },
  description: {
    lineHeight: 24,
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  indicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 40,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btnSkip: {
    paddingHorizontal: 0,
  },
  btnNext: {
    height: 52,
    borderRadius: 16,
    paddingHorizontal: 32,
    minWidth: 120,
  },
});
