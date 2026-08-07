import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Camera, MapPin, ArrowLeft, Check, CheckCircle2, ChevronRight, Map, Clock, Upload, Circle, CheckCircle } from 'lucide-react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated';
import { useAppTheme } from '../../src/hooks/useAppTheme';
import { useAuth } from '../../src/hooks/useAuth';
import { Typography } from '../../src/components/ui/Typography';
import { TextInput } from '../../src/components/ui/TextInput';
import { Button } from '../../src/components/ui/Button';

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

export default function ProviderSetupWizard() {
  const { theme } = useAppTheme();
  const router = useRouter();
  const { login } = useAuth();
  const insets = useSafeAreaInsets();
  
  const [step, setStep] = useState(1);
  const totalSteps = 7;
  const [loading, setLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    businessName: '',
    ownerName: '',
    phone: '',
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
  const [timePickerTarget, setTimePickerTarget] = useState('openTime');

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
      <TextInput label="Business Name *" placeholder="e.g. Acme Auto" value={formData.businessName} onChangeText={t => setFormData({...formData, businessName: t})} />
      <TextInput label="Owner Name *" placeholder="e.g. John Doe" value={formData.ownerName} onChangeText={t => setFormData({...formData, ownerName: t})} />
      <TextInput label="Phone Number" placeholder="e.g. +91 9999999999" value={formData.phone} onChangeText={t => setFormData({...formData, phone: t})} keyboardType="phone-pad" />
      <TextInput label="WhatsApp" placeholder="e.g. +91 9999999999" value={formData.whatsapp} onChangeText={t => setFormData({...formData, whatsapp: t})} keyboardType="phone-pad" />
      <TextInput label="Email" placeholder="business@example.com" value={formData.email} onChangeText={t => setFormData({...formData, email: t})} keyboardType="email-address" autoCapitalize="none" />
      <TextInput label="Business Description" placeholder="Describe your services" value={formData.description} onChangeText={t => setFormData({...formData, description: t})} multiline />
    </Animated.View>
  );

  const renderStep2 = () => {
    const categories = ['Garage', 'Electrician', 'Plumber'];
    return (
      <Animated.View entering={FadeInRight} exiting={FadeOutLeft} style={styles.stepContainer}>
        <Typography variant="h3" weight="bold" style={styles.stepTitle}>Select Category</Typography>
        <Typography variant="bodyMedium" color="textSecondary" style={{marginBottom: 24}}>Choose one category for your business.</Typography>
        
        {categories.map(cat => {
          const isSelected = formData.category === cat;
          return (
            <TouchableOpacity 
              key={cat}
              style={[styles.categoryCard, { 
                borderColor: isSelected ? theme.colors.primary : theme.colors.border,
                backgroundColor: theme.colors.surface,
                borderWidth: isSelected ? 0 : 2,
                overflow: 'hidden'
              }]}
              onPress={() => setFormData({...formData, category: cat})}
            >
              {isSelected && (
                <LinearGradient
                  colors={[theme.colors.primary, theme.colors.primarySoft || '#FFC499']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={StyleSheet.absoluteFill}
                />
              )}
              <View style={styles.categoryRow}>
                {isSelected ? (
                  <View style={{ backgroundColor: '#4CAF50', borderRadius: 12, width: 24, height: 24, alignItems: 'center', justifyContent: 'center' }}>
                    <Check size={16} color="#FFFFFF" strokeWidth={3} />
                  </View>
                ) : <Circle color={theme.colors.border} />}
                <Typography variant="h4" weight={isSelected ? "bold" : "medium"} style={{marginLeft: 12, color: isSelected ? '#FFFFFF' : theme.colors.textPrimary, zIndex: 1}}>
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
        setFormData({...formData, services: formData.services.filter(s => s !== srv)});
      } else {
        setFormData({...formData, services: [...formData.services, srv]});
      }
    };

    return (
      <Animated.View entering={FadeInRight} exiting={FadeOutLeft} style={styles.stepContainer}>
        <Typography variant="h3" weight="bold" style={styles.stepTitle}>Services Provided</Typography>
        <Typography variant="bodyMedium" color="textSecondary" style={{marginBottom: 24}}>Select what you offer for {formData.category}</Typography>
        
        <View style={styles.pillContainer}>
          {options.map(opt => {
            const isSelected = formData.services.includes(opt);
            return (
              <TouchableOpacity
                key={opt}
                onPress={() => toggleService(opt)}
                style={[styles.pill, { 
                  backgroundColor: theme.colors.surfaceSecondary,
                  borderColor: isSelected ? theme.colors.primary : 'transparent',
                  borderWidth: isSelected ? 0 : 1,
                  overflow: 'hidden'
                }]}
              >
                {isSelected && (
                  <LinearGradient
                    colors={[theme.colors.primary, theme.colors.primarySoft || '#FFC499']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={StyleSheet.absoluteFill}
                  />
                )}
                <Typography style={{ color: isSelected ? '#FFFFFF' : theme.colors.textPrimary, zIndex: 1 }} weight={isSelected ? "bold" : "regular"}>{opt}</Typography>
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
        <Typography variant="bodyMedium" color={formData.locationText ? "primary" : "textMuted"} style={{marginTop: 12}}>
          {formData.locationText || "Tap to set Current Location"}
        </Typography>
      </TouchableOpacity>

      <TextInput label="Address" placeholder="Street, Building, Area" value={formData.address} onChangeText={t => setFormData({...formData, address: t})} multiline />
      <TextInput label="City" placeholder="e.g. Mumbai" value={formData.city} onChangeText={t => setFormData({...formData, city: t})} />
      <TextInput label="Pincode" placeholder="e.g. 400001" value={formData.pincode} onChangeText={t => setFormData({...formData, pincode: t})} keyboardType="number-pad" />
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
        setFormData({...formData, days: formData.days.filter(day => day !== d)});
      } else {
        setFormData({...formData, days: [...formData.days, d]});
      }
    };

    return (
      <Animated.View entering={FadeInRight} exiting={FadeOutLeft} style={styles.stepContainer}>
        <Typography variant="h3" weight="bold" style={styles.stepTitle}>Opening Hours</Typography>
        <Typography variant="bodyMedium" color="textSecondary" style={{marginBottom: 24}}>Select the days and times you are open for business.</Typography>
        
        <View style={{ marginBottom: 32 }}>
          <Typography variant="bodyMedium" weight="bold" style={{ marginBottom: 12 }}>Available Days</Typography>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
            {allDays.map(d => {
              const isSelected = formData.days.includes(d.id);
              return (
                <TouchableOpacity 
                  key={d.id}
                  onPress={() => toggleDay(d.id)}
                  style={{
                    backgroundColor: isSelected ? theme.colors.primary : theme.colors.surfaceSecondary,
                    borderWidth: 1,
                    borderColor: isSelected ? theme.colors.primary : theme.colors.border,
                    borderRadius: 12,
                    paddingHorizontal: 16,
                    paddingVertical: 10,
                  }}
                >
                  <Typography color={isSelected ? 'white' : 'textPrimary'} weight={isSelected ? "bold" : "medium"} variant="bodyMedium">{d.id}</Typography>
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
             <Typography variant="bodySmall" color="textMuted" style={{marginBottom: 4}}>Opening Time</Typography>
             <Typography variant="h4" weight="bold">{formData.openTime}</Typography>
           </TouchableOpacity>

           <TouchableOpacity 
             onPress={() => { setTimePickerTarget('closeTime'); setTimePickerVisible(true); }}
             style={[styles.timeBox, { backgroundColor: theme.colors.surfaceSecondary, borderColor: theme.colors.border }]}
           >
             <Typography variant="bodySmall" color="textMuted" style={{marginBottom: 4}}>Closing Time</Typography>
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
          <Typography variant="caption" color="textMuted" style={{marginTop: 8}}>{label}</Typography>
        </>
      )}
    </TouchableOpacity>
  );

  const renderStep6 = () => (
    <Animated.View entering={FadeInRight} exiting={FadeOutLeft} style={styles.stepContainer}>
      <Typography variant="h3" weight="bold" style={styles.stepTitle}>Upload Photos</Typography>
      <Typography variant="bodyMedium" color="textSecondary" style={{marginBottom: 24}}>Minimum 3 Photos Required (Tap to select)</Typography>
      
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
      <Typography variant="bodyMedium" color="textSecondary" style={{marginBottom: 24}}>Please verify your profile before submitting.</Typography>
      
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
         <CheckCircle2 color="#F57C00" size={24} style={{marginRight: 12}} />
         <View style={{flex: 1}}>
           <Typography variant="bodyMedium" weight="bold" color="warning">Status: Pending Verification</Typography>
           <Typography variant="caption" color="textSecondary">Your profile will be reviewed after submission.</Typography>
         </View>
      </View>
    </Animated.View>
  );

  const renderCurrentStep = () => {
    switch(step) {
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

  const progressPercent = (step / totalSteps) * 100;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }} edges={['top', 'bottom', 'left', 'right']}>
      <StatusBar style="light" backgroundColor={theme.colors.primary} />
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, height: insets.top, backgroundColor: theme.colors.primary, zIndex: 10 }} />
      
      <View style={[styles.headerBar, { backgroundColor: theme.colors.background }]}>
        <TouchableOpacity onPress={handleBack} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <ArrowLeft size={24} color={theme.colors.textPrimary} />
        </TouchableOpacity>
        <Typography variant="h3" weight="bold" style={styles.headerTitle}>Provider Setup</Typography>
        <View style={{ alignItems: 'center' }}><Typography variant="bodyMedium" weight="bold" color="primary">{step} / {totalSteps}</Typography></View>
      </View>

      <View style={[styles.progressContainer, { backgroundColor: theme.colors.surfaceSecondary }]}>
        <View style={[styles.progressBar, { width: `${progressPercent}%`, backgroundColor: theme.colors.primary }]} />
      </View>

      <KeyboardAvoidingView 
        style={[styles.container, { backgroundColor: theme.colors.background }]}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          
          {renderCurrentStep()}

          <View style={styles.footer}>
            {step === totalSteps ? (
              <>
                <Button title="Save Draft" variant="outline" style={{marginBottom: 12}} fullWidth onPress={() => {}} />
                <Button title="Submit Application" variant="primary" onPress={handleSubmit} loading={loading} fullWidth size="large" />
              </>
            ) : (
              <Button 
                title="Next Step" 
                variant="primary" 
                onPress={handleNext} 
                fullWidth 
                size="large"
                rightIcon={<ChevronRight color="#FFFFFF" size={20} />}
                disabled={step === 2 && !formData.category} 
              />
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Time Picker Modal */}
      {timePickerVisible && (
        <View style={StyleSheet.absoluteFillObject}>
          <TouchableOpacity 
            style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }} 
            activeOpacity={1} 
            onPress={() => setTimePickerVisible(false)} 
          />
          <View style={[styles.timePickerSheet, { backgroundColor: theme.colors.surface }]}>
            <View style={styles.timePickerHeader}>
               <Typography variant="h4" weight="bold">
                 Select {timePickerTarget === 'openTime' ? 'Opening' : 'Closing'} Time
               </Typography>
               <TouchableOpacity onPress={() => setTimePickerVisible(false)}>
                 <Typography color="primary" weight="bold">Done</Typography>
               </TouchableOpacity>
            </View>
            <ScrollView style={{ maxHeight: 300 }}>
              {TIME_SLOTS.map(time => (
                <TouchableOpacity 
                  key={time} 
                  style={[styles.timeSlot, { borderBottomColor: theme.colors.border }]}
                  onPress={() => {
                    setFormData({...formData, [timePickerTarget]: time});
                    setTimePickerVisible(false);
                  }}
                >
                  <Typography 
                    variant="h4" 
                    color={formData[timePickerTarget] === time ? 'primary' : 'textPrimary'}
                    weight={formData[timePickerTarget] === time ? 'bold' : 'regular'}
                  >
                    {time}
                  </Typography>
                  {formData[timePickerTarget] === time && <Check color={theme.colors.primary} size={20} />}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      )}

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 24, paddingTop: 16, paddingBottom: 16 },
  headerTitle: { fontSize: 18 },
  progressContainer: { height: 4, width: '100%' },
  progressBar: { height: '100%' },
  scroll: { flexGrow: 1, paddingHorizontal: 24, paddingBottom: 40 },
  stepContainer: { flex: 1, paddingTop: 32 },
  stepTitle: { marginBottom: 24 },
  footer: { paddingTop: 32, marginTop: 'auto' },
  categoryCard: { borderWidth: 2, borderRadius: 16, padding: 20, marginBottom: 16 },
  categoryRow: { flexDirection: 'row', alignItems: 'center' },
  pillContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  pill: { paddingHorizontal: 16, paddingVertical: 10, borderRadius: 24, borderWidth: 1 },
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
  timePickerSheet: { position: 'absolute', bottom: 0, left: 0, right: 0, borderTopLeftRadius: 24, borderTopRightRadius: 24, paddingBottom: 40, paddingTop: 16 },
  timePickerHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.05)' },
  timeSlot: { paddingVertical: 16, paddingHorizontal: 24, borderBottomWidth: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }
});
