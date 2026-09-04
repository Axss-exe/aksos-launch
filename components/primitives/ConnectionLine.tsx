'use client';

import { motion } from 'framer-motion';
import { tokens } from '@/lib/tokens';

interface ConnectionLineProps {
  from: { x: number; y: number };
  to: { x: number; y: number };
  type: 'direct' | 'contextual' | 'active' | 'animated';
  curved?: boolean;
  controlPoint?: { x: number; y: number };
  delay?: number;
}

export function ConnectionLine({
  from,
  to,
  type,
  curved = false,
  controlPoint,
  delay = 0,
}: ConnectionLineProps) {
  const strokes = {
    direct: tokens.color.ink,
    contextual: tokens.color.line,
    active: tokens.color.signal,
    animated: tokens.color.signal,
  };

  const widths = {
    direct: 0.5,
    contextual: 0.25,
    active: 0.75,
    animated: 0.5,
  };

  const dashArrays = {
    direct: '0',
    contextual: '2,2',
    active: '0',
    animated: '0',
  };

  // Generate path for curved line
  const getPath = () => {
    if (curved && controlPoint) {
      return `M${from.x} ${from.y} Q${controlPoint.x} ${controlPoint.y} ${to.x} ${to.y}`;
    }
    return `M${from.x} ${from.y} L${to.x} ${to.y}`;
  };

  return (
    <motion.path
      d={getPath()}
      fill="none"
      stroke={strokes[type]}
      strokeWidth={widths[type]}
      strokeDasharray={dashArrays[type]}
      initial={{ 
        pathLength: 0, 
        opacity: 1 
      }}
      whileInView={{ 
        pathLength: 1, 
        opacity: 1 
      }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
        ease: 'easeInOut',
        delay,
      }}
    />
  );
}
