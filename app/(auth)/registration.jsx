import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import * as Location from 'expo-location';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ArrowLeft, Camera, MapPin, User, Mail, Users, Plus, ShieldCheck, Lock, Star, EyeOff, Navigation, Check, Phone } from 'lucide-react-native';
import { useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import { Button } from '../../src/components/ui/Button';
import { TextInput } from '../../src/components/ui/TextInput';
import { Typography } from '../../src/components/ui/Typography';
import { useAppTheme } from '../../src/hooks/useAppTheme';
import { useAuth } from '../../src/hooks/useAuth';

export default function CustomerRegistrationScreen() {
  const { theme } = useAppTheme();
  const router = useRouter();
  const { phone } = useLocalSearchParams();
  const { login } = useAuth();
  const insets = useSafeAreaInsets();
  const [loading, setLoading] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [locationMode, setLocationMode] = useState('current');

  const [formData, setFormData] = useState({
    phone: phone || '+91 9876543210',
    fullName: '',
    email: '',
    gender: '',
    photoUri: null,
    locationText: '',
  });

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!result.canceled) {
      setFormData({ ...formData, photoUri: result.assets[0].uri });
    }
  };

  const getLocation = async () => {
    setLocationLoading(true);
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access location was denied');
      setLocationLoading(false);
      return;
    }
    try {
      let location = await Location.getCurrentPositionAsync({});
      let geocode = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      });
      if (geocode && geocode.length > 0) {
        setFormData({ ...formData, locationText: `${geocode[0].city}, ${geocode[0].region}` });
      } else {
        setFormData({ ...formData, locationText: 'Location found' });
      }
    } catch (e) {
      alert('Error fetching location');
    }
    setLocationLoading(false);
  };

  const genderOptions = [
    { label: 'Male', icon: User },
    { label: 'Female', icon: User }, 
    { label: 'Other', icon: Users },
    { label: 'Prefer not to say', icon: EyeOff },
  ];

  const handleSubmit = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      login('CUSTOMER');
      router.replace('/(customer)/home');
    }, 1500);
  };

  const LabelWithIcon = ({ icon: Icon, label, required }) => (
    <View style={styles.labelContainer}>
      <View style={[styles.labelIconWrapper, { backgroundColor: theme.colors.primarySoft || '#FFE8D6' }]}>
        <Icon size={16} color={theme.colors.primary} />
      </View>
      <Typography variant="bodySmall" weight="bold" style={styles.labelText}>
        {label} {required && <Typography style={{ color: theme.colors.danger }}>*</Typography>}
      </Typography>
    </View>
  );

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
          <TouchableOpacity 
            onPress={() => router.back()} 
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            style={styles.backButtonContainer}
          >
            <BlurView intensity={50} tint="light" style={styles.backButton}>
              <ArrowLeft size={20} color={theme.colors.textPrimary} />
            </BlurView>
          </TouchableOpacity>

          <View style={styles.headerContentRow}>
            <View style={styles.headerTextCol}>
              <Typography variant="h3" weight="bold" style={styles.titleText}>
                Complete Your
              </Typography>
              <Typography variant="h3" weight="bold" style={[styles.titleText, { color: theme.colors.primary }]}>
                Profile
              </Typography>
              <Typography variant="bodySmall" color="textSecondary" style={styles.subtitleText}>
                A few details help us serve{'\n'}you better.
              </Typography>
            </View>
            <View style={styles.headerGraphicCol}>
              <View style={[styles.idCardFake, { backgroundColor: theme.colors.surface }]}>
                <View style={[styles.idCardAvatar, { backgroundColor: theme.colors.primarySoft || '#FFE8D6' }]}>
                  <User size={24} color={theme.colors.primary} />
                </View>
                <View style={styles.idCardLines}>
                  <View style={[styles.idCardLine, { width: 40, backgroundColor: theme.colors.border }]} />
                  <View style={[styles.idCardLine, { width: 60, backgroundColor: theme.colors.border }]} />
                  <View style={[styles.idCardLine, { width: 50, backgroundColor: theme.colors.border }]} />
                </View>
                <View style={[styles.idCardCheck, { backgroundColor: theme.colors.primary }]}>
                  <Check size={12} color="#FFF" />
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
              
              {/* Profile Photo Upload */}
              <View style={styles.photoUploadSection}>
                <View style={[styles.photoCircleOuter, { borderColor: theme.colors.primarySoft || '#FFE8D6' }]}>
                  <TouchableOpacity 
                    onPress={pickImage} 
                    style={[styles.photoCircleInner, { backgroundColor: theme.colors.primarySoft || '#FFE8D6' }]}
                  >
                    {formData.photoUri ? (
                      <Image source={{ uri: formData.photoUri }} style={styles.profileImage} />
                    ) : (
                      <Camera size={28} color={theme.colors.primary} />
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity onPress={pickImage} style={[styles.addPhotoButton, { backgroundColor: theme.colors.primary }]}>
                    <Plus size={14} color="#FFF" />
                  </TouchableOpacity>
                </View>
                <Typography variant="bodySmall" weight="bold" style={styles.photoLabel}>
                  Add Profile Photo <Typography variant="bodySmall" color="textSecondary">(Optional)</Typography>
                </Typography>
                <Typography variant="caption" color="textMuted">
                  A clear photo helps build trust
                </Typography>
              </View>

              <View style={styles.formFields}>
                {/* Verified Phone */}
                <LabelWithIcon icon={Phone} label="Verified Phone Number" />
                <TextInput
                  value={formData.phone}
                  editable={false}
                  containerStyle={[styles.inputMargin, { opacity: 0.6 }]}
                />

                {/* Full Name */}
                <LabelWithIcon icon={User} label="Full Name" required={true} />
                <TextInput
                  placeholder="e.g. John Doe"
                  value={formData.fullName}
                  onChangeText={(t) => setFormData({ ...formData, fullName: t })}
                  containerStyle={styles.inputMargin}
                />

                {/* Email */}
                <LabelWithIcon icon={Mail} label="Email (Optional)" />
                <TextInput
                  placeholder="john@example.com"
                  value={formData.email}
                  onChangeText={(t) => setFormData({ ...formData, email: t })}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  containerStyle={styles.inputMarginReduced}
                />
                <View style={styles.hintRow}>
                  <Navigation size={10} color={theme.colors.textMuted} />
                  <Typography variant="caption" color="textMuted" style={styles.hintText}>
                    Useful for invoices and future features.
                  </Typography>
                </View>

                {/* Gender */}
                <LabelWithIcon icon={Users} label="Gender (Optional)" />
                <View style={styles.genderGrid}>
                  {genderOptions.map((opt) => {
                    const isSelected = formData.gender === opt.label;
                    const IconComp = opt.icon;
                    return (
                      <TouchableOpacity
                        key={opt.label}
                        style={[
                          styles.genderPill,
                          {
                            backgroundColor: isSelected ? (theme.colors.primarySoft || '#FFE8D6') : theme.colors.surfaceSecondary,
                            borderColor: isSelected ? theme.colors.primary : 'transparent',
                            borderWidth: 1,
                          }
                        ]}
                        onPress={() => setFormData({ ...formData, gender: opt.label })}
                      >
                        <IconComp size={14} color={isSelected ? theme.colors.primary : theme.colors.textSecondary} />
                        <Typography
                          variant="bodySmall"
                          weight="regular"
                          style={{ color: isSelected ? theme.colors.primary : theme.colors.textSecondary, marginLeft: 6 }}
                        >
                          {opt.label}
                        </Typography>
                      </TouchableOpacity>
                    );
                  })}
                </View>

                {/* Location */}
                <LabelWithIcon icon={MapPin} label="Current Location" />
                
                <View style={styles.locationModeRow}>
                  <TouchableOpacity 
                    style={[
                      styles.locationModeBtn, 
                      locationMode === 'current' 
                        ? { backgroundColor: theme.colors.primarySoft || '#FFE8D6', borderColor: theme.colors.primary } 
                        : { backgroundColor: theme.colors.surfaceSecondary, borderColor: 'transparent' }
                    ]}
                    onPress={() => {
                      setLocationMode('current');
                      setFormData({ ...formData, locationText: '' });
                    }}
                  >
                    <Navigation size={14} color={locationMode === 'current' ? theme.colors.primary : theme.colors.textSecondary} />
                    <Typography 
                      variant="caption" 
                      weight={locationMode === 'current' ? "bold" : "medium"}
                      style={{ color: locationMode === 'current' ? theme.colors.primary : theme.colors.textSecondary, marginLeft: 6 }}
                    >
                      Auto Detect
                    </Typography>
                  </TouchableOpacity>

                  <TouchableOpacity 
                    style={[
                      styles.locationModeBtn, 
                      locationMode === 'manual' 
                        ? { backgroundColor: theme.colors.primarySoft || '#FFE8D6', borderColor: theme.colors.primary } 
                        : { backgroundColor: theme.colors.surfaceSecondary, borderColor: 'transparent' }
                    ]}
                    onPress={() => {
                      setLocationMode('manual');
                      setFormData({ ...formData, locationText: '' });
                    }}
                  >
                    <MapPin size={14} color={locationMode === 'manual' ? theme.colors.primary : theme.colors.textSecondary} />
                    <Typography 
                      variant="caption" 
                      weight={locationMode === 'manual' ? "bold" : "medium"}
                      style={{ color: locationMode === 'manual' ? theme.colors.primary : theme.colors.textSecondary, marginLeft: 6 }}
                    >
                      Enter Manually
                    </Typography>
                  </TouchableOpacity>
                </View>

                {locationMode === 'current' ? (
                  <TouchableOpacity 
                    style={[
                      styles.locationButton, 
                      { 
                        backgroundColor: theme.colors.background, 
                        borderColor: theme.colors.border, 
                        borderWidth: 1 
                      }
                    ]}
                    onPress={getLocation}
                    disabled={locationLoading}
                  >
                    <View style={styles.locationButtonLeft}>
                      {locationLoading ? (
                         <ActivityIndicator size="small" color={theme.colors.primary} />
                      ) : (
                         <Navigation size={18} color={theme.colors.primary} />
                      )}
                      <Typography 
                        variant="bodySmall" 
                        weight="medium" 
                        style={{ color: locationLoading ? theme.colors.textSecondary : theme.colors.textPrimary, marginLeft: 10 }}
                      >
                        {locationLoading ? "Finding your location..." : (formData.locationText || "Tap to detect location")}
                      </Typography>
                    </View>
                    {!locationLoading && <ArrowLeft size={14} color={theme.colors.textMuted} style={{ transform: [{ rotate: '180deg' }] }} />}
                  </TouchableOpacity>
                ) : (
                  <TextInput
                    placeholder="E.g. New York, USA"
                    value={formData.locationText}
                    onChangeText={(t) => setFormData({ ...formData, locationText: t })}
                    containerStyle={styles.inputMarginReduced}
                  />
                )}

                <View style={styles.hintRow}>
                  <Navigation size={12} color={theme.colors.textMuted} />
                  <Typography variant="caption" color="textMuted" style={styles.hintText}>
                    This helps us show better service providers near you.
                  </Typography>
                </View>

                {/* Trust Badges */}
                <View style={styles.trustBadges}>
                  <View style={[styles.trustBadgeItem, { backgroundColor: theme.colors.surfaceSecondary, borderColor: theme.colors.border }]}>
                    <View style={[styles.trustBadgeIconWrapper, { backgroundColor: theme.colors.background }]}>
                      <ShieldCheck size={20} color={theme.colors.primary} />
                    </View>
                    <Typography variant="caption" weight="medium" style={styles.trustBadgeText}>Secure{'\n'}Data</Typography>
                  </View>
                  <View style={[styles.trustBadgeItem, { backgroundColor: theme.colors.surfaceSecondary, borderColor: theme.colors.border }]}>
                    <View style={[styles.trustBadgeIconWrapper, { backgroundColor: theme.colors.background }]}>
                      <Lock size={20} color={theme.colors.primary} />
                    </View>
                    <Typography variant="caption" weight="medium" style={styles.trustBadgeText}>Privacy{'\n'}First</Typography>
                  </View>
                  <View style={[styles.trustBadgeItem, { backgroundColor: theme.colors.surfaceSecondary, borderColor: theme.colors.border }]}>
                    <View style={[styles.trustBadgeIconWrapper, { backgroundColor: theme.colors.background }]}>
                      <Star size={20} color={theme.colors.primary} />
                    </View>
                    <Typography variant="caption" weight="medium" style={styles.trustBadgeText}>Top{'\n'}Quality</Typography>
                  </View>
                </View>

                {/* Terms and Conditions Checkbox */}
                <TouchableOpacity 
                  style={styles.termsContainer} 
                  onPress={() => setAcceptedTerms(!acceptedTerms)}
                  activeOpacity={0.7}
                >
                  <View style={[
                    styles.checkbox, 
                    acceptedTerms ? { backgroundColor: theme.colors.primary, borderColor: theme.colors.primary } : { borderColor: theme.colors.border, borderWidth: 1 }
                  ]}>
                    {acceptedTerms && <Check size={12} color="#FFF" />}
                  </View>
                  <Typography variant="caption" style={styles.termsText}>
                    I accept the <Typography variant="caption" weight="bold" style={{ color: theme.colors.primary }}>Terms & Conditions</Typography> and <Typography variant="caption" weight="bold" style={{ color: theme.colors.primary }}>Privacy Policy</Typography>.
                  </Typography>
                </TouchableOpacity>

              </View>

              {/* Submit Button */}
              <View style={styles.footer}>
                <Button
                  title="Continue"
                  variant="primary"
                  onPress={handleSubmit}
                  loading={loading}
                  disabled={!formData.fullName || !acceptedTerms}
                  size="large"
                  fullWidth
                />
              </View>

            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
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
  backButtonContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginBottom: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  backButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  headerGraphicCol: {
    width: 120,
    alignItems: 'flex-end',
  },
  idCardFake: {
    width: 100,
    height: 70,
    borderRadius: 12,
    padding: 10,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    transform: [{ rotate: '5deg' }],
  },
  idCardAvatar: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  idCardLines: {
    marginLeft: 10,
    justifyContent: 'center',
    gap: 6,
  },
  idCardLine: {
    height: 4,
    borderRadius: 2,
  },
  idCardCheck: {
    position: 'absolute',
    bottom: -8,
    right: -8,
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFF',
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
  },
  photoUploadSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  photoCircleOuter: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 2,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  photoCircleInner: {
    width: 90,
    height: 90,
    borderRadius: 45,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  addPhotoButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFF',
  },
  photoLabel: {
    marginBottom: 4,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    marginTop: 12,
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
  formFields: {
    flex: 1,
  },
  inputMargin: {
    marginBottom: 0,
  },
  inputMarginReduced: {
    marginBottom: 6,
  },
  hintRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    marginLeft: 4,
  },
  hintText: {
    marginLeft: 6,
    fontSize:12
  },
  genderGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 22,
  },
  genderPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
  },
  locationModeRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  locationModeBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 14,
    borderRadius: 16,
    marginBottom: 8,
  },
  locationButtonLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trustBadges: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 20,
    marginBottom: 20,
  },
  trustBadgeItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderRadius: 16,
    borderWidth: 1,
  },
  trustBadgeIconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  trustBadgeText: {
    textAlign: 'center',
    lineHeight: 16,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    paddingRight: 16,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  termsText: {
    flex: 1,
    lineHeight: 18,
  },
  footer: {
    marginTop: 24,
  },
});
