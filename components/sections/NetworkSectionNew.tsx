'use client';

import { motion } from 'framer-motion';
import { GraphicPlaceholder } from '../primitives/GraphicPlaceholder';
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
        
        {/* Network Graphic Placeholder */}
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
            title="GRAPHIC PLACEHOLDER  THE NETWORK"
            description="Large expansive network: PEOPLE, ENTERPRISES, INSTITUTIONS, CAPITAL, PROJECTS, MARKETS forming relationships"
            aspectRatio={21 / 9}
            minHeight={isMobile ? '400px' : '600px'}
            bgColor={tokens.color.background}
            borderColor={tokens.color.line}
          />
        </motion.div>
        
        {/* Core Idea */}
        <motion.div
          style={{
            padding: tokens.spacing['12'],
            backgroundColor: tokens.color.background,
            border: `1px solid ${tokens.color.line}`,
            borderRadius: tokens.border.radius.sm,
            marginBottom: tokens.spacing['16'],
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
              marginBottom: tokens.spacing['6'],
            }}
          >
            The Core Idea
          </motion.h3>
          
          <motion.p
            style={{
              fontFamily: tokens.font.serif,
              fontSize: isMobile ? tokens.text['2xl'] : tokens.text['4xl'],
              fontWeight: tokens.weight.normal,
              color: tokens.color.signal,
              lineHeight: tokens.lineHeight.tight,
              letterSpacing: tokens.letterSpacing.tight,
            }}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            The more of an ecosystem becomes visible, the more ways there are to participate in it.
          </motion.p>
        </motion.div>
        
        {/* Network Elements */}
        <motion.div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: tokens.spacing['8'],
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
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
                color: tokens.color.signal,
              }}
            >
              &bull;
            </span>
            <span 
              style={{
                fontFamily: tokens.font.mono,
                fontSize: tokens.text.sm,
                color: tokens.color.ink,
                letterSpacing: tokens.letterSpacing.wide,
                textTransform: 'uppercase',
              }}
            >
              PEOPLE
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
                color: tokens.color.signal,
              }}
            >
              &bull;
            </span>
            <span 
              style={{
                fontFamily: tokens.font.mono,
                fontSize: tokens.text.sm,
                color: tokens.color.ink,
                letterSpacing: tokens.letterSpacing.wide,
                textTransform: 'uppercase',
              }}
            >
              ENTERPRISES
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
                color: tokens.color.signal,
              }}
            >
              &bull;
            </span>
            <span 
              style={{
                fontFamily: tokens.font.mono,
                fontSize: tokens.text.sm,
                color: tokens.color.ink,
                letterSpacing: tokens.letterSpacing.wide,
                textTransform: 'uppercase',
              }}
            >
              INSTITUTIONS
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
                color: tokens.color.green,
              }}
            >
              &bull;
            </span>
            <span 
              style={{
                fontFamily: tokens.font.mono,
                fontSize: tokens.text.sm,
                color: tokens.color.ink,
                letterSpacing: tokens.letterSpacing.wide,
                textTransform: 'uppercase',
              }}
            >
              CAPITAL
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
                color: tokens.color.signal,
              }}
            >
              &bull;
            </span>
            <span 
              style={{
                fontFamily: tokens.font.mono,
                fontSize: tokens.text.sm,
                color: tokens.color.ink,
                letterSpacing: tokens.letterSpacing.wide,
                textTransform: 'uppercase',
              }}
            >
              PROJECTS
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
                fontFamily: tokens.font.mono,
                fontSize: tokens.text.sm,
                color: tokens.color.ink,
                letterSpacing: tokens.letterSpacing.wide,
                textTransform: 'uppercase',
              }}
            >
              MARKETS
            </span>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default NetworkSectionNew;
