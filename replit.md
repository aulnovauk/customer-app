# Beauté – Luxury Beauty Booking

A mobile-first React web application for discovering and booking luxury beauty salon services.

## Tech Stack

- **Framework:** React 18 + TypeScript
- **Build Tool:** Vite 6
- **Styling:** Tailwind CSS 4 (via `@tailwindcss/vite`)
- **Routing:** React Router 7
- **UI Components:** Radix UI primitives, Lucide React icons
- **Animations:** Motion (Framer Motion)
- **PWA:** vite-plugin-pwa for offline support
- **Package Manager:** npm

## Project Structure

```
src/
  app/
    components/    # Reusable UI components (figma/, ui/, feature-specific)
    constants/     # App-wide constants
    context/       # React context providers (ThemeContext)
    screens/       # Page-level route components
    App.tsx        # Root component with RouterProvider
    routes.tsx     # Route definitions
  assets/          # Local images
  styles/          # Global CSS, fonts, Tailwind directives
  types/           # TypeScript interfaces
  main.tsx         # Entry point
public/            # Static assets (icons, manifest)
```

## Development

The dev server runs on port 5000 with host `0.0.0.0` and `allowedHosts: true` for Replit proxy compatibility.

```bash
npm run dev
```

## Deployment

Configured as a **static** deployment:
- Build command: `npm run build`
- Public directory: `dist`
