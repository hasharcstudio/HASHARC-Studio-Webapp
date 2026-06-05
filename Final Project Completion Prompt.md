Here's a polished, comprehensive final prompt you can give to your developer (or yourself) to wrap up the Hasharc Studio website. It incorporates your existing work, addresses missing pieces, and sets clear goals for responsiveness, SEO, maintainability, and overall quality.

---

## Final Project Completion Prompt

**Project:** Hasharc Studio Landing Page  
**Stack:** Next.js (App Router), Tailwind CSS, Lenis, Nodemailer  
**Current State:** All core sections built (Hero, Services, Portfolio, Process, Reviews, WhyChooseUs, Contact, MagicBento, LightPillar, ElectricBorder), Navbar with smooth scroll, Footer, Contact form integrated with API and email sending.

**Goal:** Deliver a production‑ready, fully responsive, SEO‑optimised, and maintainable website that achieves a high Lighthouse score and provides an excellent user experience on all devices.

---

### 1. Responsive Design (Mobile, Tablet, Desktop)
- Ensure every section adapts flawlessly across all screen sizes.  
- Use Tailwind’s responsive utilities (`sm:`, `md:`, `lg:`, `xl:`) to adjust layouts, font sizes, spacing, and component behaviour.  
- Test on real devices or emulators (iPhone, iPad, various Android phones, desktop).  
- Pay special attention to:
  - Navigation menu (hamburger on mobile, horizontal on desktop).  
  - Stacking of grid/flex items (e.g., services cards, portfolio items).  
  - Contact form layout (two columns on desktop, one on mobile).  
  - Video background in Hero – ensure it scales correctly and does not overflow.  
  - Process section timeline (horizontal on desktop, vertical on mobile).  
- Eliminate any horizontal overflow or awkward whitespace.

### 2. SEO & Lighthouse Optimisation
- **Meta Data:**  
  - Add a unique, descriptive `<title>` and `<meta name="description">` to `layout.js`.  
  - Include Open Graph tags (title, description, image) for social sharing.  
  - Add `viewport` meta tag (already in Next.js by default, but verify).  
- **Semantic HTML:**  
  - Use proper heading hierarchy (`h1` only once in Hero, `h2` for section titles, `h3` for cards, etc.).  
  - Wrap sections in `<section>` with `aria-labelledby` or appropriate labels.  
- **Image Optimisation:**  
  - Use Next.js `Image` component for all static images (portfolio, client photos) with proper sizing and `alt` text.  
  - Ensure video in Hero is optimised (compressed, modern format) and has `aria-hidden="true"`.  
- **Performance:**  
  - Implement lazy loading for below‑the‑fold images and iframes.  
  - Minimise unused JavaScript – code‑split where possible (Next.js does this automatically).  
  - Run Lighthouse in Incognito mode and aim for scores ≥ 90 in Performance, Accessibility, Best Practices, and SEO.  
- **Accessibility:**  
  - Ensure colour contrast meets WCAG AA standards.  
  - Add `:focus` styles for all interactive elements.  
  - Make the mobile menu keyboard‑accessible.  
- **Sitemap & robots.txt:**  
  - Generate a `sitemap.xml` and `robots.txt` (static files or via Next.js rewrite).  

### 3. Code Maintainability & Future‑Proofing
- **Project Structure:** Keep components organised (`/sections`, `/layout`, `/ui`).  
- **Data Management:**  
  - If any content is currently hard‑coded (services, portfolio, reviews), consider moving to JSON files in `/data` for easy editing.  
  - Use environment variables for sensitive data (e.g., email credentials).  
- **Error Handling:**  
  - Implement missing error boundaries:  
    - `app/error.js` – catch runtime errors and show a friendly UI.  
    - `app/not-found.js` – custom 404 page.  
    - `app/global-error.js` – fallback for root errors (requires client component).  
  - Add proper error handling in API routes (try/catch, meaningful status codes).  
- **Comments & Documentation:**  
  - Add brief comments for complex logic or non‑obvious code.  
  - Update the README with setup instructions, environment variables, and deployment steps.  
- **Code Quality:**  
  - Run ESLint and Prettier to ensure consistent formatting.  
  - Remove any unused imports, variables, or console logs.  
- **Component Reusability:**  
  - Abstract repeated UI patterns (e.g., cards, buttons) into reusable components.  
  - Ensure Tailwind classes are consistent (consider using `@apply` for complex, repeated patterns in a global CSS file if needed).  

### 4. Additional Improvements (Your Authority)
- Feel free to enhance the visual polish with subtle animations (e.g., fade‑ins on scroll using Framer Motion or Intersection Observer).  
- Add a loading skeleton or spinner for any dynamic content (if any).  
- Implement a simple CMS later if desired (not required now, but structure data to make it easy).  
- Ensure the contact form has rate limiting (basic) and CSRF protection (optional).  
- Verify that the email sending (Nodemailer) works reliably in production; use a service like SendGrid or Resend if needed.  

### 5. Deployment Readiness
- Test the build locally with `npm run build` and `npm start`.  
- Configure environment variables on Vercel (or your hosting platform).  
- Deploy to Vercel (recommended) and verify all features work.  
- Add a custom domain if available.  
- Set up analytics (e.g., Vercel Analytics, Google Analytics) if desired.

---

**Your final deliverable:** A polished, responsive, and optimised website that you’d be proud to show to clients. Use your best judgment to implement these points – the goal is to make the site fast, accessible, and easy to maintain. If you encounter any blockers or need clarification, please reach out.

**Thank you for your work – let’s make Hasharc Studio shine!**