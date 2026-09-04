# AKSOS — PROJECT AGENT INSTRUCTIONS

## Mission
Build AKSOS as a premium editorial intelligence-infrastructure experience. The visitor/operator is the hero; AKSOS is the ally/infrastructure; ATIS, RITA and Batana move the operator from signal to understanding to action.

## Non-negotiable principles
1. Visitor = HERO.
2. AKSOS = ALLY / infrastructure.
3. ATIS = intelligence and perspective layer.
4. RITA = relationship/investigation layer.
5. Batana = human/action layer.
6. Core transformation: SIGNAL → RELATIONSHIP → CONTEXT → UNDERSTANDING → OPPORTUNITY → ACTION.
7. Diagrams are information architecture, not decoration.
8. Motion communicates information or state.
9. Essential content remains visible without JavaScript animation.
10. Responsive design means recomposition, not simply shrinking desktop.
11. Sophistication comes from hierarchy, composition, typography, relationships, and precision—not effects.
12. Never invent unsupported claims, metrics, customers, partnerships, testimonials, or capabilities.

## Protected infrastructure
Do not break without explicit justification and verification:
- `app/page.tsx`
- `app/batana/page.tsx`
- `components/BatanaNewSite.tsx`
- `app/api/batana-application/route.ts`
- existing public assets
- environment variables
- deployment configuration
- navigation anchors
- footer behavior
- Batana application flow

Preserve: `#top`, `#what-we-build`, `#atis`, `#rita`, `/batana`.

## Existing architecture
The homepage entry is `components/AksosNewSite.tsx`.
`components/diagrams/HeroNetwork.tsx` is existing mathematically positioned SVG infrastructure. Understand it before replacing it.
`app/globals.css` and `lib/tokens.ts` establish the warm-paper / ink / rust / green / serif / sans / mono language. Extend deliberately.

## Decision hierarchy
Prioritize:
1. Visitor comprehension
2. Narrative continuity
3. Visual hierarchy
4. Semantic meaning
5. Accessibility
6. Responsive integrity
7. Performance
8. Code simplicity

Do not over-engineer.

## Homepage narrative
SEE → CONNECT → UNDERSTAND → ACT → BUILD.
Move the visitor through fragmentation → relationships → context → intelligence → agency → participation.

## Section rule
Do not repeat `heading → paragraph → cards → CTA`. Sections are compositions. Vary statement-first, diagram-first, asymmetric editorial, full-width system scenes, centered systems, operator-centered compositions, and transitional moments.

## Diagram rules
Every diagram needs:
- explicit SVG `viewBox`
- deterministic coordinates
- semantic nodes/connections
- reserved label space
- responsive behavior
- accessible equivalents

Never use random coordinates, force-directed layouts, decorative connections, meaningless nodes, clipped labels, or ambiguous line endings.

## Motion rules
Prefer signal entry, path activation, node emphasis, relationship reveal, context accumulation, investigation progression, state transitions, and network growth. Avoid universal fade-up animation. Honor `prefers-reduced-motion`.

## Responsive rules
Desktop, tablet and mobile are intentional compositions. Do not simply scale complex desktop SVGs down. On mobile simplify secondary nodes, reflow processes, enlarge important labels, and remove nonessential decoration. No horizontal overflow.

## Coding rules
Prefer focused components, semantic names, deterministic SVG, shared primitives, tokens, minimal state, progressive enhancement, accessibility.
Avoid giant page components, boolean-prop-heavy APIs, duplicated geometry, unnecessary client components, unnecessary visualization libraries, global CSS hacks, and magic-number repairs.

## Baseline rendering
Never make essential content invisible with opacity/hidden animation initial states. Baseline content must render; animation is enhancement.

## Production safety
Before completion:
- production build
- TypeScript/import checks
- hydration/runtime checks
- anchors/navigation
- `/batana`
- form path
- footer
- mobile menu
- desktop/tablet/mobile
- reduced motion
- no horizontal overflow

Never declare completion solely because compilation succeeds.

## Skills
Use the specialized skills when relevant:
- `aksos-design-system`
- `aksos-ux-architecture`
- `aksos-section-design`
- `aksos-diagram-engineering`
- `aksos-motion-design`
- `aksos-responsive-design`
- `aksos-visual-qa`
- `aksos-frontend-architecture`

Conflict priority: UX intent → design system → section composition → diagram/motion → responsive adaptation → frontend implementation → QA.

Source of truth: `docs/AKSOS-DESIGN-DOCTRINE.md`.
