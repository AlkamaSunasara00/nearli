import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useAppTheme } from '../../hooks/useAppTheme';
import { Typography } from './Typography';
import { Button } from './Button';

export const EmptyState = ({ icon: Icon, title, description, actionTitle, onAction, style }) => {
  const { theme } = useAppTheme();

  return (
    <View style={[styles.container, style]}>
      {Icon && (
        <View style={[styles.iconWrapper, { backgroundColor: theme.colors.surfaceSecondary }]}>
          <Icon size={48} color={theme.colors.textMuted} />
        </View>
      )}
      <Typography variant="h3" weight="bold" color="textPrimary" align="center" style={styles.title}>
        {title}
      </Typography>
      {description && (
        <Typography variant="body" color="textSecondary" align="center" style={styles.description}>
          {description}
        </Typography>
      )}
      {actionTitle && onAction && (
        <Button title={actionTitle} variant="outline" onPress={onAction} style={styles.button} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  iconWrapper: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  title: {
    marginBottom: 8,
  },
  description: {
    marginBottom: 24,
    maxWidth: '80%',
  },
  button: {
    minWidth: 160,
  },
});
