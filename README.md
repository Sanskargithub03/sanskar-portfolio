# Sanskar Yede — Portfolio

A production-ready personal portfolio built in React + TypeScript + Vite + Tailwind CSS v4,
with GSAP/ScrollTrigger + Framer Motion for motion and Lenis for smooth scroll.

## Quick start

```bash
npm install
npm run dev       # local dev server, usually http://localhost:5173
npm run build     # production build -> dist/
npm run preview   # serve the production build locally
npm run lint       # static analysis
```

Verified in this build environment: `npm run build` and `npm run lint` both pass clean.
**I have not been able to visually test this in an actual browser** — there is no headless
browser available in this build environment. Everything below is verified by code review,
type-checking, and a clean production build, not by looking at the rendered page. Please
check the first viewport and the project carousel in particular before shipping.

## ⚠️ Two things to double-check before this goes live

Not code issues — content/attribution questions only you can answer:

1. **The uploaded WhatsApp PRD's footer reads "Author: Satyam Chourasiya"**, not your name.
   I built the site treating this as your project, per every instruction across this
   conversation — but you may want to confirm that's correct (co-authored? a template
   credit? worth checking) before it's live as solely your work.
2. **The uploaded YouTube deck's header reads "PRODUCT THINKING CASE STUDY · VEDANTU PM
   INTERNSHIP."** I have not added "Vedantu" or "internship" framing anywhere on the live
   site — it's presented the same way you've described it throughout (an independent
   product-thinking case study) — but flagging it in case you want that context disclosed or
   handled differently.

## V3 changelog (this pass)

1. **Real photo integrated.** The uploaded portrait is a genuine transparent-background
   cutout (verified via its alpha channel — not a baked-in white background), so it composites
   directly onto the cream page. Converted to optimized WEBP and placed at
   `/public/images/profile-sanskar.webp` — the exact path the site already pointed at, so this
   required zero code changes. The bottom edge still gets a soft gradient fade (the photo
   itself is a hard rectangular crop at the shoulders), and the previous Kommodo CDN URL
   remains as the automatic fallback if this file is ever removed.
2. **Real WhatsApp Smart Search AI screenshots**, extracted directly from your uploaded PRD
   PDF (not fabricated, not stock, not abstract shapes): home screen (light + dark), the AI
   processing state, ranked semantic results, and settings (light + dark) — six real phone UI
   captures, now used everywhere the project appears (card, detail page, gallery).
3. **Real YouTube Consent & Personalization visuals**, rasterized from your uploaded deck at
   full quality: all 10 slides, including the problem statement, user personas, the current
   DPDP-gap flow, the proposed 4-part solution, the metrics dashboard (87.4% Verified Consent
   Rate), the diagnostic-thinking hypothesis tree, rollout plan, and trade-offs.
4. **Case-study PDFs are now your real uploaded files** — replaced the auto-generated
   stand-in PDFs from the previous pass with the actual
   `WhatsApp_Smart_Search_AI_PRD_With_Images.pdf` and `YouTube_DPDP_Consent_Deck.pdf`, at
   `/public/case-studies/`. "View Case Study" / "Full Case Study (PDF)" now open the real
   documents in a new tab.
5. **Added a "Product Thinking" block to the YouTube case study** using the deck's own
   diagnostic-thinking slide (hypothesis tree + root-cause reasoning for a hypothetical metric
   regression) — this is real content from the deck that wasn't in the site before, and it's
   some of the strongest "how you think" evidence in the source material.
6. **Project visuals rebuilt end to end**: `ProjectVisual` now layers real screenshots
   (2–3 deep, front-to-back, with independent hover parallax and scroll drift) instead of
   abstract illustrations. `ProjectDetail` uses a real screenshot as the shared-layout hero
   image and adds a full "Screens" gallery + lightbox of that project's real captures.
   "Behind the Build" is a real asymmetric masonry (large + stacked pair + wide) built from
   real images across both projects — no more gradient placeholders.
7. **Scroll speed fixed.** Lenis was using slow fixed-duration easing (~1.1s per settle),
   which combined with the project carousel's own scroll-linked animation lag to feel
   sluggish. Switched to lerp-based damping (0.1 — snappy, directly responsive to wheel input)
   and tightened the carousel's scrub coupling (0.8 → 0.25) so horizontal movement tracks
   scroll much more directly.
8. **Hero rebuilt for guaranteed first-viewport fit.** The previous version's portrait size
   and type scale could exceed a normal desktop viewport's height, pushing CTAs (and
   potentially the greeting) below the fold. Rewrote the layout with a disciplined vertical
   budget — smaller portrait cap (`max-h-[50vh]`), tighter type scale, tighter gaps — so the
   complete composition (nav → "Hey, there" → portrait → "I AM SANSKAR"/"PRODUCT THINKER" →
   CTAs) fits in one viewport on typical desktop sizes. Also gave "Hey, there" an explicit
   `z-30` and first-in-DOM placement so it cannot end up visually behind the portrait, and
   switched the section from a fixed height to `min-height` so short viewports scroll
   gracefully instead of ever clipping content.
9. **Navbar labels/order corrected** to Home / Works / About / Experience, matching the spec
   exactly (previously included a "Skills" link and a different order).
10. **Experience rows redesigned** to match the requested "01 → org → Impact → 40% increase,
    25+ colleges" format: each row now has an index number, and hovering reveals a dedicated
    "Impact" block with large highlighted metrics before the detail bullets, on top of the
    existing hover-dims-siblings and animated top-rule behavior from the previous pass.

## V4 changelog (this pass — verified with real screenshots)

I got a working headless browser in this environment for the first time this round, so
everything below is verified visually, not just by code review.

1. **Found and fixed the actual hero bug.** The portrait was rendering at roughly 20% of
   viewport width instead of the reference's ~50%+. Root cause: `HeroPortrait.tsx` had a
   leftover hardcoded `max-w-[420px]` that silently overrode every sizing change made in the
   parent component, and the parent grid's own column definition had a separate 600px cap on
   top of that. Removed both. Then iterated against real screenshots at 1512×950 to land on a
   much larger, properly-dominant portrait with "Hey, there" tightly coupled right above it
   and "I AM SANSKAR" starting almost immediately where the portrait ends.
2. **New photo swapped in** — verified via alpha-channel inspection that it's a genuine
   transparent cutout, not a white background.
3. **Found and fixed a real scrolling bug via testing, not just review**: with the project
   detail page (or lightbox) open, mouse-wheel scrolling did nothing. Root cause: Lenis
   intercepts wheel events globally and, even when told to `.stop()`, still calls
   `preventDefault()` on them by design (confirmed by reading Lenis' own source) — so with the
   background page scroll-locked, wheel input over the modal went nowhere. Fixed properly using
   Lenis' `data-lenis-prevent` attribute on the modal's scroll container, which makes Lenis
   skip its handler entirely for that subtree and lets the browser's native scroll take over.
   Verified via direct wheel-event simulation that `scrollTop` now moves correctly.
4. **Verified end-to-end, with screenshots**: clicking "View Case Study" → shared-layout
   transition into the detail page → scrolling through Problem/MVP/Metrics/Screens → the real
   screenshot gallery renders → "Full Case Study (PDF)" links resolve as real
   `application/pdf` responses (checked via curl, not assumed). All confirmed working.
5. **Trade-off, stated plainly**: at 1512×950 the complete hero (nav → CTAs) fits in one
   viewport with no scroll. At a shorter common laptop height (1440×800, i.e. a 900px display
   minus browser chrome), the CTA row sits just below the fold. I chose to prioritize matching
   the reference's portrait scale — which was the explicit, repeated complaint — over strict
   one-viewport-fit at every possible height. Nothing clips (the section uses `min-height`, not
   a fixed height), so on shorter screens it's a small scroll, never a cut-off.

## V5 changelog (hero-only precision pass)

Scope of this pass was deliberately narrow: **only** `Hero.tsx` and `HeroPortrait.tsx` changed.
Nothing else in the site was touched.

You supplied a reference mockup with your own name/photo already composited in, and asked for
the composition reproduced as closely as technically possible. I measured it directly —
overlaid a percentage grid on the 1370×1148 reference image to get precise coordinates for
every element — then rebuilt the desktop hero from a CSS-grid layout to absolute positioning
using those measured percentages:

- **"Hey, there" is one continuous line** (not stacked above the portrait), split left/right
  with the portrait positioned in the gap between the words, sitting *in front of* the
  greeting text (z-10 vs the portrait's z-20) so the hair naturally overlaps the letterforms,
  matching the reference.
- **Portrait scaled way up and shifted right of true center** (left: 33%, width: 45%), spanning
  nearly the full hero height, top-aligned just below the navbar.
- **Availability badge and supporting copy** repositioned to the ~40-43% vertical band, aligned
  with the portrait's shoulder height rather than the hero's vertical center.
- **"I AM SANSKAR" / "PRODUCT THINKER"** rebuilt at reference-matched scale (`12.5vh` /
  `6.8vh`) and position, bottom-left and bottom-right.
- Caught and fixed a real bug along the way: the portrait's edge-feathering overlay originally
  spanned its full height, which bled into the "there" text since the box is much wider than
  the actual head at that height. Fixed by limiting the feathering to the lower/shoulder band
  only — the head area doesn't need it, since that part of the source photo is already
  genuinely transparent.
- Verified against the reference at its exact 1370×1148 dimensions, then stress-tested at
  1512×950 and 1440×800 (shorter common laptop height) to confirm the percentage/vh-based
  approach holds up across aspect ratios — confirmed clean at all three, plus mobile and the
  Experience section confirmed unaffected.
- Animation timing tightened to ~1.05s total entrance (was ~1.5s), within the requested
  800–1200ms range.

One intentional deviation from the reference: the reference mockup shows no CTA buttons in the
hero at all. The "View My Work / Contact Me / View Resume" buttons were kept (small, tucked at
the very bottom) since removing them would drop real navigation the rest of the brief has
consistently required — but sizing them small was a judgment call to stay as close to the
reference's proportions as possible while keeping that functionality.

## V6 changelog (correction + quality pass)

1. **Real bug found and fixed: "Hey, there" spread apart on wide monitors.** The
   previous positioning used width-percentages for left/right placement but
   viewport-height units for font size — on a common 1920×1080 desktop (never
   tested in the prior pass), the gap between the words grew in absolute pixels
   while the text stayed the same size, breaking the "one phrase" reading you'd
   flagged. Fixed by capping the composition in a `max-w-[1600px]` centered
   container, so the gap-to-text ratio stays constant regardless of screen width,
   then tightened the base positions further. Verified at 1920×1080 and the
   reference's own 1370×1148 — both now read as one integrated phrase.
2. **Hero photo replaced with the real high-resolution source** (2412×2608,
   confirmed genuine alpha transparency) — a ~25× pixel-count upgrade from the
   480×519 file used previously. Saved at full resolution, high-quality WEBP, no
   downscaling, no filters beyond the existing soft drop-shadow. No code changes
   needed — same config path as before.
3. **WhatsApp project screenshot quality — investigated honestly, improved what's
   real.** The source PRD embeds these UI screenshots natively at only
   ~520×630px (verified directly via `pdfimages -list`) — that is a hard
   resolution ceiling from the uploaded material, not a bug I introduced.
   Re-cropped with looser bounds to keep a few more native pixels, re-encoded
   near-lossless (was quality 88, now 97) so compression stops compounding the
   limit, and rebalanced "Behind the Build" so the large/prominent tile
   positions favor the YouTube deck's much higher-resolution slides
   (2000×1125 native) while the WhatsApp crops render at a size closer to
   their native resolution instead of being stretched. If a higher-resolution
   version of the WhatsApp screenshots becomes available, drop them in at the
   same paths in `public/projects/whatsapp/` and nothing else changes.
4. **Verified, not just reasoned about**: checked a full-page screenshot for
   console errors (none) and horizontal overflow (none); investigated what
   looked like a large empty gap above the Experience and About headings —
   traced it precisely via `getBoundingClientRect()` and confirmed it was a
   misreading of screenshot-chunk boundaries, not a real gap (section-to-section
   spacing measured at 0px, exactly as designed). Spot-checked both case-study
   PDFs still resolve as real `application/pdf` responses.

## Structure

```
src/
  data/
    siteConfig.ts        single source of truth for all content + links
    types.ts               shared TypeScript types
  hooks/
    useLenis.ts             smooth scroll wired to GSAP ScrollTrigger (lerp: 0.1)
    useReducedMotion.ts     prefers-reduced-motion + touch-device detection
    useCountUp.ts           animate-once counter for the impact stats
    useImageFallback.ts     primary/fallback <img> loading (hero + contact photo)
  components/
    Navbar, Hero, HeroPortrait, ThinkingColumns, ImpactStats,
    ProjectCarousel, ProjectCard, ProjectVisual, ProjectDetail,
    ExperienceSection, AboutSection, SkillGrid, TechnicalEdge,
    Achievements, Gallery, Lightbox, Contact, Footer,
    CustomCursor, MagneticButton, PillButton, RevealText, Loader
public/
  images/profile-sanskar.webp             the real hero/contact portrait
  projects/whatsapp/*.webp                 6 real screens from the PRD
  projects/youtube/*.webp (+ *-thumb.webp) 10 real slides from the deck
  case-studies/*.pdf                       your real uploaded PDFs
```

## Centralized config

Every piece of content — including which real screenshots appear where — lives in
**`src/data/siteConfig.ts`**. To swap or add a screenshot: drop the file in
`public/projects/<project>/`, then reference it in that project's `screens.layers` (the 2–3
used in the layered card/hero) or `screens.gallery` (the full set, used in the detail page and
lightbox). Nothing is hardcoded in JSX.

## What's implemented, section by section

- **Hero** — see "Hero rebuilt" above. Load sequence (background → nav → greeting → portrait →
  headline → CTAs) in ~900ms, mouse parallax (portrait 6–10px, glow 10–20px), scroll-linked
  fade + 1–3% scale-down, soft bottom-fade mask + independent edge feathering.
- **Custom cursor** — dot that expands (200ms) into a labelled circle (`VIEW` / `OPEN` /
  `CASE STUDY` / `EXPLORE`) over interactive targets. Disabled on touch and reduced-motion.
- **Navbar** — floating, blurs + shrinks after 40px of scroll, active-section indicator,
  animated mobile menu.
- **How I Think** — four columns, hover-expand on desktop, horizontal snap carousel on mobile.
- **Impact stats** — count up once, with a 0.96→1 scale-in on reveal.
- **Recent Product Work** — GSAP ScrollTrigger pins on desktop (`≥1024px`), tight scrub
  coupling, real layered screenshots with hover tilt + scroll parallax, `01 / 02` progress
  indicator. Native swipeable row on mobile and reduced-motion (no pin either way).
- **Project detail** — shared-layout transition from a real screenshot, every field from the
  source PRD/deck (including the diagnostic-thinking block for YouTube), a real screens
  gallery + lightbox, and a working PDF link to the actual uploaded document.
- **Experience** — index-numbered rows, hover reveals an "Impact" metrics block + dims sibling
  rows, animated top rule, accordion on mobile. Date pills stay hidden until real dates are
  added (still unverified — see `siteConfig.ts`).
- **About** — word-by-word scroll reveal, animated underline on the core statement.
- **Toolkit** — text tiles, no percentage bars, index number + shift-in on hover.
- **Technical Edge** — deliberately small, doesn't compete with the product projects.
- **Achievements** — rows reveal on scroll, number/divider emphasis on hover.
- **Behind the Build** — real asymmetric masonry from both projects' actual screens.
- **Contact / Footer** — mailto/tel/LinkedIn/GitHub/resume all real, open correctly, no `#`.

## Accessibility & performance

- `prefers-reduced-motion` disables Lenis, the GSAP pin/horizontal scroll, parallax
  (hero + project layers), magnetic buttons, cursor, and tilt — leaving simple fades.
- Cursor and magnetic buttons also gated off on touch devices.
- Visible `:focus-visible` outlines everywhere; every `section` has `scroll-margin-top` so
  anchor/keyboard navigation clears the fixed navbar.
- All animation is transform/opacity based. Real screenshots are lazy-loaded except the hero
  portrait and each card's front layer.
- `--color-taupe` (#6F6659) on `--color-cream` (#F3EEE2) is ~4.9:1 contrast — passes WCAG AA
  for body text.

## Deploying

`npm run build` outputs a static `dist/` folder — deploy it to Vercel, Netlify, GitHub Pages,
or any static host. No server/runtime dependency.
