import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, MessageSquare, ShieldCheck } from 'lucide-react-native';
import Animated, { FadeInUp, FadeIn, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { BlurView } from 'expo-blur';
import { useAppTheme } from '../../src/hooks/useAppTheme';
import { Typography } from '../../src/components/ui/Typography';
import { Button } from '../../src/components/ui/Button';
import { IconButton } from '../../src/components/ui/IconButton';
import { authService } from '../../src/services/api/authService';

// Animated OTP box component
const OtpBox = ({ value, isFocused, hasError, onChange, onKeyPress, onFocus, inputRef, theme }) => {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: withSpring(isFocused || value ? 1.05 : 1) }],
    };
  });

  return (
    <Animated.View style={[styles.otpBoxWrapper, animatedStyle]}>
      <TextInput
        ref={inputRef}
        style={[
          styles.otpBox,
          { 
            backgroundColor: theme.colors.surface, 
            borderColor: hasError ? theme.colors.danger : (isFocused ? theme.colors.primary : theme.colors.border),
            color: theme.colors.textPrimary,
          }
        ]}
        value={value}
        onChangeText={onChange}
        onKeyPress={onKeyPress}
        onFocus={onFocus}
        keyboardType="number-pad"
        maxLength={1}
      />
    </Animated.View>
  );
};

export default function OtpScreen() {
  const { phone } = useLocalSearchParams();
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [countdown, setCountdown] = useState(59);
  const router = useRouter();
  const { theme } = useAppTheme();
  const insets = useSafeAreaInsets();
  
  const inputs = useRef([]);

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  // Auto-verify when all 6 digits are filled
  useEffect(() => {
    if (code.every(digit => digit !== '') && code.length === 6 && !loading) {
      Keyboard.dismiss();
      handleVerify(code.join(''));
    }
  }, [code]);

  const handleVerify = async (fullCode) => {
    setError('');
    const otpToVerify = fullCode || code.join('');
    
    if (otpToVerify.length < 6) return;

    try {
      setLoading(true);
      await authService.verifyOTP(phone, otpToVerify);
      // On success, navigate to the celebration screen instead of directly to role
      router.replace('/(auth)/success');
    } catch (err) {
      if (err.message?.includes('expired')) {
        setError('Code expired. Request a new OTP.');
      } else {
        setError('Incorrect verification code.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (text, index) => {
    const newCode = [...code];
    newCode[index] = text.replace(/[^0-9]/g, '');
    setCode(newCode);

    if (text && index < 5) {
      inputs.current[index + 1].focus();
    }
    
    // Clear error if user starts typing again
    if (error) setError('');
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace') {
      if (code[index]) {
        // If there's a value, let onChangeText handle clearing it
      } else if (index > 0) {
        // If empty, move to previous box and clear it
        inputs.current[index - 1].focus();
        const newCode = [...code];
        newCode[index - 1] = '';
        setCode(newCode);
      }
    }
  };

  const handleResend = async () => {
    if (countdown > 0) return;
    try {
      setError('');
      setLoading(true);
      await authService.sendOTP(phone);
      setCountdown(59);
      setCode(['', '', '', '', '', '']);
      if (inputs.current[0]) {
        inputs.current[0].focus();
      }
    } catch (err) {
      setError('Failed to resend code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const maskedPhone = phone ? phone.replace(/(\d{2})(\d{4})(\d{4})/, '+91 $1** **** $3') : '';
  const isComplete = code.every(digit => digit !== '');

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }} edges={['top', 'bottom', 'left', 'right']}>
      <StatusBar style="light" backgroundColor={theme.colors.primary} />
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, height: insets.top, backgroundColor: theme.colors.primary, zIndex: 10 }} />
      <KeyboardAvoidingView
        style={[styles.container, { backgroundColor: 'transparent' }]}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.headerBar}>
          <TouchableOpacity onPress={() => router.back()} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }} style={styles.backButtonContainer}>
            <BlurView intensity={50} tint="light" style={styles.backButton}>
              <ArrowLeft size={20} color={theme.colors.textPrimary} />
            </BlurView>
          </TouchableOpacity>
          <Typography variant="h3" weight="bold" style={styles.headerTitle}>OTP Verification</Typography>
          <View style={{ width: 24 }} />
        </View>
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        
        {/* Illustration */}
        <Animated.View entering={FadeInUp.duration(600)} style={styles.illustrationContainer}>
           <View style={[styles.bubbleWrap, { backgroundColor: theme.colors.surface, shadowColor: theme.colors.primary }]}>
              <View style={[styles.bubble, { backgroundColor: theme.colors.brandDark }]}>
                 <MessageSquare size={32} color={theme.colors.surface} />
              </View>
           </View>
           <View style={[styles.floatShield, { backgroundColor: theme.colors.accent }]}>
             <ShieldCheck size={20} color={theme.colors.surface} />
           </View>
        </Animated.View>

        <Animated.View entering={FadeInUp.duration(600).delay(100)} style={styles.header}>
          <Typography variant="display" weight="bold" color="textPrimary" style={styles.title}>
            Enter the Code
          </Typography>
          <Typography variant="body" color="textSecondary" style={styles.subtitle}>
            We've sent a 6-digit verification code to
          </Typography>
          <Typography variant="body" weight="bold" color="primary" style={styles.phoneText}>
            {maskedPhone}
          </Typography>
        </Animated.View>

        <Animated.View entering={FadeInUp.duration(600).delay(200)} style={styles.form}>
          <View style={styles.otpContainer}>
            {code.map((digit, index) => (
              <OtpBox
                key={index}
                value={digit}
                isFocused={focusedIndex === index}
                hasError={!!error}
                onChange={(text) => handleOtpChange(text, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                onFocus={() => setFocusedIndex(index)}
                inputRef={(ref) => inputs.current[index] = ref}
                theme={theme}
              />
            ))}
          </View>

          {error ? (
            <Animated.View entering={FadeIn.duration(200)} style={styles.errorContainer}>
              <Typography variant="caption" color="danger" align="center">{error}</Typography>
            </Animated.View>
          ) : null}

          <View style={styles.resendContainer}>
            {countdown > 0 ? (
              <Typography variant="caption" color="textSecondary">
                Resend code in <Typography variant="caption" weight="bold" color="primary">00:{countdown.toString().padStart(2, '0')}</Typography>
              </Typography>
            ) : (
              <TouchableOpacity onPress={handleResend} disabled={loading}>
                 <Typography variant="caption" weight="bold" color="primary">Didn't receive the code? Resend</Typography>
              </TouchableOpacity>
            )}
          </View>
        </Animated.View>
        
        <Animated.View entering={FadeInUp.duration(600).delay(300)} style={styles.footer}>
          <Button
            title={loading ? "Verifying..." : "Submit"}
            onPress={() => handleVerify()}
            loading={loading}
            disabled={!isComplete}
            fullWidth
            size="large"
            style={styles.button}
            variant="primary"
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
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 16,
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
  headerTitle: {
    fontSize: 18,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  illustrationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 160,
    marginBottom: 32,
    position: 'relative',
  },
  bubbleWrap: {
    padding: 16,
    borderRadius: 32,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 4,
  },
  bubble: {
    width: 80,
    height: 64,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  floatShield: {
    position: 'absolute',
    bottom: 20,
    right: '30%',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    // borderColor: '#FFF', moved below if needed
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    lineHeight: 24,
  },
  phoneText: {
    textAlign: 'center',
    marginTop: 4,
    fontSize: 16,
  },
  form: {
    marginBottom: 32,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  otpBoxWrapper: {
    width: '15%',
    aspectRatio: 1,
  },
  otpBox: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 12,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  errorContainer: {
    marginBottom: 16,
  },
  resendContainer: {
    alignItems: 'center',
    marginTop: 8,
  },
  button: {
    height: 56,
    borderRadius: 16,
  },
  footer: {
    marginTop: 'auto',
  },
});
