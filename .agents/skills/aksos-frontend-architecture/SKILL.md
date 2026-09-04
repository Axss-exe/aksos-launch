---
name: aksos-frontend-architecture
description: Use when translating AKSOS UX/UI designs into React, Next.js, SVG, CSS, and Framer Motion architecture.
---

# AKSOS Frontend Architecture
Translate design intent into maintainable code.

DESIGN INTENT → INTERACTION MODEL → STATE MODEL → COMPONENT → SVG/CSS → RESPONSIVE → QA

## Components
Prefer focused primitives such as DiagramContainer, NetworkNode, ConnectionLine, Signal, SystemLabel, FlowStep, AnimatedWord, and SectionLabel.

## Avoid
Giant homepage components, dozens of boolean props, duplicated geometry, duplicated animation variants, global CSS hacks, unnecessary abstractions, and unnecessary client components.

## SVG
Use explicit viewBox, deterministic coordinates, semantic groups, and reusable primitives. Keep geometry separate from page layout.

## State
Represent meaningful state such as active hero word, selected system, investigation stage, and highlighted relationship. Do not create state merely to trigger decoration.

## Framer Motion
Use for meaningful transitions. Baseline content remains visible.

## CSS
Extend existing tokens and semantic utilities. Do not rewrite the global design system without reason.

## Next.js
Preserve existing routes and server/client boundaries.

## Accessibility
Interactive visual nodes require semantic controls where appropriate, keyboard support, focus-visible styling, and accessible names.

## Integration
Before changing shared infrastructure, identify consumers and protected behavior.

## Completion
The implementation should make the design easier to evolve, not harder.
