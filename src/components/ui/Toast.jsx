import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { CheckCircle2, AlertCircle } from 'lucide-react-native';
import { Typography } from './Typography';
import { useAppTheme } from '../../hooks/useAppTheme';

export const Toast = forwardRef((props, ref) => {
  const { theme } = useAppTheme();
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [type, setType] = useState('success');
  const [opacity] = useState(new Animated.Value(0));
  const [translateY] = useState(new Animated.Value(-20));

  useImperativeHandle(ref, () => ({
    show: (msg, toastType = 'success', duration = 3000) => {
      setMessage(msg);
      setType(toastType);
      setVisible(true);

      Animated.parallel([
        Animated.timing(opacity, { toValue: 1, duration: 300, useNativeDriver: true }),
        Animated.timing(translateY, { toValue: 0, duration: 300, useNativeDriver: true })
      ]).start();

      setTimeout(() => {
        Animated.parallel([
          Animated.timing(opacity, { toValue: 0, duration: 300, useNativeDriver: true }),
          Animated.timing(translateY, { toValue: -20, duration: 300, useNativeDriver: true })
        ]).start(() => setVisible(false));
      }, duration);
    }
  }));

  if (!visible) return null;

  const isSuccess = type === 'success';
  const bgColor = isSuccess ? (theme.colors.success || '#4CAF50') : (theme.colors.error || '#F44336');
  const Icon = isSuccess ? CheckCircle2 : AlertCircle;

  return (
    <Animated.View style={[styles.container, { opacity, transform: [{ translateY }] }]}>
      <View style={[styles.toast, { backgroundColor: bgColor }]}>
        <Icon color="#FFF" size={20} />
        <Typography variant="bodyMedium" weight="bold" style={{ color: '#FFF', marginLeft: 8 }}>
          {message}
        </Typography>
      </View>
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 60,
    left: 20,
    right: 20,
    zIndex: 9999,
    alignItems: 'center',
  },
  toast: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  }
});
