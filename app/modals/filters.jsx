import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppTheme } from '../../src/hooks/useAppTheme';
import { useAppContext } from '../../src/context/AppContext';
import { Typography } from '../../src/components/ui/Typography';
import { Button } from '../../src/components/ui/Button';

export default function FiltersModal() {
  const { theme } = useAppTheme();
  const router = useRouter();
  const { filters, setFilters } = useAppContext();
  
  const [localFilters, setLocalFilters] = useState(filters);

  const applyFilters = () => {
    setFilters(localFilters);
    router.back();
  };

  const resetFilters = () => {
    const defaultFilters = { vehicle: 'both', distance: 'any', rating: 0 };
    setLocalFilters(defaultFilters);
    setFilters(defaultFilters);
    router.back();
  };

  const FilterChip = ({ label, selected, onPress }) => (
    <Button
      title={label}
      variant={selected ? 'primary' : 'outline'}
      onPress={onPress}
      size="small"
      style={{ marginRight: 8, marginBottom: 8 }}
    />
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.surface }]}>
      <View style={[styles.header, { borderBottomColor: theme.colors.border }]}>
        <Typography variant="h3" weight="bold" color="textPrimary">Filters</Typography>
      </View>
      
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.section}>
          <Typography variant="title" weight="bold" color="textPrimary" style={styles.sectionTitle}>Vehicle Type</Typography>
          <View style={styles.row}>
            <FilterChip label="Bike" selected={localFilters.vehicle === 'bike'} onPress={() => setLocalFilters({...localFilters, vehicle: 'bike'})} />
            <FilterChip label="Car" selected={localFilters.vehicle === 'car'} onPress={() => setLocalFilters({...localFilters, vehicle: 'car'})} />
            <FilterChip label="Both" selected={localFilters.vehicle === 'both'} onPress={() => setLocalFilters({...localFilters, vehicle: 'both'})} />
          </View>
        </View>

        <View style={styles.section}>
          <Typography variant="title" weight="bold" color="textPrimary" style={styles.sectionTitle}>Distance</Typography>
          <View style={styles.row}>
            <FilterChip label="2 km" selected={localFilters.distance === '2km'} onPress={() => setLocalFilters({...localFilters, distance: '2km'})} />
            <FilterChip label="5 km" selected={localFilters.distance === '5km'} onPress={() => setLocalFilters({...localFilters, distance: '5km'})} />
            <FilterChip label="10 km" selected={localFilters.distance === '10km'} onPress={() => setLocalFilters({...localFilters, distance: '10km'})} />
            <FilterChip label="Any" selected={localFilters.distance === 'any'} onPress={() => setLocalFilters({...localFilters, distance: 'any'})} />
          </View>
        </View>
      </ScrollView>

      <View style={[styles.footer, { borderTopColor: theme.colors.border }]}>
        <Button title="Reset" variant="ghost" onPress={resetFilters} style={{ flex: 1 }} />
        <Button title="Apply Filters" variant="primary" onPress={applyFilters} style={{ flex: 2 }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, marginTop: 60, borderTopLeftRadius: 24, borderTopRightRadius: 24 },
  header: { padding: 24, borderBottomWidth: 1, alignItems: 'center' },
  content: { padding: 24 },
  section: { marginBottom: 32 },
  sectionTitle: { marginBottom: 16 },
  row: { flexDirection: 'row', flexWrap: 'wrap' },
  footer: { flexDirection: 'row', padding: 24, borderTopWidth: 1, gap: 16 },
});
