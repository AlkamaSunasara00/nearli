import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useAppTheme } from '../../hooks/useAppTheme';
import { Typography } from '../ui/Typography';
import Animated, { FadeInUp } from 'react-native-reanimated';

export const PromoBanner = ({ title, description, buttonText, onPress, delay = 0 }) => {
  const { theme } = useAppTheme();

  return (
    <Animated.View 
      entering={FadeInUp.duration(600).delay(delay)}
      style={[
        styles.container, 
        { 
          backgroundColor: '#F8FAFC',
          borderRadius: 24,
          ...theme.shadows.sm
        }
      ]}
    >
      <View style={styles.content}>
        <Typography variant="body" weight="bold" color="textPrimary" style={styles.title}>
          {title}
        </Typography>
        <Typography variant="caption" color="textSecondary" style={styles.description}>
          {description}
        </Typography>
        <TouchableOpacity style={[styles.button, { backgroundColor: theme.colors.primary }]} onPress={onPress}>
          <Typography variant="caption" weight="bold" style={{ color: '#FFF' }}>
            {buttonText}
          </Typography>
        </TouchableOpacity>
      </View>
      
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1625626248982-f542a1fc8a3b?q=80&w=400&auto=format&fit=crop' }} 
          style={styles.image}
        />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    overflow: 'hidden',
  },
  content: {
    flex: 1,
    padding: 20,
    paddingRight: 10,
  },
  title: {
    marginBottom: 6,
    lineHeight: 22,
  },
  description: {
    marginBottom: 16,
    lineHeight: 18,
  },
  button: {
    alignSelf: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
  },
  imageContainer: {
    width: 130,
    height: 140,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderTopRightRadius: 24,
    borderBottomRightRadius: 24,
  }
});
