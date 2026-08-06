import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useAppTheme } from '../../src/hooks/useAppTheme';
import { Typography } from '../../src/components/ui/Typography';
import { Avatar } from '../../src/components/ui/Avatar';
import { Rating } from '../../src/components/ui/Rating';

// Mock reviews
const mockReviews = [
  { id: '1', name: 'Rahul Desai', rating: 5, date: '2 days ago', text: 'Excellent service! They fixed my car AC in just 2 hours.', photo: null },
  { id: '2', name: 'Kiran Patel', rating: 4, date: '1 week ago', text: 'Good work on the suspension, but slightly expensive.', photo: null },
];

export default function ReviewsScreen() {
  const { theme } = useAppTheme();

  return (
    <View style={[styles.container, { backgroundColor: 'transparent' }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Typography variant="h2" weight="bold" color="textPrimary">Reviews</Typography>
        </View>

        <View style={[styles.summaryCard, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
          <Typography variant="display" weight="bold" color="textPrimary">4.8</Typography>
          <Rating rating={4.8} size={24} style={styles.stars} />
          <Typography variant="bodyMedium" color="textSecondary">Based on 124 reviews</Typography>
        </View>

        <Typography variant="title" weight="bold" color="textPrimary" style={styles.sectionTitle}>
          Recent Reviews
        </Typography>

        {mockReviews.map((review) => (
          <View key={review.id} style={[styles.reviewCard, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
            <View style={styles.reviewHeader}>
              <Avatar name={review.name} size={40} style={styles.avatar} />
              <View style={styles.reviewMeta}>
                <Typography variant="bodyMedium" weight="medium" color="textPrimary">{review.name}</Typography>
                <Typography variant="caption" color="textSecondary">{review.date}</Typography>
              </View>
              <Rating rating={review.rating} />
            </View>
            <Typography variant="body" color="textSecondary" style={styles.reviewText}>
              "{review.text}"
            </Typography>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 60,
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  header: {
    marginBottom: 24,
  },
  summaryCard: {
    alignItems: 'center',
    padding: 32,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 32,
  },
  stars: {
    marginVertical: 12,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  reviewCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    marginRight: 12,
  },
  reviewMeta: {
    flex: 1,
  },
  reviewText: {
    lineHeight: 22,
  },
});
