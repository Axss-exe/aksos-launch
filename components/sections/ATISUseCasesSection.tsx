'use client';

import { motion } from 'framer-motion';
import { GraphicPlaceholder } from '../primitives/GraphicPlaceholder';
import { tokens } from '@/lib/tokens';

// =============================================================================
// SECTION 07: ATIS USE CASES
// 
// Purpose: Demonstrate why ATIS matters
// Visitor Reaction: "I can see how this could work in the real world."
// 
// Requirements:
// - Small number of highly focused use cases
// - Do not make fictional dashboard screenshots unless clearly conceptual
// - Each use case: QUESTION -> WHAT ATIS CAN SEE -> WHAT ATIS CONNECTS -> WHAT ATIS UNDERSTANDS -> WHAT BECOMES POSSIBLE
// - Each use case treated as distinct editorial composition
// - Placeholders for final visualizations
//
// Doctrine Compliance:
// - Pattern: Use case showcase
// - Density: Medium
// - Rhythm: Practical demonstration
// - Visual: Distinct compositions for each use case
// =============================================================================

interface ATISUseCasesSectionProps {
  breakpoint?: 'mobile' | 'tablet' | 'desktop';
}

export function ATISUseCasesSection({ breakpoint = 'desktop' }: ATISUseCasesSectionProps) {
  const isMobile = breakpoint === 'mobile';

  return (
    <section 
      id="atis-use-cases"
      className="atis-use-cases-section"
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
          ATIS USE CASES
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
            marginBottom: tokens.spacing['16'],
            maxWidth: '700px',
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Demonstrating why ATIS matters in the real world.
        </motion.h2>
        
        {/* Use Case 01: Investor */}
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
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1.2fr 1fr',
              gap: tokens.spacing['8'],
              alignItems: 'center',
            }}
          >
            {/* Text */}
            <motion.div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: tokens.spacing['6'],
              }}
            >
              <motion.h3
                style={{
                  fontFamily: tokens.font.serif,
                  fontSize: isMobile ? tokens.text['2xl'] : tokens.text['3xl'],
                  fontWeight: tokens.weight.normal,
                  color: tokens.color.ink,
                  lineHeight: tokens.lineHeight.tight,
                  marginBottom: tokens.spacing['2'],
                }}
              >
                USE CASE 01
              </motion.h3>
              
              <motion.p
                style={{
                  fontFamily: tokens.font.sans,
                  fontSize: tokens.text.lg,
                  fontWeight: tokens.weight.medium,
                  color: tokens.color.ink,
                  lineHeight: tokens.lineHeight.tight,
                  marginBottom: tokens.spacing['4'],
                }}
              >
                An investor trying to understand an ecosystem.
              </motion.p>
              
              <motion.div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: tokens.spacing['3'],
                }}
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
                      fontFamily: tokens.font.mono,
                      fontSize: tokens.text.sm,
                      color: tokens.color.signal,
                      letterSpacing: tokens.letterSpacing.wide,
                      textTransform: 'uppercase',
                    }}
                  >
                    QUESTION
                  </span>
                  <span 
                    style={{
                      fontFamily: tokens.font.serif,
                      fontSize: tokens.text['2xl'],
                      color: tokens.color.lineStrong,
                    }}
                  >
                    {String.fromCharCode(8594)}
                  </span>
                  <span 
                    style={{
                      fontFamily: tokens.font.mono,
                      fontSize: tokens.text.sm,
                      color: tokens.color.muted,
                      letterSpacing: tokens.letterSpacing.wide,
                      textTransform: 'uppercase',
                    }}
                  >
                    WHAT ATIS CAN SEE
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
                      fontFamily: tokens.font.mono,
                      fontSize: tokens.text.sm,
                      color: tokens.color.muted,
                      letterSpacing: tokens.letterSpacing.wide,
                      textTransform: 'uppercase',
                    }}
                  >
                    WHAT ATIS CONNECTS
                  </span>
                  <span 
                    style={{
                      fontFamily: tokens.font.serif,
                      fontSize: tokens.text['2xl'],
                      color: tokens.color.lineStrong,
                    }}
                  >
                    {String.fromCharCode(8594)}
                  </span>
                  <span 
                    style={{
                      fontFamily: tokens.font.mono,
                      fontSize: tokens.text.sm,
                      color: tokens.color.muted,
                      letterSpacing: tokens.letterSpacing.wide,
                      textTransform: 'uppercase',
                    }}
                  >
                    WHAT ATIS UNDERSTANDS
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
                      fontFamily: tokens.font.mono,
                      fontSize: tokens.text.sm,
                      color: tokens.color.muted,
                      letterSpacing: tokens.letterSpacing.wide,
                      textTransform: 'uppercase',
                    }}
                  >
                    WHAT BECOMES POSSIBLE
                  </span>
                </motion.div>
              </motion.div>
            </motion.div>
            
            {/* Graphic */}
            <motion.div
              style={{
                position: 'relative',
              }}
            >
              <GraphicPlaceholder
                title="GRAPHIC PLACEHOLDER"
                description="Investor use case visualization"
                aspectRatio={1 / 1}
                minHeight={isMobile ? '250px' : '350px'}
                bgColor={tokens.color.background}
                borderColor={tokens.color.line}
              />
            </motion.div>
          </motion.div>
        </motion.div>
        
        {/* Use Case 02: Enterprise */}
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
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <motion.div
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1.2fr 1fr',
              gap: tokens.spacing['8'],
              alignItems: 'center',
            }}
          >
            {/* Text */}
            <motion.div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: tokens.spacing['6'],
              }}
            >
              <motion.h3
                style={{
                  fontFamily: tokens.font.serif,
                  fontSize: isMobile ? tokens.text['2xl'] : tokens.text['3xl'],
                  fontWeight: tokens.weight.normal,
                  color: tokens.color.ink,
                  lineHeight: tokens.lineHeight.tight,
                  marginBottom: tokens.spacing['2'],
                }}
              >
                USE CASE 02
              </motion.h3>
              
              <motion.p
                style={{
                  fontFamily: tokens.font.sans,
                  fontSize: tokens.text.lg,
                  fontWeight: tokens.weight.medium,
                  color: tokens.color.ink,
                  lineHeight: tokens.lineHeight.tight,
                  marginBottom: tokens.spacing['4'],
                }}
              >
                An enterprise trying to identify relevant people, projects, institutions or opportunities.
              </motion.p>
              
              <motion.div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: tokens.spacing['3'],
                }}
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
                      fontFamily: tokens.font.mono,
                      fontSize: tokens.text.sm,
                      color: tokens.color.signal,
                      letterSpacing: tokens.letterSpacing.wide,
                      textTransform: 'uppercase',
                    }}
                  >
                    QUESTION
                  </span>
                  <span 
                    style={{
                      fontFamily: tokens.font.serif,
                      fontSize: tokens.text['2xl'],
                      color: tokens.color.lineStrong,
                    }}
                  >
                    {String.fromCharCode(8594)}
                  </span>
                  <span 
                    style={{
                      fontFamily: tokens.font.mono,
                      fontSize: tokens.text.sm,
                      color: tokens.color.muted,
                      letterSpacing: tokens.letterSpacing.wide,
                      textTransform: 'uppercase',
                    }}
                  >
                    WHAT ATIS CAN SEE
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
                      fontFamily: tokens.font.mono,
                      fontSize: tokens.text.sm,
                      color: tokens.color.muted,
                      letterSpacing: tokens.letterSpacing.wide,
                      textTransform: 'uppercase',
                    }}
                  >
                    WHAT ATIS CONNECTS
                  </span>
                  <span 
                    style={{
                      fontFamily: tokens.font.serif,
                      fontSize: tokens.text['2xl'],
                      color: tokens.color.lineStrong,
                    }}
                  >
                    {String.fromCharCode(8594)}
                  </span>
                  <span 
                    style={{
                      fontFamily: tokens.font.mono,
                      fontSize: tokens.text.sm,
                      color: tokens.color.muted,
                      letterSpacing: tokens.letterSpacing.wide,
                      textTransform: 'uppercase',
                    }}
                  >
                    WHAT ATIS UNDERSTANDS
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
                      fontFamily: tokens.font.mono,
                      fontSize: tokens.text.sm,
                      color: tokens.color.muted,
                      letterSpacing: tokens.letterSpacing.wide,
                      textTransform: 'uppercase',
                    }}
                  >
                    WHAT BECOMES POSSIBLE
                  </span>
                </motion.div>
              </motion.div>
            </motion.div>
            
            {/* Graphic */}
            <motion.div
              style={{
                position: 'relative',
              }}
            >
              <GraphicPlaceholder
                title="GRAPHIC PLACEHOLDER"
                description="Enterprise use case visualization"
                aspectRatio={1 / 1}
                minHeight={isMobile ? '250px' : '350px'}
                bgColor={tokens.color.background}
                borderColor={tokens.color.line}
              />
            </motion.div>
          </motion.div>
        </motion.div>
        
        {/* Use Case 03: Person Understanding Development */}
        <motion.div
          style={{
            marginBottom: tokens.spacing['12'],
            padding: tokens.spacing['12'],
            backgroundColor: tokens.color.paper,
            border: `1px solid ${tokens.color.line}`,
            borderRadius: tokens.border.radius.sm,
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <motion.div
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1.2fr 1fr',
              gap: tokens.spacing['8'],
              alignItems: 'center',
            }}
          >
            {/* Text */}
            <motion.div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: tokens.spacing['6'],
              }}
            >
              <motion.h3
                style={{
                  fontFamily: tokens.font.serif,
                  fontSize: isMobile ? tokens.text['2xl'] : tokens.text['3xl'],
                  fontWeight: tokens.weight.normal,
                  color: tokens.color.ink,
                  lineHeight: tokens.lineHeight.tight,
                  marginBottom: tokens.spacing['2'],
                }}
              >
                USE CASE 03
              </motion.h3>
              
              <motion.p
                style={{
                  fontFamily: tokens.font.sans,
                  fontSize: tokens.text.lg,
                  fontWeight: tokens.weight.medium,
                  color: tokens.color.ink,
                  lineHeight: tokens.lineHeight.tight,
                  marginBottom: tokens.spacing['4'],
                }}
              >
                A person trying to understand what a development means from their perspective.
              </motion.p>
              
              <motion.div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: tokens.spacing['3'],
                }}
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
                      fontFamily: tokens.font.mono,
                      fontSize: tokens.text.sm,
                      color: tokens.color.signal,
                      letterSpacing: tokens.letterSpacing.wide,
                      textTransform: 'uppercase',
                    }}
                  >
                    QUESTION
                  </span>
                  <span 
                    style={{
                      fontFamily: tokens.font.serif,
                      fontSize: tokens.text['2xl'],
                      color: tokens.color.lineStrong,
                    }}
                  >
                    {String.fromCharCode(8594)}
                  </span>
                  <span 
                    style={{
                      fontFamily: tokens.font.mono,
                      fontSize: tokens.text.sm,
                      color: tokens.color.muted,
                      letterSpacing: tokens.letterSpacing.wide,
                      textTransform: 'uppercase',
                    }}
                  >
                    WHAT ATIS CAN SEE
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
                      fontFamily: tokens.font.mono,
                      fontSize: tokens.text.sm,
                      color: tokens.color.muted,
                      letterSpacing: tokens.letterSpacing.wide,
                      textTransform: 'uppercase',
                    }}
                  >
                    WHAT ATIS CONNECTS
                  </span>
                  <span 
                    style={{
                      fontFamily: tokens.font.serif,
                      fontSize: tokens.text['2xl'],
                      color: tokens.color.lineStrong,
                    }}
                  >
                    {String.fromCharCode(8594)}
                  </span>
                  <span 
                    style={{
                      fontFamily: tokens.font.mono,
                      fontSize: tokens.text.sm,
                      color: tokens.color.muted,
                      letterSpacing: tokens.letterSpacing.wide,
                      textTransform: 'uppercase',
                    }}
                  >
                    WHAT ATIS UNDERSTANDS
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
                      fontFamily: tokens.font.mono,
                      fontSize: tokens.text.sm,
                      color: tokens.color.muted,
                      letterSpacing: tokens.letterSpacing.wide,
                      textTransform: 'uppercase',
                    }}
                  >
                    WHAT BECOMES POSSIBLE
                  </span>
                </motion.div>
              </motion.div>
            </motion.div>
            
            {/* Graphic */}
            <motion.div
              style={{
                position: 'relative',
              }}
            >
              <GraphicPlaceholder
                title="GRAPHIC PLACEHOLDER"
                description="Person perspective use case visualization"
                aspectRatio={1 / 1}
                minHeight={isMobile ? '250px' : '350px'}
                bgColor={tokens.color.background}
                borderColor={tokens.color.line}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default ATISUseCasesSection;
