'use client';

import { motion } from 'framer-motion';
import { tokens } from '@/lib/tokens';

interface FlowStepProps {
  x: number;
  y: number;
  label: string;
  number: number;
  isActive?: boolean;
  onActivate?: () => void;
  delay?: number;
}

export function FlowStep({
  x,
  y,
  label,
  number,
  isActive = false,
  onActivate,
  delay = 0,
}: FlowStepProps) {
  return (
    <motion.g
      initial={{ opacity: 1, y: 20 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onTap={onActivate}
      style={{ cursor: onActivate ? 'pointer' : 'default' }}
    >
      {/* Step number */}
      <motion.text
        x={x}
        y={y}
        textAnchor="middle"
        fontSize="3"
        fontFamily={tokens.font.mono}
        fill={isActive ? tokens.color.signal : tokens.color.muted}
        letterSpacing="0.05em"
      >
        {number < 10 ? `0${number}` : number}
      </motion.text>
      
      {/* Step label */}
      <motion.text
        x={x}
        y={y + 8}
        textAnchor="middle"
        fontSize="3"
        fontFamily={tokens.font.sans}
        fill={tokens.color.ink}
        initial={{ opacity: 0, y: 5 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: delay + 0.1 }}
      >
        {label}
      </motion.text>
    </motion.g>
  );
}
