'use client';

import { motion } from 'framer-motion';
import { GraphicPlaceholder } from '../primitives/GraphicPlaceholder';
import { tokens } from '@/lib/tokens';

// =============================================================================
// SECTION 09: SELECTION / ACCESS
// 
// Purpose: Make the access pathway explicit
// Visitor Reaction: "There is a deliberate pathway."
// 
// Requirements:
// - Visitor should understand: "I cannot simply click into ATIS today — there is a deliberate pathway."
// - Structure: JOIN BATANA -> PARTICIPATE -> CONTRIBUTE -> APPLY -> SELECTION -> ATIS
// - Feel like a pathway into a serious research/intelligence environment
// - Restrained typography and strong structural lines
// - Primary CTA: JOIN BATANA
// - Secondary CTA: APPLY FOR ATIS
// - Do not invent availability claims
//
// Doctrine Compliance:
// - Pattern: Pathway visualization
// - Density: Medium
// - Rhythm: Clear process after community introduction
// - Visual: Strong structural lines, restrained typography
// =============================================================================

interface SelectionSectionProps {
  breakpoint?: 'mobile' | 'tablet' | 'desktop';
}

export function SelectionSection({ breakpoint = 'desktop' }: SelectionSectionProps) {
  const isMobile = breakpoint === 'mobile';

  return (
    <section 
      id="selection"
      className="selection-section"
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
          SELECTION
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
          The pathway into ATIS is deliberate.
        </motion.h2>
        
        {/* Pathway Visualization */}
        <motion.div
          style={{
            marginBottom: tokens.spacing['16'],
            padding: tokens.spacing['12'],
            backgroundColor: tokens.color.paper,
            border: `1px solid ${tokens.color.line}`,
            borderRadius: tokens.border.radius.sm,
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: tokens.spacing['4'],
              flexWrap: 'wrap',
            }}
          >
            <motion.div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: tokens.spacing['2'],
                padding: tokens.spacing['6'],
                border: `2px solid ${tokens.color.signal}`,
                borderRadius: tokens.border.radius.sm,
                backgroundColor: tokens.color.background,
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <span 
                style={{
                  fontFamily: tokens.font.mono,
                  fontSize: tokens.text.sm,
                  color: tokens.color.signal,
                  letterSpacing: tokens.letterSpacing.wide,
                  textTransform: 'uppercase',
                }}
              >
                STEP 01
              </span>
              <span 
                style={{
                  fontFamily: tokens.font.serif,
                  fontSize: tokens.text['2xl'],
                  fontWeight: tokens.weight.normal,
                  color: tokens.color.ink,
                  lineHeight: tokens.lineHeight.tight,
                }}
              >
                JOIN BATANA
              </span>
            </motion.div>
            
            <motion.span
              style={{
                fontFamily: tokens.font.serif,
                fontSize: isMobile ? tokens.text['3xl'] : tokens.text['5xl'],
                color: tokens.color.lineStrong,
              }}
              initial={{ opacity: 0, rotate: -5 }}
              whileInView={{ opacity: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {String.fromCharCode(8594)}
            </motion.span>
            
            <motion.div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: tokens.spacing['2'],
                padding: tokens.spacing['6'],
                border: `1px solid ${tokens.color.line}`,
                borderRadius: tokens.border.radius.sm,
                backgroundColor: tokens.color.paper,
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              <span 
                style={{
                  fontFamily: tokens.font.mono,
                  fontSize: tokens.text.sm,
                  color: tokens.color.muted,
                  letterSpacing: tokens.letterSpacing.wide,
                  textTransform: 'uppercase',
                }}
              >
                STEP 02
              </span>
              <span 
                style={{
                  fontFamily: tokens.font.serif,
                  fontSize: tokens.text['2xl'],
                  fontWeight: tokens.weight.normal,
                  color: tokens.color.ink,
                  lineHeight: tokens.lineHeight.tight,
                }}
              >
                PARTICIPATE
              </span>
            </motion.div>
            
            <motion.span
              style={{
                fontFamily: tokens.font.serif,
                fontSize: isMobile ? tokens.text['3xl'] : tokens.text['5xl'],
                color: tokens.color.lineStrong,
              }}
              initial={{ opacity: 0, rotate: -5 }}
              whileInView={{ opacity: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {String.fromCharCode(8594)}
            </motion.span>
            
            <motion.div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: tokens.spacing['2'],
                padding: tokens.spacing['6'],
                border: `1px solid ${tokens.color.line}`,
                borderRadius: tokens.border.radius.sm,
                backgroundColor: tokens.color.paper,
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.7 }}
            >
              <span 
                style={{
                  fontFamily: tokens.font.mono,
                  fontSize: tokens.text.sm,
                  color: tokens.color.muted,
                  letterSpacing: tokens.letterSpacing.wide,
                  textTransform: 'uppercase',
                }}
              >
                STEP 03
              </span>
              <span 
                style={{
                  fontFamily: tokens.font.serif,
                  fontSize: tokens.text['2xl'],
                  fontWeight: tokens.weight.normal,
                  color: tokens.color.ink,
                  lineHeight: tokens.lineHeight.tight,
                }}
              >
                CONTRIBUTE
              </span>
            </motion.div>
            
            <motion.span
              style={{
                fontFamily: tokens.font.serif,
                fontSize: isMobile ? tokens.text['3xl'] : tokens.text['5xl'],
                color: tokens.color.lineStrong,
              }}
              initial={{ opacity: 0, rotate: -5 }}
              whileInView={{ opacity: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              {String.fromCharCode(8594)}
            </motion.span>
            
            <motion.div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: tokens.spacing['2'],
                padding: tokens.spacing['6'],
                border: `1px solid ${tokens.color.line}`,
                borderRadius: tokens.border.radius.sm,
                backgroundColor: tokens.color.paper,
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.9 }}
            >
              <span 
                style={{
                  fontFamily: tokens.font.mono,
                  fontSize: tokens.text.sm,
                  color: tokens.color.muted,
                  letterSpacing: tokens.letterSpacing.wide,
                  textTransform: 'uppercase',
                }}
              >
                STEP 04
              </span>
              <span 
                style={{
                  fontFamily: tokens.font.serif,
                  fontSize: tokens.text['2xl'],
                  fontWeight: tokens.weight.normal,
                  color: tokens.color.ink,
                  lineHeight: tokens.lineHeight.tight,
                }}
              >
                APPLY
              </span>
            </motion.div>
            
            <motion.span
              style={{
                fontFamily: tokens.font.serif,
                fontSize: isMobile ? tokens.text['3xl'] : tokens.text['5xl'],
                color: tokens.color.lineStrong,
              }}
              initial={{ opacity: 0, rotate: -5 }}
              whileInView={{ opacity: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              {String.fromCharCode(8594)}
            </motion.span>
            
            <motion.div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: tokens.spacing['2'],
                padding: tokens.spacing['6'],
                border: `1px solid ${tokens.color.line}`,
                borderRadius: tokens.border.radius.sm,
                backgroundColor: tokens.color.paper,
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 1.1 }}
            >
              <span 
                style={{
                  fontFamily: tokens.font.mono,
                  fontSize: tokens.text.sm,
                  color: tokens.color.muted,
                  letterSpacing: tokens.letterSpacing.wide,
                  textTransform: 'uppercase',
                }}
              >
                STEP 05
              </span>
              <span 
                style={{
                  fontFamily: tokens.font.serif,
                  fontSize: tokens.text['2xl'],
                  fontWeight: tokens.weight.normal,
                  color: tokens.color.ink,
                  lineHeight: tokens.lineHeight.tight,
                }}
              >
                SELECTION
              </span>
            </motion.div>
            
            <motion.span
              style={{
                fontFamily: tokens.font.serif,
                fontSize: isMobile ? tokens.text['3xl'] : tokens.text['5xl'],
                color: tokens.color.lineStrong,
              }}
              initial={{ opacity: 0, rotate: -5 }}
              whileInView={{ opacity: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              {String.fromCharCode(8594)}
            </motion.span>
            
            <motion.div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: tokens.spacing['2'],
                padding: tokens.spacing['6'],
                border: `2px solid ${tokens.color.green}`,
                borderRadius: tokens.border.radius.sm,
                backgroundColor: tokens.color.background,
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 1.3 }}
            >
              <span 
                style={{
                  fontFamily: tokens.font.mono,
                  fontSize: tokens.text.sm,
                  color: tokens.color.green,
                  letterSpacing: tokens.letterSpacing.wide,
                  textTransform: 'uppercase',
                }}
              >
                STEP 06
              </span>
              <span 
                style={{
                  fontFamily: tokens.font.serif,
                  fontSize: tokens.text['2xl'],
                  fontWeight: tokens.weight.normal,
                  color: tokens.color.ink,
                  lineHeight: tokens.lineHeight.tight,
                }}
              >
                ATIS
              </span>
            </motion.div>
          </motion.div>
        </motion.div>
        
        {/* CTAs */}
        <motion.div
          style={{
            display: 'flex',
            gap: tokens.spacing['6'],
            justifyContent: isMobile ? 'center' : 'flex-start',
            flexWrap: 'wrap',
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {/* Primary CTA */}
          <motion.a
            href="/batana"
            className="btn btn-primary"
            style={{
              fontFamily: tokens.font.sans,
              fontSize: tokens.text.base,
              fontWeight: tokens.weight.medium,
              padding: `${tokens.spacing['4']} ${tokens.spacing['8']}`,
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
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.5 }}
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
              padding: `${tokens.spacing['4']} ${tokens.spacing['8']}`,
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
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.6 }}
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
        
        {/* Supporting Text */}
        <motion.div
          style={{
            marginTop: tokens.spacing['16'],
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
            gap: tokens.spacing['8'],
            maxWidth: '900px',
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <p 
            style={{
              fontFamily: tokens.font.sans,
              fontSize: isMobile ? tokens.text.base : tokens.text.lg,
              color: tokens.color.muted,
              lineHeight: tokens.lineHeight.relaxed,
            }}
          >
            You cannot simply click into ATIS today.
          </p>
          
          <p 
            style={{
              fontFamily: tokens.font.sans,
              fontSize: isMobile ? tokens.text.base : tokens.text.lg,
              color: tokens.color.muted,
              lineHeight: tokens.lineHeight.relaxed,
            }}
          >
            There is a deliberate pathway.
          </p>
          
          <p 
            style={{
              fontFamily: tokens.font.sans,
              fontSize: isMobile ? tokens.text.base : tokens.text.lg,
              color: tokens.color.muted,
              lineHeight: tokens.lineHeight.relaxed,
            }}
          >
            This should feel like a pathway into a serious research/intelligence environment.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default SelectionSection;
