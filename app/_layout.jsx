import React from 'react';
import { Stack } from 'expo-router';
import { ThemeProvider } from '../src/context/ThemeContext';
import { AuthProvider } from '../src/context/AuthContext';
import { AppProvider } from '../src/context/AppContext';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AppProvider>
          <AuthProvider>
            <StatusBar style="auto" />
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="index" />
              <Stack.Screen name="(auth)" />
              <Stack.Screen name="(customer)" />
              <Stack.Screen name="(provider)" />
              <Stack.Screen name="garage/[id]" options={{ presentation: 'modal' }} />
              <Stack.Screen name="chat/[id]" />
              <Stack.Screen name="modals/filters" options={{ presentation: 'modal' }} />
            </Stack>
          </AuthProvider>
        </AppProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
