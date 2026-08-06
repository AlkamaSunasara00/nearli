import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Keyboard, LogBox } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ExploreServices } from '../../src/components/explore/ExploreServices';
import { ExploreMap } from '../../src/components/explore/ExploreMap';
import { SearchDiscoveryOverlay } from '../../src/components/ui/SearchDiscoveryOverlay';
import { useAppTheme } from '../../src/hooks/useAppTheme';

LogBox.ignoreLogs(['SafeAreaView has been deprecated']);

export default function ExploreScreen() {
  const { theme } = useAppTheme();
  const insets = useSafeAreaInsets();
  
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'map'
  const [isSearchActive, setIsSearchActive] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      {viewMode === 'list' ? (
        <ExploreServices 
          onToggleMap={() => setViewMode('map')} 
          onSearchPress={() => setIsSearchActive(true)}
        />
      ) : (
        <ExploreMap 
          onToggleList={() => setViewMode('list')} 
          onSearchPress={() => setIsSearchActive(true)}
        />
      )}

      {/* SEARCH DISCOVERY OVERLAY */}
      <SearchDiscoveryOverlay 
        visible={isSearchActive} 
        onClose={() => setIsSearchActive(false)} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F6FA',
  },
});
