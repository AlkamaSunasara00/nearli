import React from 'react';
import { Tabs } from 'expo-router';
import { LayoutDashboard, MessageSquare, Wrench, Star, User } from 'lucide-react-native';
import { useAppTheme } from '../../src/hooks/useAppTheme';

export default function ProviderLayout() {
  const { theme } = useAppTheme();

  return (
    <Tabs
      sceneContainerStyle={{ backgroundColor: 'transparent' }}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginBottom: 8,
        },
        tabBarActiveTintColor: theme.colors.surface,
        tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.5)',
        tabBarStyle: {
          backgroundColor: theme.colors.primary,
          borderTopWidth: 0,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 70,
          borderTopLeftRadius: 32,
          borderTopRightRadius: 32,
          paddingBottom: 8,
          paddingTop: 8,
          elevation: 16,
          shadowColor: theme.colors.primary,
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.2,
          shadowRadius: 12,
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
