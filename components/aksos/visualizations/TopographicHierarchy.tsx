// =============================================================================
// TOPOGRAPHIC HIERARCHY
// SVG-based visualization for Network section
// Represents relationships compounding geographically and structurally
// =============================================================================

'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { useReducedMotion } from './useReducedMotion';
import { vizTokens } from './visualizationTokens';
import { tokens } from '@/lib/tokens';

interface TopographicHierarchyProps {
  breakpoint?: 'mobile' | 'tablet' | 'desktop';
  className?: string;
  style?: React.CSSProperties;
}

// Seeded pseudo-random for deterministic generation
const seededRandom = (seed: number): number => {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
};

interface Node {
  id: string;
  x: number;
  y: number;
  size: number;
  layer: 'anchor' | 'primary' | 'secondary';
  color: string;
}

interface Connection {
  from: string;
  to: string;
  strength: number;
  layer: 'primary' | 'secondary';
}

export function TopographicHierarchy({
  breakpoint = 'desktop',
  className = '',
  style = {},
}: TopographicHierarchyProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const prefersReducedMotion = useReducedMotion();
  
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [nodes, setNodes] = useState<Node[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [animationStage, setAnimationStage] = useState(0);
  
  // Animation controls
  const controls = useAnimation();
  const inView = useInView(containerRef, { once: true, margin: '-100px' });
  
  // Generate network nodes
  const generateNodes = useCallback((width: number, height: number): Node[] => {
    const nodes: Node[] = [];
    const seed = vizTokens.seed * 6000;
    
    // Anchor node (center-right for desktop)
    const anchorX = width * 0.7;
    const anchorY = height * 0.7;
    
    nodes.push({
      id: 'anchor',
      x: anchorX,
      y: anchorY,
      size: vizTokens.topographicHierarchy.anchorSize,
      layer: 'anchor',
      color: tokens.color.ink,
    });
    
    // Primary nodes (first-order relationships)
    const primaryCount = vizTokens.topographicHierarchy.primaryNodeCount;
    const primaryRadius = width * 0.2;
    
    for (let i = 0; i < primaryCount; i++) {
      const seedValue = seed + i * 1000;
      const angle = (i / primaryCount) * Math.PI * 2;
      const distance = primaryRadius * (0.8 + seededRandom(seedValue) * 0.4);
      
      const x = anchorX + Math.cos(angle) * distance;
      const y = anchorY + Math.sin(angle) * distance;
      
      nodes.push({
        id: `primary-${i}`,
        x,
        y,
        size: 2 + seededRandom(seedValue + 1) * 1.5,
        layer: 'primary',
        color: tokens.color.muted,
      });
    }
    
    // Secondary nodes (distant relationships)
    const secondaryCount = vizTokens.topographicHierarchy.distantNodeCount;
    const secondaryRadius = width * 0.4;
    
    for (let i = 0; i < secondaryCount; i++) {
      const seedValue = seed + 10000 + i * 500;
      const angle = seededRandom(seedValue) * Math.PI * 2;
      const distance = secondaryRadius * (0.7 + seededRandom(seedValue + 1) * 0.6);
      
      const x = anchorX + Math.cos(angle) * distance;
      const y = anchorY + Math.sin(angle) * distance;
      
      nodes.push({
        id: `secondary-${i}`,
        x,
        y,
        size: 1 + seededRandom(seedValue + 2) * 1,
        layer: 'secondary',
        color: tokens.color.lineStrong,
      });
    }
    
    return nodes;
  }, []);
  
  // Generate connections
  const generateConnections = useCallback((nodes: Node[]): Connection[] => {
    const connections: Connection[] = [];
    const seed = vizTokens.seed * 7000;
    
    const anchor = nodes.find(n => n.layer === 'anchor');
    if (!anchor) return connections;
    
    // Primary connections (anchor to primary nodes)
    const primaryNodes = nodes.filter(n => n.layer === 'primary');
    primaryNodes.forEach((node, i) => {
      const seedValue = seed + i * 1000;
      connections.push({
        from: anchor.id,
        to: node.id,
        strength: 0.8 + seededRandom(seedValue) * 0.2,
        layer: 'primary',
      });
    });
    
    // Secondary connections (primary to secondary)
    const secondaryNodes = nodes.filter(n => n.layer === 'secondary');
    primaryNodes.forEach((primaryNode, i) => {
      // Connect each primary to a few secondaries
      const connectedCount = Math.floor(seededRandom(seed + i * 1000 + 500) * 3) + 1;
      const shuffledSecondary = [...secondaryNodes].sort(() => seededRandom(seed + i * 1000 + 1000) - 0.5);
      
      for (let j = 0; j < connectedCount && j < shuffledSecondary.length; j++) {
        const seedValue = seed + i * 1000 + j * 100;
        connections.push({
          from: primaryNode.id,
          to: shuffledSecondary[j].id,
          strength: 0.4 + seededRandom(seedValue) * 0.3,
          layer: 'secondary',
        });
      }
    });
    
    // Some direct anchor to secondary connections
    for (let i = 0; i < Math.min(5, secondaryNodes.length); i++) {
      const seedValue = seed + 5000 + i * 100;
      if (seededRandom(seedValue) > 0.5) {
        connections.push({
          from: anchor.id,
          to: secondaryNodes[i].id,
          strength: 0.3 + seededRandom(seedValue + 1) * 0.2,
          layer: 'secondary',
        });
      }
    }
    
    return connections;
  }, []);
  
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
      const newNodes = generateNodes(dimensions.width, dimensions.height);
      setNodes(newNodes);
      setConnections(generateConnections(newNodes));
    }
  }, [dimensions, generateNodes, generateConnections]);
  
  // Animation sequence
  useEffect(() => {
    if (inView && !prefersReducedMotion) {
      const timers: NodeJS.Timeout[] = [];
      
      // Stage 1: Anchor appears (0-300ms)
      timers.push(setTimeout(() => setAnimationStage(1), 100));
      
      // Stage 2: Primary connections draw (300-600ms)
      timers.push(setTimeout(() => setAnimationStage(2), 400));
      
      // Stage 3: Primary nodes appear (600-900ms)
      timers.push(setTimeout(() => setAnimationStage(3), 700));
      
      // Stage 4: Secondary connections draw (900-1200ms)
      timers.push(setTimeout(() => setAnimationStage(4), 1000));
      
      // Stage 5: Secondary nodes appear (1200-1500ms)
      timers.push(setTimeout(() => setAnimationStage(5), 1300));
      
      return () => {
        timers.forEach(timer => clearTimeout(timer));
      };
    } else if (inView && prefersReducedMotion) {
      // For reduced motion, show final state
      setAnimationStage(5);
    }
  }, [inView, prefersReducedMotion]);
  
  // Get container dimensions for SVG
  const svgWidth = dimensions.width || 800;
  const svgHeight = dimensions.height || 600;
  
  // Connection stroke width based on layer and strength
  const getConnectionStrokeWidth = (layer: Connection['layer'], strength: number) => {
    const baseWidth = layer === 'primary' 
      ? vizTokens.topographicHierarchy.primaryConnectionWidth
      : vizTokens.topographicHierarchy.secondaryConnectionWidth;
    return baseWidth * (0.8 + strength * 0.4);
  };
  
  // Connection opacity based on layer
  const getConnectionOpacity = (layer: Connection['layer'], strength: number) => {
    const baseOpacity = layer === 'primary' ? 0.6 : 0.25;
    return baseOpacity * (0.8 + strength * 0.4);
  };
  
  // Node opacity based on animation stage
  const getNodeOpacity = (node: Node) => {
    if (animationStage === 0) return 0;
    if (node.layer === 'anchor') return animationStage >= 1 ? 0.9 : 0;
    if (node.layer === 'primary') return animationStage >= 3 ? 0.7 : 0;
    if (node.layer === 'secondary') return animationStage >= 5 ? 0.4 : 0;
    return 0;
  };
  
  // Connection opacity based on animation stage
  const getConnectionVisibility = (conn: Connection) => {
    if (animationStage === 0) return false;
    if (conn.layer === 'primary') return animationStage >= 2;
    if (conn.layer === 'secondary') return animationStage >= 4;
    return false;
  };
  
  // Reduced motion fallback
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
      aria-label="Topographic hierarchy visualization"
    >
      {/* Connections */}
      {connections.map((conn, index) => {
        const fromNode = nodes.find(n => n.id === conn.from);
        const toNode = nodes.find(n => n.id === conn.to);
        
        if (!fromNode || !toNode) return null;
        
        return (
          <line
            key={`conn-${index}`}
            x1={fromNode.x}
            y1={fromNode.y}
            x2={toNode.x}
            y2={toNode.y}
            stroke={tokens.color.lineStrong}
            strokeWidth={getConnectionStrokeWidth(conn.layer, conn.strength)}
            opacity={getConnectionOpacity(conn.layer, conn.strength)}
          />
        );
      })}
      
      {/* Nodes */}
      {nodes.map((node) => (
        <circle
          key={node.id}
          cx={node.x}
          cy={node.y}
          r={node.size}
          fill={node.color}
          opacity={node.layer === 'anchor' ? 0.9 : node.layer === 'primary' ? 0.7 : 0.4}
        />
      ))}
    </svg>
  );
  
  // Adjust viewBox for mobile to show anchor
  const mobileViewBox = breakpoint === 'mobile' 
    ? `0 0 ${svgWidth} ${svgHeight}`
    : `0 0 ${svgWidth} ${svgHeight}`;
  
  // Mobile offset
  const mobileOffsetX = breakpoint === 'mobile' ? svgWidth * 0.3 : 0;
  
  return (
    <div
      ref={containerRef}
      className={`topographic-hierarchy ${className}`}
      style={{
        width: '100%',
        height: '100%',
        minHeight: breakpoint === 'mobile' ? '400px' : breakpoint === 'tablet' ? '50vh' : '60vh',
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
          transition={{ duration: 0.4, delay: 0.2 }}
          style={{ width: '100%', height: '100%' }}
        >
          <svg
            ref={svgRef}
            viewBox={mobileViewBox}
            preserveAspectRatio="xMidYMid meet"
            style={{
              width: '100%',
              height: '100%',
              display: 'block',
              transform: breakpoint === 'mobile' ? `translateX(-${mobileOffsetX}px)` : 'none',
            }}
            aria-label="Topographic hierarchy visualization"
          >
            {/* Definitions */}
            <defs>
              <filter id="anchor-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            
            {/* Connections - animated */}
            {connections.map((conn, index) => {
              const fromNode = nodes.find(n => n.id === conn.from);
              const toNode = nodes.find(n => n.id === conn.to);
              
              if (!fromNode || !toNode) return null;
              
              const isVisible = getConnectionVisibility(conn);
              const pathLength = Math.sqrt(
                Math.pow(toNode.x - fromNode.x, 2) + Math.pow(toNode.y - fromNode.y, 2)
              );
              
              return (
                <motion.line
                  key={`conn-${index}`}
                  x1={fromNode.x}
                  y1={fromNode.y}
                  x2={toNode.x}
                  y2={toNode.y}
                  stroke={tokens.color.lineStrong}
                  strokeWidth={getConnectionStrokeWidth(conn.layer, conn.strength)}
                  strokeDasharray={pathLength}
                  strokeDashoffset={isVisible ? 0 : pathLength}
                  opacity={isVisible ? getConnectionOpacity(conn.layer, conn.strength) : 0}
                  initial={{ strokeDashoffset: pathLength, opacity: 0 }}
                  animate={{ 
                    strokeDashoffset: isVisible ? 0 : pathLength,
                    opacity: isVisible ? getConnectionOpacity(conn.layer, conn.strength) : 0
                  }}
                  transition={{ 
                    duration: 0.4,
                    delay: conn.layer === 'primary' ? 0.4 + index * 0.05 : 1 + index * 0.02,
                    ease: 'easeOut'
                  }}
                />
              );
            })}
            
            {/* Nodes - animated */}
            {nodes.map((node, index) => {
              const opacity = getNodeOpacity(node);
              const scale = animationStage >= 1 && node.layer === 'anchor' ? 1 : 
                           animationStage >= 3 && node.layer === 'primary' ? 1 :
                           animationStage >= 5 && node.layer === 'secondary' ? 1 : 0;
              
              return (
                <motion.circle
                  key={node.id}
                  cx={node.x}
                  cy={node.y}
                  r={node.size}
                  fill={node.color}
                  opacity={opacity}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity, scale }}
                  transition={{ 
                    duration: node.layer === 'anchor' ? 0.4 : node.layer === 'primary' ? 0.3 : 0.2,
                    delay: node.layer === 'anchor' ? 0.1 : 
                           node.layer === 'primary' ? 0.7 + index * 0.02 : 1.3 + index * 0.01,
                    ease: vizTokens.easing.snap
                  }}
                />
              );
            })}
            
            {/* Anchor highlight */}
            {animationStage >= 1 && (
              <motion.circle
                cx={nodes.find(n => n.layer === 'anchor')?.x || svgWidth * 0.7}
                cy={nodes.find(n => n.layer === 'anchor')?.y || svgHeight * 0.7}
                r={vizTokens.topographicHierarchy.anchorSize * 1.5}
                fill="none"
                stroke={tokens.color.signal}
                strokeWidth={0.5}
                opacity={0.2}
                initial={{ opacity: 0, r: 0 }}
                animate={{ opacity: 0.2, r: vizTokens.topographicHierarchy.anchorSize * 1.5 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              />
            )}
          </svg>
        </motion.div>
      )}
    </div>
  );
}

export default TopographicHierarchy;
