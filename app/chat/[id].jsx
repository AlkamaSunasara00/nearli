import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, FlatList, TextInput as RNTextInput } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft, Phone, Send, Paperclip } from 'lucide-react-native';
import { useAppTheme } from '../../src/hooks/useAppTheme';
import { useAppContext } from '../../src/context/AppContext';
import { Typography } from '../../src/components/ui/Typography';
import { IconButton } from '../../src/components/ui/IconButton';
import { Avatar } from '../../src/components/ui/Avatar';
import { ChatBubble } from '../../src/components/chat/ChatBubble';

export default function ChatScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { theme } = useAppTheme();
  const { garages, conversations, addMessage } = useAppContext();
  const [text, setText] = useState('');

  const target = garages.find(g => g.id === id) || { name: 'Chat', photo: null };
  const conversation = conversations.find(m => m.garageId === id || m.customerId === id);
  const messages = conversation?.messages || [];

  const handleSend = () => {
    if (!text.trim() || !conversation) return;
    addMessage(conversation.id, text.trim(), true);
    setText('');
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.colors.background, paddingTop: insets.top }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={[styles.header, { borderBottomColor: theme.colors.border }]}>
        <IconButton icon={<ArrowLeft size={24} color={theme.colors.textPrimary} />} onPress={() => router.back()} />
        <View style={styles.headerTitle}>
          <Avatar src={target.photo} name={target.name} size={36} />
          <Typography variant="body" weight="bold" color="textPrimary" style={styles.name} numberOfLines={1}>
            {target.name}
          </Typography>
        </View>
        <IconButton icon={<Phone size={20} color={theme.colors.primary} />} />
      </View>

      <FlatList
        data={messages}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <ChatBubble message={item.text} isOwn={item.isOwn} time={item.time} />
        )}
        inverted={false}
      />

      <View style={[styles.inputContainer, { backgroundColor: theme.colors.surface, borderTopColor: theme.colors.border }]}>
        <IconButton icon={<Paperclip size={20} color={theme.colors.textMuted} />} />
        <View style={[styles.inputWrapper, { backgroundColor: theme.colors.surfaceSecondary }]}>
          <RNTextInput
            style={[styles.input, { color: theme.colors.textPrimary }]}
            placeholder="Type a message..."
            placeholderTextColor={theme.colors.textMuted}
            value={text}
            onChangeText={setText}
            multiline
          />
        </View>
        <IconButton
          icon={<Send size={20} color={text.trim() ? theme.colors.primary : theme.colors.textMuted} />}
          disabled={!text.trim()}
          onPress={handleSend}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingTop: 60, paddingBottom: 16, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1 },
  headerTitle: { flex: 1, flexDirection: 'row', alignItems: 'center', marginHorizontal: 12 },
  name: { marginLeft: 12, flexShrink: 1 },
  listContent: { padding: 16, paddingBottom: 32 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', padding: 12, borderTopWidth: 1 },
  inputWrapper: { flex: 1, minHeight: 44, maxHeight: 100, borderRadius: 22, paddingHorizontal: 16, paddingVertical: 10, marginHorizontal: 8 },
  input: { flex: 1, fontSize: 16 },
});
