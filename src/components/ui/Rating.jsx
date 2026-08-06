import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Star } from 'lucide-react-native';
import { useAppTheme } from '../../hooks/useAppTheme';
import { Typography } from './Typography';

export const Rating = ({
  rating,
  reviewsCount,
  size = 14,
  style,
}) => {
  const { theme } = useAppTheme();

  if (rating === undefined || rating === null) return null;

  return (
    <View style={[styles.container, style]}>
      <Star size={size} color={theme.colors.warning} fill={theme.colors.warning} />
      <Typography variant="bodyMedium" weight="medium" style={styles.ratingText}>
        {rating.toFixed(1)}
      </Typography>
      {reviewsCount !== undefined && (
        <Typography variant="caption" color="textSecondary">
          ({reviewsCount})
        </Typography>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 4,
    marginRight: 4,
  },
});
