'use client';

import { motion } from 'framer-motion';
import { tokens } from '@/lib/design-tokens';

// Section 10: Growing Network Diagram
// Shows progressive node addition with increasing density
// Demonstrates: We're building the network, too. Network value increases with relationships.

export function GrowingNetwork() {
  const center = { x: 50, y: 50 };

  // Initial nodes
  const initialNodes = [
    { id: 1, label: 'AKSOS', x: center.x, y: center.y, category: 'aksos', delay: 0.0 },
    { id: 2, label: 'BUILDERS', x: 30, y: 30, category: 'builders', delay: 0.1 },
    { id: 3, label: 'INFORMATION HOLDERS', x: 70, y: 30, category: 'holders', delay: 0.2 },
    { id: 4, label: 'BUILDERS', x: 30, y: 70, category: 'builders', delay: 0.3 },
    { id: 5, label: 'INFORMATION HOLDERS', x: 70, y: 70, category: 'holders', delay: 0.4 },
  ];

  // Additional nodes that appear progressively
  const additionalNodes = [
    { id: 6, label: 'RESEARCHERS', x: 20, y: 50, category: 'researchers', delay: 0.6 },
    { id: 7, label: 'ORGANIZATIONS', x: 80, y: 50, category: 'orgs', delay: 0.7 },
    { id: 8, label: 'INDUSTRY EXPERTS', x: 50, y: 20, category: 'experts', delay: 0.8 },
    { id: 9, label: 'PARTNERS', x: 50, y: 80, category: 'partners', delay: 0.9 },
    { id: 10, label: 'EARLY USERS', x: 25, y: 25, category: 'users', delay: 1.0 },
    { id: 11, label: 'CURIOUS PEOPLE', x: 75, y: 75, category: 'curious', delay: 1.1 },
  ];

  // Relationships
  const relationships = [
    { from: 1, to: 2, delay: 0.2 },
    { from: 1, to: 3, delay: 0.3 },
    { from: 1, to: 4, delay: 0.4 },
    { from: 1, to: 5, delay: 0.5 },
    { from: 2, to: 4, delay: 0.6 },
    { from: 3, to: 5, delay: 0.7 },
    { from: 2, to: 3, delay: 0.8 },
    { from: 4, to: 5, delay: 0.9 },
    { from: 1, to: 6, delay: 1.0 },
    { from: 1, to: 7, delay: 1.1 },
    { from: 1, to: 8, delay: 1.2 },
    { from: 1, to: 9, delay: 1.3 },
    { from: 2, to: 6, delay: 1.4 },
    { from: 3, to: 7, delay: 1.5 },
    { from: 6, to: 8, delay: 1.6 },
    { from: 7, to: 9, delay: 1.7 },
    { from: 10, to: 2, delay: 1.8 },
    { from: 11, to: 3, delay: 1.9 },
  ];

  const allNodes = [...initialNodes, ...additionalNodes];

  return (
    <motion.div 
      className="growing-network"
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
        {/* All nodes */}
        {allNodes.map((node) => {
          const isAksos = node.category === 'aksos';
          
          return (
            <motion.g
              key={`node-${node.id}`}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: tokens.animation.duration.normal, delay: node.delay }}
            >
              <circle 
                cx={node.x} 
                cy={node.y} 
                r={isAksos ? 3.5 : 2}
                fill={tokens.color.ink}
                stroke={isAksos ? tokens.color.signal : tokens.color.line}
                strokeWidth={isAksos ? 0.5 : 0.3}
              />
              <motion.text
                x={node.x}
                y={node.y}
                textAnchor="middle"
                dy={isAksos ? '14' : '12'}
                fontSize={isAksos ? '7' : '6'}
                fontFamily={tokens.font.mono}
                fill={isAksos ? tokens.color.signal : tokens.color.ink}
                letterSpacing="0.1em"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ delay: node.delay + 0.1 }}
              >
                {node.label}
              </motion.text>
            </motion.g>
          );
        })}

        {/* Relationships */}
        {relationships.map((rel) => {
          const fromNode = allNodes.find(n => n.id === rel.from);
          const toNode = allNodes.find(n => n.id === rel.to);
          
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
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{
                duration: tokens.animation.duration.normal,
                delay: rel.delay
              }}
            />
          );
        })}

        {/* Value statement */}
        <motion.g
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: tokens.animation.duration.normal, delay: 1.4 }}
        >
          <text
            x={center.x}
            y={95}
            textAnchor="middle"
            fontSize="8"
            fontFamily={tokens.font.mono}
            fill={tokens.color.muted}
            letterSpacing="0.1em"
          >
            NETWORK VALUE
          </text>
          <text
            x={center.x}
            y={103}
            textAnchor="middle"
            fontSize="8"
            fontFamily={tokens.font.mono}
            fill={tokens.color.muted}
            letterSpacing="0.1em"
          >
            INCREASES WITH
          </text>
          <text
            x={center.x}
            y={111}
            textAnchor="middle"
            fontSize="8"
            fontFamily={tokens.font.mono}
            fill={tokens.color.ink}
            letterSpacing="0.1em"
          >
            RELATIONSHIPS
          </text>
        </motion.g>
      </svg>
    </motion.div>
  );
}
