import React, { useEffect } from 'react';
import { View, StyleSheet, type ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { useColors } from '@/hooks/useColors';

interface SkeletonProps {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  style?: ViewStyle;
}

export function Skeleton({ width = '100%', height = 16, borderRadius = 8, style }: SkeletonProps) {
  const colors = useColors();
  const opacity = useSharedValue(0.3);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(0.7, { duration: 800 }),
        withTiming(0.3, { duration: 800 })
      ),
      -1,
      false
    );
  }, [opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[
        animatedStyle,
        {
          width: width as any,
          height,
          borderRadius,
          backgroundColor: colors.textDisabled,
        },
        style,
      ]}
    />
  );
}

export function SalonCardSkeleton() {
  return (
    <View style={skeletonStyles.card}>
      <Skeleton height={180} borderRadius={16} />
      <View style={skeletonStyles.content}>
        <Skeleton width="70%" height={18} />
        <Skeleton width="50%" height={14} style={{ marginTop: 8 }} />
        <View style={skeletonStyles.row}>
          <Skeleton width="30%" height={14} />
          <Skeleton width="20%" height={14} />
        </View>
      </View>
    </View>
  );
}

export function CategorySkeleton() {
  return (
    <View style={skeletonStyles.categoryItem}>
      <Skeleton width={64} height={64} borderRadius={32} />
      <Skeleton width={50} height={12} style={{ marginTop: 8 }} />
    </View>
  );
}

const skeletonStyles = StyleSheet.create({
  card: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
  },
  content: {
    padding: 14,
    gap: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  categoryItem: {
    alignItems: 'center',
    width: 80,
    marginRight: 12,
  },
});
