import React from 'react';
import { TouchableOpacity, ActivityIndicator, StyleSheet, View } from 'react-native';
import { useAppTheme } from '../../hooks/useAppTheme';
import { Typography } from './Typography';
import { LinearGradient } from 'expo-linear-gradient';

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

  let height = 44;
  let borderRadius = theme.radius.full;
  
  if (size === 'small') {
    height = 36;
  } else if (size === 'large') {
    height = 52;
  }

  const getContainerStyle = () => {
    let backgroundColor = theme.colors.surfaceElevated;
    let borderColor = 'transparent';
    let borderWidth = 0;

    if (variant === 'secondary') {
      backgroundColor = theme.colors.surfaceElevated;
      borderColor = theme.colors.border;
      borderWidth = 1;
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

    return {
      backgroundColor,
      borderColor,
      borderWidth,
      height,
      paddingHorizontal: theme.spacing.xl,
      borderRadius,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      width: fullWidth ? '100%' : undefined,
      opacity: (disabled && (variant === 'ghost' || variant === 'primary')) ? 0.5 : 1,
    };
  };

  const getTextColor = () => {
    if (disabled) return theme.colors.textMuted;
    if (variant === 'primary' || variant === 'danger') return '#FFFFFF';
    return theme.colors.text;
  };

  const content = (
    <>
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
    </>
  );

  const containerStyle = [getContainerStyle(), style];

  if (variant === 'primary' && !disabled) {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={loading}
        activeOpacity={0.8}
        style={[style, { width: fullWidth ? '100%' : undefined, height, borderRadius, overflow: 'hidden' }]}
        {...props}
      >
        <LinearGradient
          colors={theme.gradients.primary.colors}
          start={theme.gradients.primary.start}
          end={theme.gradients.primary.end}
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', paddingHorizontal: theme.spacing.xl }}
        >
          {content}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={containerStyle}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      {...props}
    >
      {content}
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
