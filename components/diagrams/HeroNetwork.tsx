'use client';

import { motion } from 'framer-motion';
import { tokens } from '@/lib/design-tokens';

// Simplified Africa outline coordinates (very abstract representation)
const africaOutline = [
  { x: 20, y: 30 },
  { x: 25, y: 20 },
  { x: 35, y: 15 },
  { x: 45, y: 18 },
  { x: 55, y: 22 },
  { x: 65, y: 18 },
  { x: 70, y: 25 },
  { x: 72, y: 35 },
  { x: 68, y: 45 },
  { x: 60, y: 50 },
  { x: 55, y: 55 },
  { x: 45, y: 58 },
  { x: 40, y: 55 },
  { x: 35, y: 50 },
  { x: 30, y: 45 },
  { x: 25, y: 40 },
  { x: 20, y: 30 },
];

// Node categories and their positions
const nodes = [
  { 
    id: 1, 
    category: 'government', 
    label: 'GOVERNMENT', 
    x: 25, 
    y: 25,
    delay: 0.1 
  },
  { 
    id: 2, 
    category: 'company', 
    label: 'COMPANY', 
    x: 75, 
    y: 20,
    delay: 0.2 
  },
  { 
    id: 3, 
    category: 'institution', 
    label: 'INSTITUTION', 
    x: 15, 
    y: 65,
    delay: 0.3 
  },
  { 
    id: 4, 
    category: 'researcher', 
    label: 'RESEARCHER', 
    x: 85, 
    y: 70,
    delay: 0.4 
  },
  { 
    id: 5, 
    category: 'market', 
    label: 'MARKET', 
    x: 50, 
    y: 10,
    delay: 0.5 
  },
  { 
    id: 6, 
    category: 'person', 
    label: 'PERSON', 
    x: 90, 
    y: 50,
    delay: 0.6 
  },
  { 
    id: 7, 
    category: 'information', 
    label: 'INFORMATION', 
    x: 10, 
    y: 50,
    delay: 0.7 
  },
];

// Relationships between nodes (crossing geographic boundaries)
const relationships = [
  { from: 1, to: 4, delay: 0.8 },
  { from: 2, to: 5, delay: 0.9 },
  { from: 3, to: 6, delay: 1.0 },
  { from: 5, to: 7, delay: 1.1 },
  { from: 1, to: 2, delay: 1.2 },
  { from: 3, to: 4, delay: 1.3 },
  { from: 6, to: 7, delay: 1.4 },
  { from: 2, to: 3, delay: 1.5 },
];

// Central AKSOS node
const aksosNode = {
  id: 'aksos',
  label: 'AKSOS',
  x: 50,
  y: 50,
  delay: 0.0
};

// Scale factor for the SVG
const scale = 4;
const centerX = 50 * scale;
const centerY = 50 * scale;

export function HeroNetwork() {
  return (
    <motion.div 
      className="hero-network"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: tokens.animation.duration.slower }}
    >
      <svg 
        viewBox="0 0 100 100" 
        preserveAspectRatio="xMidYMid meet"
        className="hero-network-svg"
        style={{ width: '100%', height: '400px' }}
      >
        {/* Africa outline - very subtle */}
        <motion.path
          d={generatePath(africaOutline)}
          fill="none"
          stroke={tokens.color.line}
          strokeWidth="0.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: tokens.animation.duration.slower,
            ease: tokens.animation.easing.easeInOut
          }}
        />

        {/* Central AKSOS node */}
        <motion.g
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: tokens.animation.duration.normal,
            delay: aksosNode.delay
          }}
        >
          <circle 
            cx={aksosNode.x} 
            cy={aksosNode.y} 
            r={4} 
            fill={tokens.color.ink}
            stroke={tokens.color.signal}
            strokeWidth="0.5"
          />
          <text
            x={aksosNode.x}
            y={aksosNode.y}
            textAnchor="middle"
            dy="20"
            fontSize="8"
            fontFamily={tokens.font.mono}
            fill={tokens.color.signal}
            letterSpacing="0.1em"
          >
            {aksosNode.label}
          </text>
        </motion.g>

        {/* Nodes */}
        {nodes.map((node) => (
          <motion.g
            key={`node-${node.id}`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: tokens.animation.duration.normal,
              delay: node.delay
            }}
          >
            <circle 
              cx={node.x} 
              cy={node.y} 
              r={2.5} 
              fill={tokens.color.ink}
              stroke={tokens.color.line}
              strokeWidth="0.3"
            />
            <motion.text
              x={node.x}
              y={node.y}
              textAnchor="middle"
              dy="15"
              fontSize="7"
              fontFamily={tokens.font.mono}
              fill={tokens.color.muted}
              letterSpacing="0.1em"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: node.delay + 0.1 }}
            >
              {node.label}
            </motion.text>
          </motion.g>
        ))}

        {/* Relationships */}
        {relationships.map((rel, index) => {
          const fromNode = nodes.find(n => n.id === rel.from) || aksosNode;
          const toNode = nodes.find(n => n.id === rel.to) || aksosNode;
          
          return (
            <motion.line
              key={`rel-${rel.from}-${rel.to}`}
              x1={fromNode.x}
              y1={fromNode.y}
              x2={toNode.x}
              y2={toNode.y}
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
                delay: rel.delay
              }}
            />
          );
        })}

        {/* Additional connecting lines to AKSOS */}
        {nodes.map((node, index) => (
          <motion.line
            key={`aksos-${node.id}`}
            x1={aksosNode.x}
            y1={aksosNode.y}
            x2={node.x}
            y2={node.y}
            stroke={tokens.color.line}
            strokeWidth="0.2"
            strokeDasharray="2,2"
            initial={{ 
              pathLength: 0, 
              opacity: 0 
            }}
            animate={{ 
              pathLength: 1, 
              opacity: 0.5 
            }}
            transition={{
              duration: tokens.animation.duration.normal,
              delay: node.delay + 0.3
            }}
          />
        ))}
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
