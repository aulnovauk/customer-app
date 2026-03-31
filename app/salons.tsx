import { useState, useMemo } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, Platform } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useColors } from '@/hooks/useColors';
import { SalonCard } from '@/components/SalonCard';
import { allSalons } from '@/data/salons';

type SortOption = 'distance' | 'rating' | 'price';

export default function SalonsListScreen() {
  const router = useRouter();
  const { category } = useLocalSearchParams<{ category?: string }>();
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const [sortBy, setSortBy] = useState<SortOption>('distance');
  const topPad = Platform.OS === 'web' ? 67 : insets.top;

  const filtered = useMemo(() => {
    let salons = [...allSalons];
    if (category) {
      salons = salons.filter((s) => s.services.some((sv) => sv.toLowerCase().includes(category.toLowerCase())) || s.category.toLowerCase().includes(category.toLowerCase()));
    }
    switch (sortBy) {
      case 'rating': salons.sort((a, b) => b.rating - a.rating); break;
      case 'price': salons.sort((a, b) => parseInt(a.price.replace(/[^\d]/g, '')) - parseInt(b.price.replace(/[^\d]/g, ''))); break;
      default: salons.sort((a, b) => a.distanceKm - b.distanceKm);
    }
    return salons;
  }, [category, sortBy]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { paddingTop: topPad + 8 }]}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>{category || 'All Salons'}</Text>
        <Pressable onPress={() => router.push('/map')}>
          <Ionicons name="map-outline" size={22} color={colors.brandPrimary} />
        </Pressable>
      </View>

      <View style={styles.sortRow}>
        {(['distance', 'rating', 'price'] as SortOption[]).map((opt) => (
          <Pressable
            key={opt}
            style={[styles.sortChip, { backgroundColor: sortBy === opt ? colors.brandPrimary : colors.primarySubtle }]}
            onPress={() => setSortBy(opt)}
          >
            <Text style={[styles.sortText, { color: sortBy === opt ? '#FFF' : colors.brandPrimary }]}>
              {opt.charAt(0).toUpperCase() + opt.slice(1)}
            </Text>
          </Pressable>
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
        {filtered.map((salon, i) => (
          <Animated.View key={salon.id} entering={FadeInDown.delay(i * 60)}>
            <SalonCard salon={salon} onPress={() => router.push(`/salon/${salon.id}`)} />
          </Animated.View>
        ))}
        {filtered.length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons name="search-outline" size={48} color={colors.textDisabled} />
            <Text style={[styles.emptyText, { color: colors.textTertiary }]}>No salons found</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingBottom: 12 },
  headerTitle: { fontSize: 18, fontFamily: 'Inter_600SemiBold' },
  sortRow: { flexDirection: 'row', gap: 8, paddingHorizontal: 20, marginBottom: 16 },
  sortChip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 10 },
  sortText: { fontSize: 13, fontFamily: 'Inter_600SemiBold' },
  list: { paddingHorizontal: 20, paddingBottom: 24 },
  emptyState: { alignItems: 'center', paddingTop: 60, gap: 12 },
  emptyText: { fontSize: 16, fontFamily: 'Inter_500Medium' },
});
