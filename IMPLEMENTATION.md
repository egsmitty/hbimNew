# Implementation Guide — Read Before Writing Code

> This file exists because the project runs **Next.js 16.2.6** and **Tailwind CSS v4**, which have breaking changes from prior versions. Any implementing agent must follow these rules.

---

## Next.js 16 — What's Different

### Async Params (BREAKING)
All `params` and `searchParams` in pages, layouts, and route handlers are now `Promise<T>`. They must be awaited.

```tsx
// CORRECT — Next.js 16
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <div>{slug}</div>;
}

// WRONG — will error
export default function Page({ params }: { params: { slug: string } }) {
  return <div>{params.slug}</div>;
}
```

### No Middleware — Use `proxy.ts`
`middleware.ts` is deprecated. Use `proxy.ts` with an exported `proxy` function if needed. We likely won't need this for a static nonprofit site.

### Turbopack is Default
`next dev` and `next build` both use Turbopack. No webpack config exists in this project, so this just works.

### No `next lint`
ESLint runs directly via `npx eslint`. The `lint` script in package.json already does this.

---

## Tailwind CSS v4 — What's Different

### No `tailwind.config.js`
Tailwind v4 does not use a JS config file. All customization lives in `globals.css` via `@theme` blocks.

### Custom Colors
Already configured in `app/globals.css`. Use them as:
- `bg-navy`, `text-navy`, `border-navy`
- `bg-gold`, `text-gold`, `border-gold`
- `bg-surface`, `text-text`, `text-text-muted`
- `bg-background`, `bg-divider`

### Custom Fonts
Set via CSS variables from `next/font` in `layout.tsx`:
- `font-heading` → Playfair Display (use for h1–h3, hero text, impact numbers)
- `font-body` → Inter (use for body, nav, buttons, labels)

Usage: `className="font-heading text-4xl"` or `className="font-body text-base"`

### No `@tailwind` Directives
The old `@tailwind base; @tailwind components; @tailwind utilities;` is replaced by a single `@import "tailwindcss";`

---

## Project Structure

```
hbimNew/
├── app/
│   ├── layout.tsx          ← Root layout (fonts, metadata, Nav + Footer wrap here)
│   ├── page.tsx            ← Home page
│   ├── globals.css         ← Tailwind + HBM theme tokens
│   ├── about/page.tsx
│   ├── africa/page.tsx
│   ├── asia/page.tsx
│   ├── give/page.tsx
│   ├── contact/page.tsx
│   └── subscribe/page.tsx
├── components/
│   ├── Nav.tsx
│   ├── Footer.tsx
│   ├── ImpactBar.tsx       ← Reusable impact numbers strip
│   ├── Hero.tsx            ← Reusable hero section
│   ├── GiveCTA.tsx         ← Reusable give call-to-action banner
│   └── ...                 ← Additional shared components
├── public/
│   └── images/             ← Placeholder images, later real photos
├── Spec.md                 ← Full project spec + page structures
├── ToDo.md                 ← Task tracking
├── IMPLEMENTATION.md       ← This file
└── next.config.ts
```

---

## Build Order

Follow this order. Each step should produce a working, viewable state.

1. **Nav + Footer** → Add to `layout.tsx` so they wrap all pages
2. **Home page** → Section by section, top to bottom (see Spec.md for structure)
3. **About page**
4. **Africa page**
5. **Asia page**
6. **Give page**
7. **Contact page**
8. **Subscribe page**

### Shared Components to Extract
- `ImpactBar` — used on Home + About (possibly Africa/Asia with regional stats)
- `Hero` — every page has one; parameterize title, subtitle, background
- `GiveCTA` — used on Home + region pages

---

## Image Strategy

All images are **placeholders** during build. Use solid color `div` elements with descriptive text overlays (e.g., "Hero Photo — Africa field work") sized to the intended aspect ratio. Do NOT use `next/image` with broken src paths. When real photos arrive from Google Drive, they'll be placed in `public/images/` and swapped in.

---

## Guiding Principles

- This is a UX/structure overhaul, not a rebrand. Keep the existing identity.
- The site should feel like an editorial missions magazine — photography-driven, typography-forward, lots of white space.
- Navy (`#19355e`) is the dominant brand color. Gold (`#C8973A`) is the accent for CTAs and highlights only.
- Every design decision should be explained per CLAUDE.md protocol.
- Build incrementally. Test as you go. No monolithic dumps.
