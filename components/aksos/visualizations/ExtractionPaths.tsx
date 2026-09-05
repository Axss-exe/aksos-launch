// =============================================================================
// EXTRACTION PATHS
// SVG-based visualization for ATIS Use Cases section
// Shows: A large intelligence system being queried, specific intelligence extracted
// =============================================================================

'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { useReducedMotion } from './useReducedMotion';
import { vizTokens } from './visualizationTokens';
import { tokens } from '@/lib/tokens';

interface ExtractionPathsProps {
  breakpoint?: 'mobile' | 'tablet' | 'desktop';
  cardCount?: number;
  className?: string;
  style?: React.CSSProperties;
}

// Seeded pseudo-random for deterministic generation
const seededRandom = (seed: number): number => {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
};

interface PathPoint {
  x: number;
  y: number;
}

interface ExtractionPath {
  id: string;
  spineIndex: number;
  points: PathPoint[];
  cardIndex: number;
  isActive: boolean;
}

export function ExtractionPaths({
  breakpoint = 'desktop',
  cardCount = 3,
  className = '',
  style = {},
}: ExtractionPathsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const prefersReducedMotion = useReducedMotion();
  
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [paths, setPaths] = useState<ExtractionPath[]>([]);
  const [activePathIndex, setActivePathIndex] = useState<number | null>(null);
  
  // Animation controls
  const controls = useAnimation();
  const inView = useInView(containerRef, { once: true, margin: '-100px' });
  
  // Generate extraction paths
  const generatePaths = useCallback((width: number, height: number): ExtractionPath[] => {
    const paths: ExtractionPath[] = [];
    const seed = vizTokens.seed * 5000;
    
    // Spine runs vertically on the left side
    const spineX = width * 0.15;
    const spineTop = height * 0.1;
    const spineBottom = height * 0.9;
    const spineLength = spineBottom - spineTop;
    
    // Card positions (staggered)
    const cardPositions = [];
    const cardSpacing = height / (cardCount + 1);
    
    for (let i = 0; i < cardCount; i++) {
      cardPositions.push({
        x: width * 0.85,
        y: (i + 1) * cardSpacing,
      });
    }
    
    // Generate paths from spine to each card
    for (let i = 0; i < cardCount; i++) {
      const seedValue = seed + i * 10000;
      const cardPos = cardPositions[i];
      
      // Spine connection point (distributed along spine)
      const spineY = spineTop + (i / cardCount) * spineLength;
      
      // Generate path points
      const points: PathPoint[] = [
        { x: spineX, y: spineY },
      ];
      
      // Add intermediate points for organic feel
      const intermediateCount = breakpoint === 'mobile' ? 1 : breakpoint === 'tablet' ? 2 : 3;
      for (let j = 0; j < intermediateCount; j++) {
        const progress = (j + 1) / (intermediateCount + 1);
        const x = spineX + (cardPos.x - spineX) * progress;
        const y = spineY + (cardPos.y - spineY) * progress;
        
        // Add slight variation
        const variationX = (seededRandom(seedValue + j * 100) - 0.5) * width * 0.05;
        const variationY = (seededRandom(seedValue + j * 100 + 1) - 0.5) * height * 0.05;
        
        points.push({
          x: x + variationX,
          y: y + variationY,
        });
      }
      
      // End at card
      points.push({ x: cardPos.x, y: cardPos.y });
      
      paths.push({
        id: `path-${i}`,
        spineIndex: i,
        points,
        cardIndex: i,
        isActive: false,
      });
    }
    
    return paths;
  }, [breakpoint, cardCount]);
  
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
  
  // Generate paths when dimensions change
  useEffect(() => {
    if (dimensions.width > 0 && dimensions.height > 0) {
      setPaths(generatePaths(dimensions.width, dimensions.height));
    }
  }, [dimensions, generatePaths]);
  
  // Animation sequence: activate paths one by one
  useEffect(() => {
    if (inView && !prefersReducedMotion) {
      const timers: NodeJS.Timeout[] = [];
      
      // Activate paths sequentially
      paths.forEach((_, index) => {
        const timer = setTimeout(() => {
          setActivePathIndex(index);
        }, 300 + index * 600);
        timers.push(timer);
      });
      
      return () => {
        timers.forEach(timer => clearTimeout(timer));
      };
    } else if (inView && prefersReducedMotion) {
      // For reduced motion, activate all paths immediately
      setActivePathIndex(paths.length - 1);
    }
  }, [inView, paths, prefersReducedMotion]);
  
  // Get container dimensions for SVG
  const svgWidth = dimensions.width || 600;
  const svgHeight = dimensions.height || 400;
  
  // Get path d attribute
  const getPathD = (path: ExtractionPath): string => {
    if (path.points.length < 2) return '';
    
    let d = `M ${path.points[0].x} ${path.points[0].y}`;
    
    // Use smooth curves for intermediate points
    for (let i = 1; i < path.points.length; i++) {
      const prev = path.points[i - 1];
      const curr = path.points[i];
      
      // Control points for smooth curve
      const cp1x = prev.x + (curr.x - prev.x) * 0.3;
      const cp1y = prev.y + (curr.y - prev.y) * 0.3;
      const cp2x = curr.x - (curr.x - prev.x) * 0.3;
      const cp2y = curr.y - (curr.y - prev.y) * 0.3;
      
      d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${curr.x} ${curr.y}`;
    }
    
    return d;
  };
  
  // Calculate path length for stroke-dasharray animation
  const getPathLength = (path: ExtractionPath): number => {
    let length = 0;
    for (let i = 1; i < path.points.length; i++) {
      const dx = path.points[i].x - path.points[i - 1].x;
      const dy = path.points[i].y - path.points[i - 1].y;
      length += Math.sqrt(dx * dx + dy * dy);
    }
    return length;
  };
  
  // Spine path
  const getSpinePath = (): string => {
    if (paths.length === 0) return '';
    
    const spineX = svgWidth * 0.15;
    const spineTop = svgHeight * 0.1;
    const spineBottom = svgHeight * 0.9;
    
    return `M ${spineX} ${spineTop} L ${spineX} ${spineBottom}`;
  };
  
  // Mobile: don't render paths
  if (breakpoint === 'mobile') {
    return null;
  }
  
  return (
    <div
      ref={containerRef}
      className={`extraction-paths ${className}`}
      style={{
        width: '100%',
        height: '100%',
        minHeight: breakpoint === 'tablet' ? '400px' : '100%',
        overflow: 'hidden',
        position: 'absolute',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 0,
        ...style,
      }}
    >
      {prefersReducedMotion ? (
        <svg
          ref={svgRef}
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          preserveAspectRatio="xMidYMid meet"
          style={{
            width: '100%',
            height: '100%',
            display: 'block',
          }}
          aria-label="Extraction paths visualization"
        >
          {/* Spine */}
          <path
            d={getSpinePath()}
            fill="none"
            stroke={tokens.color.lineStrong}
            strokeWidth={vizTokens.extractionPaths.spineWidth}
            opacity={0.5}
          />
          
          {/* All paths visible */}
          {paths.map((path) => (
            <path
              key={path.id}
              d={getPathD(path)}
              fill="none"
              stroke={tokens.color.lineStrong}
              strokeWidth={vizTokens.extractionPaths.pathWidth}
              opacity={0.4}
            />
          ))}
        </svg>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
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
            aria-label="Extraction paths visualization"
          >
            {/* Spine - appears first */}
            <motion.path
              d={getSpinePath()}
              fill="none"
              stroke={tokens.color.lineStrong}
              strokeWidth={vizTokens.extractionPaths.spineWidth}
              opacity={0.5}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            />
            
            {/* Extraction paths - reveal sequentially */}
            {paths.map((path, index) => {
              const isActive = activePathIndex !== null && index <= activePathIndex;
              const pathLength = getPathLength(path);
              
              return (
                <motion.path
                  key={path.id}
                  d={getPathD(path)}
                  fill="none"
                  stroke={tokens.color.signal}
                  strokeWidth={vizTokens.extractionPaths.pathWidth}
                  strokeDasharray={pathLength}
                  strokeDashoffset={isActive ? 0 : pathLength}
                  opacity={isActive ? 0.6 : 0.1}
                  initial={{ strokeDashoffset: pathLength, opacity: 0.1 }}
                  animate={{ 
                    strokeDashoffset: isActive ? 0 : pathLength,
                    opacity: isActive ? 0.6 : 0.1
                  }}
                  transition={{ 
                    duration: vizTokens.extractionPaths.revealDuration,
                    delay: 0.3 + index * vizTokens.extractionPaths.revealStagger,
                    ease: 'easeOut'
                  }}
                />
              );
            })}
            
            {/* Path endpoints at cards */}
            {paths.map((path, index) => {
              const isActive = activePathIndex !== null && index <= activePathIndex;
              const endpoint = path.points[path.points.length - 1];
              
              return (
                <motion.circle
                  key={`endpoint-${path.id}`}
                  cx={endpoint.x}
                  cy={endpoint.y}
                  r={2}
                  fill={tokens.color.signal}
                  opacity={isActive ? 0.8 : 0.2}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: isActive ? 0.8 : 0.2,
                    scale: isActive ? 1 : 0
                  }}
                  transition={{ 
                    duration: 0.3,
                    delay: 0.4 + index * vizTokens.extractionPaths.revealStagger
                  }}
                />
              );
            })}
          </svg>
        </motion.div>
      )}
    </div>
  );
}

export default ExtractionPaths;
