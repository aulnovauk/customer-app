import { useState, useMemo } from 'react';
import { View, Text, ScrollView, Pressable, TextInput, StyleSheet, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useColors } from '@/hooks/useColors';
import { allSalons } from '@/data/salons';

const exploreCategories = [
  { name: 'Hair & Styling', icon: 'cut', color: '#EC4899' },
  { name: 'Spa & Wellness', icon: 'leaf', color: '#10B981' },
  { name: 'Nail Art', icon: 'color-palette', color: '#8B5CF6' },
  { name: 'Skincare', icon: 'sparkles', color: '#F59E0B' },
  { name: 'Makeup', icon: 'flower', color: '#EF4444' },
  { name: 'Men\'s Grooming', icon: 'man', color: '#3B82F6' },
];

export default function ExploreScreen() {
  const router = useRouter();
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const [searchText, setSearchText] = useState('');
  const topPad = Platform.OS === 'web' ? 67 : insets.top;

  const featured = useMemo(() => allSalons.filter((s) => s.rating >= 4.8).slice(0, 4), []);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={{ paddingTop: topPad + 8, paddingBottom: 24 }} showsVerticalScrollIndicator={false}>
        <View style={styles.padded}>
          <Text style={[styles.pageTitle, { color: colors.textPrimary }]}>Explore</Text>

          <View style={[styles.searchBar, { backgroundColor: colors.surfaceElevated, borderColor: colors.borderLight }]}>
            <Ionicons name="search" size={20} color={colors.textTertiary} />
            <TextInput
              style={[styles.searchInput, { color: colors.textPrimary }]}
              placeholder="Search categories, salons..."
              placeholderTextColor={colors.textTertiary}
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>

          <Animated.View entering={FadeInDown.delay(100)}>
            <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Categories</Text>
            <View style={styles.categoryGrid}>
              {exploreCategories.map((cat, i) => (
                <Pressable
                  key={i}
                  style={[styles.categoryCard, { backgroundColor: colors.surface, borderColor: colors.borderLight }]}
                  onPress={() => router.push(`/salons?category=${cat.name}`)}
                >
                  <View style={[styles.catIconBg, { backgroundColor: cat.color + '20' }]}>
                    <Ionicons name={cat.icon as any} size={24} color={cat.color} />
                  </View>
                  <Text style={[styles.catName, { color: colors.textPrimary }]}>{cat.name}</Text>
                </Pressable>
              ))}
            </View>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(200)}>
            <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Top Rated</Text>
            {featured.map((salon) => (
              <Pressable
                key={salon.id}
                style={[styles.featuredCard, { backgroundColor: colors.surface, borderColor: colors.borderLight }]}
                onPress={() => router.push(`/salon/${salon.id}`)}
              >
                <Image source={{ uri: salon.image }} style={styles.featuredImage} contentFit="cover" />
                <View style={styles.featuredContent}>
                  <Text style={[styles.featuredName, { color: colors.textPrimary }]} numberOfLines={1}>{salon.name}</Text>
                  <Text style={[styles.featuredCategory, { color: colors.textSecondary }]}>{salon.category}</Text>
                  <View style={styles.featuredBottom}>
                    <View style={styles.ratingRow}>
                      <Ionicons name="star" size={14} color={colors.accentGold} />
                      <Text style={[styles.ratingText, { color: colors.textPrimary }]}>{salon.rating}</Text>
                    </View>
                    <Text style={[styles.featuredPrice, { color: colors.brandPrimary }]}>{salon.price}</Text>
                  </View>
                </View>
              </Pressable>
            ))}
          </Animated.View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  padded: { paddingHorizontal: 20 },
  pageTitle: { fontSize: 28, fontFamily: 'Inter_700Bold', marginBottom: 16 },
  searchBar: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    paddingHorizontal: 16, paddingVertical: 12, borderRadius: 14,
    borderWidth: 1, marginBottom: 24,
  },
  searchInput: { flex: 1, fontSize: 15, fontFamily: 'Inter_400Regular' },
  sectionTitle: { fontSize: 20, fontFamily: 'Inter_700Bold', marginBottom: 14 },
  categoryGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 28 },
  categoryCard: {
    width: '47%', paddingVertical: 20, paddingHorizontal: 16,
    borderRadius: 16, borderWidth: 1, alignItems: 'center', gap: 10,
  },
  catIconBg: { width: 48, height: 48, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  catName: { fontSize: 13, fontFamily: 'Inter_600SemiBold', textAlign: 'center' },
  featuredCard: {
    flexDirection: 'row', borderRadius: 14, overflow: 'hidden',
    borderWidth: 1, marginBottom: 12,
  },
  featuredImage: { width: 100, height: 100 },
  featuredContent: { flex: 1, padding: 12, justifyContent: 'center' },
  featuredName: { fontSize: 15, fontFamily: 'Inter_600SemiBold', marginBottom: 4 },
  featuredCategory: { fontSize: 12, fontFamily: 'Inter_400Regular', marginBottom: 8 },
  featuredBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  ratingText: { fontSize: 13, fontFamily: 'Inter_600SemiBold' },
  featuredPrice: { fontSize: 13, fontFamily: 'Inter_600SemiBold' },
});
