// AKSOS Motion Presets - Doctrine-compliant animation patterns
// SIGNAL ENTERS → CONNECTION ACTIVATES → CONTEXT ACCUMULATES → INTERPRETATION EMERGES → ACTION PATH APPEARS

import { Variants, Transition } from 'framer-motion';

// =============================================================================
// CORE MOTION GRAMMAR
// =============================================================================

export const motionPresets = {
  // SIGNAL ENTERS - Initial signal appearance
  signalEnter: {
    initial: { opacity: 1, y: -20, scale: 0.8 },
    animate: { y: 0, scale: 1 },
    transition: { duration: 0.5, ease: 'easeOut' } as Transition,
  } as const,

  // CONNECTION ACTIVATES - Relationship lines draw
  connectionActivate: {
    initial: { pathLength: 0, opacity: 1 },
    animate: { pathLength: 1 },
    transition: { duration: 0.6, ease: 'easeInOut' } as Transition,
  } as const,

  // CONTEXT ACCUMULATES - Supporting information appears
  contextAccumulate: {
    initial: { opacity: 1, scale: 0.95 },
    animate: { scale: 1 },
    transition: { duration: 0.3, ease: 'easeOut' } as Transition,
  } as const,

  // INTERPRETATION EMERGES - Insight reveals
  interpretationEmerge: {
    initial: { opacity: 1, y: 10 },
    animate: { y: 0 },
    transition: { duration: 0.5, delay: 0.2, ease: 'easeOut' } as Transition,
  } as const,

  // ACTION PATH APPEARS - CTA/next step reveals
  actionPathAppear: {
    initial: { opacity: 1, y: 20 },
    animate: { y: 0 },
    transition: { duration: 0.4, delay: 0.4, ease: 'easeOut' } as Transition,
  } as const,

  // =============================================================================
  // SCROLL-BASED ANIMATIONS
  // =============================================================================

  // For sections - always visible baseline, animate on scroll-in
  sectionBase: {
    initial: { opacity: 1 },
    whileInView: { opacity: 1 },
    viewport: { once: true, margin: '-100px' } as const,
    transition: { duration: 0.6 } as Transition,
  } as const,

  // For diagram containers
  diagramContainer: {
    initial: { opacity: 1 },
    whileInView: { opacity: 1 },
    viewport: { once: true, margin: '-50px' } as const,
    transition: { duration: 0.4 } as Transition,
  } as const,

  // =============================================================================
  // HOVER/FOCUS STATES
  // =============================================================================

  hoverEmphasis: {
    whileHover: { scale: 1.05 } as const,
    transition: { duration: 0.2 } as Transition,
  } as const,

  hoverNode: {
    whileHover: { scale: 1.15, cursor: 'pointer' } as const,
    whileTap: { scale: 0.95 } as const,
    transition: { duration: 0.2 } as Transition,
  } as const,

  focusVisible: {
    whileFocus: { 
      outline: '2px solid var(--color-signal)',
      outlineOffset: '2px',
    } as const,
  } as const,

  // =============================================================================
  // NODE-SPECIFIC ANIMATIONS
  // =============================================================================

  nodePrimary: {
    initial: { opacity: 1, scale: 0 },
    animate: { scale: 1 },
    transition: { duration: 0.4, delay: 0.1 } as Transition,
  } as const,

  nodeSecondary: {
    initial: { opacity: 1, scale: 0 },
    animate: { scale: 1 },
    transition: { duration: 0.4, delay: 0.3 } as Transition,
  } as const,

  nodeTertiary: {
    initial: { opacity: 1, scale: 0 },
    animate: { scale: 1 },
    transition: { duration: 0.4, delay: 0.5 } as Transition,
  } as const,

  // =============================================================================
  // LABEL ANIMATIONS
  // =============================================================================

  labelTop: {
    initial: { opacity: 0, y: -8 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3, delay: 0.2 } as Transition,
  } as const,

  labelBottom: {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3, delay: 0.2 } as Transition,
  } as const,

  // =============================================================================
  // REDUCED MOTION SUPPORT
  // =============================================================================

  // All animations respect prefers-reduced-motion
  // Content remains visible, motion is removed
  reducedMotion: {
    initial: { opacity: 1 },
    animate: { opacity: 1 },
    whileInView: { opacity: 1 },
    transition: { duration: 0 } as Transition,
  } as const,
} as const;

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

// Stagger children animations
export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
} as const;

export const staggerItem = {
  initial: { opacity: 1, y: 20 },
  animate: { y: 0 },
  transition: { duration: 0.4 } as Transition,
} as const;

// Fade in for text that should be visible baseline
export const textReveal = {
  initial: { opacity: 1, y: 20 },
  whileInView: { y: 0 },
  viewport: { once: true, margin: '-50px' } as const,
  transition: { duration: 0.5 } as Transition,
} as const;

// For elements that should scale in
export const scaleIn = {
  initial: { opacity: 1, scale: 0.95 },
  whileInView: { scale: 1 },
  viewport: { once: true } as const,
  transition: { duration: 0.4, ease: 'easeOut' } as Transition,
} as const;
