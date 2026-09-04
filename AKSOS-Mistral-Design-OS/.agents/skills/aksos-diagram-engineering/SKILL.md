---
name: aksos-diagram-engineering
description: Use when creating, refactoring, positioning, animating, or debugging AKSOS SVG diagrams, networks, relationship graphs, flows, or system architectures.
---

# AKSOS Diagram Engineering
Diagrams are information architecture.

## Before coding
State what question the diagram answers.

## Geometry
Define viewBox, coordinate system, semantic regions, node coordinates, label zones, and connection paths. Use deterministic coordinates.

Never use random placement, force-directed layouts, physics simulation, or arbitrary pixel nudges as the core layout system.

## Node taxonomy
Define primary, secondary, tertiary, and metadata roles before implementation.

## Connections
solid = direct relationship
lighter/dashed = contextual relationship
active = relevant relationship
animated = signal/state transition

Every line must mean something.

## Labels
Reserve space. Prevent collisions, clipping, path ambiguity, and unreadable scaling.

## Responsive
Mobile may remove secondary nodes, collapse relationships, change horizontal flow to vertical, and reposition labels. Preserve meaning, not geometry.

## Accessibility
Interactive nodes need keyboard access and visible focus. Provide meaningful accessible descriptions.

## Debugging
Check viewBox → container ratio → node geometry → label zones → endpoints → responsive transforms → animation transforms.

Never repair a structural problem with dozens of offsets.
