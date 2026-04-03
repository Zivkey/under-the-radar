@AGENTS.md

# UnderTheRadar — Project Guide

## Overview
Dark, animated agency website for UnderTheRadar™ — a post-production and YouTube management agency. Built with Next.js 16 (App Router), Tailwind CSS v4, Framer Motion, Three.js, and shadcn/ui.

## Tech Stack
- **Framework:** Next.js 16 (App Router, Turbopack)
- **Styling:** Tailwind CSS v4 + shadcn/ui components
- **Animations:** Framer Motion (scroll, layout, presence), Three.js (dotted particle surfaces), GSAP (MagicBento spotlight)
- **Smooth Scroll:** Lenis (desktop only, disabled on touch devices)
- **Font:** Inter (Google Fonts)
- **Theme:** Dark only, forced via next-themes

## Project Structure
```
src/
├── app/
│   ├── layout.tsx          # Root layout, Inter font, ThemeProvider
│   ├── page.tsx            # Home page — all sections composed here
│   └── globals.css         # Tailwind imports, shadcn theme vars, dark mode
├── components/
│   ├── header.tsx          # Fixed header with animated pill nav, hamburger mobile menu
│   ├── hero-section.tsx    # Parallax hero with Three.js DottedSurface
│   ├── services-section.tsx # Bento grid with MagicBento spotlight/particles
│   ├── work-section.tsx    # TiltedCard clip grid with video player modal
│   ├── contact-form.tsx    # Contact form (placeholder, needs backend)
│   ├── reveal.tsx          # Blur/fade scroll-triggered reveal animations
│   ├── smooth-scroll.tsx   # Lenis wrapper with stop/start exports
│   ├── theme-provider.tsx  # next-themes wrapper (dark forced)
│   ├── magic-bento-wrapper.tsx # GSAP spotlight + particle card effects
│   ├── TiltedCard.jsx      # 3D tilt hover card (react-bits)
│   ├── TiltedCard.css
│   └── ui/
│       ├── dotted-surface.tsx          # Three.js animated dot grid (hero)
│       ├── dotted-surface-inverted.tsx # Inverted version (contact section)
│       ├── video-player.tsx            # Custom video player with controls
│       ├── button.tsx                  # shadcn button (currently unused)
│       └── zoom-parallax.tsx           # Zoom parallax (currently unused)
```

## Key Patterns

### Client vs Server Components
- `page.tsx` is a **Server Component** — no hooks, no interactivity
- All interactive components use `'use client'` directive
- Contact form extracted to separate client component to avoid hydration issues

### Scroll-Based Animations
- **Hero parallax:** Framer Motion `useScroll` + `useTransform` — title scales down and moves as you scroll
- **Section reveals:** `<Reveal>` component wraps content with blur-fade-slide animation on `whileInView`
- **Header active section:** scroll event listener detects which section is in viewport, animates pill indicator

### Video Modal System
- TiltedCard has invisible `<div className="absolute inset-0 z-10">` overlay to capture clicks (3D transforms eat events)
- When video opens: Lenis stopped (`stopScroll()`), header disabled (`pointer-events: none`), body overflow hidden
- When video closes: everything restored via useEffect cleanup

### Lenis Smooth Scroll
- Global instance exported from `smooth-scroll.tsx`
- `stopScroll()` / `startScroll()` functions for modal control
- Disabled on touch devices to prevent tap issues
- `scroll-smooth` CSS on `<html>` as fallback

## Commands
```bash
npm run dev      # Start dev server (port 3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint
```

## Known Issues / TODOs
1. **Contact form is non-functional** — needs backend API route + form state management
2. **Unused files to clean up:** InfiniteMenu.jsx/.css, MagicBento.jsx/.css, zoom-parallax.tsx, button.tsx
3. **Three.js performance:** DottedSurface runs at 60fps continuously — should throttle to 30fps and pause when off-screen
4. **Missing OpenGraph/Twitter meta tags** — add og:image, og:type, twitter:card
5. **TiltedCard.jsx should be TypeScript** — convert to .tsx with proper prop types
6. **No image lazy loading** on work section thumbnails
7. **Hamburger button missing aria-label** for screen readers
8. **Form inputs missing name/id attributes** — needed for proper form submission
9. **Scroll listener not debounced** in header — runs on every frame

## Conventions
- Dark theme only — all colors use `text-white/XX` opacity pattern
- Animations use custom easing: `[0.25, 0.1, 0.25, 1]` for gentle transitions
- Section IDs match nav links: `#home`, `#services`, `#work`, `#about`, `#contact`
- All sections have `scroll-mt-20` for header offset on smooth scroll
- Spacing: `py-32` between sections, `max-w-6xl` content width
- Typography: uppercase tracking-wide labels, large bold headings, muted body text

## Deployment
- GitHub: https://github.com/Zivkey/under-the-radar
- Ready for Vercel deployment (Next.js standard)
- No environment variables required (yet — will need for contact form backend)
