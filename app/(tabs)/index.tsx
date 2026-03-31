import { useState, useMemo, useCallback } from 'react';
import { View, Text, Pressable, ScrollView, TextInput, FlatList, StyleSheet, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useColors } from '@/hooks/useColors';
import { SalonCard } from '@/components/SalonCard';
import { allSalons, RADIUS_OPTIONS } from '@/data/salons';
import type { SalonGender } from '@/types';

type GenderFilter = 'women' | 'men';

const categories: Record<GenderFilter, { name: string; icon: string }[]> = {
  women: [
    { name: 'Haircut', icon: 'cut' },
    { name: 'Facial', icon: 'sparkles' },
    { name: 'Manicure', icon: 'hand-left' },
    { name: 'Pedicure', icon: 'footsteps' },
    { name: 'Nail Art', icon: 'color-palette' },
    { name: 'Hair Coloring', icon: 'brush' },
    { name: 'Cleanup', icon: 'water' },
    { name: 'Massage', icon: 'fitness' },
    { name: 'Makeup', icon: 'flower' },
  ],
  men: [
    { name: 'Haircut', icon: 'cut' },
    { name: 'Facial', icon: 'sparkles' },
    { name: 'Beard Grooming', icon: 'man' },
    { name: 'Cleanup', icon: 'water' },
    { name: 'Massage', icon: 'fitness' },
    { name: 'Hair Coloring', icon: 'brush' },
    { name: 'Manicure', icon: 'hand-left' },
    { name: 'Pedicure', icon: 'footsteps' },
  ],
};

export default function HomeScreen() {
  const router = useRouter();
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const [gender, setGender] = useState<GenderFilter>('women');
  const [searchText, setSearchText] = useState('');
  const [selectedRadius, setSelectedRadius] = useState(5);
  const topPad = Platform.OS === 'web' ? 67 : insets.top;

  const filteredSalons = useMemo(() => {
    return allSalons.filter((s) => {
      const matchGender = s.genderType === gender || s.genderType === 'unisex';
      const matchSearch = !searchText || s.name.toLowerCase().includes(searchText.toLowerCase());
      const matchRadius = s.distanceKm <= selectedRadius;
      return matchGender && matchSearch && matchRadius;
    });
  }, [gender, searchText, selectedRadius]);

  const trendingSalons = useMemo(() => filteredSalons.filter((s) => s.trending), [filteredSalons]);
  const nearbySalons = useMemo(() => [...filteredSalons].sort((a, b) => a.distanceKm - b.distanceKm).slice(0, 6), [filteredSalons]);

  const handleSalonPress = useCallback((id: number) => {
    router.push(`/salon/${id}`);
  }, [router]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{ paddingTop: topPad + 8, paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View>
            <Text style={[styles.greeting, { color: colors.textSecondary }]}>Good morning</Text>
            <View style={styles.locationRow}>
              <Ionicons name="location" size={16} color={colors.brandPrimary} />
              <Text style={[styles.location, { color: colors.textPrimary }]}>Mumbai, India</Text>
              <Ionicons name="chevron-down" size={14} color={colors.textTertiary} />
            </View>
          </View>
          <View style={styles.headerActions}>
            <Pressable
              style={[styles.iconButton, { backgroundColor: colors.primarySubtle }]}
              onPress={() => router.push('/notifications')}
            >
              <Ionicons name="notifications-outline" size={22} color={colors.brandPrimary} />
            </Pressable>
          </View>
        </View>

        <View style={[styles.searchBar, { backgroundColor: colors.surfaceElevated, borderColor: colors.borderLight }]}>
          <Ionicons name="search" size={20} color={colors.textTertiary} />
          <TextInput
            style={[styles.searchInput, { color: colors.textPrimary }]}
            placeholder="Search salons, services..."
            placeholderTextColor={colors.textTertiary}
            value={searchText}
            onChangeText={setSearchText}
          />
          {searchText.length > 0 && (
            <Pressable onPress={() => setSearchText('')}>
              <Ionicons name="close-circle" size={18} color={colors.textTertiary} />
            </Pressable>
          )}
        </View>

        <View style={styles.genderToggle}>
          {(['women', 'men'] as GenderFilter[]).map((g) => (
            <Pressable
              key={g}
              style={[
                styles.genderButton,
                gender === g && { backgroundColor: colors.brandPrimary },
                gender !== g && { backgroundColor: colors.primarySubtle },
              ]}
              onPress={() => setGender(g)}
            >
              <Text
                style={[
                  styles.genderText,
                  { color: gender === g ? '#FFF' : colors.brandPrimary },
                ]}
              >
                {g.charAt(0).toUpperCase() + g.slice(1)}
              </Text>
            </Pressable>
          ))}
        </View>

        <Animated.View entering={FadeInDown.delay(100)}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Categories</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesScroll}>
            {categories[gender].map((cat, i) => (
              <Pressable
                key={i}
                style={styles.categoryItem}
                onPress={() => router.push(`/salons?category=${cat.name}`)}
              >
                <View style={[styles.categoryIcon, { backgroundColor: colors.primarySubtle }]}>
                  <Ionicons name={cat.icon as any} size={24} color={colors.brandPrimary} />
                </View>
                <Text style={[styles.categoryName, { color: colors.textSecondary }]} numberOfLines={1}>
                  {cat.name}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </Animated.View>

        {trendingSalons.length > 0 && (
          <Animated.View entering={FadeInDown.delay(200)}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Trending Now</Text>
              <Pressable onPress={() => router.push('/salons')}>
                <Text style={[styles.seeAll, { color: colors.brandPrimary }]}>See All</Text>
              </Pressable>
            </View>
            <FlatList
              horizontal
              data={trendingSalons}
              renderItem={({ item }) => (
                <SalonCard salon={item} compact onPress={() => handleSalonPress(item.id)} />
              )}
              keyExtractor={(item) => item.id.toString()}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalList}
              scrollEnabled={trendingSalons.length > 0}
            />
          </Animated.View>
        )}

        <Animated.View entering={FadeInDown.delay(300)}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Near You</Text>
            <Pressable onPress={() => router.push('/salons')}>
              <Text style={[styles.seeAll, { color: colors.brandPrimary }]}>See All</Text>
            </Pressable>
          </View>
          {nearbySalons.map((salon) => (
            <SalonCard key={salon.id} salon={salon} onPress={() => handleSalonPress(salon.id)} />
          ))}
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { flex: 1, paddingHorizontal: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  greeting: { fontSize: 13, fontFamily: 'Inter_400Regular', marginBottom: 2 },
  locationRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  location: { fontSize: 17, fontFamily: 'Inter_600SemiBold' },
  headerActions: { flexDirection: 'row', gap: 8 },
  iconButton: { width: 42, height: 42, borderRadius: 21, justifyContent: 'center', alignItems: 'center' },
  searchBar: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    paddingHorizontal: 16, paddingVertical: 12, borderRadius: 14,
    borderWidth: 1, marginBottom: 16,
  },
  searchInput: { flex: 1, fontSize: 15, fontFamily: 'Inter_400Regular' },
  genderToggle: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  genderButton: { flex: 1, paddingVertical: 10, borderRadius: 12, alignItems: 'center' },
  genderText: { fontSize: 14, fontFamily: 'Inter_600SemiBold' },
  sectionTitle: { fontSize: 20, fontFamily: 'Inter_700Bold', marginBottom: 14 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  seeAll: { fontSize: 14, fontFamily: 'Inter_600SemiBold' },
  categoriesScroll: { paddingBottom: 20, gap: 16 },
  categoryItem: { alignItems: 'center', width: 72 },
  categoryIcon: { width: 56, height: 56, borderRadius: 18, justifyContent: 'center', alignItems: 'center', marginBottom: 6 },
  categoryName: { fontSize: 11, fontFamily: 'Inter_500Medium', textAlign: 'center' },
  horizontalList: { paddingBottom: 8 },
});
