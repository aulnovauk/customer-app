import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { ThemeProvider } from '@/context/ThemeContext';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { useColors } from '@/hooks/useColors';

SplashScreen.preventAutoHideAsync();

function RootLayoutNav() {
  const colors = useColors();

  return (
    <>
      <StatusBar style="auto" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="geolocation" />
        <Stack.Screen name="notifications-setup" />
        <Stack.Screen name="brand-intro" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="search" options={{ presentation: 'modal', animation: 'slide_from_bottom' }} />
        <Stack.Screen name="salon/[id]" />
        <Stack.Screen name="salons" />
        <Stack.Screen name="booking/[salonId]" />
        <Stack.Screen name="payment" />
        <Stack.Screen name="confirmation" />
        <Stack.Screen name="map" />
        <Stack.Screen name="notifications" />
        <Stack.Screen name="shop" />
        <Stack.Screen name="events" />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ErrorBoundary>
          <ThemeProvider>
            <KeyboardProvider>
              <RootLayoutNav />
            </KeyboardProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
