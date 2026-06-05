## Hasharc Studio Landing Page – Complete Project Plan

This document provides a **comprehensive, team-ready plan** for building a one‑page website for **Hasharc Studio** using **Next.js (JavaScript)**, **Tailwind CSS**, and **MongoDB**. The plan is structured so that every team member (frontend developer, backend developer, designer) can work independently by following the detailed specifications, component breakdowns, and day‑by‑day tasks.

---

## 1. Plan Overview

### Goals & Success Criteria
- **Primary goal**: Launch a modern, high‑converting landing page that clearly communicates Hasharc Studio’s services and encourages visitors to request a consultation.
- **Success metrics**:
  - Fully responsive design (mobile, tablet, desktop).
  - Smooth scrolling and navigation between sections.
  - Functional contact form that stores submissions in MongoDB.
  - Portfolio links that open simple demo pages for each project.
  - 100% pass of basic accessibility checks (Lighthouse).
  - Deployment on Vercel with a custom domain (optional).

### Team Roles & Responsibilities
- **Designer** (or Frontend lead with design skills): Provide final assets (logo, video, icons, images), define colour palette, typography, and spacing. Create a style guide.
- **Frontend Developer** (1–2 people): Implement all UI components, interactivity, form validation, smooth scrolling, and responsiveness.
- **Backend Developer** (1 person): Set up MongoDB, create API routes for contact form submission, handle environment variables, and assist with deployment.

### Tech Stack Decisions & Rationale
| Technology       | Choice                     | Rationale                                                                 |
|------------------|----------------------------|---------------------------------------------------------------------------|
| Framework        | Next.js 14 (App Router)    | Server‑side rendering for SEO, file‑based routing, built‑in API routes.  |
| Language         | JavaScript (ES6+)          | Team familiarity, faster development.                                    |
| Styling          | Tailwind CSS                | Utility‑first, rapid UI development, easy responsive design.             |
| Database         | MongoDB (with Mongoose)    | Flexible schema for leads, easy integration with Next.js API routes.     |
| Form Handling    | React Hook Form + Zod      | Lightweight, performant validation with schema validation.               |
| Icons            | React Icons or Lucide      | Consistent, accessible icon set.                                         |
| Deployment       | Vercel + MongoDB Atlas      | Vercel optimised for Next.js; MongoDB Atlas for cloud database.          |

### Milestones & Delivery Order
1. **Frontend Foundation** – Static layout with placeholder content, responsive grid, and basic styling.
2. **Frontend Features** – Interactive elements (smooth scroll, form validation, hover states) and dynamic data (portfolio mini‑pages).
3. **Backend Integration** – MongoDB setup, contact form API, submission storage.
4. **Polish & Deployment** – Accessibility audit, performance optimisation, final deployment.

---

## 2. Technology Stack (Detailed)

- **Next.js** – App Router for routing and API routes.
- **Tailwind CSS** – Configured with `tailwind.config.js` (custom colours, fonts).
- **MongoDB + Mongoose** – For storing contact form leads.
- **React Hook Form** – For form state and validation.
- **Zod** – Schema validation integrated with React Hook Form.
- **React Intersection Observer** – For smooth scroll highlighting (optional).
- **React Icons** – For social icons, service icons, etc.
- **Framer Motion** (optional) – For subtle animations (if time permits).
- **ESLint + Prettier** – Code consistency.

---

## 3. Project Structure (Next.js App Router)

```
hasharc-studio/
├── public/
│   ├── videos/
│   │   └── hero.mp4
│   ├── images/
│   │   ├── logo.svg
│   │   └── portfolio/
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── layout.js          # Root layout with global styles & metadata
│   │   ├── page.js            # Home page (imports all sections)
│   │   ├── api/
│   │   │   └── contact/
│   │   │       └── route.js   # POST endpoint for contact form
│   │   └── portfolio/
│   │       └── [id]/
│   │           └── page.js    # Dynamic mini demo page
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.js
│   │   │   ├── Footer.js
│   │   │   └── SmoothScroll.js # optional wrapper
│   │   ├── sections/
│   │   │   ├── Hero.js
│   │   │   ├── Services.js
│   │   │   ├── Portfolio.js
│   │   │   ├── Reviews.js
│   │   │   ├── WhyChooseUs.js
│   │   │   ├── Process.js
│   │   │   └── Contact.js
│   │   └── ui/
│   │       ├── Button.js
│   │       ├── Card.js
│   │       ├── SectionHeading.js
│   │       └── SocialIcons.js
│   ├── lib/
│   │   ├── mongodb.js          # MongoDB connection utility
│   │   └── utils.js            # Helper functions
│   ├── models/
│   │   └── Lead.js             # Mongoose schema for contact submissions
│   ├── data/
│   │   ├── services.json       # Static data for services
│   │   ├── portfolio.json      # Static data for portfolio projects
│   │   ├── reviews.json        # Static data for testimonials
│   │   └── process.json        # Steps for process section
│   └── styles/
│       └── globals.css         # Tailwind imports + custom base styles
├── .env.local                  # Environment variables (MongoDB URI)
├── tailwind.config.js
├── next.config.js
├── package.json
└── README.md
```

---

## 4. Detailed Feature Plan (Frontend‑First)

### Navbar
- **LOGO** (Hasharc Studio) – left side, linked to home (top of page).
- **Navigation links**: Home, Services, Reviews, Process, Contract Us.
- **CTA Button** “Contract Us” (same as the last nav item, but styled as a button).
- **Sticky** on scroll (using `sticky top-0` with background blur).
- **Mobile**: Hamburger menu with slide‑in panel.
- **Active section highlighting** while scrolling (optional, nice to have).

### Hero Section
- **Background**: Full‑width video loop (provided as `hero.mp4`) – muted, autoplay, playsinline.
- **Overlay**: Dark semi‑transparent gradient for text readability.
- **Headline**: “Professional Websites for Growing Businesses” (H1).
- **Value proposition**: Short sentence (e.g., “We craft custom websites that drive results.”).
- **CTA Button**: “Get a Free Consultation” – smooth scrolls to Contact section.

### Services Section
- Grid of 4 cards (Custom website, Website Redesign, Maintenance & Support, UI/UX/Graphic Design).
- Each card has an icon, title, short description (1–2 lines).
- Hover effect (scale, shadow).

### Portfolio Section
- Grid of project cards (3–6 projects from static data).
- Each card shows project image, title, and a “View Demo” button.
- Clicking a card navigates to `/portfolio/[id]` – a simple demo page with project details (image, description, maybe live preview link placeholder).
- Demo pages share a common layout with back navigation.

### Reviews Section
- Carousel or grid of testimonials (3–5 reviews).
- Each includes client name, role, rating (stars), and text.
- Static data (can later be moved to CMS if needed).

### Why Choose Us Section
- Comparison chart (two columns: “We” vs “Other Agencies”).
- Rows: **Fast Delivery**, **Mobile Responsive**, **Affordable Pricing**.
- Use check (✓) and cross (✗) icons to indicate presence/absence.
- Styled as a simple table or flex columns.

### Process Section
- Visual timeline from “X to Y” (e.g., “Idea to Launch”).
- 4–6 steps, each with a title and short explanation.
- Could use numbered circles or icons horizontally on desktop, vertically on mobile.

### Contact Section
- Two‑column layout:
  - **Left column**: Name, Email, Message fields, Submit button.
  - **Right column**: Contact options – WhatsApp, Email, Messenger, Instagram icons/links (open in new tab).
- Form validation (frontend):
  - Name: required.
  - Email: required, valid format.
  - Message: required, min length 10.
- Submit button shows loading state, success/error toast messages.
- **Right‑aligned contact options** as specified.

### Footer
- WhatsApp icon/link, Email link, Social links (Instagram, Messenger, maybe LinkedIn).
- Simple copyright line.

### Accessibility & Responsiveness
- Semantic HTML (`<header>`, `<section>`, `<nav>`, etc.).
- ARIA labels where needed (hamburger menu, icons).
- Keyboard navigable.
- Mobile‑first Tailwind classes (`flex-col`, `md:flex-row`, etc.).
- Adequate colour contrast.

### SEO Basics
- Meta title, description in `layout.js`.
- Open Graph tags for social sharing.
- Heading hierarchy (H1 only once).

---

## 5. Interaction and UX

- **Smooth scrolling** when clicking nav links (using `scrollIntoView({ behavior: 'smooth' })`).
- **Sticky navbar** remains visible.
- **Hover/focus states** for all interactive elements (buttons, links, cards).
- **Form submission flow**:
  - On submit, frontend validates.
  - If valid, POST to `/api/contact`.
  - Show loading spinner on button.
  - On success: show success message, clear form.
  - On error: show error message (generic for security).
- **Empty states**: Portfolio section if no projects (should not happen with static data).
- **Success/failure feedback** via toast notifications (e.g., `react-hot-toast`).

---

## 6. Backend Plan (Follow‑on)

### Data Model (Mongoose)
**Lead** collection:
```javascript
{
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
}
```

### API Endpoint: `/api/contact`
- **Method**: POST
- **Request body**: `{ name, email, message }`
- **Validation**: Server‑side validation (Zod) – same as frontend.
- **Response**:
  - 201 Created – success, returns `{ success: true, id }`
  - 400 Bad Request – validation errors
  - 500 Internal Server Error – database issues
- **Rate limiting** (basic): Could use a simple in‑memory store or Vercel edge middleware to limit per IP (optional for MVP).

### Security Considerations
- Environment variables for MongoDB URI (not hard‑coded).
- Sanitise user input (Mongoose does it automatically).
- No sensitive data stored.

### Admin Area (Optional)
- If time permits, create a simple password‑protected page (`/admin/leads`) that displays all submissions. Use Next.js middleware for basic auth.

### Environment Setup
- **MongoDB Atlas**: Create cluster, database user, network access (allow all for now, restrict later).
- **Connection string**: Store in `.env.local` as `MONGODB_URI`.
- **Connection utility** (`lib/mongodb.js`) that reuses cached connection.

---

## 7. Deliverables & Artifacts

- **Project scaffolding** – initialised Next.js repo with Tailwind configured.
- **Component library** – reusable UI components (Button, Card, etc.).
- **Data files** – JSON files for services, portfolio, reviews, process.
- **Mongoose model** for Leads.
- **API route** for contact form.
- **Deployment** on Vercel with environment variables set.
- **Documentation** – brief README on how to run locally, environment variables, and project structure.

---

## 8. Assumptions & Constraints

- **No complex CMS** – content is static JSON (can be replaced later).
- **Portfolio demo pages** are simple static pages (no database needed).
- **Video file** is provided and optimised (compressed MP4).
- **Team size**: 2–3 developers (frontend + backend).
- **No authentication** for viewing the site; admin area optional.
- **Tailwind CSS** – we’ll use a custom colour palette based on Hasharc Studio branding.
- **Analytics** – optional Google Analytics or Vercel Analytics can be added post‑launch.

---

## 9. Day‑by‑Day Plan (6 Weeks, 30 Working Days)

*Assumes a team of 2 frontend developers and 1 backend developer (who also handles DevOps). Days are cumulative; tasks may be parallelised.*

### Phase 1: Frontend Foundation (Days 1–10)

| Day | Tasks                                                                                                 | Responsible        |
|-----|-------------------------------------------------------------------------------------------------------|--------------------|
| 1   | Set up Next.js project with Tailwind, ESLint, Prettier. Configure folder structure.                   | Frontend Lead      |
| 2   | Create global layout, metadata, and base CSS (fonts, colours).                                        | Frontend Lead      |
| 3   | Build reusable UI components: Button, SectionHeading, SocialIcons, Card.                              | Frontend Dev 1     |
| 4   | Implement Navbar component with logo, links, and mobile hamburger menu.                                | Frontend Dev 1     |
| 5   | Implement Footer component with icons and links.                                                      | Frontend Dev 2     |
| 6   | Develop Hero section: video background, overlay, headline, CTA button.                                 | Frontend Dev 2     |
| 7   | Develop Services section: grid of cards with static data from JSON.                                   | Frontend Dev 1     |
| 8   | Develop Why Choose Us section: comparison chart with icons.                                           | Frontend Dev 2     |
| 9   | Develop Process section: horizontal/vertical steps with static data.                                  | Frontend Dev 1     |
| 10  | Integrate all sections into `page.js`. Ensure basic responsive layout (mobile first).                 | Frontend Lead      |

### Phase 2: Frontend Features & Interactions (Days 11–20)

| Day | Tasks                                                                                                 | Responsible        |
|-----|-------------------------------------------------------------------------------------------------------|--------------------|
| 11  | Implement smooth scrolling for nav links (scroll to section). Add active section highlight.           | Frontend Dev 1     |
| 12  | Develop Portfolio section: project cards linking to dynamic routes. Create `portfolio/[id]/page.js`.  | Frontend Dev 2     |
| 13  | Create static JSON for portfolio projects. Build demo pages with images and back navigation.          | Frontend Dev 2     |
| 14  | Develop Reviews section: testimonial cards (static). Optionally add a simple carousel.                | Frontend Dev 1     |
| 15  | Develop Contact section: form layout with fields, right‑aligned contact options.                      | Frontend Dev 2     |
| 16  | Add frontend form validation using React Hook Form + Zod.                                             | Frontend Dev 1     |
| 17  | Implement form submission flow (onSubmit) with loading state and mock API call.                       | Frontend Dev 1     |
| 18  | Add toast notifications for success/error feedback.                                                    | Frontend Dev 2     |
| 19  | Test all interactive elements (hover, focus, keyboard navigation). Improve accessibility.              | Both Frontend      |
| 20  | Cross‑browser testing, fix responsive issues.                                                         | Frontend Lead      |

### Phase 3: Backend Integration (Days 21–28)

| Day | Tasks                                                                                                 | Responsible        |
|-----|-------------------------------------------------------------------------------------------------------|--------------------|
| 21  | Set up MongoDB Atlas cluster, create database user, obtain connection string.                         | Backend Dev        |
| 22  | Create `lib/mongodb.js` connection utility. Add environment variable.                                 | Backend Dev        |
| 23  | Define Mongoose model for Lead in `models/Lead.js`.                                                   | Backend Dev        |
| 24  | Build API route `app/api/contact/route.js` with POST handler, server‑side validation, and database save. | Backend Dev     |
| 25  | Connect frontend form to actual API endpoint (replace mock).                                          | Frontend Dev 1     |
| 26  | Implement basic rate limiting (e.g., via Vercel Edge Config or a simple middleware).                  | Backend Dev        |
| 27  | (Optional) Build a simple admin page `/admin/leads` with password protection to view submissions.    | Backend Dev        |
| 28  | Test end‑to‑end: form submission, database storage, error handling.                                   | All                |

### Phase 4: Polish & Deployment (Days 29–30)

| Day | Tasks                                                                                                 | Responsible        |
|-----|-------------------------------------------------------------------------------------------------------|--------------------|
| 29  | Perform full accessibility audit (Lighthouse, axe). Fix issues.                                      | Frontend Lead      |
| 30  | Deploy to Vercel, set environment variables, test live. Add custom domain if required. Final sign‑off. | Backend Dev + Lead |

---

This plan provides a clear roadmap for the entire project. Each team member can refer to the day‑by‑day tasks and the detailed specifications above to build their part independently. Adjustments can be made as the project progresses, but this document serves as the single source of truth.

**Let’s build an impressive online presence for Hasharc Studio!**