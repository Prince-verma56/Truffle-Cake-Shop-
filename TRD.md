# TRD: Truffle Cakes Website Technical Design

## 1. Architecture

Use the existing Next.js application as the source of truth.

Preferred architecture:

- Next.js App Router
- React + TypeScript
- Server Components by default
- Client Components only for interactive/animated UI
- centralized CSS variables/design tokens
- reusable component layer
- route-ready structure

Do not migrate frameworks or replace the existing architecture unnecessarily.

## 2. Suggested Project Structure

Adapt to the existing repository:

```text
app/
  layout.tsx
  page.tsx
  globals.css

components/
  navigation/
    Navbar.tsx
    MobileMenu.tsx

  landing/
    Hero.tsx
    Preloader.tsx
    SignatureProduct.tsx
    HorizontalStory.tsx
    StoreExperience.tsx
    Occasions.tsx
    CinematicFooter.tsx

  ui/
    Button.tsx
    SectionHeading.tsx
    EditorialLabel.tsx
    ImageFrame.tsx

lib/
  content/
    homepage.ts
  utils/
    animations.ts
    cn.ts

public/
  images/
  videos/
  textures/
```

Only create files that are actually needed.

## 3. Dependency Strategy

First inspect `package.json`.

Reuse installed dependencies.

Preferred animation stack:

- GSAP
- GSAP ScrollTrigger
- Motion

If one of these is absent, determine whether it is necessary before installing.

If shadcn/ui exists, reuse it.

Do not install multiple libraries that solve the same UI problem.

## 4. Client/Server Boundary

Keep:

- layout
- static content
- headings
- image rendering
- metadata

as Server Components where possible.

Use `"use client"` only for:

- GSAP animation components
- interactive navbar state
- mobile menu
- motion-heavy sections
- preloader

Do not mark the entire homepage as a client component simply because one section uses GSAP.

## 5. GSAP Implementation

The horizontal storytelling section should:

1. use a client component
2. register ScrollTrigger once in the appropriate module/component context
3. use `gsap.context()` or an equivalent cleanup strategy
4. calculate horizontal travel based on content width
5. use `x`/transform animation
6. use a pinned ScrollTrigger
7. clean up on unmount
8. account for resize changes
9. avoid hardcoded viewport widths where possible

Pseudo architecture:

```ts
const ctx = gsap.context(() => {
  const distance = track.scrollWidth - window.innerWidth;

  gsap.to(track, {
    x: -distance,
    ease: "none",
    scrollTrigger: {
      trigger: section,
      pin: true,
      scrub: 1,
      end: () => `+=${distance}`,
    },
  });
});

return () => ctx.revert();
```

The exact implementation should be adapted to the actual DOM.

## 6. Motion Implementation

Use Motion for:

- menu transitions
- button interactions
- small reveal transitions
- presence/exit states

Avoid duplicating GSAP and Motion on the exact same animation unless there is a clear reason.

## 7. Preloader

Implement as a separate component.

Configuration example:

```ts
export const siteConfig = {
  enablePreloader: false,
};
```

Requirements:

- one-time playback
- no infinite loader
- reduced-motion fallback
- body scroll lock only while active
- clean exit
- easy future video integration

When disabled, it should add essentially no runtime overhead.

## 8. Content Architecture

Keep content separate from layout.

Example:

```ts
export const homepageContent = {
  hero: {
    eyebrow: "...",
    title: "...",
    description: "...",
    cta: "...",
  },
  signature: {
    title: "...",
    description: "...",
  },
};
```

This allows copy changes without rewriting components.

## 9. Media Architecture

Do not scatter image paths across JSX.

Centralize them in content/config.

Prefer local optimized assets.

Use:

- `next/image` for images
- responsive `sizes`
- appropriate loading priority for the hero
- lazy loading for below-the-fold images

For video:

- do not autoplay large videos unless necessary
- provide poster imagery
- consider reduced-motion behavior
- defer non-critical media

## 10. Design Tokens

Use CSS custom properties.

Example:

```css
:root {
  --color-powder-blue: #dcecef;
  --color-blush: #f6dde7;
  --color-cream: #fff9f1;
  --color-gold: #c5a15a;
  --color-navy: #1f315d;
  --color-cocoa: #4a3835;
}
```

Typography and spacing should also have a consistent token strategy.

## 11. Responsive Behavior

Desktop:
- full editorial compositions
- horizontal storytelling
- layered visuals

Tablet:
- reduce decorative density
- maintain major compositions

Mobile:
- stack layouts
- simplify horizontal storytelling
- reduce parallax
- maintain visual hierarchy
- maintain CTA visibility

Do not force desktop GSAP interactions onto small screens if they hurt usability.

## 12. Accessibility

Required:

- semantic landmarks
- `nav`, `main`, `section`, `footer`
- accessible menu button
- `aria-expanded` where relevant
- keyboard support
- focus-visible styling
- alt text
- reduced-motion media query
- no essential information conveyed only by animation

## 13. Performance Budget Mindset

Avoid:

- huge unoptimized images
- multiple simultaneous high-frequency animations
- unnecessary scroll listeners
- continuous animation loops
- excessive backdrop filters
- giant client component boundaries

Prefer:

- CSS transforms
- compositor-friendly properties
- lazy media
- isolated animation components
- server rendering for static content

## 14. SEO / Metadata

Set appropriate:

- title
- description
- Open Graph metadata when assets are available
- favicon/site icon if present

Keep the brand naming consistent.

Do not invent business claims, awards, certifications or locations that are not provided by the client.

## 15. Testing Checklist

Before completion:

- `npm run lint` if available
- `npm run typecheck` if available
- `npm run build`
- inspect console for runtime errors
- test desktop
- test mobile
- test reduced motion
- test keyboard navigation
- test navbar
- test horizontal scroll
- test page refresh
- verify routes
- verify missing images do not break layout

## 16. Engineering Guardrails

Do not:

- rewrite working dependencies without reason
- create duplicate components
- use fake APIs
- invent client data
- hardcode store information that has not been supplied
- overuse animations
- make the entire application client-side
- create an inaccessible custom cursor as a required interaction
- sacrifice mobile usability for desktop visuals

## 17. Definition of Done

The implementation is complete when:

- architecture is modular
- design system is consistent
- homepage has all agreed sections
- animations are smooth
- horizontal storytelling works
- preloader is disable-able
- responsive behavior works
- accessibility basics pass
- performance is reasonable
- lint/type/build checks pass
