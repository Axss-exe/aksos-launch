// =============================================================================
// VISUALIZATION FRAME
// Base component for all visualizations with consistent layering and behavior
// =============================================================================

import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useInView, AnimationDefinition } from 'framer-motion';
import { useReducedMotion } from './useReducedMotion';
import { vizTokens } from './visualizationTokens';

interface VisualizationFrameProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  aspectRatio?: number;
  minHeight?: string | number;
  maxWidth?: string | number;
  backgroundColor?: string;
  borderColor?: string;
  showBorder?: boolean;
  // Animation control
  initial?: object;
  animate?: object;
  transition?: object;
  // Intersection Observer options
  viewport?: object;
  // Reduced motion fallback
  reducedMotionFallback?: React.ReactNode;
}

export function VisualizationFrame({
  children,
  className = '',
  style = {},
  aspectRatio,
  minHeight,
  maxWidth = '100%',
  backgroundColor = vizTokens.color.bgPrimary,
  borderColor = vizTokens.color.mutedLight,
  showBorder = false,
  initial,
  animate,
  transition = { duration: 0.4, delay: 0.2 } as const,
  viewport = { once: true, margin: '-100px' },
  reducedMotionFallback,
}: VisualizationFrameProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const inView = useInView(containerRef, viewport);
  const prefersReducedMotion = useReducedMotion();

  // Handle reduced motion
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    if (inView) {
      controls.start(animate as any);
      setIsVisible(true);
    }
  }, [inView, controls, animate]);

  // If reduced motion is preferred and fallback is provided, use it
  if (prefersReducedMotion && reducedMotionFallback) {
    return (
      <div
        ref={containerRef}
        className={`visualization-frame ${className}`}
        style={{
          aspectRatio,
          minHeight,
          maxWidth,
          backgroundColor,
          border: showBorder ? `1px solid ${borderColor}` : 'none',
          borderRadius: vizTokens.line.thin,
          overflow: 'hidden',
          position: 'relative',
          ...style,
        }}
      >
        {reducedMotionFallback}
      </div>
    );
  }

  return (
    <motion.div
      ref={containerRef}
      className={`visualization-frame ${className}`}
      style={{
        aspectRatio,
        minHeight,
        maxWidth,
        backgroundColor,
        border: showBorder ? `1px solid ${borderColor}` : 'none',
        borderRadius: vizTokens.line.thin,
        overflow: 'hidden',
        position: 'relative',
        ...style,
      }}
      initial={initial as any}
      animate={controls}
      transition={transition as any}
      viewport={viewport}
    >
      {children}
    </motion.div>
  );
}

export default VisualizationFrame;
