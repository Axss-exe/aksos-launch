// =============================================================================
// AKSOS DESIGN TOKENS - Premium Intelligence Infrastructure System
// =============================================================================
//
// Design Philosophy:
// - Restrained premium aesthetic
// - Editorial information hierarchy
// - Large amounts of intentional whitespace
// - Precise typography
// - Minimal but sophisticated visual systems
// - Strong horizontal rhythm
// - Controlled motion
//
// Color Palette:
// - Background: Warm off-white (#f5f4f0)
// - Paper: Clean white (#ffffff)
// - Ink: Deep black (#11120f)
// - Muted: Soft gray (#5a5c58)
// - Line: Subtle gray (#d1d3ce)
// - Signal: AKSOS brand rust (#8a4432)
// - Accent: Deep green (#3a5242)
//
// Typography:
// - Sans: Inter (primary)
// - Mono: IBM Plex Mono (code, labels)
// - Serif: Georgia (headlines, emphasis)
//
// =============================================================================

export const tokens = {
  // ===========================================================================
  // COLORS
  // ===========================================================================
  color: {
    // Background colors
    background: '#f5f4f0',
    paper: '#ffffff',
    overlay: 'rgba(255, 255, 255, 0.98)',
    
    // Text colors
    ink: '#11120f',
    inkSoft: '#2a2b28',
    muted: '#5a5c58',
    mutedSoft: '#8a8c86',
    
    // Border and line colors
    line: '#d1d3ce',
    lineStrong: '#8a8c86',
    
    // Brand colors
    signal: '#8a4432',       // Primary AKSOS brand color
    signalLight: '#a85c48',
    signalDark: '#6a3224',
    green: '#3a5242',        // Secondary brand color
    greenLight: '#4a6a52',
    
    // Status colors
    success: '#3a5242',
    warning: '#8a6b32',
    error: '#8a3232',
    
    // Utility colors
    white: '#ffffff',
    black: '#000000',
    transparent: 'transparent',
  },
  
  // ===========================================================================
  // TYPOGRAPHY
  // ===========================================================================
  font: {
    sans: 'var(--font-inter), Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    mono: 'var(--font-plex-mono), "IBM Plex Mono", "Courier New", monospace',
    serif: 'Georgia, "Times New Roman", serif',
  },
  
  // Font sizes - based on modular scale (1.250 ratio)
  text: {
    xs: '0.75rem',      // 12px
    sm: '0.875rem',    // 14px
    base: '1rem',       // 16px
    lg: '1.125rem',     // 18px
    xl: '1.25rem',      // 20px
    '2xl': '1.5rem',    // 24px
    '3xl': '1.875rem',  // 30px
    '4xl': '2.25rem',   // 36px
    '5xl': '2.75rem',   // 44px
    '6xl': '3.5rem',    // 56px
    '7xl': '4.5rem',    // 72px
    '8xl': '5.5rem',    // 88px
    '9xl': '6.5rem',    // 104px
  },
  
  // Font weights
  weight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  
  // Line heights
  lineHeight: {
    tight: 1.1,
    normal: 1.5,
    relaxed: 1.618,  // Golden ratio
    loose: 1.8,
    heading: 1.1,
    display: 1.05,
  },
  
  // Letter spacing
  letterSpacing: {
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
  
  // ===========================================================================
  // SPACING
  // ===========================================================================
  spacing: {
    // Base unit: 4px
    '0': '0',
    '1': '0.25rem',   // 4px
    '2': '0.5rem',    // 8px
    '3': '0.75rem',   // 12px
    '4': '1rem',      // 16px
    '5': '1.25rem',   // 20px
    '6': '1.5rem',    // 24px
    '8': '2rem',      // 32px
    '10': '2.5rem',   // 40px
    '12': '3rem',     // 48px
    '14': '3.5rem',   // 56px
    '16': '4rem',     // 64px
    '20': '5rem',     // 80px
    '24': '6rem',     // 96px
    '28': '7rem',     // 112px
    '32': '8rem',     // 128px
    '36': '9rem',     // 144px
    '40': '10rem',    // 160px
    '44': '11rem',    // 176px
    '48': '12rem',    // 192px
    '52': '13rem',    // 208px
    '56': '14rem',    // 224px
    '60': '15rem',    // 240px
    '64': '16rem',    // 256px
  },
  
  // ===========================================================================
  // BORDER
  // ===========================================================================
  border: {
    width: {
      hairline: '1px',
      thin: '1px',
      normal: '2px',
      thick: '4px',
    },
    radius: {
      none: '0',
      sm: '2px',
      md: '4px',
      lg: '8px',
    },
  },
  
  // ===========================================================================
  // SHADOWS
  // ===========================================================================
  shadow: {
    none: 'none',
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 2px 4px 0 rgba(0, 0, 0, 0.05)',
    lg: '0 4px 8px 0 rgba(0, 0, 0, 0.05)',
    xl: '0 8px 16px 0 rgba(0, 0, 0, 0.05)',
  },
  
  // ===========================================================================
  // ANIMATION
  // ===========================================================================
  animation: {
    duration: {
      instant: '0.1s',
      fast: '0.2s',
      normal: '0.4s',
      slow: '0.6s',
      slower: '0.8s',
      slowest: '1s',
    },
    easing: {
      linear: 'cubic-bezier(0, 0, 1, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      // Custom easing for premium feel
      smooth: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
      subtle: 'cubic-bezier(0.34, 0, 0.84, 0.16)',
    },
  },
  
  // ===========================================================================
  // LAYOUT
  // ===========================================================================
  layout: {
    // Page dimensions
    pageWidth: '1440px',
    pagePadding: 'clamp(24px, 6vw, 88px)',
    
    // Section spacing
    sectionSpacing: 'clamp(120px, 13vw, 190px)',
    sectionSpacingSmall: 'clamp(80px, 10vw, 140px)',
    sectionSpacingLarge: 'clamp(160px, 16vw, 240px)',
    
    // Content dimensions
    contentWidth: '680px',
    contentWidthWide: '800px',
    contentWidthNarrow: '560px',
    
    // Grid
    gridGap: 'clamp(20px, 2.5vw, 40px)',
    gridGapSmall: 'clamp(12px, 1.5vw, 24px)',
    gridGapLarge: 'clamp(32px, 4vw, 64px)',
    
    // Diagrams
    diagramPadding: '40px',
    diagramMinHeight: '400px',
    diagramMinHeightMobile: '300px',
  },
  
  // ===========================================================================
  // Z-INDEX
  // ===========================================================================
  zIndex: {
    base: '1',
    dropdown: '100',
    sticky: '200',
    fixed: '300',
    modal: '400',
    tooltip: '500',
    notification: '600',
  },
  
  // ===========================================================================
  // BREAKPOINTS
  // ===========================================================================
  breakpoint: {
    xs: '360px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1440px',
    '3xl': '1600px',
  },
} as const;

export type Tokens = typeof tokens;
