'use client';

import { motion } from 'framer-motion';
import { tokens } from '@/lib/design-tokens';

// Network node categories
const categories = [
  { id: 'aksos', label: 'AKSOS', type: 'center', color: tokens.color.signal },
  { id: 'builders', label: 'BUILDERS', type: 'node', color: tokens.color.ink },
  { id: 'researchers', label: 'RESEARCHERS', type: 'node', color: tokens.color.ink },
  { id: 'experts', label: 'EXPERTS', type: 'node', color: tokens.color.ink },
  { id: 'information', label: 'INFORMATION HOLDERS', type: 'node', color: tokens.color.ink },
  { id: 'institutions', label: 'INSTITUTIONS', type: 'node', color: tokens.color.ink },
  { id: 'partners', label: 'PARTNERS', type: 'node', color: tokens.color.ink },
];

// Initial network configuration
const initialNodes = [
  { id: 'aksos', x: 50, y: 50, category: 'aksos' },
  { id: 'node1', x: 30, y: 30, category: 'builders' },
  { id: 'node2', x: 70, y: 30, category: 'researchers' },
  { id: 'node3', x: 30, y: 70, category: 'experts' },
  { id: 'node4', x: 70, y: 70, category: 'information' },
];

// Additional nodes to be added
const additionalNodes = [
  { id: 'node5', x: 20, y: 20, category: 'institutions' },
  { id: 'node6', x: 80, y: 20, category: 'partners' },
  { id: 'node7', x: 15, y: 50, category: 'builders' },
  { id: 'node8', x: 85, y: 50, category: 'researchers' },
  { id: 'node9', x: 20, y: 80, category: 'experts' },
  { id: 'node10', x: 80, y: 80, category: 'information' },
  { id: 'node11', x: 40, y: 15, category: 'institutions' },
  { id: 'node12', x: 60, y: 15, category: 'partners' },
  { id: 'node13', x: 40, y: 85, category: 'builders' },
  { id: 'node14', x: 60, y: 85, category: 'researchers' },
];

// Relationships between nodes
const relationships = [
  { from: 'aksos', to: 'node1' },
  { from: 'aksos', to: 'node2' },
  { from: 'aksos', to: 'node3' },
  { from: 'aksos', to: 'node4' },
  { from: 'node1', to: 'node2' },
  { from: 'node3', to: 'node4' },
  { from: 'node1', to: 'node3' },
  { from: 'node2', to: 'node4' },
];

// Additional relationships for new nodes
const additionalRelationships = [
  { from: 'node5', to: 'node6' },
  { from: 'node7', to: 'node8' },
  { from: 'node9', to: 'node10' },
  { from: 'node11', to: 'node12' },
  { from: 'node13', to: 'node14' },
  { from: 'aksos', to: 'node5' },
  { from: 'aksos', to: 'node6' },
  { from: 'aksos', to: 'node7' },
  { from: 'aksos', to: 'node8' },
  { from: 'aksos', to: 'node9' },
  { from: 'aksos', to: 'node10' },
  { from: 'aksos', to: 'node11' },
  { from: 'aksos', to: 'node12' },
  { from: 'aksos', to: 'node13' },
  { from: 'aksos', to: 'node14' },
  { from: 'node1', to: 'node5' },
  { from: 'node2', to: 'node6' },
  { from: 'node3', to: 'node9' },
  { from: 'node4', to: 'node10' },
  { from: 'node5', to: 'node7' },
  { from: 'node6', to: 'node8' },
  { from: 'node9', to: 'node13' },
  { from: 'node10', to: 'node14' },
];

const getCategoryById = (id: string) => {
  if (id === 'aksos') return categories[0];
  const index = Math.floor(Math.random() * (categories.length - 1)) + 1;
  return categories[index];
};

export function GrowingNetwork() {
  const allNodes = [...initialNodes, ...additionalNodes];
  const allRelationships = [...relationships, ...additionalRelationships];

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
        className="network-diagram-svg"
      >
        {/* Initial nodes */}
        {initialNodes.map((node, index) => {
          const category = getCategoryById(node.category);
          return (
            <motion.g
              key={`node-${node.id}`}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: tokens.animation.duration.normal,
                delay: 0.1 + (index * 0.1) 
              }}
            >
              <circle 
                cx={node.x} 
                cy={node.y} 
                r={node.category === 'aksos' ? 4 : 2.5} 
                fill={category.color}
                stroke={node.category === 'aksos' ? 'none' : tokens.color.line}
                strokeWidth="0.3"
              />
              {node.category === 'aksos' && (
                <text
                  x={node.x}
                  y={node.y}
                  textAnchor="middle"
                  dy="12"
                  fontSize="8"
                  fontFamily={tokens.font.mono}
                  fill={category.color}
                  letterSpacing="0.1em"
                >
                  {category.label}
                </text>
              )}
            </motion.g>
          );
        })}

        {/* Initial relationships */}
        {relationships.map((rel, index) => {
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
                delay: 0.3 + (index * 0.05) 
              }}
            />
          );
        })}

        {/* Additional nodes with staggered animation */}
        {additionalNodes.map((node, index) => {
          const category = getCategoryById(node.category);
          return (
            <motion.g
              key={`node-${node.id}`}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: tokens.animation.duration.normal,
                delay: 0.6 + (index * 0.1) 
              }}
            >
              <circle 
                cx={node.x} 
                cy={node.y} 
                r={2} 
                fill={tokens.color.ink}
                stroke={tokens.color.line}
                strokeWidth="0.2"
              />
              {/* Only show labels for some nodes to avoid clutter */}
              {index % 3 === 0 && (
                <text
                  x={node.x}
                  y={node.y}
                  textAnchor="middle"
                  dy="10"
                  fontSize="5"
                  fontFamily={tokens.font.mono}
                  fill={tokens.color.muted}
                  letterSpacing="0.05em"
                >
                  {category.label}
                </text>
              )}
            </motion.g>
          );
        })}

        {/* Additional relationships with staggered animation */}
        {additionalRelationships.map((rel, index) => {
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
                delay: 0.8 + (index * 0.03) 
              }}
            />
          );
        })}

        {/* Network density indicator */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <text
            x={50}
            y={95}
            textAnchor="middle"
            fontSize="5"
            fontFamily={tokens.font.mono}
            fill={tokens.color.muted}
            letterSpacing="0.05em"
          >
            NETWORK VALUE INCREASES WITH RELATIONSHIPS
          </text>
        </motion.g>
      </svg>
    </motion.div>
  );
}
