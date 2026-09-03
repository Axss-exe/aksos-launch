'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useState } from 'react';
import { tokens } from '@/lib/design-tokens';

export function InformationDepthDiagram() {
  const [isHovered, setIsHovered] = useState(false);
  
  const layers = [
    { label: 'PUBLIC WEB', desc: 'lots of information', access: 'easy to discover', width: 100, y: 0, delay: 0.1 },
    { label: 'CONTEXT', desc: 'fewer signals', access: 'more interpretation', width: 85, y: 25, delay: 0.2 },
    { label: 'PEOPLE', desc: 'limited visibility', access: 'relationship required', width: 70, y: 50, delay: 0.3 },
    { label: 'INSTITUTIONS', desc: 'difficult access', access: 'institutional knowledge', width: 55, y: 75, delay: 0.4 },
    { label: 'FIRST-SOURCE KNOWLEDGE', desc: 'deepest intelligence', access: 'hardest to reach', width: 40, y: 100, delay: 0.5 },
  ];

  const centerX = 50;
  const springWidth = useSpring(isHovered ? 1 : 0.8, { damping: 20, stiffness: 150 });

  return (
    <motion.div
      className="information-depth-diagram"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: tokens.animation.duration.slow }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <svg viewBox="0 0 100 140" preserveAspectRatio="xMidYMid meet" style={{ width: '100%', height: '400px' }}>
        
        {/* Depth indicator */}
        <motion.g
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: tokens.animation.duration.normal }}
        >
          <text x={centerX} y={10} textAnchor="middle" fontSize="8" fontFamily={tokens.font.mono} fill={tokens.color.muted} letterSpacing="0.1em">DEPTH</text>
          <text x={centerX} y={18} textAnchor="middle" fontSize="6" fontFamily={tokens.font.mono} fill={tokens.color.muted} letterSpacing="0.2em">INCREASING</text>
        </motion.g>

        {/* Information availability scale */}
        <motion.g
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: tokens.animation.duration.normal, delay: 0.1 }}
        >
          <text x={10} y={15} textAnchor="start" fontSize="6" fontFamily={tokens.font.mono} fill={tokens.color.muted} letterSpacing="0.1em">MORE</text>
          <text x={10} y={22} textAnchor="start" fontSize="6" fontFamily={tokens.font.mono} fill={tokens.color.muted} letterSpacing="0.1em">INFORMATION</text>
          <text x={90} y={15} textAnchor="end" fontSize="6" fontFamily={tokens.font.mono} fill={tokens.color.muted} letterSpacing="0.1em">LESS</text>
          <text x={90} y={22} textAnchor="end" fontSize="6" fontFamily={tokens.font.mono} fill={tokens.color.muted} letterSpacing="0.1em">INFORMATION</text>
        </motion.g>

        {/* Layers with spring animation on hover */}
        {layers.map((layer, index) => {
          const x = centerX - (layer.width / 2);
          const opacity = 0.4 + (index * 0.15);
          const hoverScale = isHovered ? 1.05 : 1;
          
          return (
            <motion.g
              key={layer.label}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: tokens.animation.duration.normal, delay: layer.delay }}
              whileHover={{ scale: hoverScale }}
            >
              <motion.rect
                x={x}
                y={layer.y + 5}
                width={layer.width}
                height={18}
                fill="none"
                stroke={tokens.color.line}
                strokeWidth="0.3"
                opacity={opacity}
                whileHover={{ strokeWidth: 0.5, stroke: tokens.color.signal }}
              />
              
              <text x={centerX} y={layer.y + 12} textAnchor="middle" fontSize="7" fontFamily={tokens.font.mono} fill={tokens.color.ink} letterSpacing="0.1em">{layer.label}</text>
              <text x={centerX} y={layer.y + 22} textAnchor="middle" fontSize="6" fontFamily={tokens.font.mono} fill={tokens.color.muted} letterSpacing="0.05em">{layer.desc}</text>
              <text x={centerX} y={layer.y + 32} textAnchor="middle" fontSize="5" fontFamily={tokens.font.mono} fill={tokens.color.muted} letterSpacing="0.1em">{layer.access.toUpperCase()}</text>
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
          <text x={10} y={135} textAnchor="start" fontSize="6" fontFamily={tokens.font.mono} fill={tokens.color.muted} letterSpacing="0.1em">EASY</text>
          <text x={10} y={142} textAnchor="start" fontSize="6" fontFamily={tokens.font.mono} fill={tokens.color.muted} letterSpacing="0.1em">ACCESS</text>
          <text x={90} y={135} textAnchor="end" fontSize="6" fontFamily={tokens.font.mono} fill={tokens.color.muted} letterSpacing="0.1em">DIFFICULT</text>
          <text x={90} y={142} textAnchor="end" fontSize="6" fontFamily={tokens.font.mono} fill={tokens.color.muted} letterSpacing="0.1em">ACCESS</text>
        </motion.g>

        {/* Hover indicator */}
        {isHovered && (
          <motion.text
            x={centerX} y={130} textAnchor="middle"
            fontSize="5" fontFamily={tokens.font.mono} fill={tokens.color.muted}
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
