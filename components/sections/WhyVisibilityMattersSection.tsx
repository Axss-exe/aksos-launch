'use client';

import { motion } from 'framer-motion';
import { GraphicPlaceholder } from '../primitives/GraphicPlaceholder';
import { tokens } from '@/lib/tokens';

// =============================================================================
// SECTION 03: WHY VISIBILITY MATTERS
// 
// Purpose: The deeper inference - when ecosystem is difficult to see, participation becomes harder
// Visitor Reaction: "Oh. This is much deeper than disconnected information."
// 
// Requirements:
// - Show the consequence chain
// - Intellectually serious, not sensational
// - Quiet editorial composition
// - Graphic placeholder with exact dimensions
//
// Doctrine Compliance:
// - Pattern: Statement-first with supporting visualization
// - Density: Low
// - Rhythm: Continues the narrative
// - Visual: Graphic communicates the relationship chain
// =============================================================================

interface WhyVisibilityMattersSectionProps {
  breakpoint?: 'mobile' | 'tablet' | 'desktop';
}

export function WhyVisibilityMattersSection({ breakpoint = 'desktop' }: WhyVisibilityMattersSectionProps) {
  const isMobile = breakpoint === 'mobile';

  return (
    <section 
      id="why-visibility-matters"
      className="why-visibility-matters-section"
      style={{
        backgroundColor: tokens.color.background,
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
          WHY VISIBILITY MATTERS
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
          When an ecosystem is difficult to see, participation becomes harder.
        </motion.h2>
        
        {/* Concept Chain Visualization */}
        <motion.div
          style={{
            marginBottom: tokens.spacing['16'],
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <GraphicPlaceholder
            title="GRAPHIC PLACEHOLDER  WHY VISIBILITY MATTERS"
            description="Flow: DIFFICULT TO SEE  DIFFICULT TO UNDERSTAND  DIFFICULT TO TRUST  DIFFICULT TO ENTER  OPPORTUNITY LOST"
            aspectRatio={2 / 1}
            minHeight={isMobile ? '250px' : '400px'}
            bgColor={tokens.color.paper}
            borderColor={tokens.color.line}
          />
        </motion.div>
        
        {/* Supporting Explanation */}
        <motion.div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: tokens.spacing['6'],
            maxWidth: '800px',
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
            This creates an information visibility gap.
          </p>
          
          <p 
            style={{
              fontFamily: tokens.font.sans,
              fontSize: isMobile ? tokens.text.base : tokens.text.lg,
              color: tokens.color.muted,
              lineHeight: tokens.lineHeight.relaxed,
            }}
          >
            That gap has real consequences.
          </p>
          
          <motion.div
            style={{
              fontFamily: tokens.font.serif,
              fontSize: isMobile ? tokens.text['2xl'] : tokens.text['3xl'],
              fontWeight: tokens.weight.normal,
              color: tokens.color.ink,
              lineHeight: tokens.lineHeight.tight,
              paddingLeft: tokens.spacing['6'],
              borderLeft: `2px solid ${tokens.color.lineStrong}`,
              marginTop: tokens.spacing['6'],
            }}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            If people cannot easily see who exists, what is happening, where activity is occurring, who is connected, what opportunities exist, and where to begin, then participating in that ecosystem becomes harder.
          </motion.div>
          
          <p 
            style={{
              fontFamily: tokens.font.sans,
              fontSize: isMobile ? tokens.text.base : tokens.text.lg,
              color: tokens.color.muted,
              lineHeight: tokens.lineHeight.relaxed,
              marginTop: tokens.spacing['6'],
            }}
          >
            <em style={{ fontStyle: 'italic' }}>Visibility is part of the infrastructure required for participation.</em>
          </p>
        </motion.div>
        
        {/* Affected Areas */}
        <motion.div
          style={{
            marginTop: tokens.spacing['16'],
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: tokens.spacing['8'],
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <motion.div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: tokens.spacing['4'],
            }}
          >
            <span 
              style={{
                fontFamily: tokens.font.serif,
                fontSize: tokens.text['4xl'],
                color: tokens.color.lineStrong,
              }}
            >
              &bull;
            </span>
            <span 
              style={{
                fontFamily: tokens.font.sans,
                fontSize: tokens.text.base,
                color: tokens.color.muted,
              }}
            >
              investment
            </span>
          </motion.div>
          
          <motion.div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: tokens.spacing['4'],
            }}
          >
            <span 
              style={{
                fontFamily: tokens.font.serif,
                fontSize: tokens.text['4xl'],
                color: tokens.color.lineStrong,
              }}
            >
              &bull;
            </span>
            <span 
              style={{
                fontFamily: tokens.font.sans,
                fontSize: tokens.text.base,
                color: tokens.color.muted,
              }}
            >
              partnerships
            </span>
          </motion.div>
          
          <motion.div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: tokens.spacing['4'],
            }}
          >
            <span 
              style={{
                fontFamily: tokens.font.serif,
                fontSize: tokens.text['4xl'],
                color: tokens.color.lineStrong,
              }}
            >
              &bull;
            </span>
            <span 
              style={{
                fontFamily: tokens.font.sans,
                fontSize: tokens.text.base,
                color: tokens.color.muted,
              }}
            >
              employment
            </span>
          </motion.div>
          
          <motion.div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: tokens.spacing['4'],
            }}
          >
            <span 
              style={{
                fontFamily: tokens.font.serif,
                fontSize: tokens.text['4xl'],
                color: tokens.color.lineStrong,
              }}
            >
              &bull;
            </span>
            <span 
              style={{
                fontFamily: tokens.font.sans,
                fontSize: tokens.text.base,
                color: tokens.color.muted,
              }}
            >
              access to capital
            </span>
          </motion.div>
          
          <motion.div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: tokens.spacing['4'],
            }}
          >
            <span 
              style={{
                fontFamily: tokens.font.serif,
                fontSize: tokens.text['4xl'],
                color: tokens.color.lineStrong,
              }}
            >
              &bull;
            </span>
            <span 
              style={{
                fontFamily: tokens.font.sans,
                fontSize: tokens.text.base,
                color: tokens.color.muted,
              }}
            >
              access to opportunities
            </span>
          </motion.div>
          
          <motion.div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: tokens.spacing['4'],
            }}
          >
            <span 
              style={{
                fontFamily: tokens.font.serif,
                fontSize: tokens.text['4xl'],
                color: tokens.color.lineStrong,
              }}
            >
              &bull;
            </span>
            <span 
              style={{
                fontFamily: tokens.font.sans,
                fontSize: tokens.text.base,
                color: tokens.color.muted,
              }}
            >
              research
            </span>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default WhyVisibilityMattersSection;
