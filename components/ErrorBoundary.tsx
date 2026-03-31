import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { reloadAppAsync } from 'expo';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '@/hooks/useColors';

function ErrorFallback({ error }: { error: Error }) {
  const colors = useColors();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { backgroundColor: colors.background, paddingTop: insets.top + 40 }]}>
      <Text style={[styles.title, { color: colors.textPrimary }]}>Something went wrong</Text>
      <Text style={[styles.message, { color: colors.textSecondary }]}>{error.message}</Text>
      <Pressable
        style={[styles.button, { backgroundColor: colors.brandPrimary }]}
        onPress={() => reloadAppAsync()}
      >
        <Text style={[styles.buttonText, { color: colors.textInverse }]}>Restart App</Text>
      </Pressable>
    </View>
  );
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError && this.state.error) {
      return <ErrorFallback error={this.state.error} />;
    }
    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 22,
    fontFamily: 'Inter_700Bold',
    marginBottom: 12,
  },
  message: {
    fontSize: 15,
    fontFamily: 'Inter_400Regular',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 22,
  },
  button: {
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 16,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
});
