# Hasharc Studio — Landing Page

A modern, high-performance landing page for **Hasharc Studio** built with Next.js, Tailwind CSS, and GSAP.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS 4
- **Animations:** GSAP, Three.js (LightPillar), Canvas API (ElectricBorder)
- **Smooth Scroll:** Lenis
- **Email:** Nodemailer (Gmail SMTP)

## Project Structure

```text
app/                  → Pages, layouts, API routes, error boundaries
components/
  layout/             → Navbar, Footer, SmoothScroll
  sections/           → Hero, Services, ProductsCarousel, Reviews, Process, WhyChooseUs, Contact, etc.
  ui/                 → Reusable UI components (buttons)
data/                 → JSON data files (services, reviews, process, site config)
public/               → Static assets (images, icons, logos, videos)
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
npm install
```

### Environment Variables

Copy the example file and fill in your credentials:

```bash
cp .env.example .env.local
```

Required variables:

| Variable     | Description                          |
| ------------ | ------------------------------------ |
| `EMAIL_USER` | Gmail address for sending emails     |
| `EMAIL_PASS` | Gmail App Password (16-char)         |

> See [step.md](step.md) for instructions on generating a Gmail App Password.

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

## Data Files

Content is managed through JSON files in `/data` for easy editing without touching components:

- **`site.json`** — Navigation, contact info, social links, hero text, footer config
- **`services.json`** — Service cards (title, description, features)
- **`reviews.json`** — Client testimonials
- **`process.json`** — "How We Work" timeline steps
- **`whychooseus.json`** — Comparison data (Hasharc vs others)

## Featured Products Carousel

The homepage now includes a products carousel between **Services** and **Reviews**.

- Auto-rotates smoothly
- Supports hover/arrow navigation
- Supports swipe/drag on touch and mouse devices
- Includes thumbnail previews and clickable cards
- Opens each product in a new tab

Product images are stored in `public/web_product/`.

## Deployment

Optimized for [Vercel](https://vercel.com):

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables (`EMAIL_USER`, `EMAIL_PASS`)
4. Deploy

## License

Private project — all rights reserved.
