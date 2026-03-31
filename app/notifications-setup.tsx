import { View, Text, Pressable, StyleSheet, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Notifications from 'expo-notifications';
import { setFlag, KEYS } from '@/lib/storage';
import { useColors } from '@/hooks/useColors';
import { gradientColors } from '@/constants/colors';

export default function NotificationSetupScreen() {
  const router = useRouter();
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === 'web' ? 67 : insets.top;

  const handleAllow = async () => {
    if (Platform.OS !== 'web') {
      await Notifications.requestPermissionsAsync();
    }
    await setFlag(KEYS.NOTIFICATION_PERMISSION, true);
    router.replace('/brand-intro');
  };

  const handleSkip = async () => {
    await setFlag(KEYS.NOTIFICATION_PERMISSION, true);
    router.replace('/brand-intro');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background, paddingTop: topPad }]}>
      <Pressable style={styles.skipButton} onPress={handleSkip}>
        <Text style={[styles.skipText, { color: colors.textTertiary }]}>Skip</Text>
      </Pressable>

      <View style={styles.content}>
        <Animated.View entering={FadeInUp.delay(200)} style={styles.iconContainer}>
          <LinearGradient colors={[...gradientColors.slideLuxury]} style={styles.iconCircle}>
            <Ionicons name="notifications" size={48} color="#FFF" />
          </LinearGradient>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(400)}>
          <Text style={[styles.title, { color: colors.textPrimary }]}>Stay in the loop</Text>
          <Text style={[styles.description, { color: colors.textSecondary }]}>
            Get notified about booking confirmations, special offers, and appointment reminders
          </Text>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(600)} style={styles.features}>
          {[
            { icon: 'checkmark-circle' as const, text: 'Booking confirmations', color: colors.success },
            { icon: 'pricetag' as const, text: 'Exclusive offers & deals', color: colors.brandPrimary },
            { icon: 'alarm' as const, text: 'Appointment reminders', color: colors.warning },
          ].map((feature, i) => (
            <View key={i} style={styles.featureRow}>
              <Ionicons name={feature.icon} size={22} color={feature.color} />
              <Text style={[styles.featureText, { color: colors.textPrimary }]}>{feature.text}</Text>
            </View>
          ))}
        </Animated.View>
      </View>

      <Animated.View entering={FadeInUp.delay(800)} style={[styles.bottomActions, { paddingBottom: insets.bottom + 24 }]}>
        <Pressable onPress={handleAllow}>
          <LinearGradient colors={[...gradientColors.slideLuxury]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.allowButton}>
            <Ionicons name="notifications" size={20} color="#FFF" />
            <Text style={styles.allowText}>Enable Notifications</Text>
          </LinearGradient>
        </Pressable>
        <Pressable onPress={handleSkip} style={styles.notNowButton}>
          <Text style={[styles.notNowText, { color: colors.textTertiary }]}>Not Now</Text>
        </Pressable>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 24 },
  skipButton: { alignSelf: 'flex-end', padding: 12 },
  skipText: { fontSize: 15, fontFamily: 'Inter_600SemiBold' },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  iconContainer: { marginBottom: 40, alignItems: 'center' },
  iconCircle: {
    width: 100, height: 100, borderRadius: 50,
    justifyContent: 'center', alignItems: 'center',
    boxShadow: '0px 8px 24px rgba(232, 90, 139, 0.3)', elevation: 8,
  },
  title: { fontSize: 28, fontFamily: 'Inter_700Bold', textAlign: 'center', marginBottom: 12 },
  description: { fontSize: 15, fontFamily: 'Inter_400Regular', textAlign: 'center', lineHeight: 22, paddingHorizontal: 16 },
  features: { marginTop: 32, gap: 16, alignSelf: 'stretch', paddingHorizontal: 16 },
  featureRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  featureText: { fontSize: 15, fontFamily: 'Inter_500Medium' },
  bottomActions: { gap: 12 },
  allowButton: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8, paddingVertical: 16, borderRadius: 16,
  },
  allowText: { color: '#FFF', fontSize: 16, fontFamily: 'Inter_600SemiBold' },
  notNowButton: { alignItems: 'center', paddingVertical: 12 },
  notNowText: { fontSize: 15, fontFamily: 'Inter_500Medium' },
});
