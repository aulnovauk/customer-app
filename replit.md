# Beauté – Luxury Beauty Booking (React Native / Expo)

A production-grade React Native mobile app for discovering and booking luxury beauty salon services, built with Expo SDK 55 and file-based routing.

## Tech Stack

- **Framework:** React Native 0.84 + TypeScript
- **Platform:** Expo SDK 55 with Expo Router (file-based routing)
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
  _layout.tsx              # Root layout (Theme, SafeArea, GestureHandler)
  index.tsx                # Splash screen with animated gradient
  onboarding.tsx           # Onboarding carousel (3 slides)
  geolocation.tsx          # Location permission (expo-location)
  notifications-setup.tsx  # Notification permission (expo-notifications)
  brand-intro.tsx          # Brand intro screen
  search.tsx               # Search with recent searches
  salons.tsx               # Salon listing with sort (distance/rating/price)
  salon/[id].tsx           # Salon detail (Services/Reviews/About + Chat + Similar Salons)
  booking/[salonId].tsx    # 3-step booking flow (Stylist → Schedule → Review)
  payment.tsx              # Payment (Card/UPI/Wallet + promo code)
  confirmation.tsx         # Booking confirmation with animation
  map.tsx                  # Nearby salons map with radius filter + directions
  notifications.tsx        # Notification center
  shop.tsx                 # Beauty products shop with category filters
  events.tsx               # Events listing
  (tabs)/
    _layout.tsx            # Tab navigator (5 tabs)
    index.tsx              # Home (search, categories, near you, trending)
    explore.tsx            # Explore categories grid
    bookings.tsx           # My bookings (upcoming/past tabs)
    favorites.tsx          # Favorite salons
    profile.tsx            # Profile + 13 theme selector

constants/
  colors.ts                # 13 themes (light, dark, warm, genZ, luxe, ocean, sakura, cyber, sunset, mint, royal, classic, unisex)

context/
  ThemeContext.tsx          # AsyncStorage-backed theme persistence

hooks/
  useColors.ts             # Hook to access current theme colors

components/
  ErrorBoundary.tsx        # Self-contained error boundary
  SalonCard.tsx            # Reusable salon card (full + compact variants)
  GlassCard.tsx            # Glassmorphism card component
  LoadingSkeleton.tsx      # Loading placeholder

data/
  salons.ts                # 16 salons with services, images, phone, website, distance

lib/
  storage.ts               # AsyncStorage helpers for flags/persistence

types/
  index.ts                 # TypeScript interfaces (SalonData, Booking, etc.)

web-source/                # Original web app source (reference only)
```

## All 20 Screens (18 content + 2 layouts)

| # | Screen | File | Features |
|---|--------|------|----------|
| 1 | Splash | app/index.tsx | Animated logo, gradient background, loading dots |
| 2 | Onboarding | app/onboarding.tsx | 3-step carousel, Skip/Next, Reanimated transitions |
| 3 | Geolocation | app/geolocation.tsx | expo-location permission, Platform-aware |
| 4 | Notifications | app/notifications-setup.tsx | expo-notifications permission |
| 5 | Brand Intro | app/brand-intro.tsx | LinearGradient, animated entrance |
| 6 | Home | app/(tabs)/index.tsx | Search, categories, Near You, Trending |
| 7 | Explore | app/(tabs)/explore.tsx | Category grid, search |
| 8 | Bookings | app/(tabs)/bookings.tsx | Upcoming/Past tabs |
| 9 | Favorites | app/(tabs)/favorites.tsx | Saved salons list |
| 10 | Profile | app/(tabs)/profile.tsx | User info, 13 themes, settings |
| 11 | Salon Detail | app/salon/[id].tsx | Hero image, action row (Chat/Directions/Call/Website), Services/Reviews/About tabs, chat drawer, Similar Salons carousel |
| 12 | Salons List | app/salons.tsx | Sort by distance/rating/price, category filter |
| 13 | Booking | app/booking/[salonId].tsx | 3-step: Stylist → Schedule → Review |
| 14 | Payment | app/payment.tsx | Card/UPI/Wallet, promo code |
| 15 | Confirmation | app/confirmation.tsx | Success animation, booking reference |
| 16 | Search | app/search.tsx | Filtered results, recent searches |
| 17 | Notifications | app/notifications.tsx | Notification list |
| 18 | Map | app/map.tsx | Visual map with pins, radius filter (100m–10km), salon cards, Open in Maps |
| 19 | Shop | app/shop.tsx | Product grid, category filters |
| 20 | Events | app/events.tsx | Event cards with categories |

## Themes

13 built-in themes selectable from Profile screen:
Light, Dark, Warm, Gen Z, Luxe, Ocean, Sakura, Cyber, Sunset, Mint, Royal, Classic, Unisex

## Cross-Platform Notes

- Shadow styles use `Platform.select()` — web gets `boxShadow` strings, native gets `shadowColor/shadowOffset/shadowOpacity/shadowRadius`
- Text shadows follow same pattern with `textShadow` vs `textShadowColor/textShadowOffset/textShadowRadius`
- Safe area: `Platform.OS === 'web'` uses 67px top padding; native uses `useSafeAreaInsets().top`
- `Linking.canOpenURL()` + `try/catch` wraps all external URL opens (maps, phone, website)
- Zero HTML tags, zero className, zero onClick — pure React Native components throughout
- All imports from react-native or expo-* packages only

## Development

Dev server runs via Expo Metro bundler on port 5000 in web mode:

```bash
npx expo start --port 5000 --web
```

## Key Notes

- Use `npm install --legacy-peer-deps` for package installs
- Only `react-native-reanimated/plugin` in babel.config.js — no worklets plugin
- Only `expo-router` and `expo-font` in app.json plugins
- No `newArchEnabled` in app.json
- ErrorBoundary is self-contained (no ThemeProvider dependency)
