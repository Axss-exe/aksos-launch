'use client';

import { motion } from 'framer-motion';
import { tokens } from '@/lib/tokens';

interface SignalProps {
  x: number;
  y: number;
  label: string;
  category: 'company' | 'policy' | 'capital' | 'project' | 'relationship' | 'event';
  size?: 'sm' | 'md' | 'lg';
  delay?: number;
  onActivate?: () => void;
}

export function Signal({
  x,
  y,
  label,
  category,
  size = 'md',
  delay = 0,
  onActivate,
}: SignalProps) {
  const sizes = { sm: 1.5, md: 2, lg: 2.5 };
  
  const colors = {
    company: tokens.color.ink,
    policy: tokens.color.muted,
    capital: tokens.color.green,
    project: tokens.color.signal,
    relationship: tokens.color.lineStrong,
    event: tokens.color.signalDark,
  };

  return (
    <motion.g
      initial={{ opacity: 1, scale: 0, y: -20 }}
      whileInView={{ scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        ease: 'easeOut',
        delay,
      }}
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
      onTap={onActivate}
      style={{ 
        cursor: onActivate ? 'pointer' : 'default',
        transformOrigin: `${x}px ${y}px` 
      }}
    >
      {/* Signal pulse effect */}
      <motion.circle
        cx={x}
        cy={y}
        r={sizes[size] * 2}
        fill={colors[category]}
        opacity={0.1}
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay }}
      />
      
      {/* Main signal dot */}
      <circle
        cx={x}
        cy={y}
        r={sizes[size]}
        fill={colors[category]}
      />
      
      {/* Label */}
      <motion.text
        x={x}
        y={y + 6}
        textAnchor="middle"
        fontSize={size === 'lg' ? '3' : '2.5'}
        fontFamily={tokens.font.mono}
        fill={tokens.color.muted}
        letterSpacing="0.05em"
        initial={{ opacity: 0, y: 5 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: delay + 0.2 }}
      >
        {label}
      </motion.text>
    </motion.g>
  );
}
