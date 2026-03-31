import React, { useCallback } from 'react';
import { View, Text, Pressable, StyleSheet, Platform } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { useColors } from '@/hooks/useColors';
import type { SalonData } from '@/types';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface SalonCardProps {
  salon: SalonData;
  onPress?: () => void;
  compact?: boolean;
}

export function SalonCard({ salon, onPress, compact }: SalonCardProps) {
  const colors = useColors();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = useCallback(() => {
    scale.value = withSpring(0.97, { damping: 15, stiffness: 300 });
  }, [scale]);

  const handlePressOut = useCallback(() => {
    scale.value = withSpring(1, { damping: 15, stiffness: 300 });
  }, [scale]);

  if (compact) {
    return (
      <AnimatedPressable
        style={[animatedStyle, styles.compactCard, { backgroundColor: colors.surface }]}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <Image
          source={{ uri: salon.image }}
          style={styles.compactImage}
          contentFit="cover"
          transition={300}
        />
        <View style={styles.compactContent}>
          <Text style={[styles.compactName, { color: colors.textPrimary }]} numberOfLines={1}>
            {salon.name}
          </Text>
          <View style={styles.ratingRow}>
            <Ionicons name="star" size={12} color={colors.accentGold} />
            <Text style={[styles.ratingText, { color: colors.textSecondary }]}>
              {salon.rating} ({salon.reviews})
            </Text>
          </View>
          <Text style={[styles.compactPrice, { color: colors.brandPrimary }]}>{salon.price}</Text>
        </View>
      </AnimatedPressable>
    );
  }

  return (
    <AnimatedPressable
      style={[animatedStyle, styles.card, { backgroundColor: colors.surface }]}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Image
        source={{ uri: salon.image }}
        style={styles.cardImage}
        contentFit="cover"
        transition={300}
      />
      <View style={styles.imageOverlay}>
        {salon.trending && (
          <View style={[styles.trendingBadge, { backgroundColor: colors.brandPrimary }]}>
            <Ionicons name="flame" size={10} color="#FFF" />
            <Text style={styles.trendingText}>Trending</Text>
          </View>
        )}
        <View style={[styles.distanceBadge, { backgroundColor: 'rgba(0,0,0,0.5)' }]}>
          <Ionicons name="location" size={10} color="#FFF" />
          <Text style={styles.distanceText}>{salon.distanceKm} km</Text>
        </View>
      </View>
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <Text style={[styles.cardName, { color: colors.textPrimary }]} numberOfLines={1}>
            {salon.name}
          </Text>
          <View style={styles.ratingRow}>
            <Ionicons name="star" size={14} color={colors.accentGold} />
            <Text style={[styles.cardRating, { color: colors.textPrimary }]}>{salon.rating}</Text>
            <Text style={[styles.cardReviews, { color: colors.textTertiary }]}>({salon.reviews})</Text>
          </View>
        </View>
        <Text style={[styles.cardCategory, { color: colors.textSecondary }]}>{salon.category}</Text>
        <View style={styles.cardFooter}>
          <Text style={[styles.cardPrice, { color: colors.brandPrimary }]}>{salon.price}</Text>
          <View style={styles.openStatus}>
            <View style={[styles.openDot, { backgroundColor: colors.success }]} />
            <Text style={[styles.openText, { color: colors.success }]}>Open</Text>
          </View>
        </View>
      </View>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    ...Platform.select({
      web: { boxShadow: '0px 2px 12px rgba(0, 0, 0, 0.08)' },
      default: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 12 },
    }),
    elevation: 3,
  },
  cardImage: {
    width: '100%',
    height: 180,
  },
  imageOverlay: {
    position: 'absolute',
    top: 12,
    left: 12,
    right: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  trendingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  trendingText: {
    color: '#FFF',
    fontSize: 11,
    fontFamily: 'Inter_600SemiBold',
  },
  distanceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  distanceText: {
    color: '#FFF',
    fontSize: 11,
    fontFamily: 'Inter_500Medium',
  },
  cardContent: {
    padding: 14,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  cardName: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    flex: 1,
    marginRight: 8,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  cardRating: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
  },
  cardReviews: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
  },
  cardCategory: {
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
    marginBottom: 8,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardPrice: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
  },
  openStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  openDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  openText: {
    fontSize: 12,
    fontFamily: 'Inter_500Medium',
  },
  compactCard: {
    width: 200,
    borderRadius: 14,
    overflow: 'hidden',
    marginRight: 12,
    ...Platform.select({
      web: { boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.06)' },
      default: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8 },
    }),
    elevation: 2,
  },
  compactImage: {
    width: '100%',
    height: 130,
  },
  compactContent: {
    padding: 10,
  },
  compactName: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 4,
  },
  ratingText: {
    fontSize: 11,
    fontFamily: 'Inter_400Regular',
  },
  compactPrice: {
    fontSize: 13,
    fontFamily: 'Inter_600SemiBold',
    marginTop: 4,
  },
});
