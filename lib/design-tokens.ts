// Design Tokens for AKSOS - Minimal, editorial, highly intentional visual system

export const tokens = {
  // Colors - extremely restrained palette
  color: {
    background: '#efeee8',
    paper: '#f8f7f2',
    ink: '#171916',
    muted: '#686b64',
    line: '#c7c9c0',
    signal: '#a94b35', // AKSOS brand accent - use sparingly
    green: '#567d61',
    white: '#ffffff',
    black: '#000000',
  },
  
  // Typography
  font: {
    sans: 'var(--font-inter), Inter, Arial, sans-serif',
    mono: 'var(--font-plex-mono), IBM Plex Mono, monospace',
    serif: 'var(--font-serif), Georgia, serif', // For major statements
  },
  
  // Spacing - increased whitespace for editorial feel
  spacing: {
    xs: '8px',
    sm: '12px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    '2xl': '40px',
    '3xl': '48px',
    '4xl': '64px',
    '5xl': '80px',
    '6xl': '96px',
    '7xl': '128px',
    '8xl': '160px',
    '9xl': '192px',
    '10xl': '256px',
  },
  
  // Border
  border: {
    thin: '1px',
    radius: '0px', // No rounded corners - sharp, precise
  },
  
  // Typography scale
  text: {
    xs: '10px',
    sm: '11px',
    base: '16px',
    lg: '18px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '30px',
    '4xl': '36px',
    '5xl': '48px',
    '6xl': '64px',
    '7xl': '80px',
    '8xl': '96px',
    '9xl': '112px',
    '10xl': '128px',
  },
  
  // Animation
  animation: {
    duration: {
      fast: '200ms',
      normal: '400ms',
      slow: '800ms',
      slower: '1200ms',
    },
    easing: {
      linear: 'linear',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    },
  },
  
  // Layout
  layout: {
    pageWidth: '1440px',
    pagePadding: 'clamp(24px, 6vw, 88px)',
    sectionSpacing: 'clamp(120px, 13vw, 190px)',
    contentSpacing: '32px',
    textWidth: '680px',
    gridGap: 'clamp(20px, 2.5vw, 40px)',
  },
} as const;

export type Tokens = typeof tokens;
