import { useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useColors } from '@/hooks/useColors';
import type { Booking } from '@/types';

const mockBookings: Booking[] = [
  { id: '1', salonId: 1, salonName: 'Luxe Beauty Studio', service: 'Haircut & Styling', stylist: 'Priya Sharma', date: '2026-04-05', time: '10:00 AM', duration: '45 min', price: 1200, status: 'upcoming' },
  { id: '2', salonId: 7, salonName: 'Radiance Beauty Studio', service: 'Facial Treatment', stylist: 'Anita Desai', date: '2026-04-08', time: '2:00 PM', duration: '60 min', price: 1800, status: 'upcoming' },
  { id: '3', salonId: 2, salonName: 'Serenity Spa & Salon', service: 'Full Body Massage', date: '2026-03-20', time: '11:00 AM', duration: '90 min', price: 2500, status: 'completed' },
  { id: '4', salonId: 4, salonName: 'Glamour Nails Studio', service: 'Gel Manicure', date: '2026-03-15', time: '3:00 PM', duration: '40 min', price: 800, status: 'completed' },
];

export default function BookingsScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const [tab, setTab] = useState<'upcoming' | 'past'>('upcoming');
  const topPad = Platform.OS === 'web' ? 67 : insets.top;

  const upcoming = mockBookings.filter((b) => b.status === 'upcoming');
  const past = mockBookings.filter((b) => b.status === 'completed' || b.status === 'cancelled');
  const displayBookings = tab === 'upcoming' ? upcoming : past;

  const statusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return colors.brandPrimary;
      case 'completed': return colors.success;
      case 'cancelled': return colors.error;
      default: return colors.textTertiary;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={{ paddingTop: topPad + 8, paddingBottom: 24 }} showsVerticalScrollIndicator={false}>
        <View style={styles.padded}>
          <Text style={[styles.pageTitle, { color: colors.textPrimary }]}>My Bookings</Text>

          <View style={[styles.tabRow, { backgroundColor: colors.primarySubtle }]}>
            {(['upcoming', 'past'] as const).map((t) => (
              <Pressable
                key={t}
                style={[styles.tab, tab === t && { backgroundColor: colors.brandPrimary }]}
                onPress={() => setTab(t)}
              >
                <Text style={[styles.tabText, { color: tab === t ? '#FFF' : colors.brandPrimary }]}>
                  {t === 'upcoming' ? 'Upcoming' : 'Past'}
                </Text>
              </Pressable>
            ))}
          </View>

          {displayBookings.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="calendar-outline" size={48} color={colors.textDisabled} />
              <Text style={[styles.emptyText, { color: colors.textTertiary }]}>
                No {tab} bookings
              </Text>
            </View>
          ) : (
            displayBookings.map((booking, i) => (
              <Animated.View
                key={booking.id}
                entering={FadeInDown.delay(i * 100)}
                style={[styles.bookingCard, { backgroundColor: colors.surface, borderColor: colors.borderLight }]}
              >
                <View style={styles.bookingHeader}>
                  <View style={[styles.statusBadge, { backgroundColor: statusColor(booking.status) + '20' }]}>
                    <Text style={[styles.statusText, { color: statusColor(booking.status) }]}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </Text>
                  </View>
                  <Text style={[styles.bookingId, { color: colors.textTertiary }]}>#{booking.id}</Text>
                </View>
                <Text style={[styles.salonName, { color: colors.textPrimary }]}>{booking.salonName}</Text>
                <Text style={[styles.serviceName, { color: colors.textSecondary }]}>{booking.service}</Text>
                <View style={styles.bookingDetails}>
                  <View style={styles.detailRow}>
                    <Ionicons name="calendar-outline" size={14} color={colors.textTertiary} />
                    <Text style={[styles.detailText, { color: colors.textSecondary }]}>{booking.date}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Ionicons name="time-outline" size={14} color={colors.textTertiary} />
                    <Text style={[styles.detailText, { color: colors.textSecondary }]}>{booking.time}</Text>
                  </View>
                  <Text style={[styles.price, { color: colors.brandPrimary }]}>{'\u20B9'}{booking.price}</Text>
                </View>
                {booking.status === 'upcoming' && (
                  <View style={styles.actions}>
                    <Pressable style={[styles.actionBtn, { borderColor: colors.error }]}>
                      <Text style={[styles.actionText, { color: colors.error }]}>Cancel</Text>
                    </Pressable>
                    <Pressable style={[styles.actionBtn, { backgroundColor: colors.brandPrimary }]}>
                      <Text style={[styles.actionText, { color: '#FFF' }]}>Reschedule</Text>
                    </Pressable>
                  </View>
                )}
              </Animated.View>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  padded: { paddingHorizontal: 20 },
  pageTitle: { fontSize: 28, fontFamily: 'Inter_700Bold', marginBottom: 16 },
  tabRow: { flexDirection: 'row', borderRadius: 12, padding: 4, marginBottom: 20 },
  tab: { flex: 1, paddingVertical: 10, borderRadius: 10, alignItems: 'center' },
  tabText: { fontSize: 14, fontFamily: 'Inter_600SemiBold' },
  emptyState: { alignItems: 'center', paddingTop: 60, gap: 12 },
  emptyText: { fontSize: 16, fontFamily: 'Inter_500Medium' },
  bookingCard: { borderRadius: 16, borderWidth: 1, padding: 16, marginBottom: 14 },
  bookingHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  statusText: { fontSize: 12, fontFamily: 'Inter_600SemiBold' },
  bookingId: { fontSize: 12, fontFamily: 'Inter_400Regular' },
  salonName: { fontSize: 16, fontFamily: 'Inter_600SemiBold', marginBottom: 4 },
  serviceName: { fontSize: 14, fontFamily: 'Inter_400Regular', marginBottom: 10 },
  bookingDetails: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  detailRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  detailText: { fontSize: 13, fontFamily: 'Inter_400Regular' },
  price: { fontSize: 16, fontFamily: 'Inter_700Bold', marginLeft: 'auto' },
  actions: { flexDirection: 'row', gap: 10, marginTop: 14 },
  actionBtn: { flex: 1, paddingVertical: 10, borderRadius: 10, alignItems: 'center', borderWidth: 1, borderColor: 'transparent' },
  actionText: { fontSize: 14, fontFamily: 'Inter_600SemiBold' },
});
