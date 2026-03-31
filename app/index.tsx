import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getFlag, KEYS } from '@/lib/storage';

export default function SplashScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isReady) return;

    (async () => {
      const onboardingDone = await getFlag(KEYS.ONBOARDING_COMPLETED);
      const geoDone = await getFlag(KEYS.GEOLOCATION_PERMISSION);
      const notifDone = await getFlag(KEYS.NOTIFICATION_PERMISSION);
      const brandDone = await getFlag(KEYS.BRAND_INTRO_SHOWN);

      if (!onboardingDone) {
        router.replace('/onboarding');
      } else if (!geoDone) {
        router.replace('/geolocation');
      } else if (!notifDone) {
        router.replace('/notifications-setup');
      } else if (!brandDone) {
        router.replace('/brand-intro');
      } else {
        router.replace('/(tabs)');
      }
    })();
  }, [isReady, router]);

  const topPad = Platform.OS === 'web' ? 67 : 0;

  return (
    <View style={[styles.container, { paddingTop: insets.top + topPad }]}>
      <Text style={styles.title}>Beauté</Text>
      <Text style={styles.subtitle}>LUXURY BEAUTY</Text>
      <Text style={styles.loading}>Loading...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E85A8B',
  },
  title: {
    fontSize: 38,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 3,
    textAlign: 'center',
  },
  loading: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 14,
    marginTop: 32,
  },
});
