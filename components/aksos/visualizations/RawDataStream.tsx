// =============================================================================
// RAW DATA STREAM
// Canvas-based visualization for Hero section
// Represents enormous, relentless, untamed market activity
// =============================================================================

'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useReducedMotion } from './useReducedMotion';
import { vizTokens } from './visualizationTokens';
import { tokens } from '@/lib/tokens';

interface RawDataStreamProps {
  breakpoint?: 'mobile' | 'tablet' | 'desktop';
  className?: string;
  style?: React.CSSProperties;
}

// Seeded pseudo-random number generator for deterministic generation
const seededRandom = (seed: number): number => {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
};

interface DataElement {
  type: 'dash' | 'bar' | 'longBar' | 'vertical' | 'dot';
  x: number;
  y: number;
  width: number;
  height: number;
  opacity: number;
  color: string;
  speed: number;
}

export function RawDataStream({
  breakpoint = 'desktop',
  className = '',
  style = {},
}: RawDataStreamProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  
  // State for canvas dimensions and animation
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [animationFrame, setAnimationFrame] = useState<number | null>(null);
  const [elements, setElements] = useState<DataElement[]>([]);
  
  // Determine if component is in viewport
  const checkVisibility = useCallback(() => {
    if (!containerRef.current || typeof window === 'undefined') return false;
    const rect = containerRef.current.getBoundingClientRect();
    return (
      rect.top < window.innerHeight &&
      rect.bottom > 0 &&
      rect.left < window.innerWidth &&
      rect.right > 0
    );
  }, []);

  // Generate data elements based on container size
  const generateElements = useCallback((width: number, height: number): DataElement[] => {
    const elements: DataElement[] = [];
    const seed = vizTokens.seed;
    
    // Density based on breakpoint
    const densityMultiplier = breakpoint === 'mobile' ? 0.6 : breakpoint === 'tablet' ? 0.8 : 1;
    const elementCount = Math.floor(width * height * 0.0002 * densityMultiplier);
    
    const colors = [
      tokens.color.ink,
      tokens.color.muted,
      tokens.color.lineStrong,
      tokens.color.signal,
      tokens.color.signalDark,
    ];
    
    const types: DataElement['type'][] = ['dash', 'bar', 'longBar', 'vertical', 'dot'];
    
    for (let i = 0; i < elementCount; i++) {
      const seedValue = seed + i * 1000;
      const rx = seededRandom(seedValue);
      const ry = seededRandom(seedValue + 1);
      const rType = seededRandom(seedValue + 2);
      const rSize = seededRandom(seedValue + 3);
      const rOpacity = seededRandom(seedValue + 4);
      const rColor = seededRandom(seedValue + 5);
      const rSpeed = seededRandom(seedValue + 6);
      
      // Position: extend beyond viewport to create bleeding effect
      const x = (rx * width * 1.5) - (width * 0.25);
      const y = (ry * height * 1.5) - (height * 0.25);
      
      // Type selection
      const type = types[Math.floor(rType * types.length)];
      
      // Size based on type
      let widthVal = 0;
      let heightVal = 0;
      
      switch (type) {
        case 'dash':
          widthVal = 2 + rSize * 3;
          heightVal = 0.5 + rSize * 0.5;
          break;
        case 'bar':
          widthVal = 5 + rSize * 8;
          heightVal = 1 + rSize * 1;
          break;
        case 'longBar':
          widthVal = 15 + rSize * 20;
          heightVal = 0.75 + rSize * 0.5;
          break;
        case 'vertical':
          widthVal = 0.75 + rSize * 0.5;
          heightVal = 3 + rSize * 5;
          break;
        case 'dot':
          widthVal = 0.5 + rSize * 1;
          heightVal = 0.5 + rSize * 1;
          break;
      }
      
      // Opacity: vary for depth
      const opacity = 0.3 + rOpacity * 0.7;
      
      // Color selection
      const color = colors[Math.floor(rColor * colors.length)];
      
      // Speed: subtle variation
      const speed = 0.05 + rSpeed * 0.1;
      
      elements.push({
        type,
        x,
        y,
        width: widthVal,
        height: heightVal,
        opacity,
        color,
        speed,
      });
    }
    
    return elements;
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
      setElements(generateElements(dimensions.width, dimensions.height));
    }
  }, [dimensions, generateElements]);

  // Handle visibility and animation
  useEffect(() => {
    const visibilityCheck = () => {
      const visible = checkVisibility();
      setIsVisible(visible);
    };
    
    visibilityCheck();
    window.addEventListener('scroll', visibilityCheck);
    window.addEventListener('resize', visibilityCheck);
    
    return () => {
      window.removeEventListener('scroll', visibilityCheck);
      window.removeEventListener('resize', visibilityCheck);
    };
  }, [checkVisibility]);

  // Animation loop
  useEffect(() => {
    let frameId: number;
    let startTime: number | null = null;
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      
      // Only animate if visible and not reduced motion
      if ((isVisible || prefersReducedMotion) && !prefersReducedMotion && elements.length > 0) {
        drawFrame(elapsed);
      }
      
      frameId = requestAnimationFrame(animate);
      setAnimationFrame(frameId);
    };
    
    const drawFrame = (elapsed: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw each element with offset based on elapsed time
      elements.forEach(element => {
        // Calculate horizontal offset (LEFT direction)
        const offsetX = (elapsed * element.speed) % (canvas.width + element.width);
        
        // Draw element at offset position
        ctx.globalAlpha = element.opacity;
        ctx.fillStyle = element.color;
        
        // Wrap around: if element goes off left, bring it back from right
        let drawX = element.x - offsetX;
        if (drawX + element.width < 0) {
          drawX = canvas.width + (element.x - offsetX);
        }
        
        // Draw based on type
        switch (element.type) {
          case 'dash':
          case 'bar':
          case 'longBar':
          case 'vertical':
            ctx.fillRect(drawX, element.y, element.width, element.height);
            break;
          case 'dot':
            ctx.beginPath();
            ctx.arc(drawX + element.width / 2, element.y + element.height / 2, 
                    element.width / 2, 0, Math.PI * 2);
            ctx.fill();
            break;
        }
      });
      
      // Reset alpha
      ctx.globalAlpha = 1;
    };
    
    frameId = requestAnimationFrame(animate);
    setAnimationFrame(frameId);
    
    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [elements, isVisible, prefersReducedMotion]);

  // Cleanup animation frame on unmount
  useEffect(() => {
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [animationFrame]);

  // Get canvas dimensions based on container
  const canvasWidth = dimensions.width || 800;
  const canvasHeight = dimensions.height || 600;
  
  // Device pixel ratio for crisp rendering
  const dpr = typeof window !== 'undefined' ? window.devicePixelRatio : 1;

  return (
    <div
      ref={containerRef}
      className={`raw-data-stream ${className}`}
      style={{
        width: '100%',
        height: '100%',
        minHeight: breakpoint === 'mobile' ? '400px' : '100%',
        overflow: 'hidden',
        position: 'relative',
        ...style,
      }}
    >
      {/* Canvas for animation */}
      <canvas
        ref={canvasRef}
        width={Math.round(canvasWidth * dpr)}
        height={Math.round(canvasHeight * dpr)}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
        }}
        aria-label="Raw data stream visualization"
      />
      
      {/* Static fallback for reduced motion */}
      {prefersReducedMotion && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(45deg, transparent 49%, rgba(138, 68, 50, 0.03) 50%, transparent 51%)',
            backgroundSize: '20px 20px',
          }}
        />
      )}
    </div>
  );
}

export default RawDataStream;
