# PRD: Truffle Cakes Cinematic Homepage

## Product

A premium, creative website experience for a cake and bakery brand, Truffle Cakes / Truffling Cake Shop.

## Primary Goal

Create a homepage that immediately impresses a prospective freelance client by demonstrating strong visual design, art direction, interaction design and professional Next.js engineering.

This is a presentation-first landing page, not a full ecommerce build.

## Target Audience

- Existing bakery customers
- New customers discovering the brand
- People looking for celebration cakes and gifts
- The bakery client evaluating the quality of the freelance developer/designer

## Core User Journey

1. User enters homepage.
2. A lightweight cinematic introduction establishes the brand.
3. Hero communicates the brand proposition immediately.
4. User scrolls into a signature product story.
5. User encounters the horizontal storytelling interaction.
6. Real store photography establishes trust and authenticity.
7. Occasion section helps the user imagine a purchase.
8. User reaches a visually memorable footer with clear conversion actions.

## Key Experience Principles

### 1. Emotional first impression
The site should feel like entering a boutique patisserie, not opening an ecommerce catalog.

### 2. Product remains the hero
Creative interactions must never hide the cakes or bakery experience.

### 3. Authenticity
Real store photographs should be used to prove that the brand exists as a physical retail experience.

### 4. Visual consistency
The pastel blue, blush, cream, gold and navy language should remain consistent throughout.

### 5. Controlled creativity
Every animation must have a storytelling purpose.

## Homepage Sections

### A. Navigation
Purpose: orient the user and provide conversion actions.

Requirements:
- desktop navigation
- mobile navigation
- sticky/floating behavior
- primary order/menu CTA

### B. Preloader
Purpose: create a memorable opening moment.

Concept:
Paper-art bakery/cake vehicle travels across a handcrafted scene.

Initial development:
- feature disabled
- lightweight architecture
- final video can be added later

### C. Hero
Purpose: communicate brand and establish visual identity.

Requirements:
- editorial headline
- supporting copy
- CTA
- layered visual composition
- subtle entrance choreography
- scroll cue

### D. Signature Product
Purpose: showcase craftsmanship.

Requirements:
- large product visual
- editorial copy
- subtle parallax
- product details
- CTA

### E. Horizontal Story
Purpose: demonstrate advanced interaction design.

Requirements:
- 3 to 5 chapters
- vertical scroll controls horizontal movement
- GSAP ScrollTrigger
- mobile fallback
- smooth transitions

### F. Store Experience
Purpose: establish physical-world authenticity.

Requirements:
- real shop photography
- editorial collage
- store/location CTA

### G. Occasions
Purpose: connect products with emotional moments.

Suggested categories:
- Birthday
- Anniversary
- Celebration
- Gifting
- Just Because

Requirements:
- interactive or scroll-based visual discovery
- avoid repetitive card grid

### H. Footer
Purpose: close the narrative and provide navigation/conversion.

Requirements:
- navigation
- contact
- store information
- social
- order CTA
- brand statement

## Functional Requirements

- Next.js App Router
- reusable React components
- responsive layout
- accessible navigation
- optimized media
- route-ready architecture
- GSAP ScrollTrigger for horizontal storytelling
- Motion for UI transitions where useful
- existing shared UI/component system should be reused

## Non-Functional Requirements

### Performance
- optimize images
- lazy-load non-critical assets
- avoid unnecessary client rendering
- isolate animation logic
- prevent layout shifts where practical

### Accessibility
- semantic HTML
- keyboard support
- focus states
- reduced-motion support
- accessible navigation
- meaningful image alt text

### Maintainability
- clear component boundaries
- centralized media/content references
- no duplicated UI primitives
- comments only where implementation is non-obvious

## Out of Scope for Initial Homepage

- full checkout
- payment integration
- CMS
- authentication
- customer accounts
- complete ecommerce catalog
- complex backend ordering system

These can be added later.

## Success Criteria

The homepage should:

1. Look custom rather than templated.
2. Feel premium within the first few seconds.
3. Showcase cakes and the physical store clearly.
4. Demonstrate sophisticated but controlled animation.
5. Work well on mobile.
6. Build successfully with no lint/type/build errors.
7. Be understandable to another developer taking over the project.
