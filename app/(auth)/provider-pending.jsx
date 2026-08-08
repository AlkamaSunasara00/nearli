import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Typography } from '../../src/components/ui/Typography';
import { Button } from '../../src/components/ui/Button';
import { useAppTheme } from '../../src/hooks/useAppTheme';
import { CheckCircle2, Clock } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProviderPendingScreen() {
  const { theme } = useAppTheme();
  const router = useRouter();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Clock size={80} color={theme.colors.primary} />
          <View style={[styles.checkBadge, { backgroundColor: theme.colors.background }]}>
            <CheckCircle2 size={32} color="#4CAF50" fill="#E8F5E9" />
          </View>
        </View>
        
        <Typography variant="h2" weight="bold" style={styles.title}>
          Application Submitted!
        </Typography>
        
        <Typography variant="bodyLarge" color="textSecondary" style={styles.subtitle}>
          Your request to become a provider is now pending approval.
        </Typography>
        
        <View style={[styles.infoBox, { backgroundColor: theme.colors.surfaceSecondary }]}>
          <Typography variant="bodyMedium" color="textPrimary" style={{ textAlign: 'center', lineHeight: 22 }}>
            Our team is reviewing your details. This usually takes 24-48 hours. We'll notify you once you're approved to start taking jobs.
          </Typography>
        </View>
      </View>

      <View style={styles.footer}>
        <Button 
          title="Back to Home" 
          variant="primary" 
          size="large" 
          fullWidth 
          onPress={() => router.replace('/')} 
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  iconContainer: {
    marginBottom: 32,
    position: 'relative',
  },
  checkBadge: {
    position: 'absolute',
    bottom: -5,
    right: -5,
    borderRadius: 16,
    padding: 2,
  },
  title: {
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  infoBox: {
    padding: 20,
    borderRadius: 16,
    width: '100%',
  },
  footer: {
    padding: 24,
  }
});
