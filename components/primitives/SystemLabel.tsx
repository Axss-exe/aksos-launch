'use client';

import { motion } from 'framer-motion';
import { tokens } from '@/lib/tokens';

interface SystemLabelProps {
  x: number;
  y: number;
  text: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  size?: 'sm' | 'md' | 'lg';
  delay?: number;
}

export function SystemLabel({
  x,
  y,
  text,
  position = 'bottom',
  size = 'md',
  delay = 0,
}: SystemLabelProps) {
  const sizes = { sm: '2', md: '2.5', lg: '3' };
  
  const offsets = {
    top: { x: 0, y: -6 },
    bottom: { x: 0, y: 6 },
    left: { x: -4, y: 0 },
    right: { x: 4, y: 0 },
  };

  const textAnchor = {
    top: 'middle',
    bottom: 'middle',
    left: 'end',
    right: 'start',
  };

  return (
    <motion.text
      x={x + offsets[position].x}
      y={y + offsets[position].y}
      textAnchor={textAnchor[position]}
      fontSize={sizes[size]}
      fontFamily={tokens.font.mono}
      fill={tokens.color.muted}
      letterSpacing="0.1em"
      initial={{ opacity: 0, y: position === 'top' ? -5 : 5 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay }}
    >
      {text}
    </motion.text>
  );
}
