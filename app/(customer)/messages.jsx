import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAppTheme } from '../../src/hooks/useAppTheme';
import { Typography } from '../../src/components/ui/Typography';
import { SearchBar } from '../../src/components/ui/SearchBar';
import { MessageRow } from '../../src/components/chat/MessageRow';
import { mockMessages } from '../../src/data/mockMessages';

export default function MessagesScreen() {
  const { theme } = useAppTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [search, setSearch] = useState('');

  const filteredMessages = mockMessages.filter(m => 
    m.name.toLowerCase().includes(search.toLowerCase()) || 
    m.lastMessage.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background, paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Typography variant="h2" weight="bold" color="textPrimary" style={styles.title}>
          Messages
        </Typography>
        <SearchBar
          value={search}
          onChangeText={setSearch}
          onClear={() => setSearch('')}
          placeholder="Search conversations..."
        />
      </View>

      <FlatList
        data={filteredMessages}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <MessageRow
            conversation={item}
            onPress={() => router.push(`/chat/${item.garageId}`)}
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Typography variant="body" color="textSecondary" align="center">
              No conversations found.
            </Typography>
          </View>
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
    paddingBottom: 16,
  },
  title: {
    marginBottom: 16,
  },
  listContent: {
    paddingBottom: 24,
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
