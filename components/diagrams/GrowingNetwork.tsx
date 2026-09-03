'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useState } from 'react';
import { tokens } from '@/lib/design-tokens';

export function GrowingNetwork() {
  const [isHovered, setIsHovered] = useState(false);
  const center = { x: 50, y: 40 };

  const nodes = [
    { id: 1, label: 'PERSON', x: 20, y: 20, delay: 0.1 },
    { id: 2, label: 'ORGANIZATION', x: 20, y: 50, delay: 0.2 },
    { id: 3, label: 'INSTITUTION', x: 20, y: 80, delay: 0.3 },
    { id: 4, label: 'RESEARCH', x: 80, y: 20, delay: 0.4 },
    { id: 5, label: 'MARKET', x: 80, y: 50, delay: 0.5 },
    { id: 6, label: 'LOCAL', x: 80, y: 80, delay: 0.6 },
  ];

  const aksosNode = { id: 'aksos', label: 'AKSOS', x: center.x, y: center.y, delay: 0.0 };

  const relationships = [
    { from: 'aksos', to: 1 }, { from: 'aksos', to: 2 }, { from: 'aksos', to: 3 },
    { from: 'aksos', to: 4 }, { from: 'aksos', to: 5 }, { from: 'aksos', to: 6 },
    { from: 1, to: 2 }, { from: 2, to: 3 }, { from: 4, to: 5 }, { from: 5, to: 6 },
    { from: 1, to: 4 }, { from: 2, to: 5 }, { from: 3, to: 6 },
  ];

  const getNode = (id: number | string) => {
    if (id === 'aksos') return aksosNode;
    return nodes.find(n => n.id === id);
  };

  return (
    <motion.div
      className="growing-network"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: tokens.animation.duration.slow }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" style={{ width: '100%', height: '400px' }}>
        
        {/* AKSOS central node with pulsing */}
        <motion.g
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: tokens.animation.duration.normal }}
          animate={isHovered ? { scale: [1, 1.1, 1] } : {}}
          transition={isHovered ? { duration: 2, repeat: Infinity, ease: 'easeInOut' } : {}}
        >
          <circle cx={aksosNode.x} cy={aksosNode.y} r={4} fill="none" stroke={tokens.color.signal} strokeWidth="0.5" />
          <text x={aksosNode.x} y={aksosNode.y} textAnchor="middle" dy="15" fontSize="8" fontFamily={tokens.font.mono} fill={tokens.color.signal} letterSpacing="0.15em">{aksosNode.label}</text>
        </motion.g>

        {/* Peripheral nodes */}
        {nodes.map((node) => (
          <motion.g
            key={`node-${node.id}`}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: tokens.animation.duration.normal, delay: node.delay }}
            animate={isHovered ? { scale: [1, 1.1, 1], opacity: [1, 0.8, 1] } : {}}
            transition={isHovered ? { duration: 2, repeat: Infinity, ease: 'easeInOut', delay: node.delay } : {}}
          >
            <circle cx={node.x} cy={node.y} r={2} fill={tokens.color.ink} stroke={tokens.color.line} strokeWidth="0.3" />
            <text x={node.x} y={node.y} textAnchor="middle" dy="12" fontSize="6" fontFamily={tokens.font.mono} fill={tokens.color.ink} letterSpacing="0.1em">{node.label}</text>
          </motion.g>
        ))}

        {/* Relationship lines with pulsing opacity */}
        {relationships.map((rel, index) => {
          const fromNode = getNode(rel.from);
          const toNode = getNode(rel.to);
          if (!fromNode || !toNode) return null;

          return (
            <motion.line
              key={`rel-${rel.from}-${rel.to}`}
              x1={fromNode.x} y1={fromNode.y} x2={toNode.x} y2={toNode.y}
              stroke={tokens.color.line}
              strokeWidth="0.2"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.5 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{
                duration: tokens.animation.duration.normal,
                delay: 0.5 + (index * 0.05)
              }}
              animate={isHovered ? { opacity: [0.5, 1, 0.5], strokeWidth: [0.2, 0.4, 0.2] } : {}}
              transition={isHovered ? { duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: index * 0.1 } : {}}
            />
          );
        })}

        {/* Value statement at bottom */}
        <motion.g
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: tokens.animation.duration.normal, delay: 0.8 }}
          animate={isHovered ? { fill: tokens.color.signal } : {}}
        >
          <text x={50} y={90} textAnchor="middle" fontSize="7" fontFamily={tokens.font.mono} fill={isHovered ? tokens.color.signal : tokens.color.muted} letterSpacing="0.1em">NETWORK VALUE INCREASES</text>
          <text x={50} y={97} textAnchor="middle" fontSize="7" fontFamily={tokens.font.mono} fill={isHovered ? tokens.color.signal : tokens.color.muted} letterSpacing="0.1em">WITH RELATIONSHIPS</text>
        </motion.g>

        {/* Hover indicator */}
        {isHovered && (
          <motion.text
            x={50} y={80} textAnchor="middle"
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
