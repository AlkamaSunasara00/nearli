import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { ThemeProvider } from '../src/context/ThemeContext';
import { AuthProvider } from '../src/context/AuthContext';
import { AppProvider } from '../src/context/AppContext';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider as NavigationThemeProvider, DefaultTheme } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import { GlobalBackground } from '../src/components/ui/GlobalBackground';
import { 
  useFonts, 
  Inter_400Regular, 
  Inter_500Medium, 
  Inter_600SemiBold, 
  Inter_700Bold 
} from '@expo-google-fonts/inter';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AppProvider>
          <AuthProvider>
            <StatusBar style="auto" />
            <NavigationThemeProvider value={{ ...DefaultTheme, colors: { ...DefaultTheme.colors, background: 'transparent' } }}>
              <GlobalBackground>
                <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: 'transparent' }, animation: 'fade' }}>
                  <Stack.Screen name="index" />
                  <Stack.Screen name="(auth)" />
                  <Stack.Screen name="(customer)" />
                  <Stack.Screen name="(provider)" />
                  <Stack.Screen name="garage/[id]" options={{ presentation: 'modal' }} />
                  <Stack.Screen name="chat/[id]" />
                  <Stack.Screen name="modals/filters" options={{ presentation: 'modal' }} />
                </Stack>
              </GlobalBackground>
            </NavigationThemeProvider>
          </AuthProvider>
        </AppProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
