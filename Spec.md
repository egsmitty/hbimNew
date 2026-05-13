# HBM Website Redesign — Project Spec

> Living document. Update as decisions are confirmed.

---

## Project Overview

**Project Name:** Hope Builders Ministries Website Redesign
**Site:** hbmin.org
**Type:** Nonprofit ministry / cause-driven organization
**Approach:** UX and structure overhaul — not a brand reinvention. Preserve existing visual identity, improve information hierarchy, storytelling, and donation accessibility.

---

## Goals

1. **Primary:** Improve user experience — better information flow, clearer navigation, more intuitive structure
2. **Secondary:** Build awareness and credibility — surface impact stats, tell the story, establish trust signals
3. **Tertiary:** Make giving easy and accessible — not aggressive, but frictionless

---

## Audience

- Evangelical Christian donors and ministry partners
- Age range: 35–65+
- Motivated by: The Great Commission, long-term discipleship, global missions impact
- Mobile-aware but desktop-primary demographic — accessibility matters

---

## Brand Voice

Warm, mission-driven, and editorial. Serious without being corporate. Faithful without being cheesy. Every page should feel like it was written by someone who genuinely believes in the work.

---

## Design Direction

### Philosophy
This is not a rebrand. The existing identity is preserved. The redesign improves *how* the site is organized and experienced — not *what* it looks like at a brand level.

### Color System
Existing brand navy preserved. Gold accent confirmed for CTAs, highlights, and key moments.

| Role | Name | Hex |
|---|---|---|
| Primary | HBM Navy | `#19355e` |
| Accent | Gospel Gold | `#C8973A` |
| Background | White | `#ffffff` |
| Surface | Light Gray | `#eeeeee` |
| Text | Dark Gray | `#555555` |
| Text Secondary | Medium Gray | `#777777` |
| Dividers | Pale Gray | `#ededed` |

### Typography
- **Headings:** Playfair Display (700) — editorial weight, faith-appropriate gravitas
- **Body:** Inter (400/500) — clean, readable at all sizes
- Responsive scaling using CSS clamp
- Large impact numbers get their own typographic moment — not buried in body copy

### Layout
- Mobile-first, 12-column CSS Grid
- Max content width: 1200px
- Generous vertical spacing between sections (80–120px)
- Full-bleed photography sections alternate with contained text sections
- Impact stats displayed in a dedicated full-width numbers bar

### Imagery
- Placeholder images used during build
- Real field photography (Africa/Asia) delivered via Google Drive — to be swapped in Phase 5
- Photography is the primary emotional driver of the design

---

## Tech Stack

| Layer | Choice | Reason |
|---|---|---|
| Framework | Next.js | Fast, design-flexible, excellent SEO, static export capable |
| Hosting | Vercel | Free tier, automatic deploys, CDN-distributed |
| Styling | Tailwind CSS | Utility-first, rapid build, consistent spacing |
| CMS | TBD (possibly Sanity or no-CMS static) | Depends on how often client updates content |
| Donor CRM | Virtuous (unchanged) | Completely separate from website — no migration needed |
| Email/Subscribe | Existing platform (unchanged) | Exportable/migratable if needed |

---

## Pages in Scope

| Page | Status | Notes |
|---|---|---|
| Home | Rebuild | Lead with mission, impact stats, story, CTAs |
| About | Rebuild | Full story, founder narrative, timeline, team |
| Africa | Rebuild | Fix broken page, tell regional story with photos |
| Asia | Rebuild | Expand — India, Pakistan, Bangladesh |
| Give | Rebuild | Cleaner giving UX, four pathways preserved |
| Contact | Rebuild | Keep form, add team names/emails more prominently |
| Subscribe | Rebuild | Simple, clear value proposition |

---

## Page Structures (Phase 3 — Approved)

### Global Components

**Navbar**
- Logo left
- Links center: About / Africa / Asia / Give / Contact
- CTA right: "Give Now" (gold button)
- Sticky, navy background, collapses to hamburger on mobile

**Footer**
- Logo + mission tagline
- Nav links repeated
- Social icons: Facebook, YouTube, Twitter, Instagram
- ECFA badge + 501(c)(3) statement
- Contact info + copyright

---

### Home Page Sections
1. **Hero** — Full-bleed placeholder photo, large Playfair headline, subhead, two CTAs (Give / Learn More)
2. **Mission Bar** — One bold sentence: what HBM does and where
3. **Impact Numbers** — Full-width bar: 600K Bibles | 25K Pastors | 11K Churches | 4K+ Asia Churches
4. **Africa + Asia Cards** — Two large image cards, each linking to their region page
5. **Story Section** — Founder narrative (Johan Gous, the Malawi Bible exchange), pull quote
6. **Programs Overview** — Icon/card grid: Pastor Training, Bibles for Disciples, Dignity Project, Disciple Makers, Timothy Training
7. **Trust Bar** — ECFA logo, 501(c)(3), "Trusted since 1984"
8. **Give CTA Banner** — Full-bleed navy section, gold button, short copy

### About Page Sections
1. **Hero** — Photo placeholder + page title
2. **Mission + Vision** — Two-column: scripture anchor (Eph 4:12-13) + mission statement
3. **Timeline** — 1984 founding → 1990 Timothy Institute → 2001 village churches → 2002 Johan joins → 2010 President → 2013 Asia expansion
4. **Impact Numbers** — Same component as Home
5. **Programs Detail** — Expanded cards for each program with descriptions
6. **Team** — Johan Gous, Lawrence Gunnells, Jeff Hawkins

### Africa Page Sections
1. **Hero** — Regional photo placeholder + headline
2. **Overview** — What the work looks like on the ground
3. **Countries Grid** — 8 nations, each with a brief blurb
4. **Impact Numbers** — Africa-specific stats
5. **Stories / Field Reports** — Photo + caption cards (placeholders)
6. **Give to Africa CTA**

### Asia Page Sections
Same structure as Africa, scoped to India / Pakistan / Bangladesh.

### Give Page Sections
1. **Hero** — Simple, warm: "Your gift advances the Gospel"
2. **Four Giving Pathways** — General Fund / Project / Country / Team Member — clean card layout
3. **Give by Check** — Simple callout block with mailing address
4. **Trust Signals** — ECFA, 501(c)(3), tax deductibility statement
5. **Donor Portal Login** — Secondary link for existing Virtuous donors

### Contact Page Sections
1. **Hero** — Simple header
2. **Two-column layout** — Contact form left, contact info + team right
3. **Team callout** — "HBM is always looking for disciples..."

### Subscribe Page Sections
1. **Simple centered layout** — Headline, value prop sentence, email form
2. **Trust note** — No spam, unsubscribe anytime

---

## Repository

**GitHub:** https://github.com/egsmitty/hbimNew
**Push access:** User handles pushes directly

---

## Out of Scope

- Virtuous CRM or donor portal backend
- Email platform infrastructure
- Any changes to giving processing/payment logic
- Social media accounts

---

## Reference Sites

- [World Vision](https://www.worldvision.org) — full-bleed photography, bold typography, impact-first hierarchy
- [IMB](https://www.imb.org) — clean hierarchy, icon-driven nav, trust signals, multi-pathway engagement

---

## Key Content Assets

- ~600,000 Bibles distributed
- 25,000 pastoral graduates trained
- 11,000 village churches established across 8 African nations
- 4,000+ churches in India
- 1,000+ new churches planted in Asia
- Programs: Pastor Training, Timothy Training, Bibles for Disciples, Dignity Project, Disciple Makers
- Countries: Malawi + 7 other African nations, India, Pakistan, Bangladesh
- Founded: 1984 | Johan Gous, President since 2010
- 501(c)(3) + ECFA Accredited
- Contact: Ministry@HBMIN.org | (931) 401-7310 | PO Box 317, Greenwood, VA 22943

---

## Success Criteria

A first-time visitor should:
1. Immediately understand who HBM is and what they do
2. Feel the weight and credibility of the mission
3. Trust the organization (501c3, ECFA, real numbers)
4. Know exactly how to give, subscribe, or get involved — within the first scroll

---

*Last updated: Phase 3 — Structure & Layout (Opus audit pass complete)*
