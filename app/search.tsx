import { useState, useMemo } from 'react';
import { View, Text, TextInput, Pressable, FlatList, StyleSheet, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '@/hooks/useColors';
import { SalonCard } from '@/components/SalonCard';
import { allSalons } from '@/data/salons';

export default function SearchScreen() {
  const router = useRouter();
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState('');
  const topPad = Platform.OS === 'web' ? 67 : insets.top;

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return allSalons.filter(
      (s) => s.name.toLowerCase().includes(q) || s.category.toLowerCase().includes(q) || s.services.some((sv) => sv.toLowerCase().includes(q))
    );
  }, [query]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background, paddingTop: topPad }]}>
      <View style={styles.searchHeader}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
        </Pressable>
        <View style={[styles.searchBar, { backgroundColor: colors.surfaceElevated, borderColor: colors.borderLight }]}>
          <Ionicons name="search" size={18} color={colors.textTertiary} />
          <TextInput
            style={[styles.searchInput, { color: colors.textPrimary }]}
            placeholder="Search salons, services..."
            placeholderTextColor={colors.textTertiary}
            value={query}
            onChangeText={setQuery}
            autoFocus
          />
          {query.length > 0 && (
            <Pressable onPress={() => setQuery('')}>
              <Ionicons name="close-circle" size={18} color={colors.textTertiary} />
            </Pressable>
          )}
        </View>
      </View>

      {query.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="search" size={48} color={colors.textDisabled} />
          <Text style={[styles.emptyText, { color: colors.textTertiary }]}>Search for salons or services</Text>
        </View>
      ) : results.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="sad-outline" size={48} color={colors.textDisabled} />
          <Text style={[styles.emptyText, { color: colors.textTertiary }]}>No results for "{query}"</Text>
        </View>
      ) : (
        <FlatList
          data={results}
          renderItem={({ item }) => (
            <View style={styles.resultItem}>
              <SalonCard salon={item} onPress={() => router.push(`/salon/${item.id}`)} />
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.resultsList}
          scrollEnabled={results.length > 0}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  searchHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 16, paddingBottom: 12 },
  searchBar: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 12, paddingVertical: 10, borderRadius: 12, borderWidth: 1 },
  searchInput: { flex: 1, fontSize: 15, fontFamily: 'Inter_400Regular' },
  emptyState: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 12, paddingBottom: 100 },
  emptyText: { fontSize: 16, fontFamily: 'Inter_500Medium' },
  resultsList: { paddingHorizontal: 20, paddingTop: 8 },
  resultItem: {},
});
