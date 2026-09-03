'use client';

import { motion } from 'framer-motion';
import { tokens } from '@/lib/design-tokens';

// Section 02: Information Depth Diagram
// Visualizes the layers from PUBLIC WEB to FIRST-SOURCE KNOWLEDGE
// Shows decreasing information availability and increasing difficulty of access

export function InformationDepthDiagram() {
  // Vertical layers with decreasing width and opacity
  const layers = [
    { 
      label: 'PUBLIC WEB', 
      desc: 'lots of information', 
      access: 'easy to discover',
      width: 100,
      y: 0,
      delay: 0.1
    },
    { 
      label: 'CONTEXT', 
      desc: 'fewer signals', 
      access: 'more interpretation',
      width: 85,
      y: 25,
      delay: 0.2
    },
    { 
      label: 'PEOPLE', 
      desc: 'limited visibility', 
      access: 'relationship required',
      width: 70,
      y: 50,
      delay: 0.3
    },
    { 
      label: 'INSTITUTIONS', 
      desc: 'difficult access', 
      access: 'institutional knowledge',
      width: 55,
      y: 75,
      delay: 0.4
    },
    { 
      label: 'FIRST-SOURCE KNOWLEDGE', 
      desc: 'deepest intelligence', 
      access: 'hardest to reach',
      width: 40,
      y: 100,
      delay: 0.5
    },
  ];

  const centerX = 50;

  return (
    <motion.div 
      className="information-depth-diagram"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: tokens.animation.duration.slow }}
    >
      <svg 
        viewBox="0 0 100 140"
        preserveAspectRatio="xMidYMid meet"
        style={{ width: '100%', height: '400px' }}
      >
        {/* Depth indicator */}
        <motion.g
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: tokens.animation.duration.normal }}
        >
          <text
            x={centerX}
            y={10}
            textAnchor="middle"
            fontSize="8"
            fontFamily={tokens.font.mono}
            fill={tokens.color.muted}
            letterSpacing="0.1em"
          >
            DEPTH
          </text>
          <text
            x={centerX}
            y={18}
            textAnchor="middle"
            fontSize="6"
            fontFamily={tokens.font.mono}
            fill={tokens.color.muted}
            letterSpacing="0.2em"
          >
            INCREASING
          </text>
        </motion.g>

        {/* Information availability scale */}
        <motion.g
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: tokens.animation.duration.normal, delay: 0.1 }}
          style={{ pointerEvents: 'none' }}
        >
          <text
            x={10}
            y={15}
            textAnchor="start"
            fontSize="6"
            fontFamily={tokens.font.mono}
            fill={tokens.color.muted}
            letterSpacing="0.1em"
          >
            MORE
          </text>
          <text
            x={10}
            y={22}
            textAnchor="start"
            fontSize="6"
            fontFamily={tokens.font.mono}
            fill={tokens.color.muted}
            letterSpacing="0.1em"
          >
            INFORMATION
          </text>
          <text
            x={90}
            y={15}
            textAnchor="end"
            fontSize="6"
            fontFamily={tokens.font.mono}
            fill={tokens.color.muted}
            letterSpacing="0.1em"
          >
            LESS
          </text>
          <text
            x={90}
            y={22}
            textAnchor="end"
            fontSize="6"
            fontFamily={tokens.font.mono}
            fill={tokens.color.muted}
            letterSpacing="0.1em"
          >
            INFORMATION
          </text>
        </motion.g>

        {/* Layers */}
        {layers.map((layer, index) => {
          const x = centerX - (layer.width / 2);
          const opacity = 0.4 + (index * 0.15); // Increasing opacity for deeper layers
          
          return (
            <motion.g
              key={layer.label}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: tokens.animation.duration.normal, delay: layer.delay }}
            >
              {/* Layer rectangle */}
              <rect
                x={x}
                y={layer.y + 5}
                width={layer.width}
                height={18}
                fill="none"
                stroke={tokens.color.line}
                strokeWidth="0.3"
                opacity={opacity}
              />
              
              {/* Layer label */}
              <text
                x={centerX}
                y={layer.y + 12}
                textAnchor="middle"
                fontSize="7"
                fontFamily={tokens.font.mono}
                fill={tokens.color.ink}
                letterSpacing="0.1em"
              >
                {layer.label}
              </text>
              
              {/* Layer description */}
              <text
                x={centerX}
                y={layer.y + 22}
                textAnchor="middle"
                fontSize="6"
                fontFamily={tokens.font.mono}
                fill={tokens.color.muted}
                letterSpacing="0.05em"
              >
                {layer.desc}
              </text>
              
              {/* Access difficulty */}
              <text
                x={centerX}
                y={layer.y + 32}
                textAnchor="middle"
                fontSize="5"
                fontFamily={tokens.font.mono}
                fill={tokens.color.muted}
                letterSpacing="0.1em"
              >
                {layer.access.toUpperCase()}
              </text>
            </motion.g>
          );
        })}

        {/* Access scale */}
        <motion.g
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: tokens.animation.duration.normal, delay: 0.6 }}
        >
          <text
            x={10}
            y={135}
            textAnchor="start"
            fontSize="6"
            fontFamily={tokens.font.mono}
            fill={tokens.color.muted}
            letterSpacing="0.1em"
          >
            EASY
          </text>
          <text
            x={10}
            y={142}
            textAnchor="start"
            fontSize="6"
            fontFamily={tokens.font.mono}
            fill={tokens.color.muted}
            letterSpacing="0.1em"
          >
            ACCESS
          </text>
          <text
            x={90}
            y={135}
            textAnchor="end"
            fontSize="6"
            fontFamily={tokens.font.mono}
            fill={tokens.color.muted}
            letterSpacing="0.1em"
          >
            DIFFICULT
          </text>
          <text
            x={90}
            y={142}
            textAnchor="end"
            fontSize="6"
            fontFamily={tokens.font.mono}
            fill={tokens.color.muted}
            letterSpacing="0.1em"
          >
            ACCESS
          </text>
        </motion.g>
      </svg>
    </motion.div>
  );
}
