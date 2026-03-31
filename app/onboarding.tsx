import { useState, useRef, useCallback } from 'react';
import { View, Text, Pressable, StyleSheet, Dimensions, FlatList, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeIn, FadeInRight, useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { setFlag, KEYS } from '@/lib/storage';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    eyebrow: 'DISCOVER',
    title: 'Your perfect\nbeauty salon',
    subtitle: 'Find top-rated salons & stylists near you with real-time availability',
    icon: 'location' as const,
    colors: ['#E85A8B', '#CC0066'] as [string, string],
  },
  {
    image: 'https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    eyebrow: 'BOOK INSTANTLY',
    title: 'One tap\nappointments',
    subtitle: 'Schedule your beauty routine with ease. Choose your stylist, date & time',
    icon: 'calendar' as const,
    colors: ['#C8A96A', '#E6D3A3'] as [string, string],
  },
  {
    image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    eyebrow: 'PREMIUM EXPERIENCE',
    title: 'Luxury beauty\nservices',
    subtitle: 'Access exclusive treatments, expert stylists & premium care',
    icon: 'star' as const,
    colors: ['#F59E0B', '#EAB308'] as [string, string],
  },
  {
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    eyebrow: 'GET STARTED',
    title: 'Your beauty\njourney begins',
    subtitle: 'Join thousands of happy customers discovering their perfect look',
    icon: 'sparkles' as const,
    colors: ['#E85A8B', '#F59E0B'] as [string, string],
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const isLast = currentIndex === slides.length - 1;

  const handleComplete = useCallback(async () => {
    await setFlag(KEYS.ONBOARDING_COMPLETED, true);
    router.replace('/(tabs)');
  }, [router]);

  const handleNext = useCallback(() => {
    if (isLast) {
      handleComplete();
    } else {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1, animated: true });
    }
  }, [isLast, currentIndex, handleComplete]);

  const topPad = Platform.OS === 'web' ? 67 : insets.top;

  const renderItem = useCallback(({ item, index }: { item: typeof slides[0]; index: number }) => (
    <View style={[styles.slide, { width: SCREEN_WIDTH }]}>
      <Image source={{ uri: item.image }} style={styles.slideImage} contentFit="cover" />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.7)', 'rgba(0,0,0,0.9)']}
        style={styles.slideGradient}
      />
      <View style={[styles.slideContent, { paddingBottom: insets.bottom + 120 }]}>
        <View style={styles.eyebrowRow}>
          <View style={[styles.eyebrowLine, { backgroundColor: item.colors[0] }]} />
          <Text style={[styles.eyebrow, { color: item.colors[0] }]}>{item.eyebrow}</Text>
        </View>
        <Text style={styles.slideTitle}>{item.title}</Text>
        <Text style={styles.slideSubtitle}>{item.subtitle}</Text>
      </View>
    </View>
  ), [insets.bottom]);

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) => {
          const newIndex = Math.round(e.nativeEvent.contentOffset.x / SCREEN_WIDTH);
          setCurrentIndex(newIndex);
        }}
        keyExtractor={(_, i) => i.toString()}
      />

      <Pressable
        style={[styles.skipButton, { top: topPad + 12 }]}
        onPress={handleComplete}
      >
        <Text style={styles.skipText}>Skip</Text>
      </Pressable>

      <View style={[styles.bottomControls, { bottom: insets.bottom + 24 }]}>
        <View style={styles.indicators}>
          {slides.map((_, i) => (
            <View
              key={i}
              style={[
                styles.indicator,
                i === currentIndex ? styles.activeIndicator : styles.inactiveIndicator,
              ]}
            />
          ))}
        </View>

        <Pressable onPress={handleNext}>
          <LinearGradient
            colors={[...slides[currentIndex].colors]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.nextButton}
          >
            <Ionicons name="arrow-forward" size={24} color="#FFF" />
          </LinearGradient>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  slide: {
    flex: 1,
  },
  slideImage: {
    ...StyleSheet.absoluteFillObject,
  },
  slideGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  slideContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 28,
  },
  eyebrowRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  eyebrowLine: {
    width: 24,
    height: 3,
    borderRadius: 2,
  },
  eyebrow: {
    fontSize: 13,
    fontFamily: 'Inter_700Bold',
    letterSpacing: 2,
  },
  slideTitle: {
    fontSize: 36,
    fontFamily: 'Inter_700Bold',
    color: '#FFFFFF',
    lineHeight: 42,
    marginBottom: 12,
  },
  slideSubtitle: {
    fontSize: 15,
    fontFamily: 'Inter_400Regular',
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: 22,
  },
  skipButton: {
    position: 'absolute',
    right: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  skipText: {
    color: '#FFF',
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
  },
  bottomControls: {
    position: 'absolute',
    left: 28,
    right: 28,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  indicators: {
    flexDirection: 'row',
    gap: 6,
  },
  indicator: {
    height: 4,
    borderRadius: 2,
  },
  activeIndicator: {
    width: 24,
    backgroundColor: '#FF1B8D',
  },
  inactiveIndicator: {
    width: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  nextButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 5,
  },
});
