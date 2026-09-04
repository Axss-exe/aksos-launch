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
  useBreakpoint,
} from './primitives';

// =============================================================================
// RITA DIAGRAM
// Radial investigation showing RITA in action
// Geometry: Concentric circles with calculated positions, exclusion zone at center
// Responsive: Converts to vertical stack on mobile
// =============================================================================

// Configuration
const SAFE_MARGIN = 10;
const CENTER_X = 50;
const CENTER_Y = 50;
const NODE_R = 2;
const INNER_RING_R = 15;
const OUTER_RING_R = 30;
const CONNECTION_STROKE_WIDTH = 0.2;
const ARROW_SIZE = 6;

// Center node
const CENTER_NODE = {
  label: 'RITA',
  r: 4,
  stroke: tokens.color.signal,
  strokeWidth: 0.5,
};

// Inner ring nodes (investigation actions)
const INNER_RING_NODES = [
  { label: 'COLLECT', delay: 0.1 },
  { label: 'ANALYZE', delay: 0.15 },
  { label: 'CORRELATE', delay: 0.2 },
  { label: 'VALIDATE', delay: 0.25 },
];

// Outer ring nodes (relationship types)
const OUTER_RING_NODES = [
  { label: 'PEOPLE', delay: 0.3 },
  { label: 'ORGANIZATIONS', delay: 0.35 },
  { label: 'LOCATIONS', delay: 0.4 },
  { label: 'EVENTS', delay: 0.45 },
  { label: 'OBJECTS', delay: 0.5 },
  { label: 'IDEAS', delay: 0.55 },
];

// Calculate desktop layout
function calculateDesktopLayout(viewBoxWidth: number = 100): {
  centerX: number;
  centerY: number;
  innerRing: { label: string; x: number; y: number; delay: number }[];
  outerRing: { label: string; x: number; y: number; delay: number }[];
  totalHeight: number;
  viewBoxHeight: number;
} {
  const centerX = viewBoxWidth / 2;
  const centerY = 50;
  
  // Calculate positions for inner ring (4 nodes, evenly spaced)
  const innerPositions = calculateCircularPositions(
    { x: centerX, y: centerY },
    INNER_RING_R,
    INNER_RING_NODES.length,
    Math.PI / 4 // Start at 45 degrees (northeast)
  );
  
  const innerRing = INNER_RING_NODES.map((node, index) => ({
    ...node,
    x: innerPositions[index].x,
    y: innerPositions[index].y,
  }));
  
  // Calculate positions for outer ring (6 nodes, evenly spaced)
  const outerPositions = calculateCircularPositions(
    { x: centerX, y: centerY },
    OUTER_RING_R,
    OUTER_RING_NODES.length,
    Math.PI / 6 // Start at 30 degrees
  );
  
  const outerRing = OUTER_RING_NODES.map((node, index) => ({
    ...node,
    x: outerPositions[index].x,
    y: outerPositions[index].y,
  }));
  
  // Calculate total height based on outer ring
  const topMost = Math.min(
    ...innerRing.map(n => n.y),
    ...outerRing.map(n => n.y)
  );
  const bottomMost = Math.max(
    ...innerRing.map(n => n.y),
    ...outerRing.map(n => n.y)
  );
  
  // Calculate label positions and ensure they don't cause clipping
  const labelMargin = 10;
  const viewBoxHeight = bottomMost + labelMargin + SAFE_MARGIN;
  
  return {
    centerX,
    centerY,
    innerRing,
    outerRing,
    totalHeight: viewBoxHeight,
    viewBoxHeight,
  };
}

// Calculate mobile layout (vertical stack)
function calculateMobileLayout(viewBoxWidth: number = 100): {
  centerX: number;
  centerY: number;
  innerRing: { label: string; x: number; y: number; delay: number }[];
  outerRing: { label: string; x: number; y: number; delay: number }[];
  totalHeight: number;
  viewBoxHeight: number;
} {
  const centerX = viewBoxWidth / 2;
  const startY = 25;
  const spacing = 12;
  
  // Stack: Center -> Inner Ring -> Outer Ring
  let y = startY;
  
  // Center node
  const centerY = y;
  y += 15;
  
  // Inner ring nodes
  const innerRing = INNER_RING_NODES.map((node, index) => ({
    ...node,
    x: centerX,
    y: y + index * spacing,
  }));
  
  y += INNER_RING_NODES.length * spacing + 15;
  
  // Outer ring nodes
  const outerRing = OUTER_RING_NODES.map((node, index) => ({
    ...node,
    x: centerX,
    y: y + index * spacing,
  }));
  
  const bottomMost = Math.max(
    centerY,
    ...innerRing.map(n => n.y),
    ...outerRing.map(n => n.y)
  );
  
  const viewBoxHeight = bottomMost + 20 + SAFE_MARGIN;
  
  return {
    centerX,
    centerY,
    innerRing,
    outerRing,
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
const EXCLUSION_ZONE = { center: { x: CENTER_X, y: CENTER_Y }, radius: 8 };

export function RitaDiagram() {
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
      className="rita-diagram"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: tokens.animation.duration.slow }}
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
        {/* Center RITA Node */}
        <motion.g
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: tokens.animation.duration.normal, delay: 0.2 }}
          whileHover={{ scale: 1.1 }}
        >
          <DiagramNode
            x={layout.centerX}
            y={layout.centerY}
            r={CENTER_NODE.r}
            fill={tokens.color.ink}
            stroke={CENTER_NODE.stroke}
            strokeWidth={CENTER_NODE.strokeWidth}
            label={CENTER_NODE.label}
            labelPosition="bottom"
            labelOffset={8}
            labelFontSize={7}
            labelColor={tokens.color.ink}
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: tokens.animation.duration.normal, delay: 0.2 }}
          />
        </motion.g>

        {/* Inner Ring Nodes */}
        {layout.innerRing.map((node, index) => {
          const isMobile = breakpoint === 'mobile';
          
          return (
            <motion.g
              key={`inner-${node.label}`}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: tokens.animation.duration.normal, delay: node.delay }}
              whileHover={{ scale: 1.15 }}
            >
              <DiagramNode
                x={node.x}
                y={node.y}
                r={NODE_R}
                fill={tokens.color.ink}
                stroke={tokens.color.line}
                strokeWidth={0.3}
                label={node.label}
                labelPosition={isMobile ? 'bottom' : 'top'}
                labelOffset={7}
                labelFontSize={5}
                labelColor={tokens.color.muted}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: tokens.animation.duration.normal, delay: node.delay }}
              />
            </motion.g>
          );
        })}

        {/* Outer Ring Nodes */}
        {layout.outerRing.map((node, index) => {
          const isMobile = breakpoint === 'mobile';
          
          return (
            <motion.g
              key={`outer-${node.label}`}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: tokens.animation.duration.normal, delay: node.delay }}
              whileHover={{ scale: 1.15 }}
            >
              <DiagramNode
                x={node.x}
                y={node.y}
                r={NODE_R}
                fill={tokens.color.ink}
                stroke={tokens.color.line}
                strokeWidth={0.3}
                label={node.label}
                labelPosition={isMobile ? 'bottom' : 'top'}
                labelOffset={7}
                labelFontSize={5}
                labelColor={tokens.color.muted}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: tokens.animation.duration.normal, delay: node.delay }}
              />
            </motion.g>
          );
        })}

        {/* Connections from Center to Inner Ring */}
        {layout.innerRing.map((node, index) => {
          const isMobile = breakpoint === 'mobile';
          const from = { x: layout.centerX, y: layout.centerY };
          const to = { x: node.x, y: node.y };
          
          // For mobile, adjust to vertical connections
          const mobileFrom = isMobile ? { x: layout.centerX, y: layout.centerY } : from;
          const mobileTo = isMobile ? { x: layout.centerX, y: node.y } : to;
          
          return (
            <motion.g
              key={`conn-center-inner-${node.label}`}
              initial={{ opacity: 0, pathLength: 0 }}
              whileInView={{ opacity: 1, pathLength: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: tokens.animation.duration.normal, delay: node.delay + 0.05 }}
            >
              <DiagramConnection
                from={isMobile ? mobileFrom : from}
                to={isMobile ? mobileTo : to}
                stroke={tokens.color.line}
                strokeWidth={CONNECTION_STROKE_WIDTH}
                curved={!isMobile}
                curvature={0.3}
                exclusionZone={EXCLUSION_ZONE}
                initial={{ opacity: 0, pathLength: 0 }}
                whileInView={{ opacity: 1, pathLength: 1 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: tokens.animation.duration.normal, delay: node.delay + 0.05 }}
              />
              {/* Arrow at inner node end */}
              <DiagramArrow
                x={isMobile ? layout.centerX : node.x}
                y={node.y}
                direction={isMobile ? 'down' : 'left'}
                size={ARROW_SIZE}
                stroke={tokens.color.line}
                strokeWidth={0.3}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: tokens.animation.duration.normal, delay: node.delay + 0.1 }}
              />
            </motion.g>
          );
        })}

        {/* Connections from Inner Ring to Outer Ring */}
        {layout.innerRing.map((innerNode, innerIndex) => {
          const isMobile = breakpoint === 'mobile';
          
          // Connect each inner node to corresponding outer nodes
          const outerNode = layout.outerRing[innerIndex % layout.outerRing.length];
          
          const from = { x: innerNode.x, y: innerNode.y };
          const to = { x: outerNode.x, y: outerNode.y };
          
          const mobileFrom = isMobile ? { x: layout.centerX, y: innerNode.y } : from;
          const mobileTo = isMobile ? { x: layout.centerX, y: outerNode.y } : to;
          
          return (
            <motion.g
              key={`conn-inner-outer-${innerNode.label}-${outerNode.label}`}
              initial={{ opacity: 0, pathLength: 0 }}
              whileInView={{ opacity: 1, pathLength: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: tokens.animation.duration.normal, delay: innerNode.delay + 0.15 }}
            >
              <DiagramConnection
                from={isMobile ? mobileFrom : from}
                to={isMobile ? mobileTo : to}
                stroke={tokens.color.line}
                strokeWidth={CONNECTION_STROKE_WIDTH}
                curved={!isMobile}
                curvature={0.5}
                exclusionZone={EXCLUSION_ZONE}
                initial={{ opacity: 0, pathLength: 0 }}
                whileInView={{ opacity: 1, pathLength: 1 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: tokens.animation.duration.normal, delay: innerNode.delay + 0.15 }}
              />
              {/* Arrow at outer node end */}
              <DiagramArrow
                x={isMobile ? layout.centerX : outerNode.x}
                y={outerNode.y}
                direction={isMobile ? 'down' : 'left'}
                size={ARROW_SIZE}
                stroke={tokens.color.line}
                strokeWidth={0.3}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: tokens.animation.duration.normal, delay: innerNode.delay + 0.2 }}
              />
            </motion.g>
          );
        })}

        {/* Ring Labels for Desktop */}
        {breakpoint !== 'mobile' && (
          <motion.g
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: tokens.animation.duration.normal, delay: 0.1 }}
          >
            <DiagramLabel
              x={CENTER_X}
              y={CENTER_Y - INNER_RING_R - 8}
              text="INVESTIGATION ACTIONS"
              textAnchor="middle"
              fontSize={4}
              fill={tokens.color.muted}
              letterSpacing={0.1}
            />
            <DiagramLabel
              x={CENTER_X}
              y={CENTER_Y + OUTER_RING_R + 8}
              text="RELATIONSHIP TYPES"
              textAnchor="middle"
              fontSize={4}
              fill={tokens.color.muted}
              letterSpacing={0.1}
            />
          </motion.g>
        )}

        {/* Title */}
        <motion.g
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: tokens.animation.duration.normal }}
        >
          <DiagramLabel
            x={CENTER_X}
            y={viewBoxHeight - 8}
            text="RITA IN ACTION"
            textAnchor="middle"
            fontSize={6}
            fill={tokens.color.muted}
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
            fontFamily={tokens.font.mono}
            fill={tokens.color.muted}
            letterSpacing="0.1em"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            HOVER TO EXPLORE INVESTIGATION
          </motion.text>
        )}

        {isHovered && breakpoint === 'mobile' && (
          <motion.text
            x={CENTER_X}
            y={viewBoxHeight - 3}
            textAnchor="middle"
            fontSize="4"
            fontFamily={tokens.font.mono}
            fill={tokens.color.muted}
            letterSpacing="0.1em"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            TAP TO EXPLORE INVESTIGATION
          </motion.text>
        )}
      </svg>
    </motion.div>
  );
}
