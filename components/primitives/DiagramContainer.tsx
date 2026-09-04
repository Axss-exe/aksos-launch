'use client';

import { motion, HTMLMotionProps } from 'framer-motion';

interface DiagramContainerProps extends HTMLMotionProps<'div'> {
  aspectRatio?: number;
  viewBox?: string;
  children: React.ReactNode;
}

export function DiagramContainer({
  aspectRatio = 16 / 9,
  viewBox = "0 0 100 100",
  children,
  ...props
}: DiagramContainerProps) {
  return (
    <motion.div
      className="diagram-container"
      style={{
        aspectRatio,
        width: '100%',
        overflow: 'visible',
      }}
      {...props}
    >
      <svg
        viewBox={viewBox}
        preserveAspectRatio="xMidYMid meet"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      >
        {children}
      </svg>
    </motion.div>
  );
}
