import { useState, useMemo } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, Platform } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import { useColors } from '@/hooks/useColors';
import { allSalons } from '@/data/salons';

const mockServices = [
  { name: 'Haircut & Styling', duration: '45 min', price: '\u20B91,200', category: 'Hair' },
  { name: 'Hair Coloring', duration: '90 min', price: '\u20B93,500', category: 'Hair' },
  { name: 'Keratin Treatment', duration: '120 min', price: '\u20B95,000', category: 'Hair' },
  { name: 'Classic Facial', duration: '60 min', price: '\u20B91,500', category: 'Skin' },
  { name: 'Gold Facial', duration: '75 min', price: '\u20B92,500', category: 'Skin' },
  { name: 'Gel Manicure', duration: '40 min', price: '\u20B9800', category: 'Nails' },
  { name: 'Spa Pedicure', duration: '50 min', price: '\u20B91,000', category: 'Nails' },
  { name: 'Full Body Massage', duration: '90 min', price: '\u20B93,000', category: 'Spa' },
];

const tabs = ['Services', 'Reviews', 'About'];

export default function SalonDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState(0);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const topPad = Platform.OS === 'web' ? 67 : insets.top;

  const salon = useMemo(() => allSalons.find((s) => s.id === Number(id)), [id]);

  if (!salon) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background, paddingTop: topPad }]}>
        <Text style={[styles.errorText, { color: colors.textPrimary }]}>Salon not found</Text>
      </View>
    );
  }

  const toggleService = (name: string) => {
    setSelectedServices((prev) =>
      prev.includes(name) ? prev.filter((s) => s !== name) : [...prev, name]
    );
  };

  const totalPrice = selectedServices.reduce((sum, name) => {
    const service = mockServices.find((s) => s.name === name);
    return sum + (service ? parseInt(service.price.replace(/[^\d]/g, '')) : 0);
  }, 0);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: salon.image }} style={styles.heroImage} contentFit="cover" />
          <LinearGradient colors={['transparent', 'rgba(0,0,0,0.6)']} style={styles.imageGradient} />
          <View style={[styles.backButton, { top: topPad + 8 }]}>
            <Pressable onPress={() => router.back()} style={styles.headerBtn}>
              <Ionicons name="arrow-back" size={22} color="#FFF" />
            </Pressable>
            <View style={styles.headerRight}>
              <Pressable style={styles.headerBtn} onPress={() => setIsFavorite(!isFavorite)}>
                <Ionicons name={isFavorite ? 'heart' : 'heart-outline'} size={22} color={isFavorite ? '#FF1B8D' : '#FFF'} />
              </Pressable>
              <Pressable style={styles.headerBtn}>
                <Ionicons name="share-outline" size={22} color="#FFF" />
              </Pressable>
            </View>
          </View>
        </View>

        <View style={styles.content}>
          <Animated.View entering={FadeInDown.delay(100)}>
            <Text style={[styles.salonName, { color: colors.textPrimary }]}>{salon.name}</Text>
            <Text style={[styles.salonCategory, { color: colors.textSecondary }]}>{salon.category}</Text>

            <View style={styles.infoRow}>
              <View style={styles.infoItem}>
                <Ionicons name="star" size={16} color={colors.accentGold} />
                <Text style={[styles.infoText, { color: colors.textPrimary }]}>{salon.rating}</Text>
                <Text style={[styles.infoSubtext, { color: colors.textTertiary }]}>({salon.reviews})</Text>
              </View>
              <View style={styles.infoItem}>
                <Ionicons name="location" size={16} color={colors.brandPrimary} />
                <Text style={[styles.infoText, { color: colors.textPrimary }]}>{salon.distanceKm} km</Text>
              </View>
              <View style={styles.infoItem}>
                <View style={[styles.openDot, { backgroundColor: colors.success }]} />
                <Text style={[styles.infoText, { color: colors.success }]}>Open until {salon.openUntil}</Text>
              </View>
            </View>
          </Animated.View>

          <View style={[styles.tabBar, { borderBottomColor: colors.borderLight }]}>
            {tabs.map((tab, i) => (
              <Pressable key={i} onPress={() => setActiveTab(i)} style={styles.tabItem}>
                <Text style={[styles.tabText, { color: activeTab === i ? colors.brandPrimary : colors.textTertiary }]}>
                  {tab}
                </Text>
                {activeTab === i && <View style={[styles.tabIndicator, { backgroundColor: colors.brandPrimary }]} />}
              </Pressable>
            ))}
          </View>

          {activeTab === 0 && (
            <Animated.View entering={FadeIn}>
              {mockServices.map((service, i) => {
                const isSelected = selectedServices.includes(service.name);
                return (
                  <Pressable
                    key={i}
                    style={[
                      styles.serviceItem,
                      { borderColor: isSelected ? colors.brandPrimary : colors.borderLight },
                      isSelected && { backgroundColor: colors.primarySubtle },
                    ]}
                    onPress={() => toggleService(service.name)}
                  >
                    <View style={styles.serviceInfo}>
                      <Text style={[styles.serviceName, { color: colors.textPrimary }]}>{service.name}</Text>
                      <Text style={[styles.serviceDuration, { color: colors.textTertiary }]}>{service.duration}</Text>
                    </View>
                    <View style={styles.serviceRight}>
                      <Text style={[styles.servicePrice, { color: colors.brandPrimary }]}>{service.price}</Text>
                      <Ionicons
                        name={isSelected ? 'checkmark-circle' : 'add-circle-outline'}
                        size={24}
                        color={isSelected ? colors.brandPrimary : colors.textDisabled}
                      />
                    </View>
                  </Pressable>
                );
              })}
            </Animated.View>
          )}

          {activeTab === 1 && (
            <Animated.View entering={FadeIn} style={styles.reviewsContainer}>
              {[
                { name: 'Priya M.', rating: 5, text: 'Amazing experience! The stylist was very professional and attentive.', date: '2 weeks ago' },
                { name: 'Rahul K.', rating: 4, text: 'Great service, slightly long wait time but worth it.', date: '1 month ago' },
                { name: 'Sneha T.', rating: 5, text: 'Best salon in the area. Love the ambiance and service quality.', date: '1 month ago' },
              ].map((review, i) => (
                <View key={i} style={[styles.reviewCard, { borderBottomColor: colors.borderLight }]}>
                  <View style={styles.reviewHeader}>
                    <View style={[styles.reviewAvatar, { backgroundColor: colors.primarySubtle }]}>
                      <Text style={[styles.reviewInitial, { color: colors.brandPrimary }]}>{review.name[0]}</Text>
                    </View>
                    <View>
                      <Text style={[styles.reviewName, { color: colors.textPrimary }]}>{review.name}</Text>
                      <View style={styles.starsRow}>
                        {Array(review.rating).fill(0).map((_, j) => (
                          <Ionicons key={j} name="star" size={12} color={colors.accentGold} />
                        ))}
                      </View>
                    </View>
                    <Text style={[styles.reviewDate, { color: colors.textTertiary }]}>{review.date}</Text>
                  </View>
                  <Text style={[styles.reviewText, { color: colors.textSecondary }]}>{review.text}</Text>
                </View>
              ))}
            </Animated.View>
          )}

          {activeTab === 2 && (
            <Animated.View entering={FadeIn} style={styles.aboutContainer}>
              <Text style={[styles.aboutText, { color: colors.textSecondary }]}>
                {salon.name} is a premium beauty salon offering a wide range of services including hair styling, skincare treatments, nail care, and spa services. Our team of experienced professionals ensures you receive the best care and leave feeling refreshed and beautiful.
              </Text>
              <View style={styles.amenitiesRow}>
                {['Wi-Fi', 'AC', 'Parking', 'Card Payment'].map((amenity, i) => (
                  <View key={i} style={[styles.amenityChip, { backgroundColor: colors.primarySubtle }]}>
                    <Text style={[styles.amenityText, { color: colors.brandPrimary }]}>{amenity}</Text>
                  </View>
                ))}
              </View>
            </Animated.View>
          )}
        </View>
      </ScrollView>

      {selectedServices.length > 0 && (
        <Animated.View entering={FadeInDown} style={[styles.bookingBar, { paddingBottom: insets.bottom + 12 }]}>
          <View>
            <Text style={[styles.bookingCount, { color: colors.textSecondary }]}>{selectedServices.length} service(s) selected</Text>
            <Text style={[styles.bookingTotal, { color: colors.textPrimary }]}>{'\u20B9'}{totalPrice.toLocaleString()}</Text>
          </View>
          <Pressable onPress={() => router.push(`/booking/${salon.id}`)}>
            <LinearGradient colors={['#FF1B8D', '#E85A8B']} style={styles.bookButton}>
              <Text style={styles.bookText}>Book Now</Text>
              <Ionicons name="arrow-forward" size={18} color="#FFF" />
            </LinearGradient>
          </Pressable>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  errorText: { fontSize: 18, fontFamily: 'Inter_600SemiBold', textAlign: 'center', paddingTop: 100 },
  imageContainer: { height: 280, position: 'relative' },
  heroImage: { width: '100%', height: '100%' },
  imageGradient: { ...StyleSheet.absoluteFillObject },
  backButton: { position: 'absolute', left: 16, right: 16, flexDirection: 'row', justifyContent: 'space-between' },
  headerBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center' },
  headerRight: { flexDirection: 'row', gap: 8 },
  content: { padding: 20 },
  salonName: { fontSize: 24, fontFamily: 'Inter_700Bold', marginBottom: 4 },
  salonCategory: { fontSize: 14, fontFamily: 'Inter_400Regular', marginBottom: 12 },
  infoRow: { flexDirection: 'row', gap: 16, marginBottom: 20 },
  infoItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  infoText: { fontSize: 14, fontFamily: 'Inter_600SemiBold' },
  infoSubtext: { fontSize: 12, fontFamily: 'Inter_400Regular' },
  openDot: { width: 6, height: 6, borderRadius: 3 },
  tabBar: { flexDirection: 'row', borderBottomWidth: 1, marginBottom: 16 },
  tabItem: { flex: 1, alignItems: 'center', paddingBottom: 12 },
  tabText: { fontSize: 15, fontFamily: 'Inter_600SemiBold' },
  tabIndicator: { position: 'absolute', bottom: 0, height: 3, width: '60%', borderRadius: 2 },
  serviceItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 14, borderRadius: 14, borderWidth: 1, marginBottom: 10 },
  serviceInfo: { flex: 1 },
  serviceName: { fontSize: 15, fontFamily: 'Inter_600SemiBold', marginBottom: 2 },
  serviceDuration: { fontSize: 13, fontFamily: 'Inter_400Regular' },
  serviceRight: { alignItems: 'flex-end', gap: 4 },
  servicePrice: { fontSize: 15, fontFamily: 'Inter_700Bold' },
  reviewsContainer: { gap: 0 },
  reviewCard: { paddingVertical: 14, borderBottomWidth: 1 },
  reviewHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 },
  reviewAvatar: { width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' },
  reviewInitial: { fontSize: 16, fontFamily: 'Inter_700Bold' },
  reviewName: { fontSize: 14, fontFamily: 'Inter_600SemiBold' },
  starsRow: { flexDirection: 'row', gap: 2 },
  reviewDate: { fontSize: 12, fontFamily: 'Inter_400Regular', marginLeft: 'auto' },
  reviewText: { fontSize: 14, fontFamily: 'Inter_400Regular', lineHeight: 20 },
  aboutContainer: { gap: 16 },
  aboutText: { fontSize: 15, fontFamily: 'Inter_400Regular', lineHeight: 22 },
  amenitiesRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  amenityChip: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  amenityText: { fontSize: 13, fontFamily: 'Inter_500Medium' },
  bookingBar: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#FFF', borderTopWidth: 1, borderTopColor: 'rgba(0,0,0,0.08)', paddingHorizontal: 20, paddingTop: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  bookingCount: { fontSize: 13, fontFamily: 'Inter_400Regular' },
  bookingTotal: { fontSize: 20, fontFamily: 'Inter_700Bold' },
  bookButton: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 24, paddingVertical: 14, borderRadius: 14 },
  bookText: { color: '#FFF', fontSize: 15, fontFamily: 'Inter_600SemiBold' },
});
