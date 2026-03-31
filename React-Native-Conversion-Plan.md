# Beauté – React Native Conversion Plan

## Executive Summary

This document outlines a production-grade plan to convert the existing Beauté React web application into a React Native mobile app using Expo. The current app has **18 screens**, **25+ custom components**, and **35+ UI primitives** built with React, Tailwind CSS, Framer Motion, Radix UI, and React Router — none of which work natively in React Native.

The conversion preserves the existing design language, business logic, and user flows while rebuilding the UI layer for native mobile platforms (iOS & Android).

**Estimated effort:** 8–12 weeks for a single developer, 4–6 weeks for a team of 2–3.

---

## Table of Contents

1. [Technology Mapping](#1-technology-mapping)
2. [Project Setup](#2-project-setup)
3. [Phase 1 — Foundation & Core Infrastructure](#3-phase-1--foundation--core-infrastructure)
4. [Phase 2 — Onboarding & Permissions Flow](#4-phase-2--onboarding--permissions-flow)
5. [Phase 3 — Main App Screens (Tab Navigation)](#5-phase-3--main-app-screens-tab-navigation)
6. [Phase 4 — Detail & Booking Flow](#6-phase-4--detail--booking-flow)
7. [Phase 5 — Shop, Chat & Supplementary Features](#7-phase-5--shop-chat--supplementary-features)
8. [Phase 6 — Polish, Testing & Release](#8-phase-6--polish-testing--release)
9. [Screen-by-Screen Conversion Reference](#9-screen-by-screen-conversion-reference)
10. [Component Migration Matrix](#10-component-migration-matrix)
11. [Risk Register](#11-risk-register)
12. [Folder Structure](#12-folder-structure)

---

## 1. Technology Mapping

| Web (Current)                | React Native (Target)                     | Notes                                           |
| ---------------------------- | ----------------------------------------- | ----------------------------------------------- |
| React 18                     | React 18 (via Expo SDK 52+)               | Core React APIs remain the same                 |
| Vite                         | Expo / Metro Bundler                      | Complete build system swap                      |
| React Router 7               | React Navigation 7 (Stack + Tab)          | Different API, same navigation patterns         |
| Tailwind CSS 4               | NativeWind 4 or StyleSheet                | NativeWind provides Tailwind-like syntax in RN  |
| Radix UI                     | Custom + React Native Paper / Tamagui     | No direct Radix equivalent in RN                |
| Framer Motion                | React Native Reanimated 3 + Moti          | Moti provides Framer-like API on top of Reanimated |
| Lucide React                 | Lucide React Native                       | Direct equivalent exists                        |
| CSS Variables (Theming)      | React Context + StyleSheet                | Theme values stored in JS objects               |
| localStorage                 | AsyncStorage / expo-secure-store          | Async API instead of sync                       |
| Web Geolocation API          | expo-location                             | Native GPS access                               |
| Web Notification API         | expo-notifications                        | Push notification support                       |
| CSS Backdrop Filter (blur)   | expo-blur (BlurView)                      | Native blur component                           |
| SVG patterns / gradients     | react-native-svg + expo-linear-gradient   | Different API, same visual result               |
| HTML img / onError           | React Native Image + fallback logic       | Built-in error handling                         |
| IntersectionObserver         | onScroll + onLayout measurements          | Manual scroll position tracking                 |
| DOM Touch Events             | React Native Gesture Handler              | More powerful gesture system                    |
| Recharts                     | react-native-chart-kit / Victory Native   | Different charting library                      |
| canvas-confetti              | react-native-confetti-cannon              | Native confetti effect                          |
| Google Fonts (CSS import)    | expo-font + @expo-google-fonts/inter      | Font loading via Expo                           |

---

## 2. Project Setup

### 2.1 Initialize Expo Project

```bash
npx create-expo-app beaute-mobile --template blank-typescript
cd beaute-mobile
```

### 2.2 Install Core Dependencies

```bash
# Navigation
npx expo install @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs react-native-screens react-native-safe-area-context

# Animations
npx expo install react-native-reanimated react-native-gesture-handler moti

# Styling
npx expo install nativewind tailwindcss

# Icons
npm install lucide-react-native react-native-svg

# Storage
npx expo install @react-native-async-storage/async-storage

# Native Features
npx expo install expo-location expo-notifications expo-blur expo-linear-gradient expo-font expo-image expo-haptics expo-splash-screen

# UI Helpers
npx expo install react-native-safe-area-context react-native-svg
```

### 2.3 Configuration Files

- **babel.config.js** — Add Reanimated and NativeWind plugins
- **tailwind.config.js** — Configure NativeWind with the existing color tokens
- **app.json** — Configure app name, icons, splash screen, permissions
- **metro.config.js** — Extend for NativeWind and SVG support

---

## 3. Phase 1 — Foundation & Core Infrastructure

**Duration:** 1–2 weeks

### 3.1 Design System Migration

| Task | Details |
| ---- | ------- |
| **Theme System** | Convert CSS variables from `theme.css` into a JS-based theme object. Create a `ThemeProvider` using React Context that mirrors the existing 13 themes (light, dark, warm, masculine, unisex, genz, luxe, sunset, ocean, royal, mint, sakura, cyber). Store selection in AsyncStorage. |
| **Color Tokens** | Extract all `--brand-*`, `--surface-*`, `--text-*` variables into a structured `themes.ts` file with typed theme objects. |
| **Typography** | Load Inter font family via `expo-font`. Define a typography scale matching the current CSS. |
| **Spacing & Layout** | Define a spacing scale that matches the current Tailwind config. |

### 3.2 Navigation Architecture

```
Root Navigator (Stack)
├── Splash Screen
├── Onboarding Screen
├── Geolocation Permission Screen
├── Notification Permission Screen
├── Brand Intro Screen
├── Main App (Tab Navigator)
│   ├── Home Tab
│   ├── Explore Tab
│   ├── Bookings Tab
│   ├── Favorites Tab
│   ├── Events Tab
│   ├── Shop Tab
│   └── Profile Tab
├── Search Screen (Modal)
├── Salon Details Screen
├── Salons List Screen
├── Booking Screen
├── Payment Screen
├── Confirmation Screen
├── Map View Screen
└── Notifications Screen
```

### 3.3 Shared Components (Foundation)

Build these first as they're used across all screens:

| Component | Web Original | RN Implementation |
| --------- | ------------ | ----------------- |
| **AnimatedBackground** | CSS radial gradients + framer-motion | `expo-linear-gradient` + Reanimated animated values |
| **FloatingOrbs** | Absolutely positioned blur divs with framer-motion | Reanimated `SharedValue` with `BlurView` circles |
| **GlassCard** | `backdrop-filter: blur()` + border | `expo-blur` `BlurView` with border styling |
| **AnimatedButton** | framer-motion spring + CSS variables | Reanimated `useAnimatedStyle` + `Pressable` |
| **SparkleEffect** | Randomly positioned divs with framer-motion | Reanimated opacity/scale loops on `View` elements |
| **PageTransition** | `AnimatePresence` wrapper | Custom Reanimated entering/exiting animations or `@react-navigation/native` transitions |
| **ImageWithFallback** | `<img onError>` | `expo-image` with `placeholder` and error callback |
| **LoadingSkeleton** | CSS linear-gradient shimmer | Reanimated interpolated translateX on a gradient |

### 3.4 Animation Constants Migration

Convert `animationColors.ts` to work with Reanimated interpolation. The hex color values can remain as-is since Reanimated supports hex interpolation natively.

---

## 4. Phase 2 — Onboarding & Permissions Flow

**Duration:** 1–2 weeks

### 4.1 Splash Screen

| Aspect | Web | React Native |
| ------ | --- | ------------ |
| Animated gradient orbs | CSS + framer-motion | Reanimated + expo-linear-gradient |
| Logo shimmer | CSS animation | Reanimated `withRepeat` + `withSequence` |
| Route logic (localStorage checks) | `localStorage.getItem()` | `AsyncStorage.getItem()` (async) |
| Auto-navigate | `useNavigate()` | `navigation.replace()` |

### 4.2 Onboarding

| Aspect | Web | React Native |
| ------ | --- | ------------ |
| Horizontal carousel | Framer-motion drag | `FlatList` with `pagingEnabled` or `react-native-pager-view` |
| Touch/swipe gestures | `onDrag` props | Built-in `FlatList` scrolling or Gesture Handler |
| Page indicators | CSS styled divs | Custom `View` components with animated width |
| Glassmorphic overlay | `backdrop-filter` | `BlurView` from `expo-blur` |

### 4.3 Geolocation Permission

| Aspect | Web | React Native |
| ------ | --- | ------------ |
| Permission request | `navigator.geolocation` | `expo-location` `requestForegroundPermissionsAsync()` |
| Pulsing rings animation | framer-motion scale/opacity | Reanimated `withRepeat(withSequence(...))` |
| Permission fallback | `navigator.permissions` | Expo handles gracefully |

### 4.4 Notification Permission

| Aspect | Web | React Native |
| ------ | --- | ------------ |
| Permission request | `Notification.requestPermission()` | `expo-notifications` `requestPermissionsAsync()` |
| Welcome notification | `new Notification()` | `scheduleNotificationAsync()` |
| Animated bell | framer-motion keyframes | Reanimated `withRepeat` rotation |

### 4.5 Brand Intro

| Aspect | Web | React Native |
| ------ | --- | ------------ |
| Letter-by-letter animation | framer-motion `useAnimation` | Reanimated staggered entering animations |
| Floating particles | Absolutely positioned divs | Absolutely positioned `View` elements with Reanimated |
| Timed sequence | `setTimeout` chains | Reanimated `withDelay` or `setTimeout` with `runOnJS` |

---

## 5. Phase 3 — Main App Screens (Tab Navigation)

**Duration:** 2–3 weeks

### 5.1 Bottom Navigation

| Aspect | Web | React Native |
| ------ | --- | ------------ |
| Tab bar | Custom `BottomNav.tsx` | `@react-navigation/bottom-tabs` with custom `tabBar` prop |
| Active indicator | framer-motion `layoutId` | Reanimated `SharedTransition` or custom animated indicator |
| Icons | Lucide React | Lucide React Native |
| Safe area | CSS `env(safe-area-inset-bottom)` | `useSafeAreaInsets()` from `react-native-safe-area-context` |

### 5.2 Home Screen (High Complexity)

| Feature | Implementation |
| ------- | -------------- |
| Location selector | Custom modal/bottom sheet with `@gorhom/bottom-sheet` |
| Category switching (Women/Men/Unisex) | Animated `Pressable` tabs with Reanimated |
| Search bar + dropdown | `TextInput` + animated expanding `View` |
| Horizontal salon scrolling | `FlatList` with `horizontal` prop |
| Special offer banners | `FlatList` with `pagingEnabled` for auto-scroll carousel |
| Pull-to-refresh | `RefreshControl` on `ScrollView` |
| Theme integration | `useTheme()` context hook (same pattern) |

### 5.3 Explore Screen

| Feature | Implementation |
| ------- | -------------- |
| Category grid | `FlatList` with `numColumns={2}` |
| Animated cards | `Moti` `MotiView` for enter/tap animations |
| Featured section | Horizontal `FlatList` |

### 5.4 Bookings Screen

| Feature | Implementation |
| ------- | -------------- |
| Tab switching (Upcoming/Past) | Animated tabs with Reanimated or `react-native-tab-view` |
| Booking cards | Custom `Pressable` cards with status badges |
| Status badges | Styled `View` + `Text` with conditional colors |
| Actions (Reschedule/Cancel) | `Alert.alert()` for confirmation, haptic feedback |

### 5.5 Favorites Screen

| Feature | Implementation |
| ------- | -------------- |
| Favorite salon list | `FlatList` with swipe-to-remove via Gesture Handler |
| Empty state | Centered illustration + CTA |
| Heart animation | Reanimated scale + color transition on toggle |

### 5.6 Events Screen

| Feature | Implementation |
| ------- | -------------- |
| Event cards | Cards with date badges and countdown timers |
| Category filters | Horizontal scrolling chip selectors |

### 5.7 Shop Screen

| Feature | Implementation |
| ------- | -------------- |
| Product grid | `FlatList` with `numColumns={2}` |
| Filter modal | `@gorhom/bottom-sheet` or custom modal |
| Cart integration | Context-based cart state |
| Price range slider | `@react-native-community/slider` |

### 5.8 Profile Screen

| Feature | Implementation |
| ------- | -------------- |
| Avatar upload | `expo-image-picker` (camera + gallery) |
| Stats display | Custom stat cards |
| Theme gallery | Grid of theme previews with `Pressable` selection |
| Settings list | `SectionList` with grouped items |

---

## 6. Phase 4 — Detail & Booking Flow

**Duration:** 2–3 weeks

### 6.1 Salon Details (High Complexity)

| Feature | Web Approach | RN Approach |
| ------- | ------------ | ----------- |
| Image gallery | CSS grid | `FlatList` horizontal with snap |
| Sticky tab header | `IntersectionObserver` | `onScroll` + `onLayout` + Reanimated `useAnimatedScrollHandler` |
| Tab sections (Services, Packages, etc.) | Scroll-linked tabs | `react-native-tab-view` or manual scroll-to-section |
| Service selection logic | React state | Same React state pattern |
| Favorite toggle | State + localStorage | State + AsyncStorage |
| Share action | N/A | `expo-sharing` or `Share` API |

### 6.2 Salons List

| Feature | Web Approach | RN Approach |
| ------- | ------------ | ----------- |
| Sorted/filtered list | Array operations | Same logic, `FlatList` rendering |
| Open/Closed status | Time-based calculation | Same JS logic |
| Quick-book time slots | Horizontal scroll chips | Horizontal `FlatList` inside card |
| Chat integration | `ChatDrawer` overlay | Navigation to Chat screen or bottom sheet |

### 6.3 Booking Flow (High Complexity)

| Step | Implementation |
| ---- | -------------- |
| Step indicator | Custom component with Reanimated progress |
| Professional selection | Horizontal `FlatList` with selection state |
| Date picker | `react-native-calendars` or custom calendar grid |
| Time slot picker | Grid of `Pressable` slots with period filtering |
| Review summary | Styled card with line items |
| Navigation between steps | Stack navigator or animated view switching |

### 6.4 Payment Screen

| Feature | Implementation |
| ------- | -------------- |
| Payment method tabs | Custom segmented control |
| Card input | `TextInput` with formatting masks |
| Apple Pay / Google Pay | `expo-apple-authentication` / In-App Payments SDK |
| Promo code | `TextInput` + validation feedback |
| Processing animation | Reanimated spinner + success checkmark |

### 6.5 Confirmation Screen

| Feature | Implementation |
| ------- | -------------- |
| Success animation | Reanimated checkmark draw + `react-native-confetti-cannon` |
| Booking reference card | Styled card component |
| Add to calendar | `expo-calendar` integration |
| Share | React Native `Share` API |
| Directions | `expo-linking` to open Maps app |

---

## 7. Phase 5 — Shop, Chat & Supplementary Features

**Duration:** 1–2 weeks

### 7.1 Map View (High Complexity)

| Feature | Implementation |
| ------- | -------------- |
| Map rendering | `react-native-maps` (Google Maps / Apple Maps) |
| Salon markers | Custom `Marker` components with ratings |
| Draggable bottom sheet | `@gorhom/bottom-sheet` |
| Marker selection | `onPress` handler on markers |
| Current location | `expo-location` watch position |

### 7.2 Search Screen

| Feature | Implementation |
| ------- | -------------- |
| Search input | `TextInput` with debounced search |
| Recent searches | `AsyncStorage` persisted list |
| Results list | `FlatList` with salon cards |
| Category quick filters | Horizontal chip scroll |

### 7.3 Chat System

| Feature | Implementation |
| ------- | -------------- |
| Chat button (FAB) | Absolute positioned `Pressable` |
| Chat interface | `FlatList` inverted for message list |
| Message input | `TextInput` with send button |
| Resize/drag | Not needed in native (full-screen chat) |

### 7.4 Cart & Checkout Flow

| Feature | Implementation |
| ------- | -------------- |
| Cart drawer | Bottom sheet or dedicated screen |
| Quantity controls | `Pressable` +/- buttons |
| Address selection | Bottom sheet with address list |
| Multi-step wizard | Stack navigator or step-based state |

### 7.5 Notifications Screen

| Feature | Implementation |
| ------- | -------------- |
| Notification list | `SectionList` grouped by date |
| Read/unread state | Visual indicator + AsyncStorage |
| Push notifications | `expo-notifications` listener setup in root |

---

## 8. Phase 6 — Polish, Testing & Release

**Duration:** 1–2 weeks

### 8.1 Performance Optimization

- [ ] Implement `React.memo` and `useCallback` for list items
- [ ] Use `expo-image` instead of `Image` for better caching and performance
- [ ] Profile with React DevTools and Flipper
- [ ] Optimize FlatList with `getItemLayout`, `windowSize`, `maxToRenderPerBatch`
- [ ] Ensure Reanimated animations run on UI thread (no `runOnJS` in hot paths)

### 8.2 Platform-Specific Adjustments

- [ ] iOS: Safe area handling, haptic feedback, status bar styling
- [ ] Android: Material ripple effects, back button handling, status bar color
- [ ] Handle notch/dynamic island layouts
- [ ] Platform-specific shadows (iOS `shadowX` vs Android `elevation`)

### 8.3 Testing

- [ ] Unit tests: Jest + React Native Testing Library for component logic
- [ ] Integration tests: Detox or Maestro for E2E flows
- [ ] Manual testing on physical devices (iOS + Android)
- [ ] Test all 13 themes on both platforms
- [ ] Accessibility audit (screen readers, contrast ratios, touch targets)

### 8.4 App Store Preparation

- [ ] App icons (all required sizes) via `expo-app-icon`
- [ ] Splash screen configuration in `app.json`
- [ ] App Store screenshots (iPhone 6.7", 6.5", 5.5"; iPad)
- [ ] Play Store screenshots (phone + tablet)
- [ ] Privacy policy URL
- [ ] App Store description and metadata
- [ ] EAS Build configuration (`eas.json`)
- [ ] TestFlight / Internal Testing track setup

---

## 9. Screen-by-Screen Conversion Reference

| # | Screen | Complexity | Priority | Key Challenges |
|---|--------|-----------|----------|---------------|
| 1 | Splash | Low | P0 | AsyncStorage async vs localStorage sync |
| 2 | Onboarding | Medium | P0 | Carousel with swipe gestures |
| 3 | Geolocation Permission | Medium | P0 | expo-location API differences |
| 4 | Notification Permission | Medium | P0 | expo-notifications setup |
| 5 | Brand Intro | Medium | P1 | Complex timed animation sequence |
| 6 | Home | **High** | P0 | Most complex layout, multiple scrollable sections |
| 7 | Explore | Medium | P1 | Category grid layout |
| 8 | Bookings | Medium | P1 | Tab view + status management |
| 9 | Favorites | Medium | P2 | Swipe-to-remove gesture |
| 10 | Events | Medium | P2 | Date/countdown logic |
| 11 | Shop | Medium | P1 | Product grid + filter modal |
| 12 | Profile | Medium-High | P1 | Image picker + theme gallery |
| 13 | Search | Medium | P1 | Debounced search + results |
| 14 | Salon Details | **High** | P0 | Scroll-linked tabs, complex layout |
| 15 | Salons List | Medium-High | P1 | Sorting, filtering, time slots |
| 16 | Booking | **High** | P0 | Multi-step flow, date/time picker |
| 17 | Payment | Medium-High | P1 | Payment method integration |
| 18 | Confirmation | Low-Medium | P2 | Confetti + calendar integration |
| 19 | Map View | **High** | P1 | Real map integration + bottom sheet |
| 20 | Notifications | Medium | P2 | Section list + push setup |

---

## 10. Component Migration Matrix

### Custom Components

| Component | Web Tech | RN Replacement | Effort |
|-----------|----------|---------------|--------|
| AnimatedBackground | CSS gradients + Framer Motion | expo-linear-gradient + Reanimated | High |
| FloatingOrbs | Blur divs + Framer Motion | BlurView + Reanimated | Medium |
| GlassCard | backdrop-filter CSS | expo-blur BlurView | Medium |
| AnimatedButton | Framer Motion spring | Reanimated + Pressable | Low |
| AnimatedCard (VenueCard, ServiceCard) | Framer Motion + glassmorphism | Moti + BlurView | Medium |
| BottomNav | Custom + Framer layoutId | @react-navigation/bottom-tabs custom tabBar | Medium |
| PageTransition | AnimatePresence | Navigation transitions | Low |
| AddressSelection | DOM touch/pan events | @gorhom/bottom-sheet | Medium |
| CartDrawer | Body scroll lock + AnimatePresence | Bottom sheet or screen | Medium |
| CheckoutFlow | Multi-step state + AnimatePresence | Stack navigator or stepper | High |
| ChatButton | Framer Motion keyframes | Reanimated withRepeat | Low |
| ChatDrawer | Window event listeners, resize | Full screen or bottom sheet | Medium |
| ShopFilters | CSS appearance-none ranges | @react-native-community/slider | Medium |
| OrderSuccess | Framer confetti particles | react-native-confetti-cannon | Low |
| LuxuryEffects | SVG gradients + Framer keyframes | react-native-svg + Reanimated | High |
| HolographicOverlay | CSS repeating-linear-gradient | react-native-svg or Skia | High |
| BackgroundPattern | CSS backgroundImage data URIs | react-native-svg patterns | Medium |
| SparkleEffect | Framer opacity/scale loops | Reanimated withRepeat | Low |
| LoadingSkeleton | CSS linear-gradient shimmer | Reanimated translateX gradient | Medium |
| ImageWithFallback | img onError | expo-image with placeholder | Low |

### UI Primitives (Radix → RN)

| Radix Component | RN Alternative |
|----------------|----------------|
| Dialog | React Native Modal or @gorhom/bottom-sheet |
| Dropdown Menu | Custom Pressable menu or react-native-popup-menu |
| Accordion | Custom with Reanimated height animation |
| Tabs | react-native-tab-view |
| Select | Custom picker or @react-native-picker/picker |
| Checkbox | Custom Pressable + Reanimated |
| Switch | React Native Switch |
| Slider | @react-native-community/slider |
| Progress | Custom View with animated width |
| Scroll Area | ScrollView (built-in) |
| Tooltip | Custom or react-native-walkthrough-tooltip |
| Sheet / Drawer | @gorhom/bottom-sheet |
| Avatar | expo-image with rounded styling |
| Badge | Custom View + Text |
| Separator | View with 1px height/width |
| Input / Textarea | TextInput |
| Label | Text |
| Form | react-hook-form (works in RN) |
| Calendar | react-native-calendars |
| Carousel | FlatList horizontal + pagingEnabled |
| Sonner (Toasts) | react-native-toast-message or burnt |

---

## 11. Risk Register

| Risk | Impact | Likelihood | Mitigation |
|------|--------|-----------|------------|
| Glassmorphism (blur effects) perform poorly on Android | High | Medium | Use `expo-blur` with fallback to semi-transparent overlays on low-end Android |
| Complex animations cause frame drops | High | Medium | Profile early, use UI-thread Reanimated worklets, reduce concurrent animations |
| NativeWind doesn't support all Tailwind features | Medium | High | Identify unsupported features early, use StyleSheet for complex cases |
| Map integration requires API keys and billing | Medium | High | Set up Google Maps API key early, budget for usage |
| Payment integration requires native SDKs | High | Medium | Use Stripe React Native SDK or RevenueCat for in-app purchases |
| Theme system with 13 variants is complex to port | Medium | Medium | Start with 2–3 themes, add others incrementally |
| expo-notifications requires push notification certificates | Medium | High | Set up Apple Push Notification Service and Firebase Cloud Messaging early |
| Large number of dependencies may cause version conflicts | Medium | Medium | Pin all versions, test on each platform after adding new packages |

---

## 12. Folder Structure

```
beaute-mobile/
├── app.json                        # Expo configuration
├── babel.config.js                 # Reanimated + NativeWind plugins
├── tailwind.config.js              # NativeWind theme configuration
├── eas.json                        # EAS Build profiles
├── assets/
│   ├── fonts/                      # Inter font files
│   ├── images/                     # Static images
│   └── icons/                      # App icons
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── common/             # GlassCard, AnimatedButton, ImageWithFallback
│   │   │   ├── backgrounds/        # AnimatedBackground, FloatingOrbs, SparkleEffect
│   │   │   ├── navigation/         # BottomTabBar, HeaderBar
│   │   │   ├── cards/              # VenueCard, ServiceCard, BookingCard
│   │   │   ├── modals/             # CartSheet, ChatSheet, FilterSheet
│   │   │   └── forms/              # SearchInput, DatePicker, PaymentForm
│   │   ├── screens/
│   │   │   ├── auth/               # Splash, Onboarding, Permissions
│   │   │   ├── main/               # Home, Explore, Bookings, Favorites, etc.
│   │   │   ├── salon/              # SalonDetails, SalonsList, MapView
│   │   │   ├── booking/            # Booking, Payment, Confirmation
│   │   │   └── shop/               # Shop, Cart, Checkout
│   │   ├── navigation/
│   │   │   ├── RootNavigator.tsx   # Main stack navigator
│   │   │   ├── MainTabNavigator.tsx# Bottom tab navigator
│   │   │   └── types.ts            # Navigation type definitions
│   │   ├── context/
│   │   │   └── ThemeContext.tsx     # Theme provider (AsyncStorage-backed)
│   │   └── constants/
│   │       └── animationColors.ts  # Animation color definitions (reusable as-is)
│   ├── theme/
│   │   ├── colors.ts               # All theme color tokens
│   │   ├── typography.ts           # Font sizes, weights, line heights
│   │   ├── spacing.ts              # Spacing scale
│   │   └── index.ts                # Theme export
│   ├── types/
│   │   └── index.ts                # Domain types (reusable as-is)
│   ├── utils/
│   │   ├── storage.ts              # AsyncStorage helpers
│   │   └── formatting.ts           # Date, price formatting
│   └── hooks/
│       ├── useTheme.ts             # Theme hook
│       ├── useLocation.ts          # expo-location wrapper
│       └── useNotifications.ts     # expo-notifications wrapper
├── App.tsx                         # Entry point
└── package.json
```

---

## Appendix: What Can Be Reused As-Is

These files/logic from the current codebase can be transferred directly with minimal or no changes:

1. **`src/types/index.ts`** — All TypeScript interfaces (Salon, Booking, Service, etc.)
2. **`src/app/constants/animationColors.ts`** — Color definitions (hex values work in RN)
3. **Business logic** inside screens — Filtering, sorting, time calculations, price computations
4. **Data structures** — Mock data, salon lists, service catalogs
5. **State management patterns** — useState/useEffect patterns, context providers (with async storage swap)
6. **react-hook-form** — Works identically in React Native

---

*This plan should be treated as a living document and updated as implementation progresses and new insights are gained.*
