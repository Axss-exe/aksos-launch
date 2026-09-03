'use client';

import { motion } from 'framer-motion';
import { tokens } from '@/lib/design-tokens';

// Text-based convergence diagram matching aksos.net aesthetic
// Fragments converging into AKSOS, then flowing to outputs

export function ConvergenceDiagram() {
  const fragments = [
    'PEOPLE',
    'INSTITUTIONS',
    'RESEARCHERS',
    'ORGANIZATIONS',
    'EVIDENCE',
    'DATA',
    'LOCAL KNOWLEDGE',
  ];

  const outputs = [
    'CONTEXT',
    'RELATIONSHIPS',
    'INTELLIGENCE',
  ];

  return (
    <motion.div 
      className="pipeline-diagram"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: tokens.animation.duration.slow }}
    >
      {/* Convergence flow */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Input fragments */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: tokens.animation.duration.normal }}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '20px',
            justifyContent: 'flex-start',
          }}
        >
          {fragments.map((fragment, index) => (
            <span 
              key={fragment}
              className="pipeline-stage"
              style={{
                fontSize: '11px',
                fontFamily: tokens.font.mono,
                letterSpacing: '0.1em',
                color: tokens.color.ink,
              }}
            >
              {fragment}
            </span>
          ))}
        </motion.div>

        {/* AKSOS center */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: tokens.animation.duration.normal, delay: 0.1 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '20px',
          }}
        >
          <span 
            className="pipeline-stage"
            style={{
              fontSize: '12px',
              fontFamily: tokens.font.mono,
              letterSpacing: '0.15em',
              color: tokens.color.ink,
              borderBottom: `2px solid ${tokens.color.signal}`,
              paddingBottom: '6px',
              minWidth: '80px',
            }}
          >
            AKSOS
          </span>
        </motion.div>

        {/* Outputs */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: tokens.animation.duration.normal, delay: 0.2 }}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '20px',
            justifyContent: 'flex-end',
          }}
        >
          {outputs.map((output, index) => (
            <span 
              key={output}
              className="pipeline-stage"
              style={{
                fontSize: '11px',
                fontFamily: tokens.font.mono,
                letterSpacing: '0.1em',
                color: tokens.color.ink,
              }}
            >
              {output}
            </span>
          ))}
        </motion.div>

        {/* Final output */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: tokens.animation.duration.normal, delay: 0.3 }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '10px',
          }}
        >
          <span 
            style={{
              fontSize: '10px',
              fontFamily: tokens.font.mono,
              letterSpacing: '0.1em',
              color: tokens.color.muted,
              border: `1px solid ${tokens.color.line}`,
              padding: '15px 30px',
            }}
          >
            ONE COHERENT PICTURE
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}
