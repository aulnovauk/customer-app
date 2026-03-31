import { useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, Platform, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  withDelay,
  FadeInUp,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Location from 'expo-location';
import { setFlag, KEYS } from '@/lib/storage';
import { useColors } from '@/hooks/useColors';
import { gradientColors } from '@/constants/colors';

function PulseRing({ delay, size }: { delay: number; size: number }) {
  const scale = useSharedValue(0.8);
  const opacity = useSharedValue(0.6);

  useEffect(() => {
    scale.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(1.5, { duration: 2000 }),
          withTiming(0.8, { duration: 2000 })
        ),
        -1,
        false
      )
    );
    opacity.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(0.1, { duration: 2000 }),
          withTiming(0.6, { duration: 2000 })
        ),
        -1,
        false
      )
    );
  }, [delay, scale, opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth: 2,
          borderColor: 'rgba(255, 27, 141, 0.3)',
        },
        animatedStyle,
      ]}
    />
  );
}

export default function GeolocationScreen() {
  const router = useRouter();
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === 'web' ? 67 : insets.top;

  const handleAllow = async () => {
    if (Platform.OS === 'web') {
      try {
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        await setFlag(KEYS.GEOLOCATION_PERMISSION, true);
      } catch {
        await setFlag(KEYS.GEOLOCATION_PERMISSION, true);
      }
    } else {
      const { status } = await Location.requestForegroundPermissionsAsync();
      await setFlag(KEYS.GEOLOCATION_PERMISSION, true);
      if (status !== 'granted') {
        Alert.alert(
          'Location Access',
          'Location helps us find salons near you. You can enable it later in Settings.',
          [{ text: 'OK' }]
        );
      }
    }
    router.replace('/notifications-setup');
  };

  const handleSkip = async () => {
    await setFlag(KEYS.GEOLOCATION_PERMISSION, true);
    router.replace('/notifications-setup');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background, paddingTop: topPad }]}>
      <Pressable style={styles.skipButton} onPress={handleSkip}>
        <Text style={[styles.skipText, { color: colors.textTertiary }]}>Skip</Text>
      </Pressable>

      <View style={styles.content}>
        <Animated.View entering={FadeInUp.delay(200)} style={styles.iconContainer}>
          <View style={styles.pulseContainer}>
            <PulseRing delay={0} size={160} />
            <PulseRing delay={600} size={220} />
            <PulseRing delay={1200} size={280} />
          </View>
          <LinearGradient
            colors={[...gradientColors.primary]}
            style={styles.iconCircle}
          >
            <Ionicons name="location" size={48} color="#FFF" />
          </LinearGradient>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(400)}>
          <Text style={[styles.title, { color: colors.textPrimary }]}>Find salons near you</Text>
          <Text style={[styles.description, { color: colors.textSecondary }]}>
            Allow location access to discover the best beauty salons in your area with real-time availability
          </Text>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(600)} style={styles.features}>
          {[
            { icon: 'navigate' as const, text: 'Nearby salon discovery' },
            { icon: 'map' as const, text: 'Distance & directions' },
            { icon: 'time' as const, text: 'Real-time availability' },
          ].map((feature, i) => (
            <View key={i} style={styles.featureRow}>
              <View style={[styles.featureIcon, { backgroundColor: colors.primarySubtle }]}>
                <Ionicons name={feature.icon} size={18} color={colors.brandPrimary} />
              </View>
              <Text style={[styles.featureText, { color: colors.textPrimary }]}>{feature.text}</Text>
            </View>
          ))}
        </Animated.View>
      </View>

      <Animated.View entering={FadeInUp.delay(800)} style={[styles.bottomActions, { paddingBottom: insets.bottom + 24 }]}>
        <Pressable onPress={handleAllow}>
          <LinearGradient
            colors={[...gradientColors.primary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.allowButton}
          >
            <Ionicons name="location" size={20} color="#FFF" />
            <Text style={styles.allowText}>Allow Location Access</Text>
          </LinearGradient>
        </Pressable>
        <Pressable onPress={handleSkip} style={styles.notNowButton}>
          <Text style={[styles.notNowText, { color: colors.textTertiary }]}>Not Now</Text>
        </Pressable>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  skipButton: {
    alignSelf: 'flex-end',
    padding: 12,
  },
  skipText: {
    fontSize: 15,
    fontFamily: 'Inter_600SemiBold',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 40,
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
  },
  pulseContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FF1B8D',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 24,
    elevation: 8,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter_700Bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  description: {
    fontSize: 15,
    fontFamily: 'Inter_400Regular',
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 16,
  },
  features: {
    marginTop: 32,
    gap: 16,
    alignSelf: 'stretch',
    paddingHorizontal: 16,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  featureText: {
    fontSize: 15,
    fontFamily: 'Inter_500Medium',
  },
  bottomActions: {
    gap: 12,
  },
  allowButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    borderRadius: 16,
  },
  allowText: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
  notNowButton: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  notNowText: {
    fontSize: 15,
    fontFamily: 'Inter_500Medium',
  },
});
