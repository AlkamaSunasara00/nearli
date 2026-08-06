import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useAppTheme } from '../../hooks/useAppTheme';
import { Typography } from './Typography';
import { User } from 'lucide-react-native';

export const Avatar = ({
  src,
  name,
  size = 48,
  style,
}) => {
  const { theme } = useAppTheme();

  const getInitials = (n) => {
    if (!n) return '';
    const parts = n.trim().split(' ');
    if (parts.length > 1) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return n.substring(0, 2).toUpperCase();
  };

  return (
    <View
      style={[
        styles.container,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: theme.colors.surfaceSecondary,
        },
        style,
      ]}
    >
      {src ? (
        <Image
          source={{ uri: src }}
          style={[
            styles.image,
            { width: size, height: size, borderRadius: size / 2 },
          ]}
        />
      ) : name ? (
        <Typography variant="body" weight="medium" color="textPrimary">
          {getInitials(name)}
        </Typography>
      ) : (
        <User size={size * 0.5} color={theme.colors.textMuted} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  image: {
    resizeMode: 'cover',
  },
});
