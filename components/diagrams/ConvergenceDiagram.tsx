'use client';

import { motion } from 'framer-motion';
import { tokens } from '@/lib/design-tokens';

// Section 03: Convergence Diagram
// Visualizes fragments converging into AKSOS, then flowing to outputs
// Shows: Technology is only part of the infrastructure. Meaningful intelligence requires both the system and the network.

export function ConvergenceDiagram() {
  const center = { x: 50, y: 50 };

  // Input fragments (left side)
  const fragments = [
    { label: 'PEOPLE', x: 15, y: 25, delay: 0.1 },
    { label: 'INSTITUTIONS', x: 15, y: 40, delay: 0.2 },
    { label: 'RESEARCHERS', x: 15, y: 55, delay: 0.3 },
    { label: 'ORGANIZATIONS', x: 15, y: 70, delay: 0.4 },
  ];

  // Input data (right side)
  const dataSources = [
    { label: 'EVIDENCE', x: 85, y: 25, delay: 0.15 },
    { label: 'DATA', x: 85, y: 40, delay: 0.25 },
    { label: 'LOCAL KNOWLEDGE', x: 85, y: 55, delay: 0.35 },
  ];

  // Outputs (bottom)
  const outputs = [
    { label: 'CONTEXT', x: 50, y: 85, delay: 0.5 },
    { label: 'RELATIONSHIPS', x: 50, y: 95, delay: 0.6 },
    { label: 'INTELLIGENCE', x: 50, y: 105, delay: 0.7 },
  ];

  return (
    <motion.div 
      className="convergence-diagram"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: tokens.animation.duration.slow }}
    >
      <svg 
        viewBox="0 0 100 120"
        preserveAspectRatio="xMidYMid meet"
        style={{ width: '100%', height: '400px' }}
      >
        {/* AKSOS center node */}
        <motion.g
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: tokens.animation.duration.normal }}
        >
          <circle 
            cx={center.x} 
            cy={center.y} 
            r={8} 
            fill="none"
            stroke={tokens.color.signal}
            strokeWidth="0.5"
          />
          <text
            x={center.x}
            y={center.y}
            textAnchor="middle"
            dy="-2"
            fontSize="8"
            fontFamily={tokens.font.mono}
            fill={tokens.color.signal}
            letterSpacing="0.15em"
          >
            AKSOS
          </text>
        </motion.g>

        {/* Input fragments - left side */}
        {fragments.map((fragment) => (
          <motion.g
            key={fragment.label}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: tokens.animation.duration.normal, delay: fragment.delay }}
          >
            <circle 
              cx={fragment.x} 
              cy={fragment.y} 
              r={2} 
              fill={tokens.color.ink}
              stroke={tokens.color.line}
              strokeWidth="0.3"
            />
            <line
              x1={fragment.x}
              y1={fragment.y}
              x2={center.x - 12}
              y2={center.y}
              stroke={tokens.color.line}
              strokeWidth="0.2"
              strokeDasharray="2,2"
            />
            <text
              x={fragment.x}
              y={fragment.y}
              textAnchor="end"
              dx="-8"
              dy="3"
              fontSize="6"
              fontFamily={tokens.font.mono}
              fill={tokens.color.ink}
              letterSpacing="0.1em"
            >
              {fragment.label}
            </text>
          </motion.g>
        ))}

        {/* Input data - right side */}
        {dataSources.map((source) => (
          <motion.g
            key={source.label}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: tokens.animation.duration.normal, delay: source.delay }}
          >
            <circle 
              cx={source.x} 
              cy={source.y} 
              r={2} 
              fill={tokens.color.ink}
              stroke={tokens.color.line}
              strokeWidth="0.3"
            />
            <line
              x1={source.x}
              y1={source.y}
              x2={center.x + 12}
              y2={center.y}
              stroke={tokens.color.line}
              strokeWidth="0.2"
              strokeDasharray="2,2"
            />
            <text
              x={source.x}
              y={source.y}
              textAnchor="start"
              dx="8"
              dy="3"
              fontSize="6"
              fontFamily={tokens.font.mono}
              fill={tokens.color.ink}
              letterSpacing="0.1em"
            >
              {source.label}
            </text>
          </motion.g>
        ))}

        {/* Outputs - bottom */}
        {outputs.map((output, index) => (
          <motion.g
            key={output.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: tokens.animation.duration.normal, delay: output.delay }}
          >
            <line
              x1={center.x}
              y1={center.y + 10}
              x2={center.x}
              y2={output.y - 8}
              stroke={tokens.color.line}
              strokeWidth="0.2"
              strokeDasharray="2,2"
            />
            <circle 
              cx={center.x} 
              cy={output.y} 
              r={2} 
              fill={tokens.color.ink}
              stroke={tokens.color.line}
              strokeWidth="0.3"
            />
            <text
              x={center.x}
              y={output.y}
              textAnchor="middle"
              dy="12"
              fontSize="7"
              fontFamily={tokens.font.mono}
              fill={tokens.color.ink}
              letterSpacing="0.1em"
            >
              {output.label}
            </text>
          </motion.g>
        ))}

        {/* Final output box */}
        <motion.g
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: tokens.animation.duration.normal, delay: 0.8 }}
        >
          <rect
            x={40}
            y={112}
            width={20}
            height={12}
            fill="none"
            stroke={tokens.color.line}
            strokeWidth="0.3"
          />
          <text
            x={50}
            y={120}
            textAnchor="middle"
            fontSize="5"
            fontFamily={tokens.font.mono}
            fill={tokens.color.muted}
            letterSpacing="0.1em"
          >
            ONE COHERENT
          </text>
          <text
            x={50}
            y={127}
            textAnchor="middle"
            fontSize="5"
            fontFamily={tokens.font.mono}
            fill={tokens.color.muted}
            letterSpacing="0.1em"
          >
            PICTURE
          </text>
        </motion.g>

        {/* Arrow indicators */}
        <motion.g
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: tokens.animation.duration.normal, delay: 0.4 }}
        >
          <text
            x={30}
            y={40}
            textAnchor="middle"
            fontSize="8"
            fontFamily={tokens.font.mono}
            fill={tokens.color.muted}
            letterSpacing="0.2em"
          >
            
          </text>
          <text
            x={70}
            y={40}
            textAnchor="middle"
            fontSize="8"
            fontFamily={tokens.font.mono}
            fill={tokens.color.muted}
            letterSpacing="0.2em"
          >
            
          </text>
        </motion.g>
      </svg>
    </motion.div>
  );
}
