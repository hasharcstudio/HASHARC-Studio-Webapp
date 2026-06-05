# Performance Optimization Plan

**Current Score: 31** → **Target: 90+**

## Key Metrics (Current)
| Metric | Value | Target |
|--------|-------|--------|
| FCP | 2.7s | < 1.8s |
| LCP | 3.7s | < 2.5s |
| TBT | 5,300ms | < 200ms |
| CLS | 0.021 | < 0.1 ✅ |
| SI | 10.8s | < 3.4s |

---

## Step 1: Reduce JavaScript Bundle (TBT + SI)
- [ ] Audit bundle with `@next/bundle-analyzer`
- [ ] Lazy-load heavy libraries (GSAP, Three.js/LightPillar) with `dynamic()` import
- [ ] Remove unused `three` import in page.js *(done)*
- [ ] Check if GSAP is loaded for all pages or only where needed

## Step 2: Optimize Hero Video (LCP)
- [ ] Compress hero.mp4 (currently large — contributes to 6,016 KiB payload)
- [ ] Add `preload="none"` or `preload="metadata"` to defer video loading
- [ ] Use `poster` attribute with a compressed image for instant visual
- [ ] Consider lazy-loading the video (only play when visible)

## Step 3: Lazy-Load Below-the-Fold Sections (TBT + SI)
- [ ] Dynamic import heavy components: LightPillar, MagicBento, ElectricBorder
- [ ] Use `next/dynamic` with `ssr: false` for canvas/WebGL components
- [ ] Defer non-critical animations until after first paint

## Step 4: Optimize LightPillar / WebGL (TBT)
- [ ] LightPillar uses Three.js — massive JS cost for a decorative effect
- [ ] Options: remove it, load only on desktop, or lazy-load after interaction
- [ ] Consider replacing with a CSS gradient animation for mobile

## Step 5: Reduce Render-Blocking Resources
- [ ] Audit CSS — remove unused Tailwind classes (already handled by Tailwind purge)
- [ ] Defer non-critical CSS if any custom stylesheets exist
- [ ] Ensure fonts load with `display: swap` (Next.js font handles this)

## Step 6: Optimize Images
- [ ] Ensure all images use Next.js `<Image>` with proper `sizes` attribute
- [ ] Add `priority` to above-the-fold images (logo, hero)
- [ ] Use WebP format for client photos

## Step 7: Fix robots.txt (SEO 92 → 100)
- [ ] robots.txt failing to download — verify `app/robots.js` generates correctly
- [ ] Test at `/robots.txt` endpoint

## Step 8: Fix Heading Order (Accessibility 98 → 100)
- [ ] "Heading elements not in sequentially-descending order" — audit and fix

---

## Priority Order
1. **Step 4** — LightPillar/Three.js is likely the #1 cause of 5.3s TBT
2. **Step 3** — Lazy-load MagicBento + GSAP (second biggest JS cost)
3. **Step 2** — Video optimization for LCP
4. **Step 1** — Bundle analysis to find remaining bloat
5. **Steps 5-8** — Polish for remaining points
