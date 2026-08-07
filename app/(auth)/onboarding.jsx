import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { Home, TreePine, Circle, Heart, ThumbsUp, CarFront } from 'lucide-react-native';
import Animated, { FadeInRight, FadeIn } from 'react-native-reanimated';
import { BlurView } from 'expo-blur';

import { useAppTheme } from '../../src/hooks/useAppTheme';
import { Typography } from '../../src/components/ui/Typography';
import { Button } from '../../src/components/ui/Button';

const { width, height } = Dimensions.get('window');

const screens = [
  {
    id: '1',
    title: 'Easy Process',
    description:
      'Find all your house needs in one place. We provide every service to make your home experience smooth.',
    heroColors: ['#BA75F0', '#8C68E8', '#7A67E0'],
    cta: 'Next',
  },
  {
    id: '2',
    title: 'Fast Transportation',
    description:
      'We provide the best transportation service and organize your furniture properly to prevent any damage.',
    heroColors: ['#67B8EC', '#42A2E2', '#3897DB'],
    cta: 'Next',
  },
  {
    id: '3',
    title: 'Expert People',
    description:
      'We have the best in class individuals working just for you. They are well trained and capable of handling anything you need.',
    heroColors: ['#FFB05A', '#FF8E2D', '#FF6A00'],
    cta: 'Get Started',
  },
];

const SkipPill = ({ theme, onPress, topInset }) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.85}
    style={[styles.skipPillContainer, { top: Math.max((topInset || 0) + 16, 44) }]}
  >
    <BlurView intensity={50} tint="light" style={styles.skipPill}>
      <Typography variant="p3" weight="bold" style={{ color: theme.colors.white }}>
        Skip
      </Typography>
    </BlurView>
  </TouchableOpacity>
);

const HeroDots = () => (
  <View style={styles.heroDotLayer}>
    <View style={[styles.heroDot, styles.heroDotOne]} />
    <View style={[styles.heroDot, styles.heroDotTwo]} />
    <View style={[styles.heroDot, styles.heroDotThree]} />
    <View style={[styles.heroDot, styles.heroDotFour]} />
    <View style={[styles.heroDot, styles.heroDotFive]} />
  </View>
);

const Pagination = ({ currentIndex, theme, onDotPress }) => (
  <View style={styles.pagination}>
    {screens.map((screen, index) => {
      const isActive = index === currentIndex;
      return (
        <TouchableOpacity
          key={screen.id}
          onPress={() => onDotPress(index)}
          activeOpacity={0.8}
          style={[
            styles.paginationDot,
            {
              width: isActive ? 24 : 8,
              backgroundColor: isActive ? theme.colors.primary : theme.colors.grey[400],
            },
          ]}
        />
      );
    })}
  </View>
);

const ScreenOneIllustration = ({ theme }) => {
  return (
    <View style={styles.illustrationWrap}>
      <View style={[styles.glowOrb, styles.glowOrbLarge, { backgroundColor: 'rgba(255,255,255,0.10)' }]} />
      <View style={[styles.glowOrb, styles.glowOrbSmall, { backgroundColor: 'rgba(255,255,255,0.12)' }]} />
      <View style={[styles.houseBadge, { backgroundColor: 'rgba(255,255,255,0.12)' }]}>
        <View style={[styles.houseBadgeInner, { backgroundColor: 'rgba(255,255,255,0.10)' }]}>
          <LinearGradient
            colors={[theme.colors.accentPurple, theme.colors.primary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.houseIconCard}
          >
            <Home size={20} color={theme.colors.white} fill={theme.colors.white} />
          </LinearGradient>
        </View>
      </View>
      <View style={[styles.treeBadge, { backgroundColor: 'rgba(255,255,255,0.12)' }]}>
        <TreePine size={18} color="#2F8F54" fill="#2F8F54" />
      </View>

      <View style={styles.boxScene}>
        <View style={[styles.shadowBase, { backgroundColor: 'rgba(74, 39, 144, 0.18)' }]} />
        <View style={[styles.boxBackFlapLeft, { borderBottomColor: '#D98F46' }]} />
        <View style={[styles.boxBackFlapRight, { borderBottomColor: '#E6A559' }]} />
        <View style={[styles.boxBody, { backgroundColor: '#F4B16A' }]}>
          <View style={[styles.boxCenterFold, { backgroundColor: '#E39B54' }]} />
        </View>
        <View style={[styles.boxFrontFlapLeft, { backgroundColor: '#F9D187' }]} />
        <View style={[styles.boxFrontFlapRight, { backgroundColor: '#EDB56A' }]} />

        <View style={styles.teddyHead}>
          <View style={[styles.teddyEar, styles.teddyEarLeft]} />
          <View style={[styles.teddyEar, styles.teddyEarRight]} />
          <View style={styles.teddyFace}>
            <View style={styles.teddyEyeRow}>
              <View style={styles.teddyEye} />
              <View style={styles.teddyEye} />
            </View>
            <View style={styles.teddyNose} />
          </View>
        </View>

        <View style={[styles.lampShade, { backgroundColor: theme.colors.white }]} />
        <View style={[styles.lampStem, { backgroundColor: '#A9A9B8' }]} />
        <View style={[styles.lampBase, { backgroundColor: '#3E5C92' }]} />

        <View style={[styles.photoFrame, { backgroundColor: '#F4C44F' }]}>
          <View style={[styles.photoInner, { backgroundColor: '#8DD7F7' }]} />
        </View>

        <View style={styles.plantGroup}>
          <View style={[styles.pot, { backgroundColor: '#C97545' }]} />
          <View style={[styles.leaf, styles.leafOne, { backgroundColor: '#7DBE45' }]} />
          <View style={[styles.leaf, styles.leafTwo, { backgroundColor: '#9ACD5A' }]} />
          <View style={[styles.leaf, styles.leafThree, { backgroundColor: '#78B448' }]} />
        </View>

        <View style={styles.bookStack}>
          <View style={[styles.book, { backgroundColor: '#F7D38F' }]} />
          <View style={[styles.book, { backgroundColor: '#79C0D8' }]} />
          <View style={[styles.book, { backgroundColor: '#E7A85F' }]} />
        </View>

        <View style={styles.ball}>
          <Circle size={28} color="#FFFFFF" fill="#FFFFFF" />
          <View style={[styles.ballPatch, styles.ballPatchOne]} />
          <View style={[styles.ballPatch, styles.ballPatchTwo]} />
        </View>
      </View>
    </View>
  );
};

const ScreenTwoIllustration = () => {
  return (
    <View style={styles.illustrationWrap}>
      <View style={[styles.blueGlowLarge, { backgroundColor: 'rgba(255,255,255,0.11)' }]} />
      <View style={[styles.blueGlowMedium, { backgroundColor: 'rgba(255,255,255,0.08)' }]} />

      <View style={[styles.emojiBubble, styles.emojiBubbleLeft, { backgroundColor: 'rgba(255,255,255,0.16)' }]}>
        <Heart size={16} color="#FF584F" fill="#FF584F" />
      </View>
      <View style={[styles.emojiBubble, styles.emojiBubbleTopRight, { backgroundColor: 'rgba(255,255,255,0.16)' }]}>
        <View style={styles.avatarFace}>
          <View style={styles.avatarHair} />
          <View style={styles.avatarBeard} />
          <View style={styles.avatarThumbWrap}>
            <ThumbsUp size={13} color="#F7B348" fill="#F7B348" />
          </View>
        </View>
      </View>
      <View style={[styles.emojiBubble, styles.emojiBubbleBottom, { backgroundColor: 'rgba(255,255,255,0.16)' }]}>
        <CarFront size={16} color="#2091F1" />
      </View>

      <View style={styles.truckScene}>
        <View style={[styles.truckShadow, { backgroundColor: 'rgba(26, 86, 130, 0.18)' }]} />

        <View style={styles.worker}>
          <View style={[styles.workerHead, { backgroundColor: '#F2B28F' }]} />
          <View style={[styles.workerCap, { backgroundColor: '#FF5F22' }]} />
          <View style={[styles.workerTorso, { backgroundColor: '#FF6A00' }]} />
          <View style={[styles.workerVestStripe, styles.workerVestStripeLeft]} />
          <View style={[styles.workerVestStripe, styles.workerVestStripeRight]} />
          <View style={[styles.workerArm, styles.workerArmLeft, { backgroundColor: '#F2B28F' }]} />
          <View style={[styles.workerArm, styles.workerArmRight, { backgroundColor: '#F2B28F' }]} />
          <View style={[styles.workerLeg, styles.workerLegLeft, { backgroundColor: '#436CA8' }]} />
          <View style={[styles.workerLeg, styles.workerLegRight, { backgroundColor: '#2D4E7D' }]} />
        </View>

        <View style={styles.truckWrap}>
          <View style={[styles.truckCargo, { backgroundColor: '#3D4148' }]}>
            <View style={[styles.cargoDoorTop, { backgroundColor: '#CFD1D4' }]} />
            <View style={[styles.cargoDoorLine, styles.cargoDoorLineOne]} />
            <View style={[styles.cargoDoorLine, styles.cargoDoorLineTwo]} />
            <View style={[styles.cargoDoorLine, styles.cargoDoorLineThree]} />
            <View style={[styles.cargoBox, styles.cargoBoxOne, { backgroundColor: '#E7C59A' }]} />
            <View style={[styles.cargoBox, styles.cargoBoxTwo, { backgroundColor: '#CFB18B' }]} />
            <View style={[styles.cargoBox, styles.cargoBoxThree, { backgroundColor: '#E0C097' }]} />
          </View>
          <View style={[styles.truckCab, { backgroundColor: '#191C21' }]}>
            <View style={[styles.truckWindow, { backgroundColor: '#D5F0F5' }]} />
            <View style={[styles.windowShine, { backgroundColor: 'rgba(255,255,255,0.35)' }]} />
            <View style={[styles.truckBumper, { backgroundColor: '#252A32' }]} />
            <View style={[styles.truckMirror, { backgroundColor: '#DCE4EA' }]} />
          </View>
          <View style={[styles.truckConnector, { backgroundColor: '#1E2229' }]} />
          <View style={[styles.truckLight, styles.truckLightRear, { backgroundColor: '#FF8B4A' }]} />
          <View style={[styles.truckLight, styles.truckLightFront, { backgroundColor: '#FF8B4A' }]} />
          <View style={[styles.wheel, styles.wheelBack]}>
            <View style={styles.wheelInner} />
          </View>
          <View style={[styles.wheel, styles.wheelMid]}>
            <View style={styles.wheelInner} />
          </View>
          <View style={[styles.wheel, styles.wheelFront]}>
            <View style={styles.wheelInner} />
          </View>
        </View>
      </View>
    </View>
  );
};

const ScreenThreeIllustration = ({ theme }) => {
  return (
    <View style={styles.illustrationWrap}>
      <View style={[styles.orangeGlowLarge, { backgroundColor: 'rgba(255,255,255,0.10)' }]} />
      <View style={[styles.orangeGlowMedium, { backgroundColor: 'rgba(255,255,255,0.10)' }]} />
      <View style={[styles.emptyFeatureSpace, { borderColor: 'rgba(255,255,255,0.18)' }]}>
        <View style={[styles.emptyFeatureInner, { backgroundColor: 'rgba(255,255,255,0.08)' }]} />
      </View>
    </View>
  );
};

const renderIllustration = (index, theme) => {
  if (index === 0) return <ScreenOneIllustration theme={theme} />;
  if (index === 1) return <ScreenTwoIllustration />;
  return <ScreenThreeIllustration theme={theme} />;
};

export default function OnboardingScreen() {
  const { theme } = useAppTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [currentIndex, setCurrentIndex] = useState(0);

  const current = screens[currentIndex];

  const handleNext = () => {
    if (currentIndex < screens.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      return;
    }

    router.replace('/(auth)/login');
  };

  const handleSkip = () => {
    router.replace('/(auth)/login');
  };

  return (
    <View style={[styles.screen, { paddingBottom: insets.bottom }]}>
      <StatusBar style="light" backgroundColor={theme.colors.primary} />
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, height: insets.top, backgroundColor: theme.colors.primary, zIndex: 10 }} />
      <View style={[styles.singleScreen, { marginTop: insets.top }]}>
        <View style={styles.topVisualSection}>
          <LinearGradient
            colors={current.heroColors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.heroCard, { height: height * 0.45 }]}
          >
            <HeroDots />
            <SkipPill theme={theme} onPress={handleSkip} topInset={insets.top} />
            <Animated.View key={`img-${current.id}`} entering={FadeIn.duration(400)} style={{ flex: 1 }}>
              {renderIllustration(currentIndex, theme)}
            </Animated.View>
          </LinearGradient>
        </View>

        <View style={styles.contentSection}>
          <Animated.View key={`text-${current.id}`} entering={FadeInRight.duration(400)} style={styles.textContent}>
            <Typography variant="h1" weight="bold" align="center" style={[styles.title, { fontSize: 28 }]}>
              {current.title}
            </Typography>
            <Typography variant="p2" align="center" style={[styles.description, { color: '#8D8D95', fontSize: 15, lineHeight: 24 }]}>
              {current.description}
            </Typography>
          </Animated.View>

          <View style={styles.bottomControls}>
            <Pagination currentIndex={currentIndex} theme={theme} onDotPress={setCurrentIndex} />

            <Button
              title={current.cta}
              onPress={handleNext}
              fullWidth
              size="large"
              style={styles.ctaButton}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  singleScreen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  topVisualSection: {
  },
  heroCard: {
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    overflow: 'hidden',
    position: 'relative',
  },
  heroDotLayer: {
    ...StyleSheet.absoluteFillObject,
  },
  heroDot: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  heroDotOne: { top: 92, left: 28 },
  heroDotTwo: { top: 40, left: 92 },
  heroDotThree: { top: 66, right: 84 },
  heroDotFour: { top: 142, right: 30 },
  heroDotFive: { bottom: 32, right: 72, width: 22, height: 22, backgroundColor: 'rgba(255,255,255,0.10)' },
  skipPillContainer: {
    position: 'absolute',
    right: 22,
    zIndex: 3,
    borderRadius: 999,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  skipPill: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  illustrationWrap: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 36,
  },
  glowOrb: {
    position: 'absolute',
    borderRadius: 999,
  },
  glowOrbLarge: {
    width: 180,
    height: 180,
    bottom: 58,
    left: 40,
  },
  glowOrbSmall: {
    width: 64,
    height: 64,
    top: 74,
    right: 56,
  },
  houseBadge: {
    position: 'absolute',
    top: 76,
    right: 56,
    width: 74,
    height: 74,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  houseBadgeInner: {
    width: 54,
    height: 54,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  houseIconCard: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  treeBadge: {
    position: 'absolute',
    left: 32,
    bottom: 48,
    width: 64,
    height: 64,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxScene: {
    width: 260,
    height: 220,
    position: 'relative',
    justifyContent: 'flex-end',
  },
  shadowBase: {
    position: 'absolute',
    bottom: 8,
    left: 16,
    right: 8,
    height: 14,
    borderRadius: 999,
  },
  boxBackFlapLeft: {
    position: 'absolute',
    left: 58,
    bottom: 92,
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 58,
    borderBottomWidth: 58,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
  boxBackFlapRight: {
    position: 'absolute',
    right: 38,
    bottom: 102,
    width: 0,
    height: 0,
    borderLeftWidth: 54,
    borderRightWidth: 8,
    borderBottomWidth: 46,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
  boxBody: {
    position: 'absolute',
    left: 62,
    right: 56,
    bottom: 30,
    height: 106,
    borderRadius: 8,
  },
  boxCenterFold: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: '48%',
    width: 4,
  },
  boxFrontFlapLeft: {
    position: 'absolute',
    left: 28,
    bottom: 58,
    width: 74,
    height: 36,
    transform: [{ skewX: '-18deg' }],
  },
  boxFrontFlapRight: {
    position: 'absolute',
    left: 114,
    bottom: 58,
    width: 92,
    height: 42,
    transform: [{ skewX: '18deg' }],
  },
  teddyHead: {
    position: 'absolute',
    top: 26,
    left: 106,
    width: 44,
    height: 44,
  },
  teddyEar: {
    position: 'absolute',
    width: 14,
    height: 14,
    borderRadius: 999,
    backgroundColor: '#9B5A1F',
    top: 0,
  },
  teddyEarLeft: { left: 2 },
  teddyEarRight: { right: 2 },
  teddyFace: {
    position: 'absolute',
    bottom: 0,
    left: 4,
    right: 4,
    height: 34,
    borderRadius: 16,
    backgroundColor: '#B56A2D',
    alignItems: 'center',
    justifyContent: 'center',
  },
  teddyEyeRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 4,
  },
  teddyEye: {
    width: 4,
    height: 4,
    borderRadius: 999,
    backgroundColor: '#1A1A1A',
  },
  teddyNose: {
    width: 8,
    height: 6,
    borderRadius: 999,
    backgroundColor: '#3E2A1C',
  },
  lampShade: {
    position: 'absolute',
    left: 90,
    top: 60,
    width: 34,
    height: 28,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    borderBottomWidth: 10,
    borderBottomColor: '#E8E8ED',
  },
  lampStem: {
    position: 'absolute',
    left: 105,
    top: 88,
    width: 4,
    height: 28,
    borderRadius: 2,
  },
  lampBase: {
    position: 'absolute',
    left: 94,
    top: 110,
    width: 24,
    height: 14,
    borderRadius: 10,
  },
  photoFrame: {
    position: 'absolute',
    left: 58,
    top: 106,
    width: 30,
    height: 42,
    borderRadius: 4,
    padding: 4,
    transform: [{ rotate: '8deg' }],
  },
  photoInner: {
    flex: 1,
    borderRadius: 2,
  },
  plantGroup: {
    position: 'absolute',
    right: 62,
    top: 114,
    width: 38,
    height: 54,
    alignItems: 'center',
  },
  pot: {
    position: 'absolute',
    bottom: 0,
    width: 24,
    height: 18,
    borderRadius: 4,
  },
  leaf: {
    position: 'absolute',
    width: 10,
    borderRadius: 10,
  },
  leafOne: {
    height: 34,
    left: 6,
    top: 0,
    transform: [{ rotate: '-24deg' }],
  },
  leafTwo: {
    height: 30,
    left: 14,
    top: 2,
    transform: [{ rotate: '14deg' }],
  },
  leafThree: {
    height: 28,
    right: 5,
    top: 6,
    transform: [{ rotate: '34deg' }],
  },
  bookStack: {
    position: 'absolute',
    right: 28,
    top: 118,
    gap: 3,
  },
  book: {
    width: 40,
    height: 8,
    borderRadius: 3,
  },
  ball: {
    position: 'absolute',
    bottom: 16,
    left: 152,
    width: 28,
    height: 28,
    borderRadius: 999,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ballPatch: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 2,
    backgroundColor: '#1A1A1A',
  },
  ballPatchOne: {
    top: 5,
    left: 10,
  },
  ballPatchTwo: {
    bottom: 5,
    right: 6,
  },
  blueGlowLarge: {
    position: 'absolute',
    width: 190,
    height: 190,
    borderRadius: 999,
    bottom: 52,
    left: 56,
  },
  blueGlowMedium: {
    position: 'absolute',
    width: 72,
    height: 72,
    borderRadius: 999,
    top: 72,
    right: 56,
  },
  emojiBubble: {
    position: 'absolute',
    width: 58,
    height: 58,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emojiBubbleLeft: {
    top: 80,
    left: 42,
  },
  emojiBubbleTopRight: {
    top: 84,
    right: 52,
    width: 70,
    height: 70,
  },
  emojiBubbleBottom: {
    bottom: 42,
    left: 76,
  },
  avatarFace: {
    width: 34,
    height: 34,
    borderRadius: 999,
    backgroundColor: '#F1C29A',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  avatarHair: {
    position: 'absolute',
    top: 1,
    left: 5,
    right: 5,
    height: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: '#2D2A2A',
  },
  avatarBeard: {
    position: 'absolute',
    bottom: 5,
    left: 8,
    right: 8,
    height: 8,
    borderRadius: 8,
    backgroundColor: '#54433D',
  },
  avatarThumbWrap: {
    position: 'absolute',
    right: -10,
    top: 12,
  },
  truckScene: {
    width: 270,
    height: 220,
    justifyContent: 'flex-end',
    position: 'relative',
  },
  truckShadow: {
    position: 'absolute',
    left: 12,
    right: 6,
    bottom: 20,
    height: 12,
    borderRadius: 999,
  },
  worker: {
    position: 'absolute',
    left: 20,
    bottom: 34,
    width: 54,
    height: 92,
  },
  workerHead: {
    position: 'absolute',
    top: 0,
    left: 14,
    width: 18,
    height: 18,
    borderRadius: 999,
  },
  workerCap: {
    position: 'absolute',
    top: 1,
    left: 10,
    width: 20,
    height: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  workerTorso: {
    position: 'absolute',
    top: 18,
    left: 11,
    width: 26,
    height: 34,
    borderRadius: 8,
  },
  workerVestStripe: {
    position: 'absolute',
    top: 20,
    width: 4,
    height: 28,
    backgroundColor: '#7AD8FF',
  },
  workerVestStripeLeft: {
    left: 18,
  },
  workerVestStripeRight: {
    left: 28,
  },
  workerArm: {
    position: 'absolute',
    top: 28,
    width: 10,
    height: 26,
    borderRadius: 8,
  },
  workerArmLeft: {
    left: 4,
    transform: [{ rotate: '20deg' }],
  },
  workerArmRight: {
    right: 2,
    transform: [{ rotate: '-42deg' }],
  },
  workerLeg: {
    position: 'absolute',
    top: 50,
    width: 10,
    height: 34,
    borderRadius: 8,
  },
  workerLegLeft: {
    left: 16,
    transform: [{ rotate: '4deg' }],
  },
  workerLegRight: {
    left: 28,
    transform: [{ rotate: '-4deg' }],
  },
  truckWrap: {
    position: 'absolute',
    right: 12,
    bottom: 34,
    width: 210,
    height: 120,
  },
  truckCargo: {
    position: 'absolute',
    left: 0,
    bottom: 20,
    width: 120,
    height: 90,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 4,
    borderBottomLeftRadius: 8,
  },
  cargoDoorTop: {
    position: 'absolute',
    top: 4,
    left: 4,
    right: 4,
    height: 26,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 2,
  },
  cargoDoorLine: {
    position: 'absolute',
    left: 10,
    right: 10,
    height: 2,
    backgroundColor: '#9A9DA2',
  },
  cargoDoorLineOne: { top: 12 },
  cargoDoorLineTwo: { top: 18 },
  cargoDoorLineThree: { top: 24 },
  cargoBox: {
    position: 'absolute',
    borderRadius: 2,
  },
  cargoBoxOne: {
    left: 16,
    bottom: 14,
    width: 20,
    height: 16,
  },
  cargoBoxTwo: {
    left: 36,
    bottom: 14,
    width: 18,
    height: 24,
  },
  cargoBoxThree: {
    left: 52,
    bottom: 14,
    width: 18,
    height: 18,
  },
  truckCab: {
    position: 'absolute',
    right: 0,
    bottom: 20,
    width: 98,
    height: 74,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 14,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 14,
  },
  truckWindow: {
    position: 'absolute',
    top: 16,
    right: 18,
    width: 26,
    height: 22,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 6,
    borderBottomLeftRadius: 3,
  },
  windowShine: {
    position: 'absolute',
    top: 18,
    right: 30,
    width: 3,
    height: 14,
    borderRadius: 3,
  },
  truckBumper: {
    position: 'absolute',
    bottom: 8,
    right: 4,
    width: 18,
    height: 10,
    borderRadius: 6,
  },
  truckMirror: {
    position: 'absolute',
    top: 36,
    right: 10,
    width: 12,
    height: 6,
    borderRadius: 3,
  },
  truckConnector: {
    position: 'absolute',
    left: 112,
    bottom: 34,
    width: 18,
    height: 10,
    borderRadius: 8,
  },
  truckLight: {
    position: 'absolute',
    width: 4,
    height: 12,
    borderRadius: 2,
    bottom: 26,
  },
  truckLightRear: {
    left: 114,
  },
  truckLightFront: {
    right: 0,
  },
  wheel: {
    position: 'absolute',
    width: 28,
    height: 28,
    borderRadius: 999,
    backgroundColor: '#262B31',
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wheelBack: { left: 30 },
  wheelMid: { left: 112 },
  wheelFront: { right: 18 },
  wheelInner: {
    width: 11,
    height: 11,
    borderRadius: 999,
    backgroundColor: '#9CA4AC',
  },
  orangeGlowLarge: {
    position: 'absolute',
    width: 170,
    height: 170,
    borderRadius: 999,
    top: 92,
    right: 34,
  },
  orangeGlowMedium: {
    position: 'absolute',
    width: 74,
    height: 74,
    borderRadius: 999,
    top: 74,
    left: 96,
  },
  emptyFeatureSpace: {
    width: width - 96,
    maxWidth: 238,
    height: 182,
    borderRadius: 26,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  emptyFeatureInner: {
    width: '82%',
    height: '72%',
    borderRadius: 20,
  },
  contentSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 32,
    paddingBottom: 24,
    backgroundColor: '#FFFFFF',
  },
  textContent: {
    alignItems: 'center',
    width: '100%',
  },
  bottomControls: {
    width: '100%',
    alignItems: 'center',
  },
  title: {
    color: '#111111',
    marginBottom: 18,
  },
  description: {
    maxWidth: 340,
  },
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginTop: 12,
    marginBottom: 20,
  },
  paginationDot: {
    height: 8,
    borderRadius: 999,
  },
  ctaButton: {
    borderRadius: 14,
    paddingHorizontal: 22,
    marginBottom: 6,
    width: '100%',
  },
});
