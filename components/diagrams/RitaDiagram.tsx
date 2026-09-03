'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { tokens } from '@/lib/design-tokens';

// Radial Investigation diagram for Section 06A - RITA in Action
// Shows event at center with evidence, entities, relationships orbiting

export function RitaDiagram() {
  const [isHovered, setIsHovered] = useState(false);
  const [highlightedLayer, setHighlightedLayer] = useState<number | null>(null);

  const center = { x: 50, y: 50 };
  
  // Investigation layers
  const layers = [
    { r: 15, label: 'SOURCE', color: tokens.color.line, delay: 0.1, layerIndex: 0 },
    { r: 28, label: 'EVENT', color: tokens.color.line, delay: 0.2, layerIndex: 1 },
    { r: 41, label: 'ENTITY', color: tokens.color.line, delay: 0.3, layerIndex: 2 },
    { r: 54, label: 'RELATIONSHIP', color: tokens.color.line, delay: 0.4, layerIndex: 3 },
    { r: 67, label: 'CONTEXT', color: tokens.color.line, delay: 0.5, layerIndex: 4 },
  ];

  // Final output
  const finalOutput = {
    label: 'STORY',
    sublabel: 'INTELLIGENCE',
    r: 80,
    delay: 0.6
  };

  const getPosition = (r: number, angle: number) => ({
    x: center.x + r * Math.cos((angle - 90) * Math.PI / 180),
    y: center.y + r * Math.sin((angle - 90) * Math.PI / 180)
  });

  // Nodes for each layer
  const nodesByLayer = [
    [{ label: 'DOCUMENT', angle: 0 }, { label: 'REPORT', angle: 180 }],
    [{ label: 'INCIDENT', angle: 0 }, { label: 'ANNOUNCEMENT', angle: 120 }, { label: 'DECISION', angle: 240 }],
    [{ label: 'PERSON', angle: 0 }, { label: 'ORGANIZATION', angle: 90 }, { label: 'INSTITUTION', angle: 180 }, { label: 'COMPANY', angle: 270 }],
    [{ label: 'CONNECTS', angle: 0 }, { label: 'INFLUENCES', angle: 120 }, { label: 'OWNS', angle: 240 }],
    [{ label: 'BACKGROUND', angle: 0 }, { label: 'HISTORY', angle: 180 }],
  ];

  return (
    <motion.div
      className="rita-diagram"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: tokens.animation.duration.slow }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => {
        setIsHovered(false);
        setHighlightedLayer(null);
      }}
    >
      <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" style={{ width: '100%', height: '400px' }}>
        
        {/* Center - RITA */}
        <motion.g
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: tokens.animation.duration.normal }}
          animate={isHovered ? { scale: [1, 1.05, 1] } : {}}
          transition={isHovered ? { duration: 2, repeat: Infinity, ease: 'easeInOut' } : {}}
        >
          <circle cx={center.x} cy={center.y} r={5} fill="none" stroke={tokens.color.signal} strokeWidth="0.5" />
          <text x={center.x} y={center.y} textAnchor="middle" dy="-2" fontSize="8" fontFamily={tokens.font.mono} fill={tokens.color.signal} letterSpacing="0.15em">RITA</text>
        </motion.g>

        {/* Concentric circles */}
        {layers.map((layer, index) => {
          const isHighlighted = highlightedLayer === layer.layerIndex || isHovered;
          return (
            <motion.circle
              key={`layer-${index}`}
              cx={center.x}
              cy={center.y}
              r={layer.r}
              fill="none"
              stroke={isHighlighted ? tokens.color.signal : layer.color}
              strokeWidth={isHighlighted ? 0.5 : 0.3}
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: tokens.animation.duration.normal, delay: layer.delay }}
              animate={isHovered ? { strokeWidth: [0.3, 0.5, 0.3] } : {}}
              transition={isHovered ? { duration: 2, repeat: Infinity, ease: 'easeInOut', delay: index * 0.1 } : {}}
              onHoverStart={() => setHighlightedLayer(layer.layerIndex)}
              onHoverEnd={() => setHighlightedLayer(null)}
            />
          );
        })}

        {/* Nodes on layers */}
        {layers.map((layer, layerIndex) => {
          const nodes = nodesByLayer[layerIndex];
          return nodes.map((node, nodeIndex) => {
            const pos = getPosition(layer.r, node.angle);
            const isHighlighted = highlightedLayer === layer.layerIndex || isHovered;
            return (
              <motion.g
                key={`node-${layerIndex}-${nodeIndex}`}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: tokens.animation.duration.normal, delay: layer.delay + 0.1 + (nodeIndex * 0.03) }}
                whileHover={{ scale: 1.2 }}
                animate={isHovered ? { scale: [1, 1.1, 1], opacity: [1, 0.8, 1] } : {}}
                transition={isHovered ? { duration: 2, repeat: Infinity, ease: 'easeInOut', delay: layer.delay } : {}}
              >
                <circle cx={pos.x} cy={pos.y} r={1.5} fill={tokens.color.ink} stroke={isHighlighted ? tokens.color.signal : tokens.color.line} strokeWidth={isHighlighted ? 0.5 : 0.2} />
                <line x1={center.x} y1={center.y} x2={pos.x} y2={pos.y} stroke={isHighlighted ? tokens.color.signal : tokens.color.line} strokeWidth={isHighlighted ? 0.3 : 0.15} strokeDasharray="1,1" />
                <text x={pos.x} y={pos.y} textAnchor="middle" dy={node.label.length > 8 ? '12' : '10'} fontSize="4.5" fontFamily={tokens.font.mono} fill={tokens.color.muted} letterSpacing="0.05em">{node.label}</text>
              </motion.g>
            );
          });
        })}

        {/* Layer labels */}
        {layers.map((layer, index) => {
          const labelAngle = index * 72 + 36;
          const labelPos = getPosition(layer.r + 3, labelAngle);
          const isHighlighted = highlightedLayer === layer.layerIndex || isHovered;
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
              transition={{ duration: tokens.animation.duration.normal, delay: layer.delay + 0.2 }}
              onHoverStart={() => setHighlightedLayer(layer.layerIndex)}
              onHoverEnd={() => setHighlightedLayer(null)}
            >
              {layer.label}
            </motion.text>
          );
        })}

        {/* Final output circle */}
        <motion.circle
          cx={center.x}
          cy={center.y}
          r={finalOutput.r}
          fill="none"
          stroke={highlightedLayer === 4 || isHovered ? tokens.color.signal : tokens.color.line}
          strokeWidth={highlightedLayer === 4 || isHovered ? 0.5 : 0.3}
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: tokens.animation.duration.normal, delay: finalOutput.delay }}
          animate={isHovered ? { strokeWidth: [0.3, 0.5, 0.3] } : {}}
          transition={isHovered ? { duration: 2, repeat: Infinity, ease: 'easeInOut' } : {}}
          onHoverStart={() => setHighlightedLayer(4)}
          onHoverEnd={() => setHighlightedLayer(null)}
        />

        {/* Final output text */}
        <motion.g
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: tokens.animation.duration.normal, delay: finalOutput.delay + 0.2 }}
        >
          <text x={center.x} y={90} textAnchor="middle" fontSize="6" fontFamily={tokens.font.mono} fill={highlightedLayer === 4 || isHovered ? tokens.color.signal : tokens.color.muted} letterSpacing="0.1em">{finalOutput.label}</text>
          <text x={center.x} y={96} textAnchor="middle" fontSize="6" fontFamily={tokens.font.mono} fill={highlightedLayer === 4 || isHovered ? tokens.color.signal : tokens.color.muted} letterSpacing="0.1em">{finalOutput.sublabel}</text>
        </motion.g>

        {/* Arrow indicators */}
        {layers.map((layer, index) => {
          if (index === layers.length - 1) return null;
          const fromPos = getPosition(layer.r, 0);
          const toPos = getPosition(layers[index + 1].r, 0);
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
              transition={{ duration: tokens.animation.duration.normal, delay: layer.delay + 0.15 }}
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
            x={center.x} y={85} textAnchor="middle"
            fontSize="4" fontFamily={tokens.font.mono} fill={tokens.color.muted}
            letterSpacing="0.1em"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            HOVER TO SEE INVESTIGATION
          </motion.text>
        )}
      </svg>
    </motion.div>
  );
}
