'use client';

import { motion } from 'framer-motion';
import { tokens } from '@/lib/design-tokens';

// Africa outline coordinates - simplified, abstract representation
// Designed to be minimal and editorial, not decorative
const africaOutline = [
  // Top
  { x: 50, y: 10 },
  { x: 55, y: 8 },
  { x: 60, y: 10 },
  { x: 65, y: 8 },
  { x: 70, y: 12 },
  { x: 72, y: 18 },
  { x: 70, y: 25 },
  { x: 65, y: 30 },
  // Right side
  { x: 65, y: 40 },
  { x: 60, y: 50 },
  { x: 55, y: 55 },
  { x: 50, y: 58 },
  // Bottom
  { x: 45, y: 55 },
  { x: 40, y: 50 },
  { x: 35, y: 45 },
  { x: 30, y: 40 },
  { x: 25, y: 35 },
  { x: 28, y: 25 },
  { x: 35, y: 20 },
  { x: 45, y: 15 },
  { x: 50, y: 10 },
];

// Node categories with positions that form a network revealing Africa's shape
const nodes = [
  // Top cluster (North Africa)
  { id: 1, category: 'government', label: 'GOVERNMENT', x: 35, y: 20, delay: 0.1 },
  { id: 2, category: 'institution', label: 'INSTITUTION', x: 65, y: 18, delay: 0.2 },
  
  // Left cluster (West Africa)
  { id: 3, category: 'company', label: 'COMPANY', x: 25, y: 40, delay: 0.3 },
  { id: 4, category: 'researcher', label: 'RESEARCHER', x: 20, y: 50, delay: 0.4 },
  
  // Right cluster (East Africa)
  { id: 5, category: 'market', label: 'MARKET', x: 75, y: 35, delay: 0.5 },
  { id: 6, category: 'person', label: 'PERSON', x: 80, y: 50, delay: 0.6 },
  
  // Bottom cluster (Southern Africa)
  { id: 7, category: 'information', label: 'INFORMATION', x: 40, y: 65, delay: 0.7 },
  { id: 8, category: 'evidence', label: 'EVIDENCE', x: 60, y: 65, delay: 0.8 },
];

// Central AKSOS node
const aksosNode = {
  id: 'aksos',
  label: 'AKSOS',
  x: 50,
  y: 40,
  delay: 0.0
};

// Relationships - connections that form the network
const relationships = [
  // Connections that reveal Africa's shape
  { from: 'aksos', to: 1, delay: 0.9 },
  { from: 'aksos', to: 2, delay: 1.0 },
  { from: 'aksos', to: 3, delay: 1.1 },
  { from: 'aksos', to: 4, delay: 1.2 },
  { from: 'aksos', to: 5, delay: 1.3 },
  { from: 'aksos', to: 6, delay: 1.4 },
  { from: 'aksos', to: 7, delay: 1.5 },
  { from: 'aksos', to: 8, delay: 1.6 },
  // Cross-connections
  { from: 1, to: 2, delay: 1.7 },
  { from: 3, to: 7, delay: 1.8 },
  { from: 4, to: 8, delay: 1.9 },
  { from: 5, to: 6, delay: 2.0 },
  { from: 2, to: 5, delay: 2.1 },
  { from: 1, to: 3, delay: 2.2 },
];

export function HeroNetwork() {
  return (
    <motion.div 
      className="hero-network"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: tokens.animation.duration.slower }}
    >
      <svg 
        viewBox="0 0 100 80"
        preserveAspectRatio="xMidYMid meet"
        style={{ width: '100%', height: '100%', minHeight: '400px' }}
      >
        {/* Africa outline - very subtle, appears first */}
        <motion.path
          d={generatePath(africaOutline)}
          fill="none"
          stroke={tokens.color.line}
          strokeWidth="0.3"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{
            duration: tokens.animation.duration.slower,
            ease: tokens.animation.easing.easeInOut
          }}
        />

        {/* Central AKSOS node - appears first */}
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
            r={3} 
            fill={tokens.color.ink}
            stroke={tokens.color.signal}
            strokeWidth="0.5"
          />
          <text
            x={aksosNode.x}
            y={aksosNode.y}
            textAnchor="middle"
            dy="14"
            fontSize="7"
            fontFamily={tokens.font.mono}
            fill={tokens.color.signal}
            letterSpacing="0.1em"
          >
            {aksosNode.label}
          </text>
        </motion.g>

        {/* Nodes - appear progressively */}
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
              r={2} 
              fill={tokens.color.ink}
              stroke={tokens.color.line}
              strokeWidth="0.3"
            />
            <motion.text
              x={node.x}
              y={node.y}
              textAnchor="middle"
              dy="12"
              fontSize="6"
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

        {/* Relationships - draw progressively */}
        {relationships.map((rel) => {
          const fromNode = rel.from === 'aksos' ? aksosNode : nodes.find(n => n.id === rel.from);
          const toNode = rel.to === 'aksos' ? aksosNode : nodes.find(n => n.id === rel.to);
          
          if (!fromNode || !toNode) return null;
          
          return (
            <motion.line
              key={`rel-${rel.from}-${rel.to}`}
              x1={fromNode.x}
              y1={fromNode.y}
              x2={toNode.x}
              y2={toNode.y}
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
                delay: rel.delay
              }}
            />
          );
        })}
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
