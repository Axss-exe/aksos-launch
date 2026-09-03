'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useState } from 'react';
import { tokens } from '@/lib/design-tokens';

// Africa outline - simplified abstract representation
const africaOutline = [
  { x: 50, y: 10 }, { x: 55, y: 8 }, { x: 60, y: 10 }, { x: 65, y: 8 },
  { x: 70, y: 12 }, { x: 72, y: 18 }, { x: 70, y: 25 }, { x: 65, y: 30 },
  { x: 65, y: 40 }, { x: 60, y: 50 }, { x: 55, y: 55 }, { x: 50, y: 58 },
  { x: 45, y: 55 }, { x: 40, y: 50 }, { x: 35, y: 45 }, { x: 30, y: 40 },
  { x: 25, y: 35 }, { x: 28, y: 25 }, { x: 35, y: 20 }, { x: 45, y: 15 },
  { x: 50, y: 10 },
];

const nodes = [
  { id: 1, label: 'GOVERNMENT', x: 35, y: 20, delay: 0.1 },
  { id: 2, label: 'INSTITUTION', x: 65, y: 18, delay: 0.2 },
  { id: 3, label: 'COMPANY', x: 25, y: 40, delay: 0.3 },
  { id: 4, label: 'RESEARCHER', x: 20, y: 50, delay: 0.4 },
  { id: 5, label: 'MARKET', x: 75, y: 35, delay: 0.5 },
  { id: 6, label: 'PERSON', x: 80, y: 50, delay: 0.6 },
  { id: 7, label: 'INFORMATION', x: 40, y: 65, delay: 0.7 },
  { id: 8, label: 'EVIDENCE', x: 60, y: 65, delay: 0.8 },
];

const aksosNode = { id: 'aksos', label: 'AKSOS', x: 50, y: 40, delay: 0.0 };

const relationships = [
  { from: 'aksos', to: 1 }, { from: 'aksos', to: 2 }, { from: 'aksos', to: 3 },
  { from: 'aksos', to: 4 }, { from: 'aksos', to: 5 }, { from: 'aksos', to: 6 },
  { from: 'aksos', to: 7 }, { from: 'aksos', to: 8 },
  { from: 1, to: 2 }, { from: 3, to: 7 }, { from: 4, to: 8 },
  { from: 5, to: 6 }, { from: 2, to: 5 }, { from: 1, to: 3 },
];

export function HeroNetwork() {
  const [isHovered, setIsHovered] = useState(false);

  // Subtle pulsing for AKSOS node
  const aksosScale = useSpring(isHovered ? 1.1 : 1, { damping: 10, stiffness: 200 });
  const lineOpacity = useSpring(isHovered ? 1 : 0.5, { damping: 10, stiffness: 100 });

  const getNode = (id: number | string) => {
    if (id === 'aksos') return aksosNode;
    return nodes.find(n => n.id === id);
  };

  return (
    <motion.div
      className="hero-network"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: tokens.animation.duration.slower }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <svg viewBox="0 0 100 80" preserveAspectRatio="xMidYMid meet" style={{ width: '100%', height: '400px' }}>
        
        {/* Africa outline - subtle, always visible */}
        <motion.path
          d={generatePath(africaOutline)}
          fill="none"
          stroke={tokens.color.line}
          strokeWidth="0.3"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: tokens.animation.duration.slower, ease: tokens.animation.easing.easeInOut }}
        />

        {/* Central AKSOS node */}
        <motion.g style={{ scale: aksosScale }}>
          <circle cx={aksosNode.x} cy={aksosNode.y} r={3} fill={tokens.color.ink} stroke={tokens.color.signal} strokeWidth="0.5" />
          <text
            x={aksosNode.x} y={aksosNode.y} textAnchor="middle" dy="14"
            fontSize="7" fontFamily={tokens.font.mono} fill={tokens.color.signal} letterSpacing="0.1em"
          >
            {aksosNode.label}
          </text>
        </motion.g>

        {/* Nodes */}
        {nodes.map((node) => {
          const nodeDelay = node.delay;
          const springScale = useSpring(isHovered ? 1.1 : 1, { damping: 10, stiffness: 200 });
          
          return (
            <motion.g
              key={`node-${node.id}`}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: tokens.animation.duration.normal, delay: nodeDelay }}
              style={{ scale: isHovered ? springScale : 1 }}
            >
              <circle cx={node.x} cy={node.y} r={2} fill={tokens.color.ink} stroke={tokens.color.line} strokeWidth="0.3" />
              <motion.text
                x={node.x} y={node.y} textAnchor="middle" dy="12"
                fontSize="6" fontFamily={tokens.font.mono} fill={tokens.color.muted} letterSpacing="0.1em"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: nodeDelay + 0.1 }}
              >
                {node.label}
              </motion.text>
            </motion.g>
          );
        })}

        {/* Relationships with pulsing opacity */}
        {relationships.map((rel, index) => {
          const fromNode = getNode(rel.from);
          const toNode = getNode(rel.to);
          if (!fromNode || !toNode) return null;

          return (
            <motion.line
              key={`rel-${rel.from}-${rel.to}`}
              x1={fromNode.x} y1={fromNode.y} x2={toNode.x} y2={toNode.y}
              stroke={tokens.color.line} strokeWidth="0.2"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: 1, 
                opacity: isHovered ? lineOpacity : 0.5 
              }}
              transition={{
                duration: tokens.animation.duration.normal,
                delay: 0.5 + (index * 0.05)
              }}
              style={{ opacity: isHovered ? 1 : 0.5 }}
            />
          );
        })}

        {/* Hover indicator */}
        {isHovered && (
          <motion.text
            x={50} y={75} textAnchor="middle"
            fontSize="5" fontFamily={tokens.font.mono} fill={tokens.color.muted}
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
