import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Map, List, SlidersHorizontal } from 'lucide-react-native';
import { useAppTheme } from '../../src/hooks/useAppTheme';
import { useAppContext } from '../../src/context/AppContext';
import { Typography } from '../../src/components/ui/Typography';
import { SearchBar } from '../../src/components/ui/SearchBar';
import { ProviderCard } from '../../src/components/cards/ProviderCard';
import { IconButton } from '../../src/components/ui/IconButton';

export default function ExploreScreen() {
  const { theme } = useAppTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { garages, filters } = useAppContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('list'); // list | map

  const handleGaragePress = (id) => {
    router.push(`/garage/${id}`);
  };

  const handleFilter = () => {
    router.push('/modals/filters');
  };

  const filteredGarages = garages.filter(g => {
    const matchesSearch = g.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          g.services.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
                          
    const matchesVehicle = filters.vehicle === 'both' ? true : (g.type === filters.vehicle || g.type === 'both');
    
    return matchesSearch && matchesVehicle;
  });

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background, paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Typography variant="h2" weight="bold" color="textPrimary" style={styles.title}>
          Explore
        </Typography>
        <View style={styles.searchRow}>
          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            onClear={() => setSearchQuery('')}
            placeholder="Search garages, services..."
            style={styles.searchBar}
          />
          <IconButton
            icon={<SlidersHorizontal size={20} color={theme.colors.textPrimary} />}
            backgroundColor="surfaceSecondary"
            onPress={handleFilter}
            style={styles.filterBtn}
          />
        </View>

        <View style={styles.toggleRow}>
          <TouchableOpacity
            style={[
              styles.toggleBtn,
              viewMode === 'list' ? { backgroundColor: theme.colors.primary } : { backgroundColor: theme.colors.surfaceSecondary },
            ]}
            onPress={() => setViewMode('list')}
          >
            <List size={16} color={viewMode === 'list' ? theme.colors.surface : theme.colors.textSecondary} />
            <Typography variant="caption" weight="medium" color={viewMode === 'list' ? 'surface' : 'textSecondary'} style={styles.toggleText}>
              List
            </Typography>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.toggleBtn,
              viewMode === 'map' ? { backgroundColor: theme.colors.primary } : { backgroundColor: theme.colors.surfaceSecondary },
            ]}
            onPress={() => setViewMode('map')}
          >
            <Map size={16} color={viewMode === 'map' ? theme.colors.surface : theme.colors.textSecondary} />
            <Typography variant="caption" weight="medium" color={viewMode === 'map' ? 'surface' : 'textSecondary'} style={styles.toggleText}>
              Map
            </Typography>
          </TouchableOpacity>
        </View>
      </View>

      {viewMode === 'list' ? (
        <FlatList
          data={filteredGarages}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <ProviderCard
              garage={item}
              onPress={() => handleGaragePress(item.id)}
              onMessage={() => router.push(`/chat/${item.id}`)}
              style={styles.card}
            />
          )}
        />
      ) : (
        <View style={styles.mapPlaceholder}>
          <Map size={48} color={theme.colors.textMuted} />
          <Typography variant="body" color="textSecondary" style={styles.mapText}>
            Map view is coming soon...
          </Typography>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  title: {
    marginBottom: 16,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  searchBar: {
    flex: 1,
    marginRight: 12,
  },
  filterBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  toggleRow: {
    flexDirection: 'row',
    gap: 12,
  },
  toggleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  toggleText: {
    marginLeft: 6,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  card: {
    marginBottom: 16,
  },
  mapPlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapText: {
    marginTop: 16,
  },
});
