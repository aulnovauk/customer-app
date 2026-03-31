import { useState, useMemo } from 'react';
import { View, Text, ScrollView, Pressable, FlatList, StyleSheet, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useColors } from '@/hooks/useColors';

const products = [
  { id: 1, name: 'Vitamin C Serum', brand: 'GlowUp', image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=300', price: 1299, category: 'skincare', rating: 4.8 },
  { id: 2, name: 'Matte Lipstick Set', brand: 'LuxLips', image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=300', price: 899, category: 'makeup', rating: 4.6 },
  { id: 3, name: 'Argan Hair Oil', brand: 'SilkStrand', image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=300', price: 749, category: 'haircare', rating: 4.9 },
  { id: 4, name: 'Hydrating Face Mask', brand: 'PureGlow', image: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=300', price: 599, category: 'skincare', rating: 4.7 },
  { id: 5, name: 'Hair Dryer Pro', brand: 'StyleTech', image: 'https://images.unsplash.com/photo-1522338242992-e1a54571ba78?w=300', price: 3499, category: 'tools', rating: 4.5 },
  { id: 6, name: 'Nail Polish Collection', brand: 'ColorPop', image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=300', price: 1199, category: 'makeup', rating: 4.4 },
];

const filterOptions = ['All', 'Skincare', 'Makeup', 'Haircare', 'Tools'];

export default function ShopScreen() {
  const router = useRouter();
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const [activeFilter, setActiveFilter] = useState('All');
  const topPad = Platform.OS === 'web' ? 67 : insets.top;

  const filtered = useMemo(() => {
    if (activeFilter === 'All') return products;
    return products.filter((p) => p.category === activeFilter.toLowerCase());
  }, [activeFilter]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { paddingTop: topPad + 8 }]}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>Shop</Text>
        <Pressable>
          <Ionicons name="cart-outline" size={24} color={colors.brandPrimary} />
        </Pressable>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
        {filterOptions.map((f) => (
          <Pressable
            key={f}
            style={[styles.filterChip, { backgroundColor: activeFilter === f ? colors.brandPrimary : colors.primarySubtle }]}
            onPress={() => setActiveFilter(f)}
          >
            <Text style={[styles.filterText, { color: activeFilter === f ? '#FFF' : colors.brandPrimary }]}>{f}</Text>
          </Pressable>
        ))}
      </ScrollView>

      <FlatList
        data={filtered}
        numColumns={2}
        columnWrapperStyle={styles.productRow}
        contentContainerStyle={styles.productList}
        showsVerticalScrollIndicator={false}
        scrollEnabled={filtered.length > 0}
        renderItem={({ item, index }) => (
          <Animated.View entering={FadeInDown.delay(index * 80)} style={[styles.productCard, { backgroundColor: colors.surface, borderColor: colors.borderLight }]}>
            <Image source={{ uri: item.image }} style={styles.productImage} contentFit="cover" />
            <View style={styles.productContent}>
              <Text style={[styles.productBrand, { color: colors.textTertiary }]}>{item.brand}</Text>
              <Text style={[styles.productName, { color: colors.textPrimary }]} numberOfLines={2}>{item.name}</Text>
              <View style={styles.productBottom}>
                <Text style={[styles.productPrice, { color: colors.brandPrimary }]}>{'\u20B9'}{item.price}</Text>
                <View style={styles.ratingRow}>
                  <Ionicons name="star" size={12} color={colors.accentGold} />
                  <Text style={[styles.ratingText, { color: colors.textSecondary }]}>{item.rating}</Text>
                </View>
              </View>
            </View>
          </Animated.View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingBottom: 12 },
  headerTitle: { fontSize: 18, fontFamily: 'Inter_600SemiBold' },
  filterScroll: { paddingHorizontal: 20, gap: 8, paddingBottom: 16 },
  filterChip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 10 },
  filterText: { fontSize: 13, fontFamily: 'Inter_600SemiBold' },
  productList: { paddingHorizontal: 14, paddingBottom: 24 },
  productRow: { gap: 12, marginBottom: 12, paddingHorizontal: 6 },
  productCard: { flex: 1, borderRadius: 14, borderWidth: 1, overflow: 'hidden' },
  productImage: { width: '100%', height: 140 },
  productContent: { padding: 10 },
  productBrand: { fontSize: 11, fontFamily: 'Inter_500Medium', marginBottom: 2 },
  productName: { fontSize: 14, fontFamily: 'Inter_600SemiBold', marginBottom: 8 },
  productBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  productPrice: { fontSize: 15, fontFamily: 'Inter_700Bold' },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  ratingText: { fontSize: 12, fontFamily: 'Inter_400Regular' },
});
