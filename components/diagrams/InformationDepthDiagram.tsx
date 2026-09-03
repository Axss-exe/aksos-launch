'use client';

import { motion } from 'framer-motion';
import { tokens } from '@/lib/design-tokens';

// Information depth layers
const layers = [
  {
    id: 1,
    name: 'PUBLIC WEB',
    description: 'Easy to find.\nSearch engines, websites, reports, announcements, public datasets.',
    level: 'lots of information\neasy to discover',
    yPosition: 10,
    width: 80,
    opacity: 1,
    delay: 0.1
  },
  {
    id: 2,
    name: 'CONTEXT',
    description: 'Harder to find.\nConnections between documents, organizations, events and decisions.',
    level: 'fewer signals\nmore interpretation',
    yPosition: 25,
    width: 70,
    opacity: 0.9,
    delay: 0.2
  },
  {
    id: 3,
    name: 'PEOPLE',
    description: 'Information that exists in people but isn\'t necessarily published online.',
    level: 'limited visibility\nrelationship required',
    yPosition: 40,
    width: 60,
    opacity: 0.7,
    delay: 0.3
  },
  {
    id: 4,
    name: 'INSTITUTIONS',
    description: 'Internal knowledge, relationships, operational context and institutional memory.',
    level: 'difficult access\ninstitutional knowledge',
    yPosition: 55,
    width: 50,
    opacity: 0.5,
    delay: 0.4
  },
  {
    id: 5,
    name: 'FIRST-SOURCE KNOWLEDGE',
    description: 'The deepest level.\nDirect conversations, primary evidence, direct access and trusted relationships.',
    level: 'deepest intelligence\nhardest to reach',
    yPosition: 70,
    width: 40,
    opacity: 0.3,
    delay: 0.5
  }
];

export function InformationDepthDiagram() {
  return (
    <motion.div 
      className="information-depth-diagram"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: tokens.animation.duration.slow }}
    >
      <svg 
        viewBox="0 0 100 100" 
        preserveAspectRatio="xMidYMid meet"
        className="depth-diagram-svg"
      >
        {/* Central vertical line */}
        <motion.line
          x1={50}
          y1={0}
          x2={50}
          y2={100}
          stroke={tokens.color.line}
          strokeWidth="0.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ 
            duration: tokens.animation.duration.slow,
            ease: tokens.animation.easing.easeInOut 
          }}
        />

        {/* Depth indicator arrows */}
        <motion.text
          x={50}
          y={5}
          textAnchor="middle"
          fontSize="6"
          fontFamily={tokens.font.mono}
          fill={tokens.color.muted}
          letterSpacing="0.1em"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          DEPTH
        </motion.text>

        <motion.text
          x={50}
          y={95}
          textAnchor="middle"
          fontSize="6"
          fontFamily={tokens.font.mono}
          fill={tokens.color.muted}
          letterSpacing="0.1em"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          INCREASING
        </motion.text>

        {/* Layers */}
        {layers.map((layer) => (
          <motion.g
            key={`layer-${layer.id}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ 
              duration: tokens.animation.duration.normal,
              delay: layer.delay 
            }}
          >
            {/* Layer rectangle */}
            <rect
              x={50 - layer.width / 2}
              y={layer.yPosition}
              width={layer.width}
              height={8}
              fill="none"
              stroke={tokens.color.line}
              strokeWidth="0.3"
              opacity={layer.opacity}
            />

            {/* Layer name */}
            <text
              x={50}
              y={layer.yPosition - 3}
              textAnchor="middle"
              fontSize="8"
              fontFamily={tokens.font.mono}
              fill={tokens.color.ink}
              letterSpacing="0.1em"
            >
              {layer.name}
            </text>

            {/* Level description */}
            <text
              x={50}
              y={layer.yPosition + 18}
              textAnchor="middle"
              fontSize="6"
              fontFamily={tokens.font.mono}
              fill={tokens.color.muted}
              letterSpacing="0.05em"
              textAnchor="middle"
            >
              {layer.level}
            </text>

            {/* Connecting lines to central axis */}
            <line
              x1={50}
              y1={layer.yPosition + 4}
              x2={50 - layer.width / 2}
              y2={layer.yPosition + 4}
              stroke={tokens.color.line}
              strokeWidth="0.2"
              opacity={layer.opacity}
            />
            <line
              x1={50}
              y1={layer.yPosition + 4}
              x2={50 + layer.width / 2}
              y2={layer.yPosition + 4}
              stroke={tokens.color.line}
              strokeWidth="0.2"
              opacity={layer.opacity}
            />
          </motion.g>
        ))}

        {/* Information availability indicator */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <text
            x={10}
            y={15}
            textAnchor="start"
            fontSize="5"
            fontFamily={tokens.font.mono}
            fill={tokens.color.muted}
            letterSpacing="0.05em"
          >
            MORE
          </text>
          <text
            x={10}
            y={20}
            textAnchor="start"
            fontSize="5"
            fontFamily={tokens.font.mono}
            fill={tokens.color.muted}
            letterSpacing="0.05em"
          >
            INFORMATION
          </text>
          <line
            x1={15}
            y1={17}
            x2={25}
            y2={17}
            stroke={tokens.color.line}
            strokeWidth="0.2"
          />
          <text
            x={90}
            y={75}
            textAnchor="end"
            fontSize="5"
            fontFamily={tokens.font.mono}
            fill={tokens.color.muted}
            letterSpacing="0.05em"
          >
            LESS
          </text>
          <text
            x={90}
            y={80}
            textAnchor="end"
            fontSize="5"
            fontFamily={tokens.font.mono}
            fill={tokens.color.muted}
            letterSpacing="0.05em"
          >
            INFORMATION
          </text>
        </motion.g>

        {/* Access difficulty indicator */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <text
            x={10}
            y={85}
            textAnchor="start"
            fontSize="5"
            fontFamily={tokens.font.mono}
            fill={tokens.color.muted}
            letterSpacing="0.05em"
          >
            EASY
          </text>
          <text
            x={10}
            y={90}
            textAnchor="start"
            fontSize="5"
            fontFamily={tokens.font.mono}
            fill={tokens.color.muted}
            letterSpacing="0.05em"
          >
            ACCESS
          </text>
          <line
            x1={15}
            y1={87}
            x2={25}
            y2={87}
            stroke={tokens.color.line}
            strokeWidth="0.2"
          />
          <text
            x={90}
            y={25}
            textAnchor="end"
            fontSize="5"
            fontFamily={tokens.font.mono}
            fill={tokens.color.muted}
            letterSpacing="0.05em"
          >
            DIFFICULT
          </text>
          <text
            x={90}
            y={30}
            textAnchor="end"
            fontSize="5"
            fontFamily={tokens.font.mono}
            fill={tokens.color.muted}
            letterSpacing="0.05em"
          >
            ACCESS
          </text>
        </motion.g>
      </svg>
    </motion.div>
  );
}
