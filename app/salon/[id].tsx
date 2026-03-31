import { useState, useMemo } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, Platform, TextInput, KeyboardAvoidingView, Linking, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInDown, FadeIn, FadeInUp, SlideInRight } from 'react-native-reanimated';
import { useColors } from '@/hooks/useColors';
import { allSalons } from '@/data/salons';

const safeOpenURL = async (url: string) => {
  try {
    const canOpen = await Linking.canOpenURL(url);
    if (canOpen) {
      await Linking.openURL(url);
    } else {
      Alert.alert('Unable to open', 'This action is not supported on your device.');
    }
  } catch {
    Alert.alert('Error', 'Something went wrong. Please try again.');
  }
};

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

const mockChatReplies = [
  'Hello! Thank you for reaching out. How can I help you today?',
  'Sure, I can help you with that. Could you tell me more about what service you\'re interested in?',
  'We have availability this week. Would you like me to check specific time slots for you?',
  'Absolutely! Our stylists are experienced in that technique. I\'d recommend our senior stylist for the best results.',
];

export default function SalonDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState(0);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<{ text: string; fromUser: boolean }[]>([
    { text: 'Hi! How can we help you today? Feel free to ask about our services, availability, or pricing.', fromUser: false },
  ]);
  const [chatInput, setChatInput] = useState('');
  const topPad = Platform.OS === 'web' ? 67 : insets.top;

  const salon = useMemo(() => allSalons.find((s) => s.id === Number(id)), [id]);

  const similarSalons = useMemo(() => {
    if (!salon) return [];
    return allSalons
      .filter((s) => s.id !== salon.id && (s.category === salon.category || s.services.some((sv) => salon.services.includes(sv))))
      .slice(0, 4);
  }, [salon, id]);

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

  const sendMessage = () => {
    if (!chatInput.trim()) return;
    const userMsg = chatInput.trim();
    setChatInput('');
    setChatMessages((prev) => [...prev, { text: userMsg, fromUser: true }]);
    setTimeout(() => {
      const reply = mockChatReplies[Math.floor(Math.random() * mockChatReplies.length)];
      setChatMessages((prev) => [...prev, { text: reply, fromUser: false }]);
    }, 1000);
  };

  if (chatOpen) {
    return (
      <KeyboardAvoidingView style={[styles.container, { backgroundColor: colors.background }]} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={[styles.chatHeader, { paddingTop: topPad + 8, backgroundColor: colors.surface, borderBottomColor: colors.borderLight }]}>
          <Pressable onPress={() => setChatOpen(false)}>
            <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
          </Pressable>
          <View style={styles.chatHeaderInfo}>
            <Text style={[styles.chatHeaderName, { color: colors.textPrimary }]}>{salon.name}</Text>
            <View style={styles.chatOnline}>
              <View style={[styles.onlineDot, { backgroundColor: '#10B981' }]} />
              <Text style={[styles.chatOnlineText, { color: colors.success }]}>Online</Text>
            </View>
          </View>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView style={styles.chatMessages} contentContainerStyle={{ padding: 16, gap: 10, paddingBottom: 8 }}>
          {chatMessages.map((msg, i) => (
            <Animated.View
              key={i}
              entering={FadeInUp.delay(i === chatMessages.length - 1 ? 0 : 0).duration(300)}
              style={[
                styles.chatBubble,
                msg.fromUser
                  ? [styles.userBubble, { backgroundColor: colors.brandPrimary }]
                  : [styles.salonBubble, { backgroundColor: colors.surfaceElevated, borderColor: colors.borderLight }],
              ]}
            >
              <Text style={[styles.chatBubbleText, { color: msg.fromUser ? '#FFF' : colors.textPrimary }]}>
                {msg.text}
              </Text>
            </Animated.View>
          ))}
        </ScrollView>

        <View style={[styles.chatInputBar, { paddingBottom: insets.bottom + 8, backgroundColor: colors.surface, borderTopColor: colors.borderLight }]}>
          <TextInput
            style={[styles.chatTextInput, { backgroundColor: colors.surfaceElevated, color: colors.textPrimary, borderColor: colors.borderLight }]}
            placeholder="Type a message..."
            placeholderTextColor={colors.textDisabled}
            value={chatInput}
            onChangeText={setChatInput}
            onSubmitEditing={sendMessage}
            returnKeyType="send"
          />
          <Pressable onPress={sendMessage} style={[styles.sendBtn, { backgroundColor: colors.brandPrimary }]}>
            <Ionicons name="send" size={18} color="#FFF" />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    );
  }

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

          <View style={[styles.actionRow, { borderColor: colors.borderLight }]}>
            <Pressable style={styles.actionBtn} onPress={() => setChatOpen(true)}>
              <View style={[styles.actionIcon, { backgroundColor: colors.primarySubtle }]}>
                <Ionicons name="chatbubble-ellipses-outline" size={20} color={colors.brandPrimary} />
              </View>
              <Text style={[styles.actionLabel, { color: colors.textSecondary }]}>Chat</Text>
            </Pressable>
            <Pressable style={styles.actionBtn} onPress={() => router.push('/map')}>
              <View style={[styles.actionIcon, { backgroundColor: colors.primarySubtle }]}>
                <Ionicons name="navigate-outline" size={20} color={colors.brandPrimary} />
              </View>
              <Text style={[styles.actionLabel, { color: colors.textSecondary }]}>Directions</Text>
            </Pressable>
            <Pressable style={styles.actionBtn} onPress={() => salon.phone && safeOpenURL(`tel:${salon.phone}`)}>
              <View style={[styles.actionIcon, { backgroundColor: colors.primarySubtle }]}>
                <Ionicons name="call-outline" size={20} color={colors.brandPrimary} />
              </View>
              <Text style={[styles.actionLabel, { color: colors.textSecondary }]}>Call</Text>
            </Pressable>
            <Pressable style={styles.actionBtn} onPress={() => salon.website && safeOpenURL(salon.website)}>
              <View style={[styles.actionIcon, { backgroundColor: colors.primarySubtle }]}>
                <Ionicons name="globe-outline" size={20} color={colors.brandPrimary} />
              </View>
              <Text style={[styles.actionLabel, { color: colors.textSecondary }]}>Website</Text>
            </Pressable>
          </View>

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
                { name: 'Arjun P.', rating: 5, text: 'Excellent grooming session. Will definitely come back!', date: '2 months ago' },
              ].map((review, i) => (
                <Animated.View key={i} entering={FadeInDown.delay(i * 100)} style={[styles.reviewCard, { borderBottomColor: colors.borderLight }]}>
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
                </Animated.View>
              ))}
            </Animated.View>
          )}

          {activeTab === 2 && (
            <Animated.View entering={FadeIn} style={styles.aboutContainer}>
              <Text style={[styles.aboutText, { color: colors.textSecondary }]}>
                {salon.name} is a premium beauty salon offering a wide range of services including hair styling, skincare treatments, nail care, and spa services. Our team of experienced professionals ensures you receive the best care and leave feeling refreshed and beautiful.
              </Text>
              <Text style={[styles.aboutSectionTitle, { color: colors.textPrimary }]}>Hours</Text>
              <View style={styles.hoursRow}>
                <Text style={[styles.hoursDay, { color: colors.textSecondary }]}>Mon - Sat</Text>
                <Text style={[styles.hoursTime, { color: colors.textPrimary }]}>10:00 AM - {salon.openUntil}</Text>
              </View>
              <View style={styles.hoursRow}>
                <Text style={[styles.hoursDay, { color: colors.textSecondary }]}>Sunday</Text>
                <Text style={[styles.hoursTime, { color: colors.textPrimary }]}>11:00 AM - 6:00 PM</Text>
              </View>
              <Text style={[styles.aboutSectionTitle, { color: colors.textPrimary, marginTop: 16 }]}>Amenities</Text>
              <View style={styles.amenitiesRow}>
                {[
                  { icon: 'wifi' as const, label: 'Wi-Fi' },
                  { icon: 'snow' as const, label: 'AC' },
                  { icon: 'car' as const, label: 'Parking' },
                  { icon: 'card' as const, label: 'Card Payment' },
                  { icon: 'cafe' as const, label: 'Refreshments' },
                  { icon: 'accessibility' as const, label: 'Accessible' },
                ].map((amenity, i) => (
                  <View key={i} style={[styles.amenityChip, { backgroundColor: colors.primarySubtle }]}>
                    <Ionicons name={amenity.icon} size={14} color={colors.brandPrimary} />
                    <Text style={[styles.amenityText, { color: colors.brandPrimary }]}>{amenity.label}</Text>
                  </View>
                ))}
              </View>
            </Animated.View>
          )}

          {similarSalons.length > 0 && (
            <View style={styles.similarSection}>
              <Text style={[styles.similarTitle, { color: colors.textPrimary }]}>Similar Salons</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 12 }}>
                {similarSalons.map((s, i) => (
                  <Animated.View key={s.id} entering={SlideInRight.delay(i * 100)}>
                    <Pressable
                      style={[styles.similarCard, { backgroundColor: colors.surface, borderColor: colors.borderLight }]}
                      onPress={() => router.push(`/salon/${s.id}`)}
                    >
                      <Image source={{ uri: s.image }} style={styles.similarImage} contentFit="cover" />
                      <View style={styles.similarInfo}>
                        <Text style={[styles.similarName, { color: colors.textPrimary }]} numberOfLines={1}>{s.name}</Text>
                        <View style={styles.similarMeta}>
                          <Ionicons name="star" size={12} color={colors.accentGold} />
                          <Text style={[styles.similarRating, { color: colors.textSecondary }]}>{s.rating}</Text>
                          <Text style={[styles.similarDist, { color: colors.textTertiary }]}>{s.distanceKm} km</Text>
                        </View>
                        <Text style={[styles.similarPrice, { color: colors.brandPrimary }]}>{s.price}</Text>
                      </View>
                    </Pressable>
                  </Animated.View>
                ))}
              </ScrollView>
            </View>
          )}
        </View>

        <View style={{ height: selectedServices.length > 0 ? 90 : 20 }} />
      </ScrollView>

      {selectedServices.length > 0 && (
        <Animated.View entering={FadeInDown} style={[styles.bookingBar, { paddingBottom: insets.bottom + 12, backgroundColor: colors.surface }]}>
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

      <Pressable
        style={[styles.chatFab, { backgroundColor: colors.brandPrimary }]}
        onPress={() => setChatOpen(true)}
      >
        <Ionicons name="chatbubble-ellipses" size={24} color="#FFF" />
      </Pressable>
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
  infoRow: { flexDirection: 'row', gap: 16, marginBottom: 16 },
  infoItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  infoText: { fontSize: 14, fontFamily: 'Inter_600SemiBold' },
  infoSubtext: { fontSize: 12, fontFamily: 'Inter_400Regular' },
  openDot: { width: 6, height: 6, borderRadius: 3 },
  actionRow: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 14, borderTopWidth: 1, borderBottomWidth: 1, marginBottom: 16 },
  actionBtn: { alignItems: 'center', gap: 6 },
  actionIcon: { width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center' },
  actionLabel: { fontSize: 12, fontFamily: 'Inter_500Medium' },
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
  aboutContainer: { gap: 8 },
  aboutText: { fontSize: 15, fontFamily: 'Inter_400Regular', lineHeight: 22 },
  aboutSectionTitle: { fontSize: 16, fontFamily: 'Inter_600SemiBold', marginTop: 8 },
  hoursRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 4 },
  hoursDay: { fontSize: 14, fontFamily: 'Inter_400Regular' },
  hoursTime: { fontSize: 14, fontFamily: 'Inter_500Medium' },
  amenitiesRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  amenityChip: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  amenityText: { fontSize: 13, fontFamily: 'Inter_500Medium' },
  similarSection: { marginTop: 28, marginBottom: 8 },
  similarTitle: { fontSize: 18, fontFamily: 'Inter_700Bold', marginBottom: 14 },
  similarCard: { width: 170, borderRadius: 14, borderWidth: 1, overflow: 'hidden' },
  similarImage: { width: '100%', height: 110 },
  similarInfo: { padding: 10 },
  similarName: { fontSize: 14, fontFamily: 'Inter_600SemiBold', marginBottom: 4 },
  similarMeta: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 2 },
  similarRating: { fontSize: 12, fontFamily: 'Inter_500Medium' },
  similarDist: { fontSize: 12, fontFamily: 'Inter_400Regular', marginLeft: 4 },
  similarPrice: { fontSize: 13, fontFamily: 'Inter_600SemiBold', marginTop: 2 },
  bookingBar: { position: 'absolute', bottom: 0, left: 0, right: 0, borderTopWidth: 1, borderTopColor: 'rgba(0,0,0,0.08)', paddingHorizontal: 20, paddingTop: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  bookingCount: { fontSize: 13, fontFamily: 'Inter_400Regular' },
  bookingTotal: { fontSize: 20, fontFamily: 'Inter_700Bold' },
  bookButton: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 24, paddingVertical: 14, borderRadius: 14 },
  bookText: { color: '#FFF', fontSize: 15, fontFamily: 'Inter_600SemiBold' },
  chatFab: { position: 'absolute', bottom: 90, right: 20, width: 56, height: 56, borderRadius: 28, justifyContent: 'center', alignItems: 'center', elevation: 6, ...Platform.select({ web: { boxShadow: '0px 4px 12px rgba(0,0,0,0.2)' }, default: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 12 } }) },
  chatHeader: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 16, paddingBottom: 12, borderBottomWidth: 1 },
  chatHeaderInfo: { flex: 1 },
  chatHeaderName: { fontSize: 16, fontFamily: 'Inter_600SemiBold' },
  chatOnline: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  onlineDot: { width: 6, height: 6, borderRadius: 3 },
  chatOnlineText: { fontSize: 12, fontFamily: 'Inter_400Regular' },
  chatMessages: { flex: 1 },
  chatBubble: { maxWidth: '80%', padding: 12, borderRadius: 16 },
  userBubble: { alignSelf: 'flex-end', borderBottomRightRadius: 4 },
  salonBubble: { alignSelf: 'flex-start', borderBottomLeftRadius: 4, borderWidth: 1 },
  chatBubbleText: { fontSize: 14, fontFamily: 'Inter_400Regular', lineHeight: 20 },
  chatInputBar: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 16, paddingTop: 10, borderTopWidth: 1 },
  chatTextInput: { flex: 1, height: 42, borderRadius: 21, paddingHorizontal: 16, fontSize: 14, fontFamily: 'Inter_400Regular', borderWidth: 1 },
  sendBtn: { width: 42, height: 42, borderRadius: 21, justifyContent: 'center', alignItems: 'center' },
});
