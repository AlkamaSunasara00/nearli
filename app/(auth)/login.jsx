import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Smartphone, Car, ShieldCheck, X } from 'lucide-react-native';
import Animated, { FadeInUp, FadeIn } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppTheme } from '../../src/hooks/useAppTheme';
import { Typography } from '../../src/components/ui/Typography';
import { Button } from '../../src/components/ui/Button';
import { authService } from '../../src/services/api/authService';

export default function LoginScreen() {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();
  const { theme } = useAppTheme();

  const handleContinue = async () => {
    setError('');
    // Strip non-digits
    const digits = phone.replace(/\D/g, '');
    if (digits.length < 10) {
      setError('Enter a valid mobile number.');
      return;
    }

    try {
      setLoading(true);
      await authService.sendOTP(digits);
      router.push({ pathname: '/(auth)/otp', params: { phone: digits } });
    } catch (err) {
      // Simulate rate limit or network errors
      if (err.status === 429) {
        setError('Too many requests. Please try again later.');
      } else {
        setError(err.message || 'Network failure. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }} edges={['top', 'bottom', 'left', 'right']}>
      <KeyboardAvoidingView
        style={[styles.container, { backgroundColor: 'transparent' }]}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          {/* Header Close */}
          <View style={styles.headerBar}>
            <TouchableOpacity onPress={handleClose} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
              <X size={24} color={theme.colors.textPrimary} />
            </TouchableOpacity>
          </View>

        {/* Custom Premium Illustration */}
        <Animated.View entering={FadeInUp.duration(600).delay(100)} style={styles.illustrationContainer}>
          <View style={[styles.mainPhone, { backgroundColor: theme.colors.surface, shadowColor: theme.colors.primary }]}>
            <View style={[styles.phoneNotch, { backgroundColor: theme.colors.borderLight }]} />
            <Smartphone size={64} color={theme.colors.primary} style={{ marginTop: 20 }} />
          </View>
          <View style={[styles.floatLeft, { backgroundColor: theme.colors.accent }]}>
            <Car size={24} color={theme.colors.surface} />
          </View>
          <View style={[styles.floatRight, { backgroundColor: theme.colors.primarySoft }]}>
            <ShieldCheck size={28} color={theme.colors.primary} />
          </View>
        </Animated.View>

        {/* Content */}
        <Animated.View entering={FadeInUp.duration(600).delay(200)} style={styles.header}>
          <Typography variant="display" weight="bold" color="textPrimary" style={styles.title}>
            Let's Get Started
          </Typography>
          <Typography variant="body" color="textSecondary" style={styles.subtitle}>
            Enter your mobile number to create a new account or sign in securely.
          </Typography>
        </Animated.View>

        {/* Form */}
        <Animated.View entering={FadeInUp.duration(600).delay(300)} style={styles.form}>
          <Typography variant="caption" weight="medium" color="textSecondary" style={{ marginBottom: 8, marginLeft: 4 }}>
            Mobile Number
          </Typography>
          
          <View style={[
            styles.inputContainer,
            { backgroundColor: theme.colors.surface, borderColor: error ? theme.colors.danger : (isFocused ? theme.colors.primary : theme.colors.border) }
          ]}>
            {/* Country Selector */}
            <View style={[styles.countrySelector, { borderRightColor: theme.colors.borderLight }]}>
              <Typography variant="body" weight="medium">🇮🇳 +91</Typography>
            </View>
            
            <TextInput
              style={[styles.input, { color: theme.colors.textPrimary, fontSize: 16 }]}
              placeholder="Enter mobile number"
              placeholderTextColor={theme.colors.textMuted}
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
              maxLength={10}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
          </View>

          {error ? (
            <Animated.View entering={FadeIn.duration(200)} style={styles.errorContainer}>
              <Typography variant="caption" color="danger">{error}</Typography>
            </Animated.View>
          ) : null}

          <Typography variant="caption" color="textSecondary" style={styles.helperText}>
            We'll send a 6-digit verification code via SMS.
          </Typography>
        </Animated.View>

        <Animated.View entering={FadeInUp.duration(600).delay(400)} style={styles.footer}>
          <Typography variant="caption" color="textSecondary" align="center" style={styles.termsText}>
            By continuing you agree to our <Typography variant="caption" color="primary">Terms of Service</Typography> and <Typography variant="caption" color="primary">Privacy Policy</Typography>.
          </Typography>

          <Button
            title="Send OTP"
            onPress={handleContinue}
            loading={loading}
            fullWidth
            style={styles.button}
          />
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 60, // Safe area approx
    paddingBottom: 40,
  },
  headerBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 24,
  },
  illustrationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 180,
    marginBottom: 40,
    position: 'relative',
  },
  mainPhone: {
    width: 100,
    height: 140,
    borderRadius: 24,
    alignItems: 'center',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#E2E8F0', // keep as is or use theme in style array, I will leave it as is if it's not hurting, but better to use theme.colors.borderLight. I can't inject theme here.
  },
  phoneNotch: {
    width: 40,
    height: 6,
    borderRadius: 3,
    marginTop: 10,
  },
  floatLeft: {
    position: 'absolute',
    left: '20%',
    top: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000', // React native shadowColor is usually fixed hex, but I can leave it or remove it. I'll leave as #000
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  floatRight: {
    position: 'absolute',
    right: '15%',
    bottom: 20,
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 28, // Matches ~32px visually with Bold
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    lineHeight: 24,
  },
  form: {
    marginBottom: 24,
  },
  inputContainer: {
    flexDirection: 'row',
    height: 56,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    overflow: 'hidden',
  },
  countrySelector: {
    paddingHorizontal: 16,
    justifyContent: 'center',
    borderRightWidth: 1,
    height: '100%',
  },
  input: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 16,
  },
  errorContainer: {
    marginTop: 8,
    marginLeft: 4,
  },
  helperText: {
    marginTop: 12,
    marginLeft: 4,
  },
  footer: {
    marginTop: 'auto',
  },
  termsText: {
    marginBottom: 24,
    paddingHorizontal: 10,
    lineHeight: 20,
  },
  button: {
    height: 56,
    borderRadius: 16,
  },
});
