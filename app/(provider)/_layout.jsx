import React from 'react';
import { Tabs } from 'expo-router';
import { LayoutDashboard, MessageSquare, Wrench, Star, User } from 'lucide-react-native';
import { useAppTheme } from '../../src/hooks/useAppTheme';

export default function ProviderLayout() {
  const { theme } = useAppTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textMuted,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.border,
          elevation: theme.shadows.md.elevation,
          shadowColor: theme.shadows.md.shadowColor,
          shadowOffset: theme.shadows.md.shadowOffset,
          shadowOpacity: theme.shadows.md.shadowOpacity,
          shadowRadius: theme.shadows.md.shadowRadius,
        },
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color, size }) => <LayoutDashboard color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          title: 'Messages',
          tabBarIcon: ({ color, size }) => <MessageSquare color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <User size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="garage"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="reviews"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
