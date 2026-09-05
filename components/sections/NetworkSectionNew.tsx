'use client';

import { motion } from 'framer-motion';
import { TopographicHierarchy } from '../aksos/visualizations';
import { tokens } from '@/lib/tokens';

// =============================================================================
// SECTION 10: THE NETWORK
// 
// Purpose: Demonstrate the long-term consequence
// Visitor Reaction: "This could become something much bigger."
// 
// Requirements:
// - As more people, enterprises, institutions, projects and information become visible, the network becomes richer
// - Large, expansive network placeholder
// - Show: PEOPLE, ENTERPRISES, INSTITUTIONS, CAPITAL, PROJECTS, MARKETS forming relationships
// - Core idea: The more of an ecosystem becomes visible, the more ways there are to participate in it
//
// Doctrine Compliance:
// - Pattern: Expansive visualization
// - Density: High
// - Rhythm: Long-term vision
// - Visual: Large network visualization placeholder
// =============================================================================

interface NetworkSectionNewProps {
  breakpoint?: 'mobile' | 'tablet' | 'desktop';
}

export function NetworkSectionNew({ breakpoint = 'desktop' }: NetworkSectionNewProps) {
  const isMobile = breakpoint === 'mobile';

  return (
    <section 
      id="network"
      className="network-section-new"
      style={{
        backgroundColor: tokens.color.paper,
        padding: `${tokens.spacing['24']} ${tokens.spacing['8']}`,
        position: 'relative',
        maxWidth: tokens.layout.pageWidth,
        margin: '0 auto',
        width: '100%',
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        {/* Section Label */}
        <motion.p
          className="section-label"
          style={{
            fontFamily: tokens.font.mono,
            fontSize: tokens.text.sm,
            color: tokens.color.muted,
            letterSpacing: tokens.letterSpacing.widest,
            marginBottom: tokens.spacing['4'],
            textTransform: 'uppercase',
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          THE NETWORK
        </motion.p>
        
        {/* Main Heading */}
        <motion.h2
          className="section-heading"
          style={{
            fontFamily: tokens.font.serif,
            fontSize: isMobile ? tokens.text['4xl'] : tokens.text['6xl'],
            fontWeight: tokens.weight.normal,
            color: tokens.color.ink,
            lineHeight: tokens.lineHeight.tight,
            letterSpacing: tokens.letterSpacing.tight,
            marginBottom: tokens.spacing['12'],
            maxWidth: '700px',
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          As the ecosystem becomes visible, the network compounds.
        </motion.h2>
        
        {/* Topographic Hierarchy Visualization */}
        <motion.div
          style={{
            marginBottom: tokens.spacing['16'],
            width: '100%',
            maxWidth: '900px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <TopographicHierarchy 
            breakpoint={breakpoint}
            key={breakpoint}
          />
        </motion.div>
        
        {/* Supporting Explanation */}
        <motion.div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
            gap: tokens.spacing['8'],
            maxWidth: '900px',
            margin: '0 auto',
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p 
            style={{
              fontFamily: tokens.font.sans,
              fontSize: isMobile ? tokens.text.base : tokens.text.lg,
              color: tokens.color.muted,
              lineHeight: tokens.lineHeight.relaxed,
            }}
          >
            As more people, enterprises, institutions, projects and information become visible, the network becomes richer.
          </p>
          
          <p 
            style={{
              fontFamily: tokens.font.sans,
              fontSize: isMobile ? tokens.text.base : tokens.text.lg,
              color: tokens.color.muted,
              lineHeight: tokens.lineHeight.relaxed,
            }}
          >
            More ways to participate. More ways to contribute.
          </p>
          
          <p 
            style={{
              fontFamily: tokens.font.sans,
              fontSize: isMobile ? tokens.text.base : tokens.text.lg,
              color: tokens.color.muted,
              lineHeight: tokens.lineHeight.relaxed,
            }}
          >
            The more of an ecosystem becomes visible, the more ways there are to participate in it.
          </p>
          
          <p 
            style={{
              fontFamily: tokens.font.sans,
              fontSize: isMobile ? tokens.text.base : tokens.text.lg,
              color: tokens.color.muted,
              lineHeight: tokens.lineHeight.relaxed,
            }}
          >
            And the network compounds.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default NetworkSectionNew;
