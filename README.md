# Spectrum AI Website

A polished, scalable Next.js/Supabase CMS with modern UI/UX, robust admin features, dynamic content, smooth animations, and a well-documented workflow for both manual and bulk content management.

---

## Table of Contents
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Supabase Schema](#supabase-schema)
- [Admin Features](#admin-features)
- [Public Features](#public-features)
- [Image Uploads](#image-uploads)
- [Animations](#animations)
- [Bulk Import](#bulk-import)
- [Deployment](#deployment)
- [Customization](#customization)
- [Troubleshooting](#troubleshooting)
- [Author](#author)

---

## Tech Stack
- **Next.js** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** (animations)
- **Supabase** (database, auth, storage)
- **React Select** (dynamic selects)

---

## Project Structure
```
app/
  about/
  admin/(protected)/
    blog-posts/
    case-studies/
    services/
    solutions/
    team-members/
    testimonials/
    layout.tsx
    ...
  blog/
  case-studies/
  contact/
  services/
  solutions/
  globals.css
  layout.tsx
  not-found.tsx
  page.tsx
components/
  AuroraBackground.tsx
  ClientLayout.tsx
  Footer.tsx
  GlassBackdrop.tsx
  Header.tsx
  ui/
    about-3.tsx
    ai-solutions-showcase.tsx
    animated-testimonials.tsx
    bento-grid.tsx
    button.tsx
    card.tsx
    dark-gradient-pricing.tsx
    faq.tsx
    feature-section.tsx
    ImageUploader.tsx
    main-services-card.tsx
    rainbow-arrow.css
    rainbow-button.tsx
    RevealOnScroll.tsx
    services-stack.tsx
lib/
  supabaseClient.ts
  utils.ts
public/
  random-hover.js
```

---

## Supabase Schema
- **Tables:**
  - blog_posts (with categories, image, etc.)
  - case_studies (with industries, image, etc.)
  - services
  - solutions (title, platforms[], industries[], impact, details, category)
  - team_members
  - testimonials
- **Storage:**
  - Buckets for images (with upload/read policies)
- **Auth:**
  - Email/password login for admin
  - RLS for protected routes

---

## Admin Features
- **Authentication:**
  - Login page, protected admin routes
- **CRUD:**
  - Full create, read, update, delete for all content types
- **Image Uploads:**
  - Reusable ImageUploader (Supabase Storage)
- **Dynamic Selects:**
  - Inline create/delete for categories (blog) and industries (case studies)
- **Bulk Import:**
  - CSV import for solutions, with array formatting and error handling
- **UI/UX:**
  - Consistent admin header (back arrow, title, action button)
  - Clean tables/forms, multi-selects, and error handling

---

## Public Features
- **Dynamic Content:**
  - Blog, case studies, solutions, services, testimonials, team
- **Animations:**
  - RevealOnScroll, Framer Motion, fade transitions, hover/scale effects
- **Logo Marquee:**
  - Masked carousel with blur overlays
- **Responsive Design:**
  - Mobile-friendly, modern UI

---

## Image Uploads
- **Component:** `components/ui/ImageUploader.tsx`
- **Usage:** Used in admin forms for blog posts, case studies, etc.
- **Storage:** Supabase Storage with public read/upload policies
- **Instructions:** Drag & drop or select image, preview, upload

---

## Animations
- **RevealOnScroll:** Slow, smooth scroll-based reveal for sections
- **Framer Motion:** Page transitions (fade in/out), button/card effects
- **Custom Effects:** CTA scale, card hover raise/shadow, logo marquee masking

---

## Bulk Import
- **Use Case:** Importing 172+ AI solutions from Google Sheets
- **Process:**
  1. Enrich data (add platforms, industries, impact, etc.)
  2. Format arrays as `{value1,value2}` for Supabase
  3. Export as CSV
  4. Use Supabase Table Editor to import
- **Troubleshooting:**
  - Array formatting, null constraints, error messages
  - Remove/rename fields to match schema

---

## Deployment
- **Local:** `npm run dev`
- **Production:** Deploy to Vercel or similar
- **Supabase:** Ensure env vars and storage policies are set

---

## Customization
- **Schema:** Update Supabase tables as needed
- **UI:** Edit components in `/components` and `/app`
- **Animations:** Tweak Framer Motion and RevealOnScroll settings
- **Storage:** Adjust Supabase Storage buckets/policies for new content types

---

## Troubleshooting
- **Build Errors:** Check for client/server mismatches, metadata exports
- **Supabase Import:** Validate CSV, array formatting, nulls
- **UI Bugs:** Check for undefined fields, update admin tables/forms
- **Auth Issues:** Confirm RLS and login flow

---

## Author
**Wisdom Bassey** 