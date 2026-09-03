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
  calculateCircularPositions,
} from './primitives';

// =============================================================================
// CONVERGENCE DIAGRAM
// Flow diagram: FRAGMENTS → AKSOS → INTELLIGENCE
// Geometry: Calculated with safe zones, no control characters, proper arrows
// =============================================================================

// Configuration constants
const SAFE_MARGIN = 8;
const CENTER_EXCLUSION_RADIUS = 12; // Exclusion zone around AKSOS
const NODE_RADIUS = 2;
const LINE_STROKE_WIDTH = 0.2;
const HIGHLIGHT_STROKE_WIDTH = 0.4;

// Column positions (percentage of viewBox width)
const INPUT_COLUMN_X = 20; // Left column for fragments and data
const AKSOS_COLUMN_X = 50; // Center column for AKSOS
const OUTPUT_COLUMN_X = 80; // Right column for outputs

// Fragments and data sources (input)
const FRAGMENTS = [
  { label: 'PEOPLE', delay: 0.1 },
  { label: 'INSTITUTIONS', delay: 0.2 },
  { label: 'RESEARCHERS', delay: 0.3 },
  { label: 'ORGANIZATIONS', delay: 0.4 },
];

const DATA_SOURCES = [
  { label: 'EVIDENCE', delay: 0.15 },
  { label: 'DATA', delay: 0.25 },
  { label: 'LOCAL KNOWLEDGE', delay: 0.35 },
];

// Output stages (right side)
const OUTPUTS = [
  { label: 'CONTEXT', delay: 0.5, stage: 0 },
  { label: 'RELATIONSHIPS', delay: 0.6, stage: 1 },
  { label: 'INTELLIGENCE', delay: 0.7, stage: 2 },
];

// Final output
const FINAL_OUTPUT = {
  label: 'ONE COHERENT',
  sublabel: 'PICTURE',
  delay: 0.8,
};

// Calculate layout geometry
function calculateLayout(viewBoxWidth: number = 100, viewBoxHeight: number = 100) {
  const centerX = viewBoxWidth / 2;
  const centerY = viewBoxHeight / 2;
  
  // Calculate positions for input nodes (left side)
  const inputX = (INPUT_COLUMN_X / 100) * viewBoxWidth;
  const aksosX = (AKSOS_COLUMN_X / 100) * viewBoxWidth;
  const outputX = (OUTPUT_COLUMN_X / 100) * viewBoxWidth;
  
  // Calculate Y positions for fragments (top group)
  const fragmentSpacing = viewBoxHeight * 0.12;
  const fragmentStartY = centerY - fragmentSpacing * 1.5;
  
  const fragmentPositions = FRAGMENTS.map((_, index) => ({
    x: inputX,
    y: fragmentStartY + index * fragmentSpacing,
  }));
  
  // Calculate Y positions for data sources (bottom group)
  const dataSpacing = viewBoxHeight * 0.1;
  const dataStartY = centerY + fragmentSpacing * 0.5;
  
  const dataPositions = DATA_SOURCES.map((_, index) => ({
    x: inputX,
    y: dataStartY + index * dataSpacing,
  }));
  
  // Calculate Y positions for outputs (right side)
  const outputSpacing = viewBoxHeight * 0.15;
  const outputStartY = centerY - outputSpacing;
  
  const outputPositions = OUTPUTS.map((_, index) => ({
    x: outputX,
    y: outputStartY + index * outputSpacing,
  }));
  
  // Final output position
  const finalOutputY = viewBoxHeight - viewBoxHeight * 0.15;
  
  // AKSOS center position
  const aksosPosition = { x: aksosX, y: centerY };
  
  // Exclusion zone around AKSOS
  const exclusionZone = {
    center: aksosPosition,
    radius: CENTER_EXCLUSION_RADIUS,
  };
  
  return {
    viewBox: { width: viewBoxWidth, height: viewBoxHeight },
    center: { x: centerX, y: centerY },
    aksos: aksosPosition,
    exclusionZone,
    fragments: { positions: fragmentPositions, items: FRAGMENTS },
    dataSources: { positions: dataPositions, items: DATA_SOURCES },
    outputs: { positions: outputPositions, items: OUTPUTS },
    finalOutput: { x: outputX, y: finalOutputY, ...FINAL_OUTPUT },
    inputX,
    aksosX,
    outputX,
  };
}

// Pre-calculate layout
const LAYOUT = calculateLayout(100, 100);

// ViewBox dimensions
const VIEWBOX = { width: 100, height: 100 };

export function ConvergenceDiagram() {
  const [isHovered, setIsHovered] = useState(false);
  const [highlightedStage, setHighlightedStage] = useState<number | null>(null);
  
  const layout = useMemo(() => LAYOUT, []);
  
  return (
    <motion.div
      className="convergence-diagram"
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
        
        {/* AKSOS center node with signal color */}
        <motion.g
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: tokens.animation.duration.normal }}
          animate={isHovered ? { scale: [1, 1.05, 1] } : {}}
          transition={isHovered ? { duration: 2, repeat: Infinity, ease: 'easeInOut' } : {}}
        >
          <circle 
            cx={layout.aksos.x} 
            cy={layout.aksos.y} 
            r={8} 
            fill="none" 
            stroke={tokens.color.signal} 
            strokeWidth="0.5"
          />
          <DiagramLabel
            x={layout.aksos.x}
            y={layout.aksos.y}
            text="AKSOS"
            dy={-2}
            fontSize={8}
            fill={tokens.color.signal}
            letterSpacing={0.15}
          />
        </motion.g>

        {/* Input fragments - left side */}
        {layout.fragments.positions.map((pos, index) => {
          const fragment = layout.fragments.items[index];
          const isHighlighted = highlightedStage === 0 || isHovered;
          
          return (
            <motion.g
              key={`fragment-${index}`}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: tokens.animation.duration.normal, delay: fragment.delay }}
              whileHover={{ scale: 1.1, x: -2 }}
              onHoverStart={() => setHighlightedStage(0)}
              onHoverEnd={() => setHighlightedStage(null)}
            >
              {/* Node */}
              <DiagramNode
                x={pos.x}
                y={pos.y}
                r={NODE_RADIUS}
                fill={tokens.color.ink}
                stroke={isHighlighted ? tokens.color.signal : tokens.color.line}
                strokeWidth={isHighlighted ? HIGHLIGHT_STROKE_WIDTH : LINE_STROKE_WIDTH}
                label={fragment.label}
                labelPosition="left"
                labelOffset={8}
                labelFontSize={6}
                labelColor={tokens.color.ink}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: tokens.animation.duration.normal, delay: fragment.delay }}
              />
              
              {/* Connection line to AKSOS (avoiding exclusion zone) */}
              <DiagramConnection
                from={{ x: pos.x, y: pos.y }}
                to={layout.aksos}
                stroke={isHighlighted ? tokens.color.signal : tokens.color.line}
                strokeWidth={isHighlighted ? HIGHLIGHT_STROKE_WIDTH : LINE_STROKE_WIDTH}
                strokeDasharray="2,2"
                exclusionZone={layout.exclusionZone}
                curved
                curvature={0.3}
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: tokens.animation.duration.normal, delay: fragment.delay + 0.1 }}
              />
            </motion.g>
          );
        })}

        {/* Input data - left side, lower */}
        {layout.dataSources.positions.map((pos, index) => {
          const source = layout.dataSources.items[index];
          const isHighlighted = highlightedStage === 0 || isHovered;
          
          return (
            <motion.g
              key={`source-${index}`}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: tokens.animation.duration.normal, delay: source.delay }}
              whileHover={{ scale: 1.1, x: -2 }}
              onHoverStart={() => setHighlightedStage(0)}
              onHoverEnd={() => setHighlightedStage(null)}
            >
              {/* Node */}
              <DiagramNode
                x={pos.x}
                y={pos.y}
                r={NODE_RADIUS}
                fill={tokens.color.ink}
                stroke={isHighlighted ? tokens.color.signal : tokens.color.line}
                strokeWidth={isHighlighted ? HIGHLIGHT_STROKE_WIDTH : LINE_STROKE_WIDTH}
                label={source.label}
                labelPosition="left"
                labelOffset={8}
                labelFontSize={6}
                labelColor={tokens.color.ink}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: tokens.animation.duration.normal, delay: source.delay }}
              />
              
              {/* Connection line to AKSOS (avoiding exclusion zone) */}
              <DiagramConnection
                from={{ x: pos.x, y: pos.y }}
                to={layout.aksos}
                stroke={isHighlighted ? tokens.color.signal : tokens.color.line}
                strokeWidth={isHighlighted ? HIGHLIGHT_STROKE_WIDTH : LINE_STROKE_WIDTH}
                strokeDasharray="2,2"
                exclusionZone={layout.exclusionZone}
                curved
                curvature={0.3}
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: tokens.animation.duration.normal, delay: source.delay + 0.1 }}
              />
            </motion.g>
          );
        })}

        {/* Outputs - right side */}
        {layout.outputs.positions.map((pos, index) => {
          const output = layout.outputs.items[index];
          const isHighlighted = highlightedStage === output.stage || isHovered;
          
          return (
            <motion.g
              key={`output-${index}`}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: tokens.animation.duration.normal, delay: output.delay }}
              whileHover={{ scale: 1.1, x: 2 }}
              onHoverStart={() => setHighlightedStage(output.stage)}
              onHoverEnd={() => setHighlightedStage(null)}
            >
              {/* Connection line from AKSOS (avoiding exclusion zone) */}
              <DiagramConnection
                from={layout.aksos}
                to={{ x: pos.x, y: pos.y }}
                stroke={isHighlighted ? tokens.color.signal : tokens.color.line}
                strokeWidth={isHighlighted ? HIGHLIGHT_STROKE_WIDTH : LINE_STROKE_WIDTH}
                strokeDasharray="2,2"
                exclusionZone={layout.exclusionZone}
                curved
                curvature={0.3}
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: tokens.animation.duration.normal, delay: output.delay + 0.1 }}
              />
              
              {/* Node */}
              <DiagramNode
                x={pos.x}
                y={pos.y}
                r={NODE_RADIUS}
                fill={tokens.color.ink}
                stroke={isHighlighted ? tokens.color.signal : tokens.color.line}
                strokeWidth={isHighlighted ? HIGHLIGHT_STROKE_WIDTH : LINE_STROKE_WIDTH}
                label={output.label}
                labelPosition="right"
                labelOffset={8}
                labelFontSize={6}
                labelColor={tokens.color.ink}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: tokens.animation.duration.normal, delay: output.delay }}
              />
            </motion.g>
          );
        })}

        {/* Final output box */}
        <motion.g
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: tokens.animation.duration.normal, delay: FINAL_OUTPUT.delay }}
          whileHover={{ scale: 1.05 }}
          onHoverStart={() => setHighlightedStage(3)}
          onHoverEnd={() => setHighlightedStage(null)}
        >
          <rect 
            x={layout.finalOutput.x - 10} 
            y={layout.finalOutput.y - 4} 
            width={20} 
            height={12} 
            fill="none" 
            stroke={highlightedStage === 3 || isHovered ? tokens.color.signal : tokens.color.line} 
            strokeWidth={highlightedStage === 3 || isHovered ? 0.5 : 0.3}
          />
          <DiagramLabel
            x={layout.finalOutput.x}
            y={layout.finalOutput.y}
            text={layout.finalOutput.label}
            fontSize={5}
            fill={tokens.color.muted}
            letterSpacing={0.1}
          />
          <DiagramLabel
            x={layout.finalOutput.x}
            y={layout.finalOutput.y + 6}
            text={layout.finalOutput.sublabel}
            fontSize={5}
            fill={tokens.color.muted}
            letterSpacing={0.1}
          />
        </motion.g>

        {/* Flow arrows - PROPER SVG ARROWS (no control characters) */}
        <motion.g
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: tokens.animation.duration.normal, delay: 0.4 }}
          animate={isHovered ? { opacity: [0.5, 1, 0.5] } : {}}
          transition={isHovered ? { duration: 1.5, repeat: Infinity } : {}}
        >
          {/* Arrow from input to AKSOS */}
          <DiagramArrow
            x={37.5}
            y={layout.aksos.y}
            direction="right"
            size={8}
            stroke={tokens.color.muted}
            strokeWidth={0.3}
            fill={tokens.color.muted}
          />
          
          {/* Arrow from AKSOS to output */}
          <DiagramArrow
            x={62.5}
            y={layout.aksos.y}
            direction="right"
            size={8}
            stroke={tokens.color.muted}
            strokeWidth={0.3}
            fill={tokens.color.muted}
          />
        </motion.g>

        {/* Stage labels */}
        <motion.g
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: tokens.animation.duration.normal, delay: 0.9 }}
        >
          <DiagramLabel
            x={layout.inputX}
            y={12}
            text="FRAGMENTS"
            fontSize={5}
            fill={tokens.color.muted}
            letterSpacing={0.1}
          />
          <DiagramLabel
            x={layout.aksosX}
            y={12}
            text="SYSTEM"
            fontSize={5}
            fill={tokens.color.muted}
            letterSpacing={0.1}
          />
          <DiagramLabel
            x={layout.outputX}
            y={12}
            text="INTELLIGENCE"
            fontSize={5}
            fill={tokens.color.muted}
            letterSpacing={0.1}
          />
        </motion.g>

        {/* Hover indicator */}
        {isHovered && (
          <motion.text
            x={layout.aksos.x}
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
