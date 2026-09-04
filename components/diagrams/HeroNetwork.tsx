'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
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
  lineIntersectsCircle,
  generateCurvedPath,
} from './primitives';

// =============================================================================
// HERO NETWORK DIAGRAM
// Concentric circles with Africa outline, AKSOS at center
// Geometry: Calculated positions with golden ratio proportions, collision detection
// Responsive: Simplified mobile layout
// =============================================================================

// Configuration
const SAFE_MARGIN = 10;
const CENTER_X = 50;
const CENTER_Y = 50;
const NODE_R = 2;
const INNER_RING_R = 20;
const MIDDLE_RING_R = 30;
const OUTER_RING_R = 40;
const CONNECTION_STROKE_WIDTH = 0.2;

// Golden ratio for proportions
const PHI = 1.618;

// Center node (AKSOS)
const CENTER_NODE = {
  label: 'AKSOS',
  r: 4,
  stroke: tokens.color.signal,
  strokeWidth: 0.5,
};

// Africa outline points (simplified for SVG)
const AFRICA_OUTLINE = [
  { x: 40, y: 35 },
  { x: 42, y: 32 },
  { x: 45, y: 30 },
  { x: 48, y: 31 },
  { x: 52, y: 30 },
  { x: 55, y: 32 },
  { x: 58, y: 35 },
  { x: 60, y: 38 },
  { x: 62, y: 42 },
  { x: 60, y: 45 },
  { x: 58, y: 48 },
  { x: 55, y: 50 },
  { x: 52, y: 52 },
  { x: 48, y: 50 },
  { x: 45, y: 48 },
  { x: 42, y: 45 },
  { x: 40, y: 42 },
  { x: 38, y: 38 },
];

// Relationship types for rings
const RING_NODES = {
  inner: [
    { label: 'PEOPLE', delay: 0.1 },
    { label: 'ORGANIZATIONS', delay: 0.15 },
    { label: 'LOCATIONS', delay: 0.2 },
  ],
  middle: [
    { label: 'EVENTS', delay: 0.25 },
    { label: 'OBJECTS', delay: 0.3 },
    { label: 'IDEAS', delay: 0.35 },
  ],
  outer: [
    { label: 'CONTEXT', delay: 0.4 },
    { label: 'RELATIONSHIPS', delay: 0.45 },
    { label: 'INSIGHTS', delay: 0.5 },
  ],
};

// Calculate desktop layout
function calculateDesktopLayout(viewBoxWidth: number = 100): {
  centerX: number;
  centerY: number;
  innerRing: { label: string; x: number; y: number; delay: number }[];
  middleRing: { label: string; x: number; y: number; delay: number }[];
  outerRing: { label: string; x: number; y: number; delay: number }[];
  totalHeight: number;
  viewBoxHeight: number;
} {
  const centerX = viewBoxWidth / 2;
  const centerY = 50;
  
  // Calculate positions for each ring
  const innerPositions = calculateCircularPositions(
    { x: centerX, y: centerY },
    INNER_RING_R,
    RING_NODES.inner.length,
    Math.PI / 2 // Start at 90 degrees (north)
  );
  
  const middlePositions = calculateCircularPositions(
    { x: centerX, y: centerY },
    MIDDLE_RING_R,
    RING_NODES.middle.length,
    Math.PI / 3 // Start at 60 degrees
  );
  
  const outerPositions = calculateCircularPositions(
    { x: centerX, y: centerY },
    OUTER_RING_R,
    RING_NODES.outer.length,
    Math.PI / 4 // Start at 45 degrees
  );
  
  const innerRing = RING_NODES.inner.map((node, index) => ({
    ...node,
    x: innerPositions[index].x,
    y: innerPositions[index].y,
  }));
  
  const middleRing = RING_NODES.middle.map((node, index) => ({
    ...node,
    x: middlePositions[index].x,
    y: middlePositions[index].y,
  }));
  
  const outerRing = RING_NODES.outer.map((node, index) => ({
    ...node,
    x: outerPositions[index].x,
    y: outerPositions[index].y,
  }));
  
  // Calculate total height based on outer ring
  const topMost = Math.min(
    ...innerRing.map(n => n.y),
    ...middleRing.map(n => n.y),
    ...outerRing.map(n => n.y)
  );
  const bottomMost = Math.max(
    ...innerRing.map(n => n.y),
    ...middleRing.map(n => n.y),
    ...outerRing.map(n => n.y)
  );
  
  // Calculate label positions and ensure they don't cause clipping
  const labelMargin = 15;
  const viewBoxHeight = bottomMost + labelMargin + SAFE_MARGIN;
  
  return {
    centerX,
    centerY,
    innerRing,
    middleRing,
    outerRing,
    totalHeight: viewBoxHeight,
    viewBoxHeight,
  };
}

// Calculate mobile layout (simplified vertical stack)
function calculateMobileLayout(viewBoxWidth: number = 100): {
  centerX: number;
  centerY: number;
  allNodes: { label: string; x: number; y: number; delay: number; ring: string }[];
  totalHeight: number;
  viewBoxHeight: number;
} {
  const centerX = viewBoxWidth / 2;
  const startY = 25;
  const spacing = 12;
  
  // Stack all nodes vertically
  let y = startY;
  
  // Center node
  const centerY = y;
  y += 15;
  
  // All ring nodes
  const allNodes: { label: string; x: number; y: number; delay: number; ring: string }[] = [];
  
  // Add inner ring
  RING_NODES.inner.forEach(node => {
    allNodes.push({ ...node, x: centerX, y: y, ring: 'inner' });
    y += spacing;
  });
  
  y += 10; // Space between rings
  
  // Add middle ring
  RING_NODES.middle.forEach(node => {
    allNodes.push({ ...node, x: centerX, y: y, ring: 'middle' });
    y += spacing;
  });
  
  y += 10; // Space between rings
  
  // Add outer ring
  RING_NODES.outer.forEach(node => {
    allNodes.push({ ...node, x: centerX, y: y, ring: 'outer' });
    y += spacing;
  });
  
  const bottomMost = Math.max(
    centerY,
    ...allNodes.map(n => n.y)
  );
  
  const viewBoxHeight = bottomMost + 20 + SAFE_MARGIN;
  
  return {
    centerX,
    centerY,
    allNodes,
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
const EXCLUSION_ZONE = { center: { x: CENTER_X, y: CENTER_Y }, radius: 12 };

export function HeroNetwork() {
  const [isHovered, setIsHovered] = useState(false);
  
  const breakpoint = useBreakpoint();
  const layout = useMemo(() => 
    breakpoint === 'mobile' ? MOBILE_LAYOUT : DESKTOP_LAYOUT
  , [breakpoint]);
  
  const viewBoxHeight = layout.viewBoxHeight;
  const aspectRatio = breakpoint === 'mobile' ? MOBILE_ASPECT_RATIO : DESKTOP_ASPECT_RATIO;
  const minHeight = 500;
  
  return (
    <motion.div
      className="hero-network-diagram"
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
        {/* Africa Outline */}
        <motion.path
          d={generateAfricaPath()}
          fill="none"
          stroke={tokens.color.line}
          strokeWidth={0.3}
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: tokens.animation.duration.slow, delay: 0.1 }}
        />

        {/* Concentric circles */}
        <motion.circle
          cx={CENTER_X}
          cy={CENTER_Y}
          r={INNER_RING_R}
          fill="none"
          stroke={tokens.color.line}
          strokeWidth={0.3}
          initial={{ r: 0 }}
          whileInView={{ r: INNER_RING_R }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: tokens.animation.duration.slow, delay: 0.2 }}
        />
        
        <motion.circle
          cx={CENTER_X}
          cy={CENTER_Y}
          r={MIDDLE_RING_R}
          fill="none"
          stroke={tokens.color.line}
          strokeWidth={0.3}
          initial={{ r: 0 }}
          whileInView={{ r: MIDDLE_RING_R }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: tokens.animation.duration.slow, delay: 0.3 }}
        />
        
        <motion.circle
          cx={CENTER_X}
          cy={CENTER_Y}
          r={OUTER_RING_R}
          fill="none"
          stroke={tokens.color.line}
          strokeWidth={0.3}
          initial={{ r: 0 }}
          whileInView={{ r: OUTER_RING_R }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: tokens.animation.duration.slow, delay: 0.4 }}
        />

        {/* Center AKSOS Node */}
        <motion.g
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: tokens.animation.duration.normal, delay: 0.25 }}
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
            transition={{ duration: tokens.animation.duration.normal, delay: 0.25 }}
          />
        </motion.g>

        {/* Ring Nodes */}
        {breakpoint !== 'mobile' && (
          <>
            {DESKTOP_LAYOUT.innerRing.map((node, index) => (
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
                  labelPosition="top"
                  labelOffset={7}
                  labelFontSize={5}
                  labelColor={tokens.color.muted}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: tokens.animation.duration.normal, delay: node.delay }}
                />
              </motion.g>
            ))}

            {DESKTOP_LAYOUT.middleRing.map((node, index) => (
              <motion.g
                key={`middle-${node.label}`}
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
                  labelPosition="top"
                  labelOffset={7}
                  labelFontSize={5}
                  labelColor={tokens.color.muted}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: tokens.animation.duration.normal, delay: node.delay }}
                />
              </motion.g>
            ))}

            {DESKTOP_LAYOUT.outerRing.map((node, index) => (
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
                  labelPosition="top"
                  labelOffset={7}
                  labelFontSize={5}
                  labelColor={tokens.color.muted}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: tokens.animation.duration.normal, delay: node.delay }}
                />
              </motion.g>
            ))}
          </>
        )}

        {breakpoint === 'mobile' && (
          <>
            {MOBILE_LAYOUT.allNodes.map((node, index) => (
              <motion.g
                key={`${node.ring}-${node.label}`}
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
                  labelPosition="bottom"
                  labelOffset={7}
                  labelFontSize={5}
                  labelColor={tokens.color.muted}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: tokens.animation.duration.normal, delay: node.delay }}
                />
              </motion.g>
            ))}
          </>
        )}

        {/* Connections from AKSOS to all nodes */}
        {breakpoint !== 'mobile' && (
          <>
            {DESKTOP_LAYOUT.innerRing.map((node, index) => {
              const from = { x: CENTER_X, y: CENTER_Y };
              const to = { x: node.x, y: node.y };
              
              // Check if line intersects exclusion zone
              const intersects = lineIntersectsCircle(from, to, EXCLUSION_ZONE.center, EXCLUSION_ZONE.radius);
              
              return (
                <motion.g
                  key={`conn-inner-${node.label}`}
                  initial={{ opacity: 0, pathLength: 0 }}
                  whileInView={{ opacity: 1, pathLength: 1 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: tokens.animation.duration.normal, delay: node.delay + 0.05 }}
                >
                  <DiagramConnection
                    from={from}
                    to={to}
                    stroke={tokens.color.line}
                    strokeWidth={CONNECTION_STROKE_WIDTH}
                    curved={intersects}
                    curvature={0.4}
                    exclusionZone={EXCLUSION_ZONE}
                    initial={{ opacity: 0, pathLength: 0 }}
                    whileInView={{ opacity: 1, pathLength: 1 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: tokens.animation.duration.normal, delay: node.delay + 0.05 }}
                  />
                </motion.g>
              );
            })}

            {DESKTOP_LAYOUT.middleRing.map((node, index) => {
              const from = { x: CENTER_X, y: CENTER_Y };
              const to = { x: node.x, y: node.y };
              
              return (
                <motion.g
                  key={`conn-middle-${node.label}`}
                  initial={{ opacity: 0, pathLength: 0 }}
                  whileInView={{ opacity: 1, pathLength: 1 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: tokens.animation.duration.normal, delay: node.delay + 0.05 }}
                >
                  <DiagramConnection
                    from={from}
                    to={to}
                    stroke={tokens.color.line}
                    strokeWidth={CONNECTION_STROKE_WIDTH}
                    curved={true}
                    curvature={0.5}
                    exclusionZone={EXCLUSION_ZONE}
                    initial={{ opacity: 0, pathLength: 0 }}
                    whileInView={{ opacity: 1, pathLength: 1 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: tokens.animation.duration.normal, delay: node.delay + 0.05 }}
                  />
                </motion.g>
              );
            })}

            {DESKTOP_LAYOUT.outerRing.map((node, index) => {
              const from = { x: CENTER_X, y: CENTER_Y };
              const to = { x: node.x, y: node.y };
              
              return (
                <motion.g
                  key={`conn-outer-${node.label}`}
                  initial={{ opacity: 0, pathLength: 0 }}
                  whileInView={{ opacity: 1, pathLength: 1 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: tokens.animation.duration.normal, delay: node.delay + 0.05 }}
                >
                  <DiagramConnection
                    from={from}
                    to={to}
                    stroke={tokens.color.line}
                    strokeWidth={CONNECTION_STROKE_WIDTH}
                    curved={true}
                    curvature={0.6}
                    exclusionZone={EXCLUSION_ZONE}
                    initial={{ opacity: 0, pathLength: 0 }}
                    whileInView={{ opacity: 1, pathLength: 1 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: tokens.animation.duration.normal, delay: node.delay + 0.05 }}
                  />
                </motion.g>
              );
            })}
          </>
        )}

        {breakpoint === 'mobile' && (
          <>
            {MOBILE_LAYOUT.allNodes.map((node, index) => {
              const from = { x: CENTER_X, y: CENTER_Y };
              const to = { x: node.x, y: node.y };
              
              // For mobile, use vertical connections
              const mobileFrom = { x: CENTER_X, y: CENTER_Y };
              const mobileTo = { x: CENTER_X, y: node.y };
              
              return (
                <motion.g
                  key={`conn-mobile-${node.label}`}
                  initial={{ opacity: 0, pathLength: 0 }}
                  whileInView={{ opacity: 1, pathLength: 1 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: tokens.animation.duration.normal, delay: node.delay + 0.05 }}
                >
                  <DiagramConnection
                    from={mobileFrom}
                    to={mobileTo}
                    stroke={tokens.color.line}
                    strokeWidth={CONNECTION_STROKE_WIDTH}
                    curved={false}
                    initial={{ opacity: 0, pathLength: 0 }}
                    whileInView={{ opacity: 1, pathLength: 1 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: tokens.animation.duration.normal, delay: node.delay + 0.05 }}
                  />
                </motion.g>
              );
            })}
          </>
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
            text="AKSOS NETWORK"
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
            HOVER TO EXPLORE NETWORK
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
            TAP TO EXPLORE NETWORK
          </motion.text>
        )}
      </svg>
    </motion.div>
  );
}

// Generate Africa outline path
function generateAfricaPath(): string {
  const points = AFRICA_OUTLINE;
  let path = `M ${points[0].x} ${points[0].y}`;
  
  for (let i = 1; i < points.length; i++) {
    const p = points[i];
    path += ` L ${p.x} ${p.y}`;
  }
  
  // Close the path
  path += ` Z`;
  
  return path;
}
