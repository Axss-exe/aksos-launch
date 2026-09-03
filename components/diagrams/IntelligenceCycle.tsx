'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { tokens } from '@/lib/design-tokens';

// Radial Network diagram for Batana (Section 04A)
// Shows AKSOS at center with relationship types as concentric rings

export function IntelligenceCycle() {
  const [isHovered, setIsHovered] = useState(false);
  const [highlightedRing, setHighlightedRing] = useState<number | null>(null);

  const center = { x: 50, y: 50 };
  
  // Concentric rings representing relationship types
  const rings = [
    { r: 15, label: 'QUESTION', color: tokens.color.line, delay: 0.1, ringIndex: 0 },
    { r: 28, label: 'FIND PEOPLE', color: tokens.color.line, delay: 0.2, ringIndex: 1 },
    { r: 41, label: 'CONNECT', color: tokens.color.line, delay: 0.3, ringIndex: 2 },
    { r: 54, label: 'LEARN', color: tokens.color.line, delay: 0.4, ringIndex: 3 },
    { r: 67, label: 'ADD CONTEXT', color: tokens.color.line, delay: 0.5, ringIndex: 4 },
    { r: 80, label: 'DISCOVER NEW QUESTIONS', color: tokens.color.line, delay: 0.6, ringIndex: 5 },
  ];

  // Nodes on each ring
  const nodesByRing = [
    [{ label: 'WHO', angle: 0 }, { label: 'WHAT', angle: 180 }],
    [{ label: 'EXPERTS', angle: 0 }, { label: 'SOURCES', angle: 120 }, { label: 'LEADERS', angle: 240 }],
    [{ label: 'INTRODUCE', angle: 0 }, { label: 'ENGAGE', angle: 180 }],
    [{ label: 'INSIGHTS', angle: 0 }, { label: 'KNOWLEDGE', angle: 180 }],
    [{ label: 'BACKGROUND', angle: 0 }, { label: 'HISTORY', angle: 180 }],
    [{ label: 'PATTERNS', angle: 0 }, { label: 'OPPORTUNITIES', angle: 120 }, { label: 'RISKS', angle: 240 }],
  ];

  const getPosition = (r: number, angle: number) => ({
    x: center.x + r * Math.cos((angle - 90) * Math.PI / 180),
    y: center.y + r * Math.sin((angle - 90) * Math.PI / 180)
  });

  return (
    <motion.div
      className="intelligence-cycle"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: tokens.animation.duration.slow }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => {
        setIsHovered(false);
        setHighlightedRing(null);
      }}
    >
      <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" style={{ width: '100%', height: '400px' }}>
        
        {/* Center label - Relationship Intelligence */}
        <motion.g
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: tokens.animation.duration.normal }}
          animate={isHovered ? { scale: [1, 1.05, 1] } : {}}
          transition={isHovered ? { duration: 2, repeat: Infinity, ease: 'easeInOut' } : {}}
        >
          <text x={center.x} y={center.y} textAnchor="middle" fontSize="7" fontFamily={tokens.font.mono} fill={tokens.color.muted} letterSpacing="0.1em">RELATIONSHIP</text>
          <text x={center.x} y={center.y + 7} textAnchor="middle" fontSize="7" fontFamily={tokens.font.mono} fill={tokens.color.muted} letterSpacing="0.1em">INTELLIGENCE</text>
        </motion.g>

        {/* AKSOS center node */}
        <motion.circle
          cx={center.x}
          cy={center.y}
          r={4}
          fill="none"
          stroke={tokens.color.signal}
          strokeWidth="0.5"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: tokens.animation.duration.normal }}
          animate={isHovered ? { r: [4, 5, 4], strokeWidth: [0.5, 0.7, 0.5] } : {}}
          transition={isHovered ? { duration: 2, repeat: Infinity, ease: 'easeInOut' } : {}}
        />

        {/* Concentric rings */}
        {rings.map((ring, index) => {
          const isHighlighted = highlightedRing === ring.ringIndex || isHovered;
          return (
            <motion.circle
              key={`ring-${index}`}
              cx={center.x}
              cy={center.y}
              r={ring.r}
              fill="none"
              stroke={isHighlighted ? tokens.color.signal : ring.color}
              strokeWidth={isHighlighted ? 0.5 : 0.3}
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: tokens.animation.duration.normal, delay: ring.delay }}
              animate={isHovered ? { strokeWidth: [0.3, 0.5, 0.3] } : {}}
              transition={isHovered ? { duration: 2, repeat: Infinity, ease: 'easeInOut', delay: index * 0.1 } : {}}
              onHoverStart={() => setHighlightedRing(ring.ringIndex)}
              onHoverEnd={() => setHighlightedRing(null)}
            />
          );
        })}

        {/* Nodes on rings */}
        {rings.map((ring, ringIndex) => {
          const nodes = nodesByRing[ringIndex];
          return nodes.map((node, nodeIndex) => {
            const pos = getPosition(ring.r, node.angle);
            const isHighlighted = highlightedRing === ring.ringIndex || isHovered;
            return (
              <motion.g
                key={`node-${ringIndex}-${nodeIndex}`}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: tokens.animation.duration.normal, delay: ring.delay + 0.1 + (nodeIndex * 0.05) }}
                whileHover={{ scale: 1.2 }}
                animate={isHovered ? { scale: [1, 1.1, 1], opacity: [1, 0.8, 1] } : {}}
                transition={isHovered ? { duration: 2, repeat: Infinity, ease: 'easeInOut', delay: ring.delay } : {}}
              >
                <circle cx={pos.x} cy={pos.y} r={1.5} fill={tokens.color.ink} stroke={isHighlighted ? tokens.color.signal : tokens.color.line} strokeWidth={isHighlighted ? 0.5 : 0.2} />
                <line x1={center.x} y1={center.y} x2={pos.x} y2={pos.y} stroke={isHighlighted ? tokens.color.signal : tokens.color.line} strokeWidth={isHighlighted ? 0.3 : 0.15} strokeDasharray="1,1" />
                <text x={pos.x} y={pos.y} textAnchor="middle" dy={node.label.length > 8 ? '12' : '10'} fontSize="4.5" fontFamily={tokens.font.mono} fill={tokens.color.muted} letterSpacing="0.05em">{node.label}</text>
              </motion.g>
            );
          });
        })}

        {/* Ring labels */}
        {rings.map((ring, index) => {
          const labelAngle = index * 60 + 30;
          const labelPos = getPosition(ring.r + 3, labelAngle);
          const isHighlighted = highlightedRing === ring.ringIndex || isHovered;
          return (
            <motion.text
              key={`label-${index}`}
              x={labelPos.x} y={labelPos.y} textAnchor="middle"
              fontSize="5" fontFamily={tokens.font.mono} 
              fill={isHighlighted ? tokens.color.signal : tokens.color.muted} 
              letterSpacing="0.1em"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: tokens.animation.duration.normal, delay: ring.delay + 0.2 }}
              onHoverStart={() => setHighlightedRing(ring.ringIndex)}
              onHoverEnd={() => setHighlightedRing(null)}
            >
              {ring.label}
            </motion.text>
          );
        })}

        {/* Arrow indicators between rings */}
        {rings.map((ring, index) => {
          if (index === rings.length - 1) return null;
          const fromPos = getPosition(ring.r, 0);
          const toPos = getPosition(rings[index + 1].r, 0);
          const midX = (fromPos.x + toPos.x) / 2;
          const midY = (fromPos.y + toPos.y) / 2;
          
          return (
            <motion.text
              key={`arrow-${index}`}
              x={midX}
              y={midY}
              textAnchor="middle"
              fontSize="6"
              fontFamily={tokens.font.mono}
              fill={tokens.color.muted}
              letterSpacing="0.2em"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: tokens.animation.duration.normal, delay: ring.delay + 0.15 }}
              animate={isHovered ? { opacity: [0.5, 1, 0.5], scale: [1, 1.2, 1] } : {}}
              transition={isHovered ? { duration: 1, repeat: Infinity, ease: 'easeInOut' } : {}}
            >
              
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
            HOVER TO SEE CYCLE
          </motion.text>
        )}
      </svg>
    </motion.div>
  );
}
