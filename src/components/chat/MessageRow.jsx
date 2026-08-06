import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { useAppTheme } from '../../hooks/useAppTheme';
import { Avatar } from '../ui/Avatar';
import { Typography } from '../ui/Typography';
import { StatusBadge } from '../ui/StatusBadge';

export const MessageRow = ({
  conversation,
  onPress,
}) => {
  const { theme } = useAppTheme();

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.surface,
          borderBottomColor: theme.colors.border,
          borderBottomWidth: 1,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.avatarContainer}>
        <Avatar src={conversation.photo} name={conversation.name} size={52} />
        {conversation.availability && (
          <View style={[styles.statusDot, { backgroundColor: theme.colors.surface }]}>
            <View
              style={[
                styles.dotInner,
                {
                  backgroundColor:
                    conversation.availability === 'available'
                      ? theme.colors.success
                      : conversation.availability === 'busy'
                      ? theme.colors.warning
                      : theme.colors.danger,
                },
              ]}
            />
          </View>
        )}
      </View>

      <View style={styles.content}>
        <View style={styles.headerRow}>
          <Typography
            variant="body"
            weight={conversation.unread > 0 ? 'bold' : 'medium'}
            style={styles.name}
            numberOfLines={1}
          >
            {conversation.name}
          </Typography>
          <Typography
            variant="caption"
            color={conversation.unread > 0 ? 'primary' : 'textMuted'}
          >
            {conversation.time}
          </Typography>
        </View>

        <View style={styles.messageRow}>
          <Typography
            variant="bodyMedium"
            color={conversation.unread > 0 ? 'textPrimary' : 'textSecondary'}
            weight={conversation.unread > 0 ? 'medium' : 'regular'}
            style={styles.messageText}
            numberOfLines={1}
          >
            {conversation.lastMessage}
          </Typography>

          {conversation.unread > 0 && (
            <View
              style={[
                styles.unreadBadge,
                { backgroundColor: theme.colors.primary, borderRadius: theme.radius.pill },
              ]}
            >
              <Typography variant="caption" weight="bold" color="surface">
                {conversation.unread}
              </Typography>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  statusDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 14,
    height: 14,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  content: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    flex: 1,
    marginRight: 8,
  },
  messageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  messageText: {
    flex: 1,
    marginRight: 8,
  },
  unreadBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    minWidth: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
