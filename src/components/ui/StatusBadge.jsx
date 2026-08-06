import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useAppTheme } from '../../hooks/useAppTheme';
import { Typography } from './Typography';

export const StatusBadge = ({
  status, // 'available' | 'busy' | 'unavailable'
  style,
}) => {
  const { theme } = useAppTheme();

  const getConfig = () => {
    switch (status) {
      case 'available':
        return { color: theme.colors.success, label: 'Available' };
      case 'busy':
        return { color: theme.colors.warning, label: 'Busy' };
      case 'unavailable':
        return { color: theme.colors.danger, label: 'Unavailable' };
      default:
        return { color: theme.colors.textMuted, label: 'Unknown' };
    }
  };

  const config = getConfig();

  return (
    <View style={[styles.container, style]}>
      <View
        style={[
          styles.dot,
          { backgroundColor: config.color, borderRadius: theme.radius.pill },
        ]}
      />
      <Typography variant="caption" weight="medium" color="textSecondary">
        {config.label}
      </Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    marginRight: 6,
  },
});
