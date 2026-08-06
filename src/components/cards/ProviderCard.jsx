import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { ShieldCheck, MessageCircle, Navigation, Star } from 'lucide-react-native';
import { useAppTheme } from '../../hooks/useAppTheme';
import { Typography } from '../ui/Typography';

export const ProviderCard = ({
  garage,
  onPress,
  onMessage,
  onDirections,
  style,
}) => {
  const { theme } = useAppTheme();

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.surface,
          borderRadius: 24,
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
        {/* Title Row */}
        <View style={styles.titleRow}>
          <Typography variant="body" weight="bold" style={styles.name} numberOfLines={1}>
            {garage.name}
          </Typography>
          {garage.verified && (
            <ShieldCheck size={16} color={theme.colors.primary} style={styles.verifiedIcon} fill={theme.colors.primary} />
          )}
        </View>

        {/* Rating and Distance Row */}
        <View style={styles.infoRow}>
          <View style={styles.ratingBox}>
            <Star size={14} color="#F59E0B" fill="#F59E0B" />
            <Typography variant="caption" weight="bold" style={styles.ratingText}>
              {garage.rating}
            </Typography>
            <Typography variant="caption" color="textMuted">
              ({garage.reviews})
            </Typography>
          </View>
          <Typography variant="caption" color="textMuted" style={styles.dot}>•</Typography>
          <Typography variant="caption" color="textSecondary" style={styles.distanceLeft}>
            {garage.distance}
          </Typography>
          <View style={{ flex: 1 }} />
          <Typography variant="caption" color="textSecondary">
            {garage.distance}
          </Typography>
        </View>

        {/* Status and Hours */}
        <View style={styles.statusRow}>
          <View style={[styles.statusBadge, { backgroundColor: '#E8F5E9' }]}>
            <Typography variant="caption" weight="bold" style={{ color: '#2E7D32', fontSize: 10 }}>
              Available Now
            </Typography>
          </View>
          <Typography variant="caption" color="textSecondary" style={styles.hours}>
            {garage.hours?.close ? `Open until ${garage.hours.close}` : 'Open'}
          </Typography>
        </View>

        {/* Vehicles Supported */}
        <Typography variant="caption" weight="bold" color="textPrimary" style={styles.vehicles}>
          {garage.vehiclesSupported?.join(' • ')}
        </Typography>

        {/* Services Chips */}
        <View style={styles.servicesRow}>
          {garage.services?.slice(0, 3).map((service, index) => (
            <View
              key={index}
              style={[
                styles.serviceChip,
                { backgroundColor: theme.colors.background },
              ]}
            >
              <Typography variant="caption" color="textSecondary" style={{ fontSize: 10 }}>
                {service}
              </Typography>
            </View>
          ))}
          {garage.services?.length > 3 && (
            <View
              style={[
                styles.serviceChip,
                { backgroundColor: theme.colors.background },
              ]}
            >
              <Typography variant="caption" color="textSecondary" style={{ fontSize: 10 }}>
                +{garage.services.length - 3}
              </Typography>
            </View>
          )}
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsRow}>
          <TouchableOpacity
            style={[styles.actionBtn, styles.messageBtn, { borderColor: theme.colors.borderLight }]}
            onPress={onMessage}
          >
            <MessageCircle size={14} color={theme.colors.primary} style={{ marginRight: 6 }} />
            <Typography variant="caption" weight="bold" color="primary">Message</Typography>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionBtn, styles.directionsBtn, { backgroundColor: theme.colors.primary }]}
            onPress={onDirections}
          >
            <Navigation size={14} color="#FFF" style={{ marginRight: 6 }} />
            <Typography variant="caption" weight="bold" style={{ color: '#FFF' }}>Directions</Typography>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 12,
    marginBottom: 20,
    overflow: 'hidden',
  },
  imageContainer: {
    width: 120,
    height: 180,
    borderRadius: 16,
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
    flex: 1,
    paddingLeft: 16,
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    flexShrink: 1,
    fontSize: 16,
  },
  verifiedIcon: {
    marginLeft: 4,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 4,
    marginRight: 4,
  },
  dot: {
    marginHorizontal: 4,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 8,
  },
  hours: {
    fontSize: 11,
  },
  vehicles: {
    fontSize: 11,
    marginBottom: 8,
  },
  servicesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  serviceChip: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 6,
    marginBottom: 6,
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 12,
  },
  messageBtn: {
    borderWidth: 1,
    marginRight: 8,
  },
  directionsBtn: {
    // bg primary set inline
  },
});
