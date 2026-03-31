import { View, Text, ScrollView, Pressable, StyleSheet, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useColors } from '@/hooks/useColors';

const mockNotifications = [
  { id: '1', type: 'booking_confirmed', title: 'Booking Confirmed', message: 'Your appointment at Luxe Beauty Studio is confirmed for April 5.', time: '2 hours ago', read: false },
  { id: '2', type: 'offer', title: '30% Off Facials', message: 'Limited time offer! Get 30% off all facial treatments this week.', time: '5 hours ago', read: false },
  { id: '3', type: 'booking_reminder', title: 'Appointment Tomorrow', message: 'Reminder: You have an appointment at Radiance Beauty Studio tomorrow at 2 PM.', time: '1 day ago', read: true },
  { id: '4', type: 'new_salon', title: 'New Salon Nearby', message: 'Elite Unisex Salon just opened near you! Check it out.', time: '3 days ago', read: true },
];

const iconForType = (type: string): string => {
  switch (type) {
    case 'booking_confirmed': return 'checkmark-circle';
    case 'booking_reminder': return 'alarm';
    case 'offer': return 'pricetag';
    case 'new_salon': return 'storefront';
    default: return 'notifications';
  }
};

const colorForType = (type: string, colors: any): string => {
  switch (type) {
    case 'booking_confirmed': return colors.success;
    case 'booking_reminder': return colors.warning;
    case 'offer': return colors.brandPrimary;
    case 'new_salon': return colors.iconBlue;
    default: return colors.textTertiary;
  }
};

export default function NotificationsScreen() {
  const router = useRouter();
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === 'web' ? 67 : insets.top;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { paddingTop: topPad + 8 }]}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>Notifications</Text>
        <Pressable>
          <Text style={[styles.markAll, { color: colors.brandPrimary }]}>Mark all read</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 24 }} showsVerticalScrollIndicator={false}>
        {mockNotifications.map((notif, i) => (
          <Animated.View
            key={notif.id}
            entering={FadeInDown.delay(i * 80)}
            style={[
              styles.notifItem,
              { borderBottomColor: colors.borderLight },
              !notif.read && { backgroundColor: colors.primarySubtle },
            ]}
          >
            <View style={[styles.notifIcon, { backgroundColor: colorForType(notif.type, colors) + '20' }]}>
              <Ionicons name={iconForType(notif.type) as any} size={22} color={colorForType(notif.type, colors)} />
            </View>
            <View style={styles.notifContent}>
              <Text style={[styles.notifTitle, { color: colors.textPrimary }]}>{notif.title}</Text>
              <Text style={[styles.notifMessage, { color: colors.textSecondary }]} numberOfLines={2}>{notif.message}</Text>
              <Text style={[styles.notifTime, { color: colors.textTertiary }]}>{notif.time}</Text>
            </View>
            {!notif.read && <View style={[styles.unreadDot, { backgroundColor: colors.brandPrimary }]} />}
          </Animated.View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingBottom: 16 },
  headerTitle: { fontSize: 18, fontFamily: 'Inter_600SemiBold' },
  markAll: { fontSize: 13, fontFamily: 'Inter_600SemiBold' },
  notifItem: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, paddingHorizontal: 20, paddingVertical: 16, borderBottomWidth: 1 },
  notifIcon: { width: 44, height: 44, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  notifContent: { flex: 1 },
  notifTitle: { fontSize: 15, fontFamily: 'Inter_600SemiBold', marginBottom: 4 },
  notifMessage: { fontSize: 13, fontFamily: 'Inter_400Regular', lineHeight: 18, marginBottom: 4 },
  notifTime: { fontSize: 12, fontFamily: 'Inter_400Regular' },
  unreadDot: { width: 8, height: 8, borderRadius: 4, marginTop: 4 },
});
