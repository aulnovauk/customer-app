# Beauté – Luxury Beauty Booking (React Native / Expo)

A production-grade React Native mobile app for discovering and booking luxury beauty salon services, built with Expo and file-based routing.

## Tech Stack

- **Framework:** React Native 0.84 + TypeScript
- **Platform:** Expo SDK 53 with Expo Router (file-based routing)
- **Styling:** React Native StyleSheet (no NativeWind)
- **Fonts:** @expo-google-fonts/inter (Regular, Medium, SemiBold, Bold)
- **Icons:** @expo/vector-icons (Ionicons)
- **Images:** expo-image
- **Animations:** react-native-reanimated v4, react-native-gesture-handler
- **Navigation:** expo-router (Stack + Tabs)
- **Storage:** @react-native-async-storage/async-storage
- **Gradients:** expo-linear-gradient
- **Package Manager:** npm (use `--legacy-peer-deps` for installs)

## Project Structure

```
app/
  _layout.tsx           # Root layout with providers (Theme, SafeArea, GestureHandler, Keyboard)
  index.tsx             # Splash screen with animated gradient
  onboarding.tsx        # Onboarding carousel (4 slides)
  geolocation.tsx       # Location permission screen
  notifications-setup.tsx # Notification permission screen
  brand-intro.tsx       # Brand intro screen
  search.tsx            # Search modal
  salons.tsx            # Salon listing
  salon/[id].tsx        # Salon detail (Services/Reviews/About tabs)
  booking/[salonId].tsx # Booking flow
  payment.tsx           # Payment screen
  confirmation.tsx      # Booking confirmation
  map.tsx               # Map view
  notifications.tsx     # Notification center
  shop.tsx              # Beauty products shop
  events.tsx            # Events listing
  (tabs)/
    _layout.tsx         # Tab navigator (5 tabs)
    index.tsx           # Home screen
    explore.tsx         # Explore categories
    bookings.tsx        # My bookings
    favorites.tsx       # Favorite salons
    profile.tsx         # Profile + theme selector

constants/
  colors.ts             # 13 themes (light, dark, warm, genZ, luxe, ocean, sakura, cyber, sunset, mint, royal, classic, unisex)

context/
  ThemeContext.tsx       # AsyncStorage-backed theme persistence

hooks/
  useColors.ts          # Hook to access current theme colors

components/
  ErrorBoundary.tsx     # Error boundary wrapper
  SalonCard.tsx         # Reusable salon card (full + compact variants)
  GlassCard.tsx         # Glassmorphism card component
  LoadingSkeleton.tsx   # Loading placeholder

data/
  salons.ts             # Mock salon data (10 salons with services, images, reviews)

lib/
  storage.ts            # AsyncStorage helpers for flags/persistence

types/
  index.ts              # TypeScript interfaces (SalonData, Booking, etc.)

web-source/             # Original web app source (reference only)
```

## Themes

13 built-in themes selectable from Profile screen:
Light, Dark, Warm, Gen Z, Luxe, Ocean, Sakura, Cyber, Sunset, Mint, Royal, Classic, Unisex

## Development

The dev server runs via Expo Metro bundler on port 5000 in web mode:

```bash
npx expo start --port 5000 --web
```

## Key Notes

- Use `npm install --legacy-peer-deps` for package installs (peer dep conflicts with some Expo packages)
- `react-native-worklets` is required by `react-native-reanimated` v4
- Only `expo-router` and `expo-font` should be in app.json plugins (NOT expo-haptics)
- Platform.OS === 'web' uses 67px top padding for web safe area
- Tab bar adds extra bottom padding for web
