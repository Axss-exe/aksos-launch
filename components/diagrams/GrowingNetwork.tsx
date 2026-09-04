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
  useBreakpoint,
} from './primitives';

// =============================================================================
// GROWING NETWORK DIAGRAM
// Network showing AKSOS node growing with relationship types
// Geometry: Central AKSOS with surrounding nodes, exclusion zone at center
// Responsive: Converts to vertical stack on mobile
// =============================================================================

// Configuration
const SAFE_MARGIN = 10;
const CENTER_X = 50;
const CENTER_Y = 50;
const NODE_R = 2;
const INNER_RING_R = 15;
const OUTER_RING_R = 28;
const CONNECTION_STROKE_WIDTH = 0.2;

// Center node (AKSOS)
const CENTER_NODE = {
  label: 'AKSOS',
  r: 4,
  stroke: "#signal,
  strokeWidth: 0.5,
};

// Relationship types (surrounding nodes)
const RELATIONSHIP_TYPES = [
  { label: 'PEOPLE', delay: 0.1 },
  { label: 'ORGANIZATIONS', delay: 0.15 },
  { label: 'LOCATIONS', delay: 0.2 },
  { label: 'EVENTS', delay: 0.25 },
  { label: 'OBJECTS', delay: 0.3 },
  { label: 'IDEAS', delay: 0.35 },
];

// Calculate desktop layout
function calculateDesktopLayout(viewBoxWidth: number = 100): {
  centerX: number;
  centerY: number;
  nodes: { label: string; x: number; y: number; delay: number }[];
  totalHeight: number;
  viewBoxHeight: number;
} {
  const centerX = viewBoxWidth / 2;
  const centerY = 50;
  
  // Calculate positions for nodes on a circle
  const positions = calculateCircularPositions(
    { x: centerX, y: centerY },
    INNER_RING_R,
    RELATIONSHIP_TYPES.length,
    0 // Start at 0 radians (east)
  );
  
  const nodes = RELATIONSHIP_TYPES.map((node, index) => ({
    ...node,
    x: positions[index].x,
    y: positions[index].y,
  }));
  
  // Calculate total height based on nodes
  const topMost = Math.min(...nodes.map(n => n.y));
  const bottomMost = Math.max(...nodes.map(n => n.y));
  
  // Calculate label positions and ensure they don't cause clipping
  const labelMargin = 12;
  const viewBoxHeight = bottomMost + labelMargin + SAFE_MARGIN;
  
  return {
    centerX,
    centerY,
    nodes,
    totalHeight: viewBoxHeight,
    viewBoxHeight,
  };
}

// Calculate mobile layout (vertical stack)
function calculateMobileLayout(viewBoxWidth: number = 100): {
  centerX: number;
  centerY: number;
  nodes: { label: string; x: number; y: number; delay: number }[];
  totalHeight: number;
  viewBoxHeight: number;
} {
  const centerX = viewBoxWidth / 2;
  const startY = 25;
  const spacing = 12;
  
  // Stack: Center -> Nodes
  let y = startY;
  
  // Center node
  const centerY = y;
  y += 15;
  
  // Relationship type nodes
  const nodes = RELATIONSHIP_TYPES.map((node, index) => ({
    ...node,
    x: centerX,
    y: y + index * spacing,
  }));
  
  const bottomMost = Math.max(
    centerY,
    ...nodes.map(n => n.y)
  );
  
  const viewBoxHeight = bottomMost + 20 + SAFE_MARGIN;
  
  return {
    centerX,
    centerY,
    nodes,
    totalHeight: viewBoxHeight,
    viewBoxHeight,
  };
}

// Pre-calculate layouts
const DESKTOP_LAYOUT = calculateDesktopLayout(100);
const MOBILE_LAYOUT = calculateMobileLayout(100);

// Aspect ratios
const DESKTOP_ASPECT_RATIO = 100 / DESKTOP_LAYOUT.viewBoxHeight;
const MOBILE_ASPECT_RATIO = 100 / MOBILE_LAYOUT.viewBoxHeight;

// Exclusion zone around center
const EXCLUSION_ZONE = { center: { x: CENTER_X, y: CENTER_Y }, radius: 10 };

export function GrowingNetwork() {
  const [isHovered, setIsHovered] = useState(false);
  
  const breakpoint = useBreakpoint();
  const layout = useMemo(() => 
    breakpoint === 'mobile' ? MOBILE_LAYOUT : DESKTOP_LAYOUT
  , [breakpoint]);
  
  const viewBoxHeight = layout.viewBoxHeight;
  const aspectRatio = breakpoint === 'mobile' ? MOBILE_ASPECT_RATIO : DESKTOP_ASPECT_RATIO;
  const minHeight = 400;
  
  return (
    <motion.div
      className="growing-network-diagram"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.slow }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{
        gridColumn: '1 / -1',
        aspectRatio: aspectRatio,
        minHeight: `${minHeight}px`,
        width: '100%',
      }}
    >
      <svg 
        viewBox={`0 0 100 ${viewBoxHeight}`} 
        preserveAspectRatio="xMidYMid meet"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      >
        {/* Center AKSOS Node */}
        <motion.g
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.normal, delay: 0.15 }}
          whileHover={{ scale: 1.1 }}
        >
          <DiagramNode
            x={layout.centerX}
            y={layout.centerY}
            r={CENTER_NODE.r}
            fill={"#ink}
            stroke={CENTER_NODE.stroke}
            strokeWidth={CENTER_NODE.strokeWidth}
            label={CENTER_NODE.label}
            labelPosition="bottom"
            labelOffset={8}
            labelFontSize={7}
            labelColor={"#ink}
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.normal, delay: 0.15 }}
          />
        </motion.g>

        {/* Relationship Type Nodes */}
        {layout.nodes.map((node, index) => {
          const isMobile = breakpoint === 'mobile';
          
          return (
            <motion.g
              key={`node-${node.label}`}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.normal, delay: node.delay }}
              whileHover={{ scale: 1.15 }}
            >
              <DiagramNode
                x={node.x}
                y={node.y}
                r={NODE_R}
                fill={"#ink}
                stroke={"#line}
                strokeWidth={0.3}
                label={node.label}
                labelPosition={isMobile ? 'bottom' : 'top'}
                labelOffset={7}
                labelFontSize={5}
                labelColor={"#muted}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.normal, delay: node.delay }}
              />
            </motion.g>
          );
        })}

        {/* Connections from AKSOS to Relationship Types */}
        {layout.nodes.map((node, index) => {
          const isMobile = breakpoint === 'mobile';
          const from = { x: layout.centerX, y: layout.centerY };
          const to = { x: node.x, y: node.y };
          
          // For mobile, adjust to vertical connections
          const mobileFrom = isMobile ? { x: layout.centerX, y: layout.centerY } : from;
          const mobileTo = isMobile ? { x: layout.centerX, y: node.y } : to;
          
          return (
            <motion.g
              key={`conn-${node.label}`}
              initial={{ opacity: 0, pathLength: 0 }}
              whileInView={{ opacity: 1, pathLength: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.normal, delay: node.delay + 0.05 }}
            >
              <DiagramConnection
                from={isMobile ? mobileFrom : from}
                to={isMobile ? mobileTo : to}
                stroke={"#line}
                strokeWidth={CONNECTION_STROKE_WIDTH}
                curved={!isMobile}
                curvature={0.3}
                exclusionZone={EXCLUSION_ZONE}
                initial={{ opacity: 0, pathLength: 0 }}
                whileInView={{ opacity: 1, pathLength: 1 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.normal, delay: node.delay + 0.05 }}
              />
            </motion.g>
          );
        })}

        {/* Title */}
        <motion.g
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.normal }}
        >
          <DiagramLabel
            x={CENTER_X}
            y={viewBoxHeight - 8}
            text="GROWING NETWORK"
            textAnchor="middle"
            fontSize={6}
            fill={"#muted}
            letterSpacing={0.1}
          />
        </motion.g>

        {/* Hover indicator */}
        {isHovered && breakpoint !== 'mobile' && (
          <motion.text
            x={CENTER_X}
            y={viewBoxHeight - 3}
            textAnchor="middle"
            fontSize="4"
            fontFamily={"var(--font-mono}
            fill={"#muted}
            letterSpacing="0.1em"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            HOVER TO EXPLORE NETWORK GROWTH
          </motion.text>
        )}

        {isHovered && breakpoint === 'mobile' && (
          <motion.text
            x={CENTER_X}
            y={viewBoxHeight - 3}
            textAnchor="middle"
            fontSize="4"
            fontFamily={"var(--font-mono}
            fill={"#muted}
            letterSpacing="0.1em"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            TAP TO EXPLORE NETWORK
          </motion.text>
        )}
      </svg>
    </motion.div>
  );
}
