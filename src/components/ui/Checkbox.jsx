import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { useAppTheme } from '../../hooks/useAppTheme';

export const Checkbox = ({ value, onValueChange, disabled }) => {
  const { theme } = useAppTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={disabled}
      onPress={() => onValueChange(!value)}
      style={[
        styles.container,
        {
          backgroundColor: value ? theme.colors.primary : 'transparent',
          borderColor: value ? theme.colors.primary : theme.colors.border,
          borderRadius: theme.radius.small,
          opacity: disabled ? 0.5 : 1,
        }
      ]}
    >
      {value && (
        <View style={styles.check}>
          <View style={[styles.checkLine, styles.checkLineLeft, { backgroundColor: theme.colors.surface }]} />
          <View style={[styles.checkLine, styles.checkLineRight, { backgroundColor: theme.colors.surface }]} />
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 20,
    height: 20,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  check: {
    width: 12,
    height: 12,
    position: 'relative',
  },
  checkLine: {
    position: 'absolute',
    height: 2,
    borderRadius: 1,
  },
  checkLineLeft: {
    width: 6,
    bottom: 2,
    left: 1,
    transform: [{ rotate: '45deg' }],
  },
  checkLineRight: {
    width: 10,
    bottom: 4,
    left: 3,
    transform: [{ rotate: '-45deg' }],
  }
});
