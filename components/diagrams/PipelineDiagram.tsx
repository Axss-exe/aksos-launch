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
  useBreakpoint,
} from './primitives';

// =============================================================================
// PIPELINE DIAGRAM
// Horizontal flow: Information to Intelligence Pipeline
// Geometry: Horizontal flow with calculated positions
// Responsive: Converts to vertical stack on mobile
// =============================================================================

// Configuration
const SAFE_MARGIN = 10;
const CENTER_X = 50;
const NODE_R = 2;
const CONNECTION_STROKE_WIDTH = 0.2;
const ARROW_SIZE = 6;

// Pipeline stages
const PIPELINE_STAGES = [
  { label: 'INFORMATION', delay: 0.1 },
  { label: 'KNOWLEDGE', delay: 0.2 },
  { label: 'INTELLIGENCE', delay: 0.3 },
  { label: 'DECISIONS', delay: 0.4 },
  { label: 'ACTIONS', delay: 0.5 },
];

// Calculate desktop layout
function calculateDesktopLayout(viewBoxWidth: number = 100): {
  centerX: number;
  centerY: number;
  stages: { label: string; x: number; y: number; delay: number }[];
  totalHeight: number;
  viewBoxHeight: number;
} {
  const centerX = viewBoxWidth / 2;
  const centerY = 50;
  
  // Calculate text dimensions
  const labelWidths = PIPELINE_STAGES.map(s => 
    calculateTextDimensions(s.label, 5, 0.1).width
  );
  
  // Calculate stage positions (horizontal flow)
  const safeWidth = viewBoxWidth - SAFE_MARGIN * 2;
  const stageSpacing = safeWidth / (PIPELINE_STAGES.length - 1);
  
  const stages = PIPELINE_STAGES.map((stage, index) => ({
    ...stage,
    x: SAFE_MARGIN + index * stageSpacing,
    y: centerY,
  }));
  
  // Calculate total height
  const labelMargin = 15;
  const viewBoxHeight = centerY + labelMargin + SAFE_MARGIN;
  
  return {
    centerX,
    centerY,
    stages,
    totalHeight: viewBoxHeight,
    viewBoxHeight,
  };
}

// Calculate mobile layout (vertical stack)
function calculateMobileLayout(viewBoxWidth: number = 100): {
  centerX: number;
  centerY: number;
  stages: { label: string; x: number; y: number; delay: number }[];
  totalHeight: number;
  viewBoxHeight: number;
} {
  const centerX = viewBoxWidth / 2;
  const startY = 20;
  const spacing = 15;
  
  // Stack stages vertically
  const stages = PIPELINE_STAGES.map((stage, index) => ({
    ...stage,
    x: centerX,
    y: startY + index * spacing,
  }));
  
  const bottomMost = stages[stages.length - 1].y;
  const viewBoxHeight = bottomMost + 20 + SAFE_MARGIN;
  
  return {
    centerX,
    centerY: startY + (PIPELINE_STAGES.length * spacing) / 2,
    stages,
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

export function PipelineDiagram() {
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
      className="pipeline-diagram"
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
        {/* Pipeline Stage Nodes */}
        {layout.stages.map((stage, index) => {
          const isMobile = breakpoint === 'mobile';
          
          return (
            <motion.g
              key={`stage-${stage.label}`}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.normal, delay: stage.delay }}
              whileHover={{ scale: 1.1 }}
            >
              <DiagramNode
                x={stage.x}
                y={stage.y}
                r={NODE_R}
                fill={"#ink}
                stroke={"#line}
                strokeWidth={0.3}
                label={stage.label}
                labelPosition={isMobile ? 'bottom' : 'top'}
                labelOffset={8}
                labelFontSize={5}
                labelColor={"#muted}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.normal, delay: stage.delay }}
              />
            </motion.g>
          );
        })}

        {/* Connections between stages */}
        {layout.stages.slice(0, -1).map((stage, index) => {
          const isMobile = breakpoint === 'mobile';
          const from = { x: stage.x, y: stage.y };
          const to = { x: layout.stages[index + 1].x, y: layout.stages[index + 1].y };
          
          // For mobile, use vertical connections
          const mobileFrom = isMobile ? { x: layout.centerX, y: stage.y } : from;
          const mobileTo = isMobile ? { x: layout.centerX, y: layout.stages[index + 1].y } : to;
          
          return (
            <motion.g
              key={`conn-${stage.label}-${layout.stages[index + 1].label}`}
              initial={{ opacity: 0, pathLength: 0 }}
              whileInView={{ opacity: 1, pathLength: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.normal, delay: stage.delay + 0.05 }}
            >
              <DiagramConnection
                from={isMobile ? mobileFrom : from}
                to={isMobile ? mobileTo : to}
                stroke={"#line}
                strokeWidth={CONNECTION_STROKE_WIDTH}
                curved={false}
                initial={{ opacity: 0, pathLength: 0 }}
                whileInView={{ opacity: 1, pathLength: 1 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.normal, delay: stage.delay + 0.05 }}
              />
              {/* Arrow at end of connection */}
              <DiagramArrow
                x={isMobile ? layout.centerX : layout.stages[index + 1].x}
                y={layout.stages[index + 1].y}
                direction={isMobile ? 'down' : 'left'}
                size={ARROW_SIZE}
                stroke={"#line}
                strokeWidth={0.3}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.normal, delay: stage.delay + 0.1 }}
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
            text="INFORMATION TO INTELLIGENCE PIPELINE"
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
            INFORMATION -> KNOWLEDGE -> INTELLIGENCE -> DECISIONS -> ACTIONS
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
            TAP TO EXPLORE PIPELINE
          </motion.text>
        )}
      </svg>
    </motion.div>
  );
}
