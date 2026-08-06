import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppTheme } from '../../src/hooks/useAppTheme';
import { useAppContext } from '../../src/context/AppContext';
import { Typography } from '../../src/components/ui/Typography';
import { TextInput } from '../../src/components/ui/TextInput';
import { Button } from '../../src/components/ui/Button';
import { IconButton } from '../../src/components/ui/IconButton';
import { ArrowLeft } from 'lucide-react-native';

export default function EditBusinessScreen() {
  const { theme } = useAppTheme();
  const router = useRouter();
  const { garages, updateProviderGarage } = useAppContext();
  
  const garage = garages[0];
  
  const [formData, setFormData] = useState({
    name: garage.name,
    area: garage.area,
    description: garage.description,
  });

  const handleSave = () => {
    updateProviderGarage(garage.id, formData);
    router.back();
  };

  return (
    <KeyboardAvoidingView 
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={[styles.header, { borderBottomColor: theme.colors.border }]}>
        <IconButton icon={<ArrowLeft size={24} color={theme.colors.textPrimary} />} onPress={() => router.back()} />
        <Typography variant="h3" weight="bold" color="textPrimary" style={styles.title}>
          Business Information
        </Typography>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <TextInput
          label="Garage Name"
          value={formData.name}
          onChangeText={(t) => setFormData({...formData, name: t})}
          style={styles.input}
        />
        <TextInput
          label="Location Area"
          value={formData.area}
          onChangeText={(t) => setFormData({...formData, area: t})}
          style={styles.input}
        />
        <TextInput
          label="Description"
          value={formData.description}
          onChangeText={(t) => setFormData({...formData, description: t})}
          multiline
          style={styles.input}
        />
      </ScrollView>

      <View style={[styles.footer, { borderTopColor: theme.colors.border }]}>
        <Button title="Save Changes" variant="primary" onPress={handleSave} fullWidth />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingTop: 60, paddingBottom: 16, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1 },
  title: { marginLeft: 16 },
  content: { padding: 24 },
  input: { marginBottom: 24 },
  footer: { padding: 24, borderTopWidth: 1 },
});
