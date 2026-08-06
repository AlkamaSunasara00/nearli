import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useAppTheme } from '../../hooks/useAppTheme';
import { Typography } from './Typography';

export const SegmentedControl = ({ options, selectedValue, onValueChange, style }) => {
  const { theme } = useAppTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.surfaceSecondary, borderRadius: theme.radius.pill }, style]}>
      {options.map((option) => {
        const isSelected = option.value === selectedValue;
        return (
          <TouchableOpacity
            key={option.value}
            style={[
              styles.option,
              isSelected && { backgroundColor: theme.colors.surface, borderRadius: theme.radius.pill, ...theme.shadows.sm }
            ]}
            onPress={() => onValueChange(option.value)}
            activeOpacity={0.8}
          >
            <Typography
              variant="bodyMedium"
              weight={isSelected ? 'bold' : 'medium'}
              color={isSelected ? 'textPrimary' : 'textSecondary'}
              align="center"
            >
              {option.label}
            </Typography>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 4,
    height: 44,
  },
  option: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
