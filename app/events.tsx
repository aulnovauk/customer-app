import { View, Text, ScrollView, Pressable, StyleSheet, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useColors } from '@/hooks/useColors';

const events = [
  { id: 1, title: 'Summer Beauty Festival', date: 'Apr 15, 2026', location: 'Mumbai Convention Center', description: 'Join us for the biggest beauty event of the season with live demos, workshops, and exclusive offers.', category: 'Festival', color: '#EC4899' },
  { id: 2, title: 'Bridal Makeup Masterclass', date: 'Apr 20, 2026', location: 'Luxe Beauty Studio', description: 'Learn professional bridal makeup techniques from top artists.', category: 'Workshop', color: '#8B5CF6' },
  { id: 3, title: 'Hair Coloring Trends 2026', date: 'Apr 25, 2026', location: 'Divine Hair Lounge', description: 'Discover the latest hair coloring trends and techniques for the new season.', category: 'Workshop', color: '#F59E0B' },
  { id: 4, title: 'Skincare Science Summit', date: 'May 1, 2026', location: 'Online Event', description: 'Expert dermatologists share the latest advances in skincare science.', category: 'Seminar', color: '#10B981' },
];

export default function EventsScreen() {
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
        <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>Events</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 24 }} showsVerticalScrollIndicator={false}>
        {events.map((event, i) => (
          <Animated.View
            key={event.id}
            entering={FadeInDown.delay(i * 100)}
            style={[styles.eventCard, { backgroundColor: colors.surface, borderColor: colors.borderLight }]}
          >
            <View style={[styles.categoryBadge, { backgroundColor: event.color + '20' }]}>
              <Text style={[styles.categoryText, { color: event.color }]}>{event.category}</Text>
            </View>
            <Text style={[styles.eventTitle, { color: colors.textPrimary }]}>{event.title}</Text>
            <Text style={[styles.eventDesc, { color: colors.textSecondary }]} numberOfLines={2}>{event.description}</Text>
            <View style={styles.eventMeta}>
              <View style={styles.metaRow}>
                <Ionicons name="calendar-outline" size={14} color={colors.textTertiary} />
                <Text style={[styles.metaText, { color: colors.textSecondary }]}>{event.date}</Text>
              </View>
              <View style={styles.metaRow}>
                <Ionicons name="location-outline" size={14} color={colors.textTertiary} />
                <Text style={[styles.metaText, { color: colors.textSecondary }]}>{event.location}</Text>
              </View>
            </View>
            <Pressable style={[styles.registerBtn, { borderColor: colors.brandPrimary }]}>
              <Text style={[styles.registerText, { color: colors.brandPrimary }]}>Register</Text>
            </Pressable>
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
  eventCard: { borderRadius: 16, borderWidth: 1, padding: 18, marginBottom: 14 },
  categoryBadge: { alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, marginBottom: 10 },
  categoryText: { fontSize: 12, fontFamily: 'Inter_600SemiBold' },
  eventTitle: { fontSize: 18, fontFamily: 'Inter_700Bold', marginBottom: 6 },
  eventDesc: { fontSize: 14, fontFamily: 'Inter_400Regular', lineHeight: 20, marginBottom: 12 },
  eventMeta: { gap: 6, marginBottom: 14 },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  metaText: { fontSize: 13, fontFamily: 'Inter_400Regular' },
  registerBtn: { paddingVertical: 10, borderRadius: 10, alignItems: 'center', borderWidth: 1.5 },
  registerText: { fontSize: 14, fontFamily: 'Inter_600SemiBold' },
});
