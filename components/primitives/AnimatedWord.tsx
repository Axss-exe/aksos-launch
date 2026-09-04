'use client';

import { motion } from 'framer-motion';

interface AnimatedWordProps {
  word: string;
  isActive?: boolean;
  delay?: number;
  className?: string;
}

export function AnimatedWord({
  word,
  isActive = false,
  delay = 0,
  className = '',
}: AnimatedWordProps) {
  return (
    <motion.span
      className={className}
      initial={{ opacity: 1, y: 20 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      style={{
        display: 'inline-block',
        color: isActive ? 'var(--color-signal)' : 'inherit',
      }}
      whileHover={{ color: 'var(--color-signal)' }}
    >
      {word}
    </motion.span>
  );
}
