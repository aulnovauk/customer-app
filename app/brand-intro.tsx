import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withSequence,
  FadeIn,
  FadeOut,
  Easing,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { setFlag, KEYS } from '@/lib/storage';
import { gradientColors } from '@/constants/colors';

const BRAND_NAME = 'Beauté';

function AnimatedLetter({ letter, index }: { letter: string; index: number }) {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(30);

  useEffect(() => {
    opacity.value = withDelay(800 + index * 120, withTiming(1, { duration: 400 }));
    translateY.value = withDelay(800 + index * 120, withTiming(0, { duration: 400, easing: Easing.out(Easing.back(1.5)) }));
  }, [index, opacity, translateY]);

  const style = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.Text style={[styles.letter, style]}>
      {letter}
    </Animated.Text>
  );
}

export default function BrandIntroScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const timer = setTimeout(async () => {
      await setFlag(KEYS.BRAND_INTRO_SHOWN, true);
      router.replace('/(tabs)');
    }, 4000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <LinearGradient
      colors={[...gradientColors.brandPurpleReverse]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.content}>
        <Animated.View entering={FadeIn.delay(300).duration(600)} style={styles.sparkleContainer}>
          <Ionicons name="sparkles" size={40} color="rgba(255,255,255,0.8)" />
        </Animated.View>

        <View style={styles.lettersRow}>
          {BRAND_NAME.split('').map((letter, i) => (
            <AnimatedLetter key={i} letter={letter} index={i} />
          ))}
        </View>

        <Animated.Text entering={FadeIn.delay(2000).duration(600)} style={styles.tagline}>
          Your Beauty, Perfected
        </Animated.Text>
      </View>

      <Animated.View entering={FadeIn.delay(2500).duration(600)} style={[styles.bottomBar, { paddingBottom: insets.bottom + 16 }]}>
        <View style={styles.shimmerLine} />
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  sparkleContainer: {
    marginBottom: 20,
  },
  lettersRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  letter: {
    fontSize: 52,
    fontFamily: 'Inter_700Bold',
    color: '#FFFFFF',
    letterSpacing: 2,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 16,
  },
  tagline: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: 'rgba(255, 255, 255, 0.7)',
    letterSpacing: 4,
    textTransform: 'uppercase',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
  },
  shimmerLine: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
});
