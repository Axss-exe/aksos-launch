// =============================================================================
// AKSOS VISUALIZATION TOKENS
// Centralized constants for all visualization components
// =============================================================================

import { tokens } from '@/lib/tokens';

// ===========================================================================
// VISUALIZATION COLORS - Using existing AKSOS palette
// ===========================================================================

export const vizTokens = {
  color: {
    // Primary visualization colors
    primary: tokens.color.ink,
    secondary: tokens.color.muted,
    accent: tokens.color.signal,
    accentLight: tokens.color.signalLight,
    accentDark: tokens.color.signalDark,
    
    // Line weights
    lineThin: tokens.color.line,
    lineMedium: tokens.color.lineStrong,
    lineHeavy: tokens.color.ink,
    
    // Node colors
    nodePrimary: tokens.color.ink,
    nodeSecondary: tokens.color.muted,
    nodeAccent: tokens.color.signal,
    nodeGreen: tokens.color.green,
    
    // Background layers
    bgPrimary: tokens.color.background,
    bgSecondary: tokens.color.paper,
    bgOverlay: tokens.color.overlay,
    
    // Muted states
    muted: tokens.color.muted,
    mutedSoft: tokens.color.mutedSoft,
    mutedLight: tokens.color.line,
  },
  
  // ===========================================================================
  // LINE WEIGHTS
  // ===========================================================================
  
  line: {
    thin: 0.5,
    normal: 1,
    medium: 1.5,
    thick: 2,
    heavy: 3,
  },
  
  // ===========================================================================
  // OPACITY LEVELS
  // ===========================================================================
  
  opacity: {
    subtle: 0.05,
    faint: 0.1,
    low: 0.2,
    mediumLow: 0.3,
    medium: 0.5,
    mediumHigh: 0.7,
    high: 0.8,
    full: 1,
  },
  
  // ===========================================================================
  // NODE SIZES
  // ===========================================================================
  
  node: {
    xs: 1,
    sm: 1.5,
    md: 2,
    lg: 3,
    xl: 4,
    xxl: 6,
  },
  
  // ===========================================================================
  // ANIMATION DURATIONS
  // ===========================================================================
  
  animation: {
    instant: '0.1s',
    fast: '0.2s',
    normal: '0.4s',
    slow: '0.6s',
    slower: '0.8s',
    slowest: '1s',
    ecosystem: '2s',
    dataStream: '60s', // For continuous hero animation
  },
  
  // ===========================================================================
  // EASING CURVES
  // ===========================================================================
  
  easing: {
    linear: 'cubic-bezier(0, 0, 1, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    // Custom easing for decisive snap (Alignment Aperture)
    snap: 'cubic-bezier(0.16, 1, 0.3, 1)',
    // Custom easing for smooth reveal
    smooth: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
    subtle: 'cubic-bezier(0.34, 0, 0.84, 0.16)',
  },
  
  // ===========================================================================
  // GRID AND SPACING
  // ===========================================================================
  
  grid: {
    spacing: tokens.layout.gridGap,
    columnWidth: tokens.layout.contentWidth,
  },
  
  // ===========================================================================
  // DENSITY LEVELS
  // ===========================================================================
  
  density: {
    sparse: 0.3,
    low: 0.5,
    medium: 0.7,
    high: 0.9,
    dense: 1,
  },
  
  // ===========================================================================
  // BREAKPOINTS (matching existing)
  // ===========================================================================
  
  breakpoint: {
    mobile: 640,
    tablet: 1024,
    desktop: 1440,
  },
  
  // ===========================================================================
  // Z-INDEX LAYERS
  // ===========================================================================
  
  zIndex: {
    background: 0,
    structural: 10,
    primary: 20,
    semantic: 30,
    interaction: 40,
    mask: 50,
  },
  
  // ===========================================================================
  // SEED FOR DETERMINISTIC RANDOMNESS
  // ===========================================================================
  
  seed: 42, // Standard seed for reproducible pseudo-random generation
  
  // ===========================================================================
  // VISUALIZATION-SPECIFIC TOKENS
  // ===========================================================================
  
  // Raw Data Stream (Hero)
  rawDataStream: {
    density: 0.8,
    minElementSize: 0.3,
    maxElementSize: 2,
    elementSpacing: 1.5,
    animationSpeed: 0.1, // pixels per frame
    animationDirection: 'left',
  },
  
  // Fragmented Plates
  fragmentedPlates: {
    plateCount: 5,
    minPlateSize: 0.15, // percentage of container
    maxPlateSize: 0.25,
    gapSize: 0.02, // percentage of container
    parallaxRange: 0.05, // -5% to +5%
  },
  
  // Alignment Aperture
  alignmentAperture: {
    chaoticNodeCount: 50,
    resolvedNodeCount: 20,
    snapDuration: 0.4,
    snapDelay: 0.1,
  },
  
  // Extraction Paths
  extractionPaths: {
    pathWidth: 0.75,
    pathCount: 5,
    revealDuration: 0.6,
    revealStagger: 0.15,
    spineWidth: 1,
  },
  
  // Topographic Hierarchy
  topographicHierarchy: {
    anchorSize: 8,
    primaryConnectionWidth: 1.5,
    secondaryConnectionWidth: 0.75,
    distantNodeCount: 40,
    primaryNodeCount: 15,
    anchorNodeCount: 1,
  },
} as const;

export type VizTokens = typeof vizTokens;
