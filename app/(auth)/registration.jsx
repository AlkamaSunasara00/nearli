import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import * as Location from 'expo-location';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ArrowLeft, Camera, MapPin, User, Mail, Users, Plus, ShieldCheck, Lock, Star, EyeOff, Navigation, Check } from 'lucide-react-native';
import { useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
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
  const { login } = useAuth();
  const insets = useSafeAreaInsets();
  const [loading, setLoading] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);

  const [formData, setFormData] = useState({
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
      <Typography variant="bodyMedium" weight="bold" style={styles.labelText}>
        {label} {required && <Typography style={{ color: theme.colors.danger }}>*</Typography>}
      </Typography>
    </View>
  );

  return (
    <View style={styles.mainContainer}>
      <StatusBar style="dark" backgroundColor="transparent" />
      
      {/* Top Gradient Background */}
      <LinearGradient
        colors={['#FFD1B3', '#FFF1E6', theme.colors.background]}
        locations={[0, 0.4, 0.7]}
        style={StyleSheet.absoluteFillObject}
      />

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
                  <Navigation size={12} color={theme.colors.textMuted} />
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
                        <IconComp size={16} color={isSelected ? theme.colors.primary : theme.colors.textSecondary} />
                        <Typography
                          variant="bodySmall"
                          weight={isSelected ? "bold" : "medium"}
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
                <TouchableOpacity 
                  style={[
                    styles.locationButton, 
                    { 
                      backgroundColor: theme.colors.primarySoft || '#FFE8D6', 
                      borderColor: theme.colors.primary, 
                      borderWidth: 1 
                    }
                  ]}
                  onPress={getLocation}
                >
                  <View style={styles.locationButtonLeft}>
                    <Navigation size={20} color={theme.colors.primary} />
                    <Typography 
                      variant="bodyMedium" 
                      weight="bold" 
                      style={{ color: theme.colors.primary, marginLeft: 12 }}
                    >
                      {formData.locationText || "Use Current Location"}
                    </Typography>
                  </View>
                  <ArrowLeft size={16} color={theme.colors.primary} style={{ transform: [{ rotate: '180deg' }] }} />
                </TouchableOpacity>
                <View style={styles.hintRow}>
                  <Navigation size={12} color={theme.colors.textMuted} />
                  <Typography variant="caption" color="textMuted" style={styles.hintText}>
                    This helps us show better service providers near you.
                  </Typography>
                </View>

                {/* Trust Badges */}
                <View style={[styles.trustBadges, { backgroundColor: theme.colors.surfaceSecondary }]}>
                  <View style={styles.trustBadgeItem}>
                    <ShieldCheck size={24} color={theme.colors.primary} />
                    <Typography variant="caption" weight="medium" style={styles.trustBadgeText}>Your data{'\n'}is secure</Typography>
                  </View>
                  <View style={[styles.trustBadgeDivider, { backgroundColor: theme.colors.border }]} />
                  <View style={styles.trustBadgeItem}>
                    <Lock size={24} color={theme.colors.primary} />
                    <Typography variant="caption" weight="medium" style={styles.trustBadgeText}>We respect{'\n'}your privacy</Typography>
                  </View>
                  <View style={[styles.trustBadgeDivider, { backgroundColor: theme.colors.border }]} />
                  <View style={styles.trustBadgeItem}>
                    <Star size={24} color={theme.colors.primary} />
                    <Typography variant="caption" weight="medium" style={styles.trustBadgeText}>Better{'\n'}experience for you</Typography>
                  </View>
                </View>

              </View>

              {/* Submit Button */}
              <View style={styles.footer}>
                <Button
                  title="Continue"
                  variant="primary"
                  onPress={handleSubmit}
                  loading={loading}
                  disabled={!formData.fullName}
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
    fontSize: 24,
    lineHeight: 30,
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
    marginBottom: 8,
    marginTop: 16,
  },
  labelIconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  labelText: {
    fontSize: 16,
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
  },
  genderGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 8,
  },
  genderPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 24,
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 24,
    marginBottom: 8,
  },
  locationButtonLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trustBadges: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginTop: 24,
    marginBottom: 16,
  },
  trustBadgeItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trustBadgeDivider: {
    width: 1,
    height: 30,
  },
  trustBadgeText: {
    textAlign: 'center',
    marginTop: 8,
  },
  footer: {
    marginTop: 24,
  },
});
