import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TextInput, Keyboard, TouchableOpacity, Image, Dimensions, Modal } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { 
  Search, ArrowLeft, MapPin, X,
  Droplet, Battery, Activity, Disc, Zap, Wind, Circle, Wrench, Clock,
  MessageSquare, Navigation, Star, BadgeCheck, ArrowUpDown
} from 'lucide-react-native';
import Animated, { 
  FadeInUp, FadeIn, FadeOut, Easing 
} from 'react-native-reanimated';
import { useAppTheme } from '../../hooks/useAppTheme';
import { useAppContext } from '../../context/AppContext';
import { Typography } from './Typography';
import { Button } from './Button';
import { AnimatedPressable } from './AnimatedPressable';

const { width } = Dimensions.get('window');

// Offical Palette overrides for this specific screen
const COLORS = {
  background: '#F3F6FA',
  surface: '#FFFFFF',
  primaryText: '#1F2937',
  mutedText: '#5A6672',
  anchor: '#0F3D3E',
  ctaBlue: '#3E8EF7',
  signalTeal: '#1FA7A0',
  success: '#22C55E',
  border: '#E5E7EB',
};

const RECENT_SEARCHES = ['Oil Change', 'Battery', 'Honda Service', 'Brake Repair', 'Flat Tyre', 'Car AC Repair'];

const SERVICES = [
  { id: '1', name: 'Oil Change', icon: Droplet, color: '#FF7A00', bgColor: '#FFF2E5' },
  { id: '2', name: 'Battery', icon: Battery, color: COLORS.success, bgColor: '#E8F8EE' },
  { id: '3', name: 'AC Repair', icon: Wind, color: COLORS.ctaBlue, bgColor: '#EBF3FF' },
  { id: '4', name: 'Brakes', icon: Disc, color: '#E11D48', bgColor: '#FCE7ED' },
  { id: '5', name: 'Tyre Service', icon: Circle, color: COLORS.primaryText, bgColor: '#F3F4F6' },
  { id: '6', name: 'Engine Repair', icon: Activity, color: '#7C3AED', bgColor: '#F3E8FF' },
  { id: '7', name: 'Electrical', icon: Zap, color: '#D97706', bgColor: '#FEF3C7' },
  { id: '8', name: 'Puncture', icon: Circle, color: COLORS.signalTeal, bgColor: '#E5F6F5' },
  { id: '9', name: 'Denting', icon: Wrench, color: '#DB2777', bgColor: '#FCE7F3' }
];

const LOCATIONS = ['Maninagar', 'Nikol', 'Satellite', 'SG Highway', 'Bopal'];

export const SearchDiscoveryOverlay = ({ visible, onClose }) => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { garages } = useAppContext();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [showAllServices, setShowAllServices] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (visible) {
      setSearchQuery('');
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    } else {
      Keyboard.dismiss();
    }
  }, [visible]);

  const handleBack = () => {
    onClose();
  };

  const handleGaragePress = (id) => {
    onClose();
    router.push(`/garage/${id}`);
  };

  if (!visible) return null;

  return (
    <Modal visible={visible} animationType="slide" transparent={false} onRequestClose={onClose}>
      <StatusBar style="light" />
      <View style={[styles.absoluteContainer, { backgroundColor: COLORS.background }]}>
        <Animated.View 
          entering={FadeInUp.duration(300).easing(Easing.out(Easing.ease))}
          style={[styles.headerContainer, { paddingTop: 12, backgroundColor: COLORS.anchor }]}
        >
          <TouchableOpacity onPress={handleBack} style={styles.backBtn}>
            <ArrowLeft size={24} color={COLORS.surface} />
          </TouchableOpacity>
          
          <View style={[styles.searchBar, { backgroundColor: COLORS.surface }]}>
            <Search size={18} color={COLORS.mutedText} style={{ marginLeft: 8 }} />
            <TextInput
              ref={inputRef}
              style={[styles.input, { color: COLORS.primaryText }]}
              placeholder="Search garages, services, locations..."
              placeholderTextColor={COLORS.mutedText}
              value={searchQuery}
              onChangeText={setSearchQuery}
              returnKeyType="search"
            />
            
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.iconBtn}>
                <X size={18} color={COLORS.mutedText} />
              </TouchableOpacity>
            )}
          </View>
        </Animated.View>

      <ScrollView 
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 150 }]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
      >
        {searchQuery.length > 0 ? (
          <Animated.View entering={FadeIn.duration(200)} style={styles.suggestionsContainer}>
             <View style={styles.emptyStateContainer}>
                <View style={[styles.emptyStateIcon, { backgroundColor: COLORS.surface }]}>
                   <Search size={32} color={COLORS.mutedText} />
                </View>
                <Typography variant="h3" weight="bold" style={{ marginBottom: 8, marginTop: 16 }}>No Garages Found</Typography>
                <Typography variant="body" color="textSecondary" align="center" style={{ marginBottom: 24 }}>
                  Try searching another service, location or garage name.
                </Typography>
                <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.exploreBtn}>
                   <Typography weight="bold" color="surface">Explore Nearby</Typography>
                </TouchableOpacity>
             </View>
          </Animated.View>
        ) : (
          <Animated.View entering={FadeIn.delay(200).duration(400)}>
            
            {/* RECENT SEARCHES */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Typography variant="title" weight="bold" style={{ color: COLORS.anchor }}>Recent Searches</Typography>
                <TouchableOpacity><Typography variant="bodyMedium" weight="medium" style={{ color: COLORS.signalTeal }}>Clear All</Typography></TouchableOpacity>
              </View>
              <View style={styles.chipsWrap}>
                {RECENT_SEARCHES.map((search, idx) => (
                  <AnimatedPressable 
                    key={idx} 
                    style={[styles.chip, { backgroundColor: COLORS.surface }]}
                    onPress={() => setSearchQuery(search)}
                  >
                    <Clock size={14} color={COLORS.mutedText} style={{ marginRight: 6 }} />
                    <Typography variant="caption" weight="medium" style={{ color: COLORS.primaryText }}>{search}</Typography>
                  </AnimatedPressable>
                ))}
              </View>
            </View>

            {/* WHAT DO YOU NEED? */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Typography variant="title" weight="bold" style={{ color: COLORS.anchor }}>What do you need?</Typography>
                {!showAllServices && (
                  <TouchableOpacity onPress={() => setShowAllServices(true)}>
                     <Typography variant="bodyMedium" weight="medium" style={{ color: COLORS.signalTeal }}>More</Typography>
                  </TouchableOpacity>
                )}
              </View>
              <View style={styles.servicesGrid}>
                {SERVICES.slice(0, showAllServices ? SERVICES.length : 6).map((service, idx) => {
                  const Icon = service.icon;
                  return (
                    <AnimatedPressable 
                      key={service.id} 
                      style={[styles.serviceCard, { backgroundColor: COLORS.surface }]}
                      onPress={() => setSearchQuery(service.name)}
                    >
                      <View style={[styles.serviceIconWrap, { backgroundColor: service.bgColor }]}>
                        <Icon size={24} color={service.color} strokeWidth={2} />
                      </View>
                      <Typography variant="caption" weight="medium" style={{ marginTop: 8, textAlign: 'center', fontSize: 11, color: COLORS.primaryText }}>
                        {service.name}
                      </Typography>
                    </AnimatedPressable>
                  );
                })}
              </View>
            </View>



            {/* TOP GARAGE SEARCHES */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Typography variant="title" weight="bold" style={{ color: COLORS.anchor }}>Top Garage Searches</Typography>
                <TouchableOpacity><Typography variant="bodyMedium" weight="medium" style={{ color: COLORS.signalTeal }}>See All</Typography></TouchableOpacity>
              </View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} snapToInterval={280} decelerationRate="fast" style={styles.horizontalScroll}>
                {garages.slice(0, 4).map((garage) => (
                  <AnimatedPressable
                    key={`top-${garage.id}`}
                    style={[styles.topGarageCard, { backgroundColor: COLORS.surface }]}
                    onPress={() => handleGaragePress(garage.id)}
                  >
                    <Image source={{ uri: garage.coverImage }} style={styles.topGarageImg} />
                    <View style={styles.topGarageContent}>
                      <Typography variant="bodyMedium" weight="bold" style={{ color: COLORS.primaryText }} numberOfLines={1}>{garage.name}</Typography>
                      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                        <Star size={12} color="#F59E0B" fill="#F59E0B" />
                        <Typography variant="caption" weight="medium" style={{ marginLeft: 4, color: COLORS.primaryText }}>{garage.rating}</Typography>
                        <Typography variant="caption" style={{ marginLeft: 4, color: COLORS.mutedText }}>({garage.reviews})</Typography>
                      </View>
                      <Typography variant="caption" style={{ marginTop: 8, color: COLORS.primaryText }} numberOfLines={2}>
                        {garage.services?.slice(0,3).join(' • ')}
                      </Typography>
                    </View>
                  </AnimatedPressable>
                ))}
              </ScrollView>
            </View>

            {/* RESULTS NEAR YOU */}
            <View style={[styles.section, { paddingHorizontal: 24 }]}>
              <View style={styles.sectionHeader}>
                <Typography variant="title" weight="bold" style={{ color: COLORS.anchor }}>Results Near You</Typography>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Typography variant="caption" weight="medium" style={{ color: COLORS.mutedText, marginRight: 4 }}>Sort</Typography>
                  <ArrowUpDown size={14} color={COLORS.mutedText} />
                </TouchableOpacity>
              </View>
              
              {garages.slice(0, 3).map((garage) => (
                <AnimatedPressable
                  key={`result-${garage.id}`}
                  style={[styles.resultCard, { backgroundColor: COLORS.surface }]}
                  onPress={() => handleGaragePress(garage.id)}
                >
                  <View style={{ flexDirection: 'row' }}>
                    <Image source={{ uri: garage.coverImage }} style={styles.resultImg} />
                    <View style={styles.resultContent}>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Typography variant="bodyMedium" weight="bold" style={{ color: COLORS.primaryText, flex: 1 }} numberOfLines={1}>{garage.name}</Typography>
                        <BadgeCheck size={16} color={COLORS.ctaBlue} fill={COLORS.ctaBlue} style={{ marginLeft: 4 }} />
                      </View>
                      
                      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                        <Star size={12} color="#F59E0B" fill="#F59E0B" />
                        <Typography variant="caption" weight="bold" style={{ marginLeft: 4, color: COLORS.primaryText }}>{garage.rating}</Typography>
                        <Typography variant="caption" style={{ marginLeft: 4, color: COLORS.mutedText }}>({garage.reviews})</Typography>
                        <Typography variant="caption" style={{ marginLeft: 8, color: COLORS.mutedText }}>• 0.8 km</Typography>
                      </View>
                      
                      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
                        <View style={[styles.badgeOpen, { backgroundColor: COLORS.success + '1A' }]}>
                          <Typography variant="caption" weight="bold" style={{ color: COLORS.success, fontSize: 10 }}>Available Now</Typography>
                        </View>
                        <Typography variant="caption" style={{ marginLeft: 8, color: COLORS.mutedText, fontSize: 10 }}>Open until 8:00 PM</Typography>
                      </View>

                      <Typography variant="caption" style={{ marginTop: 8, color: COLORS.primaryText, fontSize: 11 }} numberOfLines={1}>
                        {garage.services?.slice(0,3).join(' • ')}
                      </Typography>
                      
                      <Typography variant="caption" weight="bold" style={{ marginTop: 4, color: COLORS.primaryText, fontSize: 11 }}>
                        Car • Bike • Both
                      </Typography>
                    </View>
                  </View>
                  
                  {/* Quick Actions */}
                  <View style={styles.quickActions}>
                    <TouchableOpacity style={[styles.actionCircle, { borderColor: COLORS.border }]} onPress={() => {}}>
                       <MessageSquare size={14} color={COLORS.signalTeal} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.actionCircle, { borderColor: COLORS.border, marginLeft: 8 }]} onPress={() => {}}>
                       <Navigation size={14} color={COLORS.signalTeal} />
                    </TouchableOpacity>
                  </View>
                </AnimatedPressable>
              ))}
            </View>

          </Animated.View>
        )}
      </ScrollView>

    </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  absoluteContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 999,
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingBottom: 16,
    zIndex: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backBtn: {
    paddingRight: 16,
    paddingVertical: 8,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    borderRadius: 12,
    paddingHorizontal: 8,
  },
  iconBtn: {
    padding: 10,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 13,
    paddingHorizontal: 4,
  },
  divider: {
    width: 1,
    height: 24,
    marginHorizontal: 4,
  },
  scrollContent: {
    paddingTop: 16,
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  horizontalScroll: {
    paddingHorizontal: 24,
    overflow: 'visible',
  },
  chipsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 24,
    gap: 12,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 24,
    justifyContent: 'flex-start',
    gap: 12,
  },
  serviceCard: {
    width: (width - 48 - 24) / 3, // 3 columns with 12px gap
    padding: 12,
    borderRadius: 16,
    marginBottom: 4,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  serviceIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 1,
  },
  topGarageCard: {
    flexDirection: 'row',
    width: 280,
    marginRight: 16,
    borderRadius: 20,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  topGarageImg: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
  topGarageContent: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  resultCard: {
    borderRadius: 16,
    marginBottom: 16,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
    position: 'relative',
  },
  resultImg: {
    width: 80,
    height: 90,
    borderRadius: 12,
  },
  resultContent: {
    flex: 1,
    marginLeft: 12,
  },
  badgeOpen: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  quickActions: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingTop: 10,
  },
  actionCircle: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    backgroundColor: '#FFF',
  },
  emptyStateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 64,
    paddingHorizontal: 32,
  },
  emptyStateIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  exploreBtn: {
    backgroundColor: COLORS.anchor,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  }
});
