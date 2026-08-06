import React, { useState } from 'react';
import { Tabs } from 'expo-router';
import { Home, Compass, MessageSquare, Bookmark, User, Search } from 'lucide-react-native';
import { useAppTheme } from '../../src/hooks/useAppTheme';
import { SearchDiscoveryOverlay } from '../../src/components/ui/SearchDiscoveryOverlay';

export default function CustomerLayout() {
  const { theme } = useAppTheme();
  const [isGlobalSearchActive, setIsGlobalSearchActive] = useState(false);

  return (
    <>
    <Tabs
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
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
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
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, size }) => <Compass color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color, size }) => <Search color={color} size={size} />,
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            setIsGlobalSearchActive(true);
          },
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
        name="saved"
        options={{
          href: null,
        }}
      />
    </Tabs>
    <SearchDiscoveryOverlay 
      visible={isGlobalSearchActive} 
      onClose={() => setIsGlobalSearchActive(false)} 
    />
    </>
  );
}
