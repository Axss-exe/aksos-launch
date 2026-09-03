'use client';

import { motion } from 'framer-motion';
import { tokens } from '@/lib/design-tokens';

// Fragment nodes entering from different directions
const fragments = [
  { id: 1, label: 'PEOPLE', x: 10, y: 20, delay: 0.1, direction: 'left' },
  { id: 2, label: 'INSTITUTIONS', x: 90, y: 25, delay: 0.2, direction: 'right' },
  { id: 3, label: 'RESEARCHERS', x: 5, y: 75, delay: 0.3, direction: 'left' },
  { id: 4, label: 'ORGANIZATIONS', x: 95, y: 70, delay: 0.4, direction: 'right' },
  { id: 5, label: 'EVIDENCE', x: 50, y: 5, delay: 0.5, direction: 'top' },
  { id: 6, label: 'DATA', x: 50, y: 95, delay: 0.6, direction: 'bottom' },
  { id: 7, label: 'LOCAL KNOWLEDGE', x: 30, y: 50, delay: 0.7, direction: 'left' },
];

// Central AKSOS node
const center = { x: 50, y: 50, label: 'AKSOS', delay: 0.0 };

// Output nodes
const outputs = [
  { id: 1, label: 'CONTEXT', x: 50, y: 35, delay: 1.2 },
  { id: 2, label: 'RELATIONSHIPS', x: 40, y: 45, delay: 1.3 },
  { id: 3, label: 'INTELLIGENCE', x: 60, y: 45, delay: 1.4 },
];

// Final output
const finalOutput = {
  label: 'ONE COHERENT PICTURE',
  x: 50,
  y: 65,
  delay: 1.5
};

export function ConvergenceDiagram() {
  return (
    <motion.div 
      className="convergence-diagram"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: tokens.animation.duration.slow }}
    >
      <svg 
        viewBox="0 0 100 100" 
        preserveAspectRatio="xMidYMid meet"
        className="convergence-diagram-svg"
      >
        {/* Central AKSOS node */}
        <motion.g
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            duration: tokens.animation.duration.normal,
            delay: center.delay 
          }}
        >
          <circle 
            cx={center.x} 
            cy={center.y} 
            r={8} 
            fill="none"
            stroke={tokens.color.signal}
            strokeWidth="1"
          />
          <text
            x={center.x}
            y={center.y}
            textAnchor="middle"
            dy="3"
            fontSize="8"
            fontFamily={tokens.font.mono}
            fill={tokens.color.signal}
            letterSpacing="0.1em"
          >
            {center.label}
          </text>
        </motion.g>

        {/* Fragment nodes entering */}
        {fragments.map((fragment) => (
          <motion.g
            key={`fragment-${fragment.id}`}
            initial={getInitialPosition(fragment)}
            animate={{ 
              x: fragment.x,
              y: fragment.y,
              opacity: 1 
            }}
            transition={{ 
              duration: tokens.animation.duration.normal,
              delay: fragment.delay,
              ease: tokens.animation.easing.easeOut 
            }}
          >
            <circle 
              cx={fragment.x} 
              cy={fragment.y} 
              r={3} 
              fill={tokens.color.ink}
              stroke={tokens.color.line}
              strokeWidth="0.5"
            />
            <motion.text
              x={fragment.x}
              y={fragment.y}
              textAnchor="middle"
              dy="12"
              fontSize="7"
              fontFamily={tokens.font.mono}
              fill={tokens.color.muted}
              letterSpacing="0.1em"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: fragment.delay + 0.1 }}
            >
              {fragment.label}
            </motion.text>
          </motion.g>
        ))}

        {/* Convergence lines from fragments to center */}
        {fragments.map((fragment) => (
          <motion.line
            key={`line-${fragment.id}`}
            x1={fragment.x}
            y1={fragment.y}
            x2={center.x}
            y2={center.y}
            stroke={tokens.color.line}
            strokeWidth="0.3"
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
              delay: fragment.delay + 0.2 
            }}
          />
        ))}

        {/* Output nodes */}
        {outputs.map((output) => (
          <motion.g
            key={`output-${output.id}`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: tokens.animation.duration.normal,
              delay: output.delay 
            }}
          >
            <circle 
              cx={output.x} 
              cy={output.y} 
              r={2.5} 
              fill={tokens.color.signal}
              stroke="none"
            />
            <text
              x={output.x}
              y={output.y}
              textAnchor="middle"
              dy="10"
              fontSize="6"
              fontFamily={tokens.font.mono}
              fill={tokens.color.signal}
              letterSpacing="0.1em"
            >
              {output.label}
            </text>
          </motion.g>
        ))}

        {/* Lines from center to outputs */}
        {outputs.map((output) => (
          <motion.line
            key={`output-line-${output.id}`}
            x1={center.x}
            y1={center.y}
            x2={output.x}
            y2={output.y}
            stroke={tokens.color.signal}
            strokeWidth="0.3"
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
              delay: output.delay + 0.1 
            }}
          />
        ))}

        {/* Final output */}
        <motion.g
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: tokens.animation.duration.normal,
            delay: finalOutput.delay 
          }}
        >
          <rect
            x={finalOutput.x - 25}
            y={finalOutput.y - 6}
            width={50}
            height={12}
            fill="none"
            stroke={tokens.color.signal}
            strokeWidth="0.5"
          />
          <text
            x={finalOutput.x}
            y={finalOutput.y}
            textAnchor="middle"
            dy="4"
            fontSize="8"
            fontFamily={tokens.font.mono}
            fill={tokens.color.signal}
            letterSpacing="0.1em"
          >
            {finalOutput.label}
          </text>
        </motion.g>

        {/* Convergence arrows */}
        {fragments.slice(0, 4).map((fragment, index) => {
          const arrowX = fragment.direction === 'left' ? fragment.x + 5 : fragment.x - 5;
          const arrowY = fragment.y;
          const arrowDirection = fragment.direction === 'left' ? 'right' : 'left';
          
          return (
            <motion.text
              key={`arrow-${fragment.id}`}
              x={arrowX}
              y={arrowY}
              textAnchor="middle"
              dy="-5"
              fontSize="8"
              fontFamily={tokens.font.mono}
              fill={tokens.color.muted}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: fragment.delay + 0.3 }}
            >
              {arrowDirection === 'right' ? '→' : '←'}
            </motion.text>
          );
        })}
      </svg>
    </motion.div>
  );
}

function getInitialPosition(fragment: typeof fragments[0]) {
  switch (fragment.direction) {
    case 'left':
      return { x: -10, y: fragment.y, opacity: 0 };
    case 'right':
      return { x: 110, y: fragment.y, opacity: 0 };
    case 'top':
      return { x: fragment.x, y: -10, opacity: 0 };
    case 'bottom':
      return { x: fragment.x, y: 110, opacity: 0 };
    default:
      return { x: fragment.x, y: fragment.y, opacity: 0 };
  }
}
