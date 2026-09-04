'use client';

import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useState, useMemo } from 'react';
import { tokens } from '@/lib/design-tokens';
import {
  DiagramContainer,
  DiagramLabel,
  Point,
  calculateTextDimensions,
  createDiagramLayout,
} from './primitives';

// =============================================================================
// INFORMATION DEPTH DIAGRAM
// Inverted pyramid showing information depth layers
// Geometry: Calculated from content dimensions, no overlaps guaranteed
// =============================================================================

// Golden ratio for proportions
const PHI = 1.618;

// Text configuration constants
const LABEL_FONT_SIZE = 6;
const DESC_FONT_SIZE = 5;
const ACCESS_FONT_SIZE = 4;
const LETTER_SPACING = 0.1;
const LINE_HEIGHT_MULTIPLIER = 1.4;
const VERTICAL_SPACING = 8; // Minimum spacing between layer content
const SAFE_MARGIN = 10; // Safe margin from SVG edges

// Layer data with content
const LAYER_DATA = [
  {
    label: 'PUBLIC WEB',
    desc: 'lots of information',
    access: 'easy to discover',
    color: tokens.color.ink,
    delay: 0.1,
  },
  {
    label: 'CONTEXT',
    desc: 'fewer signals',
    access: 'more interpretation',
    color: tokens.color.ink,
    delay: 0.2,
  },
  {
    label: 'PEOPLE',
    desc: 'limited visibility',
    access: 'relationship required',
    color: tokens.color.ink,
    delay: 0.3,
  },
  {
    label: 'INSTITUTIONS',
    desc: 'difficult access',
    access: 'institutional knowledge',
    color: tokens.color.ink,
    delay: 0.4,
  },
  {
    label: 'FIRST-SOURCE',
    desc: 'deepest intelligence',
    access: 'hardest to reach',
    color: tokens.color.ink,
    delay: 0.5,
  },
];

// Calculate the geometry for each layer based on content
function calculateLayerGeometry(layerIndex: number, totalLayers: number): {
  label: string;
  desc: string;
  access: string;
  y: number;
  width: number;
  height: number;
  labelY: number;
  descY: number;
  accessY: number;
} {
  const layer = LAYER_DATA[layerIndex];
  
  // Calculate text dimensions
  const labelDims = calculateTextDimensions(layer.label, LABEL_FONT_SIZE, LETTER_SPACING);
  const descDims = calculateTextDimensions(layer.desc, DESC_FONT_SIZE, LETTER_SPACING);
  const accessDims = calculateTextDimensions(layer.access, ACCESS_FONT_SIZE, LETTER_SPACING);
  
  // Width: widest of label, desc, or access text + padding
  const width = Math.max(
    labelDims.width,
    descDims.width,
    accessDims.width
  ) + 12; // Add horizontal padding
  
  // Calculate required height for content
  const labelHeight = LABEL_FONT_SIZE * LINE_HEIGHT_MULTIPLIER;
  const descHeight = DESC_FONT_SIZE * LINE_HEIGHT_MULTIPLIER;
  const accessHeight = ACCESS_FONT_SIZE * LINE_HEIGHT_MULTIPLIER;
  
  // Total content height with spacing
  const contentHeight = labelHeight + descHeight + accessHeight + (VERTICAL_SPACING * 2);
  
  return {
    label: layer.label,
    desc: layer.desc,
    access: layer.access,
    y: 0, // Will be calculated in layout phase
    width,
    height: contentHeight,
    labelY: 0, // Will be calculated
    descY: 0,  // Will be calculated
    accessY: 0, // Will be calculated
  };
}

// Calculate the full layout
function calculateFullLayout(viewBoxWidth: number = 100): {
  layers: ReturnType<typeof calculateLayerGeometry>[];
  totalHeight: number;
  centerX: number;
  apexY: number;
} {
  const centerX = viewBoxWidth / 2;
  const safeWidth = viewBoxWidth - SAFE_MARGIN * 2;
  
  // Calculate geometry for each layer
  const layers = LAYER_DATA.map((_, index) => calculateLayerGeometry(index, LAYER_DATA.length));
  
  // Calculate cumulative Y positions (inverted pyramid: widest at bottom, narrowest at top)
  // Start from top with apex
  let currentY = SAFE_MARGIN + 20; // Space for depth indicator
  
  // Sort layers by width (widest first for inverted pyramid)
  const sortedLayers = [...layers].sort((a, b) => b.width - a.width);
  
  // Calculate pyramid proportions using golden ratio
  const maxWidth = safeWidth * 0.9; // 90% of safe width
  const minWidth = maxWidth * Math.pow(1 / PHI, LAYER_DATA.length - 1);
  
  // Scale layer widths to fit pyramid
  const widthRange = maxWidth - minWidth;
  const sortedWidths = sortedLayers.map(l => l.width);
  const maxLayerWidth = Math.max(...sortedWidths);
  const minLayerWidth = Math.min(...sortedWidths);
  const layerWidthRange = maxLayerWidth - minLayerWidth;
  
  // Assign final positions
  const positionedLayers = LAYER_DATA.map((_, originalIndex) => {
    const layer = calculateLayerGeometry(originalIndex, LAYER_DATA.length);
    
    // Calculate scaled width for pyramid
    const widthRatio = layerWidthRange > 0 
      ? (layer.width - minLayerWidth) / layerWidthRange 
      : 0.5;
    const pyramidWidth = minWidth + widthRatio * widthRange;
    
    // Use pyramid width or calculated width, whichever is larger
    const finalWidth = Math.max(layer.width, pyramidWidth);
    
    return {
      ...layer,
      width: finalWidth,
    };
  });
  
  // Calculate Y positions from top to bottom
  let y = SAFE_MARGIN + 25; // Start below depth indicator
  
  const finalLayers = positionedLayers.map(layer => {
    const layerHeight = layer.height;
    const layerY = y;
    
    // Calculate text positions within layer
    const labelY = layerY + 10;
    const descY = labelY + LABEL_FONT_SIZE * LINE_HEIGHT_MULTIPLIER + 2;
    const accessY = descY + DESC_FONT_SIZE * LINE_HEIGHT_MULTIPLIER + 2;
    
    const result = {
      ...layer,
      y: layerY,
      labelY,
      descY,
      accessY,
      bottom: accessY + ACCESS_FONT_SIZE * LINE_HEIGHT_MULTIPLIER + 4,
    };
    
    y = result.bottom + VERTICAL_SPACING;
    
    return result;
  });
  
  const totalHeight = finalLayers[finalLayers.length - 1].bottom + SAFE_MARGIN + 20; // Space for access scale
  
  return {
    layers: finalLayers,
    totalHeight,
    centerX,
    apexY: SAFE_MARGIN + 10,
  };
}

// Pre-calculate layout (memoized)
const LAYOUT = calculateFullLayout(100);

// Calculate viewBox height based on content
const VIEWBOX_HEIGHT = Math.max(100, LAYOUT.totalHeight + 20);

// Aspect ratio for this diagram (vertical)
const ASPECT_RATIO = 100 / VIEWBOX_HEIGHT;

export function InformationDepthDiagram() {
  const [isHovered, setIsHovered] = useState(false);
  const [highlightedLayer, setHighlightedLayer] = useState<number | null>(null);
  
  // Use memoized layout
  const layout = useMemo(() => LAYOUT, []);
  
  // Calculate dynamic container height based on viewport
  // For mobile, we might need more height
  const minHeight = 500;
  const calculatedHeight = Math.max(minHeight, VIEWBOX_HEIGHT * 4);
  
  return (
    <motion.div
      className="information-depth-diagram"
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
        viewBox={`0 0 100 ${VIEWBOX_HEIGHT}`} 
        preserveAspectRatio="xMidYMid meet"
        style={{
          width: '100%',
          height: `${calculatedHeight}px`,
          minHeight: `${minHeight}px`,
        }}
      >
        
        {/* Depth indicator at top */}
        <motion.g
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: tokens.animation.duration.normal }}
        >
          <DiagramLabel
            x={layout.centerX}
            y={12}
            text="DEPTH"
            fontSize={7}
            fill={tokens.color.muted}
            letterSpacing={0.1}
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: tokens.animation.duration.normal }}
          />
          <DiagramLabel
            x={layout.centerX}
            y={18}
            text="INCREASING"
            fontSize={5}
            fill={tokens.color.muted}
            letterSpacing={0.2}
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: tokens.animation.duration.normal, delay: 0.05 }}
          />
        </motion.g>

        {/* Information availability scale */}
        <motion.g
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: tokens.animation.duration.normal, delay: 0.1 }}
        >
          <DiagramLabel
            x={10}
            y={18}
            text="MORE"
            textAnchor="start"
            fontSize={5}
            fill={tokens.color.muted}
            letterSpacing={0.1}
          />
          <DiagramLabel
            x={10}
            y={24}
            text="INFORMATION"
            textAnchor="start"
            fontSize={5}
            fill={tokens.color.muted}
            letterSpacing={0.1}
          />
          <DiagramLabel
            x={90}
            y={18}
            text="LESS"
            textAnchor="end"
            fontSize={5}
            fill={tokens.color.muted}
            letterSpacing={0.1}
          />
          <DiagramLabel
            x={90}
            y={24}
            text="INFORMATION"
            textAnchor="end"
            fontSize={5}
            fill={tokens.color.muted}
            letterSpacing={0.1}
          />
        </motion.g>

        {/* Inverted pyramid layers */}
        {layout.layers.map((layer, index) => {
          const x = layout.centerX - (layer.width / 2);
          const isHighlighted = highlightedLayer === index || isHovered;
          const fillColor = isHighlighted ? tokens.color.paper : 'none';
          const strokeColor = isHighlighted ? tokens.color.signal : tokens.color.line;
          const strokeWidth = isHighlighted ? 0.5 : 0.3;
          
          return (
            <motion.g
              key={layer.label}
              initial={{ opacity: 0, y: -50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: tokens.animation.duration.normal, delay: LAYER_DATA[index].delay }}
              onHoverStart={() => setHighlightedLayer(index)}
              onHoverEnd={() => setHighlightedLayer(null)}
              whileHover={{ scale: 1.02 }}
            >
              {/* Pyramid layer rectangle */}
              <motion.rect
                x={x}
                y={layer.y}
                width={layer.width}
                height={layer.height}
                fill={fillColor}
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                initial={{ width: 0 }}
                whileInView={{ width: layer.width }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: tokens.animation.duration.normal, delay: LAYER_DATA[index].delay + 0.1 }}
                animate={isHovered ? { strokeWidth: [0.3, 0.5, 0.3] } : {}}
                transition={isHovered ? { duration: 2, repeat: Infinity, ease: 'easeInOut', delay: index * 0.1 } : {}}
              />
              
              {/* Layer label */}
              <DiagramLabel
                x={layout.centerX}
                y={layer.labelY}
                text={layer.label}
                fontSize={LABEL_FONT_SIZE}
                fill={tokens.color.ink}
                letterSpacing={0.1}
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: tokens.animation.duration.normal, delay: LAYER_DATA[index].delay + 0.15 }}
              />
              
              {/* Description */}
              <DiagramLabel
                x={layout.centerX}
                y={layer.descY}
                text={layer.desc}
                fontSize={DESC_FONT_SIZE}
                fill={tokens.color.muted}
                letterSpacing={0.05}
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: tokens.animation.duration.normal, delay: LAYER_DATA[index].delay + 0.2 }}
              />
              
              {/* Access */}
              <DiagramLabel
                x={layout.centerX}
                y={layer.accessY}
                text={layer.access.toUpperCase()}
                fontSize={ACCESS_FONT_SIZE}
                fill={tokens.color.muted}
                letterSpacing={0.1}
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: tokens.animation.duration.normal, delay: LAYER_DATA[index].delay + 0.25 }}
              />
            </motion.g>
          );
        })}

        {/* Access scale at bottom */}
        <motion.g
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: tokens.animation.duration.normal, delay: 0.6 }}
        >
          <DiagramLabel
            x={10}
            y={VIEWBOX_HEIGHT - 15}
            text="EASY"
            textAnchor="start"
            fontSize={5}
            fill={tokens.color.muted}
            letterSpacing={0.1}
          />
          <DiagramLabel
            x={10}
            y={VIEWBOX_HEIGHT - 10}
            text="ACCESS"
            textAnchor="start"
            fontSize={5}
            fill={tokens.color.muted}
            letterSpacing={0.1}
          />
          <DiagramLabel
            x={90}
            y={VIEWBOX_HEIGHT - 15}
            text="DIFFICULT"
            textAnchor="end"
            fontSize={5}
            fill={tokens.color.muted}
            letterSpacing={0.1}
          />
          <DiagramLabel
            x={90}
            y={VIEWBOX_HEIGHT - 10}
            text="ACCESS"
            textAnchor="end"
            fontSize={5}
            fill={tokens.color.muted}
            letterSpacing={0.1}
          />
        </motion.g>

        {/* Hover indicator */}
        {isHovered && (
          <motion.text
            x={layout.centerX}
            y={VIEWBOX_HEIGHT - 5}
            textAnchor="middle"
            fontSize="4"
            fontFamily={tokens.font.mono}
            fill={tokens.color.muted}
            letterSpacing="0.1em"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            HOVER TO HIGHLIGHT LAYERS
          </motion.text>
        )}
      </svg>
    </motion.div>
  );
}
