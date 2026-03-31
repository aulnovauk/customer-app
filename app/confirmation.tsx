import { View, Text, Pressable, StyleSheet, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInUp, FadeInDown, BounceIn } from 'react-native-reanimated';
import { useColors } from '@/hooks/useColors';
import { gradientColors } from '@/constants/colors';

export default function ConfirmationScreen() {
  const router = useRouter();
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === 'web' ? 67 : insets.top;

  return (
    <View style={[styles.container, { backgroundColor: colors.background, paddingTop: topPad }]}>
      <View style={styles.content}>
        <Animated.View entering={BounceIn.delay(300)} style={styles.checkContainer}>
          <LinearGradient colors={[...gradientColors.success]} style={styles.checkCircle}>
            <Ionicons name="checkmark" size={48} color="#FFF" />
          </LinearGradient>
        </Animated.View>

        <Animated.Text entering={FadeInUp.delay(500)} style={[styles.title, { color: colors.textPrimary }]}>
          Booking Confirmed!
        </Animated.Text>
        <Animated.Text entering={FadeInUp.delay(600)} style={[styles.subtitle, { color: colors.textSecondary }]}>
          Your appointment has been successfully booked
        </Animated.Text>

        <Animated.View entering={FadeInUp.delay(700)} style={[styles.detailsCard, { backgroundColor: colors.surface, borderColor: colors.borderLight }]}>
          <Text style={[styles.refLabel, { color: colors.textTertiary }]}>Booking Reference</Text>
          <Text style={[styles.refNumber, { color: colors.brandPrimary }]}>#BK-2026-0405</Text>
          <View style={[styles.divider, { backgroundColor: colors.borderLight }]} />
          <View style={styles.detailRow}>
            <Ionicons name="business" size={18} color={colors.textTertiary} />
            <Text style={[styles.detailText, { color: colors.textPrimary }]}>Luxe Beauty Studio</Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons name="cut" size={18} color={colors.textTertiary} />
            <Text style={[styles.detailText, { color: colors.textPrimary }]}>Haircut & Styling</Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons name="calendar" size={18} color={colors.textTertiary} />
            <Text style={[styles.detailText, { color: colors.textPrimary }]}>April 5, 2026 at 10:00 AM</Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons name="person" size={18} color={colors.textTertiary} />
            <Text style={[styles.detailText, { color: colors.textPrimary }]}>Priya S.</Text>
          </View>
          <View style={[styles.divider, { backgroundColor: colors.borderLight }]} />
          <View style={styles.totalRow}>
            <Text style={[styles.totalLabel, { color: colors.textPrimary }]}>Amount Paid</Text>
            <Text style={[styles.totalValue, { color: colors.brandPrimary }]}>{'\u20B9'}1,416</Text>
          </View>
        </Animated.View>
      </View>

      <Animated.View entering={FadeInDown.delay(900)} style={[styles.bottomActions, { paddingBottom: insets.bottom + 24 }]}>
        <Pressable onPress={() => router.replace('/(tabs)')}>
          <LinearGradient colors={['#FF1B8D', '#E85A8B']} style={styles.homeBtn}>
            <Ionicons name="home" size={20} color="#FFF" />
            <Text style={styles.homeText}>Back to Home</Text>
          </LinearGradient>
        </Pressable>
        <Pressable style={[styles.bookingsBtn, { borderColor: colors.brandPrimary }]} onPress={() => router.replace('/(tabs)/bookings')}>
          <Text style={[styles.bookingsText, { color: colors.brandPrimary }]}>View My Bookings</Text>
        </Pressable>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 24 },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  checkContainer: { marginBottom: 24 },
  checkCircle: { width: 96, height: 96, borderRadius: 48, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 26, fontFamily: 'Inter_700Bold', marginBottom: 8, textAlign: 'center' },
  subtitle: { fontSize: 15, fontFamily: 'Inter_400Regular', textAlign: 'center', marginBottom: 32 },
  detailsCard: { borderWidth: 1, borderRadius: 16, padding: 20, alignSelf: 'stretch' },
  refLabel: { fontSize: 12, fontFamily: 'Inter_400Regular', textAlign: 'center' },
  refNumber: { fontSize: 20, fontFamily: 'Inter_700Bold', textAlign: 'center', marginTop: 4, marginBottom: 4 },
  divider: { height: 1, marginVertical: 14 },
  detailRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 10 },
  detailText: { fontSize: 15, fontFamily: 'Inter_500Medium' },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  totalLabel: { fontSize: 16, fontFamily: 'Inter_600SemiBold' },
  totalValue: { fontSize: 22, fontFamily: 'Inter_700Bold' },
  bottomActions: { gap: 12 },
  homeBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 16, borderRadius: 14 },
  homeText: { color: '#FFF', fontSize: 16, fontFamily: 'Inter_600SemiBold' },
  bookingsBtn: { paddingVertical: 14, borderRadius: 14, alignItems: 'center', borderWidth: 1.5 },
  bookingsText: { fontSize: 16, fontFamily: 'Inter_600SemiBold' },
});
