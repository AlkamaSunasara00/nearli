import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useAppTheme } from '../../hooks/useAppTheme';
import { Typography } from '../ui/Typography';

export const ChatBubble = ({ message, isOwn, time }) => {
  const { theme } = useAppTheme();

  return (
    <View
      style={[
        styles.container,
        isOwn ? styles.ownContainer : styles.otherContainer,
      ]}
    >
      <View
        style={[
          styles.bubble,
          {
            backgroundColor: isOwn ? theme.colors.primary : theme.colors.surface,
            borderBottomRightRadius: isOwn ? 4 : theme.radius.large,
            borderBottomLeftRadius: isOwn ? theme.radius.large : 4,
            borderTopLeftRadius: theme.radius.large,
            borderTopRightRadius: theme.radius.large,
            ...(isOwn ? {} : { borderColor: theme.colors.border, borderWidth: 1 }),
          },
        ]}
      >
        <Typography
          variant="bodyMedium"
          color={isOwn ? 'surface' : 'textPrimary'}
        >
          {message}
        </Typography>
      </View>
      <Typography variant="caption" color="textMuted" style={styles.time}>
        {time}
      </Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    maxWidth: '80%',
  },
  ownContainer: {
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
  },
  otherContainer: {
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
  },
  bubble: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  time: {
    marginTop: 4,
    marginHorizontal: 4,
  },
});
