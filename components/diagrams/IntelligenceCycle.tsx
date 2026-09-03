'use client';

import { motion } from 'framer-motion';
import { tokens } from '@/lib/design-tokens';

// Text-based intelligence cycle diagram matching aksos.net aesthetic
// Circular flow: QUESTION -> FIND PEOPLE -> CONNECT -> LEARN -> ADD CONTEXT -> DISCOVER NEW QUESTIONS

export function IntelligenceCycle() {
  const stages = [
    'QUESTION',
    'FIND PEOPLE',
    'CONNECT',
    'LEARN',
    'ADD CONTEXT',
    'DISCOVER NEW QUESTIONS',
  ];

  return (
    <motion.div 
      className="pipeline-diagram"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: tokens.animation.duration.slow }}
    >
      {/* Center label */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: tokens.animation.duration.normal }}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '40px',
        }}
      >
        <span 
          style={{
            fontSize: '10px',
            fontFamily: tokens.font.mono,
            letterSpacing: '0.1em',
            color: tokens.color.muted,
          }}
        >
          RELATIONSHIP
        </span>
        <span 
          style={{
            fontSize: '10px',
            fontFamily: tokens.font.mono,
            letterSpacing: '0.1em',
            color: tokens.color.muted,
            marginLeft: '20px',
          }}
        >
          INTELLIGENCE
        </span>
      </motion.div>

      {/* Cycle stages */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
        {stages.map((stage, index) => {
          const delay = 0.1 + (index * 0.05);
          
          return (
            <motion.span
              key={stage}
              className="pipeline-stage"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: tokens.animation.duration.normal, delay }}
              style={{
                fontSize: '11px',
                fontFamily: tokens.font.mono,
                letterSpacing: '0.1em',
                color: tokens.color.ink,
              }}
            >
              {stage}
              {index < stages.length - 1 && (
                <span style={{ marginLeft: '15px', color: tokens.color.muted }}>
                  
                </span>
              )}
            </motion.span>
          );
        })}
      </div>

      {/* Repeat first stage to complete cycle */}
      <motion.span
        className="pipeline-stage"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: tokens.animation.duration.normal, delay: 0.1 + (stages.length * 0.05) }}
        style={{
          fontSize: '11px',
          fontFamily: tokens.font.mono,
          letterSpacing: '0.1em',
          color: tokens.color.ink,
          marginLeft: '20px',
        }}
      >
        {stages[0]}
      </motion.span>
    </motion.div>
  );
}
