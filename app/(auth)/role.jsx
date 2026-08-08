import React, { useState } from 'react';
import * as Location from 'expo-location';
import { View, StyleSheet, TouchableOpacity, Pressable, Image, ImageBackground, Dimensions } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, ChevronRight, ShieldCheck, Check } from 'lucide-react-native';
import Animated, { FadeInUp, FadeInDown, useAnimatedStyle, withSpring, useSharedValue } from 'react-native-reanimated';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { useAppTheme } from '../../src/hooks/useAppTheme';
import { useAuth } from '../../src/hooks/useAuth';
import { Typography } from '../../src/components/ui/Typography';
import { Button } from '../../src/components/ui/Button';

const { width, height } = Dimensions.get('window');

const RoleCard = ({ title, description, imageSource, isSelected, onPress, theme, delay }) => {
  const scale = useSharedValue(1);

  const handlePressIn = () => { scale.value = withSpring(0.97); };
  const handlePressOut = () => { scale.value = withSpring(1); onPress(); };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View entering={FadeInUp.duration(600).delay(delay)} style={styles.cardWrapper}>
      <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut}>
        <Animated.View
          style={[
            styles.card,
            animatedStyle,
            {
              backgroundColor: isSelected ? (theme.colors.primarySoft || '#FFE8D6') : theme.colors.surface,
              borderColor: isSelected ? theme.colors.primary : theme.colors.borderLight,
              borderWidth: isSelected ? 2 : 1,
              shadowColor: isSelected ? theme.colors.primary : '#000',
              shadowOpacity: isSelected ? 0.15 : 0.05,
              shadowRadius: isSelected ? 12 : 8,
              elevation: isSelected ? 4 : 2,
            },
          ]}
        >
          {isSelected && (
            <View style={styles.checkCircleBadge}>
              <Check size={16} color="#FFFFFF" strokeWidth={3} />
            </View>
          )}
          
          <View style={styles.cardContentRow}>
            {/* Left Col: Text */}
            <View style={styles.middleCol}>
              <Typography variant="h3" weight="bold" style={styles.cardTitle}>
                {title}
              </Typography>
              <Typography variant="bodySmall" color="textSecondary" style={styles.cardDescription}>
                {description}
              </Typography>
            </View>

            {/* Right Col: Image or Placeholder */}
            <View style={styles.rightCol}>
              {imageSource ? (
                <Image source={imageSource} style={styles.cardImage} resizeMode="cover" />
              ) : (
                <View style={[styles.imagePlaceholder, { backgroundColor: isSelected ? '#FFFFFF' : theme.colors.surfaceSecondary }]} />
              )}
            </View>
          </View>
        </Animated.View>
      </Pressable>
    </Animated.View>
  );
};

export default function RoleSelectionScreen() {
  const [selectedRole, setSelectedRole] = useState(null);
  const router = useRouter();
  const { phone } = useLocalSearchParams();
  const { theme } = useAppTheme();
  const insets = useSafeAreaInsets();

  const handleContinue = async () => {
    if (!selectedRole) return;
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') console.log('Permission denied');
    } catch (error) {
      console.warn('Location error:', error);
    }

    if (selectedRole === 'customer') {
      router.push({ pathname: '/(auth)/registration', params: { phone } });
    } else {
      router.push({ pathname: '/(auth)/provider-setup', params: { phone } });
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {/* Top Section with Image */}
      <View style={styles.topSectionWrapper}>
        <View style={styles.topSection}>
          <Image
            source={require('../../assets/images/screens/1.png')}
            style={styles.topBackgroundImage}
            resizeMode="cover"
          />
          <SafeAreaView style={styles.safeArea} edges={['top']}>
            {/* Back Button */}
            <TouchableOpacity onPress={() => router.back()} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }} style={[styles.backButtonContainer, { marginTop: 16, marginLeft: 24 }]}>
              <BlurView intensity={50} tint="light" style={styles.backButton}>
                <ArrowLeft size={20} color={theme.colors.textPrimary} />
              </BlurView>
            </TouchableOpacity>

            {/* Header Text */}
            <View style={styles.headerTextContainer}>
              <Typography variant="display" weight="bold" style={[styles.titleText, { color: '#FFFFFF' }]}>
                Choose Your
              </Typography>
              <Typography variant="display" weight="bold" style={[styles.titleText, { color: '#FFFFFF' }]}>
                Profile
              </Typography>
              <Typography variant="bodyMedium" style={[styles.subtitleText, { color: 'rgba(255, 255, 255, 0.9)' }]}>
                Select how you'd like to use{'\n'}Nearli today. You can always{'\n'}change this later in settings.
              </Typography>
            </View>
          </SafeAreaView>
        </View>
      </View>

      {/* Cards Section */}
      <View style={styles.bottomSection}>
        <RoleCard
          title="Customer"
          description="Find trusted garages nearby, compare prices, and book services instantly."
          isSelected={selectedRole === 'customer'}
          onPress={() => setSelectedRole('customer')}
          theme={theme}
          delay={100}
          imageSource={require('../../assets/images/screens/customer.png')}
        />
        <RoleCard
          title="Service Provider"
          description="List your garage, manage bookings, and connect with customers."
          isSelected={selectedRole === 'provider'}
          onPress={() => setSelectedRole('provider')}
          theme={theme}
          delay={200}
          imageSource={require('../../assets/images/screens/provider.png')}
        />

        {/* Footer */}
        <Animated.View entering={FadeInDown.duration(600).delay(300)} style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 24) }]}>
          <View style={styles.trustBadge}>
            <ShieldCheck size={16} color={theme.colors.primary} />
            <Typography variant="caption" color="textSecondary" style={{ marginLeft: 6 }}>
              Secure. Reliable. Always Here for You.
            </Typography>
          </View>

          <Button
            title="Continue"
            onPress={handleContinue}
            disabled={!selectedRole}
            fullWidth
            size="large"
            rightIcon={<ArrowLeft size={20} color="#FFF" style={{ transform: [{ rotate: '180deg' }] }} />}
            style={styles.button}
            variant={selectedRole ? "primary" : "disabled"}
          />
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F7',
  },
  topSectionWrapper: {
    height: 285,
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
    zIndex: 10,
  },
  topSection: {
    flex: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: 'hidden',
  },
  topBackgroundImage: {
    position: 'absolute',
    top: -40,
    left: 0,
    width: '100%',
    height: height * 0.5, // Scale image up
  },
  safeArea: {
    flex: 1,
  },
  backButtonContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
  },
  backButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTextContainer: {
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  titleText: {
    fontSize: 32,
    lineHeight: 38,
  },
  subtitleText: {
    marginTop: 12,
    lineHeight: 20,
    fontSize: 13,
    maxWidth: '75%',
  },
  bottomSection: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  cardWrapper: {
    marginBottom: 16,
  },
  card: {
    borderRadius: 24,
    padding: 16,
    paddingVertical: 24,
    minHeight: 140,
    position: 'relative',
  },
  checkCircleBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#4CAF50',
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  cardContentRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  middleCol: {
    flex: 1,
    paddingRight: 8,
  },
  cardTitle: {
    fontSize: 18,
    marginBottom: 6,
  },
  cardDescription: {
    lineHeight: 18,
    fontSize: 12,
  },
  rightCol: {
    width: 120,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  footer: {
    marginTop: 'auto',
  },
  trustBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  button: {
    height: 56,
    borderRadius: 16,
  },
});
