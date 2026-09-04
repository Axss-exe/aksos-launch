'use client';

import { motion } from 'framer-motion';
import { GraphicPlaceholder } from '../primitives/GraphicPlaceholder';
import { tokens } from '@/lib/tokens';

// =============================================================================
// SECTION 08: BATANA
// 
// Purpose: Introduce the community through which people participate in the AKSOS mission
// Visitor Reaction: "I want to be part of this."
// 
// Requirements:
// - BATANA IS THE COMMUNITY THROUGH WHICH PEOPLE PARTICIPATE IN THE AKSOS MISSION AND MAY BE SELECTED TO WORK WITH ATIS
// - Batana is NOT: a generic community, an alternative product, a replacement for ATIS, a public version of ATIS
// - Relationship: AKSOS -> BATANA -> COMMUNITY/PARTICIPATION -> USE CASES/CONTRIBUTION -> APPLICATION -> SELECTION -> ATIS
// - Feel human
// - Show community as living group of participants
// - Graphic placeholder with exact dimensions
//
// Doctrine Compliance:
// - Pattern: Human-centered
// - Density: Medium
// - Rhythm: After technical ATIS, introduce people
// - Visual: Living group of participants
// =============================================================================

interface BatanaSectionNewProps {
  breakpoint?: 'mobile' | 'tablet' | 'desktop';
}

export function BatanaSectionNew({ breakpoint = 'desktop' }: BatanaSectionNewProps) {
  const isMobile = breakpoint === 'mobile';

  return (
    <section 
      id="batana"
      className="batana-section-new"
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
          BATANA
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
          Batana is the community through which people participate in the AKSOS mission.
        </motion.h2>
        
        {/* Clarification */}
        <motion.div
          style={{
            padding: tokens.spacing['10'],
            backgroundColor: tokens.color.background,
            border: `1px solid ${tokens.color.line}`,
            borderRadius: tokens.border.radius.sm,
            marginBottom: tokens.spacing['16'],
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.p
            style={{
              fontFamily: tokens.font.sans,
              fontSize: tokens.text.base,
              color: tokens.color.muted,
              lineHeight: tokens.lineHeight.relaxed,
              marginBottom: tokens.spacing['4'],
            }}
          >
            <strong style={{ color: tokens.color.ink, fontWeight: tokens.weight.medium }}>Critical clarification:</strong>
          </motion.p>
          
          <motion.div
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
              gap: tokens.spacing['6'],
            }}
          >
            <motion.div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: tokens.spacing['3'],
              }}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <span 
                style={{
                  fontFamily: tokens.font.serif,
                  fontSize: tokens.text['3xl'],
                  color: tokens.color.signal,
                }}
              >
                &bull;
              </span>
              <div>
                <p 
                  style={{
                    fontFamily: tokens.font.sans,
                    fontSize: tokens.text.base,
                    color: tokens.color.ink,
                    lineHeight: tokens.lineHeight.tight,
                    marginBottom: tokens.spacing['1'],
                  }}
                >
                  Batana is the community
                </p>
                <p 
                  style={{
                    fontFamily: tokens.font.sans,
                    fontSize: tokens.text.base,
                    color: tokens.color.muted,
                    lineHeight: tokens.lineHeight.tight,
                  }}
                >
                  through which people participate
                </p>
              </div>
            </motion.div>
            
            <motion.div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: tokens.spacing['3'],
              }}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <span 
                style={{
                  fontFamily: tokens.font.serif,
                  fontSize: tokens.text['3xl'],
                  color: tokens.color.signal,
                }}
              >
                &bull;
              </span>
              <div>
                <p 
                  style={{
                    fontFamily: tokens.font.sans,
                    fontSize: tokens.text.base,
                    color: tokens.color.ink,
                    lineHeight: tokens.lineHeight.tight,
                    marginBottom: tokens.spacing['1'],
                  }}
                >
                  Some participants may be
                </p>
                <p 
                  style={{
                    fontFamily: tokens.font.sans,
                    fontSize: tokens.text.base,
                    color: tokens.color.muted,
                    lineHeight: tokens.lineHeight.tight,
                  }}
                >
                  selected to work with ATIS
                </p>
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div
            style={{
              marginTop: tokens.spacing['6'],
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
              gap: tokens.spacing['6'],
            }}
          >
            <motion.div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: tokens.spacing['3'],
              }}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              <span 
                style={{
                  fontFamily: tokens.font.serif,
                  fontSize: tokens.text['3xl'],
                  color: tokens.color.muted,
                }}
              >
                &bull;
              </span>
              <div>
                <p 
                  style={{
                    fontFamily: tokens.font.sans,
                    fontSize: tokens.text.base,
                    color: tokens.color.muted,
                    lineHeight: tokens.lineHeight.tight,
                    marginBottom: tokens.spacing['1'],
                  }}
                >
                  Batana is NOT a generic community
                </p>
              </div>
            </motion.div>
            
            <motion.div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: tokens.spacing['3'],
              }}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.6 }}
            >
              <span 
                style={{
                  fontFamily: tokens.font.serif,
                  fontSize: tokens.text['3xl'],
                  color: tokens.color.muted,
                }}
              >
                &bull;
              </span>
              <div>
                <p 
                  style={{
                    fontFamily: tokens.font.sans,
                    fontSize: tokens.text.base,
                    color: tokens.color.muted,
                    lineHeight: tokens.lineHeight.tight,
                    marginBottom: tokens.spacing['1'],
                  }}
                >
                  Batana is NOT an alternative to ATIS
                </p>
              </div>
            </motion.div>
            
            <motion.div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: tokens.spacing['3'],
              }}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.7 }}
            >
              <span 
                style={{
                  fontFamily: tokens.font.serif,
                  fontSize: tokens.text['3xl'],
                  color: tokens.color.muted,
                }}
              >
                &bull;
              </span>
              <div>
                <p 
                  style={{
                    fontFamily: tokens.font.sans,
                    fontSize: tokens.text.base,
                    color: tokens.color.muted,
                    lineHeight: tokens.lineHeight.tight,
                    marginBottom: tokens.spacing['1'],
                  }}
                >
                  Batana is NOT a public version of ATIS
                </p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
        
        {/* Relationship Flow */}
        <motion.div
          style={{
            marginBottom: tokens.spacing['16'],
            padding: tokens.spacing['10'],
            backgroundColor: tokens.color.background,
            border: `1px solid ${tokens.color.line}`,
            borderRadius: tokens.border.radius.sm,
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
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
                alignItems: 'center',
                gap: tokens.spacing['2'],
              }}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <span 
                style={{
                  fontFamily: tokens.font.serif,
                  fontSize: tokens.text['2xl'],
                  color: tokens.color.signal,
                }}
              >
                AKSOS
              </span>
            </motion.div>
            
            <motion.span
              style={{
                fontFamily: tokens.font.serif,
                fontSize: tokens.text['4xl'],
                color: tokens.color.lineStrong,
              }}
              initial={{ opacity: 0, rotate: -5 }}
              whileInView={{ opacity: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {String.fromCharCode(8595)}
            </motion.span>
            
            <motion.div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: tokens.spacing['2'],
              }}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.6 }}
            >
              <span 
                style={{
                  fontFamily: tokens.font.serif,
                  fontSize: tokens.text['2xl'],
                  color: tokens.color.signal,
                }}
              >
                BATANA
              </span>
            </motion.div>
            
            <motion.span
              style={{
                fontFamily: tokens.font.serif,
                fontSize: tokens.text['4xl'],
                color: tokens.color.lineStrong,
              }}
              initial={{ opacity: 0, rotate: -5 }}
              whileInView={{ opacity: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              {String.fromCharCode(8595)}
            </motion.span>
            
            <motion.div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: tokens.spacing['2'],
              }}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.8 }}
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
                COMMUNITY / PARTICIPATION
              </span>
            </motion.div>
            
            <motion.span
              style={{
                fontFamily: tokens.font.serif,
                fontSize: tokens.text['4xl'],
                color: tokens.color.lineStrong,
              }}
              initial={{ opacity: 0, rotate: -5 }}
              whileInView={{ opacity: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              {String.fromCharCode(8595)}
            </motion.span>
            
            <motion.div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: tokens.spacing['2'],
              }}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 1.0 }}
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
                USE CASES / CONTRIBUTION
              </span>
            </motion.div>
            
            <motion.span
              style={{
                fontFamily: tokens.font.serif,
                fontSize: tokens.text['4xl'],
                color: tokens.color.lineStrong,
              }}
              initial={{ opacity: 0, rotate: -5 }}
              whileInView={{ opacity: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 1.1 }}
            >
              {String.fromCharCode(8595)}
            </motion.span>
            
            <motion.div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: tokens.spacing['2'],
              }}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 1.2 }}
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
                APPLICATION
              </span>
            </motion.div>
            
            <motion.span
              style={{
                fontFamily: tokens.font.serif,
                fontSize: tokens.text['4xl'],
                color: tokens.color.lineStrong,
              }}
              initial={{ opacity: 0, rotate: -5 }}
              whileInView={{ opacity: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 1.3 }}
            >
              {String.fromCharCode(8595)}
            </motion.span>
            
            <motion.div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: tokens.spacing['2'],
              }}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 1.4 }}
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
                SELECTION
              </span>
            </motion.div>
            
            <motion.span
              style={{
                fontFamily: tokens.font.serif,
                fontSize: tokens.text['4xl'],
                color: tokens.color.lineStrong,
              }}
              initial={{ opacity: 0, rotate: -5 }}
              whileInView={{ opacity: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 1.5 }}
            >
              {String.fromCharCode(8595)}
            </motion.span>
            
            <motion.div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: tokens.spacing['2'],
              }}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 1.6 }}
            >
              <span 
                style={{
                  fontFamily: tokens.font.serif,
                  fontSize: tokens.text['2xl'],
                  color: tokens.color.signal,
                }}
              >
                ATIS
              </span>
            </motion.div>
          </motion.div>
        </motion.div>
        
        {/* Community Graphic Placeholder */}
        <motion.div
          style={{
            marginBottom: tokens.spacing['16'],
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <GraphicPlaceholder
            title="GRAPHIC PLACEHOLDER  BATANA COMMUNITY"
            description="Living group of participants visualization"
            aspectRatio={21 / 9}
            minHeight={isMobile ? '350px' : '500px'}
            bgColor={tokens.color.background}
            borderColor={tokens.color.line}
          />
        </motion.div>
        
        {/* What People Can Do */}
        <motion.div
          style={{
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
                color: tokens.color.signal,
              }}
            >
              &bull;
            </span>
            <span 
              style={{
                fontFamily: tokens.font.sans,
                fontSize: tokens.text.base,
                color: tokens.color.ink,
                lineHeight: tokens.lineHeight.tight,
              }}
            >
              participate
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
                fontFamily: tokens.font.sans,
                fontSize: tokens.text.base,
                color: tokens.color.ink,
                lineHeight: tokens.lineHeight.tight,
              }}
            >
              contribute
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
                fontFamily: tokens.font.sans,
                fontSize: tokens.text.base,
                color: tokens.color.ink,
                lineHeight: tokens.lineHeight.tight,
              }}
            >
              engage with use cases
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
                fontFamily: tokens.font.sans,
                fontSize: tokens.text.base,
                color: tokens.color.ink,
                lineHeight: tokens.lineHeight.tight,
              }}
            >
              discover opportunities
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
                fontFamily: tokens.font.sans,
                fontSize: tokens.text.base,
                color: tokens.color.ink,
                lineHeight: tokens.lineHeight.tight,
              }}
            >
              receive support
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
                fontFamily: tokens.font.sans,
                fontSize: tokens.text.base,
                color: tokens.color.ink,
                lineHeight: tokens.lineHeight.tight,
              }}
            >
              stay informed
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
                fontFamily: tokens.font.sans,
                fontSize: tokens.text.base,
                color: tokens.color.ink,
                lineHeight: tokens.lineHeight.tight,
              }}
            >
              help shape what is being built
            </span>
          </motion.div>
        </motion.div>
        
        {/* Important Note */}
        <motion.div
          style={{
            marginTop: tokens.spacing['16'],
            padding: tokens.spacing['8'],
            backgroundColor: tokens.color.background,
            border: `1px solid ${tokens.color.line}`,
            borderRadius: tokens.border.radius.sm,
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <motion.p
            style={{
              fontFamily: tokens.font.sans,
              fontSize: tokens.text.base,
              color: tokens.color.muted,
              lineHeight: tokens.lineHeight.relaxed,
              margin: 0,
            }}
          >
            <strong style={{ color: tokens.color.ink, fontWeight: tokens.weight.medium }}>Note:</strong> Do not promise ATIS access to everyone. Some participants may be selected to work more deeply with ATIS.
          </motion.p>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default BatanaSectionNew;
