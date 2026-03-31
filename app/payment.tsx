import { useState } from 'react';
import { View, Text, ScrollView, Pressable, TextInput, StyleSheet, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useColors } from '@/hooks/useColors';

const paymentMethods = [
  { id: 'card', label: 'Card', icon: 'card' },
  { id: 'upi', label: 'UPI', icon: 'phone-portrait' },
  { id: 'wallet', label: 'Wallet', icon: 'wallet' },
];

export default function PaymentScreen() {
  const router = useRouter();
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const [method, setMethod] = useState('card');
  const [promo, setPromo] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const topPad = Platform.OS === 'web' ? 67 : insets.top;

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      router.push('/confirmation');
    }, 2000);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { paddingTop: topPad + 8 }]}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>Payment</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 120 }} showsVerticalScrollIndicator={false}>
        <View style={styles.padded}>
          <Animated.View entering={FadeInDown.delay(100)}>
            <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Payment Method</Text>
            <View style={styles.methodRow}>
              {paymentMethods.map((m) => (
                <Pressable
                  key={m.id}
                  style={[
                    styles.methodCard,
                    { borderColor: method === m.id ? colors.brandPrimary : colors.borderLight },
                    method === m.id && { backgroundColor: colors.primarySubtle },
                  ]}
                  onPress={() => setMethod(m.id)}
                >
                  <Ionicons name={m.icon as any} size={24} color={method === m.id ? colors.brandPrimary : colors.textTertiary} />
                  <Text style={[styles.methodLabel, { color: method === m.id ? colors.brandPrimary : colors.textSecondary }]}>{m.label}</Text>
                </Pressable>
              ))}
            </View>
          </Animated.View>

          {method === 'card' && (
            <Animated.View entering={FadeInDown.delay(200)} style={styles.cardForm}>
              <View style={styles.inputGroup}>
                <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>Card Number</Text>
                <TextInput style={[styles.input, { color: colors.textPrimary, borderColor: colors.borderLight }]} placeholder="0000 0000 0000 0000" placeholderTextColor={colors.textDisabled} keyboardType="number-pad" />
              </View>
              <View style={styles.inputRow}>
                <View style={[styles.inputGroup, { flex: 1 }]}>
                  <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>Expiry</Text>
                  <TextInput style={[styles.input, { color: colors.textPrimary, borderColor: colors.borderLight }]} placeholder="MM/YY" placeholderTextColor={colors.textDisabled} />
                </View>
                <View style={[styles.inputGroup, { flex: 1 }]}>
                  <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>CVV</Text>
                  <TextInput style={[styles.input, { color: colors.textPrimary, borderColor: colors.borderLight }]} placeholder="123" placeholderTextColor={colors.textDisabled} secureTextEntry keyboardType="number-pad" />
                </View>
              </View>
            </Animated.View>
          )}

          <Animated.View entering={FadeInDown.delay(300)} style={styles.promoSection}>
            <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Promo Code</Text>
            <View style={styles.promoRow}>
              <TextInput
                style={[styles.promoInput, { color: colors.textPrimary, borderColor: colors.borderLight }]}
                placeholder="Enter code"
                placeholderTextColor={colors.textDisabled}
                value={promo}
                onChangeText={setPromo}
              />
              <Pressable style={[styles.applyBtn, { backgroundColor: colors.brandPrimary }]}>
                <Text style={styles.applyText}>Apply</Text>
              </Pressable>
            </View>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(400)} style={[styles.summaryCard, { borderColor: colors.borderLight }]}>
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>Subtotal</Text>
              <Text style={[styles.summaryValue, { color: colors.textPrimary }]}>{'\u20B9'}1,200</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>Tax (18%)</Text>
              <Text style={[styles.summaryValue, { color: colors.textPrimary }]}>{'\u20B9'}216</Text>
            </View>
            <View style={[styles.summaryDivider, { backgroundColor: colors.borderLight }]} />
            <View style={styles.summaryRow}>
              <Text style={[styles.totalLabel, { color: colors.textPrimary }]}>Total</Text>
              <Text style={[styles.totalValue, { color: colors.brandPrimary }]}>{'\u20B9'}1,416</Text>
            </View>
          </Animated.View>
        </View>
      </ScrollView>

      <View style={[styles.bottomBar, { paddingBottom: insets.bottom + 12 }]}>
        <Pressable onPress={handlePay} disabled={isProcessing} style={{ flex: 1, opacity: isProcessing ? 0.6 : 1 }}>
          <LinearGradient colors={['#FF1B8D', '#E85A8B']} style={styles.payBtn}>
            <Text style={styles.payText}>{isProcessing ? 'Processing...' : 'Pay \u20B91,416'}</Text>
          </LinearGradient>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingBottom: 16 },
  headerTitle: { fontSize: 18, fontFamily: 'Inter_600SemiBold' },
  padded: { paddingHorizontal: 20 },
  sectionTitle: { fontSize: 18, fontFamily: 'Inter_700Bold', marginBottom: 12 },
  methodRow: { flexDirection: 'row', gap: 10, marginBottom: 24 },
  methodCard: { flex: 1, paddingVertical: 16, borderRadius: 14, borderWidth: 1, alignItems: 'center', gap: 6 },
  methodLabel: { fontSize: 13, fontFamily: 'Inter_600SemiBold' },
  cardForm: { marginBottom: 24 },
  inputGroup: { marginBottom: 14 },
  inputLabel: { fontSize: 13, fontFamily: 'Inter_500Medium', marginBottom: 6 },
  input: { borderWidth: 1, borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14, fontSize: 15, fontFamily: 'Inter_400Regular' },
  inputRow: { flexDirection: 'row', gap: 12 },
  promoSection: { marginBottom: 24 },
  promoRow: { flexDirection: 'row', gap: 10 },
  promoInput: { flex: 1, borderWidth: 1, borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12, fontSize: 15, fontFamily: 'Inter_400Regular' },
  applyBtn: { paddingHorizontal: 20, borderRadius: 12, justifyContent: 'center' },
  applyText: { color: '#FFF', fontSize: 14, fontFamily: 'Inter_600SemiBold' },
  summaryCard: { borderWidth: 1, borderRadius: 16, padding: 20 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  summaryLabel: { fontSize: 14, fontFamily: 'Inter_400Regular' },
  summaryValue: { fontSize: 14, fontFamily: 'Inter_500Medium' },
  summaryDivider: { height: 1, marginVertical: 10 },
  totalLabel: { fontSize: 17, fontFamily: 'Inter_700Bold' },
  totalValue: { fontSize: 20, fontFamily: 'Inter_700Bold' },
  bottomBar: { paddingHorizontal: 20, paddingTop: 12, borderTopWidth: 1, borderTopColor: 'rgba(0,0,0,0.06)' },
  payBtn: { paddingVertical: 16, borderRadius: 14, alignItems: 'center' },
  payText: { color: '#FFF', fontSize: 16, fontFamily: 'Inter_600SemiBold' },
});
