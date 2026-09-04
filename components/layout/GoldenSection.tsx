'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { useState, useEffect, useRef, useMemo } from 'react';
import { tokens } from '@/lib/design-tokens';
import { 
  GOLDEN_RATIO, 
  LAYOUT_PATTERNS, 
  LayoutPattern, 
  SectionLayout, 
  getSectionLayout,
  calculateGoldenDimensions,
  GOLDEN_SPACING,
} from '@/lib/golden-ratio';

// =============================================================================
// GOLDEN SECTION COMPONENTS
// Section layouts following the Golden Ratio (φ = 1.618)
// Based on NN/g article: https://www.nngroup.com/articles/golden-ratio-ui-design/
// =============================================================================

// Section Types for the AKSOS site
const SECTION_TYPES = [
  'hero',
  'problem',
  'what-we-learned',
  'approach',
  'atis',
  'batana',
  'pipeline',
  'capabilities',
  'rita',
  'provenance',
  'status',
  'network',
  'invitation',
  'journey',
  'final',
] as const;

type SectionType = typeof SECTION_TYPES[number];

// Tone variants
const TONE_CLASSES: Record<'paper' | 'dark' | 'quiet', string> = {
  paper: 'tone-paper',
  dark: 'tone-dark',
  quiet: 'tone-quiet',
};

// =============================================================================
// SECTION LABEL
// =============================================================================

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

function SectionLabel({ children, className = '' }: SectionLabelProps) {
  return (
    <motion.p 
      className={`sys-label ${className}`}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ 
        duration: tokens.animation.duration.slow,
        ease: tokens.animation.easing.easeOut 
      }}
    >
      <span className="label-rule" />
      {children}
    </motion.p>
  );
}

// =============================================================================
// GOLDEN SECTION - Main Component
// =============================================================================

interface GoldenSectionProps {
  id?: string;
  label?: string;
  children: React.ReactNode;
  tone?: 'paper' | 'dark' | 'quiet';
  className?: string;
  // Layout control
  layout?: LayoutPattern;
  // Diagram component (optional)
  diagram?: React.ReactNode;
  // Whether to show diagram
  showDiagram?: boolean;
  // Custom spacing
  spacing?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  // Section type for automatic layout selection
  sectionType?: SectionType;
}

/**
 * GoldenSection - Section component with Golden Ratio layout
 * 
 * Features:
 * - 8 different layout patterns based on Golden Ratio
 * - Automatic layout selection based on section type
 * - Responsive behavior with CSS Grid
 * - Animated reveal on scroll
 * - Configurable spacing and tones
 */
export function GoldenSection({
  id,
  label,
  children,
  tone = 'paper',
  className = '',
  layout: layoutProp,
  diagram,
  showDiagram = true,
  spacing = 'md',
  sectionType,
}: GoldenSectionProps) {
  // Determine layout pattern
  const layout = useMemo(() => {
    if (layoutProp) return LAYOUT_PATTERNS[layoutProp];
    if (sectionType) return getSectionLayout(sectionType);
    return LAYOUT_PATTERNS.centered;
  }, [layoutProp, sectionType]);

  // Get spacing values
  const spacingValue = GOLDEN_SPACING.section[spacing] || GOLDEN_SPACING.section.md;

  // Determine if we have a diagram
  const hasDiagram = showDiagram && diagram;

  // Build CSS class names
  const sectionClasses = [
    'golden-section',
    TONE_CLASSES[tone],
    hasDiagram ? 'has-diagram' : 'no-diagram',
    `layout-${layout.pattern}`,
    className,
  ].filter(Boolean).join(' ');

  // Build inline styles based on layout
  const sectionStyle: React.CSSProperties = {
    '--section-spacing': `${spacingValue}px`,
    '--content-width': layout.contentWidth ? `${layout.contentWidth * 100}%` : '100%',
    '--diagram-width': layout.diagramFullWidth ? '100%' : layout.diagramPlacement === 'center' ? '100%' : '50%',
    '--text-width': layout.textWidth ? `${layout.textWidth * 100}%` : '80%',
    '--spacing-multiplier': layout.spacingMultiplier || 1,
  };

  return (
    <motion.section
      id={id}
      className={sectionClasses}
      style={sectionStyle}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ 
        duration: tokens.animation.duration.slow,
        ease: tokens.animation.easing.easeOut 
      }}
    >
      <div className="golden-grid">
        {/* Section Label */}
        {label && (
          <motion.div 
            className="golden-label-cell"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ 
              duration: tokens.animation.duration.slow,
              ease: tokens.animation.easing.easeOut 
            }}
          >
            <SectionLabel>{label}</SectionLabel>
          </motion.div>
        )}

        {/* Content Area */}
        <motion.div 
          className="golden-content"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ 
            duration: tokens.animation.duration.slow,
            delay: 0.1,
            ease: tokens.animation.easing.easeOut 
          }}
        >
          {children}
        </motion.div>

        {/* Diagram Area */}
        {hasDiagram && (
          <motion.div 
            className="golden-diagram"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ 
              duration: tokens.animation.duration.slow,
              delay: 0.2,
              ease: tokens.animation.easing.easeOut 
            }}
          >
            {diagram}
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}

// =============================================================================
// SPECIALIZED SECTION VARIANTS
// =============================================================================

/**
 * HeroSection - Full-width hero with centered content
 */
export function HeroSection({
  id,
  label,
  children,
  diagram,
  tone = 'paper',
  className = '',
}: GoldenSectionProps) {
  return (
    <GoldenSection
      id={id}
      label={label}
      tone={tone}
      className={`hero-section ${className}`}
      layout="hero"
      diagram={diagram}
      spacing="xl"
    >
      {children}
    </GoldenSection>
  );
}

/**
 * AsymmetricalSection - 61.8% / 38.2% split
 */
export function AsymmetricalSection({
  id,
  label,
  children,
  diagram,
  tone = 'paper',
  className = '',
  layout = 'asymmetrical',
}: GoldenSectionProps) {
  return (
    <GoldenSection
      id={id}
      label={label}
      tone={tone}
      className={`asymmetrical-section ${className}`}
      layout={layout}
      diagram={diagram}
      spacing="lg"
    >
      {children}
    </GoldenSection>
  );
}

/**
 * DiagramSection - Section with prominent diagram
 */
export function DiagramSection({
  id,
  label,
  children,
  diagram,
  tone = 'paper',
  className = '',
  layout = 'fibonacci',
  showDiagram = true,
}: GoldenSectionProps) {
  return (
    <GoldenSection
      id={id}
      label={label}
      tone={tone}
      className={`diagram-section ${className}`}
      layout={layout}
      diagram={diagram}
      showDiagram={showDiagram}
      spacing="lg"
    >
      {children}
    </GoldenSection>
  );
}

/**
 * TextSection - Section focused on text content
 */
export function TextSection({
  id,
  label,
  children,
  tone = 'quiet',
  className = '',
  layout = 'centered',
}: GoldenSectionProps) {
  return (
    <GoldenSection
      id={id}
      label={label}
      tone={tone}
      className={`text-section ${className}`}
      layout={layout}
      spacing="md"
    >
      {children}
    </GoldenSection>
  );
}

/**
 * FinalSection - Closing/final statement section
 */
export function FinalSection({
  id,
  label,
  children,
  tone = 'paper',
  className = '',
}: GoldenSectionProps) {
  return (
    <GoldenSection
      id={id}
      label={label}
      tone={tone}
      className={`final-section ${className}`}
      layout="hero"
      spacing="xl"
    >
      {children}
    </GoldenSection>
  );
}

// =============================================================================
// SECTION GRID COMPONENT
// For creating custom grid layouts
// =============================================================================

interface GoldenGridProps {
  children: React.ReactNode;
  pattern?: LayoutPattern;
  className?: string;
}

export function GoldenGrid({
  children,
  pattern = 'centered',
  className = '',
}: GoldenGridProps) {
  const layout = LAYOUT_PATTERNS[pattern];
  
  return (
    <div 
      className={`golden-grid ${className}`}
      style={{
        '--grid-pattern': pattern,
        '--grid-columns': layout.gridTemplateColumns || '1fr',
        '--grid-areas': layout.gridTemplateAreas?.join(' / ') || '',
      } as React.CSSProperties}
    >
      {children}
    </div>
  );
}

// =============================================================================
// RESPONSIVE LAYOUT HELPERS
// =============================================================================

/**
 * Hook to get current viewport width
 */
export function useViewportWidth(): number {
  const [width, setWidth] = useState<number>(1440);
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    function handleResize() {
      setWidth(window.innerWidth);
    }
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return width;
}

/**
 * Hook to get golden ratio dimensions for current viewport
 */
export function useGoldenDimensions(pattern: LayoutPattern = 'asymmetrical'): {
  contentWidth: number;
  sidebarWidth?: number;
  diagramWidth: number;
  textWidth: number;
} {
  const viewportWidth = useViewportWidth();
  
  return useMemo(() => {
    return calculateGoldenDimensions(viewportWidth, pattern);
  }, [viewportWidth, pattern]);
}

// =============================================================================
// EXPORTS
// =============================================================================

export {
  SectionLabel,
  GOLDEN_RATIO,
  LAYOUT_PATTERNS,
  GOLDEN_SPACING,
  calculateGoldenDimensions,
  getSectionLayout,
  useViewportWidth,
  useGoldenDimensions,
};

type GoldenSectionType = typeof GoldenSection;
export type { GoldenSectionProps, LayoutPattern, SectionLayout, SectionType };
