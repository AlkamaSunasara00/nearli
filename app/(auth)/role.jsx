import React, { useState } from 'react';
import * as Location from 'expo-location';
import { View, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { User, Wrench, CheckCircle2 } from 'lucide-react-native';
import Animated, { FadeInUp, FadeInDown, useAnimatedStyle, withSpring, useSharedValue } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppTheme } from '../../src/hooks/useAppTheme';
import { useAuth } from '../../src/hooks/useAuth';
import { Typography } from '../../src/components/ui/Typography';
import { Button } from '../../src/components/ui/Button';

// Animated Role Card
const RoleCard = ({ type, title, description, icon, isSelected, onPress, theme, delay }) => {
  const scale = useSharedValue(1);

  const handlePressIn = () => {
    scale.value = withSpring(0.95);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
    onPress();
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <Animated.View entering={FadeInUp.duration(600).delay(delay)} style={styles.cardWrapper}>
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <Animated.View
          style={[
            styles.card,
            animatedStyle,
            {
              backgroundColor: theme.colors.surface, // Keep background clean
              borderColor: isSelected ? theme.colors.primary : theme.colors.borderLight, // Color around the card
              shadowColor: isSelected ? theme.colors.primary : '#000',
              shadowOpacity: isSelected ? 0.15 : 0.04, // Add a slight glow around when selected
              shadowRadius: isSelected ? 24 : 16,
            },
          ]}
        >
          <View style={styles.cardHeader}>
            <View
              style={[
                styles.iconWrapper,
                { backgroundColor: isSelected ? theme.colors.primary : theme.colors.surfaceSecondary },
              ]}
            >
              {icon(isSelected ? theme.colors.surface : theme.colors.primary)}
            </View>
            <View style={[styles.checkCircle, { opacity: isSelected ? 1 : 0 }]}>
               <CheckCircle2 size={24} color={theme.colors.primary} />
            </View>
          </View>
          <Typography variant="title" weight="bold" color={isSelected ? 'primary' : 'textPrimary'} style={styles.cardTitle}>
            {title}
          </Typography>
          <Typography variant="bodyMedium" color="textSecondary" style={styles.cardDescription}>
            {description}
          </Typography>
        </Animated.View>
      </Pressable>
    </Animated.View>
  );
};

export default function RoleSelectionScreen() {
  const [selectedRole, setSelectedRole] = useState(null); // 'customer' | 'provider'
  const router = useRouter();
  const { setRole } = useAuth();
  const { theme } = useAppTheme();

  const handleContinue = async () => {
    if (!selectedRole) return;
    
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
      }
    } catch (error) {
      console.warn('Error requesting location permission:', error);
    }

    setRole(selectedRole);
    if (selectedRole === 'customer') {
      router.replace('/(customer)/home');
    } else {
      router.replace('/(provider)/dashboard');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }} edges={['top', 'bottom', 'left', 'right']}>
      <View style={[styles.container, { backgroundColor: 'transparent' }]}>
        
        <Animated.View entering={FadeInUp.duration(600).delay(100)} style={styles.header}>
          <Typography variant="display" weight="bold" color="textPrimary" style={styles.title}>
            Choose Your Profile
          </Typography>
          <Typography variant="body" color="textSecondary" style={styles.subtitle}>
            Select how you'd like to use NEARIST today. You can always change this later in settings.
          </Typography>
        </Animated.View>

        <View style={styles.cardsContainer}>
          <RoleCard
            type="customer"
            title="Customer"
            description="Find trusted garages nearby, compare prices, and book services instantly."
            icon={(color) => <User size={28} color={color} />}
            isSelected={selectedRole === 'customer'}
            onPress={() => setSelectedRole('customer')}
            theme={theme}
            delay={200}
          />
          <RoleCard
            type="provider"
            title="Service Provider"
            description="List your garage, manage bookings, and connect with customers."
            icon={(color) => <Wrench size={28} color={color} />}
            isSelected={selectedRole === 'provider'}
            onPress={() => setSelectedRole('provider')}
            theme={theme}
            delay={300}
          />
        </View>

        <Animated.View entering={FadeInDown.duration(600).delay(400)} style={styles.footer}>
          <Button
            title="Continue"
            onPress={handleContinue}
            disabled={!selectedRole}
            fullWidth
            size="large"
            style={styles.button}
            variant={selectedRole ? "primary" : "disabled"}
          />
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  header: {
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    marginBottom: 12,
  },
  subtitle: {
    lineHeight: 24,
  },
  cardsContainer: {
    flex: 1,
    gap: 20,
  },
  cardWrapper: {
    marginBottom: 8,
  },
  card: {
    borderWidth: 2,
    borderRadius: 24,
    padding: 24,
    minHeight: 160,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.04,
    shadowRadius: 16,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  iconWrapper: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkCircle: {
    padding: 4,
  },
  cardTitle: {
    fontSize: 20,
    marginBottom: 8,
  },
  cardDescription: {
    lineHeight: 22,
  },
  footer: {
    paddingBottom: 24,
  },
  button: {
    height: 56,
    borderRadius: 16,
  },
});
