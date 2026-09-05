# Truffle Cakes Website Build Prompt

You are working inside an existing Next.js website project for a premium cake and bakery brand, referred to in this brief as **Truffle Cakes / Truffling Cake Shop**. The goal is not to make a generic bakery website. The goal is to create a **cinematic, editorial, highly memorable landing page** that can impress the client during a freelance presentation.

## 1. FIRST: AUDIT THE EXISTING PROJECT

Before changing anything:

1. Inspect the existing repository structure.
2. Read `package.json`, `next.config.*`, `tsconfig.json`, global CSS, existing components, app routes, `components.json`, and any README/agent instructions.
3. Identify which libraries are already installed.
4. Reuse existing components and utilities wherever sensible.
5. Do NOT blindly reinstall packages.
6. If a required package is missing, install only what is genuinely needed.
7. Keep the implementation compatible with the project's current Next.js version.
8. Do not replace the project architecture just to introduce a new pattern.
9. Preserve working functionality unless it directly conflicts with the new homepage architecture.
10. Before finishing, run the available lint/type/build checks and fix errors.

The project should remain easy for another developer to understand.

---

# 2. CREATIVE DIRECTION

Use the uploaded reference images as the visual direction.

The first two reference images establish the primary visual language:

- pastel powder blue
- soft blush pink
- warm ivory / cream
- restrained champagne/gold accents
- dark navy typography for contrast
- delicate hand-drawn / paper-art feeling
- boutique European patisserie mood
- romantic but modern
- premium without looking overly luxurious or corporate

The real shop photographs establish authenticity and should influence the later sections. They show:

- pastel architectural interiors
- arched display niches
- illuminated product shelving
- glass cake display counters
- cakes, pastries and confectionery
- clean white/pastel surroundings
- real physical retail experience

Do NOT copy the reference artwork literally. Extract its design language and translate it into a modern web experience.

The final page should feel like:

**paper-crafted patisserie + modern editorial website + cinematic product storytelling**

Avoid:

- generic Bootstrap-style layouts
- excessive gradients
- random glassmorphism
- excessive rounded cards
- loud animations everywhere
- dark luxury styling
- neon colors
- template-looking bakery sections
- unnecessary 3D objects
- excessive text
- stock-photo-heavy design

---

# 3. DESIGN SYSTEM

Create a centralized design system using CSS variables/tokens.

Suggested palette:

- Powder Blue: `#DCECEF`
- Soft Blush: `#F6DDE7`
- Warm Cream: `#FFF9F1`
- Soft White: `#FFFEFC`
- Champagne Gold: `#C5A15A`
- Deep Navy: `#1F315D`
- Cocoa: `#4A3835`
- Muted Rose: `#C98FA5`

These are starting points, not hardcoded rules. Adjust after visually comparing the implementation with the references.

Typography:

- elegant editorial serif for major headings
- clean readable sans-serif for UI/body
- optional restrained handwritten/script treatment for tiny decorative moments only

Do not use a script font for large blocks of body text.

Use generous whitespace, refined typography and strong visual hierarchy.

---

# 4. ROUTE ARCHITECTURE

Use a professional Next.js App Router structure.

The homepage should live at:

`/`

Prepare the architecture for future routes such as:

`/cakes`
`/menu`
`/about`
`/stores`
`/contact`

Do not create unnecessary pages yet unless the project already contains them.

Create reusable components rather than placing the entire homepage inside one massive component.

Suggested conceptual structure:

```text
app/
  page.tsx
  layout.tsx
  globals.css

components/
  navigation/
  landing/
  sections/
  ui/

lib/
  constants/
  utils/

public/
  images/
  videos/
  textures/
```

Adapt this structure to the existing project instead of forcing it if the repository already has a good organization.

---

# 5. NAVBAR

Create a premium, minimal navigation.

Desktop:

- brand/logo at left
- navigation links centered or balanced
- primary action at right, such as "Order a Cake" / "Explore Menu"
- subtle menu behavior
- transparent or softly tinted initial state
- transform into a compact floating/sticky navbar after scrolling

Mobile:

- compact logo
- menu trigger
- accessible mobile navigation
- smooth open/close animation

The navbar should feel like part of the artwork, not a generic SaaS header.

Use Motion/GSAP where appropriate, but keep the interaction subtle.

---

# 6. CINEMATIC PRELOADER

Treat the preloader as a planned premium feature.

Concept:

A small paper-art bakery/cake delivery scene travels from left to right along a delicate illustrated pathway.

Visual feeling:

- handmade paper cutout
- soft pastel layers
- bakery storefront
- tiny cake/bakery vehicle
- subtle shadows
- paper texture
- gentle parallax
- refined motion

The preloader should eventually transition naturally into the hero.

IMPORTANT DEVELOPMENT RULE:

Make the preloader easy to disable during development.

Use a feature flag/configuration such as:

`ENABLE_PRELOADER = false`

for normal development/testing initially.

When enabled, it should:

1. cover the viewport
2. prevent interaction while loading
3. play the animation once
4. respect reduced-motion preferences
5. never become an infinite loading screen
6. transition cleanly into the homepage

Do not spend the majority of the current implementation effort generating a complicated preloader video. Build the architecture and a lightweight placeholder/animation system that can later accept the final paper-art video asset.

---

# 7. HERO / LANDING SECTION

This is the most important section.

The hero must immediately communicate:

**This is a premium creative bakery brand.**

Do not make it a conventional centered heading + button + image layout.

Create a cinematic composition.

Recommended direction:

- full viewport or near-full viewport
- large editorial headline
- layered bakery visual
- pastel paper/photographic composition
- subtle floating decorative elements
- strong negative space
- small supporting copy
- clear CTA
- scroll indicator

Possible messaging direction:

"Made to be remembered."

or

"Little pieces of sweetness, made beautifully."

Keep the final copy concise and brand-appropriate.

The visual should feel like a physical magazine cover becoming interactive.

Use layered depth:

- background pastel field
- subtle paper texture
- large cake/bakery visual
- decorative botanical or confectionery elements
- typography layer
- small labels / editorial annotations

Use animation to reveal these layers sequentially.

---

# 8. SECTION 2: SIGNATURE CAKES / PRODUCT STORY

Immediately after the hero, introduce the actual product.

Do not use a standard 3-column card grid.

Instead, create a large editorial product showcase.

Concept:

One signature cake/product occupies the visual focus.

As the user scrolls:

- product slowly reveals
- typography shifts
- ingredients/details appear
- decorative elements move slightly
- image/cake has controlled parallax
- CTA remains simple

Use a composition that feels closer to an editorial campaign than an ecommerce grid.

Possible content:

"Signature creations"
"Handcrafted for the moments worth celebrating."

Keep it visually dominant.

---

# 9. SECTION 3: HORIZONTAL STORYTELLING

Create a horizontal scrolling section controlled by vertical scroll.

This is one of the main "wow" moments.

The section should contain 3 to 5 visual chapters, for example:

1. Crafted
2. Layered
3. Decorated
4. Delivered
5. Celebrated

As the user scrolls vertically, the content moves horizontally.

Use GSAP ScrollTrigger for this interaction.

Important:

- pin only when necessary
- calculate dimensions dynamically
- support mobile with a sensible fallback
- do not break normal page scrolling
- use transform-based animation for performance
- clean up GSAP contexts on unmount
- avoid huge DOM trees

Each chapter can combine:

- product photography
- short editorial copy
- small ingredient/detail labels
- paper-style illustrations
- subtle motion

This section should demonstrate technical skill without becoming confusing.

---

# 10. SECTION 4: THE TRUFFLE CAKES EXPERIENCE / STORE

Use the real store photographs as the authenticity layer.

Create a cinematic store section that transitions from illustration-inspired visuals into real photography.

Possible structure:

- large store image
- secondary cropped image
- small location label
- short brand statement
- CTA: "Visit us"

Use overlapping image frames or an editorial collage instead of a simple gallery grid.

The real shop photographs should feel intentionally integrated into the visual system.

Do not heavily filter or distort them.

---

# 11. SECTION 5: OCCASION / DISCOVERY SECTION

Create one additional creative section that communicates what customers can buy for.

Possible categories:

- Birthday
- Anniversary
- Celebration
- Gifting
- Just Because

Do not use five identical cards.

Instead, create a playful interactive composition where the category names and visuals shift/reveal as the user interacts or scrolls.

This section should feel warm and emotionally driven.

---

# 12. FOOTER

Create a strong cinematic footer.

Include:

- logo/brand
- short brand statement
- navigation
- stores
- contact
- social links
- order CTA
- copyright

Visually:

- soft pastel background
- editorial typography
- subtle decorative paper-art element
- large closing statement

The footer should feel like the final frame of a film, not an ordinary website footer.

---

# 13. MOTION SYSTEM

Use motion intentionally.

Preferred tools:

- GSAP + ScrollTrigger for scroll choreography
- Motion for UI transitions and smaller interactions

Do not animate every element.

Animation principles:

- slow, elegant reveals
- staggered text entrance
- subtle image scale
- controlled parallax
- horizontal storytelling
- soft opacity/transform transitions
- no excessive bouncing
- no random floating animations

Create reusable animation utilities where possible.

Respect:

`prefers-reduced-motion`

Reduced-motion users should receive a clean static version of the experience.

---

# 14. COMPONENT STRATEGY

Use shared UI components whenever possible.

If shadcn/ui or another component system already exists, use its components instead of creating duplicate primitives.

Recommended reusable pieces:

- Button
- Container
- SectionHeading
- ImageFrame
- EditorialLabel
- Navigation
- MobileMenu
- Reveal
- ScrollIndicator
- ProductShowcase
- StoryPanel

Do not create a component for every tiny `<div>`.

Components should represent meaningful reusable UI.

---

# 15. IMAGE / VIDEO ARCHITECTURE

Do not hardcode remote image URLs throughout components.

Create a central content/config layer for media references.

Example concept:

```ts
export const media = {
  hero: "...",
  signatureCake: "...",
  storeFront: "...",
  storeInterior: "...",
}
```

Use Next.js image optimization where applicable.

Use `next/image` for static images.

Use video only where it creates genuine visual value.

The preloader video should be lazy/deferred when appropriate.

Do not allow large media assets to destroy Core Web Vitals.

---

# 16. RESPONSIVE DESIGN

Desktop creativity must not become a broken mobile design.

Build intentionally for:

- large desktop
- laptop
- tablet
- mobile

For mobile:

- simplify complex compositions
- disable or reduce expensive effects where needed
- convert horizontal storytelling into a vertical story if necessary
- preserve the visual identity
- maintain comfortable touch targets

Do not simply shrink the desktop layout.

---

# 17. ACCESSIBILITY

Implement:

- semantic HTML
- keyboard navigation
- visible focus states
- useful alt text
- accessible buttons
- accessible mobile navigation
- reduced-motion support
- sufficient text contrast
- no interaction that depends only on hover

The visual experience should remain usable without animation.

---

# 18. PERFORMANCE

This is a creative website, but it must still feel fast.

Rules:

- avoid unnecessary client components
- use server components by default
- isolate GSAP/client logic to the components that need it
- lazy-load non-critical media
- avoid loading large videos before they are needed
- avoid excessive blur filters
- avoid expensive continuously-running animations
- use transforms instead of layout-triggering animations
- optimize image sizes
- clean up event listeners and GSAP contexts

---

# 19. IMPLEMENTATION PHASES

Work in this order.

### Phase 1: Audit
Inspect the repository and dependencies.

### Phase 2: Foundation
Set up design tokens, typography, layout primitives and route structure.

### Phase 3: Navigation
Build responsive navbar and mobile menu.

### Phase 4: Hero
Build the main cinematic hero.

### Phase 5: Product Story
Build the signature cake section.

### Phase 6: Horizontal Story
Build the GSAP ScrollTrigger storytelling section.

### Phase 7: Store Experience
Integrate the real store photography.

### Phase 8: Occasion/Discovery
Build the emotional category section.

### Phase 9: Footer
Build the cinematic closing frame.

### Phase 10: Preloader Architecture
Add the disable-able paper-art preloader foundation.

### Phase 11: Polish
Typography, spacing, transitions, responsive behavior, accessibility and performance.

### Phase 12: Verification
Run lint, typecheck and build. Fix all errors.

---

# 20. IMPORTANT CREATIVE RULE

Do not make all sections look like the same card system.

The page should have a visual rhythm:

**Illustration → Product → Motion → Photography → Emotion → Closing Frame**

Each section should feel related through the same palette and typography, while having its own composition.

The result should look intentionally art-directed.

---

# 21. ACCEPTANCE CRITERIA

The homepage is successful only if:

- the first screen feels premium and memorable
- the pastel palette is consistent
- the hero looks custom-designed, not templated
- the real store photography is integrated naturally
- the horizontal section demonstrates advanced interaction design
- motion supports storytelling rather than distracting from it
- navigation feels polished
- mobile remains intentional
- accessibility is not ignored
- the preloader can be switched off during development
- the code is modular and understandable
- existing project conventions are respected
- the application builds successfully

Most importantly:

**Do not optimize for the number of effects. Optimize for the feeling the client gets in the first 10 seconds.**
