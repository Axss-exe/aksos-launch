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
  createDiagramLayout,
} from './primitives';

// =============================================================================
// RITA DIAGRAM
// Radial investigation showing RITA in action
// Geometry: Collision-free radial layout with exclusion zones, no control chars
// =============================================================================

// Configuration constants
const CENTER_X = 50;
const CENTER_Y = 50;
const CENTER_EXCLUSION_RADIUS = 8; // Exclusion zone around RITA center
const NODE_RADIUS = 1.5;
const RING_STROKE_WIDTH = 0.3;
const HIGHLIGHT_STROKE_WIDTH = 0.5;
const CONNECTION_STROKE_WIDTH = 0.15;
const HIGHLIGHT_CONNECTION_WIDTH = 0.3;

// Investigation layers
const LAYERS = [
  { r: 15, label: 'SOURCE', delay: 0.1, layerIndex: 0 },
  { r: 28, label: 'EVENT', delay: 0.2, layerIndex: 1 },
  { r: 41, label: 'ENTITY', delay: 0.3, layerIndex: 2 },
  { r: 54, label: 'RELATIONSHIP', delay: 0.4, layerIndex: 3 },
  { r: 67, label: 'CONTEXT', delay: 0.5, layerIndex: 4 },
];

// Final output
const FINAL_OUTPUT = {
  label: 'STORY',
  sublabel: 'INTELLIGENCE',
  r: 80,
  delay: 0.6,
};

// Nodes for each layer
const NODES_BY_LAYER = [
  [{ label: 'DOCUMENT', angle: 0 }, { label: 'REPORT', angle: 180 }],
  [{ label: 'INCIDENT', angle: 0 }, { label: 'ANNOUNCEMENT', angle: 120 }, { label: 'DECISION', angle: 240 }],
  [{ label: 'PERSON', angle: 0 }, { label: 'ORGANIZATION', angle: 90 }, { label: 'INSTITUTION', angle: 180 }, { label: 'COMPANY', angle: 270 }],
  [{ label: 'CONNECTS', angle: 0 }, { label: 'INFLUENCES', angle: 120 }, { label: 'OWNS', angle: 240 }],
  [{ label: 'BACKGROUND', angle: 0 }, { label: 'HISTORY', angle: 180 }],
];

// Calculate layout geometry
function calculateLayout(viewBoxWidth: number = 100, viewBoxHeight: number = 100) {
  const center = { x: CENTER_X, y: CENTER_Y };
  
  // Calculate node positions for each layer
  const layerPositions: Point[][] = LAYERS.map((layer, layerIndex) => {
    const nodes = NODES_BY_LAYER[layerIndex];
    return nodes.map(node => {
      const angleRad = (node.angle - 90) * Math.PI / 180; // -90 to start at top
      return {
        x: center.x + layer.r * Math.cos(angleRad),
        y: center.y + layer.r * Math.sin(angleRad),
      };
    });
  });
  
  // Calculate label positions for each layer
  const labelPositions: Point[] = LAYERS.map((layer, index) => {
    const labelAngle = index * 72 + 36; // Distribute labels evenly
    const angleRad = (labelAngle - 90) * Math.PI / 180;
    return {
      x: center.x + (layer.r + 3) * Math.cos(angleRad),
      y: center.y + (layer.r + 3) * Math.sin(angleRad),
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
    layers: LAYERS.map((layer, index) => ({
      ...layer,
      positions: layerPositions[index],
      nodes: NODES_BY_LAYER[index],
      labelPosition: labelPositions[index],
    })),
    finalOutput: {
      ...FINAL_OUTPUT,
      x: center.x,
      y: center.y,
    },
  };
}

// Pre-calculate layout
const LAYOUT = calculateLayout(100, 100);

// ViewBox dimensions
const VIEWBOX = { width: 100, height: 100 };

// Get position from angle and radius
function getPosition(r: number, angle: number): Point {
  return {
    x: LAYOUT.center.x + r * Math.cos((angle - 90) * Math.PI / 180),
    y: LAYOUT.center.y + r * Math.sin((angle - 90) * Math.PI / 180),
  };
}

export function RitaDiagram() {
  const [isHovered, setIsHovered] = useState(false);
  const [highlightedLayer, setHighlightedLayer] = useState<number | null>(null);
  
  const layout = useMemo(() => LAYOUT, []);
  
  return (
    <motion.div
      className="rita-diagram"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: tokens.animation.duration.slow }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => {
        setIsHovered(false);
        setHighlightedLayer(null);
      }}
    >
      <svg 
        viewBox={`0 0 ${VIEWBOX.width} ${VIEWBOX.height}`} 
        preserveAspectRatio="xMidYMid meet"
        style={{ width: '100%', height: '400px' }}
      >
        
        {/* Center - RITA */}
        <motion.g
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: tokens.animation.duration.normal }}
          animate={isHovered ? { scale: [1, 1.05, 1] } : {}}
          transition={isHovered ? { duration: 2, repeat: Infinity, ease: 'easeInOut' } : {}}
        >
          <circle 
            cx={layout.center.x} 
            cy={layout.center.y} 
            r={5} 
            fill="none" 
            stroke={tokens.color.signal} 
            strokeWidth="0.5"
          />
          <DiagramLabel
            x={layout.center.x}
            y={layout.center.y}
            text="RITA"
            dy={-2}
            fontSize={8}
            fill={tokens.color.signal}
            letterSpacing={0.15}
          />
        </motion.g>

        {/* Concentric circles */}
        {layout.layers.map((layer, index) => {
          const isHighlighted = highlightedLayer === layer.layerIndex || isHovered;
          
          return (
            <motion.circle
              key={`layer-${index}`}
              cx={layout.center.x}
              cy={layout.center.y}
              r={layer.r}
              fill="none"
              stroke={isHighlighted ? tokens.color.signal : tokens.color.line}
              strokeWidth={isHighlighted ? HIGHLIGHT_STROKE_WIDTH : RING_STROKE_WIDTH}
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: tokens.animation.duration.normal, delay: layer.delay }}
              animate={isHovered ? { strokeWidth: [RING_STROKE_WIDTH, HIGHLIGHT_STROKE_WIDTH, RING_STROKE_WIDTH] } : {}}
              transition={isHovered ? { duration: 2, repeat: Infinity, ease: 'easeInOut', delay: index * 0.1 } : {}}
              onHoverStart={() => setHighlightedLayer(layer.layerIndex)}
              onHoverEnd={() => setHighlightedLayer(null)}
            />
          );
        })}

        {/* Nodes on layers */}
        {layout.layers.map((layer, layerIndex) => {
          return layer.positions.map((pos, nodeIndex) => {
            const node = layer.nodes[nodeIndex];
            const isHighlighted = highlightedLayer === layer.layerIndex || isHovered;
            
            return (
              <motion.g
                key={`node-${layerIndex}-${nodeIndex}`}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: tokens.animation.duration.normal, delay: layer.delay + 0.1 + (nodeIndex * 0.03) }}
                whileHover={{ scale: 1.2 }}
                animate={isHovered ? { scale: [1, 1.1, 1], opacity: [1, 0.8, 1] } : {}}
                transition={isHovered ? { duration: 2, repeat: Infinity, ease: 'easeInOut', delay: layer.delay } : {}}
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
                  transition={{ duration: tokens.animation.duration.normal, delay: layer.delay + 0.1 + (nodeIndex * 0.03) }}
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
                  transition={{ duration: tokens.animation.duration.normal, delay: layer.delay + 0.15 + (nodeIndex * 0.03) }}
                />
              </motion.g>
            );
          });
        })}

        {/* Layer labels */}
        {layout.layers.map((layer, index) => {
          const isHighlighted = highlightedLayer === layer.layerIndex || isHovered;
          
          return (
            <motion.g
              key={`label-${index}`}
              onHoverStart={() => setHighlightedLayer(layer.layerIndex)}
              onHoverEnd={() => setHighlightedLayer(null)}
            >
              <DiagramLabel
                x={layer.labelPosition.x}
                y={layer.labelPosition.y}
                text={layer.label}
                textAnchor="middle"
                fontSize={5}
                fill={isHighlighted ? tokens.color.signal : tokens.color.muted}
                letterSpacing={0.1}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: tokens.animation.duration.normal, delay: layer.delay + 0.2 }}
              />
            </motion.g>
          );
        })}

        {/* Final output circle */}
        <motion.circle
          cx={layout.center.x}
          cy={layout.center.y}
          r={FINAL_OUTPUT.r}
          fill="none"
          stroke={highlightedLayer === 4 || isHovered ? tokens.color.signal : tokens.color.line}
          strokeWidth={highlightedLayer === 4 || isHovered ? HIGHLIGHT_STROKE_WIDTH : RING_STROKE_WIDTH}
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: tokens.animation.duration.normal, delay: FINAL_OUTPUT.delay }}
          animate={isHovered ? { strokeWidth: [RING_STROKE_WIDTH, HIGHLIGHT_STROKE_WIDTH, RING_STROKE_WIDTH] } : {}}
          transition={isHovered ? { duration: 2, repeat: Infinity, ease: 'easeInOut' } : {}}
          onHoverStart={() => setHighlightedLayer(4)}
          onHoverEnd={() => setHighlightedLayer(null)}
        />

        {/* Final output text */}
        <motion.g
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: tokens.animation.duration.normal, delay: FINAL_OUTPUT.delay + 0.2 }}
        >
          <DiagramLabel
            x={layout.center.x}
            y={85}
            text={FINAL_OUTPUT.label}
            fontSize={6}
            fill={highlightedLayer === 4 || isHovered ? tokens.color.signal : tokens.color.muted}
            letterSpacing={0.1}
          />
          <DiagramLabel
            x={layout.center.x}
            y={91}
            text={FINAL_OUTPUT.sublabel}
            fontSize={6}
            fill={highlightedLayer === 4 || isHovered ? tokens.color.signal : tokens.color.muted}
            letterSpacing={0.1}
          />
        </motion.g>

        {/* Arrow indicators between layers - PROPER SVG ARROWS (no control characters) */}
        {layout.layers.map((layer, index) => {
          if (index === layout.layers.length - 1) return null;
          
          const fromPos = getPosition(layer.r, 0);
          const toPos = getPosition(layout.layers[index + 1].r, 0);
          const midX = (fromPos.x + toPos.x) / 2;
          const midY = (fromPos.y + toPos.y) / 2;
          
          return (
            <motion.g
              key={`arrow-${index}`}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: tokens.animation.duration.normal, delay: layer.delay + 0.15 }}
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
            y={80}
            textAnchor="middle"
            fontSize="4"
            fontFamily={tokens.font.mono}
            fill={tokens.color.muted}
            letterSpacing="0.1em"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            HOVER TO SEE INVESTIGATION
          </motion.text>
        )}
      </svg>
    </motion.div>
  );
}
