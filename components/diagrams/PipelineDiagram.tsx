'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { tokens } from '@/lib/design-tokens';

// Horizontal Flow diagram for Section 05 - Information to Intelligence Pipeline
// Using golden ratio proportions

const PHI = 1.618;

export function PipelineDiagram() {
  const [isHovered, setIsHovered] = useState(false);
  const [highlightedStage, setHighlightedStage] = useState<number | null>(null);

  const centerY = 50;
  
  // Stages with golden ratio spacing
  const stages = [
    { label: 'SIGNALS', x: 5, delay: 0.1, stageIndex: 0 },
    { label: 'SOURCE', x: 20, delay: 0.2, stageIndex: 1 },
    { label: 'EVIDENCE', x: 35, delay: 0.3, stageIndex: 2 },
    { label: 'CONTEXT', x: 50, delay: 0.4, stageIndex: 3 },
    { label: 'RELATIONSHIPS', x: 65, delay: 0.5, stageIndex: 4 },
    { label: 'RITA', x: 80, delay: 0.6, stageIndex: 5 },
    { label: 'STORY', x: 90, delay: 0.7, stageIndex: 6 },
    { label: 'ACTION', x: 98, delay: 0.8, stageIndex: 7 },
  ];

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
      <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" style={{ width: '100%', height: '400px' }}>
        
        {/* Main flow line */}
        <motion.path
          d={`M 5 ${centerY} H 98`}
          fill="none"
          stroke={tokens.color.line}
          strokeWidth="0.3"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: tokens.animation.duration.slower, delay: 0.1 }}
          animate={isHovered ? { strokeWidth: [0.3, 0.5, 0.3] } : {}}
          transition={isHovered ? { duration: 3, repeat: Infinity, ease: 'easeInOut' } : {}}
        />

        {/* Stage nodes */}
        {stages.map((stage, index) => {
          const isHighlighted = highlightedStage === stage.stageIndex || isHovered;
          const circleSize = stage.label === 'RITA' ? 3.5 : 2.5;
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
                cx={stage.x} 
                cy={centerY} 
                r={circleSize}
                fill={stage.label === 'RITA' ? tokens.color.signal : 'none'}
                stroke={isHighlighted ? tokens.color.signal : signalColor}
                strokeWidth={isHighlighted ? 0.5 : stage.label === 'RITA' ? 0.5 : 0.3}
              />
              
              {/* Stage label */}
              <text 
                x={stage.x} 
                y={centerY} 
                textAnchor="middle" 
                dy={stage.label.length > 6 ? '14' : '12'}
                fontSize={fontSize}
                fontFamily={tokens.font.mono} 
                fill={isHighlighted ? tokens.color.signal : signalColor}
                letterSpacing="0.1em"
              >
                {stage.label}
              </text>
            </motion.g>
          );
        })}

        {/* Arrow indicators between stages */}
        {stages.map((stage, index) => {
          if (index === stages.length - 1) return null;
          const midX = (stage.x + stages[index + 1].x) / 2;
          return (
            <motion.text
              key={`arrow-${index}`}
              x={midX}
              y={centerY}
              textAnchor="middle"
              fontSize="6"
              fontFamily={tokens.font.mono}
              fill={tokens.color.muted}
              letterSpacing="0.2em"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: tokens.animation.duration.normal, delay: stage.delay + 0.1 }}
              animate={isHovered ? { opacity: [0.5, 1, 0.5], scale: [1, 1.2, 1] } : {}}
              transition={isHovered ? { duration: 1, repeat: Infinity, ease: 'easeInOut', delay: index * 0.1 } : {}}
            >
              
            </motion.text>
          );
        })}

        {/* Flow label at top */}
        <motion.text
          x={50} y={12} textAnchor="middle"
          fontSize="5" fontFamily={tokens.font.mono} fill={tokens.color.muted} letterSpacing="0.1em"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: tokens.animation.duration.normal, delay: 0.2 }}
        >
          INFORMATION  INTELLIGENCE
        </motion.text>

        {/* Hover indicator */}
        {isHovered && (
          <motion.text
            x={50} y={92} textAnchor="middle"
            fontSize="4" fontFamily={tokens.font.mono} fill={tokens.color.muted}
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
