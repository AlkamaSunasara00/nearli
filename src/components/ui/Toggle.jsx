import React from 'react';
import { View, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { useAppTheme } from '../../hooks/useAppTheme';

export const Toggle = ({ value, onValueChange, disabled }) => {
  const { theme } = useAppTheme();
  
  // A simple functional toggle since we don't have Animated value persisting across renders easily in this mock,
  // we'll use a direct visual state for simplicity without complex spring animations.
  
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={disabled}
      onPress={() => onValueChange(!value)}
      style={[
        styles.container,
        {
          backgroundColor: value ? theme.colors.primary : theme.colors.surfaceSecondary,
          opacity: disabled ? 0.5 : 1,
        }
      ]}
    >
      <View
        style={[
          styles.thumb,
          {
            backgroundColor: theme.colors.surface,
            transform: [{ translateX: value ? 20 : 2 }],
          }
        ]}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 44,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
  },
  thumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
});
