'use client';

import { DiagramContainer, NetworkNode, ConnectionLine, SystemLabel, FlowStep } from '../primitives';
import { motion } from 'framer-motion';
import { tokens } from '@/lib/tokens';

// =============================================================================
// BATANA FLOW DIAGRAM: PERSON/ORG → OBJECTIVE → UNDERSTANDING → INTELLIGENCE → OPPORTUNITY → ACTION
// 
// Question: "How does Batana work?"
// Purpose: Show the human/action layer flow
// 
// Doctrine Compliance:
// - Explicit SVG viewBox: YES
// - Deterministic coordinates: YES
// - Semantic nodes: YES (6 flow entities)
// - Semantic connections: YES (direct flow)
// - Reserved label space: YES
// - Responsive behavior: YES (vertical on mobile)
// =============================================================================

interface BatanaFlowDiagramProps {
  breakpoint?: 'mobile' | 'tablet' | 'desktop';
  activeStep?: number;
}

export function BatanaFlowDiagram({ breakpoint = 'desktop', activeStep }: BatanaFlowDiagramProps) {
  const isMobile = breakpoint === 'mobile';
  
  // Path from doctrine: PERSON / ORGANIZATION → OBJECTIVE → UNDERSTANDING → INTELLIGENCE → OPPORTUNITY → ACTION
  const flowNodes = [
    { id: 'person', x: isMobile ? 50 : 10, y: isMobile ? 15 : 50, label: 'PERSON / ORG', category: 'context' as const, role: 'primary' as const, step: 1 },
    { id: 'objective', x: isMobile ? 50 : 25, y: isMobile ? 28 : 50, label: 'OBJECTIVE', category: 'signal' as const, role: 'primary' as const, step: 2 },
    { id: 'understanding', x: isMobile ? 50 : 40, y: isMobile ? 41 : 50, label: 'UNDERSTANDING', category: 'context' as const, role: 'primary' as const, step: 3 },
    { id: 'intelligence', x: isMobile ? 50 : 55, y: isMobile ? 54 : 50, label: 'INTELLIGENCE', category: 'system' as const, role: 'primary' as const, step: 4 },
    { id: 'opportunity', x: isMobile ? 50 : 70, y: isMobile ? 67 : 50, label: 'OPPORTUNITY', category: 'context' as const, role: 'primary' as const, step: 5 },
    { id: 'action', x: isMobile ? 50 : 85, y: isMobile ? 80 : 50, label: 'ACTION', category: 'context' as const, role: 'primary' as const, step: 6 },
  ];

  // Connections between nodes
  const connections = flowNodes.slice(0, -1).map((node, index) => ({
    from: { x: node.x, y: node.y },
    to: { x: flowNodes[index + 1].x, y: flowNodes[index + 1].y },
    type: 'direct' as const,
    delay: 0.3 + (index * 0.15),
  }));

  // Batana position (center of flow)
  const batanaPosition = { x: isMobile ? 50 : 47.5, y: isMobile ? 45 : 30 };

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
      
      {/* Flow nodes */}
      {flowNodes.map((node, index) => (
        <NetworkNode
          key={node.id}
          x={node.x}
          y={node.y}
          label={node.label}
          category={node.category}
          role={node.role}
          size="md"
        />
      ))}
      
      {/* Batana node (above the flow) */}
      <NetworkNode
        x={batanaPosition.x}
        y={batanaPosition.y}
        label="BATANA"
        category="system"
        role="primary"
        size="lg"
      />
      
      {/* Batana label */}
      <SystemLabel
        x={batanaPosition.x}
        y={batanaPosition.y - 8}
        text="HUMAN / ACTION"
        position="top"
        size="sm"
        delay={0.5}
      />
      
      {/* Flow description */}
      <SystemLabel
        x={50}
        y={isMobile ? 95 : 92}
        text="TELL US ABOUT THE WORK. WE'LL LISTEN FIRST. THEN WE'LL SEE WHERE WE CAN HELP."
        position="bottom"
        size="sm"
        delay={1.2}
      />
      
      {/* Step indicators (horizontal layout only) */}
      {!isMobile && (
        <>
          {flowNodes.map((node, index) => (
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
        text="BATANA: START WITH A CONVERSATION"
        position="bottom"
        size="sm"
        delay={1.4}
      />
    </DiagramContainer>
  );
}
