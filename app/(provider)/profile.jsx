import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { ChevronRight, LogOut, Bell, Shield, User as UserIcon } from 'lucide-react-native';
import { useAppTheme } from '../../src/hooks/useAppTheme';
import { useAuth } from '../../src/hooks/useAuth';
import { Typography } from '../../src/components/ui/Typography';
import { Avatar } from '../../src/components/ui/Avatar';

export default function ProviderProfileScreen() {
  const { theme } = useAppTheme();
  const { logout, user } = useAuth();

  const MenuItem = ({ icon, title, subtitle, onPress, showArrow = true, danger = false }) => (
    <TouchableOpacity
      style={[styles.menuItem, { borderBottomColor: theme.colors.border }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.menuIcon, { backgroundColor: danger ? theme.colors.danger + '20' : theme.colors.surfaceSecondary }]}>
        {icon(danger ? theme.colors.danger : theme.colors.primary)}
      </View>
      <View style={styles.menuText}>
        <Typography variant="bodyMedium" weight="medium" color={danger ? 'danger' : 'textPrimary'}>
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="caption" color="textSecondary">
            {subtitle}
          </Typography>
        )}
      </View>
      {showArrow && <ChevronRight size={20} color={theme.colors.textMuted} />}
    </TouchableOpacity>
  );

  const Section = ({ title, children }) => (
    <View style={styles.section}>
      <Typography variant="caption" weight="bold" color="textSecondary" style={styles.sectionTitle}>
        {title.toUpperCase()}
      </Typography>
      <View style={[styles.sectionCard, { backgroundColor: theme.colors.surface }]}>
        {children}
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: 'transparent' }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Avatar name={user?.name || "Provider Owner"} size={80} style={styles.avatar} />
          <Typography variant="h3" weight="bold" color="textPrimary" style={styles.name}>
            {user?.name || "Provider Owner"}
          </Typography>
          <Typography variant="body" color="textSecondary">
            {user?.phone || "+91 98765 43210"}
          </Typography>
        </View>

        <Section title="Account">
          <MenuItem icon={(color) => <UserIcon size={20} color={color} />} title="Personal Profile" />
          <MenuItem icon={(color) => <Shield size={20} color={color} />} title="Verification Status" subtitle="Approved" showArrow={false} />
        </Section>

        <Section title="Preferences">
          <MenuItem icon={(color) => <Bell size={20} color={color} />} title="Notifications" />
        </Section>

        <View style={styles.logoutSection}>
          <MenuItem icon={(color) => <LogOut size={20} color={color} />} title="Logout" danger showArrow={false} onPress={logout} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { paddingTop: 60, paddingHorizontal: 16, paddingBottom: 40 },
  header: { alignItems: 'center', marginBottom: 32 },
  avatar: { marginBottom: 16 },
  name: { marginBottom: 4 },
  section: { marginBottom: 24 },
  sectionTitle: { marginBottom: 8, marginLeft: 16 },
  sectionCard: { borderRadius: 16, overflow: 'hidden' },
  menuItem: { flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1 },
  menuIcon: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', marginRight: 16 },
  menuText: { flex: 1 },
  logoutSection: { marginTop: 16, borderRadius: 16, overflow: 'hidden', backgroundColor: 'transparent' },
});
