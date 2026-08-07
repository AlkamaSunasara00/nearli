import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { ShieldCheck, Star } from 'lucide-react-native';
import { useAppTheme } from '../../hooks/useAppTheme';
import { Typography } from '../ui/Typography';

export const SmallProviderCard = ({
  garage,
  onPress,
  style,
}) => {
  const { theme } = useAppTheme();

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.surface,
          borderRadius: 20,
          ...theme.shadows.sm,
        },
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <View style={styles.imageContainer}>
        {garage.photo ? (
          <Image
            source={{ uri: garage.photo }}
            style={styles.image}
          />
        ) : (
          <View
            style={[
              styles.imagePlaceholder,
              { backgroundColor: theme.colors.surfaceSecondary },
            ]}
          />
        )}
      </View>

      <View style={styles.content}>
        <View style={styles.titleRow}>
          <Typography variant="bodyMedium" weight="bold" style={styles.name} numberOfLines={1}>
            {garage.name}
          </Typography>
          {garage.verified && (
            <ShieldCheck size={14} color={theme.colors.primary} style={styles.verifiedIcon} fill={theme.colors.primary} />
          )}
        </View>

        <View style={styles.ratingBox}>
          <Star size={12} color={theme.colors.warning} fill={theme.colors.warning} />
          <Typography variant="p3" weight="bold" style={styles.ratingText}>
            {garage.rating}
          </Typography>
          <Typography variant="p3" color="textMuted">
            ({garage.reviews})
          </Typography>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 140,
    marginBottom: 8,
    overflow: 'hidden',
  },
  imageContainer: {
    width: '100%',
    height: 100,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
  },
  content: {
    padding: 12,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  name: {
    flexShrink: 1,
  },
  verifiedIcon: {
    marginLeft: 4,
  },
  ratingBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 4,
    marginRight: 4,
  },
});
