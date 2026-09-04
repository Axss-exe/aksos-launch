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
// CONVERGENCE DIAGRAM
// Flow diagram: FRAGMENTS -> AKSOS -> INTELLIGENCE
// Geometry: 3-column layout with calculated positions, exclusion zone around AKSOS
// Responsive: Converts to vertical stack on mobile
// =============================================================================

// Configuration
const SAFE_MARGIN = 10;
const CENTER_X = 50;
const NODE_R = 2;
const CONNECTION_STROKE_WIDTH = 0.2;
const ARROW_SIZE = 6;

// Column positions for desktop
const DESKTOP_COLUMNS = {
  fragments: { x: 15, y: 50 },
  aksos: { x: 50, y: 50 },
  intelligence: { x: 85, y: 50 },
};

// Input fragments
const FRAGMENTS = [
  { label: 'SIGNALS', delay: 0.1 },
  { label: 'DATA', delay: 0.15 },
  { label: 'OBSERVATIONS', delay: 0.2 },
  { label: 'DOCUMENTS', delay: 0.25 },
  { label: 'REPORTS', delay: 0.3 },
];

// Output intelligence types
const INTELLIGENCE_TYPES = [
  { label: 'CONTEXT', delay: 0.4 },
  { label: 'RELATIONSHIPS', delay: 0.45 },
  { label: 'INSIGHTS', delay: 0.5 },
  { label: 'DECISIONS', delay: 0.55 },
  { label: 'ACTIONS', delay: 0.6 },
];

// Calculate desktop layout
function calculateDesktopLayout(viewBoxWidth: number = 100): {
  centerX: number;
  centerY: number;
  fragments: { label: string; x: number; y: number; delay: number }[];
  intelligence: { label: string; x: number; y: number; delay: number }[];
  totalHeight: number;
  viewBoxHeight: number;
} {
  const centerX = viewBoxWidth / 2;
  const centerY = 50;
  
  // Calculate text dimensions for positioning
  const fragmentWidths = FRAGMENTS.map(f => 
    calculateTextDimensions(f.label, 5, 0.1).width
  );
  const intelligenceWidths = INTELLIGENCE_TYPES.map(i => 
    calculateTextDimensions(i.label, 5, 0.1).width
  );
  
  const maxFragmentWidth = Math.max(...fragmentWidths);
  const maxIntelligenceWidth = Math.max(...intelligenceWidths);
  
  // Position fragments vertically around center
  const fragmentSpacing = 10;
  const fragmentStartY = centerY - (FRAGMENTS.length * fragmentSpacing) / 2 + fragmentSpacing / 2;
  
  const fragments = FRAGMENTS.map((fragment, index) => ({
    ...fragment,
    x: DESKTOP_COLUMNS.fragments.x,
    y: fragmentStartY + index * fragmentSpacing,
  }));
  
  // Position intelligence vertically around center
  const intelligenceSpacing = 10;
  const intelligenceStartY = centerY - (INTELLIGENCE_TYPES.length * intelligenceSpacing) / 2 + intelligenceSpacing / 2;
  
  const intelligence = INTELLIGENCE_TYPES.map((intel, index) => ({
    ...intel,
    x: DESKTOP_COLUMNS.intelligence.x,
    y: intelligenceStartY + index * intelligenceSpacing,
  }));
  
  // Calculate total height needed
  const topMost = Math.min(
    ...fragments.map(f => f.y),
    ...intelligence.map(i => i.y)
  );
  const bottomMost = Math.max(
    ...fragments.map(f => f.y),
    ...intelligence.map(i => i.y)
  );
  
  // Add margins for labels
  const labelMargin = 8;
  const viewBoxHeight = bottomMost + labelMargin + SAFE_MARGIN;
  
  return {
    centerX,
    centerY,
    fragments,
    intelligence,
    totalHeight: viewBoxHeight,
    viewBoxHeight,
  };
}

// Calculate mobile layout (vertical stack)
function calculateMobileLayout(viewBoxWidth: number = 100): {
  centerX: number;
  fragments: { label: string; x: number; y: number; delay: number }[];
  intelligence: { label: string; x: number; y: number; delay: number }[];
  totalHeight: number;
  viewBoxHeight: number;
} {
  const centerX = viewBoxWidth / 2;
  const startY = 20;
  const spacing = 12;
  
  // Stack: FRAGMENTS -> AKSOS -> INTELLIGENCE
  let y = startY;
  
  // Fragments section
  const fragments = FRAGMENTS.map((fragment, index) => {
    const position = {
      ...fragment,
      x: centerX,
      y: y + index * spacing,
    };
    return position;
  });
  
  y += FRAGMENTS.length * spacing + 15; // Space between sections
  
  // AKSOS center point
  const aksosY = y;
  y += 15; // Space after AKSOS
  
  // Intelligence section
  const intelligence = INTELLIGENCE_TYPES.map((intel, index) => ({
    ...intel,
    x: centerX,
    y: y + index * spacing,
  }));
  
  const bottomMost = Math.max(
    ...fragments.map(f => f.y),
    aksosY,
    ...intelligence.map(i => i.y)
  );
  
  const viewBoxHeight = bottomMost + 20 + SAFE_MARGIN;
  
  return {
    centerX,
    fragments,
    intelligence,
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

// Exclusion zone around AKSOS
const EXCLUSION_ZONE = { center: { x: CENTER_X, y: 50 }, radius: 12 };

export function ConvergenceDiagram() {
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
      className="convergence-diagram"
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
        {/* AKSOS Center Node */}
        <motion.g
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.normal, delay: 0.25 }}
          whileHover={{ scale: 1.1 }}
        >
          <DiagramNode
            x={CENTER_X}
            y={50}
            r={4}
            fill={"#ink}
            stroke={"#signal}
            strokeWidth={0.5}
            label="AKSOS"
            labelPosition="bottom"
            labelOffset={8}
            labelFontSize={7}
            labelColor={"#ink}
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.normal, delay: 0.25 }}
          />
        </motion.g>

        {/* Fragment Nodes (Left Column) */}
        {layout.fragments.map((fragment, index) => {
          const isMobile = breakpoint === 'mobile';
          const nodeX = isMobile ? layout.centerX : DESKTOP_COLUMNS.fragments.x;
          
          return (
            <motion.g
              key={`fragment-${fragment.label}`}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.normal, delay: fragment.delay }}
              whileHover={{ scale: 1.1 }}
            >
              <DiagramNode
                x={fragment.x}
                y={fragment.y}
                r={NODE_R}
                fill={"#ink}
                stroke={"#line}
                strokeWidth={0.3}
                label={fragment.label}
                labelPosition={isMobile ? 'bottom' : 'right'}
                labelOffset={8}
                labelFontSize={5}
                labelColor={"#muted}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.normal, delay: fragment.delay }}
              />
            </motion.g>
          );
        })}

        {/* Intelligence Nodes (Right Column) */}
        {layout.intelligence.map((intel, index) => {
          const isMobile = breakpoint === 'mobile';
          
          return (
            <motion.g
              key={`intel-${intel.label}`}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.normal, delay: intel.delay }}
              whileHover={{ scale: 1.1 }}
            >
              <DiagramNode
                x={intel.x}
                y={intel.y}
                r={NODE_R}
                fill={"#ink}
                stroke={"#line}
                strokeWidth={0.3}
                label={intel.label}
                labelPosition={isMobile ? 'bottom' : 'left'}
                labelOffset={8}
                labelFontSize={5}
                labelColor={"#muted}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.normal, delay: intel.delay }}
              />
            </motion.g>
          );
        })}

        {/* Connections from Fragments to AKSOS */}
        {layout.fragments.map((fragment, index) => {
          const isMobile = breakpoint === 'mobile';
          const from = { x: fragment.x, y: fragment.y };
          const to = { x: CENTER_X, y: 50 };
          
          // For mobile, adjust connection to work with vertical layout
          const mobileFrom = isMobile ? { x: layout.centerX, y: fragment.y } : from;
          const mobileTo = isMobile ? { x: layout.centerX, y: 50 } : to;
          
          return (
            <motion.g
              key={`conn-frag-${fragment.label}`}
              initial={{ opacity: 0, pathLength: 0 }}
              whileInView={{ opacity: 1, pathLength: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.normal, delay: fragment.delay + 0.05 }}
            >
              <DiagramConnection
                from={isMobile ? mobileFrom : from}
                to={isMobile ? mobileTo : to}
                stroke={"#line}
                strokeWidth={CONNECTION_STROKE_WIDTH}
                curved={!isMobile}
                curvature={0.4}
                exclusionZone={EXCLUSION_ZONE}
                initial={{ opacity: 0, pathLength: 0 }}
                whileInView={{ opacity: 1, pathLength: 1 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.normal, delay: fragment.delay + 0.05 }}
              />
              {/* Arrow at AKSOS end */}
              <DiagramArrow
                x={isMobile ? layout.centerX : CENTER_X}
                y={50}
                direction="left"
                size={ARROW_SIZE}
                stroke={"#line}
                strokeWidth={0.3}
                initial={{ opacity: 0, x: isMobile ? layout.centerX - 5 : CENTER_X - 5 }}
                whileInView={{ opacity: 1, x: isMobile ? layout.centerX : CENTER_X }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.normal, delay: fragment.delay + 0.1 }}
              />
            </motion.g>
          );
        })}

        {/* Connections from AKSOS to Intelligence */}
        {layout.intelligence.map((intel, index) => {
          const isMobile = breakpoint === 'mobile';
          const from = { x: CENTER_X, y: 50 };
          const to = { x: intel.x, y: intel.y };
          
          const mobileFrom = isMobile ? { x: layout.centerX, y: 50 } : from;
          const mobileTo = isMobile ? { x: layout.centerX, y: intel.y } : to;
          
          return (
            <motion.g
              key={`conn-intel-${intel.label}`}
              initial={{ opacity: 0, pathLength: 0 }}
              whileInView={{ opacity: 1, pathLength: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.normal, delay: intel.delay + 0.05 }}
            >
              <DiagramConnection
                from={isMobile ? mobileFrom : from}
                to={isMobile ? mobileTo : to}
                stroke={"#line}
                strokeWidth={CONNECTION_STROKE_WIDTH}
                curved={!isMobile}
                curvature={0.4}
                exclusionZone={EXCLUSION_ZONE}
                initial={{ opacity: 0, pathLength: 0 }}
                whileInView={{ opacity: 1, pathLength: 1 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.normal, delay: intel.delay + 0.05 }}
              />
              {/* Arrow at Intelligence end */}
              <DiagramArrow
                x={isMobile ? layout.centerX : intel.x}
                y={intel.y}
                direction="right"
                size={ARROW_SIZE}
                stroke={"#line}
                strokeWidth={0.3}
                initial={{ opacity: 0, x: isMobile ? layout.centerX + 5 : intel.x + 5 }}
                whileInView={{ opacity: 1, x: isMobile ? layout.centerX : intel.x }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.normal, delay: intel.delay + 0.1 }}
              />
            </motion.g>
          );
        })}

        {/* Column Headers for Desktop */}
        {breakpoint !== 'mobile' && (
          <motion.g
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.normal, delay: 0.05 }}
          >
            <DiagramLabel
              x={DESKTOP_COLUMNS.fragments.x}
              y={10}
              text="FRAGMENTS"
              textAnchor="middle"
              fontSize={7}
              fill={"#ink}
              letterSpacing={0.1}
            />
            <DiagramLabel
              x={CENTER_X}
              y={10}
              text="AKSOS"
              textAnchor="middle"
              fontSize={7}
              fill={"#ink}
              letterSpacing={0.1}
            />
            <DiagramLabel
              x={DESKTOP_COLUMNS.intelligence.x}
              y={10}
              text="INTELLIGENCE"
              textAnchor="middle"
              fontSize={7}
              fill={"#ink}
              letterSpacing={0.1}
            />
          </motion.g>
        )}

        {/* Flow arrows between columns for desktop */}
        {breakpoint !== 'mobile' && (
          <motion.g
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.normal, delay: 0.35 }}
          >
            <DiagramArrow
              x={32}
              y={50}
              direction="right"
              size={12}
              stroke={"#line}
              strokeWidth={0.3}
            />
            <DiagramArrow
              x={68}
              y={50}
              direction="right"
              size={12}
              stroke={"#line}
              strokeWidth={0.3}
            />
          </motion.g>
        )}

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
            text="CONVERGENCE"
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
            FRAGMENTS -> AKSOS -> INTELLIGENCE
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
            TAP TO EXPLORE CONNECTIONS
          </motion.text>
        )}
      </svg>
    </motion.div>
  );
}
