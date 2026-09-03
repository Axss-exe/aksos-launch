'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { tokens } from '@/lib/design-tokens';

// Flow diagram for Section 03 - AKSOS Approach
// Shows fragments converging into AKSOS, then flowing to intelligence output

export function ConvergenceDiagram() {
  const [isHovered, setIsHovered] = useState(false);
  const [highlightedStage, setHighlightedStage] = useState<number | null>(null);

  const centerY = 50;
  const spacing = 15;

  // Three columns: Input (left), AKSOS (center), Output (right)
  const inputX = 25;
  const aksosX = 50;
  const outputX = 75;

  // Input fragments - left side
  const fragments = [
    { label: 'PEOPLE', y: 30, delay: 0.1 },
    { label: 'INSTITUTIONS', y: 40, delay: 0.2 },
    { label: 'RESEARCHERS', y: 50, delay: 0.3 },
    { label: 'ORGANIZATIONS', y: 60, delay: 0.4 },
  ];

  // Input data - left side, lower
  const dataSources = [
    { label: 'EVIDENCE', y: 70, delay: 0.15 },
    { label: 'DATA', y: 78, delay: 0.25 },
    { label: 'LOCAL KNOWLEDGE', y: 86, delay: 0.35 },
  ];

  // Output stages - right side
  const outputs = [
    { label: 'CONTEXT', y: 35, delay: 0.5, stage: 0 },
    { label: 'RELATIONSHIPS', y: 50, delay: 0.6, stage: 1 },
    { label: 'INTELLIGENCE', y: 65, delay: 0.7, stage: 2 },
  ];

  // Final output
  const finalOutput = {
    label: 'ONE COHERENT',
    sublabel: 'PICTURE',
    y: 85,
    delay: 0.8
  };

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
      <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" style={{ width: '100%', height: '400px' }}>
        
        {/* AKSOS center node with signal color */}
        <motion.g
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: tokens.animation.duration.normal }}
          animate={isHovered ? { scale: [1, 1.05, 1] } : {}}
          transition={isHovered ? { duration: 2, repeat: Infinity, ease: 'easeInOut' } : {}}
        >
          <circle cx={aksosX} cy={centerY} r={8} fill="none" stroke={tokens.color.signal} strokeWidth="0.5" />
          <text x={aksosX} y={centerY} textAnchor="middle" dy="-2" fontSize="8" fontFamily={tokens.font.mono} fill={tokens.color.signal} letterSpacing="0.15em">AKSOS</text>
        </motion.g>

        {/* Input fragments - left side with flow arrows */}
        {fragments.map((fragment, index) => {
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
              <circle cx={inputX} cy={fragment.y} r={2} fill={tokens.color.ink} stroke={isHighlighted ? tokens.color.signal : tokens.color.line} strokeWidth={isHighlighted ? 0.5 : 0.3} />
              <line x1={inputX} y1={fragment.y} x2={aksosX - 12} y2={centerY} stroke={isHighlighted ? tokens.color.signal : tokens.color.line} strokeWidth={isHighlighted ? 0.4 : 0.2} strokeDasharray="2,2" />
              <text x={inputX} y={fragment.y} textAnchor="end" dx="-8" dy="3" fontSize="6" fontFamily={tokens.font.mono} fill={tokens.color.ink} letterSpacing="0.1em">{fragment.label}</text>
            </motion.g>
          );
        })}

        {/* Input data - left side, lower */}
        {dataSources.map((source, index) => {
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
              <circle cx={inputX} cy={source.y} r={2} fill={tokens.color.ink} stroke={isHighlighted ? tokens.color.signal : tokens.color.line} strokeWidth={isHighlighted ? 0.5 : 0.3} />
              <line x1={inputX} y1={source.y} x2={aksosX - 12} y2={centerY} stroke={isHighlighted ? tokens.color.signal : tokens.color.line} strokeWidth={isHighlighted ? 0.4 : 0.2} strokeDasharray="2,2" />
              <text x={inputX} y={source.y} textAnchor="end" dx="-8" dy="3" fontSize="6" fontFamily={tokens.font.mono} fill={tokens.color.ink} letterSpacing="0.1em">{source.label}</text>
            </motion.g>
          );
        })}

        {/* Outputs - right side */}
        {outputs.map((output, index) => {
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
              <line x1={aksosX + 12} y1={centerY} x2={outputX} y2={output.y} stroke={isHighlighted ? tokens.color.signal : tokens.color.line} strokeWidth={isHighlighted ? 0.4 : 0.2} strokeDasharray="2,2" />
              <circle cx={outputX} cy={output.y} r={2} fill={tokens.color.ink} stroke={isHighlighted ? tokens.color.signal : tokens.color.line} strokeWidth={isHighlighted ? 0.5 : 0.3} />
              <text x={outputX} y={output.y} textAnchor="start" dx="8" dy="3" fontSize="6" fontFamily={tokens.font.mono} fill={tokens.color.ink} letterSpacing="0.1em">{output.label}</text>
            </motion.g>
          );
        })}

        {/* Final output box */}
        <motion.g
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: tokens.animation.duration.normal, delay: finalOutput.delay }}
          whileHover={{ scale: 1.05 }}
          onHoverStart={() => setHighlightedStage(3)}
          onHoverEnd={() => setHighlightedStage(null)}
        >
          <rect 
            x={outputX - 10} y={finalOutput.y - 4} 
            width={20} height={12} 
            fill="none" 
            stroke={highlightedStage === 3 || isHovered ? tokens.color.signal : tokens.color.line} 
            strokeWidth={highlightedStage === 3 || isHovered ? 0.5 : 0.3}
          />
          <text x={outputX} y={finalOutput.y} textAnchor="middle" fontSize="5" fontFamily={tokens.font.mono} fill={tokens.color.muted} letterSpacing="0.1em">{finalOutput.label}</text>
          <text x={outputX} y={finalOutput.y + 6} textAnchor="middle" fontSize="5" fontFamily={tokens.font.mono} fill={tokens.color.muted} letterSpacing="0.1em">{finalOutput.sublabel}</text>
        </motion.g>

        {/* Flow arrows with pulsing animation */}
        <motion.g
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: tokens.animation.duration.normal, delay: 0.4 }}
          animate={isHovered ? { opacity: [0.5, 1, 0.5] } : {}}
          transition={isHovered ? { duration: 1.5, repeat: Infinity } : {}}
        >
          <text x={37.5} y={centerY} textAnchor="middle" fontSize="8" fontFamily={tokens.font.mono} fill={tokens.color.muted} letterSpacing="0.2em"></text>
          <text x={62.5} y={centerY} textAnchor="middle" fontSize="8" fontFamily={tokens.font.mono} fill={tokens.color.muted} letterSpacing="0.2em"></text>
        </motion.g>

        {/* Stage labels for repeating diagram technique */}
        <motion.g
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: tokens.animation.duration.normal, delay: 0.9 }}
        >
          <text x={inputX} y={12} textAnchor="middle" fontSize="5" fontFamily={tokens.font.mono} fill={tokens.color.muted} letterSpacing="0.1em">FRAGMENTS</text>
          <text x={aksosX} y={12} textAnchor="middle" fontSize="5" fontFamily={tokens.font.mono} fill={tokens.color.muted} letterSpacing="0.1em">SYSTEM</text>
          <text x={outputX} y={12} textAnchor="middle" fontSize="5" fontFamily={tokens.font.mono} fill={tokens.color.muted} letterSpacing="0.1em">INTELLIGENCE</text>
        </motion.g>

        {/* Hover indicator */}
        {isHovered && (
          <motion.text
            x={aksosX} y={92} textAnchor="middle"
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
