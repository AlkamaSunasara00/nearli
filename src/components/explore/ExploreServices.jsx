import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Search, Mic, Map, Navigation, MessageSquare, BadgeCheck, Star } from 'lucide-react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { Typography } from '../ui/Typography';
import { mockGarages } from '../../data/mockGarages';
import { SwitchViewButton } from './SwitchViewButton';

const COLORS = {
  anchor: '#0F3D3E',
  ctaBlue: '#3E8EF7',
  signalTeal: '#1FA7A0',
  success: '#22C55E',
  background: '#F3F6FA',
  surface: '#FFFFFF',
  mutedText: '#5A6672',
  primaryText: '#111827',
  border: '#E5E7EB',
};

const FILTERS = ['Nearby', 'Open Now', 'Available Now', 'Top Rated', 'Verified'];
const CATEGORIES = ['All', 'Oil Change', 'Battery', 'Engine', 'Brake', 'AC', 'Tyres', 'Electrical', 'More'];

export const ExploreServices = ({ onToggleMap, onSearchPress }) => {
  const insets = useSafeAreaInsets();
  const [activeFilter, setActiveFilter] = useState('Nearby');
  const [activeCategory, setActiveCategory] = useState('All');

  return (
    <Animated.View 
      entering={FadeIn.duration(300)} 
      exiting={FadeOut.duration(300)}
      style={styles.container}
    >
      {/* Dark Green Header */}
      <View style={{ backgroundColor: COLORS.anchor, paddingTop: insets.top + 16, paddingBottom: 16, borderBottomLeftRadius: 15, borderBottomRightRadius: 15 }}>
        <View style={styles.header}>
          <View>
            <Typography variant="h2" weight="bold" style={{ color: COLORS.surface }}>Explore Garages</Typography>
            <Typography variant="bodyMedium" style={{ color: 'rgba(255, 255, 255, 0.7)', marginTop: 4 }}>Find trusted garages around your area</Typography>
          </View>
          <SwitchViewButton 
            onPress={onToggleMap} 
            IconComponent={Map} 
            color={COLORS.surface} 
          />
        </View>

        {/* Fake Search Bar */}
        <TouchableOpacity style={styles.searchBar} onPress={onSearchPress} activeOpacity={0.9}>
          <Search size={20} color={COLORS.mutedText} />
          <Typography style={[styles.searchPlaceholder, { flex: 1, color: COLORS.mutedText, marginLeft: 12, fontSize: 13 }]}>
            Search garages, services or problems...
          </Typography>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100, paddingTop: 16 }}>
        {/* Quick Filters */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll} contentContainerStyle={{ paddingHorizontal: 20 }}>
          {FILTERS.map(filter => {
            const isActive = activeFilter === filter;
            return (
              <TouchableOpacity 
                key={filter} 
                style={[styles.chip, isActive ? styles.chipActive : styles.chipInactive]}
                onPress={() => setActiveFilter(filter)}
              >
                <Typography weight="medium" style={{ color: isActive ? '#FFF' : COLORS.primaryText, fontSize: 13 }}>
                  {filter}
                </Typography>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Categories */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll} contentContainerStyle={{ paddingHorizontal: 20 }}>
          {CATEGORIES.map(category => {
            const isActive = activeCategory === category;
            return (
              <TouchableOpacity 
                key={category} 
                style={[styles.catChip, isActive ? styles.catChipActive : styles.catChipInactive]}
                onPress={() => setActiveCategory(category)}
              >
                <Typography weight="bold" style={{ color: isActive ? COLORS.ctaBlue : COLORS.mutedText, fontSize: 14 }}>
                  {category}
                </Typography>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Garage List */}
        <View style={styles.listContainer}>
          {mockGarages.map(garage => (
            <View key={garage.id} style={styles.card}>
              <Image source={{ uri: garage.photo }} style={styles.cardImage} />
              <View style={styles.cardContent}>
                <View style={styles.cardHeader}>
                  <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <Typography variant="h3" weight="bold" style={{ color: COLORS.anchor }} numberOfLines={1}>{garage.name}</Typography>
                    {garage.verified && <BadgeCheck size={16} color={COLORS.ctaBlue} style={{ marginLeft: 4 }} />}
                  </View>
                </View>

                <View style={styles.statsRow}>
                  <Star size={14} color="#F59E0B" fill="#F59E0B" />
                  <Typography weight="medium" style={{ fontSize: 13, color: COLORS.primaryText, marginLeft: 4 }}>
                    {garage.rating} ({garage.reviews})
                  </Typography>
                  <Typography style={{ fontSize: 13, color: COLORS.mutedText, marginLeft: 8 }}>• {garage.distance}</Typography>
                </View>

                <View style={styles.statusRow}>
                  <Typography weight="bold" style={{ fontSize: 12, color: COLORS.success }}>Open</Typography>
                  <Typography style={{ fontSize: 12, color: COLORS.mutedText }}> • Closes {garage.hours.close}</Typography>
                </View>

                <View style={styles.servicesRow}>
                  {garage.services.slice(0, 3).map((svc, i) => (
                    <View key={i} style={styles.serviceTag}>
                      <Typography style={{ fontSize: 11, color: COLORS.primaryText }}>{svc}</Typography>
                    </View>
                  ))}
                  {garage.services.length > 3 && (
                    <View style={styles.serviceTag}>
                      <Typography style={{ fontSize: 11, color: COLORS.primaryText }}>+{garage.services.length - 3}</Typography>
                    </View>
                  )}
                </View>

                <View style={styles.cardActions}>
                  <TouchableOpacity style={styles.actionBtnOutline}>
                    <MessageSquare size={16} color={COLORS.signalTeal} />
                    <Typography weight="bold" style={{ fontSize: 13, color: COLORS.signalTeal, marginLeft: 6 }}>Message</Typography>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionBtnSolid}>
                    <Navigation size={16} color="#FFF" />
                    <Typography weight="bold" style={{ fontSize: 13, color: '#FFF', marginLeft: 6 }}>Directions</Typography>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
          
          <TouchableOpacity style={styles.viewMoreBtn}>
            <Typography weight="bold" style={{ color: COLORS.ctaBlue, fontSize: 16 }}>View More Garages</Typography>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    marginHorizontal: 20,
    paddingHorizontal: 16,
    height: 48,
    borderRadius: 16,
  },
  filterScroll: {
    marginBottom: 16,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 12,
  },
  chipActive: {
    backgroundColor: COLORS.signalTeal,
  },
  chipInactive: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  categoryScroll: {
    marginBottom: 24,
  },
  catChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 16,
    borderBottomWidth: 2,
  },
  catChipActive: {
    borderBottomColor: COLORS.ctaBlue,
  },
  catChipInactive: {
    borderBottomColor: 'transparent',
  },
  listContainer: {
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 4,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 200,
  },
  cardContent: {
    padding: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  servicesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  serviceTag: {
    backgroundColor: COLORS.background,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionBtnOutline: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.signalTeal,
    borderRadius: 12,
    paddingVertical: 12,
    marginRight: 8,
  },
  actionBtnSolid: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.signalTeal,
    borderRadius: 12,
    paddingVertical: 12,
  },
  viewMoreBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.ctaBlue,
    marginBottom: 40,
  }
});
