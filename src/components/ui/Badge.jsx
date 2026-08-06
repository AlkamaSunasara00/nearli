import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useAppTheme } from '../../hooks/useAppTheme';
import { Typography } from './Typography';

export const Badge = ({
  text,
  variant = 'primary', // primary, success, warning, danger, neutral
  style,
}) => {
  const { theme } = useAppTheme();

  const getColors = () => {
    switch (variant) {
      case 'success':
        return { bg: theme.colors.success + '20', text: theme.colors.success };
      case 'warning':
        return { bg: theme.colors.warning + '20', text: theme.colors.warning };
      case 'danger':
        return { bg: theme.colors.danger + '20', text: theme.colors.danger };
      case 'neutral':
        return { bg: theme.colors.surfaceSecondary, text: theme.colors.textSecondary };
      case 'primary':
      default:
        return { bg: theme.colors.primarySoft, text: theme.colors.primary };
    }
  };

  const colors = getColors();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.bg,
          borderRadius: theme.radius.small,
        },
        style,
      ]}
    >
      <Typography variant="caption" weight="medium" style={{ color: colors.text }}>
        {text}
      </Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: 'flex-start',
  },
});
