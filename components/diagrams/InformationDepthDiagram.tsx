'use client';

import { motion } from 'framer-motion';
import { tokens } from '@/lib/design-tokens';

// Text-based diagram matching aksos.net aesthetic
// DEPTH INCREASING with layers from PUBLIC WEB to FIRST-SOURCE KNOWLEDGE

export function InformationDepthDiagram() {
  const layers = [
    { label: 'PUBLIC WEB', desc: 'lots of information easy to discover', access: 'EASY ACCESS' },
    { label: 'CONTEXT', desc: 'fewer signals more interpretation', access: 'EASY ACCESS' },
    { label: 'PEOPLE', desc: 'limited visibility relationship required', access: 'DIFFICULT ACCESS' },
    { label: 'INSTITUTIONS', desc: 'difficult access institutional knowledge', access: 'DIFFICULT ACCESS' },
    { label: 'FIRST-SOURCE KNOWLEDGE', desc: 'deepest intelligence hardest to reach', access: 'DIFFICULT ACCESS' },
  ];

  return (
    <motion.div 
      className="pipeline-diagram"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: tokens.animation.duration.slow }}
    >
      {/* Depth indicator */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: tokens.animation.duration.normal }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
          marginBottom: '40px',
          fontFamily: tokens.font.mono,
          fontSize: '10px',
          letterSpacing: '0.1em',
          color: tokens.color.muted,
        }}
      >
        <span>DEPTH</span>
        <span style={{ fontSize: '8px', letterSpacing: '0.2em' }}>INCREASING</span>
        <span style={{ marginLeft: 'auto' }}>MORE INFORMATION</span>
        <span style={{ marginLeft: '20px' }}>LESS INFORMATION</span>
      </motion.div>

      {/* Layers */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {layers.map((layer, index) => {
          const delay = 0.1 + (index * 0.05);
          const opacity = 1 - (index * 0.15); // Decreasing opacity for deeper layers
          
          return (
            <motion.div
              key={layer.label}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: tokens.animation.duration.normal, delay }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '30px',
                opacity,
              }}
            >
              <span 
                className="pipeline-stage" 
                style={{
                  minWidth: '200px',
                  fontSize: '11px',
                  fontFamily: tokens.font.mono,
                  letterSpacing: '0.1em',
                  color: tokens.color.ink,
                  borderBottom: `1px solid ${tokens.color.line}`,
                  paddingBottom: '8px',
                }}
              >
                {layer.label}
              </span>
              <span 
                style={{
                  fontSize: '11px',
                  fontFamily: tokens.font.mono,
                  color: tokens.color.muted,
                  letterSpacing: '0.05em',
                  flex: 1,
                }}
              >
                {layer.desc}
              </span>
              <span 
                style={{
                  fontSize: '10px',
                  fontFamily: tokens.font.mono,
                  color: tokens.color.muted,
                  letterSpacing: '0.1em',
                  whiteSpace: 'nowrap',
                }}
              >
                {layer.access}
              </span>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
