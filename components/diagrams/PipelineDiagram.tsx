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
  calculateHorizontalFlowPositions,
} from './primitives';

// =============================================================================
// PIPELINE DIAGRAM
// Horizontal flow: Information to Intelligence Pipeline
// Geometry: Calculated horizontal positions, no control characters, proper arrows
// =============================================================================

// Golden ratio for proportions
const PHI = 1.618;

// Configuration constants
const CENTER_Y = 50;
const NODE_RADIUS = 2.5;
const LINE_STROKE_WIDTH = 0.3;
const HIGHLIGHT_STROKE_WIDTH = 0.5;
const SAFE_MARGIN = 8;

// Stages with golden ratio spacing
const STAGES = [
  { label: 'SIGNALS', x: 5, delay: 0.1, stageIndex: 0 },
  { label: 'SOURCE', x: 20, delay: 0.2, stageIndex: 1 },
  { label: 'EVIDENCE', x: 35, delay: 0.3, stageIndex: 2 },
  { label: 'CONTEXT', x: 50, delay: 0.4, stageIndex: 3 },
  { label: 'RELATIONSHIPS', x: 65, delay: 0.5, stageIndex: 4 },
  { label: 'RITA', x: 80, delay: 0.6, stageIndex: 5 },
  { label: 'STORY', x: 90, delay: 0.7, stageIndex: 6 },
  { label: 'ACTION', x: 98, delay: 0.8, stageIndex: 7 },
];

// Calculate layout geometry
function calculateLayout(viewBoxWidth: number = 100, viewBoxHeight: number = 100) {
  const centerY = viewBoxHeight / 2;
  
  // Calculate positions for each stage
  const positions: Point[] = STAGES.map(stage => ({
    x: (stage.x / 100) * viewBoxWidth,
    y: centerY,
  }));
  
  // Calculate label dimensions for positioning
  const labelDims = STAGES.map(stage => 
    calculateTextDimensions(stage.label, stage.label === 'RITA' ? 6 : 5, 0.1)
  );
  
  return {
    viewBox: { width: viewBoxWidth, height: viewBoxHeight },
    centerY,
    positions,
    labelDims,
  };
}

// Pre-calculate layout
const LAYOUT = calculateLayout(100, 100);

// ViewBox dimensions
const VIEWBOX = { width: 100, height: 100 };

export function PipelineDiagram() {
  const [isHovered, setIsHovered] = useState(false);
  const [highlightedStage, setHighlightedStage] = useState<number | null>(null);
  
  const layout = useMemo(() => LAYOUT, []);
  
  return (
    <motion.div
      className="pipeline-diagram"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: tokens.animation.duration.slow }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => {
        setIsHovered(false);
        setHighlightedStage(null);
      }}
    >
      <svg 
        viewBox={`0 0 ${VIEWBOX.width} ${VIEWBOX.height}`} 
        preserveAspectRatio="xMidYMid meet"
        style={{ width: '100%', height: '400px' }}
      >
        
        {/* Main flow line */}
        <motion.path
          d={`M ${SAFE_MARGIN} ${layout.centerY} H ${VIEWBOX.width - SAFE_MARGIN}`}
          fill="none"
          stroke={tokens.color.line}
          strokeWidth={LINE_STROKE_WIDTH}
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: tokens.animation.duration.slower, delay: 0.1 }}
          animate={isHovered ? { strokeWidth: [LINE_STROKE_WIDTH, HIGHLIGHT_STROKE_WIDTH, LINE_STROKE_WIDTH] } : {}}
          transition={isHovered ? { duration: 3, repeat: Infinity, ease: 'easeInOut' } : {}}
        />

        {/* Stage nodes */}
        {STAGES.map((stage, index) => {
          const pos = layout.positions[index];
          const isHighlighted = highlightedStage === stage.stageIndex || isHovered;
          const circleSize = stage.label === 'RITA' ? 3.5 : NODE_RADIUS;
          const fontSize = stage.label === 'RITA' ? 6 : 5;
          const signalColor = stage.label === 'RITA' ? tokens.color.signal : tokens.color.ink;
          
          return (
            <motion.g
              key={stage.label}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: tokens.animation.duration.normal, delay: stage.delay }}
              whileHover={{ scale: 1.15 }}
              onHoverStart={() => setHighlightedStage(stage.stageIndex)}
              onHoverEnd={() => setHighlightedStage(null)}
              animate={isHovered ? { scale: [1, 1.1, 1] } : {}}
              transition={isHovered ? { duration: 2, repeat: Infinity, ease: 'easeInOut', delay: index * 0.05 } : {}}
            >
              {/* Node circle */}
              <circle 
                cx={pos.x} 
                cy={pos.y} 
                r={circleSize}
                fill={stage.label === 'RITA' ? tokens.color.signal : 'none'}
                stroke={isHighlighted ? tokens.color.signal : signalColor}
                strokeWidth={isHighlighted ? HIGHLIGHT_STROKE_WIDTH : stage.label === 'RITA' ? 0.5 : 0.3}
              />
              
              {/* Stage label */}
              <DiagramLabel
                x={pos.x}
                y={pos.y}
                text={stage.label}
                textAnchor="middle"
                dy={stage.label.length > 6 ? 14 : 12}
                fontSize={fontSize}
                fill={isHighlighted ? tokens.color.signal : signalColor}
                letterSpacing={0.1}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: tokens.animation.duration.normal, delay: stage.delay + 0.1 }}
              />
            </motion.g>
          );
        })}

        {/* Arrow indicators between stages - PROPER SVG ARROWS (no control characters) */}
        {STAGES.map((stage, index) => {
          if (index === STAGES.length - 1) return null;
          
          const midX = (layout.positions[index].x + layout.positions[index + 1].x) / 2;
          
          return (
            <motion.g
              key={`arrow-${index}`}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: tokens.animation.duration.normal, delay: stage.delay + 0.1 }}
              animate={isHovered ? { opacity: [0.5, 1, 0.5], scale: [1, 1.2, 1] } : {}}
              transition={isHovered ? { duration: 1, repeat: Infinity, ease: 'easeInOut', delay: index * 0.1 } : {}}
            >
              <DiagramArrow
                x={midX}
                y={layout.centerY}
                direction="right"
                size={6}
                stroke={tokens.color.muted}
                strokeWidth={0.3}
                fill={tokens.color.muted}
              />
            </motion.g>
          );
        })}

        {/* Flow label at top */}
        <motion.g
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: tokens.animation.duration.normal, delay: 0.2 }}
        >
          <DiagramLabel
            x={VIEWBOX.width / 2}
            y={12}
            text="INFORMATION" 
            textAnchor="middle"
            fontSize={5}
            fill={tokens.color.muted}
            letterSpacing={0.1}
          />
          <DiagramArrow
            x={VIEWBOX.width / 2}
            y={18}
            direction="right"
            size={5}
            stroke={tokens.color.muted}
            strokeWidth={0.2}
            fill={tokens.color.muted}
          />
          <DiagramLabel
            x={VIEWBOX.width / 2}
            y={24}
            text="INTELLIGENCE"
            textAnchor="middle"
            fontSize={5}
            fill={tokens.color.muted}
            letterSpacing={0.1}
          />
        </motion.g>

        {/* Hover indicator */}
        {isHovered && (
          <motion.text
            x={VIEWBOX.width / 2}
            y={92}
            textAnchor="middle"
            fontSize="4"
            fontFamily={tokens.font.mono}
            fill={tokens.color.muted}
            letterSpacing="0.1em"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            HOVER TO SEE FLOW
          </motion.text>
        )}
      </svg>
    </motion.div>
  );
}
