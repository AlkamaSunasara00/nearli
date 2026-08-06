import React from 'react';
import { TouchableOpacity, ActivityIndicator, StyleSheet, View } from 'react-native';
import { useAppTheme } from '../../hooks/useAppTheme';
import { Typography } from './Typography';

export const Button = ({
  title,
  onPress,
  variant = 'primary', // primary | secondary | outline | ghost | danger
  size = 'medium', // small | medium | large
  icon,
  loading = false,
  disabled = false,
  fullWidth = false,
  style,
  textStyle,
  ...props
}) => {
  const { theme } = useAppTheme();

  const getContainerStyle = () => {
    let backgroundColor = theme.colors.primary;
    let borderColor = 'transparent';
    let borderWidth = 0;

    if (variant === 'secondary') {
      backgroundColor = theme.colors.primarySoft;
    } else if (variant === 'outline') {
      backgroundColor = 'transparent';
      borderColor = theme.colors.border;
      borderWidth = 1;
    } else if (variant === 'ghost') {
      backgroundColor = 'transparent';
    } else if (variant === 'danger') {
      backgroundColor = theme.colors.danger;
    }

    if (disabled) {
      backgroundColor = variant === 'outline' || variant === 'ghost' ? 'transparent' : theme.colors.surfaceSecondary;
      borderColor = variant === 'outline' ? theme.colors.border : 'transparent';
    }

    let paddingVertical = theme.spacing.sm;
    let paddingHorizontal = theme.spacing.xl;

    if (size === 'small') {
      paddingVertical = theme.spacing.xs;
      paddingHorizontal = theme.spacing.md;
    } else if (size === 'large') {
      paddingVertical = theme.spacing.md;
      paddingHorizontal = theme.spacing.xxl;
    }

    return {
      backgroundColor,
      borderColor,
      borderWidth,
      paddingVertical,
      paddingHorizontal,
      borderRadius: theme.radius.medium,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      width: fullWidth ? '100%' : undefined,
      opacity: disabled && variant === 'ghost' ? 0.5 : 1,
    };
  };

  const getTextColor = () => {
    if (disabled) return theme.colors.textMuted;
    if (variant === 'primary' || variant === 'danger') return theme.colors.surface;
    if (variant === 'secondary') return theme.colors.primaryDark;
    return theme.colors.textPrimary;
  };

  return (
    <TouchableOpacity
      style={[getContainerStyle(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} size="small" />
      ) : (
        <View style={styles.content}>
          {icon && <View style={styles.iconContainer}>{icon}</View>}
          {title && (
            <Typography variant="button" color={getTextColor()} style={textStyle}>
              {title}
            </Typography>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginRight: 8,
  },
});
