'use client';

import { motion } from 'framer-motion';
import { tokens } from '@/lib/design-tokens';

// Text-based hero network matching aksos.net aesthetic
// Simple horizontal layout of node types

export function HeroNetwork() {
  const nodes = [
    'AKSOS',
    'GOVERNMENT',
    'COMPANY',
    'INSTITUTION',
    'RESEARCHER',
    'MARKET',
    'PERSON',
    'INFORMATION',
  ];

  return (
    <motion.div 
      className="hero-network"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: tokens.animation.duration.slow, delay: 0.2, ease: tokens.animation.easing.easeOut }}
    >
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '15px',
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}>
        {nodes.map((node, index) => {
          const delay = 0.3 + (index * 0.05);
          const isAksos = node === 'AKSOS';
          
          return (
            <motion.span
              key={node}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: tokens.animation.duration.normal, delay }}
              style={{
                fontSize: isAksos ? '12px' : '10px',
                fontFamily: tokens.font.mono,
                letterSpacing: '0.1em',
                color: isAksos ? tokens.color.signal : tokens.color.ink,
                borderBottom: isAksos ? `2px solid ${tokens.color.signal}` : `1px solid ${tokens.color.line}`,
                paddingBottom: isAksos ? '6px' : '8px',
              }}
            >
              {node}
            </motion.span>
          );
        })}
      </div>
    </motion.div>
  );
}
