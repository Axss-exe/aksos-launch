'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { tokens } from '@/lib/design-tokens';

// Growing Network diagram for Section 10
// Shows AKSOS node growing with relationship types as different line styles

export function GrowingNetwork() {
  const [isHovered, setIsHovered] = useState(false);
  const [highlightedType, setHighlightedType] = useState<string | null>(null);

  const center = { x: 50, y: 40 };

  // Node types with different relationship styles
  const nodeTypes = [
    { 
      type: 'PERSON', 
      nodes: [{ x: 20, y: 20 }, { x: 20, y: 60 }],
      color: tokens.color.ink,
      lineStyle: '0.2',
      delay: 0.1
    },
    { 
      type: 'ORGANIZATION', 
      nodes: [{ x: 80, y: 20 }, { x: 80, y: 60 }],
      color: tokens.color.ink,
      lineStyle: '0.2',
      delay: 0.2
    },
    { 
      type: 'INSTITUTION', 
      nodes: [{ x: 20, y: 80 }, { x: 80, y: 80 }],
      color: tokens.color.ink,
      lineStyle: '0.2',
      delay: 0.3
    },
    { 
      type: 'RESEARCH', 
      nodes: [{ x: 50, y: 20 }],
      color: tokens.color.ink,
      lineStyle: '0.2',
      delay: 0.4
    },
    { 
      type: 'MARKET', 
      nodes: [{ x: 50, y: 80 }],
      color: tokens.color.ink,
      lineStyle: '0.2',
      delay: 0.5
    },
    { 
      type: 'LOCAL', 
      nodes: [{ x: 80, y: 40 }],
      color: tokens.color.ink,
      lineStyle: '0.2',
      delay: 0.6
    },
  ];

  const aksosNode = { label: 'AKSOS', x: center.x, y: center.y, delay: 0.0 };

  // Flatten all nodes for connections
  const allNodes = nodeTypes.flatMap(type => type.nodes.map(n => ({ ...n, type: type.type })));

  return (
    <motion.div
      className="growing-network"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: tokens.animation.duration.slow }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => {
        setIsHovered(false);
        setHighlightedType(null);
      }}
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

        {/* Peripheral nodes by type */}
        {nodeTypes.map((type, typeIndex) => {
          const isHighlighted = highlightedType === type.type || isHovered;
          return type.nodes.map((node, nodeIndex) => (
            <motion.g
              key={`node-${type.type}-${nodeIndex}`}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: tokens.animation.duration.normal, delay: type.delay + (nodeIndex * 0.05) }}
              whileHover={{ scale: 1.15 }}
              onHoverStart={() => setHighlightedType(type.type)}
              onHoverEnd={() => setHighlightedType(null)}
              animate={isHovered ? { scale: [1, 1.1, 1], opacity: [1, 0.8, 1] } : {}}
              transition={isHovered ? { duration: 2, repeat: Infinity, ease: 'easeInOut', delay: type.delay } : {}}
            >
              <circle cx={node.x} cy={node.y} r={2} fill={tokens.color.ink} stroke={isHighlighted ? tokens.color.signal : tokens.color.line} strokeWidth={isHighlighted ? 0.5 : 0.3} />
              <text x={node.x} y={node.y} textAnchor="middle" dy="12" fontSize="5" fontFamily={tokens.font.mono} fill={tokens.color.ink} letterSpacing="0.1em">{type.type}</text>
            </motion.g>
          ));
        })}

        {/* Relationship lines with different styles */}
        {allNodes.map((node, index) => {
          const isHighlighted = highlightedType === node.type || isHovered;
          return (
            <motion.line
              key={`rel-${index}`}
              x1={aksosNode.x} y1={aksosNode.y} x2={node.x} y2={node.y}
              stroke={isHighlighted ? tokens.color.signal : tokens.color.line}
              strokeWidth={isHighlighted ? 0.4 : 0.2}
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.5 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{
                duration: tokens.animation.duration.normal,
                delay: 0.5 + (index * 0.03)
              }}
              animate={isHovered ? { opacity: [0.5, 1, 0.5], strokeWidth: [0.2, 0.4, 0.2] } : {}}
              transition={isHovered ? { duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: index * 0.05 } : {}}
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
          <text x={50} y={90} textAnchor="middle" fontSize="6" fontFamily={tokens.font.mono} fill={isHovered ? tokens.color.signal : tokens.color.muted} letterSpacing="0.1em">NETWORK VALUE INCREASES</text>
          <text x={50} y={96} textAnchor="middle" fontSize="6" fontFamily={tokens.font.mono} fill={isHovered ? tokens.color.signal : tokens.color.muted} letterSpacing="0.1em">WITH RELATIONSHIPS</text>
        </motion.g>

        {/* Hover indicator */}
        {isHovered && (
          <motion.text
            x={50} y={80} textAnchor="middle"
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
