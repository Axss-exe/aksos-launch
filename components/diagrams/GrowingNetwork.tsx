'use client';

import { motion } from 'framer-motion';
import { tokens } from '@/lib/design-tokens';

// Text-based growing network diagram matching aksos.net aesthetic
// Shows how network value increases with relationships

export function GrowingNetwork() {
  const elements = [
    'AKSOS',
    'BUILDERS',
    'INFORMATION HOLDERS',
    'BUILDERS',
    'INFORMATION HOLDERS',
  ];

  return (
    <motion.div 
      className="pipeline-diagram"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: tokens.animation.duration.slow }}
    >
      {/* Network elements */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center', marginBottom: '30px' }}>
        {elements.map((element, index) => {
          const delay = 0.1 + (index * 0.08);
          const isAksos = element === 'AKSOS';
          
          return (
            <motion.span
              key={`${element}-${index}`}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: tokens.animation.duration.normal, delay }}
              style={{
                fontSize: isAksos ? '12px' : '11px',
                fontFamily: tokens.font.mono,
                letterSpacing: '0.1em',
                color: isAksos ? tokens.color.signal : tokens.color.ink,
                borderBottom: isAksos ? `2px solid ${tokens.color.signal}` : `1px solid ${tokens.color.line}`,
                paddingBottom: isAksos ? '6px' : '8px',
              }}
            >
              {element}
            </motion.span>
          );
        })}
      </div>

      {/* Value statement */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: tokens.animation.duration.normal, delay: 0.5 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '20px',
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
          NETWORK VALUE
        </span>
        <span 
          style={{
            fontSize: '10px',
            fontFamily: tokens.font.mono,
            letterSpacing: '0.1em',
            color: tokens.color.muted,
          }}
        >
          INCREASES WITH
        </span>
        <span 
          style={{
            fontSize: '10px',
            fontFamily: tokens.font.mono,
            letterSpacing: '0.1em',
            color: tokens.color.ink,
          }}
        >
          RELATIONSHIPS
        </span>
      </motion.div>
    </motion.div>
  );
}
