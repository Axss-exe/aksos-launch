'use client';

import { motion } from 'framer-motion';
import { tokens } from '@/lib/design-tokens';

// Section 04A: Intelligence Cycle Diagram
// Circular flow showing the Batana network cycle
// QUESTION -> FIND PEOPLE -> CONNECT -> LEARN -> ADD CONTEXT -> DISCOVER NEW QUESTIONS

export function IntelligenceCycle() {
  const center = { x: 50, y: 50 };
  const radius = 35;

  const stages = [
    { label: 'QUESTION', angle: 0, delay: 0.1 },
    { label: 'FIND PEOPLE', angle: 60, delay: 0.2 },
    { label: 'CONNECT', angle: 120, delay: 0.3 },
    { label: 'LEARN', angle: 180, delay: 0.4 },
    { label: 'ADD CONTEXT', angle: 240, delay: 0.5 },
    { label: 'DISCOVER NEW QUESTIONS', angle: 300, delay: 0.6 },
  ];

  return (
    <motion.div 
      className="intelligence-cycle"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: tokens.animation.duration.slow }}
    >
      <svg 
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
        style={{ width: '100%', height: '400px' }}
      >
        {/* Center label */}
        <motion.g
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: tokens.animation.duration.normal }}
        >
          <text
            x={center.x}
            y={center.y}
            textAnchor="middle"
            fontSize="8"
            fontFamily={tokens.font.mono}
            fill={tokens.color.muted}
            letterSpacing="0.1em"
          >
            RELATIONSHIP
          </text>
          <text
            x={center.x}
            y={center.y + 8}
            textAnchor="middle"
            fontSize="8"
            fontFamily={tokens.font.mono}
            fill={tokens.color.muted}
            letterSpacing="0.1em"
          >
            INTELLIGENCE
          </text>
        </motion.g>

        {/* Circle path */}
        <motion.circle
          cx={center.x}
          cy={center.y}
          r={radius}
          fill="none"
          stroke={tokens.color.line}
          strokeWidth="0.3"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{
            duration: tokens.animation.duration.slower,
            ease: tokens.animation.easing.easeInOut,
            delay: 0.1
          }}
        />

        {/* Stage nodes */}
        {stages.map((stage) => {
          const x = center.x + radius * Math.cos((stage.angle - 90) * Math.PI / 180);
          const y = center.y + radius * Math.sin((stage.angle - 90) * Math.PI / 180);
          
          return (
            <motion.g
              key={stage.label}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: tokens.animation.duration.normal, delay: stage.delay }}
            >
              <circle 
                cx={x} 
                cy={y} 
                r={2} 
                fill={tokens.color.ink}
                stroke={tokens.color.line}
                strokeWidth="0.3"
              />
              <line
                x1={x}
                y1={y}
                x2={center.x}
                y2={center.y}
                stroke={tokens.color.line}
                strokeWidth="0.2"
                strokeDasharray="1,1"
              />
              <text
                x={x}
                y={y}
                textAnchor="middle"
                dy={stage.label.length > 12 ? '16' : '12'}
                fontSize="6"
                fontFamily={tokens.font.mono}
                fill={tokens.color.ink}
                letterSpacing="0.05em"
              >
                {stage.label}
              </text>
            </motion.g>
          );
        })}

        {/* Arrow indicators between stages */}
        {stages.map((stage, index) => {
          const nextIndex = (index + 1) % stages.length;
          const fromAngle = stages[index].angle;
          const toAngle = stages[nextIndex].angle;
          
          const fromX = center.x + radius * Math.cos((fromAngle - 90) * Math.PI / 180);
          const fromY = center.y + radius * Math.sin((fromAngle - 90) * Math.PI / 180);
          const toX = center.x + radius * Math.cos((toAngle - 90) * Math.PI / 180);
          const toY = center.y + radius * Math.sin((toAngle - 90) * Math.PI / 180);
          
          const midX = (fromX + toX) / 2;
          const midY = (fromY + toY) / 2;
          
          return (
            <motion.text
              key={`arrow-${index}`}
              x={midX}
              y={midY}
              textAnchor="middle"
              fontSize="6"
              fontFamily={tokens.font.mono}
              fill={tokens.color.muted}
              letterSpacing="0.2em"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: tokens.animation.duration.normal, delay: stage.delay + 0.1 }}
            >
              
            </motion.text>
          );
        })}
      </svg>
    </motion.div>
  );
}
