'use client';

import { motion } from 'framer-motion';
import { tokens } from '@/lib/design-tokens';

// Cycle stages
const stages = [
  { 
    id: 1, 
    label: 'QUESTION', 
    angle: 0,
    radius: 30,
    delay: 0.1
  },
  { 
    id: 2, 
    label: 'FIND PEOPLE', 
    angle: 45,
    radius: 30,
    delay: 0.2
  },
  { 
    id: 3, 
    label: 'CONNECT', 
    angle: 90,
    radius: 30,
    delay: 0.3
  },
  { 
    id: 4, 
    label: 'LEARN', 
    angle: 135,
    radius: 30,
    delay: 0.4
  },
  { 
    id: 5, 
    label: 'ADD CONTEXT', 
    angle: 180,
    radius: 30,
    delay: 0.5
  },
  { 
    id: 6, 
    label: 'DISCOVER NEW QUESTIONS', 
    angle: 225,
    radius: 30,
    delay: 0.6
  },
  { 
    id: 7, 
    label: 'QUESTION', 
    angle: 270,
    radius: 30,
    delay: 0.7,
    isRepeat: true
  },
  { 
    id: 8, 
    label: 'FIND PEOPLE', 
    angle: 315,
    radius: 30,
    delay: 0.8,
    isRepeat: true
  }
];

// Central node
const center = {
  label: 'RELATIONSHIP\nINTELLIGENCE',
  x: 50,
  y: 50
};

export function IntelligenceCycle() {
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
        className="cycle-diagram-svg"
      >
        {/* Central circle */}
        <motion.g
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            duration: tokens.animation.duration.normal,
            delay: 0.0 
          }}
        >
          <circle 
            cx={center.x} 
            cy={center.y} 
            r={12} 
            fill="none"
            stroke={tokens.color.signal}
            strokeWidth="0.5"
          />
          <text
            x={center.x}
            y={center.y}
            textAnchor="middle"
            dy="-3"
            fontSize="6"
            fontFamily={tokens.font.mono}
            fill={tokens.color.signal}
            letterSpacing="0.1em"
            textAnchor="middle"
          >
            {center.label.split('\n')[0]}
          </text>
          <text
            x={center.x}
            y={center.y}
            textAnchor="middle"
            dy="7"
            fontSize="6"
            fontFamily={tokens.font.mono}
            fill={tokens.color.signal}
            letterSpacing="0.1em"
            textAnchor="middle"
          >
            {center.label.split('\n')[1]}
          </text>
        </motion.g>

        {/* Cycle path */}
        <motion.circle
          cx={center.x}
          cy={center.y}
          r={35}
          fill="none"
          stroke={tokens.color.line}
          strokeWidth="0.3"
          strokeDasharray="220"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ 
            duration: tokens.animation.duration.slower,
            ease: tokens.animation.easing.easeInOut,
            delay: 0.1
          }}
          style={{ pathLength: 0 }}
        />

        {/* Stage nodes */}
        {stages.map((stage) => {
          const x = center.x + stage.radius * Math.cos((stage.angle - 90) * Math.PI / 180);
          const y = center.y + stage.radius * Math.sin((stage.angle - 90) * Math.PI / 180);
          
          return (
            <motion.g
              key={`stage-${stage.id}`}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: tokens.animation.duration.normal,
                delay: stage.delay 
              }}
            >
              <circle 
                cx={x} 
                cy={y} 
                r={2} 
                fill={stage.isRepeat ? tokens.color.signal : tokens.color.ink}
                stroke={tokens.color.line}
                strokeWidth="0.3"
                opacity={stage.isRepeat ? 0.7 : 1}
              />
              <text
                x={x}
                y={y}
                textAnchor="middle"
                dy={stage.label.includes(' ') ? '10' : '8'}
                fontSize="5"
                fontFamily={tokens.font.mono}
                fill={stage.isRepeat ? tokens.color.signal : tokens.color.ink}
                letterSpacing="0.05em"
              >
                {stage.label}
              </text>

              {/* Connection line to center */}
              <motion.line
                x1={x}
                y1={y}
                x2={center.x}
                y2={center.y}
                stroke={tokens.color.line}
                strokeWidth="0.2"
                initial={{ 
                  pathLength: 0, 
                  opacity: 0 
                }}
                animate={{ 
                  pathLength: 1, 
                  opacity: 1 
                }}
                transition={{ 
                  duration: tokens.animation.duration.normal,
                  delay: stage.delay + 0.1 
                }}
              />
            </motion.g>
          );
        })}

        {/* Cycle arrows */}
        {stages.slice(0, -2).map((stage, index) => {
          const nextStage = stages[index + 1];
          if (!nextStage) return null;
          
          const startX = center.x + stage.radius * Math.cos((stage.angle - 90) * Math.PI / 180);
          const startY = center.y + stage.radius * Math.sin((stage.angle - 90) * Math.PI / 180);
          const endX = center.x + nextStage.radius * Math.cos((nextStage.angle - 90) * Math.PI / 180);
          const endY = center.y + nextStage.radius * Math.sin((nextStage.angle - 90) * Math.PI / 180);
          
          const midX = (startX + endX) / 2;
          const midY = (startY + endY) / 2;
          
          // Calculate angle for arrow
          const angle = Math.atan2(endY - startY, endX - startX) * 180 / Math.PI;
          
          return (
            <motion.text
              key={`arrow-${stage.id}`}
              x={midX}
              y={midY}
              textAnchor="middle"
              fontSize="6"
              fontFamily={tokens.font.mono}
              fill={tokens.color.muted}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: stage.delay + 0.2 }}
              style={{ transform: `rotate(${angle}deg)` }}
            >
              →
            </motion.text>
          );
        })}

        {/* Outer circle for emphasis */}
        <motion.circle
          cx={center.x}
          cy={center.y}
          r={45}
          fill="none"
          stroke={tokens.color.line}
          strokeWidth="0.2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ 
            duration: tokens.animation.duration.normal,
            delay: 0.3
          }}
        />
      </svg>
    </motion.div>
  );
}
