'use client';

import { motion } from 'framer-motion';
import { tokens } from '@/lib/tokens';

interface NetworkNodeProps {
  x: number;
  y: number;
  label: string;
  category: 'operator' | 'signal' | 'context' | 'system' | 'company' | 'policy' | 'capital' | 'project' | 'relationship';
  role: 'primary' | 'secondary' | 'tertiary';
  size?: 'sm' | 'md' | 'lg';
  onHover?: () => void;
  onTap?: () => void;
}

export function NetworkNode({
  x,
  y,
  label,
  category,
  role,
  size = 'md',
  onHover,
  onTap,
}: NetworkNodeProps) {
  const sizes = { sm: 2, md: 3, lg: 4 };
  
  const colors = {
    operator: tokens.color.signal,
    signal: tokens.color.ink,
    context: tokens.color.muted,
    system: tokens.color.green,
    company: tokens.color.ink,
    policy: tokens.color.muted,
    capital: tokens.color.green,
    project: tokens.color.signal,
    relationship: tokens.color.lineStrong,
  };

  const opacity = {
    primary: 1,
    secondary: 0.8,
    tertiary: 0.6,
  };

  return (
    <motion.g
      initial={{ opacity: 1, scale: 0 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      whileHover={{ scale: 1.15, cursor: 'pointer' }}
      whileTap={{ scale: 0.95 }}
      onHoverStart={onHover}
      onTap={onTap}
      style={{ transformOrigin: `${x}px ${y}px` }}
    >
      {/* Node circle */}
      <circle
        cx={x}
        cy={y}
        r={sizes[size]}
        fill={colors[category]}
        stroke={role === 'primary' ? tokens.color.signalDark : tokens.color.line}
        strokeWidth={role === 'primary' ? 0.5 : 0.25}
        opacity={opacity[role]}
      />
      
      {/* Label */}
      {label && (
        <motion.text
          x={x}
          y={y + 8}
          textAnchor="middle"
          fontSize={size === 'lg' ? '4' : '3'}
          fontFamily={tokens.font.mono}
          fill={tokens.color.muted}
          letterSpacing="0.05em"
          initial={{ opacity: 0, y: 5 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          {label}
        </motion.text>
      )}
    </motion.g>
  );
}
