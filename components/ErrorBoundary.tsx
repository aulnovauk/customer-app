import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

function ErrorFallback({ error }: { error: Error }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Something went wrong</Text>
      <Text style={styles.message}>{error.message}</Text>
      <Pressable
        style={styles.button}
        onPress={() => {
          try {
            const { reloadAppAsync } = require('expo');
            reloadAppAsync();
          } catch {
            // fallback - no-op
          }
        }}
      >
        <Text style={styles.buttonText}>Restart App</Text>
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
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 12,
    color: '#111827',
  },
  message: {
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 22,
    color: '#6B7280',
  },
  button: {
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 16,
    backgroundColor: '#E85A8B',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
