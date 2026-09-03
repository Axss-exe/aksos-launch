'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { tokens } from '@/lib/design-tokens';

// Golden ratio for proportions
const PHI = 1.618;

export function InformationDepthDiagram() {
  const [isHovered, setIsHovered] = useState(false);
  const [highlightedLayer, setHighlightedLayer] = useState<number | null>(null);
  
  const centerX = 50;
  
  // Inverted pyramid - layers of information depth
  const layers = [
    { 
      label: 'PUBLIC WEB', 
      desc: 'lots of information', 
      access: 'easy to discover', 
      width: 80, 
      y: 15,
      height: 20,
      delay: 0.1,
      color: tokens.color.ink
    },
    { 
      label: 'CONTEXT', 
      desc: 'fewer signals', 
      access: 'more interpretation', 
      width: 65, 
      y: 35,
      height: 18,
      delay: 0.2,
      color: tokens.color.ink
    },
    { 
      label: 'PEOPLE', 
      desc: 'limited visibility', 
      access: 'relationship required', 
      width: 50, 
      y: 53,
      height: 16,
      delay: 0.3,
      color: tokens.color.ink
    },
    { 
      label: 'INSTITUTIONS', 
      desc: 'difficult access', 
      access: 'institutional knowledge', 
      width: 35, 
      y: 70,
      height: 14,
      delay: 0.4,
      color: tokens.color.ink
    },
    { 
      label: 'FIRST-SOURCE', 
      desc: 'deepest intelligence', 
      access: 'hardest to reach', 
      width: 20, 
      y: 85,
      height: 12,
      delay: 0.5,
      color: tokens.color.ink
    },
  ];

  const apex = { x: centerX, y: 10 };

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
      <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" style={{ width: '100%', height: '400px' }}>
        
        {/* Depth indicator at top */}
        <motion.g
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: tokens.animation.duration.normal }}
        >
          <text x={centerX} y={8} textAnchor="middle" fontSize="7" fontFamily={tokens.font.mono} fill={tokens.color.muted} letterSpacing="0.1em">DEPTH</text>
          <text x={centerX} y={14} textAnchor="middle" fontSize="5" fontFamily={tokens.font.mono} fill={tokens.color.muted} letterSpacing="0.2em">INCREASING</text>
        </motion.g>

        {/* Information availability scale */}
        <motion.g
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: tokens.animation.duration.normal, delay: 0.1 }}
        >
          <text x={10} y={13} textAnchor="start" fontSize="5" fontFamily={tokens.font.mono} fill={tokens.color.muted} letterSpacing="0.1em">MORE</text>
          <text x={10} y={19} textAnchor="start" fontSize="5" fontFamily={tokens.font.mono} fill={tokens.color.muted} letterSpacing="0.1em">INFORMATION</text>
          <text x={90} y={13} textAnchor="end" fontSize="5" fontFamily={tokens.font.mono} fill={tokens.color.muted} letterSpacing="0.1em">LESS</text>
          <text x={90} y={19} textAnchor="end" fontSize="5" fontFamily={tokens.font.mono} fill={tokens.color.muted} letterSpacing="0.1em">INFORMATION</text>
        </motion.g>

        {/* Inverted pyramid layers */}
        {layers.map((layer, index) => {
          const x = centerX - (layer.width / 2);
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
              transition={{ duration: tokens.animation.duration.normal, delay: layer.delay }}
              onHoverStart={() => setHighlightedLayer(index)}
              onHoverEnd={() => setHighlightedLayer(null)}
              whileHover={{ scale: 1.02 }}
            >
              {/* Pyramid layer */}
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
                transition={{ duration: tokens.animation.duration.normal, delay: layer.delay + 0.1 }}
                animate={isHovered ? { strokeWidth: [0.3, 0.5, 0.3] } : {}}
                transition={isHovered ? { duration: 2, repeat: Infinity, ease: 'easeInOut', delay: index * 0.1 } : {}}
              />
              
              {/* Layer label */}
              <text 
                x={centerX} y={layer.y + 8} 
                textAnchor="middle" 
                fontSize="6" 
                fontFamily={tokens.font.mono} 
                fill={tokens.color.ink} 
                letterSpacing="0.1em"
              >
                {layer.label}
              </text>
              
              {/* Description */}
              <text 
                x={centerX} y={layer.y + 16} 
                textAnchor="middle" 
                fontSize="5" 
                fontFamily={tokens.font.mono} 
                fill={tokens.color.muted} 
                letterSpacing="0.05em"
              >
                {layer.desc}
              </text>
              
              {/* Access */}
              <text 
                x={centerX} y={layer.y + 24} 
                textAnchor="middle" 
                fontSize="4" 
                fontFamily={tokens.font.mono} 
                fill={tokens.color.muted} 
                letterSpacing="0.1em"
              >
                {layer.access.toUpperCase()}
              </text>
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
          <text x={10} y={95} textAnchor="start" fontSize="5" fontFamily={tokens.font.mono} fill={tokens.color.muted} letterSpacing="0.1em">EASY</text>
          <text x={10} y={99} textAnchor="start" fontSize="5" fontFamily={tokens.font.mono} fill={tokens.color.muted} letterSpacing="0.1em">ACCESS</text>
          <text x={90} y={95} textAnchor="end" fontSize="5" fontFamily={tokens.font.mono} fill={tokens.color.muted} letterSpacing="0.1em">DIFFICULT</text>
          <text x={90} y={99} textAnchor="end" fontSize="5" fontFamily={tokens.font.mono} fill={tokens.color.muted} letterSpacing="0.1em">ACCESS</text>
        </motion.g>

        {/* Hover indicator */}
        {isHovered && (
          <motion.text
            x={centerX} y={92} textAnchor="middle"
            fontSize="4" fontFamily={tokens.font.mono} fill={tokens.color.muted}
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
