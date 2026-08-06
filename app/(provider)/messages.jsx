import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAppTheme } from '../../src/hooks/useAppTheme';
import { Typography } from '../../src/components/ui/Typography';
import { SearchBar } from '../../src/components/ui/SearchBar';
import { MessageRow } from '../../src/components/chat/MessageRow';
import { mockProviderMessages } from '../../src/data/mockMessages';

export default function ProviderMessagesScreen() {
  const { theme } = useAppTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all'); // all | unread

  const filteredMessages = mockProviderMessages.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' ? true : m.unread > 0;
    return matchesSearch && matchesFilter;
  });

  return (
    <View style={[styles.container, { backgroundColor: 'transparent', paddingTop: insets.top }]}>
      <View style={[styles.header, { borderBottomColor: theme.colors.border }]}>
        <Typography variant="h2" weight="bold" color="textPrimary" style={styles.title}>
          Inbox
        </Typography>
        <SearchBar
          value={search}
          onChangeText={setSearch}
          onClear={() => setSearch('')}
          placeholder="Search customers..."
          style={styles.searchBar}
        />
        
        <View style={styles.filterRow}>
          <TouchableOpacity
            style={[
              styles.filterBtn,
              filter === 'all' ? { backgroundColor: theme.colors.primary } : { backgroundColor: theme.colors.surfaceSecondary }
            ]}
            onPress={() => setFilter('all')}
          >
            <Typography variant="caption" weight="medium" color={filter === 'all' ? 'surface' : 'textSecondary'}>
              All Messages
            </Typography>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterBtn,
              filter === 'unread' ? { backgroundColor: theme.colors.primary } : { backgroundColor: theme.colors.surfaceSecondary }
            ]}
            onPress={() => setFilter('unread')}
          >
            <Typography variant="caption" weight="medium" color={filter === 'unread' ? 'surface' : 'textSecondary'}>
              Unread
            </Typography>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={filteredMessages}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <MessageRow
            conversation={item}
            onPress={() => router.push(`/chat/${item.customerId}`)}
          />
        )}
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
    paddingBottom: 16,
  },
  title: {
    marginBottom: 16,
  },
  searchBar: {
    marginBottom: 16,
  },
  filterRow: {
    flexDirection: 'row',
    gap: 12,
  },
  filterBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  listContent: {
    paddingBottom: 24,
  },
});
