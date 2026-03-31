import { useState, useMemo } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, Platform, Linking, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import { useColors } from '@/hooks/useColors';
import { allSalons, RADIUS_OPTIONS } from '@/data/salons';

export default function MapScreen() {
  const router = useRouter();
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === 'web' ? 67 : insets.top;
  const [selectedRadius, setSelectedRadius] = useState(2);

  const nearbySalons = useMemo(
    () => allSalons.filter((s) => s.distanceKm <= selectedRadius).sort((a, b) => a.distanceKm - b.distanceKm),
    [selectedRadius]
  );

  const openInMaps = async (salonName: string) => {
    const query = encodeURIComponent(salonName + ' salon near me');
    const url = Platform.OS === 'ios' ? `maps:?q=${query}` : `https://www.google.com/maps/search/${query}`;
    try {
      const canOpen = await Linking.canOpenURL(url);
      if (canOpen) {
        await Linking.openURL(url);
      } else {
        await Linking.openURL(`https://www.google.com/maps/search/${query}`);
      }
    } catch {
      Alert.alert('Unable to open maps', 'Could not launch the maps application.');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { paddingTop: topPad + 8 }]}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>Nearby Salons</Text>
        <View style={{ width: 24 }} />
      </View>

      <Animated.View entering={FadeIn} style={[styles.mapVisual, { backgroundColor: colors.surfaceElevated }]}>
        <View style={[styles.mapGrid, { borderColor: colors.borderLight }]}>
          {Array(9).fill(0).map((_, i) => (
            <View key={i} style={[styles.gridCell, { borderColor: colors.borderLight }]} />
          ))}
        </View>
        <View style={styles.centerPin}>
          <Ionicons name="person-circle" size={32} color={colors.brandPrimary} />
          <Text style={[styles.youLabel, { color: colors.brandPrimary }]}>You</Text>
        </View>
        {nearbySalons.slice(0, 6).map((salon, i) => {
          const angle = (i * 60 + 30) * (Math.PI / 180);
          const dist = Math.min(salon.distanceKm / selectedRadius, 0.85);
          const x = Math.cos(angle) * dist * 100;
          const y = Math.sin(angle) * dist * 100;
          return (
            <Pressable
              key={salon.id}
              style={[styles.salonPin, { left: `${50 + x * 0.4}%`, top: `${50 + y * 0.4}%` }]}
              onPress={() => router.push(`/salon/${salon.id}`)}
            >
              <Ionicons name="location" size={24} color={colors.accentGold} />
            </Pressable>
          );
        })}
        <View style={[styles.radiusCircle, { borderColor: colors.brandPrimary + '40' }]} />
      </Animated.View>

      <View style={styles.filtersContainer}>
        <Text style={[styles.filtersLabel, { color: colors.textSecondary }]}>Radius</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
          {RADIUS_OPTIONS.map((opt) => (
            <Pressable
              key={opt.value}
              onPress={() => setSelectedRadius(opt.value)}
              style={[
                styles.filterChip,
                { borderColor: selectedRadius === opt.value ? colors.brandPrimary : colors.borderLight },
                selectedRadius === opt.value && { backgroundColor: colors.primarySubtle },
              ]}
            >
              <Text
                style={[
                  styles.filterChipText,
                  { color: selectedRadius === opt.value ? colors.brandPrimary : colors.textSecondary },
                ]}
              >
                {opt.label}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      <View style={styles.listHeader}>
        <Text style={[styles.listTitle, { color: colors.textPrimary }]}>
          {nearbySalons.length} salon{nearbySalons.length !== 1 ? 's' : ''} within {selectedRadius >= 1 ? `${selectedRadius}km` : `${selectedRadius * 1000}m`}
        </Text>
      </View>

      <ScrollView style={styles.salonList} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: insets.bottom + 16 }}>
        {nearbySalons.map((salon, i) => (
          <Animated.View key={salon.id} entering={FadeInDown.delay(i * 80)}>
            <Pressable
              style={[styles.salonCard, { backgroundColor: colors.surface, borderColor: colors.borderLight }]}
              onPress={() => router.push(`/salon/${salon.id}`)}
            >
              <Image source={{ uri: salon.image }} style={styles.salonImage} contentFit="cover" />
              <View style={styles.salonInfo}>
                <Text style={[styles.salonName, { color: colors.textPrimary }]} numberOfLines={1}>{salon.name}</Text>
                <Text style={[styles.salonCategory, { color: colors.textTertiary }]}>{salon.category}</Text>
                <View style={styles.salonMeta}>
                  <View style={styles.metaItem}>
                    <Ionicons name="star" size={13} color={colors.accentGold} />
                    <Text style={[styles.metaText, { color: colors.textSecondary }]}>{salon.rating}</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Ionicons name="navigate" size={13} color={colors.brandPrimary} />
                    <Text style={[styles.metaText, { color: colors.textSecondary }]}>{salon.distanceKm} km</Text>
                  </View>
                </View>
                <Text style={[styles.salonPrice, { color: colors.brandPrimary }]}>{salon.price}</Text>
              </View>
              <Pressable style={[styles.directionsBtn, { backgroundColor: colors.primarySubtle }]} onPress={() => openInMaps(salon.name)}>
                <Ionicons name="navigate-outline" size={18} color={colors.brandPrimary} />
              </Pressable>
            </Pressable>
          </Animated.View>
        ))}
        {nearbySalons.length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons name="search-outline" size={48} color={colors.textDisabled} />
            <Text style={[styles.emptyText, { color: colors.textTertiary }]}>No salons found within this radius</Text>
            <Text style={[styles.emptySubtext, { color: colors.textDisabled }]}>Try increasing the search radius</Text>
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
  mapVisual: { height: 220, marginHorizontal: 20, borderRadius: 20, overflow: 'hidden', position: 'relative' },
  mapGrid: { ...StyleSheet.absoluteFillObject, flexDirection: 'row', flexWrap: 'wrap' },
  gridCell: { width: '33.33%', height: '33.33%', borderWidth: 0.5 },
  centerPin: { position: 'absolute', top: '50%', left: '50%', marginLeft: -16, marginTop: -20, alignItems: 'center', zIndex: 10 },
  youLabel: { fontSize: 10, fontFamily: 'Inter_600SemiBold', marginTop: -2 },
  salonPin: { position: 'absolute', marginLeft: -12, marginTop: -24, zIndex: 5 },
  radiusCircle: { position: 'absolute', top: '15%', left: '15%', right: '15%', bottom: '15%', borderRadius: 999, borderWidth: 2, borderStyle: 'dashed' },
  filtersContainer: { flexDirection: 'row', alignItems: 'center', paddingLeft: 20, paddingVertical: 12 },
  filtersLabel: { fontSize: 13, fontFamily: 'Inter_500Medium', marginRight: 10 },
  filterScroll: { gap: 6, paddingRight: 20 },
  filterChip: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20, borderWidth: 1 },
  filterChipText: { fontSize: 13, fontFamily: 'Inter_500Medium' },
  listHeader: { paddingHorizontal: 20, paddingBottom: 8 },
  listTitle: { fontSize: 15, fontFamily: 'Inter_600SemiBold' },
  salonList: { flex: 1, paddingHorizontal: 20 },
  salonCard: { flexDirection: 'row', borderRadius: 14, borderWidth: 1, overflow: 'hidden', marginBottom: 10, padding: 10, alignItems: 'center' },
  salonImage: { width: 70, height: 70, borderRadius: 10 },
  salonInfo: { flex: 1, marginLeft: 12 },
  salonName: { fontSize: 15, fontFamily: 'Inter_600SemiBold', marginBottom: 2 },
  salonCategory: { fontSize: 12, fontFamily: 'Inter_400Regular', marginBottom: 4 },
  salonMeta: { flexDirection: 'row', gap: 10, marginBottom: 2 },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  metaText: { fontSize: 12, fontFamily: 'Inter_500Medium' },
  salonPrice: { fontSize: 13, fontFamily: 'Inter_600SemiBold' },
  directionsBtn: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  emptyState: { alignItems: 'center', paddingTop: 40, gap: 8 },
  emptyText: { fontSize: 15, fontFamily: 'Inter_500Medium' },
  emptySubtext: { fontSize: 13, fontFamily: 'Inter_400Regular' },
});
