import { useState, useCallback } from 'react';
import { View, Text, ScrollView, StyleSheet, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useColors } from '@/hooks/useColors';
import { SalonCard } from '@/components/SalonCard';
import { allSalons } from '@/data/salons';

export default function FavoritesScreen() {
  const router = useRouter();
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === 'web' ? 67 : insets.top;
  const [favorites] = useState(allSalons.filter((s) => s.rating >= 4.8).slice(0, 5));

  const handlePress = useCallback((id: number) => {
    router.push(`/salon/${id}`);
  }, [router]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={{ paddingTop: topPad + 8, paddingBottom: 24 }} showsVerticalScrollIndicator={false}>
        <View style={styles.padded}>
          <Text style={[styles.pageTitle, { color: colors.textPrimary }]}>Favorites</Text>

          {favorites.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="heart-outline" size={48} color={colors.textDisabled} />
              <Text style={[styles.emptyText, { color: colors.textTertiary }]}>No favorites yet</Text>
              <Text style={[styles.emptySubtext, { color: colors.textTertiary }]}>
                Save your favorite salons to find them here
              </Text>
            </View>
          ) : (
            favorites.map((salon, i) => (
              <Animated.View key={salon.id} entering={FadeInDown.delay(i * 80)}>
                <SalonCard salon={salon} onPress={() => handlePress(salon.id)} />
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
  emptyState: { alignItems: 'center', paddingTop: 80, gap: 8 },
  emptyText: { fontSize: 18, fontFamily: 'Inter_600SemiBold' },
  emptySubtext: { fontSize: 14, fontFamily: 'Inter_400Regular', textAlign: 'center' },
});
