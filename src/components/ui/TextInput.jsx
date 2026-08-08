import React from 'react';
import { View, TextInput as RNTextInput, StyleSheet, Text } from 'react-native';
import { useAppTheme } from '../../hooks/useAppTheme';
import { Typography } from './Typography';

export const TextInput = ({
  label,
  error,
  leftIcon,
  rightIcon,
  containerStyle,
  style,
  ...props
}) => {
  const { theme } = useAppTheme();

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Typography variant="label" color="textSecondary" style={styles.label}>
          {label}
        </Typography>
      )}
      
      <View
        style={[
          styles.inputContainer,
          {
            backgroundColor: theme.colors.surfaceSecondary,
            borderColor: error ? theme.colors.danger : theme.colors.border,
            borderWidth: 1,
            borderRadius: theme.radius.md,
          },
        ]}
      >
        {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
        
        <RNTextInput
          style={[
            styles.input,
            {
              color: theme.colors.textPrimary,
              fontSize: theme.typography.sizes.body,
            },
            style,
          ]}
          placeholderTextColor={theme.colors.textMuted}
          {...props}
        />
        
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
    marginBottom: 16,
  },
  label: {
    marginBottom: 6,
    marginLeft: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 48,
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    height: '100%',
    paddingVertical: 12,
  },
  leftIcon: {
    marginRight: 10,
  },
  rightIcon: {
    marginLeft: 10,
  },
  error: {
    marginTop: 4,
    marginLeft: 4,
  },
});
