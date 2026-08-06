import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ShieldCheck, ChevronDown, Bell, Eye, Phone, Navigation } from 'lucide-react-native';
import { useAppTheme } from '../../src/hooks/useAppTheme';
import { useAppContext } from '../../src/context/AppContext';
import { Typography } from '../../src/components/ui/Typography';
import { StatusBadge } from '../../src/components/ui/StatusBadge';

export default function DashboardScreen() {
  const { theme } = useAppTheme();
  const insets = useSafeAreaInsets();
  const { garages, updateProviderAvailability } = useAppContext();
  // using first mock garage for provider preview
  const garage = garages[0]; 

  const toggleAvailability = () => {
    const nextStatus = garage.availability === 'available' ? 'busy' : 
                       garage.availability === 'busy' ? 'unavailable' : 'available';
    updateProviderAvailability(garage.id, nextStatus);
  };

  const StatCard = ({ title, value, icon, color }) => (
    <View style={[styles.statCard, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
      <View style={[styles.statIconWrapper, { backgroundColor: color + '20' }]}>
        {icon(color)}
      </View>
      <Typography variant="h2" weight="bold" color="textPrimary">{value}</Typography>
      <Typography variant="caption" color="textSecondary">{title}</Typography>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: 'transparent', paddingTop: insets.top }]}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Typography variant="caption" color="textSecondary">Good Morning</Typography>
            <View style={styles.titleRow}>
              <Typography variant="h3" weight="bold" color="textPrimary">{garage.name}</Typography>
              <ShieldCheck size={20} color={theme.colors.primary} style={styles.verifiedIcon} />
            </View>
          </View>
          <TouchableOpacity style={[styles.bellBtn, { backgroundColor: theme.colors.surfaceSecondary }]}>
            <Bell size={20} color={theme.colors.textPrimary} />
            <View style={[styles.badge, { backgroundColor: theme.colors.danger }]} />
          </TouchableOpacity>
        </View>

        {/* Status Selector */}
        <TouchableOpacity
          style={[styles.statusSelector, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}
          activeOpacity={0.7}
          onPress={toggleAvailability}
        >
          <View>
            <Typography variant="caption" color="textSecondary" style={styles.statusLabel}>Current Status</Typography>
            <StatusBadge status={garage.availability} />
          </View>
          <ChevronDown size={20} color={theme.colors.textMuted} />
        </TouchableOpacity>

        {/* Metrics Grid */}
        <Typography variant="title" weight="bold" color="textPrimary" style={styles.sectionTitle}>
          Overview
        </Typography>
        <View style={styles.metricsGrid}>
          <StatCard
            title="Profile Views"
            value="142"
            color={theme.colors.primary}
            icon={(c) => <Eye size={20} color={c} />}
          />
          <StatCard
            title="Calls"
            value="28"
            color={theme.colors.success}
            icon={(c) => <Phone size={20} color={c} />}
          />
          <StatCard
            title="Directions"
            value="15"
            color={theme.colors.warning}
            icon={(c) => <Navigation size={20} color={c} />}
          />
          <StatCard
            title="New Reviews"
            value="4"
            color={theme.colors.accent}
            icon={(c) => <ShieldCheck size={20} color={c} />}
          />
        </View>

        {/* Profile Completion */}
        <View style={[styles.completionCard, { backgroundColor: theme.colors.primarySoft, borderColor: theme.colors.primary + '40' }]}>
          <Typography variant="title" weight="bold" color="primary">Your profile is 80% complete</Typography>
          <Typography variant="bodyMedium" color="primaryDark" style={styles.completionText}>
            Add more photos of your garage to attract more customers.
          </Typography>
          <TouchableOpacity style={[styles.completionBtn, { backgroundColor: theme.colors.primary }]}>
            <Typography variant="button" color="surface">Add Photos</Typography>
          </TouchableOpacity>
        </View>

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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  verifiedIcon: {
    marginLeft: 6,
  },
  bellBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: 10,
    right: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 32,
  },
  statusLabel: {
    marginBottom: 6,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
    marginBottom: 32,
  },
  statCard: {
    width: '46%',
    margin: '2%',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  statIconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  completionCard: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
  },
  completionText: {
    marginTop: 8,
    marginBottom: 16,
  },
  completionBtn: {
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
});
