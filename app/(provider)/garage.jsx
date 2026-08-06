import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ShieldCheck, Settings, Camera, Navigation, MapPin, Clock } from 'lucide-react-native';
import { useAppTheme } from '../../src/hooks/useAppTheme';
import { useAppContext } from '../../src/context/AppContext';
import { Typography } from '../../src/components/ui/Typography';

export default function GarageScreen() {
  const { theme } = useAppTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { garages } = useAppContext();
  const garage = garages[0];

  const SettingRow = ({ icon, title, value, onPress }) => (
    <TouchableOpacity
      style={[styles.settingRow, { borderBottomColor: theme.colors.border }]}
      onPress={onPress}
    >
      <View style={[styles.settingIcon, { backgroundColor: theme.colors.surfaceSecondary }]}>
        {icon(theme.colors.primary)}
      </View>
      <View style={styles.settingContent}>
        <Typography variant="bodyMedium" weight="medium" color="textPrimary">
          {title}
        </Typography>
        {value && (
          <Typography variant="caption" color="textSecondary" style={styles.settingValue}>
            {value}
          </Typography>
        )}
      </View>
      <ChevronRightIcon color={theme.colors.textMuted} />
    </TouchableOpacity>
  );

  const ChevronRightIcon = ({ color }) => (
    <Typography color="textMuted">›</Typography> 
  ); // fallback arrow

  return (
    <View style={[styles.container, { backgroundColor: 'transparent' }]}>
      <ScrollView contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top }]}>
        <View style={styles.coverContainer}>
          <Image source={{ uri: garage.photo }} style={styles.coverImage} />
          <View style={[styles.avatarContainer, { borderColor: theme.colors.surface }]}>
            <Image source={{ uri: garage.photo }} style={styles.avatarImage} />
            <View style={[styles.editBadge, { backgroundColor: theme.colors.primary, borderColor: theme.colors.surface }]}>
              <Camera size={14} color={theme.colors.surface} />
            </View>
          </View>
        </View>

        <View style={styles.headerInfo}>
          <View style={styles.titleRow}>
            <Typography variant="h2" weight="bold" color="textPrimary">{garage.name}</Typography>
            <ShieldCheck size={20} color={theme.colors.primary} style={styles.verifiedIcon} />
          </View>
          <Typography variant="body" color="textSecondary">{garage.area}</Typography>
        </View>

        <View style={[styles.settingsGroup, { backgroundColor: theme.colors.surface }]}>
          <SettingRow
            icon={(c) => <Settings size={20} color={c} />}
            title="Business Information"
            value="Name, Description, Contact"
            onPress={() => router.push('/(provider)/edit-business')}
          />
          <SettingRow
            icon={(c) => <MapPin size={20} color={c} />}
            title="Location"
            value={garage.area}
          />
          <SettingRow
            icon={(c) => <Clock size={20} color={c} />}
            title="Opening Hours"
            value={garage.hours.open + ' - ' + garage.hours.close}
          />
          <SettingRow
            icon={(c) => <Navigation size={20} color={c} />}
            title="Services & Vehicles"
            value={garage.services.length + ' services'}
          />
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
    paddingBottom: 40,
  },
  coverContainer: {
    height: 200,
    position: 'relative',
    marginBottom: 50,
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  avatarContainer: {
    position: 'absolute',
    bottom: -40,
    left: 20,
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 40,
  },
  editBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerInfo: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  verifiedIcon: {
    marginLeft: 6,
  },
  settingsGroup: {
    marginHorizontal: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  settingContent: {
    flex: 1,
  },
  settingValue: {
    marginTop: 2,
  },
});
