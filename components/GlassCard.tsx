import React from 'react';
import { View, StyleSheet, type ViewStyle } from 'react-native';
import { useColors } from '@/hooks/useColors';

interface GlassCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  intensity?: 'light' | 'medium' | 'heavy';
}

export function GlassCard({ children, style, intensity = 'medium' }: GlassCardProps) {
  const colors = useColors();

  const bgColor = intensity === 'light'
    ? colors.surfaceGlassLight
    : intensity === 'heavy'
      ? colors.surfaceGlassHeavy
      : colors.surfaceGlassMedium;

  return (
    <View style={[styles.card, { backgroundColor: bgColor, borderColor: colors.borderLight }, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.06)',
    elevation: 2,
  },
});
