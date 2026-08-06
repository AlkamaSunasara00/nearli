import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { ChevronRight, LogOut, Moon, Sun, Monitor, Bell, Settings, Shield, User as UserIcon, Bookmark } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAppTheme } from '../../src/hooks/useAppTheme';
import { useAuth } from '../../src/hooks/useAuth';
import { Typography } from '../../src/components/ui/Typography';
import { Avatar } from '../../src/components/ui/Avatar';

export default function ProfileScreen() {
  const { theme, themeMode, setThemeMode } = useAppTheme();
  const { logout, user } = useAuth();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const MenuItem = ({ icon, title, subtitle, onPress, showArrow = true, danger = false }) => (
    <TouchableOpacity
      style={[
        styles.menuItem,
        { borderBottomColor: theme.colors.border }
      ]}
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

  const handleThemeToggle = () => {
    if (themeMode === 'system') setThemeMode('light');
    else if (themeMode === 'light') setThemeMode('dark');
    else setThemeMode('system');
  };

  const getThemeIcon = () => {
    if (themeMode === 'system') return (color) => <Monitor size={20} color={color} />;
    if (themeMode === 'dark') return (color) => <Moon size={20} color={color} />;
    return (color) => <Sun size={20} color={color} />;
  };

  const getThemeText = () => {
    if (themeMode === 'system') return 'System Default';
    if (themeMode === 'dark') return 'Dark Mode';
    return 'Light Mode';
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background, paddingTop: insets.top }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Avatar name={user?.name || "Demo User"} size={80} style={styles.avatar} />
          <Typography variant="h3" weight="bold" color="textPrimary" style={styles.name}>
            {user?.name || "Demo User"}
          </Typography>
          <Typography variant="body" color="textSecondary">
            {user?.phone || "+91 98765 43210"}
          </Typography>
        </View>

        <Section title="Account">
          <MenuItem
            icon={(color) => <UserIcon size={20} color={color} />}
            title="Edit Profile"
          />
          <MenuItem
            icon={(color) => <Bookmark size={20} color={color} />}
            title="Saved Garages"
            onPress={() => router.push('/(customer)/saved')}
          />
          <MenuItem
            icon={(color) => <Settings size={20} color={color} />}
            title="My Reviews"
            showArrow={false}
          />
        </Section>

        <Section title="Preferences">
          <MenuItem
            icon={(color) => <Bell size={20} color={color} />}
            title="Notifications"
          />
          <MenuItem
            icon={getThemeIcon()}
            title="Appearance"
            subtitle={getThemeText()}
            onPress={handleThemeToggle}
            showArrow={false}
          />
        </Section>

        <Section title="Support & About">
          <MenuItem
            icon={(color) => <Shield size={20} color={color} />}
            title="Privacy Policy"
          />
          <MenuItem
            icon={(color) => <Settings size={20} color={color} />}
            title="Terms of Service"
          />
        </Section>

        <View style={styles.logoutSection}>
          <MenuItem
            icon={(color) => <LogOut size={20} color={color} />}
            title="Logout"
            danger
            showArrow={false}
            onPress={logout}
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
    paddingTop: 60,
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatar: {
    marginBottom: 16,
  },
  name: {
    marginBottom: 4,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 8,
    marginLeft: 16,
  },
  sectionCard: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  menuText: {
    flex: 1,
  },
  logoutSection: {
    marginTop: 16,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
});
