'use client';

import { motion } from 'framer-motion';
import { useState, useMemo } from 'react';
import { tokens } from '@/lib/design-tokens';
import {
  DiagramLabel,
  DiagramNode,
  DiagramConnection,
  Point,
  calculateTextDimensions,
  calculateCircularPositions,
  createDiagramLayout,
} from './primitives';

// =============================================================================
// GROWING NETWORK DIAGRAM
// Network showing AKSOS node growing with relationship types
// Geometry: Proper connection routing with exclusion zones
// =============================================================================

// Configuration constants
const CENTER_X = 50;
const CENTER_Y = 40;
const CENTER_EXCLUSION_RADIUS = 10; // Exclusion zone around AKSOS
const NODE_RADIUS = 2;
const LINE_STROKE_WIDTH = 0.2;
const HIGHLIGHT_STROKE_WIDTH = 0.4;
const SAFE_MARGIN = 8;

// Node types with different relationship styles
const NODE_TYPES = [
  { 
    type: 'PERSON', 
    nodes: [{ x: 20, y: 20 }, { x: 20, y: 60 }],
    delay: 0.1
  },
  { 
    type: 'ORGANIZATION', 
    nodes: [{ x: 80, y: 20 }, { x: 80, y: 60 }],
    delay: 0.2
  },
  { 
    type: 'INSTITUTION', 
    nodes: [{ x: 20, y: 80 }, { x: 80, y: 80 }],
    delay: 0.3
  },
  { 
    type: 'RESEARCH', 
    nodes: [{ x: 50, y: 20 }],
    delay: 0.4
  },
  { 
    type: 'MARKET', 
    nodes: [{ x: 50, y: 80 }],
    delay: 0.5
  },
  { 
    type: 'LOCAL', 
    nodes: [{ x: 80, y: 40 }],
    delay: 0.6
  },
];

// Calculate layout geometry
function calculateLayout(viewBoxWidth: number = 100, viewBoxHeight: number = 100) {
  const center = { x: CENTER_X, y: CENTER_Y };
  
  // Scale node positions to viewBox
  const scaledNodeTypes = NODE_TYPES.map(type => ({
    ...type,
    nodes: type.nodes.map(node => ({
      x: (node.x / 100) * viewBoxWidth,
      y: (node.y / 100) * viewBoxHeight,
    })),
  }));
  
  // Flatten all nodes for connections
  const allNodes: { x: number; y: number; type: string }[] = scaledNodeTypes.flatMap(type => 
    type.nodes.map(n => ({ ...n, type: type.type }))
  );
  
  // Exclusion zone around AKSOS
  const exclusionZone = {
    center,
    radius: CENTER_EXCLUSION_RADIUS,
  };
  
  return {
    viewBox: { width: viewBoxWidth, height: viewBoxHeight },
    center,
    exclusionZone,
    nodeTypes: scaledNodeTypes,
    allNodes,
  };
}

// Pre-calculate layout
const LAYOUT = calculateLayout(100, 100);

// ViewBox dimensions
const VIEWBOX = { width: 100, height: 100 };

// AKSOS node
const AKSOS_NODE = { label: 'AKSOS', x: CENTER_X, y: CENTER_Y };

export function GrowingNetwork() {
  const [isHovered, setIsHovered] = useState(false);
  const [highlightedType, setHighlightedType] = useState<string | null>(null);
  
  const layout = useMemo(() => LAYOUT, []);
  
  return (
    <motion.div
      className="growing-network"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: tokens.animation.duration.slow }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => {
        setIsHovered(false);
        setHighlightedType(null);
      }}
    >
      <svg 
        viewBox={`0 0 ${VIEWBOX.width} ${VIEWBOX.height}`} 
        preserveAspectRatio="xMidYMid meet"
        style={{ width: '100%', height: '400px' }}
      >
        
        {/* AKSOS central node with pulsing */}
        <motion.g
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: tokens.animation.duration.normal }}
          animate={isHovered ? { scale: [1, 1.1, 1] } : {}}
          transition={isHovered ? { duration: 2, repeat: Infinity, ease: 'easeInOut' } : {}}
        >
          <circle 
            cx={AKSOS_NODE.x} 
            cy={AKSOS_NODE.y} 
            r={4} 
            fill="none" 
            stroke={tokens.color.signal} 
            strokeWidth="0.5"
          />
          <DiagramLabel
            x={AKSOS_NODE.x}
            y={AKSOS_NODE.y}
            text={AKSOS_NODE.label}
            dy={15}
            fontSize={8}
            fill={tokens.color.signal}
            letterSpacing={0.15}
          />
        </motion.g>

        {/* Peripheral nodes by type */}
        {layout.nodeTypes.map((type, typeIndex) => {
          const isHighlighted = highlightedType === type.type || isHovered;
          
          return type.nodes.map((node, nodeIndex) => (
            <motion.g
              key={`node-${type.type}-${nodeIndex}`}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: tokens.animation.duration.normal, delay: type.delay + (nodeIndex * 0.05) }}
              whileHover={{ scale: 1.15 }}
              onHoverStart={() => setHighlightedType(type.type)}
              onHoverEnd={() => setHighlightedType(null)}
              animate={isHovered ? { scale: [1, 1.1, 1], opacity: [1, 0.8, 1] } : {}}
              transition={isHovered ? { duration: 2, repeat: Infinity, ease: 'easeInOut', delay: type.delay } : {}}
            >
              <DiagramNode
                x={node.x}
                y={node.y}
                r={NODE_RADIUS}
                fill={tokens.color.ink}
                stroke={isHighlighted ? tokens.color.signal : tokens.color.line}
                strokeWidth={isHighlighted ? HIGHLIGHT_STROKE_WIDTH : 0.3}
                label={type.type}
                labelPosition="bottom"
                labelOffset={12}
                labelFontSize={5}
                labelColor={tokens.color.ink}
                exclusionZone={layout.exclusionZone}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: tokens.animation.duration.normal, delay: type.delay + (nodeIndex * 0.05) }}
              />
            </motion.g>
          ));
        })}

        {/* Relationship lines with different styles */}
        {layout.allNodes.map((node, index) => {
          const isHighlighted = highlightedType === node.type || isHovered;
          
          return (
            <motion.line
              key={`rel-${index}`}
              x1={AKSOS_NODE.x}
              y1={AKSOS_NODE.y}
              x2={node.x}
              y2={node.y}
              stroke={isHighlighted ? tokens.color.signal : tokens.color.line}
              strokeWidth={isHighlighted ? HIGHLIGHT_STROKE_WIDTH : LINE_STROKE_WIDTH}
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.5 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{
                duration: tokens.animation.duration.normal,
                delay: 0.5 + (index * 0.03)
              }}
              animate={isHovered ? { opacity: [0.5, 1, 0.5], strokeWidth: [LINE_STROKE_WIDTH, HIGHLIGHT_STROKE_WIDTH, LINE_STROKE_WIDTH] } : {}}
              transition={isHovered ? { duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: index * 0.05 } : {}}
            />
          );
        })}

        {/* Value statement at bottom */}
        <motion.g
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: tokens.animation.duration.normal, delay: 0.8 }}
          animate={isHovered ? { fill: tokens.color.signal } : {}}
        >
          <DiagramLabel
            x={VIEWBOX.width / 2}
            y={90}
            text="NETWORK VALUE INCREASES"
            fontSize={6}
            fill={isHovered ? tokens.color.signal : tokens.color.muted}
            letterSpacing={0.1}
          />
          <DiagramLabel
            x={VIEWBOX.width / 2}
            y={96}
            text="WITH RELATIONSHIPS"
            fontSize={6}
            fill={isHovered ? tokens.color.signal : tokens.color.muted}
            letterSpacing={0.1}
          />
        </motion.g>

        {/* Hover indicator */}
        {isHovered && (
          <motion.text
            x={VIEWBOX.width / 2}
            y={80}
            textAnchor="middle"
            fontSize="4"
            fontFamily={tokens.font.mono}
            fill={tokens.color.muted}
            letterSpacing="0.1em"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            HOVER TO SEE CONNECTIONS
          </motion.text>
        )}
      </svg>
    </motion.div>
  );
}
