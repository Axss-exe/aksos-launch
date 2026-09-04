'use client';

import { motion } from 'framer-motion';
import { tokens } from '@/lib/tokens';

interface PageLayoutProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

export function PageLayout({ children, header, footer }: PageLayoutProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.normal }}
    >
      {header}
      <main>{children}</main>
      {footer}
    </motion.div>
  );
}
