import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import * as Location from 'expo-location';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ArrowLeft, Check, CheckCircle2, ChevronRight, Circle, Map, Upload } from 'lucide-react-native';
import { useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import Svg, { Circle as SvgCircle } from 'react-native-svg';
import { Button } from '../../src/components/ui/Button';
import { TextInput } from '../../src/components/ui/TextInput';
import { Typography } from '../../src/components/ui/Typography';
import { useAppTheme } from '../../src/hooks/useAppTheme';
import { useAuth } from '../../src/hooks/useAuth';

// Utility for Time Picker
const generateTimeSlots = () => {
  const times = [];
  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m += 30) {
      const isPM = h >= 12;
      const hour = h % 12 === 0 ? 12 : h % 12;
      const min = m === 0 ? '00' : '30';
      const ampm = isPM ? 'PM' : 'AM';
      times.push(`${hour.toString().padStart(2, '0')}:${min} ${ampm}`);
    }
  }
  return times;
};
const TIME_SLOTS = generateTimeSlots();

const TIME_GROUPS = {
  Morning: TIME_SLOTS.filter(t => {
     const isAM = t.includes('AM');
     const h = parseInt(t.split(':')[0], 10);
     return isAM && (h >= 5 && h !== 12);
  }),
  Afternoon: TIME_SLOTS.filter(t => {
     const isPM = t.includes('PM');
     const h = parseInt(t.split(':')[0], 10);
     return isPM && (h === 12 || (h >= 1 && h < 5));
  }),
  Evening: TIME_SLOTS.filter(t => {
     const isPM = t.includes('PM');
     const isAM = t.includes('AM');
     const h = parseInt(t.split(':')[0], 10);
     if(isPM && (h >= 5 && h !== 12)) return true;
     if(isAM && (h === 12 || h < 5)) return true;
     return false;
  })
};

export default function ProviderSetupWizard() {
  const { theme } = useAppTheme();
  const router = useRouter();
  const { phone } = useLocalSearchParams();
  const { login } = useAuth();
  const insets = useSafeAreaInsets();

  const [step, setStep] = useState(1);
  const totalSteps = 7;
  const [loading, setLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    businessName: '',
    ownerName: '',
    phone: phone || '+91 9876543210',
    whatsapp: '',
    email: '',
    description: '',
    category: '', // Garage, Electrician, Plumber
    services: [], // Garage: vehicles/brands, Electrician: types
    address: '',
    city: '',
    pincode: '',
    locationText: '',
    openTime: '09:00 AM',
    closeTime: '06:00 PM',
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    photos: {
      logo: null,
      cover: null,
      gallery1: null,
      gallery2: null,
    },
  });

  const [timePickerVisible, setTimePickerVisible] = useState(false);
  const [timePickerTarget, setTimePickerTarget] = useState('openTime'); // 'openTime' or 'closeTime'
  const [timeCategory, setTimeCategory] = useState('Morning');

  const pickImage = async (type) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: type === 'cover' ? [16, 9] : [1, 1],
      quality: 0.8,
    });
    if (!result.canceled) {
      setFormData({
        ...formData,
        photos: { ...formData.photos, [type]: result.assets[0].uri }
      });
    }
  };

  const getLocation = async () => {
    setLoading(true);
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access location was denied');
      setLoading(false);
      return;
    }
    try {
      let location = await Location.getCurrentPositionAsync({});
      let geocode = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      });
      if (geocode && geocode.length > 0) {
        setFormData({
          ...formData,
          locationText: `${geocode[0].city || geocode[0].region}, ${geocode[0].country}`,
          city: geocode[0].city || formData.city,
          pincode: geocode[0].postalCode || formData.pincode,
        });
      } else {
        setFormData({ ...formData, locationText: 'Location found' });
      }
    } catch (e) {
      alert('Error fetching location');
    }
    setLoading(false);
  };

  const handleNext = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
    else router.back();
  };

  const handleSubmit = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      login('PROVIDER');
      router.replace('/(provider)/dashboard');
    }, 1500);
  };

  const renderStep1 = () => (
    <Animated.View entering={FadeInRight} exiting={FadeOutLeft} style={styles.stepContainer}>
      <Typography variant="h3" weight="bold" style={styles.stepTitle}>Basic Information</Typography>
      <TextInput label="Verified Phone Number" value={formData.phone} editable={false} containerStyle={{ opacity: 0.6 }} />
      <TextInput label="Business Name *" placeholder="e.g. Acme Auto" value={formData.businessName} onChangeText={t => setFormData({ ...formData, businessName: t })} />
      <TextInput label="Owner Name *" placeholder="e.g. John Doe" value={formData.ownerName} onChangeText={t => setFormData({ ...formData, ownerName: t })} />
      <TextInput label="WhatsApp" placeholder="e.g. +91 9999999999" value={formData.whatsapp} onChangeText={t => setFormData({ ...formData, whatsapp: t })} keyboardType="phone-pad" />
      <TextInput label="Email" placeholder="business@example.com" value={formData.email} onChangeText={t => setFormData({ ...formData, email: t })} keyboardType="email-address" autoCapitalize="none" />
      <TextInput label="Business Description" placeholder="Describe your services" value={formData.description} onChangeText={t => setFormData({ ...formData, description: t })} multiline />
    </Animated.View>
  );

  const renderStep2 = () => {
    const categories = ['Garage', 'Electrician', 'Plumber'];
    return (
      <Animated.View entering={FadeInRight} exiting={FadeOutLeft} style={styles.stepContainer}>
        <Typography variant="h3" weight="bold" style={styles.stepTitle}>Select Category</Typography>
        <Typography variant="bodyMedium" color="textSecondary" style={{ marginBottom: 24 }}>Choose one category for your business.</Typography>

        {categories.map(cat => {
          const isSelected = formData.category === cat;
          return (
            <TouchableOpacity
              key={cat}
              style={[styles.categoryCard, {
                borderColor: isSelected ? theme.colors.primary : 'transparent',
                backgroundColor: isSelected ? (theme.colors.primarySoft || '#FFE8D6') : theme.colors.surfaceSecondary,
                borderWidth: 1,
              }]}
              onPress={() => setFormData({ ...formData, category: cat })}
            >
              <View style={styles.categoryRow}>
                {isSelected ? (
                  <Check size={20} color={theme.colors.primary} strokeWidth={3} />
                ) : (
                  <Circle size={20} color={theme.colors.textMuted} />
                )}
                <Typography variant="h4" weight={isSelected ? "bold" : "medium"} style={{ marginLeft: 12, color: isSelected ? theme.colors.primary : theme.colors.textPrimary }}>
                  {cat}
                </Typography>
              </View>
            </TouchableOpacity>
          )
        })}
      </Animated.View>
    );
  };

  const renderStep3 = () => {
    let options = [];
    if (formData.category === 'Garage') options = ['Bike', 'Car', 'Both', 'Honda', 'Suzuki', 'Hyundai', 'Tata', 'Oil Change', 'Battery', 'Puncture', 'Engine', 'AC', 'Brakes'];
    else if (formData.category === 'Electrician') options = ['Residential', 'Commercial', 'Industrial', 'Emergency', 'Solar', 'CCTV', 'Wiring', 'Switch Board', 'Generator'];
    else if (formData.category === 'Plumber') options = ['Leak Repair', 'Drain Cleaning', 'Bathroom', 'Kitchen', 'Water Tank', 'Pipeline', 'Emergency'];
    else options = ['General Service'];

    const toggleService = (srv) => {
      const isSelected = formData.services.includes(srv);
      if (isSelected) {
        setFormData({ ...formData, services: formData.services.filter(s => s !== srv) });
      } else {
        setFormData({ ...formData, services: [...formData.services, srv] });
      }
    };

    return (
      <Animated.View entering={FadeInRight} exiting={FadeOutLeft} style={styles.stepContainer}>
        <Typography variant="h3" weight="bold" style={styles.stepTitle}>Services Provided</Typography>
        <Typography variant="bodyMedium" color="textSecondary" style={{ marginBottom: 24 }}>Select what you offer for {formData.category}</Typography>

        <View style={styles.pillContainer}>
          {options.map(opt => {
            const isSelected = formData.services.includes(opt);
            return (
              <TouchableOpacity
                key={opt}
                onPress={() => toggleService(opt)}
                style={[styles.pill, {
                  backgroundColor: isSelected ? (theme.colors.primarySoft || '#FFE8D6') : theme.colors.surfaceSecondary,
                  borderColor: isSelected ? theme.colors.primary : 'transparent',
                  borderWidth: 1,
                }]}
              >
                <Typography style={{ color: isSelected ? theme.colors.primary : theme.colors.textPrimary }} weight={isSelected ? "bold" : "regular"}>{opt}</Typography>
              </TouchableOpacity>
            )
          })}
        </View>
      </Animated.View>
    );
  };

  const renderStep4 = () => (
    <Animated.View entering={FadeInRight} exiting={FadeOutLeft} style={styles.stepContainer}>
      <Typography variant="h3" weight="bold" style={styles.stepTitle}>Business Address</Typography>

      <TouchableOpacity onPress={getLocation} style={[styles.mapPlaceholder, { backgroundColor: theme.colors.surfaceSecondary }]}>
        <Map size={48} color={formData.locationText ? theme.colors.primary : theme.colors.textMuted} />
        <Typography variant="bodyMedium" color={formData.locationText ? "primary" : "textMuted"} style={{ marginTop: 12 }}>
          {formData.locationText || "Tap to set Current Location"}
        </Typography>
      </TouchableOpacity>

      <TextInput label="Address" placeholder="Street, Building, Area" value={formData.address} onChangeText={t => setFormData({ ...formData, address: t })} multiline />
      <TextInput label="City" placeholder="e.g. Mumbai" value={formData.city} onChangeText={t => setFormData({ ...formData, city: t })} />
      <TextInput label="Pincode" placeholder="e.g. 400001" value={formData.pincode} onChangeText={t => setFormData({ ...formData, pincode: t })} keyboardType="number-pad" />
    </Animated.View>
  );

  const renderStep5 = () => {
    const allDays = [
      { id: 'Mon', label: 'Monday' },
      { id: 'Tue', label: 'Tuesday' },
      { id: 'Wed', label: 'Wednesday' },
      { id: 'Thu', label: 'Thursday' },
      { id: 'Fri', label: 'Friday' },
      { id: 'Sat', label: 'Saturday' },
      { id: 'Sun', label: 'Sunday' }
    ];

    const toggleDay = (d) => {
      const isSelected = formData.days.includes(d);
      if (isSelected) {
        setFormData({ ...formData, days: formData.days.filter(day => day !== d) });
      } else {
        setFormData({ ...formData, days: [...formData.days, d] });
      }
    };

    return (
      <Animated.View entering={FadeInRight} exiting={FadeOutLeft} style={styles.stepContainer}>
        <Typography variant="h3" weight="bold" style={styles.stepTitle}>Opening Hours</Typography>
        <Typography variant="bodyMedium" color="textSecondary" style={{ marginBottom: 24 }}>Select the days and times you are open for business.</Typography>

        <View style={{ marginBottom: 32 }}>
          <Typography variant="bodyMedium" weight="bold" style={{ marginBottom: 12 }}>Available Days</Typography>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
            {allDays.map(d => {
              const isSelected = formData.days.includes(d.id);
              return (
                <TouchableOpacity
                  key={d.id}
                  onPress={() => toggleDay(d.id)}
                  style={[styles.pill, {
                    backgroundColor: isSelected ? (theme.colors.primarySoft || '#FFE8D6') : theme.colors.surfaceSecondary,
                    borderColor: isSelected ? theme.colors.primary : 'transparent',
                    borderWidth: 1,
                  }]}
                >
                  <Typography color={isSelected ? 'primary' : 'textPrimary'} weight={isSelected ? "bold" : "regular"} variant="bodyMedium">{d.id}</Typography>
                </TouchableOpacity>
              )
            })}
          </View>
        </View>

        <Typography variant="bodyMedium" weight="bold" style={{ marginBottom: 12 }}>Working Hours</Typography>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 16 }}>
          <TouchableOpacity
            onPress={() => { setTimePickerTarget('openTime'); setTimePickerVisible(true); }}
            style={[styles.timeBox, { backgroundColor: theme.colors.surfaceSecondary, borderColor: theme.colors.border }]}
          >
            <Typography variant="bodySmall" color="textMuted" style={{ marginBottom: 4 }}>Opening Time</Typography>
            <Typography variant="h4" weight="bold">{formData.openTime}</Typography>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => { setTimePickerTarget('closeTime'); setTimePickerVisible(true); }}
            style={[styles.timeBox, { backgroundColor: theme.colors.surfaceSecondary, borderColor: theme.colors.border }]}
          >
            <Typography variant="bodySmall" color="textMuted" style={{ marginBottom: 4 }}>Closing Time</Typography>
            <Typography variant="h4" weight="bold">{formData.closeTime}</Typography>
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  };

  const PhotoBox = ({ type, label }) => (
    <TouchableOpacity onPress={() => pickImage(type)} style={[styles.photoUploadBox, { backgroundColor: theme.colors.surfaceSecondary }]}>
      {formData.photos[type] ? (
        <Image source={{ uri: formData.photos[type] }} style={{ width: '100%', height: '100%', borderRadius: 16 }} />
      ) : (
        <>
          <Upload size={24} color={theme.colors.textMuted} />
          <Typography variant="caption" color="textMuted" style={{ marginTop: 8 }}>{label}</Typography>
        </>
      )}
    </TouchableOpacity>
  );

  const renderStep6 = () => (
    <Animated.View entering={FadeInRight} exiting={FadeOutLeft} style={styles.stepContainer}>
      <Typography variant="h3" weight="bold" style={styles.stepTitle}>Upload Photos</Typography>
      <Typography variant="bodyMedium" color="textSecondary" style={{ marginBottom: 24 }}>Minimum 3 Photos Required (Tap to select)</Typography>

      <View style={styles.photoGrid}>
        <PhotoBox type="logo" label="Business Logo" />
        <PhotoBox type="cover" label="Cover Photo" />
        <PhotoBox type="gallery1" label="Gallery 1" />
        <PhotoBox type="gallery2" label="Gallery 2" />
      </View>
    </Animated.View>
  );

  const renderStep7 = () => (
    <Animated.View entering={FadeInRight} exiting={FadeOutLeft} style={styles.stepContainer}>
      <Typography variant="h3" weight="bold" style={styles.stepTitle}>Review Details</Typography>
      <Typography variant="bodyMedium" color="textSecondary" style={{ marginBottom: 24 }}>Please verify your profile before submitting.</Typography>

      <View style={[styles.premiumReviewBox, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border, borderWidth: 1, overflow: 'hidden', padding: 0 }]}>

        {/* Banner Image */}
        <View style={{ height: 120, width: '100%', backgroundColor: theme.colors.surfaceSecondary }}>
          {formData.photos.cover ? (
            <Image source={{ uri: formData.photos.cover }} style={{ width: '100%', height: '100%' }} />
          ) : formData.photos.gallery1 ? (
            <Image source={{ uri: formData.photos.gallery1 }} style={{ width: '100%', height: '100%' }} />
          ) : (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Typography color="textMuted">No Cover Photo</Typography>
            </View>
          )}
        </View>

        {/* Profile Content */}
        <View style={{ padding: 24, paddingTop: 12 }}>
          <View style={styles.reviewHeader}>
            {formData.photos.logo ? (
              <Image source={{ uri: formData.photos.logo }} style={styles.reviewLogo} />
            ) : (
              <View style={[styles.reviewLogo, { backgroundColor: theme.colors.primary, justifyContent: 'center', alignItems: 'center' }]}>
                <Typography color="white" weight="bold" variant="h3">{(formData.businessName || 'B')[0]}</Typography>
              </View>
            )}
            <View style={{ flex: 1, marginLeft: 16, marginTop: 32 }}>
              <Typography variant="h4" weight="bold">{formData.businessName || 'Your Business Name'}</Typography>
              <Typography variant="bodyMedium" color="textSecondary">{formData.category || 'Category'} • {formData.city || 'City'}</Typography>
            </View>
          </View>

          <View style={styles.reviewSection}>
            <Typography variant="bodySmall" color="textMuted">OWNER & CONTACT</Typography>
            <Typography variant="bodyMedium" weight="bold">{formData.ownerName || 'Not Set'}</Typography>
            {formData.phone && <Typography variant="bodyMedium" color="textSecondary">{formData.phone}</Typography>}
          </View>

          <View style={styles.reviewSection}>
            <Typography variant="bodySmall" color="textMuted">SERVICES OFFERED ({formData.services.length})</Typography>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 4 }}>
              {formData.services.map(s => (
                <View key={s} style={{ backgroundColor: theme.colors.surfaceSecondary, borderColor: theme.colors.border, borderWidth: 1, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 }}>
                  <Typography variant="caption">{s}</Typography>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.reviewSection}>
            <Typography variant="bodySmall" color="textMuted">HOURS</Typography>
            <Typography variant="bodyMedium" weight="bold">{formData.days.join(', ')}</Typography>
            <Typography variant="bodyMedium" color="textSecondary">{formData.openTime} - {formData.closeTime}</Typography>
          </View>
        </View>
      </View>

      <View style={[styles.statusBox, { backgroundColor: '#FFF3E0', borderColor: '#FFB74D', borderWidth: 1 }]}>
        <CheckCircle2 color="#F57C00" size={24} style={{ marginRight: 12 }} />
        <View style={{ flex: 1 }}>
          <Typography variant="bodyMedium" weight="bold" color="warning">Status: Pending Verification</Typography>
          <Typography variant="caption" color="textSecondary">Your profile will be reviewed after submission.</Typography>
        </View>
      </View>
    </Animated.View>
  );

  const renderCurrentStep = () => {
    switch (step) {
      case 1: return renderStep1();
      case 2: return renderStep2();
      case 3: return renderStep3();
      case 4: return renderStep4();
      case 5: return renderStep5();
      case 6: return renderStep6();
      case 7: return renderStep7();
      default: return renderStep1();
    }
  }

  const progressPercent = step / totalSteps;
  const size = 72;
  const strokeWidth = 4;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (circumference * progressPercent);

  return (
    <View style={styles.mainContainer}>
      <StatusBar style="dark" backgroundColor="transparent" />
      
      {/* Top Image Background */}
      <View style={StyleSheet.absoluteFillObject}>
        <Image
          source={require('../../assets/images/screens/provider-form.png')}
          style={{ width: '100%', height: 400, opacity: 0.8 }}
          resizeMode="cover"
        />
        <LinearGradient
          colors={['transparent', theme.colors.background]}
          style={{ position: 'absolute', top: 200, left: 0, right: 0, height: 200 }}
        />
      </View>

      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        {/* Sticky Header Section */}
        <View style={styles.headerSection}>
          
          {/* Top Row: Navigation */}
          <View style={styles.headerTopRow}>
            <TouchableOpacity 
              onPress={handleBack} 
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              style={styles.blurBadgeContainer}
            >
              <BlurView intensity={50} tint="light" style={styles.blurBadge}>
                <ArrowLeft size={20} color={theme.colors.textPrimary} />
              </BlurView>
            </TouchableOpacity>

            {step < totalSteps && (
              <TouchableOpacity 
                onPress={handleNext} 
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                style={styles.blurBadgeContainer}
              >
                <BlurView intensity={50} tint="light" style={styles.blurBadge}>
                  <ChevronRight size={20} color={theme.colors.textPrimary} />
                </BlurView>
              </TouchableOpacity>
            )}
          </View>

          {/* Title Row */}
          <View style={styles.headerContentRow}>
            <View style={styles.headerTextCol}>
              <Typography variant="h3" weight="bold" style={styles.titleText}>
                Complete Your
              </Typography>
              <Typography variant="h3" weight="bold" style={[styles.titleText, { color: theme.colors.primary }]}>
                Provider Profile
              </Typography>
              <Typography variant="bodySmall" color="textSecondary" style={styles.subtitleText}>
                Setup your details to{'\n'}start getting jobs.
              </Typography>
            </View>
            
            <View style={styles.headerRightCol}>
              <View style={[styles.stepCircleContainer, step === totalSteps && { backgroundColor: '#4CAF50' }]}>
                
                {/* Background / Blur Layer */}
                {step !== totalSteps && (
                  <View style={[StyleSheet.absoluteFillObject, { borderRadius: size / 2, overflow: 'hidden' }]}>
                    <BlurView intensity={80} tint="light" style={styles.stepCircleBlur} />
                  </View>
                )}

                {/* SVG Progress Ring */}
                {step !== totalSteps && (
                  <Svg width={size} height={size} style={{ position: 'absolute' }}>
                    <SvgCircle stroke={theme.colors.border} fill="none" cx={size / 2} cy={size / 2} r={radius} strokeWidth={strokeWidth} />
                    <SvgCircle
                      stroke={theme.colors.primary} fill="none" cx={size / 2} cy={size / 2} r={radius}
                      strokeWidth={strokeWidth} strokeDasharray={circumference} strokeDashoffset={strokeDashoffset}
                      strokeLinecap="round" rotation="-90" originX={size / 2} originY={size / 2}
                    />
                  </Svg>
                )}

                {/* Content Layer */}
                <View style={[StyleSheet.absoluteFillObject, { alignItems: 'center', justifyContent: 'center' }]}>
                  {step === totalSteps ? (
                    <Check size={36} color="#FFFFFF" strokeWidth={3} />
                  ) : (
                    <Typography variant="h3" weight="bold" style={{ color: theme.colors.primary }}>
                      {step}<Typography variant="bodyLarge" weight="bold" color="textSecondary">/{totalSteps}</Typography>
                    </Typography>
                  )}
                </View>

              </View>
            </View>
          </View>

        </View>



        {/* Scrollable White Form Section */}
        <KeyboardAvoidingView
          style={styles.formSection}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        >
          <View style={[styles.whiteContainer, { backgroundColor: theme.colors.background }]}>
            <ScrollView 
              contentContainerStyle={styles.scrollContent} 
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              {renderCurrentStep()}

              <View style={styles.footer}>
                {step === totalSteps ? (
                  <>
                    <Button title="Save Draft" variant="outline" style={{ marginBottom: 12 }} fullWidth onPress={() => { }} />
                    <Button title="Submit Application" variant="primary" onPress={handleSubmit} loading={loading} fullWidth size="large" />
                  </>
                ) : (
                  <Button
                    title="Continue"
                    variant="primary"
                    onPress={handleNext}
                    fullWidth
                    size="large"
                    disabled={step === 2 && !formData.category}
                  />
                )}
              </View>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>

      </SafeAreaView>

      {/* Time Picker Modal */}
      {timePickerVisible && (
        <View style={[StyleSheet.absoluteFillObject, { zIndex: 100 }]}>
          <TouchableOpacity
            style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }}
            activeOpacity={1}
            onPress={() => setTimePickerVisible(false)}
          />
          <View style={[styles.timePickerSheet, { backgroundColor: theme.colors.surface }]}>
            
            <View style={styles.timePickerHeader}>
              <Typography variant="h4" weight="bold">
                {timePickerTarget === 'openTime' ? 'Opening Time' : 'Closing Time'}
              </Typography>
              <TouchableOpacity onPress={() => setTimePickerVisible(false)}>
                <Typography color="textSecondary" weight="medium">Cancel</Typography>
              </TouchableOpacity>
            </View>

            {/* Category Tabs */}
            <View style={{ flexDirection: 'row', paddingHorizontal: 24, marginBottom: 16 }}>
              {['Morning', 'Afternoon', 'Evening'].map(cat => {
                const isActive = timeCategory === cat;
                return (
                  <TouchableOpacity
                    key={cat}
                    onPress={() => setTimeCategory(cat)}
                    style={{
                      flex: 1,
                      paddingVertical: 10,
                      alignItems: 'center',
                      borderBottomWidth: 2,
                      borderBottomColor: isActive ? theme.colors.primary : 'transparent',
                    }}
                  >
                    <Typography 
                      variant="bodySmall" 
                      weight={isActive ? "bold" : "medium"} 
                      color={isActive ? 'primary' : 'textSecondary'}
                    >
                      {cat}
                    </Typography>
                  </TouchableOpacity>
                )
              })}
            </View>

            <ScrollView 
              style={{ maxHeight: 250 }} 
              contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 24, flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}
              showsVerticalScrollIndicator={false}
            >
              {TIME_GROUPS[timeCategory].map(time => {
                const isSelected = formData[timePickerTarget] === time;
                return (
                  <TouchableOpacity
                    key={time}
                    style={{
                      width: '30%',
                      backgroundColor: isSelected ? theme.colors.primary : theme.colors.surfaceSecondary,
                      borderRadius: 12,
                      paddingVertical: 12,
                      alignItems: 'center',
                    }}
                    onPress={() => setFormData({ ...formData, [timePickerTarget]: time })}
                  >
                    <Typography
                      variant="bodyMedium"
                      color={isSelected ? 'white' : 'textPrimary'}
                      weight={isSelected ? 'medium' : 'regular'}
                    >
                      {time}
                    </Typography>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
            
            <View style={{ paddingHorizontal: 24, paddingTop: 16, paddingBottom: Platform.OS === 'ios' ? 10 : 0 }}>
               <Button title="Apply Time" variant="primary" onPress={() => setTimePickerVisible(false)} fullWidth />
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1 },
  safeArea: { flex: 1 },
  headerSection: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 16,
  },
  headerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  blurBadgeContainer: {
    height: 36,
    borderRadius: 18,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    justifyContent: 'center',
  },
  blurBadge: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 36,
  },
  headerContentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTextCol: {
    flex: 1,
    paddingRight: 12,
  },
  titleText: {
    fontSize: 22,
    lineHeight: 28,
  },
  subtitleText: {
    marginTop: 6,
    lineHeight: 18,
  },
  headerRightCol: {
    width: 80,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  stepCircleContainer: {
    width: 72,
    height: 72,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 36,
    overflow: 'hidden',
  },
  stepCircleBlur: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formSection: {
    flex: 1,
  },
  whiteContainer: {
    flex: 1,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 10,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 40,
    flexGrow: 1,
  },
  stepContainer: { flex: 1, paddingTop: 0 },
  stepTitle: { marginBottom: 24 },
  footer: { paddingTop: 32, marginTop: 'auto' },
  categoryCard: { borderRadius: 16, padding: 16, marginBottom: 12 },
  categoryRow: { flexDirection: 'row', alignItems: 'center' },
  pillContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  pill: { paddingHorizontal: 16, paddingVertical: 10, borderRadius: 24 },
  mapPlaceholder: { height: 200, borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginBottom: 24 },
  hoursBox: { padding: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  photoGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 16 },
  photoUploadBox: { width: '47%', aspectRatio: 1, borderRadius: 16, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(0,0,0,0.05)', borderStyle: 'dashed', overflow: 'hidden' },
  statusBox: { flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 12 },
  premiumReviewBox: { borderRadius: 20, marginBottom: 24 },
  reviewHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  reviewLogo: { width: 80, height: 80, borderRadius: 40, borderWidth: 4, borderColor: '#FFFFFF', marginTop: -50, backgroundColor: '#FFFFFF' },
  divider: { height: 1, backgroundColor: 'rgba(0,0,0,0.05)', marginBottom: 20 },
  reviewSection: { marginBottom: 16 },
  timeBox: { flex: 1, padding: 16, borderRadius: 16, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  timePickerSheet: { position: 'absolute', bottom: 0, left: 0, right: 0, borderTopLeftRadius: 32, borderTopRightRadius: 32, paddingBottom: 32, paddingTop: 24 },
  timePickerHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24, paddingBottom: 20 },
});
