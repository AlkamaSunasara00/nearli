import { useRouter } from 'expo-router';
import {
  Activity,
  Battery,
  Bell,
  ChevronDown,
  Circle,
  Disc,
  Droplet,
  MapPin,
  MoreHorizontal,
  Search,
  SlidersHorizontal,
  Wind, Wrench,
  Zap
} from 'lucide-react-native';
import { Dimensions, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { ProviderCard } from '../../src/components/cards/ProviderCard';
import { SmallProviderCard } from '../../src/components/cards/SmallProviderCard';
import { Avatar } from '../../src/components/ui/Avatar';
import { PromoBanner } from '../../src/components/ui/PromoBanner';
import { Typography } from '../../src/components/ui/Typography';
import { mockGarages } from '../../src/data/mockGarages';
import { useAppTheme } from '../../src/hooks/useAppTheme';

const { width } = Dimensions.get('window');

const ServiceIconMap = {
  'circle-dot': Circle,
  'battery': Battery,
  'droplet': Droplet,
  'activity': Activity,
  'disc': Disc,
  'zap': Zap,
  'wind': Wind,
  'tool': Wrench,
  'more': MoreHorizontal
};

const homeServices = [
  { id: '1', name: 'Puncture', icon: 'circle-dot' },
  { id: '2', name: 'Battery', icon: 'battery' },
  { id: '3', name: 'Oil Change', icon: 'droplet' },
  { id: '4', name: 'Engine', icon: 'activity' },
  { id: '5', name: 'Brakes', icon: 'disc' },
  { id: '6', name: 'Electrical', icon: 'zap' },
  { id: '7', name: 'AC Repair', icon: 'wind' },
  { id: '8', name: 'General', icon: 'tool' },
  { id: '9', name: 'More', icon: 'more' },
];

export default function HomeScreen() {
  const { theme } = useAppTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleGaragePress = (id) => {
    router.push(`/garage/${id}`);
  };

  const ServiceChip = ({ service, index }) => {
    const IconComponent = ServiceIconMap[service.icon] || Wrench;

    return (
      <Animated.View entering={FadeInUp.duration(400).delay(100 + (index * 50))} style={styles.serviceItem}>
        <TouchableOpacity activeOpacity={0.7} style={{ alignItems: 'center' }}>
          <View style={[styles.serviceIconCircle, { borderColor: theme.colors.borderLight }]}>
            <IconComponent size={24} color={theme.colors.primary} />
          </View>
          <Typography variant="caption" weight="medium" color="textPrimary" style={styles.serviceLabel} numberOfLines={1}>
            {service.name}
          </Typography>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View style={[styles.flex1, { backgroundColor: theme.colors.background }]}>
      
      {/* FIXED STICKY GREEN HEADER */}
      <View style={[styles.fixedHeader, { paddingTop: insets.top, backgroundColor: theme.colors.brandDark }]}>
        
        {/* Top Row: Greeting & Avatar */}
        <Animated.View entering={FadeInDown.duration(600)} style={styles.headerRow}>
          <View style={styles.headerLeft}>
            <Typography variant="bodyMedium" style={{ color: '#E2E8F0', marginBottom: 2 }}>Good Morning 👋</Typography>
            <Typography variant="h2" weight="bold" style={{ color: '#FFF' }}>Akama</Typography>
            <TouchableOpacity style={styles.locationRow}>
              <MapPin size={14} color="#FFF" />
              <Typography variant="caption" weight="medium" style={{ color: '#E2E8F0', marginHorizontal: 6 }}>
                Ahmedabad, Gujarat
              </Typography>
              <ChevronDown size={14} color="#E2E8F0" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.headerRight}>
            <TouchableOpacity onPress={() => router.push('/(customer)/profile')} style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={styles.bellIcon}>
                <Bell size={24} color="#FFF" />
                <View style={[styles.notificationDot, { borderColor: theme.colors.brandDark }]} />
              </View>
              <Avatar name="Akama" size={44} />
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Search Bar inside Green Header */}
        <Animated.View entering={FadeInDown.duration(600).delay(100)} style={styles.searchContainer}>
          <TouchableOpacity 
            style={[styles.searchBar, { backgroundColor: '#FFFFFF', ...theme.shadows.md }]} 
            onPress={() => router.push('/(customer)/explore')}
            activeOpacity={0.9}
          >
            <Search size={20} color={theme.colors.textMuted} />
            <Typography variant="bodyMedium" style={[styles.searchInput, { color: theme.colors.textPrimary }]}>
              Search garages, services, brands or problems...
            </Typography>
            <View style={styles.filterIcon}>
              <SlidersHorizontal size={18} color={theme.colors.textSecondary} />
            </View>
          </TouchableOpacity>
        </Animated.View>

      </View>

      {/* SCROLLING CONTENT */}
      <ScrollView 
        style={styles.container}
        contentContainerStyle={[styles.scrollContent, { paddingTop: 210 + insets.top }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Promotional Banner */}
        <View style={styles.section}>
           <PromoBanner 
             title="Need Emergency Roadside Help?"
             description="Find garages available near you instantly."
             buttonText="Find Nearby"
             delay={300}
             onPress={() => router.push('/(customer)/explore')}
           />
        </View>

        {/* Quick Services Grid */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Typography variant="title" weight="bold" color="textPrimary">Quick Services</Typography>
            <TouchableOpacity><Typography variant="bodyMedium" color="primary" weight="bold">See All</Typography></TouchableOpacity>
          </View>
          <View style={styles.servicesGrid}>
            {homeServices.map((service, index) => (
              <ServiceChip key={service.id} service={service} index={index} />
            ))}
          </View>
        </View>

        {/* Available Near You (Large Vertical Cards) */}
        <Animated.View entering={FadeInUp.duration(600).delay(400)} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Typography variant="title" weight="bold" color="textPrimary">Available Near You</Typography>
            <TouchableOpacity onPress={() => router.push('/(customer)/explore')}>
              <Typography variant="bodyMedium" color="primary" weight="bold">See All</Typography>
            </TouchableOpacity>
          </View>
          
          {mockGarages.slice(0, 1).map(garage => (
            <ProviderCard
              key={garage.id}
              garage={garage}
              onPress={() => handleGaragePress(garage.id)}
              onMessage={() => router.push(`/chat/${garage.id}`)}
            />
          ))}
        </Animated.View>

        {/* Top Rated Garages (Horizontal Small Cards) */}
        <Animated.View entering={FadeInUp.duration(600).delay(500)} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Typography variant="title" weight="bold" color="textPrimary">Top Rated Garages</Typography>
            <TouchableOpacity><Typography variant="bodyMedium" color="primary" weight="bold">See All</Typography></TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} snapToInterval={156} decelerationRate="fast" style={styles.horizontalScroll}>
            {mockGarages.sort((a, b) => b.rating - a.rating).slice(0, 5).map((garage, index) => (
              <SmallProviderCard
                key={garage.id}
                garage={garage}
                onPress={() => handleGaragePress(garage.id)}
                style={{ marginRight: 16 }}
              />
            ))}
          </ScrollView>
        </Animated.View>

        {/* Open Now (Horizontal Small Cards) */}
        <Animated.View entering={FadeInUp.duration(600).delay(600)} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Typography variant="title" weight="bold" color="textPrimary">Open Now</Typography>
            <TouchableOpacity><Typography variant="bodyMedium" color="primary" weight="bold">See All</Typography></TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} snapToInterval={156} decelerationRate="fast" style={styles.horizontalScroll}>
            {mockGarages.filter(g => g.availability !== 'unavailable').slice(0, 5).map((garage, index) => (
              <SmallProviderCard
                key={garage.id}
                garage={garage}
                onPress={() => handleGaragePress(garage.id)}
                style={{ marginRight: 16 }}
              />
            ))}
          </ScrollView>
        </Animated.View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  fixedHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    paddingBottom: 24,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
  },
  headerLeft: {
    flex: 1,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bellIcon: {
    marginRight: 16,
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#EF4444',
    borderWidth: 2,
    borderColor: '#0F3D3E', // match brandDark
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 100,
  },
  searchContainer: {
    marginHorizontal: 20,
    
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    borderRadius: 28,
    paddingHorizontal: 20,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
  },
  filterIcon: {
    marginLeft: 8,
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginHorizontal: -8,
  },
  serviceItem: {
    width: '20%', // 5 columns exactly
    alignItems: 'center',
    marginBottom: 20,
  },
  serviceIconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    backgroundColor: '#F8FAFC',
  },
  serviceLabel: {
    textAlign: 'center',
    fontSize: 11,
  },
  horizontalScroll: {
    overflow: 'visible',
  }
});
