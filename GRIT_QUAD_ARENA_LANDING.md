# GRIT Quad Biking Arena — Landing Page Brief

## Project Overview

Build a single-page marketing landing page for **GRIT Quad Biking Arena**, a quad biking / ATV experience venue based in **Port Harcourt, Rivers State, Nigeria**. The page should feel like the brand — raw, adrenaline-fuelled, and proudly Port Harcourt. It is the digital front door for walk-in and booking traffic, with more content (gallery, booking system, events) to be added later.

**Stack:** Next.js (App Router) + Tailwind CSS  
**Target audience:** PH residents, families, young adults, corporate groups, and tourists looking for outdoor adventure  
**Page's single job:** Get people excited and get them to show up / inquire

---

## Visual Direction

### Palette (use these exact hex values as Tailwind CSS custom colors in `tailwind.config.ts`)

| Name | Hex | Usage |
|------|-----|-------|
| `grit-black` | `#0D0D0D` | Page background, primary dark surface |
| `grit-orange` | `#F5520C` | Primary accent — CTAs, highlights, active states |
| `grit-sand` | `#C9A96E` | Secondary warm accent — subheadings, dividers |
| `grit-white` | `#F2EDE6` | Body text on dark backgrounds |
| `grit-grey` | `#1A1A1A` | Card/section backgrounds |
| `grit-muted` | `#6B6B6B` | Placeholder text, labels |

### Typography

Use Google Fonts (import via `next/font/google`):

- **Display / Hero headings:** `Bebas Neue` — all-caps, wide tracking. Used for section titles and the hero headline only.
- **Body / UI text:** `Inter` — clean, readable at all sizes. Used for paragraphs, nav, labels, buttons.
- **Accent labels / eyebrows:** `Inter` with `tracking-widest` and `uppercase` — used for small category labels above section headers.

### Signature Element

The hero section features the brand name `GRIT` rendered in oversized `Bebas Neue` at roughly `20vw` font size, with the word split so that a **full-bleed background image of a quad bike in action** shows through a `mix-blend-mode: overlay` or `background-clip: text` technique. The tagline sits below in smaller type. This is the one bold move — everything else is disciplined.

### Motion

- Scroll-triggered fade-up reveals on section entry (`IntersectionObserver` or Framer Motion if added later — for now write with CSS `@keyframes` + `animation-play-state` toggled by a small JS class swap on scroll)
- Subtle hover scale (`scale-105`) on cards
- CTA button: orange fill with a left-to-right sweep hover effect using a `::before` pseudo-element

### Layout Principles

- Full-width dark canvas (`grit-black` background throughout)
- Sections breathe with generous vertical padding (`py-24` or `py-32`)
- Max content width: `max-w-6xl mx-auto px-6`
- Mobile-first. Stack all grid layouts to single column below `md:`

---

## File Structure

```
grit-quad-arena/
├── app/
│   ├── layout.tsx          # Root layout with fonts, metadata
│   ├── page.tsx            # Assembles all sections
│   └── globals.css         # Tailwind directives + custom animations
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Experiences.tsx
│   ├── HowItWorks.tsx
│   ├── Gallery.tsx         # Placeholder grid for now
│   ├── Pricing.tsx         # Placeholder — to be filled with real data
│   ├── Testimonials.tsx    # Placeholder cards
│   ├── BookingCTA.tsx
│   ├── Contact.tsx
│   └── Footer.tsx
├── public/
│   └── images/
│       └── placeholder-hero.jpg   # Drop real photos here later
├── tailwind.config.ts
└── next.config.ts
```

---

## Section-by-Section Spec

### 1. Navbar (`Navbar.tsx`)

- Fixed top, `backdrop-blur-md` with very subtle dark overlay (`bg-black/60`)
- Left: Logo — text-based for now: `GRIT` in `Bebas Neue` orange + `QUAD ARENA` in white smaller weight
- Right: Nav links — `About`, `Experiences`, `Pricing`, `Contact` — smooth scroll anchors (`#about`, `#experiences`, etc.)
- Far right: `Book a Ride` button — orange fill, `rounded-none` (sharp corners match the brand), white text
- Mobile: Hamburger menu that drops a full-width dark overlay nav

### 2. Hero (`Hero.tsx`)

- Full viewport height (`min-h-screen`)
- Background: `bg-[url('/images/placeholder-hero.jpg')] bg-cover bg-center` with a `bg-black/50` overlay div
- **Placeholder note:** Use a dark gradient (`from-grit-black via-grit-black/80 to-transparent`) until real images are provided
- Content centered, vertically centered with flexbox
- Eyebrow label: `PORT HARCOURT'S #1 QUAD BIKING EXPERIENCE` — small, sand-colored, wide tracking
- Main headline: `RIDE.` on one line, `FEEL THE` on second, `GRIT.` on third — all in `Bebas Neue`, white, massive (`text-7xl md:text-[10rem]`). The word `GRIT.` is orange.
- Subtext: `Rugged tracks. Real machines. All skill levels welcome.` in Inter, muted white, `text-lg`
- Two CTAs side by side:
  - Primary: `Book a Ride` — orange background, white text, sharp corners
  - Secondary: `See Experiences ↓` — transparent, white border, white text
- Bottom of hero: thin strip showing `Open: [PLACEHOLDER HOURS] · [PLACEHOLDER ADDRESS]` in small text

### 3. About (`About.tsx`) — `id="about"`

- Two-column layout at `md:` breakpoint: left is text, right is a placeholder image box with aspect-ratio `4/3`, dark grey background, `rounded-none`, with a centered label `[Photo Coming Soon]`
- Eyebrow: `ABOUT GRIT`
- Heading: `Port Harcourt's Wildest Ride`
- Body copy:
  > GRIT Quad Biking Arena is Port Harcourt's premier outdoor adventure destination. Whether you're a first-timer looking for a rush or a seasoned rider chasing the perfect track, GRIT delivers a raw, exhilarating experience on real quad bikes across rugged terrain.
  >
  > We opened our doors to bring world-class off-road adventure to the Garden City — and we're just getting started.
- Small stat strip below (3 stats in a row): `[X]+ Riders`, `[X] Tracks`, `[X]+ Events Hosted` — all placeholder values, sand-colored numbers with white labels

### 4. Experiences (`Experiences.tsx`) — `id="experiences"`

Three cards in a `grid-cols-1 md:grid-cols-3` grid. Each card:
- Dark grey background (`grit-grey`)
- Top: placeholder image box (16:9 ratio, `bg-neutral-800`, text label)
- Orange tag in top-left corner: e.g. `BEGINNER` / `THRILL RIDE` / `GROUP EVENT`
- Title, short description, duration pill

Cards:

| Tag | Title | Description | Duration |
|-----|-------|-------------|----------|
| `BEGINNER` | Solo Lap Ride | Hop on, get briefed, and ride the track at your own pace. Perfect for first-timers. No experience needed. | 30 mins |
| `THRILL RIDE` | High-Speed Challenge | Push the throttle and take on the full track circuit with speed gates and banked turns. For confident riders only. | 45 mins |
| `GROUP EVENT` | Group Package | Bring your squad — birthday parties, team outings, corporate bonding. We handle the rest. | 2 hrs |

Below cards, a muted note: `Custom durations and private bookings available. Contact us for details.`

### 5. How It Works (`HowItWorks.tsx`)

Horizontal stepper layout (`md:flex`, stacked on mobile). 4 steps:

1. **Book or Walk In** — Reserve your slot online or just show up during opening hours
2. **Gear Up** — We provide helmets and safety briefing before every ride
3. **Hit the Track** — Take on the terrain solo, raced, or with your group
4. **Make Memories** — Our team captures the highlights — [PLACEHOLDER: photos/video service TBC]

Each step: large orange step number (Bebas Neue), bold white label, small grey description. Steps connected by a thin orange dashed line (CSS `border-dashed`) on desktop.

### 6. Gallery (`Gallery.tsx`)

Placeholder section — **do not add real images**. Show a `3x2` grid of `aspect-[4/3]` placeholder boxes in `bg-grit-grey` with a centered camera icon (`📷`) and text `Photo Coming Soon`.

Section header:
- Eyebrow: `IN THE ARENA`
- Heading: `See the Action`
- Subtext: `Gallery coming soon — follow us on Instagram @grit_quad_arena for real-time updates`

Include an Instagram link button (external, opens in new tab): `→ Follow on Instagram`

### 7. Pricing (`Pricing.tsx`) — `id="pricing"`

**All prices are placeholders — mark clearly with a `[PLACEHOLDER]` comment in code**

Three pricing tiers in a card grid. Middle card should be visually highlighted (orange border, `Popular` badge):

| Tier | Label | Price | Includes |
|------|-------|-------|----------|
| Starter | Solo Lap | ₦[X],000 | 1 rider · 30 mins · Helmet included |
| Popular | Thrill Ride | ₦[X],000 | 1 rider · 45 mins · Helmet + briefing |
| Group | Group Pack | ₦[X],000 | Up to 6 riders · 2 hrs · Safety gear + staff |

Below the grid, a note: `Prices subject to change. Contact us for corporate and event rates.`

### 8. Testimonials (`Testimonials.tsx`)

Three placeholder testimonial cards in a row. Each has:
- A grey avatar circle placeholder
- Star rating (5 stars, orange)
- Placeholder quote text like:
  - *"Best experience in PH! Rode for the first time and I was hooked. Can't wait to come back."* — **[Name], Port Harcourt**
  - *"Took my team here for a bonding day. GRIT delivered — everyone had an absolute blast."* — **[Name], Corporate Client**
  - *"My kids loved it. Staff were super helpful and safety-conscious. Highly recommend."* — **[Name], Parent**

> Add a `{/* TODO: Replace with real testimonials */}` comment at the top of this component

### 9. Booking CTA (`BookingCTA.tsx`)

Full-width section, orange background (`bg-grit-orange`), black text.

- Heading: `Ready to Ride?` in Bebas Neue, very large, black
- Subtext: `Walk in or get in touch to book your slot.` in Inter
- Two buttons:
  - `Call Us` — dark fill, white text, links to `tel:[PLACEHOLDER]`
  - `WhatsApp Us` — white fill, dark text, links to `https://wa.me/[PLACEHOLDER]`
- Small note: `Open [PLACEHOLDER DAYS], [PLACEHOLDER HOURS]`

### 10. Contact (`Contact.tsx`) — `id="contact"`

Two columns:
- Left: Contact details
  - Address: `[PLACEHOLDER ADDRESS], Port Harcourt, Rivers State`
  - Phone: `[PLACEHOLDER PHONE NUMBER]`
  - Email: `[PLACEHOLDER EMAIL]`
  - Instagram: `@grit_quad_arena`
  - Opening Hours: `[PLACEHOLDER]`
- Right: Embedded Google Maps iframe placeholder — use a `div` with `bg-grit-grey` and text `[Map Embed Coming Soon]`, `h-72`

### 11. Footer (`Footer.tsx`)

- Dark (`grit-black`), minimal
- Left: `GRIT` logo text + tagline `Port Harcourt's Premier Quad Biking Arena`
- Center: Nav links repeated
- Right: Social icons (Instagram, TikTok, WhatsApp) — link to `#` for now
- Bottom bar: `© 2026 GRIT Quad Biking Arena. All rights reserved.`

---

## `tailwind.config.ts`

```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'grit-black':   '#0D0D0D',
        'grit-orange':  '#F5520C',
        'grit-sand':    '#C9A96E',
        'grit-white':   '#F2EDE6',
        'grit-grey':    '#1A1A1A',
        'grit-muted':   '#6B6B6B',
      },
      fontFamily: {
        display: ['Bebas Neue', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
```

---

## `app/layout.tsx` Font Setup

```tsx
import { Bebas_Neue, Inter } from 'next/font/google'

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-display',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${inter.variable}`}>
      <body className="bg-grit-black text-grit-white font-body antialiased">
        {children}
      </body>
    </html>
  )
}
```

---

## `app/globals.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer utilities {
  .font-display {
    font-family: var(--font-display);
  }
  .font-body {
    font-family: var(--font-body);
  }
}

/* Scroll fade-up animation */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(32px); }
  to   { opacity: 1; transform: translateY(0); }
}

.animate-fade-up {
  animation: fadeUp 0.6s ease forwards;
}

.opacity-0-init {
  opacity: 0;
}
```

Add a small client-side utility (or a `useScrollReveal` hook in `/hooks/useScrollReveal.ts`) that adds `animate-fade-up` to elements with `data-reveal` attribute when they enter the viewport.

---

## `app/page.tsx` Assembly

```tsx
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Experiences from '@/components/Experiences'
import HowItWorks from '@/components/HowItWorks'
import Gallery from '@/components/Gallery'
import Pricing from '@/components/Pricing'
import Testimonials from '@/components/Testimonials'
import BookingCTA from '@/components/BookingCTA'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Experiences />
      <HowItWorks />
      <Gallery />
      <Pricing />
      <Testimonials />
      <BookingCTA />
      <Contact />
      <Footer />
    </main>
  )
}
```

---

## Placeholder Inventory

All items marked `[PLACEHOLDER]` that need to be filled with real data before launch:

- [ ] Hero background image (`/public/images/placeholder-hero.jpg`)
- [ ] Opening hours (Navbar, Hero bottom strip, BookingCTA, Contact)
- [ ] Physical address (Hero bottom strip, Contact)
- [ ] Phone number (BookingCTA, Contact)
- [ ] WhatsApp link (BookingCTA, Footer)
- [ ] Email address (Contact)
- [ ] Google Maps embed URL (Contact)
- [ ] All pricing figures (Pricing section)
- [ ] Stats figures (About section: rider count, track count, events hosted)
- [ ] Gallery photos (Gallery section — 6 images, 4:3 ratio recommended)
- [ ] Real testimonials with names and photos (Testimonials section)
- [ ] Social media links — Instagram confirmed as `@grit_quad_arena`; TikTok handle TBC
- [ ] Photo/video service details (How It Works, Step 4)

---

## Notes for Claude Code

- Use `'use client'` directive only where interaction or scroll effects require it (Navbar hamburger, scroll reveal hook). Keep the rest as Server Components.
- Keep all section IDs consistent with Navbar anchor links: `#about`, `#experiences`, `#pricing`, `#contact`
- The design intentionally uses `rounded-none` on buttons and cards for a rugged, industrial feel — do not add rounded corners anywhere except avatar placeholders.
- No third-party component libraries. Tailwind utilities only.
- All `[PLACEHOLDER]` values should be wrapped in a `{/* TODO */}` comment in JSX and can optionally render a visible orange-bordered placeholder box in development so the client knows what's missing.
