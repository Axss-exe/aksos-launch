// =============================================================================
// GOLDEN RATIO DESIGN SYSTEM
// Based on NN/g article: https://www.nngroup.com/articles/golden-ratio-ui-design/
// φ (phi) = 1.618033988749895 - The Golden Ratio
// =============================================================================

/**
 * Golden Ratio Constants
 * φ = (1 + √5) / 2 ≈ 1.618
 * 1/φ ≈ 0.618
 */
export const GOLDEN_RATIO = {
  phi: 1.618033988749895,
  inversePhi: 0.6180339887498949,
  major: 0.6180339887498949, // 61.8% - larger portion
  minor: 0.3819660112501051, // 38.2% - smaller portion
  // Common golden ratio proportions
  ratios: {
    // Content to sidebar ratios
    contentSidebar: 1.618, // main:sidebar
    sidebarContent: 0.618, // sidebar:main
    // Section height ratios
    sectionHeight: 1.618, // height:width for golden rectangles
    // Grid column ratios
    gridMajor: 0.618, // 61.8% of width
    gridMinor: 0.382, // 38.2% of width
    // Spacing ratios
    spacingRatio: 1.618,
  },
} as const;

/**
 * Layout Patterns based on Golden Ratio
 * Each pattern provides different content organization
 */
export type LayoutPattern = 
  | 'hero'
  | 'asymmetrical'
  | 'golden-rectangle'
  | 'fibonacci'
  | 'rule-of-thirds'
  | 'centered'
  | 'full-bleed'
  | 'split-screen';

/**
 * Section Layout Configuration
 * Defines how content is organized within a section
 */
export interface SectionLayout {
  pattern: LayoutPattern;
  label: string;
  description: string;
  // Grid template for the section
  gridTemplate?: string;
  gridTemplateAreas?: string[];
  gridTemplateColumns?: string;
  gridTemplateRows?: string;
  // Content area widths (as percentage of container)
  contentWidth?: number;
  sidebarWidth?: number;
  // Spacing multipliers
  spacingMultiplier?: number;
  // Whether diagram should be full width or constrained
  diagramFullWidth?: boolean;
  // Diagram placement
  diagramPlacement?: 'left' | 'right' | 'center' | 'full';
  // Text placement
  textPlacement?: 'left' | 'right' | 'center';
  // Text width as percentage of content area
  textWidth?: number;
}

/**
 * Golden Ratio Layout Patterns
 * 8 different patterns for section organization
 */
export const LAYOUT_PATTERNS: Record<LayoutPattern, SectionLayout> = {
  // Pattern 1: Hero - Full width with centered content
  hero: {
    pattern: 'hero',
    label: 'Hero',
    description: 'Full-width centered layout for maximum impact',
    gridTemplate: '1fr / 1fr',
    gridTemplateAreas: ['content'],
    contentWidth: 1,
    diagramFullWidth: true,
    diagramPlacement: 'center',
    textPlacement: 'center',
    textWidth: 0.8,
    spacingMultiplier: 2,
  },

  // Pattern 2: Asymmetrical - 61.8% / 38.2% split
  asymmetrical: {
    pattern: 'asymmetrical',
    label: 'Asymmetrical',
    description: '61.8% content, 38.2% sidebar - golden ratio split',
    gridTemplate: '1fr / 0.618fr 0.382fr',
    gridTemplateAreas: ['label content', 'label diagram'],
    gridTemplateColumns: '0.618fr 0.382fr',
    contentWidth: 0.618,
    sidebarWidth: 0.382,
    diagramFullWidth: false,
    diagramPlacement: 'right',
    textPlacement: 'left',
    textWidth: 1,
    spacingMultiplier: 1.5,
  },

  // Pattern 3: Golden Rectangle - Content in golden rectangle proportion
  'golden-rectangle': {
    pattern: 'golden-rectangle',
    label: 'Golden Rectangle',
    description: 'Content area follows 1:1.618 proportion',
    gridTemplate: '1fr / minmax(0px, 1fr)',
    gridTemplateAreas: ['content'],
    contentWidth: 1 / GOLDEN_RATIO.phi,
    diagramFullWidth: false,
    diagramPlacement: 'center',
    textPlacement: 'center',
    textWidth: 0.7,
    spacingMultiplier: 1.618,
  },

  // Pattern 4: Fibonacci - Progressive sizing
  fibonacci: {
    pattern: 'fibonacci',
    label: 'Fibonacci',
    description: 'Progressive sizing based on Fibonacci sequence',
    gridTemplate: '1fr / 0.618fr 1fr',
    gridTemplateAreas: ['label label', 'text diagram'],
    gridTemplateColumns: '0.618fr 1fr',
    contentWidth: 0.618,
    sidebarWidth: 1,
    diagramFullWidth: false,
    diagramPlacement: 'right',
    textPlacement: 'left',
    textWidth: 0.8,
    spacingMultiplier: 1.618,
  },

  // Pattern 5: Rule of Thirds - 2:1 ratio approximation
  'rule-of-thirds': {
    pattern: 'rule-of-thirds',
    label: 'Rule of Thirds',
    description: 'Thirds-based layout for visual interest',
    gridTemplate: '1fr / repeat(3, 1fr)',
    gridTemplateAreas: ['label label label', '. content diagram'],
    gridTemplateColumns: 'repeat(3, 1fr)',
    contentWidth: 0.5,
    diagramFullWidth: false,
    diagramPlacement: 'right',
    textPlacement: 'center',
    textWidth: 1,
    spacingMultiplier: 1.5,
  },

  // Pattern 6: Centered - Traditional centered layout
  centered: {
    pattern: 'centered',
    label: 'Centered',
    description: 'Traditional centered content with balanced margins',
    gridTemplate: '1fr / 1fr',
    gridTemplateAreas: ['content'],
    contentWidth: 0.618,
    diagramFullWidth: false,
    diagramPlacement: 'center',
    textPlacement: 'center',
    textWidth: 0.8,
    spacingMultiplier: 1.618,
  },

  // Pattern 7: Full Bleed - Diagram spans full width
  'full-bleed': {
    pattern: 'full-bleed',
    label: 'Full Bleed',
    description: 'Diagram spans full width, text constrained',
    gridTemplate: '1fr / 1fr',
    gridTemplateAreas: ['content'],
    contentWidth: 0.5,
    diagramFullWidth: true,
    diagramPlacement: 'full',
    textPlacement: 'center',
    textWidth: 0.8,
    spacingMultiplier: 2,
  },

  // Pattern 8: Split Screen - 50/50 split
  'split-screen': {
    pattern: 'split-screen',
    label: 'Split Screen',
    description: 'Equal 50/50 split for balanced composition',
    gridTemplate: '1fr / 1fr 1fr',
    gridTemplateAreas: ['label label', 'text diagram'],
    gridTemplateColumns: '1fr 1fr',
    contentWidth: 0.5,
    sidebarWidth: 0.5,
    diagramFullWidth: false,
    diagramPlacement: 'right',
    textPlacement: 'left',
    textWidth: 1,
    spacingMultiplier: 1.5,
  },
} as const;

/**
 * Section Layout Assignment
 * Maps each section to a specific layout pattern
 * Alternates patterns for visual variety
 */
export type SectionType = 
  | 'hero'
  | 'problem'
  | 'what-we-learned'
  | 'approach'
  | 'atis'
  | 'batana'
  | 'pipeline'
  | 'capabilities'
  | 'rita'
  | 'provenance'
  | 'status'
  | 'network'
  | 'invitation'
  | 'journey'
  | 'final';

/**
 * Golden Ratio Spacing System
 * All spacing based on φ multiplier
 */
export const GOLDEN_SPACING = {
  // Base unit = 8px
  base: 8,
  // Spacing scale using golden ratio
  xs: 8,       // 1 × base
  sm: 12,      // 1.5 × base
  md: 20,      // φ × base ≈ 12.94 → rounded to 20
  lg: 32,      // φ² × base ≈ 21.03 → rounded to 32
  xl: 52,      // φ³ × base ≈ 34 → rounded to 52
  '2xl': 84,   // φ⁴ × base ≈ 55 → rounded to 84
  '3xl': 136,  // φ⁵ × base ≈ 89 → rounded to 136
  // Section spacing using Fibonacci sequence
  section: {
    xs: 32,   // 4 × base
    sm: 52,   // 6.5 × base
    md: 84,   // 10.5 × base
    lg: 136,  // 17 × base
    xl: 220,  // 27.5 × base
  },
  // Vertical rhythm
  rhythm: {
    text: 1.618, // Line height ratio
    section: 2.618, // Section spacing multiplier
  },
} as const;

/**
 * Calculate golden ratio dimensions
 */
export function calculateGoldenDimensions(
  containerWidth: number,
  pattern: LayoutPattern = 'asymmetrical'
): {
  contentWidth: number;
  sidebarWidth?: number;
  diagramWidth: number;
  textWidth: number;
} {
  const layout = LAYOUT_PATTERNS[pattern];
  
  const contentWidth = containerWidth * (layout.contentWidth || 1);
  const sidebarWidth = layout.sidebarWidth 
    ? containerWidth * layout.sidebarWidth 
    : undefined;
  
  const diagramWidth = layout.diagramFullWidth 
    ? containerWidth 
    : contentWidth * (layout.diagramPlacement === 'right' || layout.diagramPlacement === 'left' ? 0.5 : 1);
  
  const textWidth = contentWidth * (layout.textWidth || 0.8);
  
  return {
    contentWidth,
    sidebarWidth,
    diagramWidth,
    textWidth,
  };
}

/**
 * Get layout pattern for a specific section
 * Cycles through patterns for visual variety
 */
export function getSectionLayout(sectionType: SectionType): SectionLayout {
  const patternMap: Record<SectionType, LayoutPattern> = {
    hero: 'hero',
    problem: 'asymmetrical',
    'what-we-learned': 'golden-rectangle',
    approach: 'fibonacci',
    atis: 'rule-of-thirds',
    batana: 'asymmetrical',
    pipeline: 'centered',
    capabilities: 'full-bleed',
    rita: 'split-screen',
    provenance: 'golden-rectangle',
    status: 'asymmetrical',
    network: 'fibonacci',
    invitation: 'rule-of-thirds',
    journey: 'centered',
    final: 'hero',
  };
  
  const pattern = patternMap[sectionType] || 'centered';
  return LAYOUT_PATTERNS[pattern];
}

/**
 * Generate CSS grid styles for a layout pattern
 */
export function getGridStyles(pattern: LayoutPattern): {
  display: string;
  gridTemplateColumns?: string;
  gridTemplateAreas?: string;
  justifyItems?: string;
  alignItems?: string;
} {
  const layout = LAYOUT_PATTERNS[pattern];
  
  return {
    display: 'grid',
    gridTemplateColumns: layout.gridTemplateColumns,
    gridTemplateAreas: layout.gridTemplateAreas && layout.gridTemplateAreas.length > 0 
      ? layout.gridTemplateAreas.join(' / ') 
      : undefined,
    justifyItems: layout.textPlacement === 'center' ? 'center' : undefined,
    alignItems: 'start',
  };
}

/**
 * Golden Ratio Typography Scale
 * Text sizes following φ progression
 */
export const GOLDEN_TYPOGRAPHY = {
  // Base size = 16px
  base: 16,
  // Scale using φ
  xs: 12,    // 0.75 × base
  sm: 14,    // 0.875 × base
  base: 16,
  lg: 20,    // 1.25 × base
  xl: 26,    // φ × base ≈ 25.89 → 26
  '2xl': 42, // φ² × base ≈ 41.89 → 42
  '3xl': 68, // φ³ × base ≈ 68
  '4xl': 110, // φ⁴ × base ≈ 110
  '5xl': 178, // φ⁵ × base ≈ 178
} as const;

/**
 * Calculate optimal text width based on golden ratio
 * For readability, optimal line length is 45-90 characters
 * Using φ ratio for max width
 */
export function calculateOptimalTextWidth(containerWidth: number): number {
  // Optimal line length: 65 characters average
  // Assuming 0.6em per character (monospace approximation)
  const charWidth = 0.6;
  const optimalChars = 65;
  const idealWidth = optimalChars * charWidth * 16; // 16px base
  
  // Constrain by golden ratio
  const goldenWidth = containerWidth * GOLDEN_RATIO.inversePhi;
  
  // Return the smaller of the two (whichever fits better)
  return Math.min(idealWidth, goldenWidth * 0.8);
}
