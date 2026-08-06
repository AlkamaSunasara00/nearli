import React from 'react';
import { View, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft, MapPin, Share2, Heart, Phone, Clock, ShieldCheck } from 'lucide-react-native';
import { useAppTheme } from '../../src/hooks/useAppTheme';
import { Typography } from '../../src/components/ui/Typography';
import { Button } from '../../src/components/ui/Button';
import { IconButton } from '../../src/components/ui/IconButton';
import { Rating } from '../../src/components/ui/Rating';
import { useAppContext } from '../../src/context/AppContext';

export default function GarageDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { theme } = useAppTheme();
  
  const { garages, savedGarageIds, toggleSaveGarage } = useAppContext();
  const garage = garages.find(g => g.id === id) || garages[0];
  const isSaved = savedGarageIds.includes(garage.id);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <View style={[styles.imageContainer, { paddingTop: insets.top }]}>
          <Image source={{ uri: garage.photo }} style={styles.image} />
          <View style={styles.overlayHeader}>
            <IconButton
              icon={<ArrowLeft size={24} color={theme.colors.surface} />}
              backgroundColor="rgba(0,0,0,0.5)"
              onPress={() => router.back()}
            />
            <View style={styles.overlayActions}>
              <IconButton
                icon={<Share2 size={20} color={theme.colors.surface} />}
                backgroundColor="rgba(0,0,0,0.5)"
                style={{ marginRight: 12 }}
              />
              <IconButton
                icon={<Heart size={20} color={isSaved ? theme.colors.danger : theme.colors.surface} fill={isSaved ? theme.colors.danger : 'none'} />}
                backgroundColor="rgba(0,0,0,0.5)"
                onPress={() => toggleSaveGarage(garage.id)}
              />
            </View>
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.titleRow}>
            <Typography variant="h2" weight="bold" color="textPrimary" style={styles.title}>
              {garage.name}
            </Typography>
            {garage.verified && (
              <ShieldCheck size={24} color={theme.colors.primary} style={styles.verified} />
            )}
          </View>
          
          <Rating rating={garage.rating} reviewsCount={garage.reviews} size={16} style={styles.rating} />

          <View style={styles.infoRow}>
            <MapPin size={16} color={theme.colors.textSecondary} />
            <Typography variant="body" color="textSecondary" style={styles.infoText}>
              {garage.distance} • {garage.area}
            </Typography>
          </View>

          <View style={styles.infoRow}>
            <Clock size={16} color={theme.colors.textSecondary} />
            <Typography variant="body" color="textSecondary" style={styles.infoText}>
              {garage.hours.open} - {garage.hours.close} ({garage.hours.days})
            </Typography>
          </View>

          <View style={styles.actionsRow}>
            <Button
              title="Message"
              variant="primary"
              onPress={() => router.push(`/chat/${garage.id}`)}
              style={styles.actionBtn}
              fullWidth
            />
          </View>

          <View style={styles.section}>
            <Typography variant="title" weight="bold" color="textPrimary" style={styles.sectionTitle}>
              About
            </Typography>
            <Typography variant="body" color="textSecondary" style={styles.description}>
              {garage.description}
            </Typography>
          </View>

          <View style={styles.section}>
            <Typography variant="title" weight="bold" color="textPrimary" style={styles.sectionTitle}>
              Services
            </Typography>
            <View style={styles.chipContainer}>
              {garage.services.map((service, idx) => (
                <View key={idx} style={[styles.chip, { backgroundColor: theme.colors.surfaceSecondary }]}>
                  <Typography variant="bodyMedium" color="textPrimary">{service}</Typography>
                </View>
              ))}
            </View>
          </View>

        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { paddingBottom: 40 },
  imageContainer: { width: '100%', height: 260, position: 'relative' },
  image: { width: '100%', height: '100%', resizeMode: 'cover' },
  overlayHeader: { position: 'absolute', top: 50, left: 16, right: 16, flexDirection: 'row', justifyContent: 'space-between' },
  overlayActions: { flexDirection: 'row' },
  content: { padding: 20 },
  titleRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  title: { flexShrink: 1 },
  verified: { marginLeft: 8 },
  rating: { marginBottom: 16 },
  infoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  infoText: { marginLeft: 8 },
  actionsRow: { marginTop: 16, marginBottom: 32 },
  actionBtn: { flex: 1 },
  section: { marginBottom: 24 },
  sectionTitle: { marginBottom: 12 },
  description: { lineHeight: 24 },
  chipContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20 },
});
