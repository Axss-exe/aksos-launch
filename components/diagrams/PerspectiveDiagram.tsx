'use client';

import { DiagramContainer, SystemLabel } from '../primitives';
import { motion } from 'framer-motion';
import { tokens } from '@/lib/tokens';

// =============================================================================
// PERSPECTIVE DIAGRAM: SAME EVENT, DIFFERENT MEANINGS
// 
// Question: "Why does the same event mean different things?"
// Purpose: Show perspective-based interpretation
// 
// Doctrine Compliance:
// - Explicit SVG viewBox: YES
// - Deterministic coordinates: YES
// - Semantic nodes: N/A (typography-based)
// - Semantic connections: N/A
// - Reserved label space: YES
// - Responsive behavior: YES
// =============================================================================

interface PerspectiveDiagramProps {
  breakpoint?: 'mobile' | 'tablet' | 'desktop';
}

export function PerspectiveDiagram({ breakpoint = 'desktop' }: PerspectiveDiagramProps) {
  const isMobile = breakpoint === 'mobile';
  
  // Perspective pairs: ENTITY → PERSPECTIVE → MEANING
  const perspectives = [
    { entity: 'INVESTOR', meaning: 'capital opportunity', delay: 0.2 },
    { entity: 'SUPPLIER', meaning: 'new demand', delay: 0.3 },
    { entity: 'COMPETITOR', meaning: 'market pressure', delay: 0.4 },
    { entity: 'GOVERNMENT', meaning: 'revenue / infrastructure / regulation', delay: 0.5 },
    { entity: 'ANOTHER COUNTRY', meaning: 'strategic development', delay: 0.6 },
  ];

  // Layout
  const centerX = 50;
  const startY = isMobile ? 20 : 30;
  const rowHeight = isMobile ? 12 : 8;

  return (
    <DiagramContainer aspectRatio={isMobile ? 0.8 : 1.5} viewBox={isMobile ? "0 0 100 100" : "0 0 100 60"}>
      <rect x="0" y="0" width={isMobile ? "100" : "100"} height={isMobile ? "100" : "60"} fill="transparent" />
      
      {/* Event title at top */}
      <motion.text
        x={centerX}
        y={isMobile ? 10 : 15}
        textAnchor="middle"
        fontSize={isMobile ? '4' : '5'}
        fontFamily={tokens.font.serif}
        fill={tokens.color.ink}
        initial={{ opacity: 1, y: 20 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        NEW MINING PROJECT
      </motion.text>
      
      {/* Perspective pairs */}
      {perspectives.map((p, index) => {
        const y = startY + (index * rowHeight);
        const arrowX = isMobile ? 40 : 35;
        const entityX = isMobile ? 20 : 15;
        const meaningX = isMobile ? 60 : 55;
        
        return (
          <motion.g
            key={p.entity}
            initial={{ opacity: 1, y: 20 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: p.delay }}
          >
            {/* Entity */}
            <text
              x={entityX}
              y={y}
              textAnchor="end"
              fontSize={isMobile ? '3' : '2.5'}
              fontFamily={tokens.font.mono}
              fill={tokens.color.muted}
              letterSpacing="0.05em"
            >
              {p.entity}
            </text>
            
            {/* Arrow */}
            <text
              x={arrowX}
              y={y}
              textAnchor="middle"
              fontSize={isMobile ? '4' : '3'}
              fontFamily={tokens.font.serif}
              fill={tokens.color.lineStrong}
            >
              {String.fromCharCode(8594)}
            </text>
            
            {/* Meaning */}
            <text
              x={meaningX}
              y={y}
              textAnchor="start"
              fontSize={isMobile ? '3' : '2.5'}
              fontFamily={tokens.font.sans}
              fill={tokens.color.muted}
            >
              {p.meaning}
            </text>
          </motion.g>
        );
      })}
      
      {/* Main message */}
      <motion.text
        x={centerX}
        y={isMobile ? 80 : 50}
        textAnchor="middle"
        fontSize={isMobile ? '3.5' : '4'}
        fontFamily={tokens.font.serif}
        fill={tokens.color.ink}
        initial={{ opacity: 1, y: 20 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        The event doesn't change.
      </motion.text>
      
      <motion.text
        x={centerX}
        y={isMobile ? 88 : 57}
        textAnchor="middle"
        fontSize={isMobile ? '3.5' : '4'}
        fontFamily={tokens.font.serif}
        fill={tokens.color.ink}
        initial={{ opacity: 1, y: 20 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.9 }}
      >
        The perspective does.
      </motion.text>
      
      {/* Main title */}
      <SystemLabel
        x={50}
        y={isMobile ? 97 : 95}
        text="THE SAME EVENT MEANS DIFFERENT THINGS TO DIFFERENT PEOPLE"
        position="bottom"
        size="sm"
        delay={1.2}
      />
    </DiagramContainer>
  );
}
