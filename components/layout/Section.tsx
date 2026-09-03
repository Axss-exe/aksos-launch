'use client';

import { motion } from 'framer-motion';
import { tokens } from '@/lib/design-tokens';

interface SectionProps {
  id?: string;
  label: string;
  children: React.ReactNode;
  tone?: 'paper' | 'dark' | 'quiet';
  className?: string;
}

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionLabel({ children, className = '' }: SectionLabelProps) {
  return (
    <p className={`sys-label ${className}`}>
      <span className="label-rule" />
      {children}
    </p>
  );
}

export function Section({ 
  id, 
  label, 
  children, 
  tone = 'paper',
  className = '' 
}: SectionProps) {
  return (
    <section 
      id={id} 
      className={`sys-section tone-${tone} ${className}`}
    >
      <div className="sys-grid">
        <SectionLabel>{label}</SectionLabel>
        {children}
      </div>
    </section>
  );
}

// Animated section that reveals on scroll
export function AnimatedSection({
  id,
  label,
  children,
  tone = 'paper',
  className = '',
  delay = 0,
}: SectionProps & { delay?: number }) {
  return (
    <motion.section
      id={id}
      className={`sys-section tone-${tone} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ 
        duration: tokens.animation.duration.slow,
        delay: delay,
        ease: tokens.animation.easing.easeOut 
      }}
    >
      <div className="sys-grid">
        <SectionLabel>{label}</SectionLabel>
        {children}
      </div>
    </motion.section>
  );
}
