# 🎨 Luxury Beauty App - Design System Documentation

> **Industry-Standard Design System** following Material Design, Apple HIG, and Shopify Polaris best practices

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Brand Colors](#brand-colors)
3. [Semantic Colors](#semantic-colors)
4. [Gradients](#gradients)
5. [Surface & Glassmorphism](#surface--glassmorphism)
6. [Shadows](#shadows)
7. [Usage Examples](#usage-examples)
8. [Migration Guide](#migration-guide)

---

## Overview

This design system provides a centralized, token-based approach to styling your luxury beauty booking app. All brand colors, gradients, and design tokens are defined once in `/src/styles/theme.css` and can be used throughout the application via semantic class names.

### ✅ Benefits

- **Single Source of Truth** - Change app-wide colors by updating CSS variables
- **Consistency** - Ensures brand colors are used correctly everywhere
- **Scalability** - Easy to add new themes (dark mode, seasonal themes)
- **Maintainability** - No need to search/replace 50+ files when updating colors
- **Industry Standard** - Follows best practices from Google, Apple, Shopify

---

## Brand Colors

### Primary Palette

```css
--brand-rose-400: #fb7185    /* Main brand color */
--brand-pink-500: #ec4899    /* Secondary brand color */
--brand-rose-50: #fff1f2     /* Lightest tint */
--brand-rose-100: #ffe4e6    /* Light tint */
--brand-rose-200: #fecdd3    /* Border color */
```

### Usage

```tsx
/* OLD - Hardcoded ❌ */
<div className="bg-rose-400 text-white">

/* NEW - Design Token ✅ */
<div className="bg-brand text-white">
```

---

## Semantic Colors

Instead of using color names directly, use **semantic tokens** that describe their purpose:

| Token | Purpose | Value |
|-------|---------|-------|
| `--color-primary` | Main brand actions, CTA buttons | `#fb7185` (rose-400) |
| `--color-primary-hover` | Hover states | `#ec4899` (pink-500) |
| `--color-primary-light` | Light backgrounds | `#ffe4e6` (rose-100) |
| `--color-primary-subtle` | Subtle backgrounds | `#fff1f2` (rose-50) |
| `--color-accent` | Highlights, badges | `#ec4899` (pink-500) |
| `--color-success` | Success states | `#10b981` (green-500) |
| `--color-warning` | Warnings, alerts | `#f59e0b` (amber-500) |
| `--color-error` | Errors, destructive actions | `#ef4444` (red-500) |

### Class Names

```tsx
/* Brand Colors */
.bg-brand          /* Background: primary brand color */
.bg-brand-light    /* Background: light brand tint */
.bg-brand-subtle   /* Background: subtle brand tint */
.text-brand        /* Text: primary brand color */
.border-brand      /* Border: brand color */

/* Usage Example */
<div className="bg-brand-subtle border-brand">
  <p className="text-brand">Brand colored text</p>
</div>
```

---

## Gradients

### Primary Brand Gradient (Rose → Pink)

The signature gradient used for buttons, selected states, and highlights.

```css
--gradient-primary: linear-gradient(135deg, #fb7185 0%, #ec4899 100%)
```

### Class Names

```tsx
.bg-brand-gradient          /* Diagonal gradient (135deg) */
.bg-brand-gradient-vertical /* Vertical gradient (180deg) */
.bg-brand-gradient-radial   /* Radial gradient */
.bg-gradient-pastel         /* Soft pastel background gradient */
.bg-gradient-soft           /* Subtle gradient for backgrounds */
```

### Usage Examples

```tsx
/* Primary Button */
<button className="btn-brand">
  Book Now
</button>

/* Selected Card */
<div className="card-brand-selected">
  <p className="text-white">Selected Service</p>
</div>

/* Background Gradient */
<div style={{ background: "var(--gradient-background-pastel)" }}>
  Content
</div>
```

---

## Surface & Glassmorphism

### Surface Colors

Different elevation levels for cards, modals, and backgrounds.

```css
--surface-base: #fafafa           /* Base background */
--surface-elevated: #ffffff       /* Elevated cards */
--surface-glass-light: rgba(255, 255, 255, 0.6)   /* Light glassmorphism */
--surface-glass-medium: rgba(255, 255, 255, 0.75) /* Medium glassmorphism */
--surface-glass-heavy: rgba(255, 255, 255, 0.9)   /* Heavy glassmorphism */
```

### Class Names

```tsx
.bg-surface-base           /* Base gray background */
.bg-surface-elevated       /* White elevated surface */
.bg-surface-glass          /* Glass effect with backdrop blur */
.bg-surface-glass-medium   /* Stronger glass effect */
.bg-surface-glass-heavy    /* Heaviest glass effect */

/* Legacy Glass Classes */
.glass-light    /* Light glassmorphism with border */
.glass-medium   /* Medium glassmorphism */
.glass-heavy    /* Heavy glassmorphism */
.glass-card     /* Premium glass card with shadow */
.card-glass     /* Card with glass effect */
```

### Usage

```tsx
/* Glassmorphism Card */
<div className="card-glass rounded-3xl p-4">
  <p>Semi-transparent card with backdrop blur</p>
</div>

/* Unselected Payment Method */
<div className="card-glass p-4">
  Payment method details
</div>

/* Selected Payment Method */
<div className="card-brand-selected p-4">
  Payment method details
</div>
```

---

## Shadows

### Standard Shadows

```css
--shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.06)
--shadow-md: 0 4px 12px rgba(0, 0, 0, 0.08)
--shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.1)
--shadow-xl: 0 16px 48px rgba(0, 0, 0, 0.12)
```

### Brand Shadows (Rose-colored)

```css
--shadow-brand-sm: 0 4px 12px rgba(251, 113, 133, 0.15)
--shadow-brand-md: 0 8px 24px rgba(251, 113, 133, 0.2)
--shadow-brand-lg: 0 16px 48px rgba(251, 113, 133, 0.25)
```

### Class Names

```tsx
.shadow-brand-sm    /* Small brand-colored shadow */
.shadow-brand-md    /* Medium brand-colored shadow */
.shadow-brand-lg    /* Large brand-colored shadow */
```

### Usage

```tsx
/* Brand Button with Shadow */
<button className="btn-brand shadow-brand-lg">
  Confirm Booking
</button>

/* Success Icon with Glow */
<div className="bg-brand-gradient shadow-brand-lg rounded-full">
  <Check />
</div>
```

---

## Usage Examples

### ✅ Buttons

```tsx
/* PRIMARY BUTTON - Main Actions */
<button className="btn-brand py-4 px-6 rounded-2xl shadow-brand-lg">
  Pay $55
</button>

/* Equivalent to hardcoded: */
<button className="bg-gradient-to-br from-rose-400 to-pink-500 text-white">
  Pay $55
</button>

/* DISABLED BUTTON */
<button className="bg-gray-100 text-gray-400 cursor-not-allowed">
  Continue
</button>
```

### ✅ Cards - Selected State

```tsx
/* SELECTED CARD */
<div className="card-brand-selected p-4 rounded-3xl">
  <Icon className="text-white" />
  <p className="text-white">Women's Haircut</p>
</div>

/* UNSELECTED CARD */
<div className="card-glass p-4 rounded-3xl">
  <Icon className="text-brand" />
  <p className="text-gray-900">Men's Haircut</p>
</div>
```

### ✅ Icons with Brand Colors

```tsx
/* Brand-colored icon background */
<div className="bg-brand-subtle rounded-2xl p-2">
  <MapPin className="w-5 h-5 text-brand" />
</div>
```

### ✅ Text Links

```tsx
<a href="#" className="text-brand font-bold">
  View Details
</a>
```

### ✅ Background Gradients

```tsx
/* Pastel gradient header */
<div style={{ background: "var(--gradient-background-pastel)" }}>
  <h1>Checkout</h1>
</div>

/* Or using inline gradient */
<div className="bg-gradient-pastel">
  <h1>Welcome</h1>
</div>
```

---

## Migration Guide

### Before (Hardcoded) ❌

```tsx
// Payment.tsx - OLD
<button className="bg-gradient-to-br from-rose-400 to-pink-500 text-white shadow-lg">
  Pay Now
</button>

<div className="border-rose-200 bg-gradient-to-br from-rose-400 to-pink-500">
  Selected
</div>

<Icon className="text-rose-500" />
```

### After (Design Tokens) ✅

```tsx
// Payment.tsx - NEW
<button className="btn-brand shadow-brand-lg">
  Pay Now
</button>

<div className="card-brand-selected">
  Selected
</div>

<Icon className="text-brand" />
```

### Benefits of Refactoring

```tsx
/* Want to change brand color from rose/pink to purple/blue? */

/* BEFORE: Update 50+ files */
// Payment.tsx, Booking.tsx, Confirmation.tsx, Home.tsx, etc.

/* AFTER: Update 2 variables in theme.css */
:root {
  --brand-rose-400: #a855f7;  /* purple-500 */
  --brand-pink-500: #3b82f6;  /* blue-500 */
}
/* Done! Entire app updates automatically ✨ */
```

---

## Component Reference

### Button Variants

| Class | Usage | Example |
|-------|-------|---------|
| `btn-brand` | Primary CTA button | Confirm, Pay, Book Now |
| `bg-gray-100 text-gray-400` | Disabled state | Grayed out button |
| `bg-gray-900 text-white` | Dark alternative | Secondary action |

### Card Variants

| Class | Usage | When to Use |
|-------|-------|-------------|
| `card-brand-selected` | Selected state | Payment method, service, time slot selected |
| `card-glass` | Unselected/default | Payment method, service, time slot not selected |
| `glass-card` | Premium glass card | Featured cards, modals |

### Surface Variants

| Class | Usage | When to Use |
|-------|-------|-------------|
| `bg-surface-base` | Page background | Main app background (#fafafa) |
| `bg-surface-elevated` | Cards on base | White cards on gray background |
| `bg-surface-glass` | Semi-transparent | Overlay cards, modals |

---

## Color Palette Quick Reference

### Brand Colors
- 🌸 **Rose-50**: `#fff1f2` - Lightest tint
- 🌸 **Rose-100**: `#ffe4e6` - Light backgrounds
- 🌸 **Rose-200**: `#fecdd3` - Borders
- 🌸 **Rose-400**: `#fb7185` - **PRIMARY BRAND**
- 💗 **Pink-500**: `#ec4899` - **SECONDARY BRAND**

### Neutral Colors
- ⚪ **Gray-50**: `#fafafa` - Base background
- ⚪ **Gray-100**: `#f5f5f5` - Light elements
- ⚪ **Gray-900**: `#171717` - Dark cards, text

### Semantic Colors
- ✅ **Success**: `#10b981` - Green
- ⚠️ **Warning**: `#f59e0b` - Amber
- ❌ **Error**: `#ef4444` - Red
- ℹ️ **Info**: `#3b82f6` - Blue

---

## Advanced: Creating New Components

### ✅ DO: Use Design Tokens

```tsx
function BookButton({ children }) {
  return (
    <button className="btn-brand py-4 px-8 rounded-2xl shadow-brand-lg">
      {children}
    </button>
  );
}

function ServiceCard({ selected, title }) {
  return (
    <div className={selected ? "card-brand-selected" : "card-glass"}>
      <h3 className={selected ? "text-white" : "text-gray-900"}>
        {title}
      </h3>
    </div>
  );
}
```

### ❌ DON'T: Hardcode Colors

```tsx
// BAD - Don't do this
<button className="bg-gradient-to-br from-rose-400 to-pink-500">
  Book Now
</button>

// GOOD - Use design tokens
<button className="btn-brand">
  Book Now
</button>
```

---

## Questions?

**Q: Can I still use Tailwind color classes like `bg-rose-400`?**
A: Technically yes, but avoid it for brand colors. Use design tokens instead for consistency and maintainability.

**Q: How do I add a dark mode?**
A: The `.dark` class in `theme.css` is already set up. Just toggle the class on the root element and all semantic colors will automatically switch.

**Q: What if I need a one-off custom color?**
A: For truly unique cases, hardcode is okay. But if you use it more than once, add it to `theme.css` as a token.

---

## Summary

✅ **Use semantic class names** - `.btn-brand`, `.card-brand-selected`, `.text-brand`
✅ **Use CSS variables** - `var(--gradient-primary)`, `var(--color-primary)`
✅ **Single source of truth** - All colors defined in `/src/styles/theme.css`
✅ **Easy to maintain** - Change brand color in one place, updates everywhere
✅ **Industry standard** - Follows Material Design, Apple HIG, Shopify Polaris patterns

❌ **Avoid hardcoded colors** - No more `from-rose-400 to-pink-500` everywhere
❌ **Avoid inconsistency** - No more slightly different shades of pink/rose
❌ **Avoid maintenance hell** - No more find/replace across 50+ files

---

**Last Updated**: March 17, 2026
**Design System Version**: 1.0.0
**Maintained by**: Luxury Beauty Team
