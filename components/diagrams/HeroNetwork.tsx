'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { tokens } from '@/lib/design-tokens';

// Golden ratio constants
const PHI = 1.618;
const center = { x: 50, y: 50 };

// Africa outline - simplified abstract representation using golden ratio proportions
const africaOutline = [
  { x: 50, y: 10 }, { x: 58, y: 8 }, { x: 65, y: 10 }, { x: 72, y: 8 },
  { x: 78, y: 12 }, { x: 80, y: 20 }, { x: 78, y: 28 }, { x: 75, y: 35 },
  { x: 75, y: 45 }, { x: 70, y: 55 }, { x: 65, y: 62 }, { x: 60, y: 65 },
  { x: 50, y: 68 }, { x: 40, y: 65 }, { x: 35, y: 62 }, { x: 30, y: 55 },
  { x: 25, y: 45 }, { x: 25, y: 35 }, { x: 28, y: 28 }, { x: 35, y: 20 },
  { x: 42, y: 15 }, { x: 50, y: 10 },
];

// Concentric circles representing information depth
const circles = [
  { r: 12, label: 'PUBLIC', color: tokens.color.line, delay: 0.1 },
  { r: 25, label: 'CONTEXT', color: tokens.color.line, delay: 0.2 },
  { r: 38, label: 'PEOPLE', color: tokens.color.line, delay: 0.3 },
  { r: 50, label: 'INSTITUTIONS', color: tokens.color.line, delay: 0.4 },
];

// Connection nodes positioned on circles
const nodes = [
  // Public layer
  { id: 1, label: 'GOVERNMENT', r: 12, angle: 45, circleIndex: 0, delay: 0.5 },
  { id: 2, label: 'COMPANIES', r: 12, angle: 135, circleIndex: 0, delay: 0.55 },
  { id: 3, label: 'RESEARCH', r: 12, angle: 225, circleIndex: 0, delay: 0.6 },
  { id: 4, label: 'MARKETS', r: 12, angle: 315, circleIndex: 0, delay: 0.65 },
  
  // Context layer
  { id: 5, label: 'POLICIES', r: 25, angle: 0, circleIndex: 1, delay: 0.7 },
  { id: 6, label: 'PROGRAMS', r: 25, angle: 90, circleIndex: 1, delay: 0.75 },
  { id: 7, label: 'EVENTS', r: 25, angle: 180, circleIndex: 1, delay: 0.8 },
  { id: 8, label: 'REPORTS', r: 25, angle: 270, circleIndex: 1, delay: 0.85 },
  
  // People layer
  { id: 9, label: 'EXPERTS', r: 38, angle: 30, circleIndex: 2, delay: 0.9 },
  { id: 10, label: 'LEADERS', r: 38, angle: 150, circleIndex: 2, delay: 0.95 },
  { id: 11, label: 'ANALYSTS', r: 38, angle: 210, circleIndex: 2, delay: 1.0 },
  { id: 12, label: 'SOURCES', r: 38, angle: 330, circleIndex: 2, delay: 1.05 },
];

export function HeroNetwork() {
  const [isHovered, setIsHovered] = useState(false);

  const getPosition = (r: number, angle: number) => ({
    x: center.x + r * Math.cos((angle - 90) * Math.PI / 180),
    y: center.y + r * Math.sin((angle - 90) * Math.PI / 180)
  });

  return (
    <motion.div
      className="hero-network"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: tokens.animation.duration.slower }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" style={{ width: '100%', height: '400px' }}>
        
        {/* Africa outline - subtle, using golden ratio for proportions */}
        <motion.path
          d={generatePath(africaOutline)}
          fill="none"
          stroke={tokens.color.line}
          strokeWidth="0.2"
          opacity={0.3}
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.3 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: tokens.animation.duration.slower, ease: tokens.animation.easing.easeInOut }}
        />

        {/* Concentric circles - information depth layers */}
        {circles.map((circle, index) => (
          <motion.circle
            key={`circle-${index}`}
            cx={center.x}
            cy={center.y}
            r={circle.r}
            fill="none"
            stroke={circle.color}
            strokeWidth="0.3"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: tokens.animation.duration.normal, delay: circle.delay }}
            animate={isHovered ? { strokeWidth: [0.3, 0.5, 0.3] } : {}}
            transition={isHovered ? { duration: 2, repeat: Infinity, ease: 'easeInOut', delay: index * 0.1 } : {}}
          />
        ))}

        {/* AKSOS center node with signal color */}
        <motion.g
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: tokens.animation.duration.normal }}
          animate={isHovered ? { scale: [1, 1.1, 1] } : {}}
          transition={isHovered ? { duration: 2, repeat: Infinity, ease: 'easeInOut' } : {}}
        >
          <circle cx={center.x} cy={center.y} r={3} fill="none" stroke={tokens.color.signal} strokeWidth="0.5" />
          <circle cx={center.x} cy={center.y} r={1.5} fill={tokens.color.signal} />
          <text
            x={center.x} y={center.y} textAnchor="middle" dy="-18"
            fontSize="8" fontFamily={tokens.font.mono} fill={tokens.color.signal} letterSpacing="0.15em"
          >
            AKSOS
          </text>
          <text
            x={center.x} y={center.y} textAnchor="middle" dy="-8"
            fontSize="5" fontFamily={tokens.font.mono} fill={tokens.color.muted} letterSpacing="0.1em"
          >
            INTELLIGENCE
          </text>
          <text
            x={center.x} y={center.y} textAnchor="middle" dy="4"
            fontSize="5" fontFamily={tokens.font.mono} fill={tokens.color.muted} letterSpacing="0.1em"
          >
            INFRASTRUCTURE
          </text>
        </motion.g>

        {/* Nodes positioned on concentric circles */}
        {nodes.map((node) => {
          const pos = getPosition(node.r, node.angle);
          const nodeDelay = node.delay;
          
          return (
            <motion.g
              key={`node-${node.id}`}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: tokens.animation.duration.normal, delay: nodeDelay }}
              whileHover={{ scale: 1.2, cursor: 'default' }}
              animate={isHovered ? { scale: [1, 1.1, 1], opacity: [1, 0.8, 1] } : {}}
              transition={isHovered ? { duration: 2, repeat: Infinity, ease: 'easeInOut', delay: nodeDelay } : {}}
            >
              <circle cx={pos.x} cy={pos.y} r={1.5} fill={tokens.color.ink} stroke={tokens.color.line} strokeWidth="0.2" />
              <text
                x={pos.x} y={pos.y} textAnchor="middle" 
                dy={node.label.length > 6 ? '12' : '10'}
                fontSize="5" fontFamily={tokens.font.mono} fill={tokens.color.muted} letterSpacing="0.1em"
              >
                {node.label}
              </text>
            </motion.g>
          );
        })}

        {/* Connection lines from AKSOS to nodes */}
        {nodes.map((node, index) => {
          const pos = getPosition(node.r, node.angle);
          return (
            <motion.line
              key={`line-${node.id}`}
              x1={center.x} y1={center.y} x2={pos.x} y2={pos.y}
              stroke={tokens.color.line}
              strokeWidth="0.15"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.5 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: tokens.animation.duration.normal, delay: 0.6 + (index * 0.02) }}
              animate={isHovered ? { opacity: [0.5, 1, 0.5], strokeWidth: [0.15, 0.3, 0.15] } : {}}
              transition={isHovered ? { duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: index * 0.05 } : {}}
            />
          );
        })}

        {/* Depth labels */}
        {circles.map((circle, index) => {
          const labelAngle = index * 90 + 45;
          const labelPos = getPosition(circle.r + 3, labelAngle);
          return (
            <motion.text
              key={`label-${index}`}
              x={labelPos.x} y={labelPos.y} textAnchor="middle"
              fontSize="4" fontFamily={tokens.font.mono} fill={tokens.color.muted} letterSpacing="0.1em"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: tokens.animation.duration.normal, delay: circle.delay + 0.2 }}
            >
              {circle.label}
            </motion.text>
          );
        })}

        {/* Hover indicator */}
        {isHovered && (
          <motion.text
            x={center.x} y={92} textAnchor="middle"
            fontSize="4" fontFamily={tokens.font.mono} fill={tokens.color.muted}
            letterSpacing="0.1em"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            HOVER TO SEE CONNECTIONS
          </motion.text>
        )}
      </svg>
    </motion.div>
  );
}

function generatePath(points: { x: number; y: number }[]): string {
  if (points.length === 0) return '';
  let path = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    path += ` L ${points[i].x} ${points[i].y}`;
  }
  path += ' Z';
  return path;
}
