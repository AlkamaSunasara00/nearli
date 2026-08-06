import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Search, X } from 'lucide-react-native';
import { useAppTheme } from '../../hooks/useAppTheme';

export const SearchBar = ({
  value,
  onChangeText,
  onClear,
  placeholder = 'Search...',
  style,
  ...props
}) => {
  const { theme } = useAppTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.surfaceSecondary,
          borderRadius: theme.radius.pill,
          borderColor: theme.colors.border,
          borderWidth: 1,
        },
        style,
      ]}
    >
      <Search size={20} color={theme.colors.textMuted} style={styles.icon} />
      
      <TextInput
        style={[
          styles.input,
          {
            color: theme.colors.textPrimary,
            fontSize: theme.typography.sizes.body,
          },
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.textMuted}
        returnKeyType="search"
        {...props}
      />
      
      {value ? (
        <TouchableOpacity onPress={onClear} style={styles.clearIcon}>
          <X size={18} color={theme.colors.textMuted} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
    paddingHorizontal: 12,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: '100%',
  },
  clearIcon: {
    padding: 4,
  },
});
