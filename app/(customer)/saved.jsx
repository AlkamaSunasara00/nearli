import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Bookmark } from 'lucide-react-native';
import { useAppTheme } from '../../src/hooks/useAppTheme';
import { useAppContext } from '../../src/context/AppContext';
import { Typography } from '../../src/components/ui/Typography';
import { ProviderCard } from '../../src/components/cards/ProviderCard';
import { EmptyState } from '../../src/components/ui/EmptyState';
import { Button } from '../../src/components/ui/Button';

export default function SavedScreen() {
  const { theme } = useAppTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { garages, savedGarageIds } = useAppContext();
  
  const savedGarages = garages.filter(g => savedGarageIds.includes(g.id));

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background, paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Typography variant="h2" weight="bold" color="textPrimary">Saved</Typography>
      </View>

      <FlatList
        data={savedGarages}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <ProviderCard
            provider={item}
            onPress={() => router.push(`/garage/${item.id}`)}
            onMessage={() => router.push(`/chat/${item.id}`)}
            style={styles.card}
          />
        )}
        ListEmptyComponent={
          <EmptyState
            icon={Bookmark}
            title="No saved garages yet"
            description="Tap the bookmark icon on any garage to save it for later."
            actionTitle="Explore Garages"
            onAction={() => router.push('/(customer)/explore')}
          />
        }
      />
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
    paddingBottom: 24,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
    flexGrow: 1,
  },
  card: {
    marginBottom: 16,
  },
});
