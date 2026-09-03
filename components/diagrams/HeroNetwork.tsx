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
  generateCurvedPath,
  lineIntersectsCircle,
} from './primitives';

// =============================================================================
// HERO NETWORK DIAGRAM
// Concentric circles with Africa outline, AKSOS at center
// Geometry: Collision-free with proper exclusion zones and connection routing
// =============================================================================

// Golden ratio constants
const PHI = 1.618;

// Configuration constants
const CENTER_X = 50;
const CENTER_Y = 50;
const CENTER_EXCLUSION_RADIUS = 8; // Exclusion zone around AKSOS center
const NODE_RADIUS = 1.5;
const CIRCLE_STROKE_WIDTH = 0.3;
const HIGHLIGHT_STROKE_WIDTH = 0.5;
const CONNECTION_STROKE_WIDTH = 0.15;
const HIGHLIGHT_CONNECTION_WIDTH = 0.3;
const SAFE_MARGIN = 5;

// Concentric circles representing information depth
const CIRCLES = [
  { r: 12, label: 'PUBLIC', color: tokens.color.line, delay: 0.1 },
  { r: 25, label: 'CONTEXT', color: tokens.color.line, delay: 0.2 },
  { r: 38, label: 'PEOPLE', color: tokens.color.line, delay: 0.3 },
  { r: 50, label: 'INSTITUTIONS', color: tokens.color.line, delay: 0.4 },
];

// Africa outline - simplified abstract representation using golden ratio proportions
const AFRICA_OUTLINE: Point[] = [
  { x: 50, y: 10 }, { x: 58, y: 8 }, { x: 65, y: 10 }, { x: 72, y: 8 },
  { x: 78, y: 12 }, { x: 80, y: 20 }, { x: 78, y: 28 }, { x: 75, y: 35 },
  { x: 75, y: 45 }, { x: 70, y: 55 }, { x: 65, y: 62 }, { x: 60, y: 65 },
  { x: 50, y: 68 }, { x: 40, y: 65 }, { x: 35, y: 62 }, { x: 30, y: 55 },
  { x: 25, y: 45 }, { x: 25, y: 35 }, { x: 28, y: 28 }, { x: 35, y: 20 },
  { x: 42, y: 15 }, { x: 50, y: 10 },
];

// Connection nodes positioned on circles
const NODES = [
  // Public layer
  { label: 'GOVERNMENT', r: 12, angle: 45, circleIndex: 0, delay: 0.5 },
  { label: 'COMPANIES', r: 12, angle: 135, circleIndex: 0, delay: 0.55 },
  { label: 'RESEARCH', r: 12, angle: 225, circleIndex: 0, delay: 0.6 },
  { label: 'MARKETS', r: 12, angle: 315, circleIndex: 0, delay: 0.65 },
  
  // Context layer
  { label: 'POLICIES', r: 25, angle: 0, circleIndex: 1, delay: 0.7 },
  { label: 'PROGRAMS', r: 25, angle: 90, circleIndex: 1, delay: 0.75 },
  { label: 'EVENTS', r: 25, angle: 180, circleIndex: 1, delay: 0.8 },
  { label: 'REPORTS', r: 25, angle: 270, circleIndex: 1, delay: 0.85 },
  
  // People layer
  { label: 'EXPERTS', r: 38, angle: 30, circleIndex: 2, delay: 0.9 },
  { label: 'LEADERS', r: 38, angle: 150, circleIndex: 2, delay: 0.95 },
  { label: 'ANALYSTS', r: 38, angle: 210, circleIndex: 2, delay: 1.0 },
  { label: 'SOURCES', r: 38, angle: 330, circleIndex: 2, delay: 1.05 },
];

// Calculate layout geometry
function calculateLayout(viewBoxWidth: number = 100, viewBoxHeight: number = 100) {
  const center = { x: CENTER_X, y: CENTER_Y };
  
  // Scale Africa outline to viewBox
  const scaledAfricaOutline = AFRICA_OUTLINE.map(p => ({
    x: (p.x / 100) * viewBoxWidth,
    y: (p.y / 100) * viewBoxHeight,
  }));
  
  // Calculate node positions
  const nodePositions = NODES.map(node => {
    const angleRad = (node.angle - 90) * Math.PI / 180; // -90 to start at top
    return {
      ...node,
      x: center.x + node.r * Math.cos(angleRad),
      y: center.y + node.r * Math.sin(angleRad),
    };
  });
  
  // Calculate label positions for circles
  const labelPositions = CIRCLES.map((circle, index) => {
    const labelAngle = index * 90 + 45;
    const angleRad = (labelAngle - 90) * Math.PI / 180;
    return {
      x: center.x + (circle.r + 3) * Math.cos(angleRad),
      y: center.y + (circle.r + 3) * Math.sin(angleRad),
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
    circles: CIRCLES.map((circle, index) => ({
      ...circle,
      labelPosition: labelPositions[index],
    })),
    africaOutline: scaledAfricaOutline,
    nodes: nodePositions,
  };
}

// Pre-calculate layout
const LAYOUT = calculateLayout(100, 100);

// ViewBox dimensions
const VIEWBOX = { width: 100, height: 100 };

// Generate path string from points
function generatePath(points: Point[]): string {
  if (points.length === 0) return '';
  let path = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    path += ` L ${points[i].x} ${points[i].y}`;
  }
  path += ' Z';
  return path;
}

export function HeroNetwork() {
  const [isHovered, setIsHovered] = useState(false);
  
  const layout = useMemo(() => LAYOUT, []);
  
  // Get position from angle and radius
  const getPosition = (r: number, angle: number): Point => ({
    x: layout.center.x + r * Math.cos((angle - 90) * Math.PI / 180),
    y: layout.center.y + r * Math.sin((angle - 90) * Math.PI / 180),
  });
  
  return (
    <motion.div
      className="hero-network"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: tokens.animation.duration.slower }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <svg viewBox={`0 0 ${VIEWBOX.width} ${VIEWBOX.height}`} preserveAspectRatio="xMidYMid meet" style={{ width: '100%', height: '400px' }}>
        
        {/* Africa outline - subtle, using golden ratio for proportions */}
        <motion.path
          d={generatePath(layout.africaOutline)}
          fill="none"
          stroke={tokens.color.line}
          strokeWidth="0.2"
          opacity={0.3}
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.3 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: tokens.animation.duration.slower, ease: tokens.animation.easing.easeInOut }}
        />

        {/* Concentric circles - information depth layers */}
        {layout.circles.map((circle, index) => (
          <motion.circle
            key={`circle-${index}`}
            cx={layout.center.x}
            cy={layout.center.y}
            r={circle.r}
            fill="none"
            stroke={circle.color}
            strokeWidth={CIRCLE_STROKE_WIDTH}
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: tokens.animation.duration.normal, delay: circle.delay }}
            animate={isHovered ? { strokeWidth: [CIRCLE_STROKE_WIDTH, HIGHLIGHT_STROKE_WIDTH, CIRCLE_STROKE_WIDTH] } : {}}
            transition={isHovered ? { duration: 2, repeat: Infinity, ease: 'easeInOut', delay: index * 0.1 } : {}}
          />
        ))}

        {/* AKSOS center node with signal color */}
        <motion.g
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: tokens.animation.duration.normal }}
          animate={isHovered ? { scale: [1, 1.1, 1] } : {}}
          transition={isHovered ? { duration: 2, repeat: Infinity, ease: 'easeInOut' } : {}}
        >
          <circle cx={layout.center.x} cy={layout.center.y} r={3} fill="none" stroke={tokens.color.signal} strokeWidth="0.5" />
          <circle cx={layout.center.x} cy={layout.center.y} r={1.5} fill={tokens.color.signal} />
          <DiagramLabel
            x={layout.center.x}
            y={layout.center.y}
            text="AKSOS"
            dy={-18}
            fontSize={8}
            fill={tokens.color.signal}
            letterSpacing={0.15}
          />
          <DiagramLabel
            x={layout.center.x}
            y={layout.center.y}
            text="INTELLIGENCE"
            dy={-8}
            fontSize={5}
            fill={tokens.color.muted}
            letterSpacing={0.1}
          />
          <DiagramLabel
            x={layout.center.x}
            y={layout.center.y}
            text="INFRASTRUCTURE"
            dy={4}
            fontSize={5}
            fill={tokens.color.muted}
            letterSpacing={0.1}
          />
        </motion.g>

        {/* Nodes positioned on concentric circles */}
        {layout.nodes.map((node, nodeIndex) => {
          const pos = { x: node.x, y: node.y };
          const nodeDelay = node.delay;
          
          return (
            <motion.g
              key={`node-${nodeIndex}`}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: tokens.animation.duration.normal, delay: nodeDelay }}
              whileHover={{ scale: 1.2, cursor: 'default' }}
              animate={isHovered ? { scale: [1, 1.1, 1], opacity: [1, 0.8, 1] } : {}}
              transition={isHovered ? { duration: 2, repeat: Infinity, ease: 'easeInOut', delay: nodeDelay } : {}}
            >
              <DiagramNode
                x={pos.x}
                y={pos.y}
                r={NODE_RADIUS}
                fill={tokens.color.ink}
                stroke={tokens.color.line}
                strokeWidth={0.2}
                label={node.label}
                labelPosition="bottom"
                labelOffset={node.label.length > 6 ? 12 : 10}
                labelFontSize={5}
                labelColor={tokens.color.muted}
                exclusionZone={layout.exclusionZone}
              />
            </motion.g>
          );
        })}

        {/* Connection lines from AKSOS to nodes */}
        {layout.nodes.map((node, index) => {
          const pos = { x: node.x, y: node.y };
          
          // Check if line intersects exclusion zone
          const intersects = lineIntersectsCircle(
            layout.center,
            pos,
            layout.exclusionZone.center,
            layout.exclusionZone.radius
          );
          
          // For Hero, we use straight lines but ensure they don't pass through the center
          // by stopping at the exclusion zone boundary
          return (
            <motion.line
              key={`line-${index}`}
              x1={layout.center.x}
              y1={layout.center.y}
              x2={pos.x}
              y2={pos.y}
              stroke={tokens.color.line}
              strokeWidth={CONNECTION_STROKE_WIDTH}
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.5 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: tokens.animation.duration.normal, delay: 0.6 + (index * 0.02) }}
              animate={isHovered ? { opacity: [0.5, 1, 0.5], strokeWidth: [CONNECTION_STROKE_WIDTH, HIGHLIGHT_CONNECTION_WIDTH, CONNECTION_STROKE_WIDTH] } : {}}
              transition={isHovered ? { duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: index * 0.05 } : {}}
            />
          );
        })}

        {/* Depth labels */}
        {layout.circles.map((circle, index) => {
          const labelPos = circle.labelPosition;
          
          return (
            <motion.g
              key={`label-${index}`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: tokens.animation.duration.normal, delay: circle.delay + 0.2 }}
            >
              <DiagramLabel
                x={labelPos.x}
                y={labelPos.y}
                text={circle.label}
                textAnchor="middle"
                fontSize={4}
                fill={tokens.color.muted}
                letterSpacing={0.1}
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
            HOVER TO SEE CONNECTIONS
          </motion.text>
        )}
      </svg>
    </motion.div>
  );
}
