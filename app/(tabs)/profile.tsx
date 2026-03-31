import { View, Text, ScrollView, Pressable, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useColors } from '@/hooks/useColors';
import { useTheme } from '@/context/ThemeContext';
import type { ThemeMode } from '@/constants/colors';

const themeOptions: { id: ThemeMode; label: string; color: string }[] = [
  { id: 'light', label: 'Light', color: '#FFFFFF' },
  { id: 'dark', label: 'Dark', color: '#0A0A0B' },
  { id: 'warm', label: 'Warm', color: '#FFF8F0' },
  { id: 'genz', label: 'Gen Z', color: '#FFF0F7' },
  { id: 'luxe', label: 'Luxe', color: '#D4AF37' },
  { id: 'ocean', label: 'Ocean', color: '#0EA5E9' },
  { id: 'sakura', label: 'Sakura', color: '#F472B6' },
  { id: 'cyber', label: 'Cyber', color: '#06B6D4' },
  { id: 'sunset', label: 'Sunset', color: '#F97316' },
  { id: 'mint', label: 'Mint', color: '#10B981' },
  { id: 'royal', label: 'Royal', color: '#7C3AED' },
  { id: 'masculine', label: 'Classic', color: '#3B82F6' },
  { id: 'unisex', label: 'Unisex', color: '#8B5CF6' },
];

const menuSections = [
  {
    items: [
      { icon: 'person-outline', label: 'Edit Profile' },
      { icon: 'location-outline', label: 'Saved Addresses' },
      { icon: 'card-outline', label: 'Payment Methods' },
    ],
  },
  {
    items: [
      { icon: 'notifications-outline', label: 'Notifications' },
      { icon: 'shield-outline', label: 'Privacy & Security' },
      { icon: 'help-circle-outline', label: 'Help & Support' },
    ],
  },
  {
    items: [
      { icon: 'document-text-outline', label: 'Terms of Service' },
      { icon: 'information-circle-outline', label: 'About' },
      { icon: 'log-out-outline', label: 'Sign Out', isDestructive: true },
    ],
  },
];

export default function ProfileScreen() {
  const colors = useColors();
  const { theme, setTheme } = useTheme();
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === 'web' ? 67 : insets.top;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={{ paddingTop: topPad + 8, paddingBottom: 24 }} showsVerticalScrollIndicator={false}>
        <View style={styles.padded}>
          <Text style={[styles.pageTitle, { color: colors.textPrimary }]}>Profile</Text>

          <Animated.View entering={FadeInDown.delay(100)} style={styles.profileCard}>
            <View style={[styles.avatar, { backgroundColor: colors.brandPrimary }]}>
              <Text style={styles.avatarText}>A</Text>
            </View>
            <View style={styles.profileInfo}>
              <Text style={[styles.profileName, { color: colors.textPrimary }]}>Ananya Patel</Text>
              <Text style={[styles.profileEmail, { color: colors.textSecondary }]}>ananya@example.com</Text>
            </View>
            <Pressable>
              <Ionicons name="create-outline" size={22} color={colors.brandPrimary} />
            </Pressable>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(150)} style={styles.statsRow}>
            {[
              { label: 'Bookings', value: '24' },
              { label: 'Points', value: '1,850' },
              { label: 'Reviews', value: '12' },
            ].map((stat, i) => (
              <View key={i} style={[styles.statItem, { backgroundColor: colors.primarySubtle }]}>
                <Text style={[styles.statValue, { color: colors.brandPrimary }]}>{stat.value}</Text>
                <Text style={[styles.statLabel, { color: colors.textSecondary }]}>{stat.label}</Text>
              </View>
            ))}
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(200)}>
            <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Theme</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.themeScroll}>
              {themeOptions.map((opt) => (
                <Pressable
                  key={opt.id}
                  style={[
                    styles.themeOption,
                    theme === opt.id && { borderColor: colors.brandPrimary, borderWidth: 2 },
                  ]}
                  onPress={() => setTheme(opt.id)}
                >
                  <View style={[styles.themeColor, { backgroundColor: opt.color, borderColor: colors.borderMedium }]} />
                  <Text style={[styles.themeLabel, { color: colors.textSecondary }]}>{opt.label}</Text>
                </Pressable>
              ))}
            </ScrollView>
          </Animated.View>

          {menuSections.map((section, sIdx) => (
            <Animated.View key={sIdx} entering={FadeInDown.delay(250 + sIdx * 50)} style={[styles.menuSection, { backgroundColor: colors.surface, borderColor: colors.borderLight }]}>
              {section.items.map((item, iIdx) => (
                <Pressable key={iIdx} style={[styles.menuItem, iIdx < section.items.length - 1 && { borderBottomWidth: 1, borderBottomColor: colors.borderLight }]}>
                  <Ionicons name={item.icon as any} size={22} color={(item as any).isDestructive ? colors.error : colors.textSecondary} />
                  <Text style={[styles.menuLabel, { color: (item as any).isDestructive ? colors.error : colors.textPrimary }]}>{item.label}</Text>
                  <Ionicons name="chevron-forward" size={18} color={colors.textDisabled} />
                </Pressable>
              ))}
            </Animated.View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  padded: { paddingHorizontal: 20 },
  pageTitle: { fontSize: 28, fontFamily: 'Inter_700Bold', marginBottom: 20 },
  profileCard: { flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: 20 },
  avatar: { width: 56, height: 56, borderRadius: 28, justifyContent: 'center', alignItems: 'center' },
  avatarText: { fontSize: 22, fontFamily: 'Inter_700Bold', color: '#FFF' },
  profileInfo: { flex: 1 },
  profileName: { fontSize: 18, fontFamily: 'Inter_600SemiBold' },
  profileEmail: { fontSize: 14, fontFamily: 'Inter_400Regular' },
  statsRow: { flexDirection: 'row', gap: 10, marginBottom: 24 },
  statItem: { flex: 1, paddingVertical: 14, borderRadius: 14, alignItems: 'center' },
  statValue: { fontSize: 20, fontFamily: 'Inter_700Bold' },
  statLabel: { fontSize: 12, fontFamily: 'Inter_400Regular', marginTop: 2 },
  sectionTitle: { fontSize: 18, fontFamily: 'Inter_700Bold', marginBottom: 12 },
  themeScroll: { gap: 10, paddingBottom: 20 },
  themeOption: { alignItems: 'center', padding: 8, borderRadius: 12, borderWidth: 1, borderColor: 'transparent' },
  themeColor: { width: 40, height: 40, borderRadius: 20, borderWidth: 1, marginBottom: 4 },
  themeLabel: { fontSize: 11, fontFamily: 'Inter_500Medium' },
  menuSection: { borderRadius: 14, borderWidth: 1, marginBottom: 14, overflow: 'hidden' },
  menuItem: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 16 },
  menuLabel: { flex: 1, fontSize: 15, fontFamily: 'Inter_500Medium' },
});
