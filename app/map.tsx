import { View, Text, Pressable, StyleSheet, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '@/hooks/useColors';

export default function MapScreen() {
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
        <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>Map View</Text>
        <View style={{ width: 24 }} />
      </View>
      <View style={styles.content}>
        <View style={[styles.mapPlaceholder, { backgroundColor: colors.surfaceElevated, borderColor: colors.borderLight }]}>
          <Ionicons name="map" size={64} color={colors.textDisabled} />
          <Text style={[styles.placeholderText, { color: colors.textTertiary }]}>
            Map view will be available with react-native-maps integration
          </Text>
          <Text style={[styles.placeholderSubtext, { color: colors.textDisabled }]}>
            Requires a Google Maps API key for full functionality
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingBottom: 16 },
  headerTitle: { fontSize: 18, fontFamily: 'Inter_600SemiBold' },
  content: { flex: 1, justifyContent: 'center', paddingHorizontal: 24 },
  mapPlaceholder: { borderRadius: 20, borderWidth: 1, padding: 40, alignItems: 'center', gap: 16 },
  placeholderText: { fontSize: 16, fontFamily: 'Inter_500Medium', textAlign: 'center', lineHeight: 22 },
  placeholderSubtext: { fontSize: 13, fontFamily: 'Inter_400Regular', textAlign: 'center' },
});
