// =============================================================================
// FRAGMENTED PLATES
// SVG-based visualization for Visibility Gap section
// Communicates: "The ecosystem exists, but you cannot navigate it."
// =============================================================================

'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useAnimation, useInView, useScroll, useTransform } from 'framer-motion';
import { useReducedMotion } from './useReducedMotion';
import { vizTokens } from './visualizationTokens';
import { tokens } from '@/lib/tokens';

interface FragmentedPlatesProps {
  breakpoint?: 'mobile' | 'tablet' | 'desktop';
  className?: string;
  style?: React.CSSProperties;
}

// Seeded pseudo-random for deterministic generation
const seededRandom = (seed: number): number => {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
};

interface Plate {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  color: string;
}

interface BackgroundLine {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  stroke: string;
  strokeWidth: number;
  opacity: number;
}

export function FragmentedPlates({
  breakpoint = 'desktop',
  className = '',
  style = {},
}: FragmentedPlatesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const prefersReducedMotion = useReducedMotion();
  
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [plates, setPlates] = useState<Plate[]>([]);
  const [backgroundLines, setBackgroundLines] = useState<BackgroundLine[]>([]);
  
  // Animation controls
  const controls = useAnimation();
  const inView = useInView(containerRef, { once: true, margin: '-100px' });
  
  // Scroll-based parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });
  
  // Generate plates based on container dimensions
  const generatePlates = useCallback((width: number, height: number): Plate[] => {
    const plates: Plate[] = [];
    const seed = vizTokens.seed * 1000;
    
    // Number of plates based on breakpoint
    const plateCount = breakpoint === 'mobile' ? 3 : breakpoint === 'tablet' ? 4 : 5;
    
    const colors = [
      tokens.color.ink,
      tokens.color.muted,
      tokens.color.lineStrong,
      tokens.color.signal,
      tokens.color.green,
    ];
    
    for (let i = 0; i < plateCount; i++) {
      const seedValue = seed + i * 10000;
      
      // Size: plates should be large and architectural
      const sizeFactor = 0.2 + seededRandom(seedValue) * 0.15;
      const plateWidth = width * sizeFactor;
      const plateHeight = height * (0.15 + seededRandom(seedValue + 1) * 0.1);
      
      // Position: centered but with controlled misalignment
      const centerX = width / 2;
      const centerY = height / 2;
      
      const offsetX = (seededRandom(seedValue + 2) - 0.5) * width * 0.15;
      const offsetY = (seededRandom(seedValue + 3) - 0.5) * height * 0.1;
      
      const x = centerX + offsetX - plateWidth / 2;
      const y = centerY + offsetY - plateHeight / 2;
      
      // Slight rotation for misalignment
      const rotation = (seededRandom(seedValue + 4) - 0.5) * 2;
      
      // Color
      const color = colors[Math.floor(seededRandom(seedValue + 5) * colors.length)];
      
      plates.push({
        id: `plate-${i}`,
        x,
        y,
        width: plateWidth,
        height: plateHeight,
        rotation,
        color,
      });
    }
    
    return plates;
  }, [breakpoint]);
  
  // Generate background lines (the hidden data)
  const generateBackgroundLines = useCallback((width: number, height: number): BackgroundLine[] => {
    const lines: BackgroundLine[] = [];
    const seed = vizTokens.seed * 2000;
    
    const lineCount = breakpoint === 'mobile' ? 15 : breakpoint === 'tablet' ? 20 : 25;
    
    for (let i = 0; i < lineCount; i++) {
      const seedValue = seed + i * 5000;
      
      const x1 = seededRandom(seedValue) * width;
      const y1 = seededRandom(seedValue + 1) * height;
      const x2 = seededRandom(seedValue + 2) * width;
      const y2 = seededRandom(seedValue + 3) * height;
      
      const stroke = tokens.color.lineStrong;
      const strokeWidth = 0.5 + seededRandom(seedValue + 4) * 0.5;
      const opacity = 0.1 + seededRandom(seedValue + 5) * 0.2;
      
      lines.push({
        x1,
        y1,
        x2,
        y2,
        stroke,
        strokeWidth,
        opacity,
      });
    }
    
    return lines;
  }, [breakpoint]);
  
  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDimensions({ width: rect.width, height: rect.height });
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Generate elements when dimensions change
  useEffect(() => {
    if (dimensions.width > 0 && dimensions.height > 0) {
      setPlates(generatePlates(dimensions.width, dimensions.height));
      setBackgroundLines(generateBackgroundLines(dimensions.width, dimensions.height));
    }
  }, [dimensions, generatePlates, generateBackgroundLines]);
  
  // Trigger animation when in view
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [inView, controls]);
  
  // Get container dimensions for SVG
  const svgWidth = dimensions.width || 600;
  const svgHeight = dimensions.height || 400;
  
  // Calculate parallax offsets for each plate
  const getParallaxOffset = (index: number) => {
    if (prefersReducedMotion) return 0;
    // Each plate moves at a slightly different rate
    const multiplier = 1 - (index * 0.15);
    return useTransform(scrollYProgress, [0, 1], [-svgWidth * 0.05 * multiplier, svgWidth * 0.05 * multiplier]);
  };
  
  // Reduced motion fallback - show static resolved state
  const renderReducedMotion = () => (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${svgWidth} ${svgHeight}`}
      preserveAspectRatio="xMidYMid meet"
      style={{
        width: '100%',
        height: '100%',
        display: 'block',
      }}
      aria-label="Fragmented plates visualization"
    >
      {/* Background lines (partially visible) */}
      {backgroundLines.map((line, index) => (
        <line
          key={`line-${index}`}
          x1={line.x1}
          y1={line.y1}
          x2={line.x2}
          y2={line.y2}
          stroke={line.stroke}
          strokeWidth={line.strokeWidth}
          opacity={line.opacity * 0.3}
        />
      ))}
      
      {/* Plates */}
      {plates.map((plate, index) => (
        <g
          key={plate.id}
          transform={`translate(${plate.x}, ${plate.y}) rotate(${plate.rotation})`}
        >
          <rect
            x={0}
            y={0}
            width={plate.width}
            height={plate.height}
            fill={plate.color}
            opacity={0.8}
            rx={vizTokens.line.thin}
            ry={vizTokens.line.thin}
          />
          
          {/* Subtle highlight */}
          <rect
            x={0}
            y={0}
            width={plate.width * 0.3}
            height={plate.height}
            fill={tokens.color.paper}
            opacity={0.1}
            rx={vizTokens.line.thin}
            ry={vizTokens.line.thin}
          />
        </g>
      ))}
    </svg>
  );
  
  return (
    <div
      ref={containerRef}
      className={`fragmented-plates ${className}`}
      style={{
        width: '100%',
        height: '100%',
        minHeight: breakpoint === 'mobile' ? '300px' : breakpoint === 'tablet' ? '400px' : '50vh',
        overflow: 'hidden',
        position: 'relative',
        ...style,
      }}
    >
      {prefersReducedMotion ? (
        renderReducedMotion()
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ width: '100%', height: '100%' }}
        >
          <svg
            ref={svgRef}
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            preserveAspectRatio="xMidYMid meet"
            style={{
              width: '100%',
              height: '100%',
              display: 'block',
            }}
            aria-label="Fragmented plates visualization"
          >
            {/* Background lines (the hidden data beneath) */}
            {backgroundLines.map((line, index) => {
              // Occasionally make a line briefly visible
              const shouldPulse = !prefersReducedMotion && inView && 
                Math.floor(Date.now() / 1000) % 5 === index % 5;
              
              return (
                <motion.line
                  key={`line-${index}`}
                  x1={line.x1}
                  y1={line.y1}
                  x2={line.x2}
                  y2={line.y2}
                  stroke={line.stroke}
                  strokeWidth={line.strokeWidth}
                  opacity={shouldPulse ? line.opacity * 0.5 : line.opacity * 0.2}
                  initial={{ opacity: line.opacity * 0.2 }}
                  animate={{ opacity: shouldPulse ? line.opacity * 0.5 : line.opacity * 0.2 }}
                  transition={{ duration: 0.3 }}
                />
              );
            })}
            
            {/* Plates with parallax */}
            {plates.map((plate, index) => {
              const offsetX = getParallaxOffset(index);
              const xValue = typeof offsetX === 'number' ? offsetX : offsetX.get();
              
              return (
                <motion.g
                  key={plate.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: xValue }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                >
                  <g transform={`translate(${plate.x}, ${plate.y}) rotate(${plate.rotation})`}>
                    {/* Plate base */}
                    <rect
                      x={0}
                      y={0}
                      width={plate.width}
                      height={plate.height}
                      fill={plate.color}
                      opacity={0.75}
                      rx={vizTokens.line.thin}
                      ry={vizTokens.line.thin}
                    />
                    
                    {/* Subtle highlight on left edge */}
                    <rect
                      x={0}
                      y={0}
                      width={plate.width * 0.2}
                      height={plate.height}
                      fill={tokens.color.paper}
                      opacity={0.08}
                      rx={vizTokens.line.thin}
                      ry={vizTokens.line.thin}
                    />
                    
                    {/* Thin border for definition */}
                    <rect
                      x={0}
                      y={0}
                      width={plate.width}
                      height={plate.height}
                      fill="none"
                      stroke={plate.color}
                      strokeWidth={0.25}
                      opacity={0.5}
                      rx={vizTokens.line.thin}
                      ry={vizTokens.line.thin}
                    />
                  </g>
                </motion.g>
              );
            })}
          </svg>
        </motion.div>
      )}
    </div>
  );
}

export default FragmentedPlates;
