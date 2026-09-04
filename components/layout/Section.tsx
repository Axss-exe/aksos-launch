'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { tokens } from '@/lib/tokens';

interface SectionProps extends HTMLMotionProps<'section'> {
  label?: string;
  tone?: 'paper' | 'dark' | 'quiet' | 'transparent';
  fullWidth?: boolean;
  children: React.ReactNode;
}

export function Section({
  label,
  tone = 'transparent',
  fullWidth = false,
  children,
  ...props
}: SectionProps) {
  const toneClasses = {
    paper: 'section-paper',
    dark: 'section-dark',
    quiet: 'section-quiet',
    transparent: '',
  };

  return (
    <motion.section
      className={`section ${toneClasses[tone]} ${fullWidth ? 'w-full' : ''}`}
      initial={{ y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6 }}
      {...props}
    >
      {label && (
        <motion.p
          className="section-label"
          initial={{ y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          {label}
        </motion.p>
      )}
      {children}
    </motion.section>
  );
}

export function SectionGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid">{children}</div>;
}

export function SectionContent({ children }: { children: React.ReactNode }) {
  return <div className="max-w-content">{children}</div>;
}
