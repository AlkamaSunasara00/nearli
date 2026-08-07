import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Camera, MapPin, ArrowLeft } from 'lucide-react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { useAppTheme } from '../../src/hooks/useAppTheme';
import { useAuth } from '../../src/hooks/useAuth';
import { Typography } from '../../src/components/ui/Typography';
import { TextInput } from '../../src/components/ui/TextInput';
import { Button } from '../../src/components/ui/Button';

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

  const genderOptions = ['Male', 'Female', 'Other', 'Prefer not to say'];

  const handleSubmit = async () => {
    setLoading(true);
    // Simulate API delay
    setTimeout(() => {
      setLoading(false);
      login('CUSTOMER');
      router.replace('/(customer)/home');
    }, 1500);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }} edges={['top', 'bottom', 'left', 'right']}>
      <StatusBar style="light" backgroundColor={theme.colors.primary} />
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, height: insets.top, backgroundColor: theme.colors.primary, zIndex: 10 }} />
      
      <View style={[styles.headerBar, { backgroundColor: theme.colors.background }]}>
        <TouchableOpacity onPress={() => router.back()} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <ArrowLeft size={24} color={theme.colors.textPrimary} />
        </TouchableOpacity>
        <Typography variant="h3" weight="bold" style={styles.headerTitle}>Complete Your Profile</Typography>
        <View style={{ width: 24 }} />
      </View>

      <KeyboardAvoidingView 
        style={[styles.container, { backgroundColor: theme.colors.background }]}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          {/* <View style={styles.header}>
            <Typography variant="display" weight="bold" color="textPrimary" style={{marginBottom: 8}}>Getting Started</Typography>
            <Typography variant="bodyMedium" color="textSecondary">
              Seems you are new here. Let's set up your profile.
            </Typography>
          </View> */}

          {/* Profile Photo */}
          <View style={styles.photoSection}>
            <TouchableOpacity onPress={pickImage} style={[styles.photoPlaceholder, { backgroundColor: theme.colors.surfaceSecondary }]}>
              {formData.photoUri ? (
                <Image source={{ uri: formData.photoUri }} style={{ width: 100, height: 100, borderRadius: 50 }} />
              ) : (
                <Camera size={32} color={theme.colors.textMuted} />
              )}
            </TouchableOpacity>
            <Typography variant="caption" color="textMuted" style={{ marginTop: 8 }}>Profile Photo (Optional)</Typography>
          </View>

          <View style={styles.form}>
            <TextInput
              label="Full Name *"
              placeholder="e.g. John Doe"
              value={formData.fullName}
              onChangeText={(t) => setFormData({...formData, fullName: t})}
            />
            
            <TextInput
              label="Email (Optional)"
              placeholder="john@example.com"
              value={formData.email}
              onChangeText={(t) => setFormData({...formData, email: t})}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Typography variant="caption" color="textMuted" style={{ marginTop: -12, marginBottom: 24, marginLeft: 4 }}>
              Useful for invoices and future features.
            </Typography>

            {/* Gender Selection */}
            <Typography variant="bodyMedium" weight="bold" color="textPrimary" style={{ marginBottom: 12, marginLeft: 4 }}>
              Gender (Optional)
            </Typography>
            <View style={styles.genderContainer}>
              {genderOptions.map((g) => (
                <TouchableOpacity
                  key={g}
                  style={[
                    styles.genderPill,
                    { 
                      backgroundColor: theme.colors.surfaceSecondary,
                      borderColor: formData.gender === g ? theme.colors.primary : 'transparent',
                      borderWidth: formData.gender === g ? 0 : 1,
                      overflow: 'hidden'
                    }
                  ]}
                  onPress={() => setFormData({...formData, gender: g})}
                >
                  {formData.gender === g && (
                    <LinearGradient
                      colors={[theme.colors.primary, theme.colors.primarySoft || '#FFC499']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={StyleSheet.absoluteFill}
                    />
                  )}
                  <Typography 
                    variant="bodyMedium" 
                    weight={formData.gender === g ? "bold" : "medium"}
                    style={{ color: formData.gender === g ? '#FFFFFF' : theme.colors.textSecondary, zIndex: 1 }}
                  >
                    {g}
                  </Typography>
                </TouchableOpacity>
              ))}
            </View>

            {/* Current Location */}
            <Typography variant="bodyMedium" weight="bold" color="textPrimary" style={{ marginTop: 12, marginBottom: 12, marginLeft: 4 }}>
              Current Location
            </Typography>
            <Button 
              title={formData.locationText || "Use Current Location"} 
              variant={formData.locationText ? "secondary" : "outline"} 
              leftIcon={<MapPin size={20} color={theme.colors.primary} />}
              onPress={getLocation}
              loading={locationLoading}
              style={{ marginBottom: 12 }}
            />
          </View>

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
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 18,
  },
  scroll: { flexGrow: 1, paddingHorizontal: 24, paddingBottom: 40 },
  header: { marginBottom: 32, marginTop: 16 },
  photoSection: { alignItems: 'center', marginBottom: 32 },
  photoPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: { flex: 1 },
  genderContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  genderPill: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 24,
  },
  footer: { paddingTop: 24 },
});
