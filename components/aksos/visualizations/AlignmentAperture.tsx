// =============================================================================
// ALIGNMENT APERTURE
// SVG-based visualization for AKSOS section
// Demonstrates: Chaos becomes legible
// Two states: OUTSIDE (chaotic) -> INSIDE (resolved)
// =============================================================================

'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { useReducedMotion } from './useReducedMotion';
import { vizTokens } from './visualizationTokens';
import { tokens } from '@/lib/tokens';

interface AlignmentApertureProps {
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
  category: string;
  resolvedX: number;
  resolvedY: number;
}

interface Connection {
  from: string;
  to: string;
  strength: number;
}

export function AlignmentAperture({
  breakpoint = 'desktop',
  className = '',
  style = {},
}: AlignmentApertureProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const prefersReducedMotion = useReducedMotion();
  
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [nodes, setNodes] = useState<Node[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [isResolved, setIsResolved] = useState(false);
  
  // Animation controls
  const controls = useAnimation();
  const inView = useInView(containerRef, { once: true, margin: '-100px' });
  
  // Generate nodes in chaotic and resolved states
  const generateNodes = useCallback((width: number, height: number): Node[] => {
    const nodes: Node[] = [];
    const seed = vizTokens.seed * 3000;
    
    // Number of nodes
    const nodeCount = breakpoint === 'mobile' ? 30 : breakpoint === 'tablet' ? 40 : 50;
    
    const categories = ['primary', 'secondary', 'tertiary'];
    const categoryColors = {
      primary: tokens.color.ink,
      secondary: tokens.color.muted,
      tertiary: tokens.color.lineStrong,
    };
    
    // Grid for resolved state
    const gridCols = breakpoint === 'mobile' ? 5 : breakpoint === 'tablet' ? 6 : 8;
    const gridRows = Math.ceil(nodeCount / gridCols);
    const cellWidth = width / gridCols;
    const cellHeight = height / gridRows;
    
    for (let i = 0; i < nodeCount; i++) {
      const seedValue = seed + i * 5000;
      
      // Category
      const category = categories[Math.floor(seededRandom(seedValue) * categories.length)];
      
      // Chaotic (initial) position
      const chaoticX = seededRandom(seedValue + 1) * width;
      const chaoticY = seededRandom(seedValue + 2) * height;
      
      // Resolved (grid) position
      const col = i % gridCols;
      const row = Math.floor(i / gridCols);
      const resolvedX = col * cellWidth + cellWidth / 2;
      const resolvedY = row * cellHeight + cellHeight / 2;
      
      // Size based on category
      const baseSize = category === 'primary' ? 3 : category === 'secondary' ? 2 : 1.5;
      const size = baseSize * (0.8 + seededRandom(seedValue + 3) * 0.4);
      
      nodes.push({
        id: `node-${i}`,
        x: chaoticX,
        y: chaoticY,
        size,
        category,
        resolvedX,
        resolvedY,
      });
    }
    
    return nodes;
  }, [breakpoint]);
  
  // Generate connections
  const generateConnections = useCallback((nodes: Node[]): Connection[] => {
    const connections: Connection[] = [];
    const seed = vizTokens.seed * 4000;
    
    // Create connections between nodes that are close in resolved state
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const n1 = nodes[i];
        const n2 = nodes[j];
        
        // Distance in resolved grid
        const dx = n1.resolvedX - n2.resolvedX;
        const dy = n1.resolvedY - n2.resolvedY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Connect nodes that are adjacent or close in the grid
        if (distance < Math.min(dimensions.width, dimensions.height) * 0.15) {
          const seedValue = seed + i * 1000 + j;
          const strength = 0.5 + seededRandom(seedValue) * 0.5;
          
          // Only create some connections
          if (seededRandom(seedValue + 1) > 0.3) {
            connections.push({
              from: n1.id,
              to: n2.id,
              strength,
            });
          }
        }
      }
    }
    
    return connections;
  }, [dimensions]);
  
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
  
  // Trigger animation sequence when in view
  useEffect(() => {
    if (inView && !prefersReducedMotion) {
      // Animate all nodes to resolved positions
      const nodeAnimations = nodes.map(node => ({
        x: node.resolvedX,
        y: node.resolvedY,
      }));
      // Use a simpler approach - just set isResolved after a delay
      const timer = setTimeout(() => {
        setIsResolved(true);
      }, 500);
      return () => clearTimeout(timer);
    } else if (inView && prefersReducedMotion) {
      // For reduced motion, just show resolved state
      setIsResolved(true);
    }
  }, [inView, nodes, prefersReducedMotion]);
  
  // Get container dimensions for SVG
  const svgWidth = dimensions.width || 600;
  const svgHeight = dimensions.height || 600;
  
  // Aperture dimensions (circular or rectangular)
  const apertureSize = Math.min(svgWidth, svgHeight) * 0.6;
  const apertureX = (svgWidth - apertureSize) / 2;
  const apertureY = (svgHeight - apertureSize) / 2;
  
  // Category colors
  const categoryColors = {
    primary: tokens.color.ink,
    secondary: tokens.color.muted,
    tertiary: tokens.color.lineStrong,
  };
  
  // Connection stroke width based on strength
  const getConnectionStrokeWidth = (strength: number) => {
    return 0.5 + strength * 1.5;
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
      aria-label="Alignment aperture visualization"
    >
      {/* Aperture (mask) */}
      <defs>
        <clipPath id="aperture-clip">
          <circle cx={svgWidth / 2} cy={svgHeight / 2} r={apertureSize / 2} />
        </clipPath>
      </defs>
      
      {/* Background */}
      <rect
        x={0}
        y={0}
        width={svgWidth}
        height={svgHeight}
        fill={tokens.color.background}
      />
      
      {/* Connections */}
      <g clipPath="url(#aperture-clip)">
        {connections.map((conn, index) => {
          const fromNode = nodes.find(n => n.id === conn.from);
          const toNode = nodes.find(n => n.id === conn.to);
          
          if (!fromNode || !toNode) return null;
          
          return (
            <line
              key={`conn-${index}`}
              x1={fromNode.resolvedX}
              y1={fromNode.resolvedY}
              x2={toNode.resolvedX}
              y2={toNode.resolvedY}
              stroke={tokens.color.lineStrong}
              strokeWidth={getConnectionStrokeWidth(conn.strength)}
              opacity={0.3 + conn.strength * 0.4}
            />
          );
        })}
        
        {/* Nodes */}
        {nodes.map(node => {
          const color = categoryColors[node.category as keyof typeof categoryColors];
          return (
            <circle
              key={node.id}
              cx={node.resolvedX}
              cy={node.resolvedY}
              r={node.size}
              fill={color}
              opacity={0.8}
            />
          );
        })}
      </g>
      
      {/* Aperture border */}
      <circle
        cx={svgWidth / 2}
        cy={svgHeight / 2}
        r={apertureSize / 2}
        fill="none"
        stroke={tokens.color.line}
        strokeWidth={0.5}
        opacity={0.5}
      />
    </svg>
  );
  
  return (
    <div
      ref={containerRef}
      className={`alignment-aperture ${className}`}
      style={{
        width: '100%',
        height: '100%',
        minHeight: breakpoint === 'mobile' ? '350px' : breakpoint === 'tablet' ? '450px' : '50vw',
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
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            preserveAspectRatio="xMidYMid meet"
            style={{
              width: '100%',
              height: '100%',
              display: 'block',
            }}
            aria-label="Alignment aperture visualization"
          >
            {/* Definitions */}
            <defs>
              {/* Aperture clip path */}
              <clipPath id="aperture-clip">
                <circle cx={svgWidth / 2} cy={svgHeight / 2} r={apertureSize / 2} />
              </clipPath>
              
              {/* Glow filter for connections */}
              <filter id="connection-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="1" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            
            {/* Background */}
            <rect
              x={0}
              y={0}
              width={svgWidth}
              height={svgHeight}
              fill={tokens.color.background}
            />
            
            {/* OUTSIDE: Chaotic nodes and connections (unclipped) */}
            <g opacity={isResolved ? 0.1 : 1}>
              {/* Chaotic connections */}
              {connections.map((conn, index) => {
                const fromNode = nodes.find(n => n.id === conn.from);
                const toNode = nodes.find(n => n.id === conn.to);
                
                if (!fromNode || !toNode) return null;
                
                return (
                  <motion.line
                    key={`chaotic-conn-${index}`}
                    x1={fromNode.x}
                    y1={fromNode.y}
                    x2={toNode.x}
                    y2={toNode.y}
                    stroke={tokens.color.lineStrong}
                    strokeWidth={getConnectionStrokeWidth(conn.strength) * 0.5}
                    opacity={0.1 + conn.strength * 0.2}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.1 + conn.strength * 0.2 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  />
                );
              })}
              
              {/* Chaotic nodes */}
              {nodes.map(node => {
                const color = categoryColors[node.category as keyof typeof categoryColors];
                return (
                  <motion.circle
                    key={`chaotic-${node.id}`}
                    cx={node.x}
                    cy={node.y}
                    r={node.size}
                    fill={color}
                    opacity={0.4}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 0.4, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                  />
                );
              })}
            </g>
            
            {/* INSIDE: Resolved nodes and connections (clipped by aperture) */}
            <g clipPath="url(#aperture-clip)">
              {/* Resolved connections */}
              {connections.map((conn, index) => {
                const fromNode = nodes.find(n => n.id === conn.from);
                const toNode = nodes.find(n => n.id === conn.to);
                
                if (!fromNode || !toNode) return null;
                
                return (
                  <motion.line
                    key={`resolved-conn-${index}`}
                    x1={fromNode.x}
                    y1={fromNode.y}
                    x2={toNode.x}
                    y2={toNode.y}
                    stroke={tokens.color.lineStrong}
                    strokeWidth={getConnectionStrokeWidth(conn.strength)}
                    opacity={0.2 + conn.strength * 0.4}
                    initial={{ opacity: 0, pathLength: 0 }}
                    animate={{ 
                      opacity: isResolved ? 0.2 + conn.strength * 0.4 : 0,
                      pathLength: isResolved ? 1 : 0
                    }}
                    transition={{ 
                      duration: 0.4,
                      delay: 0.3 + index * 0.01,
                      ease: vizTokens.easing.snap
                    }}
                  />
                );
              })}
              
              {/* Resolved nodes */}
              {nodes.map((node, index) => {
                const color = categoryColors[node.category as keyof typeof categoryColors];
                return (
                  <motion.circle
                    key={`resolved-${node.id}`}
                    cx={node.x}
                    cy={node.y}
                    r={node.size}
                    fill={color}
                    opacity={0.7}
                    initial={{ opacity: 0, scale: 0, x: node.x, y: node.y }}
                    animate={{ 
                      opacity: isResolved ? 0.7 : 0,
                      scale: isResolved ? 1 : 0,
                      x: isResolved ? node.resolvedX : node.x,
                      y: isResolved ? node.resolvedY : node.y,
                    }}
                    transition={{ 
                      duration: 0.4,
                      delay: 0.2 + index * 0.005,
                      ease: vizTokens.easing.snap
                    }}
                  />
                );
              })}
            </g>
            
            {/* Aperture border */}
            <motion.circle
              cx={svgWidth / 2}
              cy={svgHeight / 2}
              r={apertureSize / 2}
              fill="none"
              stroke={tokens.color.line}
              strokeWidth={0.5}
              opacity={0.5}
              initial={{ opacity: 0, r: 0 }}
              animate={{ opacity: 0.5, r: apertureSize / 2 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            />
          </svg>
        </motion.div>
      )}
    </div>
  );
}

export default AlignmentAperture;
