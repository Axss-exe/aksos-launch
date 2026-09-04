'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useState, useMemo, useEffect } from 'react';
import { tokens } from '@/lib/tokens';

// =============================================================================
// HERO NETWORK DIAGRAM
// 
// Visual System:
// - Operator at center (YOU)
// - Surrounding: organizations, institutions, companies, capital, information, relationships
// - Mathematically aligned relationships
// - No overlapping labels
// - No arbitrary lines
// - No decorative nodes
//
// The visual should communicate:
// "the operator remains the center; AKSOS strengthens the system around them."
// =============================================================================

interface Point {
  x: number;
  y: number;
}

interface NodeConfig {
  id: string;
  label: string;
  category: string;
  ring: number;
  angle: number;
  radius: number;
}

// Configuration
const CENTER = { x: 50, y: 50 };
const CENTER_RADIUS = 6;
const RINGS = [
  { radius: 22, nodeRadius: 2.5 },
  { radius: 34, nodeRadius: 2.2 },
  { radius: 46, nodeRadius: 2 },
];

// Node definitions with meaningful hierarchy
const NODES: NodeConfig[] = [
  // Inner ring - Direct connections
  { id: 'operator', label: 'YOU', category: 'operator', ring: 0, angle: 0, radius: CENTER_RADIUS },
  
  // Ring 1 - Core system elements
  { id: 'relationships', label: 'RELATIONSHIPS', category: 'system', ring: 1, angle: 0, radius: RINGS[0].radius },
  { id: 'information', label: 'INFORMATION', category: 'system', ring: 1, angle: Math.PI * 2 / 3, radius: RINGS[0].radius },
  { id: 'capital', label: 'CAPITAL', category: 'system', ring: 1, angle: Math.PI * 4 / 3, radius: RINGS[0].radius },
  
  // Ring 2 - Organizations and entities
  { id: 'organizations', label: 'ORGANIZATIONS', category: 'entity', ring: 2, angle: Math.PI / 4, radius: RINGS[1].radius },
  { id: 'institutions', label: 'INSTITUTIONS', category: 'entity', ring: 2, angle: Math.PI * 3 / 4, radius: RINGS[1].radius },
  { id: 'companies', label: 'COMPANIES', category: 'entity', ring: 2, angle: Math.PI * 5 / 4, radius: RINGS[1].radius },
  { id: 'government', label: 'GOVERNMENT', category: 'entity', ring: 2, angle: Math.PI * 7 / 4, radius: RINGS[1].radius },
  
  // Ring 3 - External factors
  { id: 'markets', label: 'MARKETS', category: 'external', ring: 3, angle: Math.PI / 6, radius: RINGS[2].radius },
  { id: 'policy', label: 'POLICY', category: 'external', ring: 3, angle: Math.PI / 2, radius: RINGS[2].radius },
  { id: 'opportunities', label: 'OPPORTUNITIES', category: 'external', ring: 3, angle: Math.PI * 5 / 6, radius: RINGS[2].radius },
  { id: 'trade', label: 'TRADE', category: 'external', ring: 3, angle: Math.PI * 7 / 6, radius: RINGS[2].radius },
  { id: 'investment', label: 'INVESTMENT', category: 'external', ring: 3, angle: Math.PI * 11 / 6, radius: RINGS[2].radius },
];

// Category colors
const CATEGORY_COLORS = {
  operator: tokens.color.signal,
  system: tokens.color.green,
  entity: tokens.color.ink,
  external: tokens.color.muted,
};

// Calculate node positions
function calculateNodePositions(width: number, height: number): Point[] {
  const centerX = width / 2;
  const centerY = height / 2;
  
  return NODES.map(node => {
    if (node.ring === 0) {
      return { x: centerX, y: centerY };
    }
    
    const ring = RINGS[node.ring - 1];
    const x = centerX + Math.cos(node.angle) * ring.radius * (width / 100);
    const y = centerY + Math.sin(node.angle) * ring.radius * (height / 100);
    
    return { x, y };
  });
}

// Check if line intersects with exclusion zone
function lineIntersectsCircle(
  from: Point,
  to: Point,
  center: Point,
  radius: number
): boolean {
  // Simplified check - if line passes within radius of center
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const lineLength = Math.sqrt(dx * dx + dy * dy);
  
  if (lineLength === 0) return false;
  
  // Distance from center to line
  const u = ((center.x - from.x) * dx + (center.y - from.y) * dy) / (lineLength * lineLength);
  
  if (u < 0 || u > 1) return false;
  
  const closestX = from.x + u * dx;
  const closestY = from.y + u * dy;
  
  const distance = Math.sqrt(
    Math.pow(closestX - center.x, 2) + Math.pow(closestY - center.y, 2)
  );
  
  return distance < radius;
}

// Generate curved path to avoid center
function generateCurvedPath(
  from: Point,
  to: Point,
  center: Point,
  radius: number,
  curvature: number = 0.5
): string {
  const midX = (from.x + to.x) / 2;
  const midY = (from.y + to.y) / 2;
  
  // Calculate control point to curve around center
  const angle = Math.atan2(to.y - from.y, to.x - from.x);
  const perpendicular = angle + Math.PI / 2;
  
  // Adjust control point based on position relative to center
  let controlX = midX;
  let controlY = midY;
  
  if (lineIntersectsCircle(from, to, center, radius)) {
    // Curve away from center
    const direction = Math.sign(
      (from.y - center.y) * (to.x - center.x) - (from.x - center.x) * (to.y - center.y)
    );
    const offset = radius * 0.8 * direction;
    controlX = midX + Math.cos(perpendicular) * offset;
    controlY = midY + Math.sin(perpendicular) * offset;
  }
  
  return `M ${from.x} ${from.y} Q ${controlX} ${controlY}, ${to.x} ${to.y}`;
}

// Node component
function DiagramNode({
  x,
  y,
  r,
  label,
  labelPosition = 'bottom',
  labelOffset = 8,
  fill,
  stroke,
  strokeWidth = 0.3,
  isCenter = false,
  delay = 0,
}: {
  x: number;
  y: number;
  r: number;
  label: string;
  labelPosition?: 'top' | 'bottom' | 'left' | 'right';
  labelOffset?: number;
  fill: string;
  stroke?: string;
  strokeWidth?: number;
  isCenter?: boolean;
  delay?: number;
}) {
  const labelX = useMemo(() => {
    switch (labelPosition) {
      case 'top':
      case 'bottom':
        return x;
      case 'left':
        return x - labelOffset - 20;
      case 'right':
        return x + labelOffset + 20;
      default:
        return x;
    }
  }, [x, labelPosition, labelOffset]);

  const labelY = useMemo(() => {
    switch (labelPosition) {
      case 'top':
        return y - labelOffset;
      case 'bottom':
        return y + labelOffset;
      case 'left':
      case 'right':
        return y;
      default:
        return y + labelOffset;
    }
  }, [y, labelPosition, labelOffset]);

  const textAnchor = useMemo(() => {
    switch (labelPosition) {
      case 'top':
      case 'bottom':
        return 'middle';
      case 'left':
        return 'end';
      case 'right':
        return 'start';
      default:
        return 'middle';
    }
  }, [labelPosition]);

  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ 
        duration: tokens.animation.duration.normal, 
        delay: delay + (isCenter ? 0.1 : 0.2)
      }}
      whileHover={{ scale: 1.2 }}
    >
      {/* Node circle */}
      <circle
        cx={x}
        cy={y}
        r={r}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
      
      {/* Label */}
      <motion.text
        x={labelX}
        y={labelY}
        textAnchor={textAnchor}
        fontSize="4"
        fontFamily={tokens.font.mono}
        fill={isCenter ? tokens.color.signal : tokens.color.muted}
        letterSpacing="0.05em"
        initial={{ opacity: 0, y: labelPosition === 'top' ? -10 : 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ 
          duration: tokens.animation.duration.normal, 
          delay: delay + (isCenter ? 0.2 : 0.3)
        }}
      >
        {label}
      </motion.text>
    </motion.g>
  );
}

// Connection component
function DiagramConnection({
  from,
  to,
  stroke,
  strokeWidth = 0.2,
  curved = false,
  delay = 0,
}: {
  from: Point;
  to: Point;
  stroke: string;
  strokeWidth?: number;
  curved?: boolean;
  delay?: number;
}) {
  if (curved) {
    const path = generateCurvedPath(from, to, CENTER, CENTER_RADIUS + 4);
    
    return (
      <motion.path
        d={path}
        fill="none"
        stroke={stroke}
        strokeWidth={strokeWidth}
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ 
          duration: tokens.animation.duration.normal, 
          delay: delay + 0.3
        }}
      />
    );
  }
  
  return (
    <motion.line
      x1={from.x}
      y1={from.y}
      x2={to.x}
      y2={to.y}
      stroke={stroke}
      strokeWidth={strokeWidth}
      initial={{ pathLength: 0, opacity: 0 }}
      whileInView={{ pathLength: 1, opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ 
        duration: tokens.animation.duration.normal, 
        delay: delay + 0.3
      }}
    />
  );
}

// Breakpoint hook
function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  
  useEffect(() => {
    const checkBreakpoint = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setBreakpoint('mobile');
      } else if (width < 1024) {
        setBreakpoint('tablet');
      } else {
        setBreakpoint('desktop');
      }
    };
  
    checkBreakpoint();
    window.addEventListener('resize', checkBreakpoint);
    return () => window.removeEventListener('resize', checkBreakpoint);
  }, []);
  
  return breakpoint;
}

// Mobile layout - simplified vertical stack
function MobileHeroNetwork({ width, height }: { width: number; height: number }) {
  const centerX = width / 2;
  const startY = height * 0.2;
  const spacing = height * 0.08;
  
  // Stack nodes vertically
  let y = startY;
  
  const positions = [
    { x: centerX, y, node: NODES[0] }, // Operator
    { x: centerX, y: y + spacing, node: NODES[1] }, // Relationships
    { x: centerX, y: y + spacing * 2, node: NODES[2] }, // Information
    { x: centerX, y: y + spacing * 3, node: NODES[3] }, // Capital
    { x: centerX, y: y + spacing * 4, node: NODES[4] }, // Organizations
    { x: centerX, y: y + spacing * 5, node: NODES[5] }, // Institutions
    { x: centerX, y: y + spacing * 6, node: NODES[6] }, // Companies
    { x: centerX, y: y + spacing * 7, node: NODES[7] }, // Government
  ];
  
  return (
    <>
      {/* Connections */}
      {positions.slice(1).map((pos, index) => {
        const from = positions[0];
        const to = pos;
        return (
          <DiagramConnection
            key={`conn-mobile-${index}`}
            from={{ x: from.x, y: from.y }}
            to={{ x: to.x, y: to.y }}
            stroke={tokens.color.line}
            strokeWidth={0.2}
            curved={false}
            delay={index * 0.05}
          />
        );
      })}
      
      {/* Nodes */}
      {positions.map((pos, index) => {
        const node = pos.node;
        const category = node.category as keyof typeof CATEGORY_COLORS;
        return (
          <DiagramNode
            key={node.id}
            x={pos.x}
            y={pos.y}
            r={node.ring === 0 ? CENTER_RADIUS : RINGS[node.ring - 1]?.nodeRadius || 2}
            label={node.label}
            labelPosition="bottom"
            labelOffset={6}
            fill={CATEGORY_COLORS[category]}
            stroke={tokens.color.line}
            isCenter={node.ring === 0}
            delay={index * 0.05}
          />
        );
      })}
    </>
  );
}

// Desktop layout - full network
function DesktopHeroNetwork({ width, height }: { width: number; height: number }) {
  const positions = calculateNodePositions(width, height);
  const centerPos = positions[0];
  
  return (
    <>
      {/* Connections from center to all nodes */}
      {positions.slice(1).map((to, index) => {
        const node = NODES[index + 1];
        const curved = lineIntersectsCircle(centerPos, to, CENTER, CENTER_RADIUS + 4);
        
        return (
          <DiagramConnection
            key={`conn-${node.id}`}
            from={centerPos}
            to={to}
            stroke={tokens.color.line}
            strokeWidth={0.2}
            curved={curved}
            delay={index * 0.03}
          />
        );
      })}
      
      {/* Nodes */}
      {positions.map((pos, index) => {
        const node = NODES[index];
        const category = node.category as keyof typeof CATEGORY_COLORS;
        
        // Determine label position based on angle
        let labelPosition: 'top' | 'bottom' | 'left' | 'right' = 'bottom';
        if (node.ring > 0) {
          const angle = NODES[index].angle;
          if (angle > Math.PI / 4 && angle < Math.PI * 3 / 4) {
            labelPosition = 'bottom';
          } else if (angle > Math.PI * 3 / 4 && angle < Math.PI * 5 / 4) {
            labelPosition = 'left';
          } else if (angle > Math.PI * 5 / 4 && angle < Math.PI * 7 / 4) {
            labelPosition = 'top';
          } else {
            labelPosition = 'right';
          }
        }
        
        return (
          <DiagramNode
            key={node.id}
            x={pos.x}
            y={pos.y}
            r={node.ring === 0 ? CENTER_RADIUS : RINGS[node.ring - 1]?.nodeRadius || 2}
            label={node.label}
            labelPosition={labelPosition}
            labelOffset={node.ring === 0 ? 10 : 6}
            fill={CATEGORY_COLORS[category]}
            stroke={node.ring === 0 ? tokens.color.signal : tokens.color.line}
            strokeWidth={node.ring === 0 ? 0.5 : 0.3}
            isCenter={node.ring === 0}
            delay={index * 0.05}
          />
        );
      })}
    </>
  );
}

export function HeroNetworkDiagram() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const breakpoint = useBreakpoint();
  const [isHovered, setIsHovered] = useState(false);
  
  const containerRef = (node: HTMLDivElement | null) => {
    if (node) {
      const rect = node.getBoundingClientRect();
      setDimensions({ width: rect.width, height: rect.height });
    }
  };
  
  // Calculate aspect ratio
  const aspectRatio = useMemo(() => {
    if (breakpoint === 'mobile') return 1;
    if (breakpoint === 'tablet') return 16 / 10;
    return 16 / 12;
  }, [breakpoint]);
  
  return (
    <motion.div
      ref={containerRef}
      className="diagram-container"
      style={{ aspectRatio }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: tokens.animation.duration.slow }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <svg 
        viewBox={`0 0 ${dimensions.width || 100} ${dimensions.height || 100}`}
        preserveAspectRatio="xMidYMid meet"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      >
        {/* Background grid lines (subtle) */}
        <rect
          x="0"
          y="0"
          width={dimensions.width || 100}
          height={dimensions.height || 100}
          fill="transparent"
        />
        
        {breakpoint === 'mobile' && dimensions.width > 0 && (
          <MobileHeroNetwork width={dimensions.width} height={dimensions.height} />
        )}
        
        {(breakpoint === 'tablet' || breakpoint === 'desktop') && dimensions.width > 0 && (
          <DesktopHeroNetwork width={dimensions.width} height={dimensions.height} />
        )}

        {/* Title */}
        <motion.text
          x={dimensions.width ? dimensions.width / 2 : 50}
          y={dimensions.height ? dimensions.height - 10 : 90}
          textAnchor="middle"
          fontSize="5"
          fontFamily={tokens.font.mono}
          fill={tokens.color.muted}
          letterSpacing="0.1em"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: tokens.animation.duration.normal, delay: 0.5 }}
        >
          OPERATOR-CENTRIC INTELLIGENCE SYSTEM
        </motion.text>

        {/* Hover indicator */}
        {isHovered && breakpoint !== 'mobile' && (
          <motion.text
            x={dimensions.width ? dimensions.width / 2 : 50}
            y={dimensions.height ? dimensions.height - 25 : 85}
            textAnchor="middle"
            fontSize="3"
            fontFamily={tokens.font.mono}
            fill={tokens.color.signal}
            letterSpacing="0.1em"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            HOVER TO EXPLORE
          </motion.text>
        )}
      </svg>
    </motion.div>
  );
}

export default HeroNetworkDiagram;
