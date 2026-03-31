import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withRepeat,
  withSequence,
  withDelay,
  Easing,
  FadeIn,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getFlag, KEYS } from '@/lib/storage';
import { gradientColors } from '@/constants/colors';

function LoadingDot({ index }: { index: number }) {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(0.5);

  useEffect(() => {
    scale.value = withDelay(
      index * 200,
      withRepeat(
        withSequence(
          withTiming(1.3, { duration: 600, easing: Easing.inOut(Easing.ease) }),
          withTiming(1, { duration: 600, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        false
      )
    );
    opacity.value = withDelay(
      index * 200,
      withRepeat(
        withSequence(
          withTiming(1, { duration: 600 }),
          withTiming(0.5, { duration: 600 })
        ),
        -1,
        false
      )
    );
  }, [index, scale, opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return <Animated.View style={[styles.dot, animatedStyle]} />;
}

export default function SplashScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [isReady, setIsReady] = useState(false);

  const logoScale = useSharedValue(0.5);
  const logoOpacity = useSharedValue(0);
  const logoRotation = useSharedValue(-180);
  const titleOpacity = useSharedValue(0);
  const titleY = useSharedValue(20);

  const orbScale1 = useSharedValue(1);
  const orbX1 = useSharedValue(0);
  const orbY1 = useSharedValue(0);

  useEffect(() => {
    logoScale.value = withSpring(1, { damping: 12, stiffness: 100 });
    logoOpacity.value = withTiming(1, { duration: 1000 });
    logoRotation.value = withSpring(0, { damping: 12, stiffness: 80 });

    titleOpacity.value = withDelay(500, withTiming(1, { duration: 800 }));
    titleY.value = withDelay(500, withTiming(0, { duration: 800 }));

    orbScale1.value = withRepeat(
      withSequence(
        withTiming(1.2, { duration: 4000, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 4000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      false
    );
    orbX1.value = withRepeat(
      withSequence(
        withTiming(30, { duration: 4000 }),
        withTiming(0, { duration: 4000 })
      ),
      -1,
      false
    );
    orbY1.value = withRepeat(
      withSequence(
        withTiming(-30, { duration: 4000 }),
        withTiming(0, { duration: 4000 })
      ),
      -1,
      false
    );

    const timer = setTimeout(() => setIsReady(true), 2500);
    return () => clearTimeout(timer);
  }, [logoScale, logoOpacity, logoRotation, titleOpacity, titleY, orbScale1, orbX1, orbY1]);

  useEffect(() => {
    if (!isReady) return;

    (async () => {
      const onboardingDone = await getFlag(KEYS.ONBOARDING_COMPLETED);
      const geoDone = await getFlag(KEYS.GEOLOCATION_PERMISSION);
      const notifDone = await getFlag(KEYS.NOTIFICATION_PERMISSION);
      const brandDone = await getFlag(KEYS.BRAND_INTRO_SHOWN);

      if (!onboardingDone) {
        router.replace('/onboarding');
      } else if (!geoDone) {
        router.replace('/geolocation');
      } else if (!notifDone) {
        router.replace('/notifications-setup');
      } else if (!brandDone) {
        router.replace('/brand-intro');
      } else {
        router.replace('/(tabs)');
      }
    })();
  }, [isReady, router]);

  const logoAnimStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: logoScale.value },
      { rotate: `${logoRotation.value}deg` },
    ],
    opacity: logoOpacity.value,
  }));

  const titleAnimStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
    transform: [{ translateY: titleY.value }],
  }));

  const orbAnimStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: orbScale1.value },
      { translateX: orbX1.value },
      { translateY: orbY1.value },
    ],
  }));

  const topPad = Platform.OS === 'web' ? 67 : 0;

  return (
    <LinearGradient
      colors={[...gradientColors.brandPurpleReverse]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.container, { paddingTop: insets.top + topPad }]}
    >
      <Animated.View style={[styles.orb, styles.orb1, orbAnimStyle]} />
      <Animated.View style={[styles.orb, styles.orb2, orbAnimStyle]} />

      <View style={styles.content}>
        <Animated.View style={[styles.logoContainer, logoAnimStyle]}>
          <View style={styles.logoBox}>
            <Ionicons name="sparkles" size={56} color="#E85A8B" />
          </View>
        </Animated.View>

        <Animated.View style={titleAnimStyle}>
          <Text style={styles.title}>Beauté</Text>
          <Text style={styles.subtitle}>LUXURY BEAUTY</Text>
        </Animated.View>

        <Animated.View entering={FadeIn.delay(1200)} style={styles.dotsContainer}>
          {[0, 1, 2].map((i) => (
            <LoadingDot key={i} index={i} />
          ))}
        </Animated.View>
      </View>

      <Animated.Text entering={FadeIn.delay(1500)} style={[styles.version, { marginBottom: insets.bottom + 12 }]}>
        v1.0.0
      </Animated.Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  orb: {
    position: 'absolute',
    borderRadius: 999,
    opacity: 0.4,
  },
  orb1: {
    width: 256,
    height: 256,
    top: '20%',
    left: '10%',
    backgroundColor: '#F59E0B',
  },
  orb2: {
    width: 288,
    height: 288,
    bottom: '20%',
    right: '10%',
    backgroundColor: '#C8A96A',
    opacity: 0.3,
  },
  content: {
    alignItems: 'center',
    zIndex: 10,
  },
  logoContainer: {
    marginBottom: 24,
  },
  logoBox: {
    width: 112,
    height: 112,
    borderRadius: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0px 24px 48px rgba(0, 0, 0, 0.3)',
    elevation: 10,
  },
  title: {
    fontSize: 38,
    fontFamily: 'Inter_700Bold',
    color: '#FFFFFF',
    textAlign: 'center',
    letterSpacing: -0.5,
    marginBottom: 4,
    textShadow: '0px 4px 24px rgba(0, 0, 0, 0.2)',
  },
  subtitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 13,
    fontFamily: 'Inter_600SemiBold',
    letterSpacing: 3,
    textAlign: 'center',
  },
  dotsContainer: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 48,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  version: {
    position: 'absolute',
    bottom: 12,
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 12,
    fontFamily: 'Inter_500Medium',
  },
});
