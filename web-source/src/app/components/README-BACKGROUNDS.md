# Premium Background System

This luxury beauty booking app features a sophisticated multi-layered background system with route-based themes and smooth animations.

## Components

### 1. AnimatedBackground (Main Component)
Located at: `/src/app/components/AnimatedBackground.tsx`

Automatically changes background based on route with smooth transitions.

**Features:**
- Route-based theme switching
- Multi-layer gradient backgrounds
- Animated mesh gradients
- Floating orbs
- Subtle patterns
- Grain texture overlay
- Vignette effects

**Themes Available:**
- `onboarding` - Multi-color pastel with pink/peach tones
- `home` - Soft rose to peach gradient
- `explore` - Vibrant multi-color with blue accents
- `bookings` - Calming lavender to blue
- `favorites` - Pink gradient with waves pattern
- `profile` - Warm beige to rose
- `salon` - Minimal pastel gradient
- `booking` - Blue accent gradient
- `payment` - Green success tones
- `confirmation` - Celebratory green/pink
- `default` - White to soft peach fallback

### 2. FloatingOrbs
Creates ambient floating color orbs that slowly animate across the screen.

**Props:**
- `count` (default: 8) - Number of orbs
- `colors` - Array of color strings
- `intensity` - "light" | "medium" | "heavy"

**Usage:**
```tsx
<FloatingOrbs
  count={8}
  colors={["#FFE8F5", "#FFE8D5", "#E0F0FF"]}
  intensity="medium"
/>
```

### 3. BackgroundPattern
Adds subtle geometric patterns to the background.

**Props:**
- `pattern` - "dots" | "grid" | "waves" | "circles" | "none"
- `opacity` (default: 0.03)
- `animate` (default: true)

**Usage:**
```tsx
<BackgroundPattern pattern="dots" opacity={0.03} />
```

### 4. SparkleEffect
Adds twinkling sparkle effects for extra magic.

**Props:**
- `count` (default: 15) - Number of sparkles
- `enabled` (default: true)
- `color` (default: "#ffffff")

**Usage:**
```tsx
<SparkleEffect count={20} color="#FFE8F5" />
```

### 5. HolographicOverlay
Creates an iridescent, holographic shimmer effect.

**Props:**
- `enabled` (default: false)
- `intensity` (default: 0.08)

**Usage:**
```tsx
<HolographicOverlay enabled intensity={0.1} />
```

### 6. PageTransition
Smooth fade and slide transitions between routes.

**Usage:**
```tsx
<PageTransition>
  <YourPageContent />
</PageTransition>
```

### 7. BackgroundShowcase
Interactive demo component to preview all background effects.

**Usage:**
Navigate to a route with:
```tsx
<BackgroundShowcase />
```

## Glassmorphism Utilities

Premium glass effects are available via CSS classes in `/src/styles/tailwind.css`:

- `.glass-light` - Light transparency with 12px blur
- `.glass-medium` - Medium transparency with 16px blur
- `.glass-heavy` - Heavy transparency with 20px blur
- `.glass-card` - Perfect for cards with shadow

**Usage:**
```tsx
<div className="glass-card rounded-3xl p-6">
  {/* Content */}
</div>
```

## Animation Utilities

Additional CSS animations available:

- `.shimmer` - Gradient shimmer effect (3s loop)
- `.float` - Gentle floating animation (6s loop)
- `.pulse-glow` - Pulsing glow shadow (3s loop)
- `.gradient-shift` - Animated gradient background (8s loop)

**Usage:**
```tsx
<div className="glass-card float">
  <div className="shimmer">Shimmering content</div>
</div>
```

## Customization

### Adding a New Theme

Edit `/src/app/components/AnimatedBackground.tsx`:

```tsx
const themes: Record<string, BackgroundTheme> = {
  // ... existing themes
  myNewScreen: {
    gradient: "linear-gradient(135deg, #FFE8F5 0%, #FFF5E8 100%)",
    meshColors: ["#FFE0F0", "#FFF0E0"],
    overlay: "radial-gradient(circle at 50% 50%, rgba(255, 182, 193, 0.15), transparent 50%)",
    orbColors: ["#FFD5E8", "#FFE5D5"],
    orbIntensity: "medium",
    pattern: "dots",
  },
};
```

Then add the route mapping in `getThemeFromPath()`:

```tsx
if (pathname.startsWith("/my-new-screen")) return themes.myNewScreen;
```

### Color Palette Guidelines

**Pastel Rose:** #FFE8F5, #FFD5E8, #FFCADD
**Soft Peach:** #FFE8D5, #FFE0C8, #FFD5C0
**Lavender:** #E8E0FF, #DED5FF, #D5CCFF
**Sky Blue:** #E0F0FF, #D5E8FF, #CCE0FF
**Mint:** #E0FFE8, #D5FFE0, #CCFFD8

### Performance Tips

- Use fewer orbs (4-6) on lower-end devices
- Set pattern opacity to 0.02 or lower for subtlety
- Use "light" intensity for orbs to reduce blur
- Disable SparkleEffect if not needed

## Animation Details

- **Gradient transitions:** 0.8s ease-in-out
- **Mesh movement:** 20-35s infinite loop
- **Orbs floating:** 15-35s with delay variations
- **Sparkles:** 1-3s with random delays

## Browser Support

All effects use modern CSS features:
- `backdrop-filter` (glassmorphism)
- `blur()` filters
- CSS gradients
- Motion/React animations

Fallbacks are in place for older browsers.