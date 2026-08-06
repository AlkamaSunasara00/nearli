import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Dimensions, ScrollView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Search, Mic, List, Navigation, MessageSquare, BadgeCheck, Star, Crosshair, ChevronDown, ChevronUp } from 'lucide-react-native';
import Animated, { FadeIn, FadeOut, SlideInDown, SlideOutDown, Layout } from 'react-native-reanimated';
import { Typography } from '../ui/Typography';
import { mockGarages } from '../../data/mockGarages';
import { SwitchViewButton } from './SwitchViewButton';

const { width } = Dimensions.get('window');

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

export const ExploreMap = ({ onToggleList, onSearchPress }) => {
  const insets = useSafeAreaInsets();
  const [activeFilter, setActiveFilter] = useState('Nearby');
  const [selectedGarage, setSelectedGarage] = useState(null);
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);

  // Default region (Ahmedabad approx)
  const initialRegion = {
    latitude: 23.0225,
    longitude: 72.5714,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  };

  return (
    <Animated.View 
      entering={FadeIn.duration(300)} 
      exiting={FadeOut.duration(300)}
      style={styles.container}
    >
      <MapView 
        style={StyleSheet.absoluteFillObject}
        initialRegion={initialRegion}
        showsUserLocation
        showsMyLocationButton={false}
      >
        {mockGarages.map(garage => {
          const isSelected = selectedGarage?.id === garage.id;
          return (
            <Marker
              key={garage.id}
              coordinate={{ latitude: garage.coordinates.lat, longitude: garage.coordinates.lng }}
              onPress={() => setSelectedGarage(garage)}
              style={{ zIndex: isSelected ? 10 : 1 }}
            >
              <View style={[styles.marker, isSelected && styles.markerSelected]}>
                <View style={[styles.markerIconWrap, isSelected && { backgroundColor: COLORS.ctaBlue }]}>
                  <Typography weight="bold" style={{ color: isSelected ? '#FFF' : COLORS.anchor, fontSize: 13 }}>
                    {garage.rating}
                  </Typography>
                </View>
                <View style={[styles.markerPointer, isSelected && { borderTopColor: COLORS.ctaBlue }]} />
              </View>
            </Marker>
          );
        })}
      </MapView>

      {/* Header Overlay */}
      <Animated.View layout={Layout.duration(200)} style={[styles.headerOverlay, { paddingTop: insets.top + 16, backgroundColor: COLORS.anchor, paddingBottom: 16, borderBottomLeftRadius: 15, borderBottomRightRadius: 15 }]} pointerEvents="box-none">
        <View style={styles.header}>
          <Typography variant="h2" weight="bold" style={{ color: COLORS.surface }}>Explore Map</Typography>
          <SwitchViewButton 
            onPress={onToggleList} 
            IconComponent={List} 
            color={COLORS.surface} 
          />
        </View>

        <View style={styles.searchRow}>
          <TouchableOpacity style={[styles.searchBar, { flex: 1, marginBottom: 0, marginRight: 12 }]} onPress={onSearchPress} activeOpacity={0.9}>
            <Search size={20} color={COLORS.mutedText} />
            <Typography style={[styles.searchPlaceholder, { flex: 1, color: COLORS.mutedText, marginLeft: 12, fontSize: 13 }]}>
              Search garages, services or problems...
            </Typography>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterToggleBtn} onPress={() => setIsFiltersVisible(!isFiltersVisible)}>
            {isFiltersVisible ? (
              <ChevronUp size={24} color={COLORS.anchor} />
            ) : (
              <ChevronDown size={24} color={COLORS.anchor} />
            )}
          </TouchableOpacity>
        </View>

        {isFiltersVisible && (
          <Animated.View entering={FadeIn.duration(200)} exiting={FadeOut.duration(200)} layout={Layout.duration(200)}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll} contentContainerStyle={{ paddingHorizontal: 20 }}>
              {FILTERS.map(filter => {
                const isActive = activeFilter === filter;
                return (
                  <TouchableOpacity 
                    key={filter} 
                    style={[styles.chip, isActive ? styles.chipActive : styles.chipInactive]}
                    onPress={() => setActiveFilter(filter)}
                  >
                    <Typography weight="medium" style={{ color: isActive ? '#FFF' : COLORS.primaryText, fontSize: 12 }}>
                      {filter}
                    </Typography>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </Animated.View>
        )}
      </Animated.View>

      {/* Floating Buttons */}
      <View style={[styles.floatingControls, { bottom: selectedGarage ? 260 : 120 }]} pointerEvents="box-none">
        <TouchableOpacity style={styles.searchAreaBtn}>
          <Typography weight="bold" style={{ color: COLORS.ctaBlue, fontSize: 14 }}>Search This Area</Typography>
        </TouchableOpacity>
        <TouchableOpacity style={styles.locationBtn}>
          <Crosshair size={24} color={COLORS.anchor} />
        </TouchableOpacity>
      </View>

      {/* Bottom Selected Garage Card */}
      {selectedGarage && (
        <Animated.View 
          entering={SlideInDown.duration(300)}
          exiting={SlideOutDown.duration(300)}
          style={[styles.bottomCardContainer, { paddingBottom: insets.bottom + 100 }]} // Tab bar offset
        >
          <View style={styles.bottomCard}>
            <View style={styles.dragHandle} />
            <View style={{ flexDirection: 'row', marginTop: 8 }}>
              <Image source={{ uri: selectedGarage.photo }} style={styles.bottomCardImage} />
              <View style={styles.bottomCardContent}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Typography variant="h3" weight="bold" style={{ color: COLORS.anchor, flex: 1 }} numberOfLines={1}>
                    {selectedGarage.name}
                  </Typography>
                  {selectedGarage.verified && <BadgeCheck size={16} color={COLORS.ctaBlue} style={{ marginLeft: 4 }} />}
                </View>

                <View style={styles.statsRow}>
                  <Star size={14} color="#F59E0B" fill="#F59E0B" />
                  <Typography weight="medium" style={{ fontSize: 13, color: COLORS.primaryText, marginLeft: 4 }}>
                    {selectedGarage.rating} ({selectedGarage.reviews})
                  </Typography>
                  <Typography style={{ fontSize: 13, color: COLORS.mutedText, marginLeft: 8 }}>• {selectedGarage.distance}</Typography>
                </View>

                <View style={styles.statusRow}>
                  <Typography weight="bold" style={{ fontSize: 12, color: COLORS.success }}>Open</Typography>
                  <Typography style={{ fontSize: 12, color: COLORS.mutedText }}> • Closes {selectedGarage.hours.close}</Typography>
                </View>

                <View style={styles.servicesRow}>
                  {selectedGarage.services.slice(0, 3).map((svc, i) => (
                    <View key={i} style={styles.serviceTag}>
                      <Typography style={{ fontSize: 10, color: COLORS.primaryText }}>{svc}</Typography>
                    </View>
                  ))}
                  {selectedGarage.services.length > 3 && (
                    <View style={styles.serviceTag}>
                      <Typography style={{ fontSize: 10, color: COLORS.primaryText }}>+{selectedGarage.services.length - 3}</Typography>
                    </View>
                  )}
                </View>
                
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 4 }}>
                  <TouchableOpacity style={styles.actionBtnOutline}>
                    <MessageSquare size={14} color={COLORS.signalTeal} />
                    <Typography weight="bold" style={{ fontSize: 12, color: COLORS.signalTeal, marginLeft: 6 }}>Message</Typography>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionBtnSolid}>
                    <Navigation size={14} color="#FFF" />
                    <Typography weight="bold" style={{ fontSize: 12, color: '#FFF', marginLeft: 6 }}>Directions</Typography>
                  </TouchableOpacity>
                </View>

              </View>
            </View>
          </View>
        </Animated.View>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  headerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    paddingHorizontal: 16,
    height: 48,
    borderRadius: 16,
  },
  filterToggleBtn: {
    width: 48,
    height: 48,
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterScroll: {
    marginBottom: 16,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
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
  marker: {
    alignItems: 'center',
  },
  markerIconWrap: {
    backgroundColor: '#FFF',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  markerPointer: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#FFF',
  },
  markerSelected: {
    transform: [{ scale: 1.15 }],
  },
  floatingControls: {
    position: 'absolute',
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  searchAreaBtn: {
    backgroundColor: '#FFF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  locationBtn: {
    position: 'absolute',
    right: 0,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  bottomCardContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 20,
  },
  bottomCard: {
    backgroundColor: COLORS.surface,
    marginHorizontal: 16,
    borderRadius: 24,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 10,
  },
  dragHandle: {
    width: 40,
    height: 4,
    backgroundColor: COLORS.border,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 8,
  },
  bottomCardImage: {
    width: 100,
    height: 120,
    borderRadius: 16,
  },
  bottomCardContent: {
    flex: 1,
    marginLeft: 16,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  servicesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  serviceTag: {
    backgroundColor: COLORS.background,
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 6,
    marginBottom: 6,
  },
  actionBtnOutline: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.signalTeal,
    borderRadius: 8,
    paddingVertical: 8,
    marginRight: 6,
  },
  actionBtnSolid: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.signalTeal,
    borderRadius: 8,
    paddingVertical: 8,
  },
});
