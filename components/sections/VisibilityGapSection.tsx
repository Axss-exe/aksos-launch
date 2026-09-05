'use client';

import { motion } from 'framer-motion';
import { FragmentedPlates } from '../aksos/visualizations';
import { tokens } from '@/lib/tokens';

// =============================================================================
// SECTION 02: THE VISIBILITY GAP
// 
// Purpose: Make the visitor recognize the problem
// Visitor Reaction: "Yes. This is exactly what makes working across these markets difficult."
// 
// Requirements:
// - Show contrast between ecosystem that is easy to discover vs difficult to see
// - Quiet editorial composition
// - Large whitespace
// - Sparse information
// - Graphic placeholder with exact dimensions
// - Intentional spatial relationships between text and graphic
//
// Doctrine Compliance:
// - Pattern: Asymmetric editorial
// - Density: Low
// - Rhythm: Contrast after hero
// - Visual: Graphic supports conceptual contrast
// =============================================================================

interface VisibilityGapSectionProps {
  breakpoint?: 'mobile' | 'tablet' | 'desktop';
}

export function VisibilityGapSection({ breakpoint = 'desktop' }: VisibilityGapSectionProps) {
  const isMobile = breakpoint === 'mobile';

  return (
    <section 
      id="visibility-gap"
      className="visibility-gap-section"
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
          THE VISIBILITY GAP
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
          From a distance, the ecosystem becomes difficult to see.
        </motion.h2>
        
        {/* Two-column layout: visible vs from a distance */}
        <motion.div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
            gap: tokens.spacing['16'],
            marginBottom: tokens.spacing['16'],
            alignItems: 'start',
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* LEFT: VISIBLE */}
          <motion.div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: tokens.spacing['6'],
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <motion.h3
              style={{
                fontFamily: tokens.font.serif,
                fontSize: isMobile ? tokens.text['2xl'] : tokens.text['3xl'],
                fontWeight: tokens.weight.normal,
                color: tokens.color.ink,
                lineHeight: tokens.lineHeight.tight,
                marginBottom: tokens.spacing['4'],
              }}
            >
              VISIBLE
            </motion.h3>
            
            <motion.div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: tokens.spacing['2'],
              }}
            >
              <span 
                style={{
                  fontFamily: tokens.font.mono,
                  fontSize: tokens.text.sm,
                  color: tokens.color.muted,
                  letterSpacing: tokens.letterSpacing.wide,
                }}
              >
                PEOPLE
              </span>
              <span 
                style={{
                  fontFamily: tokens.font.mono,
                  fontSize: tokens.text.sm,
                  color: tokens.color.muted,
                  letterSpacing: tokens.letterSpacing.wide,
                }}
              >
                COMPANIES
              </span>
              <span 
                style={{
                  fontFamily: tokens.font.mono,
                  fontSize: tokens.text.sm,
                  color: tokens.color.muted,
                  letterSpacing: tokens.letterSpacing.wide,
                }}
              >
                CAPITAL
              </span>
              <span 
                style={{
                  fontFamily: tokens.font.mono,
                  fontSize: tokens.text.sm,
                  color: tokens.color.muted,
                  letterSpacing: tokens.letterSpacing.wide,
                }}
              >
                PROJECTS
              </span>
              <span 
                style={{
                  fontFamily: tokens.font.mono,
                  fontSize: tokens.text.sm,
                  color: tokens.color.muted,
                  letterSpacing: tokens.letterSpacing.wide,
                }}
              >
                POLICY
              </span>
              <span 
                style={{
                  fontFamily: tokens.font.mono,
                  fontSize: tokens.text.sm,
                  color: tokens.color.muted,
                  letterSpacing: tokens.letterSpacing.wide,
                }}
              >
                OPPORTUNITIES
              </span>
            </motion.div>
          </motion.div>
          
          {/* RIGHT: FROM A DISTANCE */}
          <motion.div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: tokens.spacing['6'],
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <motion.h3
              style={{
                fontFamily: tokens.font.serif,
                fontSize: isMobile ? tokens.text['2xl'] : tokens.text['3xl'],
                fontWeight: tokens.weight.normal,
                color: tokens.color.muted,
                lineHeight: tokens.lineHeight.tight,
                marginBottom: tokens.spacing['4'],
              }}
            >
              FROM A DISTANCE
            </motion.h3>
            
            <motion.div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: tokens.spacing['2'],
              }}
            >
              <span 
                style={{
                  fontFamily: tokens.font.mono,
                  fontSize: tokens.text.sm,
                  color: tokens.color.mutedSoft,
                  letterSpacing: tokens.letterSpacing.wide,
                }}
              >
                ?
              </span>
              <span 
                style={{
                  fontFamily: tokens.font.mono,
                  fontSize: tokens.text.sm,
                  color: tokens.color.mutedSoft,
                  letterSpacing: tokens.letterSpacing.wide,
                }}
              >
                ?
              </span>
              <span 
                style={{
                  fontFamily: tokens.font.mono,
                  fontSize: tokens.text.sm,
                  color: tokens.color.mutedSoft,
                  letterSpacing: tokens.letterSpacing.wide,
                }}
              >
                ?
              </span>
              <span 
                style={{
                  fontFamily: tokens.font.mono,
                  fontSize: tokens.text.sm,
                  color: tokens.color.mutedSoft,
                  letterSpacing: tokens.letterSpacing.wide,
                }}
              >
                unknown
              </span>
              <span 
                style={{
                  fontFamily: tokens.font.mono,
                  fontSize: tokens.text.sm,
                  color: tokens.color.mutedSoft,
                  letterSpacing: tokens.letterSpacing.wide,
                }}
              >
                unknown
              </span>
              <span 
                style={{
                  fontFamily: tokens.font.mono,
                  fontSize: tokens.text.sm,
                  color: tokens.color.mutedSoft,
                  letterSpacing: tokens.letterSpacing.wide,
                }}
              >
                unknown
              </span>
            </motion.div>
          </motion.div>
        </motion.div>
        
        {/* Fragmented Plates Visualization */}
        <motion.div
          style={{
            marginTop: tokens.spacing['12'],
            marginBottom: tokens.spacing['12'],
            width: '100%',
            maxWidth: '800px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <FragmentedPlates 
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
            maxWidth: '800px',
            margin: '0 auto',
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <p 
            style={{
              fontFamily: tokens.font.sans,
              fontSize: isMobile ? tokens.text.base : tokens.text.lg,
              color: tokens.color.muted,
              lineHeight: tokens.lineHeight.relaxed,
            }}
          >
            Information may exist, but it may be difficult to discover.
          </p>
          
          <p 
            style={{
              fontFamily: tokens.font.sans,
              fontSize: isMobile ? tokens.text.base : tokens.text.lg,
              color: tokens.color.muted,
              lineHeight: tokens.lineHeight.relaxed,
            }}
          >
            Difficult to verify. Distributed across many sources.
          </p>
          
          <p 
            style={{
              fontFamily: tokens.font.sans,
              fontSize: isMobile ? tokens.text.base : tokens.text.lg,
              color: tokens.color.muted,
              lineHeight: tokens.lineHeight.relaxed,
            }}
          >
            Difficult to connect, interpret, and understand.
          </p>
          
          <p 
            style={{
              fontFamily: tokens.font.sans,
              fontSize: isMobile ? tokens.text.base : tokens.text.lg,
              color: tokens.color.muted,
              lineHeight: tokens.lineHeight.relaxed,
            }}
          >
            Difficult to turn into a useful picture of the ecosystem.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default VisibilityGapSection;
