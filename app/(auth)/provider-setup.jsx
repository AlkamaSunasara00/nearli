import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import * as Location from 'expo-location';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ArrowLeft, Check, CheckCircle2, ChevronRight, Circle, Map, Upload, Camera, ImagePlus, Store, Briefcase, Pencil, Phone, User, MessageCircle, Mail, FileText, MapPin, Building, Hash } from 'lucide-react-native';
import { useState, useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Toast } from '../../src/components/ui/Toast';
import { ActivityIndicator, Image, Platform, StyleSheet, TouchableOpacity, View, Keyboard } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
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
  const toastRef = useRef(null);

  useEffect(() => {
    const loadDraft = async () => {
      try {
        const draft = await AsyncStorage.getItem('provider_draft');
        if (draft) {
          setFormData(JSON.parse(draft));
          toastRef.current?.show('Draft loaded', 'success');
        }
      } catch (e) {
        console.log('Error loading draft', e);
      }
    };
    loadDraft();
  }, []);

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
    termsAccepted: false,
  });

  const [timePickerVisible, setTimePickerVisible] = useState(false);
  const [timePickerTarget, setTimePickerTarget] = useState('openTime'); // 'openTime' or 'closeTime'
  const [timeCategory, setTimeCategory] = useState('Morning');

  const pickImage = async (type) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
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

  const handleSaveDraft = async () => {
    try {
      await AsyncStorage.setItem('provider_draft', JSON.stringify(formData));
      toastRef.current?.show('Draft saved successfully', 'success');
    } catch (e) {
      toastRef.current?.show('Failed to save draft', 'error');
    }
  };

  const handleSubmit = async () => {
    if (!formData.businessName || !formData.category || formData.services.length === 0) {
      toastRef.current?.show('Please fill all required details', 'error');
      return;
    }
    setLoading(true);
    setTimeout(async () => {
      setLoading(false);
      try {
        await AsyncStorage.removeItem('provider_draft');
      } catch (e) {}
      router.replace('/(auth)/provider-pending');
    }, 1500);
  };

  const LabelWithIcon = ({ icon: Icon, label, required }) => (
    <View style={styles.labelContainer}>
      <View style={[styles.labelIconWrapper]}>
        <Icon size={16} color={theme.colors.primary} />
      </View>
      <Typography variant="bodySmall" weight="bold" style={styles.labelText}>
        {label} {required && <Typography style={{ color: theme.colors.danger }}>*</Typography>}
      </Typography>
    </View>
  );

  const renderStep1 = () => (
    <Animated.View entering={FadeInRight} exiting={FadeOutLeft} style={styles.stepContainer}>
      <Typography variant="h3" weight="bold" style={styles.stepTitle}>Basic Information</Typography>
      <LabelWithIcon icon={Phone} label="Phone Number" />
      <TextInput value={formData.phone} editable={false} rightIcon={<CheckCircle2 size={20} color={theme.colors.success || '#4CAF50'} />} containerStyle={styles.inputMargin} />

      <LabelWithIcon icon={Store} label="Business Name" required />
      <TextInput placeholder="e.g. Acme Auto" value={formData.businessName} onChangeText={t => setFormData({ ...formData, businessName: t })} containerStyle={styles.inputMargin} />

      <LabelWithIcon icon={User} label="Owner Name" required />
      <TextInput placeholder="e.g. John Doe" value={formData.ownerName} onChangeText={t => setFormData({ ...formData, ownerName: t })} containerStyle={styles.inputMargin} />

      <LabelWithIcon icon={MessageCircle} label="WhatsApp" />
      <TextInput placeholder="e.g. +91 9999999999" value={formData.whatsapp} onChangeText={t => setFormData({ ...formData, whatsapp: t })} keyboardType="phone-pad" containerStyle={styles.inputMargin} />

      <LabelWithIcon icon={Mail} label="Email" />
      <TextInput placeholder="business@example.com" value={formData.email} onChangeText={t => setFormData({ ...formData, email: t })} keyboardType="email-address" autoCapitalize="none" containerStyle={styles.inputMargin} />

      <LabelWithIcon icon={FileText} label="Business Description" required />
      <View style={{ marginBottom: 20 }}>
        <TextInput 
          placeholder="Briefly describe what you do, your expertise, and what makes your service great..." 
          value={formData.description} 
          onChangeText={t => {
            if (t.length > 200) {
              toastRef.current?.show('Maximum 200 characters allowed', 'error');
              setFormData({ ...formData, description: t.substring(0, 200) });
            } else {
              setFormData({ ...formData, description: t });
            }
          }} 
          multiline 
          maxLength={200}
          numberOfLines={7}
          style={{ height: 150, textAlignVertical: 'top', paddingTop: 12 }}
          containerStyle={styles.inputMargin}
        />
        <Typography variant="caption" color="textMuted" style={{ textAlign: 'right', marginTop: 4 }}>
          {formData.description.length} / 200
        </Typography>
      </View>
    </Animated.View>
  );

  const renderStep2 = () => {
    const categories = [
      { name: 'Garage', image: require('../../assets/images/screens/provider.png') },
      { name: 'Electrician', image: require('../../assets/images/screens/Electrician.png') },
      { name: 'Plumber', image: require('../../assets/images/screens/plumber.png') }
    ];
    return (
      <Animated.View entering={FadeInRight} exiting={FadeOutLeft} style={styles.stepContainer}>
        <Typography variant="h3" weight="bold" style={styles.stepTitle}>Select Category</Typography>
        <Typography variant="bodyMedium" color="textSecondary" style={{ marginBottom: 24 }}>Choose one category for your business.</Typography>

        {categories.map(cat => {
          const isSelected = formData.category === cat.name;
          return (
            <TouchableOpacity
              key={cat.name}
              style={[styles.categoryCard, {
                borderColor: isSelected ? theme.colors.primary : 'transparent',
                backgroundColor: isSelected ? (theme.colors.primarySoft || '#FFE8D6') : theme.colors.surfaceSecondary,
                borderWidth: 1,
                overflow: 'visible',
                marginBottom: 28,
              }]}
              onPress={() => setFormData({ ...formData, category: cat.name })}
            >
              <View style={[styles.categoryRow, { justifyContent: 'flex-start', minHeight: 60 }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center', zIndex: 20 }}>
                  {isSelected ? (
                    <Check size={20} color={theme.colors.primary} strokeWidth={3} />
                  ) : (
                    <Circle size={20} color={theme.colors.textMuted} />
                  )}
                  <Typography variant="bodyLarge" weight={isSelected ? "bold" : "medium"} style={{ marginLeft: 12, color: isSelected ? theme.colors.primary : theme.colors.textPrimary }}>
                    {cat.name}
                  </Typography>
                </View>
                
                {/* Category Image - Popping out */}
                <Image 
                  source={cat.image} 
                  style={{ 
                    position: 'absolute', 
                    right: 0, 
                    bottom: -15, 
                    width: 100, 
                    height: 100, 
                    resizeMode: 'contain',
                    zIndex: 10
                  }} 
                />
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

      <TouchableOpacity onPress={getLocation} disabled={loading} style={[styles.mapPlaceholder, { backgroundColor: theme.colors.surfaceSecondary, marginBottom: 16 }]}>
        {loading ? (
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator size="large" color={theme.colors.primary} />
            <Typography variant="bodyMedium" color="primary" style={{ marginTop: 12 }}>
              Fetching Location...
            </Typography>
          </View>
        ) : (
          <>
            <Map size={48} color={formData.locationText ? theme.colors.primary : theme.colors.textMuted} />
            <Typography variant="bodyMedium" color={formData.locationText ? "primary" : "textMuted"} style={{ marginTop: 12, textAlign: 'center', paddingHorizontal: 16 }}>
              {formData.locationText || "Tap to Auto-Detect Location"}
            </Typography>
          </>
        )}
      </TouchableOpacity>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 24, marginTop: 8 }}>
        <View style={{ flex: 1, height: 1, backgroundColor: theme.colors.border || 'rgba(0,0,0,0.1)' }} />
        <Typography variant="bodySmall" color="textMuted" style={{ marginHorizontal: 12, textTransform: 'uppercase' }}>
          Or Enter Manually
        </Typography>
        <View style={{ flex: 1, height: 1, backgroundColor: theme.colors.border || 'rgba(0,0,0,0.1)' }} />
      </View>

      <LabelWithIcon icon={MapPin} label="Address" required />
      <TextInput placeholder="Street, Building, Area" value={formData.address} onChangeText={t => setFormData({ ...formData, address: t })} multiline containerStyle={styles.inputMargin} />

      <LabelWithIcon icon={Building} label="City" required />
      <TextInput placeholder="e.g. Mumbai" value={formData.city} onChangeText={t => setFormData({ ...formData, city: t })} containerStyle={styles.inputMargin} />

      <LabelWithIcon icon={Hash} label="Pincode" required />
      <TextInput placeholder="e.g. 400001" value={formData.pincode} onChangeText={t => setFormData({ ...formData, pincode: t })} keyboardType="number-pad" containerStyle={styles.inputMargin} />
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

  const PhotoBox = ({ type, label, sublabel, icon: IconComponent = Upload }) => (
    <TouchableOpacity onPress={() => pickImage(type)} style={[styles.photoUploadBox, { backgroundColor: theme.colors.surfaceSecondary }]}>
      {formData.photos[type] ? (
        <>
          <Image source={{ uri: formData.photos[type] }} style={{ width: '100%', height: '100%', borderRadius: 16 }} />
          <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(0,0,0,0.5)', paddingVertical: 8, borderBottomLeftRadius: 16, borderBottomRightRadius: 16 }}>
            <Typography variant="caption" weight="bold" style={{ color: '#FFFFFF', textAlign: 'center' }}>{label}</Typography>
          </View>
        </>
      ) : (
        <View style={{ alignItems: 'center', justifyContent: 'center', padding: 8 }}>
          <IconComponent size={28} color={theme.colors.primary} style={{ marginBottom: 12, opacity: 0.9 }} />
          <Typography variant="bodySmall" weight="bold" color="textPrimary" style={{ textAlign: 'center' }}>{label}</Typography>
          {sublabel && <Typography variant="caption" color="textMuted" style={{ textAlign: 'center', marginTop: 4 }}>{sublabel}</Typography>}
        </View>
      )}
    </TouchableOpacity>
  );

  const renderStep6 = () => (
    <Animated.View entering={FadeInRight} exiting={FadeOutLeft} style={styles.stepContainer}>
      <Typography variant="h3" weight="bold" style={styles.stepTitle}>Upload Photos</Typography>
      <Typography variant="bodyMedium" color="textSecondary" style={{ marginBottom: 24 }}>High-quality photos make your business stand out to customers.</Typography>

      <View style={styles.photoGrid}>
        <PhotoBox type="logo" label="Business Logo" sublabel="Your brand" icon={Store} />
        <PhotoBox type="cover" label="Cover Photo" sublabel="Wide banner" icon={ImagePlus} />
        <PhotoBox type="gallery1" label="Work Sample" sublabel="Show quality" icon={Briefcase} />
        <PhotoBox type="gallery2" label="Workspace" sublabel="Inside/Outside" icon={Camera} />
      </View>
    </Animated.View>
  );

  const renderStep7 = () => {
    const EditButton = ({ onPress }) => (
      <TouchableOpacity onPress={onPress} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
        <Pencil size={16} color={theme.colors.primary} />
      </TouchableOpacity>
    );

    return (
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
          <TouchableOpacity onPress={() => setStep(6)} style={{ position: 'absolute', top: 12, right: 12, backgroundColor: 'rgba(255,255,255,0.9)', padding: 8, borderRadius: 20, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4, elevation: 2 }}>
            <Pencil size={16} color={theme.colors.primary} />
          </TouchableOpacity>
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
            <View style={{ flex: 1, marginLeft: 16, marginTop: 16 }}>
              <Typography variant="h4" weight="bold">{formData.businessName || 'Your Business Name'}</Typography>
              <Typography variant="bodyMedium" color="textSecondary">{formData.category || 'Category'} • {formData.city || 'City'}</Typography>
            </View>
            <View style={{ marginTop: 16 }}>
              <EditButton onPress={() => setStep(1)} />
            </View>
          </View>

          {formData.description ? (
            <View style={styles.reviewSection}>
               <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                 <Typography variant="caption" weight="bold" color="textMuted">DESCRIPTION</Typography>
                 <EditButton onPress={() => setStep(1)} />
               </View>
               <Typography variant="bodyMedium" color="textPrimary">{formData.description}</Typography>
            </View>
          ) : null}

          <View style={styles.reviewSection}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
              <Typography variant="caption" weight="bold" color="textMuted">OWNER & CONTACT</Typography>
              <EditButton onPress={() => setStep(1)} />
            </View>
            <Typography variant="bodyMedium" weight="bold">{formData.ownerName || 'Not Set'}</Typography>
            {formData.phone && <Typography variant="bodyMedium" color="textSecondary">{formData.phone}</Typography>}
            {formData.email && <Typography variant="bodyMedium" color="textSecondary">{formData.email}</Typography>}
            {formData.whatsapp && <Typography variant="bodyMedium" color="textSecondary">WA: {formData.whatsapp}</Typography>}
          </View>

          <View style={styles.reviewSection}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
              <Typography variant="caption" weight="bold" color="textMuted">ADDRESS</Typography>
              <EditButton onPress={() => setStep(4)} />
            </View>
            <Typography variant="bodyMedium" color="textPrimary">{formData.address || 'Address not set'}</Typography>
            {(formData.city || formData.pincode) && (
              <Typography variant="bodyMedium" color="textSecondary">
                {[formData.city, formData.pincode].filter(Boolean).join(' - ')}
              </Typography>
            )}
            {formData.locationText && (
               <Typography variant="caption" color="primary" style={{ marginTop: 2 }}>{formData.locationText}</Typography>
            )}
          </View>

          <View style={styles.reviewSection}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
              <Typography variant="caption" weight="bold" color="textMuted">SERVICES OFFERED ({formData.services.length})</Typography>
              <EditButton onPress={() => setStep(3)} />
            </View>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 4 }}>
              {formData.services.length > 0 ? formData.services.map(s => (
                <View key={s} style={{ backgroundColor: theme.colors.surfaceSecondary, borderColor: theme.colors.border, borderWidth: 1, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 }}>
                  <Typography variant="caption">{s}</Typography>
                </View>
              )) : (
                <Typography variant="bodyMedium" color="textMuted">No services selected</Typography>
              )}
            </View>
          </View>

          <View style={[styles.reviewSection, !(formData.photos.gallery1 || formData.photos.gallery2) && { marginBottom: 0, paddingBottom: 0, borderBottomWidth: 0 }]}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
              <Typography variant="caption" weight="bold" color="textMuted">WORKING HOURS</Typography>
              <EditButton onPress={() => setStep(5)} />
            </View>
            <Typography variant="bodyMedium" weight="bold">{formData.days.length > 0 ? formData.days.join(', ') : 'No days selected'}</Typography>
            <Typography variant="bodyMedium" color="textSecondary">{formData.openTime} - {formData.closeTime}</Typography>
          </View>

          {(formData.photos.gallery1 || formData.photos.gallery2) && (
            <View style={[styles.reviewSection, { marginBottom: 0, paddingBottom: 0, borderBottomWidth: 0 }]}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <Typography variant="caption" weight="bold" color="textMuted">GALLERY</Typography>
                <EditButton onPress={() => setStep(6)} />
              </View>
              <View style={{ flexDirection: 'row', gap: 12 }}>
                {formData.photos.gallery1 && (
                  <Image source={{ uri: formData.photos.gallery1 }} style={{ flex: 1, height: 80, borderRadius: 8, backgroundColor: theme.colors.surfaceSecondary }} />
                )}
                {formData.photos.gallery2 && (
                  <Image source={{ uri: formData.photos.gallery2 }} style={{ flex: 1, height: 80, borderRadius: 8, backgroundColor: theme.colors.surfaceSecondary }} />
                )}
              </View>
            </View>
          )}
        </View>
      </View>

      <TouchableOpacity 
        style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 24, marginTop: 16, paddingHorizontal: 4 }}
        onPress={() => setFormData({ ...formData, termsAccepted: !formData.termsAccepted })}
        activeOpacity={0.7}
      >
        <View style={{ width: 24, height: 24, borderRadius: 6, borderWidth: 2, borderColor: formData.termsAccepted ? theme.colors.primary : theme.colors.border, backgroundColor: formData.termsAccepted ? theme.colors.primary : 'transparent', alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
          {formData.termsAccepted && <Check size={16} color="#FFF" strokeWidth={3} />}
        </View>
        <Typography variant="bodyMedium" style={{ flex: 1, color: theme.colors.textSecondary }}>
          I agree to the <Typography color="primary" weight="bold">Terms & Conditions</Typography> and <Typography color="primary" weight="bold">Privacy Policy</Typography>.
        </Typography>
      </TouchableOpacity>

      <View style={[styles.statusBox, { backgroundColor: theme.colors.warning ? theme.colors.warning + '20' : '#FFF3E0', borderColor: theme.colors.warning || '#FFB74D', borderWidth: 1 }]}>
        <CheckCircle2 color={theme.colors.warning || "#F57C00"} size={24} style={{ marginRight: 12 }} />
        <View style={{ flex: 1 }}>
          <Typography variant="bodyMedium" weight="bold" style={{ color: theme.colors.warning || '#F57C00' }}>Status: Pending Verification</Typography>
          <Typography variant="caption" color="textSecondary">Your profile will be reviewed after submission.</Typography>
        </View>
      </View>
    </Animated.View>
  )};

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
        <View style={styles.formSection}>
          <View style={[styles.whiteContainer, { backgroundColor: theme.colors.background }]}>
            <KeyboardAwareScrollView 
              contentContainerStyle={styles.scrollContent} 
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              enableOnAndroid={true}
              extraScrollHeight={Platform.OS === 'ios' ? 20 : 40}
              enableAutomaticScroll={true}
            >
              {renderCurrentStep()}

              <View style={styles.footer}>
                {step === totalSteps ? (
                  <>
                    <Button title="Save Draft" variant="outline" style={{ marginBottom: 12 }} fullWidth onPress={handleSaveDraft} />
                    <Button title="Submit Application" variant="primary" onPress={handleSubmit} loading={loading} fullWidth size="large" disabled={!formData.termsAccepted} />
                  </>
                ) : (
                  <Button
                    title="Continue"
                    variant="primary"
                    onPress={handleNext}
                    fullWidth
                    size="large"
                    disabled={
                      (step === 1 && (!formData.businessName || !formData.ownerName || !formData.description)) ||
                      (step === 2 && !formData.category) ||
                      (step === 3 && formData.services.length === 0) ||
                      (step === 4 && (!formData.address || !formData.city || !formData.pincode)) ||
                      (step === 5 && formData.days.length === 0)
                    }
                  />
                )}
              </View>
            </KeyboardAwareScrollView>
          </View>
        </View>

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
      <Toast ref={toastRef} />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1 },
  safeArea: { flex: 1 },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    marginTop: 14,
  },
  labelIconWrapper: {
    width: 28,
    height: 28,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  labelText: {
    fontSize: 14,
  },
  inputMargin: {
    marginBottom: 0,
  },
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
  reviewLogo: { width: 100, height: 100, borderRadius: 50, borderWidth: 4, borderColor: '#FFFFFF', marginTop: -64, backgroundColor: '#FFFFFF' },
  divider: { height: 1, backgroundColor: 'rgba(0,0,0,0.05)', marginBottom: 20 },
  reviewSection: { paddingBottom: 16, marginBottom: 16, borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.05)' },
  timeBox: { flex: 1, padding: 16, borderRadius: 16, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  timePickerSheet: { position: 'absolute', bottom: 0, left: 0, right: 0, borderTopLeftRadius: 32, borderTopRightRadius: 32, paddingBottom: 32, paddingTop: 24 },
  timePickerHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24, paddingBottom: 20 },
});
