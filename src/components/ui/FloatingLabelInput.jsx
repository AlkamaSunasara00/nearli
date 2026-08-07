import React, { useState, useEffect } from 'react';
import { View, TextInput as RNTextInput, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing, interpolate } from 'react-native-reanimated';
import { useAppTheme } from '../../hooks/useAppTheme';
import { Typography } from './Typography';

export const FloatingLabelInput = ({
  label,
  error,
  leftIcon,
  rightIcon,
  containerStyle,
  style,
  value,
  onChangeText,
  onFocus,
  onBlur,
  ...props
}) => {
  const { theme } = useAppTheme();
  const [isFocused, setIsFocused] = useState(false);
  const isFloating = isFocused || (value !== undefined && value !== null && value.length > 0);
  
  const animatedValue = useSharedValue(isFloating ? 1 : 0);

  useEffect(() => {
    animatedValue.value = withTiming(isFloating ? 1 : 0, {
      duration: 200,
      easing: Easing.bezier(0.4, 0.0, 0.2, 1),
    });
  }, [isFloating, animatedValue]);

  const handleFocus = (e) => {
    setIsFocused(true);
    if (onFocus) onFocus(e);
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    if (onBlur) onBlur(e);
  };

  const labelStyle = useAnimatedStyle(() => {
    const translateY = interpolate(animatedValue.value, [0, 1], [0, -28]);
    const scale = interpolate(animatedValue.value, [0, 1], [1, 0.85]);
    
    // Shift left slightly if there's an icon, so it floats over the border at the correct spot
    const translateX = interpolate(animatedValue.value, [0, 1], [0, leftIcon ? -32 : -4]);
    
    return {
      transform: [
        { translateY },
        { translateX },
        { scale },
      ],
      color: error 
        ? theme.colors.danger 
        : isFocused 
          ? theme.colors.primary 
          : theme.colors.textMuted,
    };
  });

  return (
    <View style={[styles.container, containerStyle]}>
      <View
        style={[
          styles.inputContainer,
          {
            backgroundColor: theme.colors.surface,
            borderColor: error ? theme.colors.danger : isFocused ? theme.colors.primary : theme.colors.border,
            borderWidth: isFocused ? 2 : 1,
            borderRadius: theme.radius.medium,
          },
        ]}
      >
        {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
        
        <View style={styles.inputWrapper}>
          <Animated.View style={[styles.labelContainer, labelStyle]} pointerEvents="none">
            <View style={{ backgroundColor: theme.colors.surface, paddingHorizontal: 4 }}>
              <Typography variant="bodyMedium" style={{ color: 'inherit' }}>
                {label}
              </Typography>
            </View>
          </Animated.View>

          <RNTextInput
            style={[
              styles.input,
              {
                color: theme.colors.textPrimary,
                fontSize: theme.typography.sizes.body,
                paddingLeft: 0,
              },
              style,
            ]}
            value={value}
            onChangeText={onChangeText}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...props}
          />
        </View>
        
        {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
      </View>

      {error && (
        <Typography variant="caption" color="danger" style={styles.error}>
          {error}
        </Typography>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    paddingTop: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 56,
    paddingHorizontal: 16,
  },
  inputWrapper: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    position: 'relative',
  },
  labelContainer: {
    position: 'absolute',
    left: 4,
    top: 16,
    zIndex: 2,
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    height: '100%',
    paddingVertical: 16,
    zIndex: 1,
  },
  leftIcon: {
    marginRight: 12,
  },
  rightIcon: {
    marginLeft: 12,
  },
  error: {
    marginTop: 4,
    marginLeft: 4,
  },
});
