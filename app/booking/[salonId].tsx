import { useState, useMemo } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, Platform } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useColors } from '@/hooks/useColors';
import { allSalons } from '@/data/salons';

const stylists = [
  { id: 1, name: 'Priya S.', specialty: 'Hair Styling', rating: 4.9, image: null },
  { id: 2, name: 'Anita D.', specialty: 'Skincare', rating: 4.8, image: null },
  { id: 3, name: 'Meera K.', specialty: 'Nail Art', rating: 5.0, image: null },
];

const timeSlots = [
  { period: 'Morning', slots: ['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM'] },
  { period: 'Afternoon', slots: ['12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM'] },
  { period: 'Evening', slots: ['4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM'] },
];

const getNextDays = () => {
  const days = [];
  const today = new Date();
  for (let i = 0; i < 14; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    days.push({
      date: d.toISOString().split('T')[0],
      day: d.toLocaleDateString('en-US', { weekday: 'short' }),
      num: d.getDate(),
      month: d.toLocaleDateString('en-US', { month: 'short' }),
      isToday: i === 0,
    });
  }
  return days;
};

export default function BookingScreen() {
  const { salonId } = useLocalSearchParams<{ salonId: string }>();
  const router = useRouter();
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const [step, setStep] = useState(0);
  const [selectedStylist, setSelectedStylist] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const topPad = Platform.OS === 'web' ? 67 : insets.top;

  const salon = useMemo(() => allSalons.find((s) => s.id === Number(salonId)), [salonId]);
  const days = useMemo(getNextDays, []);
  const steps = ['Professional', 'Schedule', 'Review'];

  const canProceed = step === 0 ? selectedStylist !== null : step === 1 ? selectedDate !== null && selectedTime !== null : true;

  const handleNext = () => {
    if (step < 2) setStep(step + 1);
    else router.push('/payment');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { paddingTop: topPad + 8 }]}>
        <Pressable onPress={() => (step > 0 ? setStep(step - 1) : router.back())}>
          <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>Book Appointment</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.stepIndicator}>
        {steps.map((s, i) => (
          <View key={i} style={styles.stepItem}>
            <View style={[styles.stepDot, { backgroundColor: i <= step ? colors.brandPrimary : colors.textDisabled }]}>
              {i < step ? (
                <Ionicons name="checkmark" size={14} color="#FFF" />
              ) : (
                <Text style={[styles.stepNum, { color: i <= step ? '#FFF' : colors.textTertiary }]}>{i + 1}</Text>
              )}
            </View>
            <Text style={[styles.stepLabel, { color: i <= step ? colors.brandPrimary : colors.textTertiary }]}>{s}</Text>
            {i < steps.length - 1 && <View style={[styles.stepLine, { backgroundColor: i < step ? colors.brandPrimary : colors.textDisabled }]} />}
          </View>
        ))}
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={{ paddingBottom: 120 }} showsVerticalScrollIndicator={false}>
        {step === 0 && (
          <Animated.View entering={FadeInDown} style={styles.padded}>
            <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Choose Your Professional</Text>
            {stylists.map((stylist) => (
              <Pressable
                key={stylist.id}
                style={[
                  styles.stylistCard,
                  { borderColor: selectedStylist === stylist.id ? colors.brandPrimary : colors.borderLight },
                  selectedStylist === stylist.id && { backgroundColor: colors.primarySubtle },
                ]}
                onPress={() => setSelectedStylist(stylist.id)}
              >
                <View style={[styles.stylistAvatar, { backgroundColor: colors.primarySubtle }]}>
                  <Text style={[styles.stylistInitial, { color: colors.brandPrimary }]}>{stylist.name[0]}</Text>
                </View>
                <View style={styles.stylistInfo}>
                  <Text style={[styles.stylistName, { color: colors.textPrimary }]}>{stylist.name}</Text>
                  <Text style={[styles.stylistSpec, { color: colors.textSecondary }]}>{stylist.specialty}</Text>
                </View>
                <View style={styles.stylistRating}>
                  <Ionicons name="star" size={14} color={colors.accentGold} />
                  <Text style={[styles.ratingText, { color: colors.textPrimary }]}>{stylist.rating}</Text>
                </View>
              </Pressable>
            ))}
          </Animated.View>
        )}

        {step === 1 && (
          <Animated.View entering={FadeInDown} style={styles.padded}>
            <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Select Date</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.dateScroll}>
              {days.map((day) => (
                <Pressable
                  key={day.date}
                  style={[
                    styles.dateCard,
                    { borderColor: selectedDate === day.date ? colors.brandPrimary : colors.borderLight },
                    selectedDate === day.date && { backgroundColor: colors.brandPrimary },
                  ]}
                  onPress={() => setSelectedDate(day.date)}
                >
                  <Text style={[styles.dateDay, { color: selectedDate === day.date ? '#FFF' : colors.textTertiary }]}>{day.day}</Text>
                  <Text style={[styles.dateNum, { color: selectedDate === day.date ? '#FFF' : colors.textPrimary }]}>{day.num}</Text>
                  <Text style={[styles.dateMonth, { color: selectedDate === day.date ? 'rgba(255,255,255,0.8)' : colors.textTertiary }]}>{day.month}</Text>
                </Pressable>
              ))}
            </ScrollView>

            <Text style={[styles.sectionTitle, { color: colors.textPrimary, marginTop: 24 }]}>Select Time</Text>
            {timeSlots.map((period) => (
              <View key={period.period} style={styles.timePeriod}>
                <Text style={[styles.periodLabel, { color: colors.textSecondary }]}>{period.period}</Text>
                <View style={styles.slotsGrid}>
                  {period.slots.map((slot) => (
                    <Pressable
                      key={slot}
                      style={[
                        styles.timeSlot,
                        { borderColor: selectedTime === slot ? colors.brandPrimary : colors.borderLight },
                        selectedTime === slot && { backgroundColor: colors.brandPrimary },
                      ]}
                      onPress={() => setSelectedTime(slot)}
                    >
                      <Text style={[styles.slotText, { color: selectedTime === slot ? '#FFF' : colors.textPrimary }]}>{slot}</Text>
                    </Pressable>
                  ))}
                </View>
              </View>
            ))}
          </Animated.View>
        )}

        {step === 2 && (
          <Animated.View entering={FadeInDown} style={styles.padded}>
            <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Booking Summary</Text>
            <View style={[styles.summaryCard, { backgroundColor: colors.surface, borderColor: colors.borderLight }]}>
              <Text style={[styles.summaryLabel, { color: colors.textTertiary }]}>Salon</Text>
              <Text style={[styles.summaryValue, { color: colors.textPrimary }]}>{salon?.name}</Text>
              <Text style={[styles.summaryLabel, { color: colors.textTertiary, marginTop: 12 }]}>Professional</Text>
              <Text style={[styles.summaryValue, { color: colors.textPrimary }]}>{stylists.find((s) => s.id === selectedStylist)?.name}</Text>
              <Text style={[styles.summaryLabel, { color: colors.textTertiary, marginTop: 12 }]}>Date & Time</Text>
              <Text style={[styles.summaryValue, { color: colors.textPrimary }]}>{selectedDate} at {selectedTime}</Text>
              <View style={[styles.summaryDivider, { backgroundColor: colors.borderLight }]} />
              <View style={styles.summaryTotalRow}>
                <Text style={[styles.summaryTotalLabel, { color: colors.textPrimary }]}>Total</Text>
                <Text style={[styles.summaryTotalValue, { color: colors.brandPrimary }]}>{'\u20B9'}1,200</Text>
              </View>
            </View>
          </Animated.View>
        )}
      </ScrollView>

      <View style={[styles.bottomBar, { paddingBottom: insets.bottom + 12 }]}>
        <Pressable onPress={handleNext} disabled={!canProceed} style={{ opacity: canProceed ? 1 : 0.5, flex: 1 }}>
          <LinearGradient colors={['#FF1B8D', '#E85A8B']} style={styles.nextBtn}>
            <Text style={styles.nextText}>{step === 2 ? 'Proceed to Payment' : 'Continue'}</Text>
            <Ionicons name="arrow-forward" size={18} color="#FFF" />
          </LinearGradient>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingBottom: 12 },
  headerTitle: { fontSize: 18, fontFamily: 'Inter_600SemiBold' },
  stepIndicator: { flexDirection: 'row', paddingHorizontal: 20, marginBottom: 20, alignItems: 'center', justifyContent: 'center' },
  stepItem: { flexDirection: 'row', alignItems: 'center' },
  stepDot: { width: 28, height: 28, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  stepNum: { fontSize: 13, fontFamily: 'Inter_600SemiBold' },
  stepLabel: { fontSize: 12, fontFamily: 'Inter_500Medium', marginLeft: 6 },
  stepLine: { width: 30, height: 2, marginHorizontal: 6, borderRadius: 1 },
  scroll: { flex: 1 },
  padded: { paddingHorizontal: 20 },
  sectionTitle: { fontSize: 20, fontFamily: 'Inter_700Bold', marginBottom: 14 },
  stylistCard: { flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 14, borderWidth: 1, marginBottom: 10 },
  stylistAvatar: { width: 48, height: 48, borderRadius: 24, justifyContent: 'center', alignItems: 'center' },
  stylistInitial: { fontSize: 20, fontFamily: 'Inter_700Bold' },
  stylistInfo: { flex: 1, marginLeft: 12 },
  stylistName: { fontSize: 16, fontFamily: 'Inter_600SemiBold' },
  stylistSpec: { fontSize: 13, fontFamily: 'Inter_400Regular' },
  stylistRating: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  ratingText: { fontSize: 14, fontFamily: 'Inter_600SemiBold' },
  dateScroll: { gap: 10, paddingBottom: 8 },
  dateCard: { width: 64, paddingVertical: 12, borderRadius: 14, borderWidth: 1, alignItems: 'center' },
  dateDay: { fontSize: 12, fontFamily: 'Inter_500Medium' },
  dateNum: { fontSize: 20, fontFamily: 'Inter_700Bold', marginVertical: 2 },
  dateMonth: { fontSize: 11, fontFamily: 'Inter_400Regular' },
  timePeriod: { marginBottom: 20 },
  periodLabel: { fontSize: 14, fontFamily: 'Inter_600SemiBold', marginBottom: 10 },
  slotsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  timeSlot: { paddingHorizontal: 14, paddingVertical: 10, borderRadius: 10, borderWidth: 1 },
  slotText: { fontSize: 13, fontFamily: 'Inter_500Medium' },
  summaryCard: { borderRadius: 16, borderWidth: 1, padding: 20 },
  summaryLabel: { fontSize: 13, fontFamily: 'Inter_400Regular' },
  summaryValue: { fontSize: 16, fontFamily: 'Inter_600SemiBold', marginTop: 2 },
  summaryDivider: { height: 1, marginVertical: 16 },
  summaryTotalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  summaryTotalLabel: { fontSize: 18, fontFamily: 'Inter_600SemiBold' },
  summaryTotalValue: { fontSize: 22, fontFamily: 'Inter_700Bold' },
  bottomBar: { paddingHorizontal: 20, paddingTop: 12, borderTopWidth: 1, borderTopColor: 'rgba(0,0,0,0.06)' },
  nextBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, paddingVertical: 16, borderRadius: 14 },
  nextText: { color: '#FFF', fontSize: 16, fontFamily: 'Inter_600SemiBold' },
});
