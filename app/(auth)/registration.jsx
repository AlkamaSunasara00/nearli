import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppTheme } from '../../src/hooks/useAppTheme';
import { useAuth } from '../../src/context/AuthContext';
import { Typography } from '../../src/components/ui/Typography';
import { TextInput } from '../../src/components/ui/TextInput';
import { Button } from '../../src/components/ui/Button';

export default function ProviderRegistrationScreen() {
  const { theme } = useAppTheme();
  const router = useRouter();
  const { login } = useAuth();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    businessName: '',
    ownerName: '',
    city: '',
    address: '',
  });

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handleSubmit = async () => {
    setLoading(true);
    // Simulate API delay
    setTimeout(() => {
      setLoading(false);
      login('PROVIDER');
      router.replace('/(provider)/dashboard');
    }, 1500);
  };

  return (
    <KeyboardAvoidingView 
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <Typography variant="h2" weight="bold" color="textPrimary">Register Garage</Typography>
          <Typography variant="bodyMedium" color="textSecondary" style={styles.subtitle}>
            Step {step} of 2
          </Typography>
        </View>

        {step === 1 && (
          <View style={styles.form}>
            <TextInput
              label="Business Name"
              placeholder="e.g. Apex Auto Repairs"
              value={formData.businessName}
              onChangeText={(t) => setFormData({...formData, businessName: t})}
              style={styles.input}
            />
            <TextInput
              label="Owner Name"
              placeholder="Your full name"
              value={formData.ownerName}
              onChangeText={(t) => setFormData({...formData, ownerName: t})}
              style={styles.input}
            />
          </View>
        )}

        {step === 2 && (
          <View style={styles.form}>
            <TextInput
              label="City"
              placeholder="e.g. Mumbai"
              value={formData.city}
              onChangeText={(t) => setFormData({...formData, city: t})}
              style={styles.input}
            />
            <TextInput
              label="Full Address"
              placeholder="Shop number, street, area"
              value={formData.address}
              onChangeText={(t) => setFormData({...formData, address: t})}
              multiline
              style={styles.input}
            />
          </View>
        )}

        <View style={[styles.footer, { borderTopColor: theme.colors.border }]}>
          {step > 1 ? (
            <Button title="Back" variant="outline" onPress={handleBack} style={styles.btn} />
          ) : (
            <Button title="Cancel" variant="ghost" onPress={() => router.back()} style={styles.btn} />
          )}
          
          {step === 2 ? (
            <Button title="Submit" variant="primary" onPress={handleSubmit} loading={loading} style={styles.btn} />
          ) : (
            <Button title="Next" variant="primary" onPress={handleNext} style={styles.btn} />
          )}
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { flexGrow: 1, paddingTop: 80, paddingHorizontal: 24, paddingBottom: 40 },
  header: { marginBottom: 32 },
  subtitle: { marginTop: 8 },
  form: { flex: 1 },
  input: { marginBottom: 20 },
  footer: { flexDirection: 'row', paddingTop: 24, gap: 16, borderTopWidth: 1 },
  btn: { flex: 1 },
});
