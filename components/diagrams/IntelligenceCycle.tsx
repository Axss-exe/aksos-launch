'use client';

import { motion } from 'framer-motion';
import { useState, useMemo } from 'react';
import { tokens } from '@/lib/design-tokens';
import {
  DiagramLabel,
  DiagramNode,
  DiagramConnection,
  DiagramArrow,
  Point,
  calculateTextDimensions,
  calculateCircularPositions,
  createDiagramLayout,
} from './primitives';

// =============================================================================
// INTELLIGENCE CYCLE DIAGRAM
// Radial network showing relationship intelligence process
// Geometry: Collision-free radial layout with exclusion zones
// =============================================================================

// Configuration constants
const CENTER_X = 50;
const CENTER_Y = 50;
const CENTER_EXCLUSION_RADIUS = 8; // Exclusion zone around AKSOS center
const NODE_RADIUS = 1.5;
const RING_STROKE_WIDTH = 0.3;
const HIGHLIGHT_STROKE_WIDTH = 0.5;
const CONNECTION_STROKE_WIDTH = 0.15;
const HIGHLIGHT_CONNECTION_WIDTH = 0.3;

// Concentric rings representing relationship types
const RINGS = [
  { r: 15, label: 'QUESTION', delay: 0.1, ringIndex: 0 },
  { r: 28, label: 'FIND PEOPLE', delay: 0.2, ringIndex: 1 },
  { r: 41, label: 'CONNECT', delay: 0.3, ringIndex: 2 },
  { r: 54, label: 'LEARN', delay: 0.4, ringIndex: 3 },
  { r: 67, label: 'ADD CONTEXT', delay: 0.5, ringIndex: 4 },
  { r: 80, label: 'DISCOVER NEW QUESTIONS', delay: 0.6, ringIndex: 5 },
];

// Nodes on each ring
const NODES_BY_RING = [
  [{ label: 'WHO', angle: 0 }, { label: 'WHAT', angle: 180 }],
  [{ label: 'EXPERTS', angle: 0 }, { label: 'SOURCES', angle: 120 }, { label: 'LEADERS', angle: 240 }],
  [{ label: 'INTRODUCE', angle: 0 }, { label: 'ENGAGE', angle: 180 }],
  [{ label: 'INSIGHTS', angle: 0 }, { label: 'KNOWLEDGE', angle: 180 }],
  [{ label: 'BACKGROUND', angle: 0 }, { label: 'HISTORY', angle: 180 }],
  [{ label: 'PATTERNS', angle: 0 }, { label: 'OPPORTUNITIES', angle: 120 }, { label: 'RISKS', angle: 240 }],
];

// Calculate layout geometry
function calculateLayout(viewBoxWidth: number = 100, viewBoxHeight: number = 100) {
  const center = { x: CENTER_X, y: CENTER_Y };
  
  // Calculate node positions for each ring
  const ringPositions: Point[][] = RINGS.map((ring, ringIndex) => {
    const nodes = NODES_BY_RING[ringIndex];
    return nodes.map(node => {
      const angleRad = (node.angle - 90) * Math.PI / 180; // -90 to start at top
      return {
        x: center.x + ring.r * Math.cos(angleRad),
        y: center.y + ring.r * Math.sin(angleRad),
      };
    });
  });
  
  // Calculate label positions for each ring
  // Place labels at consistent angles, offset from ring
  const labelPositions: Point[] = RINGS.map((ring, index) => {
    const labelAngle = index * 60 + 30; // Distribute labels evenly
    const angleRad = (labelAngle - 90) * Math.PI / 180;
    return {
      x: center.x + (ring.r + 3) * Math.cos(angleRad),
      y: center.y + (ring.r + 3) * Math.sin(angleRad),
    };
  });
  
  // Exclusion zone around center
  const exclusionZone = {
    center,
    radius: CENTER_EXCLUSION_RADIUS,
  };
  
  return {
    viewBox: { width: viewBoxWidth, height: viewBoxHeight },
    center,
    exclusionZone,
    rings: RINGS.map((ring, index) => ({
      ...ring,
      positions: ringPositions[index],
      nodes: NODES_BY_RING[index],
      labelPosition: labelPositions[index],
    })),
  };
}

// Pre-calculate layout
const LAYOUT = calculateLayout(100, 100);

// ViewBox dimensions
const VIEWBOX = { width: 100, height: 100 };

export function IntelligenceCycle() {
  const [isHovered, setIsHovered] = useState(false);
  const [highlightedRing, setHighlightedRing] = useState<number | null>(null);
  
  const layout = useMemo(() => LAYOUT, []);
  
  // Get position from angle and radius
  const getPosition = (r: number, angle: number): Point => ({
    x: layout.center.x + r * Math.cos((angle - 90) * Math.PI / 180),
    y: layout.center.y + r * Math.sin((angle - 90) * Math.PI / 180),
  });
  
  return (
    <motion.div
      className="intelligence-cycle"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: tokens.animation.duration.slow }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => {
        setIsHovered(false);
        setHighlightedRing(null);
      }}
    >
      <svg 
        viewBox={`0 0 ${VIEWBOX.width} ${VIEWBOX.height}`} 
        preserveAspectRatio="xMidYMid meet"
        style={{ width: '100%', height: '400px' }}
      >
        
        {/* Center label - Relationship Intelligence */}
        <motion.g
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: tokens.animation.duration.normal }}
          animate={isHovered ? { scale: [1, 1.05, 1] } : {}}
          transition={isHovered ? { duration: 2, repeat: Infinity, ease: 'easeInOut' } : {}}
        >
          <DiagramLabel
            x={layout.center.x}
            y={layout.center.y}
            text="RELATIONSHIP"
            fontSize={7}
            fill={tokens.color.muted}
            letterSpacing={0.1}
          />
          <DiagramLabel
            x={layout.center.x}
            y={layout.center.y + 7}
            text="INTELLIGENCE"
            fontSize={7}
            fill={tokens.color.muted}
            letterSpacing={0.1}
          />
        </motion.g>

        {/* AKSOS center node */}
        <motion.circle
          cx={layout.center.x}
          cy={layout.center.y}
          r={4}
          fill="none"
          stroke={tokens.color.signal}
          strokeWidth="0.5"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: tokens.animation.duration.normal }}
          animate={isHovered ? { r: [4, 5, 4], strokeWidth: [0.5, 0.7, 0.5] } : {}}
          transition={isHovered ? { duration: 2, repeat: Infinity, ease: 'easeInOut' } : {}}
        />

        {/* Concentric rings */}
        {layout.rings.map((ring, index) => {
          const isHighlighted = highlightedRing === ring.ringIndex || isHovered;
          
          return (
            <motion.circle
              key={`ring-${index}`}
              cx={layout.center.x}
              cy={layout.center.y}
              r={ring.r}
              fill="none"
              stroke={isHighlighted ? tokens.color.signal : tokens.color.line}
              strokeWidth={isHighlighted ? HIGHLIGHT_STROKE_WIDTH : RING_STROKE_WIDTH}
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: tokens.animation.duration.normal, delay: ring.delay }}
              animate={isHovered ? { strokeWidth: [RING_STROKE_WIDTH, HIGHLIGHT_STROKE_WIDTH, RING_STROKE_WIDTH] } : {}}
              transition={isHovered ? { duration: 2, repeat: Infinity, ease: 'easeInOut', delay: index * 0.1 } : {}}
              onHoverStart={() => setHighlightedRing(ring.ringIndex)}
              onHoverEnd={() => setHighlightedRing(null)}
            />
          );
        })}

        {/* Nodes on rings */}
        {layout.rings.map((ring, ringIndex) => {
          return ring.positions.map((pos, nodeIndex) => {
            const node = ring.nodes[nodeIndex];
            const isHighlighted = highlightedRing === ring.ringIndex || isHovered;
            
            return (
              <motion.g
                key={`node-${ringIndex}-${nodeIndex}`}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: tokens.animation.duration.normal, delay: ring.delay + 0.1 + (nodeIndex * 0.05) }}
                whileHover={{ scale: 1.2 }}
                animate={isHovered ? { scale: [1, 1.1, 1], opacity: [1, 0.8, 1] } : {}}
                transition={isHovered ? { duration: 2, repeat: Infinity, ease: 'easeInOut', delay: ring.delay } : {}}
              >
                <DiagramNode
                  x={pos.x}
                  y={pos.y}
                  r={NODE_RADIUS}
                  fill={tokens.color.ink}
                  stroke={isHighlighted ? tokens.color.signal : tokens.color.line}
                  strokeWidth={isHighlighted ? HIGHLIGHT_STROKE_WIDTH : 0.2}
                  label={node.label}
                  labelPosition="bottom"
                  labelOffset={node.label.length > 8 ? 12 : 10}
                  labelFontSize={4.5}
                  labelColor={tokens.color.muted}
                  exclusionZone={layout.exclusionZone}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: tokens.animation.duration.normal, delay: ring.delay + 0.1 + (nodeIndex * 0.05) }}
                />
                
                {/* Connection line from center to node (avoiding exclusion zone) */}
                <DiagramConnection
                  from={layout.center}
                  to={pos}
                  stroke={isHighlighted ? tokens.color.signal : tokens.color.line}
                  strokeWidth={isHighlighted ? HIGHLIGHT_CONNECTION_WIDTH : CONNECTION_STROKE_WIDTH}
                  strokeDasharray="1,1"
                  exclusionZone={layout.exclusionZone}
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: tokens.animation.duration.normal, delay: ring.delay + 0.15 + (nodeIndex * 0.03) }}
                />
              </motion.g>
            );
          });
        })}

        {/* Ring labels */}
        {layout.rings.map((ring, index) => {
          const isHighlighted = highlightedRing === ring.ringIndex || isHovered;
          
          return (
            <motion.g
              key={`label-${index}`}
              onHoverStart={() => setHighlightedRing(ring.ringIndex)}
              onHoverEnd={() => setHighlightedRing(null)}
            >
              <DiagramLabel
                x={ring.labelPosition.x}
                y={ring.labelPosition.y}
                text={ring.label}
                textAnchor="middle"
                fontSize={5}
                fill={isHighlighted ? tokens.color.signal : tokens.color.muted}
                letterSpacing={0.1}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: tokens.animation.duration.normal, delay: ring.delay + 0.2 }}
              />
            </motion.g>
          );
        })}

        {/* Arrow indicators between rings - PROPER SVG ARROWS (no control characters) */}
        {layout.rings.map((ring, index) => {
          if (index === layout.rings.length - 1) return null;
          
          const fromPos = getPosition(ring.r, 0);
          const toPos = getPosition(layout.rings[index + 1].r, 0);
          const midX = (fromPos.x + toPos.x) / 2;
          const midY = (fromPos.y + toPos.y) / 2;
          
          return (
            <motion.g
              key={`arrow-${index}`}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: tokens.animation.duration.normal, delay: ring.delay + 0.15 }}
              animate={isHovered ? { opacity: [0.5, 1, 0.5], scale: [1, 1.2, 1] } : {}}
              transition={isHovered ? { duration: 1, repeat: Infinity, ease: 'easeInOut' } : {}}
            >
              <DiagramArrow
                x={midX}
                y={midY}
                direction="down"
                size={6}
                stroke={tokens.color.muted}
                strokeWidth={0.3}
                fill={tokens.color.muted}
              />
            </motion.g>
          );
        })}

        {/* Hover indicator */}
        {isHovered && (
          <motion.text
            x={layout.center.x}
            y={92}
            textAnchor="middle"
            fontSize="4"
            fontFamily={tokens.font.mono}
            fill={tokens.color.muted}
            letterSpacing="0.1em"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            HOVER TO SEE CYCLE
          </motion.text>
        )}
      </svg>
    </motion.div>
  );
}
