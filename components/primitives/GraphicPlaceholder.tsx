'use client';

import { motion } from 'framer-motion';
import { tokens } from '@/lib/tokens';

// =============================================================================
// GRAPHIC PLACEHOLDER
// 
// Purpose: Production-quality placeholder for sections with future graphics
// Requirements:
// - Preserves exact dimensions
// - Preserves intended aspect ratio
// - Preserves spacing
// - Preserves alignment
// - Preserves visual weight
// - Preserves responsive behavior
// - Subtle and branded
// - Does not collapse section height
// =============================================================================

interface GraphicPlaceholderProps {
  title?: string;
  description?: string;
  aspectRatio?: number;
  minHeight?: string | number;
  maxWidth?: string | number;
  className?: string;
  style?: React.CSSProperties;
  showBorder?: boolean;
  borderColor?: string;
  bgColor?: string;
}

export function GraphicPlaceholder({
  title = 'GRAPHIC PLACEHOLDER',
  description = 'Reserved for final visualization',
  aspectRatio = 16 / 9,
  minHeight = '400px',
  maxWidth = '100%',
  className = '',
  style = {},
  showBorder = true,
  borderColor = tokens.color.line,
  bgColor = tokens.color.paper,
}: GraphicPlaceholderProps) {
  return (
    <motion.div
      className={`graphic-placeholder ${className}`}
      style={{
        aspectRatio,
        minHeight,
        maxWidth,
        backgroundColor: bgColor,
        border: showBorder ? `1px dashed ${borderColor}` : 'none',
        borderRadius: tokens.border.radius.sm,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: tokens.spacing['8'],
        textAlign: 'center',
        ...style,
      }}
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      {/* Title */}
      <motion.p
        style={{
          fontFamily: tokens.font.mono,
          fontSize: tokens.text.sm,
          color: tokens.color.muted,
          letterSpacing: tokens.letterSpacing.widest,
          marginBottom: tokens.spacing['2'],
          textTransform: 'uppercase',
        }}
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        {title}
      </motion.p>
      
      {/* Description */}
      <motion.p
        style={{
          fontFamily: tokens.font.sans,
          fontSize: tokens.text.sm,
          color: tokens.color.mutedSoft,
          lineHeight: tokens.lineHeight.relaxed,
        }}
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        {description}
      </motion.p>
      
      {/* AKSOS watermark */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: tokens.spacing['4'],
          right: tokens.spacing['4'],
          fontFamily: tokens.font.mono,
          fontSize: tokens.text.xs,
          color: tokens.color.muted,
          letterSpacing: tokens.letterSpacing.wider,
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.5 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: 0.5 }}
      >
        AKSOS
      </motion.div>
      
      {/* Subtle diagonal pattern */}
      <svg
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      >
        <defs>
          <pattern
            id="diagonalHatch"
            patternUnits="userSpaceOnUse"
            width="20"
            height="20"
            patternTransform="rotate(45)"
          >
            <rect width="20" height="20" fill="transparent" />
            <line
              x1="0" y1="0"
              x2="20" y2="20"
              stroke={borderColor}
              strokeWidth="0.5"
              opacity="0.1"
            />
          </pattern>
        </defs>
        <rect
          x="0" y="0"
          width="100%"
          height="100%"
          fill="url(#diagonalHatch)"
        />
      </svg>
    </motion.div>
  );
}

export default GraphicPlaceholder;
