'use client';

import { DiagramContainer, NetworkNode, ConnectionLine, SystemLabel, FlowStep } from '../primitives';
import { motion } from 'framer-motion';
import { tokens } from '@/lib/tokens';

// =============================================================================
// RITA PATH DIAGRAM: SOURCE → EVENT → ENTITY → RELATIONSHIP → CONTEXT → STORY
// 
// Question: "How do relationships become stories?"
// Purpose: Show the investigation path
// 
// Doctrine Compliance:
// - Explicit SVG viewBox: YES
// - Deterministic coordinates: YES
// - Semantic nodes: YES (6 path entities)
// - Semantic connections: YES (direct path)
// - Reserved label space: YES
// - Responsive behavior: YES (vertical on mobile)
// =============================================================================

interface RITAPathDiagramProps {
  breakpoint?: 'mobile' | 'tablet' | 'desktop';
  activeStep?: number;
}

export function RITAPathDiagram({ breakpoint = 'desktop', activeStep }: RITAPathDiagramProps) {
  const isMobile = breakpoint === 'mobile';
  
  // Path from doctrine: SOURCE → EVENT → ENTITY → RELATIONSHIP → CONTEXT → STORY
  const pathNodes = [
    { id: 'source', x: isMobile ? 50 : 10, y: isMobile ? 15 : 50, label: 'SOURCE', category: 'signal' as const, role: 'primary' as const, step: 1 },
    { id: 'event', x: isMobile ? 50 : 25, y: isMobile ? 28 : 50, label: 'EVENT', category: 'event' as const, role: 'primary' as const, step: 2 },
    { id: 'entity', x: isMobile ? 50 : 40, y: isMobile ? 41 : 50, label: 'ENTITY', category: 'company' as const, role: 'primary' as const, step: 3 },
    { id: 'relationship', x: isMobile ? 50 : 55, y: isMobile ? 54 : 50, label: 'RELATIONSHIP', category: 'relationship' as const, role: 'primary' as const, step: 4 },
    { id: 'context', x: isMobile ? 50 : 70, y: isMobile ? 67 : 50, label: 'CONTEXT', category: 'context' as const, role: 'primary' as const, step: 5 },
    { id: 'story', x: isMobile ? 50 : 85, y: isMobile ? 80 : 50, label: 'STORY', category: 'context' as const, role: 'primary' as const, step: 6 },
  ];

  // Connections between path nodes
  const connections = pathNodes.slice(0, -1).map((node, index) => ({
    from: { x: node.x, y: node.y },
    to: { x: pathNodes[index + 1].x, y: pathNodes[index + 1].y },
    type: 'direct' as const,
    delay: 0.3 + (index * 0.15),
  }));

  // RITA position (center of path)
  const ritaPosition = { x: isMobile ? 50 : 47.5, y: isMobile ? 50 : 30 };

  return (
    <DiagramContainer aspectRatio={isMobile ? 0.8 : 2} viewBox={isMobile ? "0 0 100 100" : "0 0 100 60"}>
      <rect x="0" y="0" width={isMobile ? "100" : "100"} height={isMobile ? "100" : "60"} fill="transparent" />
      
      {/* Connections first */}
      {connections.map((conn, index) => (
        <ConnectionLine
          key={`conn-${index}`}
          from={conn.from}
          to={conn.to}
          type={conn.type}
          delay={conn.delay}
        />
      ))}
      
      {/* Path nodes */}
      {pathNodes.map((node) => (
        <NetworkNode
          key={node.id}
          x={node.x}
          y={node.y}
          label={node.label}
          category={node.category as 'operator' | 'signal' | 'context' | 'system' | 'company' | 'policy' | 'capital' | 'project' | 'relationship'}
          role={node.role}
          size="md"
        />
      ))}
      
      {/* RITA node (above the path) */}
      <NetworkNode
        x={ritaPosition.x}
        y={ritaPosition.y}
        label="RITA"
        category="system"
        role="primary"
        size="lg"
      />
      
      {/* RITA label */}
      <SystemLabel
        x={ritaPosition.x}
        y={ritaPosition.y - 8}
        text="INVESTIGATION"
        position="top"
        size="sm"
        delay={0.5}
      />
      
      {/* Path description */}
      <SystemLabel
        x={50}
        y={isMobile ? 95 : 92}
        text="ONE ANNOUNCEMENT CAN LEAD TO A COMPANY. THAT COMPANY TO A PERSON. RITA FOLLOWS THE RELATIONSHIP."
        position="bottom"
        size="sm"
        delay={1.2}
      />
      
      {/* Step indicators (horizontal layout only) */}
      {!isMobile && (
        <>
          {pathNodes.map((node, index) => (
            <FlowStep
              key={`step-${node.id}`}
              x={node.x}
              y={70}
              label={node.label}
              number={index + 1}
              isActive={activeStep === index + 1}
              delay={0.4 + (index * 0.1)}
            />
          ))}
        </>
      )}
      
      {/* Main title */}
      <SystemLabel
        x={50}
        y={isMobile ? 97 : 97}
        text="RITA HELPS FOLLOW THE RELATIONSHIP"
        position="bottom"
        size="sm"
        delay={1.4}
      />
    </DiagramContainer>
  );
}
