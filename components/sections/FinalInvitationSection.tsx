'use client';

import { motion } from 'framer-motion';
import { tokens } from '@/lib/tokens';

// =============================================================================
// FINAL SECTION: INVITATION
// 
// Purpose: The emotional payoff
// Visitor Reaction: "When can I get involved?"
// 
// Requirements:
// - Final question: WHEN CAN I USE IT?
// - THE SYSTEM IS BEING BUILT. THE WORK IS ALREADY BEGINNING.
// - [ JOIN BATANA ] and [ REQUEST ATIS ACCESS ]
// - Then: SEE -> CONNECT -> UNDERSTAND -> ACT -> BUILD
// - Final screen should be extremely quiet
//
// Doctrine Compliance:
// - Pattern: Final invitation
// - Density: Very Low
// - Rhythm: Emotional payoff
// - Visual: Minimal, quiet, focused
// =============================================================================

interface FinalInvitationSectionProps {
  breakpoint?: 'mobile' | 'tablet' | 'desktop';
}

export function FinalInvitationSection({ breakpoint = 'desktop' }: FinalInvitationSectionProps) {
  const isMobile = breakpoint === 'mobile';

  return (
    <section 
      id="final-invitation"
      className="final-invitation-section"
      style={{
        backgroundColor: tokens.color.paper,
        padding: `${tokens.spacing['32']} ${tokens.spacing['8']}`,
        position: 'relative',
        maxWidth: tokens.layout.pageWidth,
        margin: '0 auto',
        width: '100%',
        borderTop: `1px solid ${tokens.color.line}`,
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        style={{
          maxWidth: '1000px',
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
        {/* Final Question */}
        <motion.h2
          className="section-heading"
          style={{
            fontFamily: tokens.font.serif,
            fontSize: isMobile ? tokens.text['4xl'] : tokens.text['7xl'],
            fontWeight: tokens.weight.normal,
            color: tokens.color.ink,
            lineHeight: tokens.lineHeight.tight,
            letterSpacing: tokens.letterSpacing.tight,
            marginBottom: tokens.spacing['16'],
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          WHEN CAN I USE IT?
        </motion.h2>
        
        {/* Status */}
        <motion.div
          style={{
            marginBottom: tokens.spacing['16'],
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.p
            style={{
              fontFamily: tokens.font.serif,
              fontSize: isMobile ? tokens.text['2xl'] : tokens.text['4xl'],
              fontWeight: tokens.weight.normal,
              color: tokens.color.signal,
              lineHeight: tokens.lineHeight.tight,
              letterSpacing: tokens.letterSpacing.tight,
              marginBottom: tokens.spacing['4'],
            }}
          >
            THE SYSTEM IS BEING BUILT.
          </motion.p>
          
          <motion.p
            style={{
              fontFamily: tokens.font.serif,
              fontSize: isMobile ? tokens.text['2xl'] : tokens.text['4xl'],
              fontWeight: tokens.weight.normal,
              color: tokens.color.signal,
              lineHeight: tokens.lineHeight.tight,
              letterSpacing: tokens.letterSpacing.tight,
            }}
          >
            THE WORK IS ALREADY BEGINNING.
          </motion.p>
        </motion.div>
        
        {/* CTAs */}
        <motion.div
          style={{
            display: 'flex',
            gap: tokens.spacing['6'],
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: tokens.spacing['20'],
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {/* Primary CTA */}
          <motion.a
            href="/batana"
            className="btn btn-primary"
            style={{
              fontFamily: tokens.font.sans,
              fontSize: tokens.text.base,
              fontWeight: tokens.weight.medium,
              padding: `${tokens.spacing['4']} ${tokens.spacing['10']}`,
              backgroundColor: tokens.color.signal,
              color: tokens.color.paper,
              border: `1px solid ${tokens.color.signal}`,
              borderRadius: tokens.border.radius.sm,
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: tokens.spacing['2'],
              transition: 'all 0.2s ease',
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.4 }}
            whileHover={{ 
              backgroundColor: tokens.color.signalLight,
              borderColor: tokens.color.signalLight,
            }}
            whileTap={{ scale: 0.98 }}
          >
            JOIN BATANA
            <motion.span
              initial={{ x: 0 }}
              whileHover={{ x: 4 }}
              style={{ display: 'inline-block' }}
            >
              {String.fromCharCode(8594)}
            </motion.span>
          </motion.a>
          
          {/* Secondary CTA */}
          <motion.a
            href="#contact"
            className="btn btn-secondary"
            style={{
              fontFamily: tokens.font.sans,
              fontSize: tokens.text.base,
              fontWeight: tokens.weight.medium,
              padding: `${tokens.spacing['4']} ${tokens.spacing['10']}`,
              backgroundColor: tokens.color.paper,
              color: tokens.color.ink,
              border: `1px solid ${tokens.color.line}`,
              borderRadius: tokens.border.radius.sm,
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: tokens.spacing['2'],
              transition: 'all 0.2s ease',
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.5 }}
            whileHover={{ 
              borderColor: tokens.color.signal,
              backgroundColor: tokens.color.background,
            }}
            whileTap={{ scale: 0.98 }}
          >
            REQUEST ATIS ACCESS
            <motion.span
              initial={{ x: 0 }}
              whileHover={{ x: 4 }}
              style={{ display: 'inline-block' }}
            >
              {String.fromCharCode(8594)}
            </motion.span>
          </motion.a>
        </motion.div>
        
        {/* Framework */}
        <motion.div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: tokens.spacing['4'],
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <motion.span
            style={{
              fontFamily: tokens.font.mono,
              fontSize: tokens.text.sm,
              color: tokens.color.muted,
              letterSpacing: tokens.letterSpacing.wide,
              textTransform: 'uppercase',
            }}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            SEE
          </motion.span>
          
          <motion.span
            style={{
              fontFamily: tokens.font.serif,
              fontSize: tokens.text['4xl'],
              color: tokens.color.lineStrong,
            }}
            initial={{ opacity: 0, rotate: -5 }}
            whileInView={{ opacity: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {String.fromCharCode(8594)}
          </motion.span>
          
          <motion.span
            style={{
              fontFamily: tokens.font.mono,
              fontSize: tokens.text.sm,
              color: tokens.color.muted,
              letterSpacing: tokens.letterSpacing.wide,
              textTransform: 'uppercase',
            }}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.7 }}
          >
            CONNECT
          </motion.span>
          
          <motion.span
            style={{
              fontFamily: tokens.font.serif,
              fontSize: tokens.text['4xl'],
              color: tokens.color.lineStrong,
            }}
            initial={{ opacity: 0, rotate: -5 }}
            whileInView={{ opacity: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            {String.fromCharCode(8594)}
          </motion.span>
          
          <motion.span
            style={{
              fontFamily: tokens.font.mono,
              fontSize: tokens.text.sm,
              color: tokens.color.muted,
              letterSpacing: tokens.letterSpacing.wide,
              textTransform: 'uppercase',
            }}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.9 }}
          >
            UNDERSTAND
          </motion.span>
          
          <motion.span
            style={{
              fontFamily: tokens.font.serif,
              fontSize: tokens.text['4xl'],
              color: tokens.color.lineStrong,
            }}
            initial={{ opacity: 0, rotate: -5 }}
            whileInView={{ opacity: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            {String.fromCharCode(8594)}
          </motion.span>
          
          <motion.span
            style={{
              fontFamily: tokens.font.mono,
              fontSize: tokens.text.sm,
              color: tokens.color.muted,
              letterSpacing: tokens.letterSpacing.wide,
              textTransform: 'uppercase',
            }}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 1.1 }}
          >
            ACT
          </motion.span>
          
          <motion.span
            style={{
              fontFamily: tokens.font.serif,
              fontSize: tokens.text['4xl'],
              color: tokens.color.lineStrong,
            }}
            initial={{ opacity: 0, rotate: -5 }}
            whileInView={{ opacity: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            {String.fromCharCode(8594)}
          </motion.span>
          
          <motion.span
            style={{
              fontFamily: tokens.font.mono,
              fontSize: tokens.text.sm,
              color: tokens.color.signal,
              letterSpacing: tokens.letterSpacing.wide,
              textTransform: 'uppercase',
            }}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 1.3 }}
          >
            BUILD
          </motion.span>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default FinalInvitationSection;
