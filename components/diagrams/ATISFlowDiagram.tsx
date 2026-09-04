'use client';

import { DiagramContainer, NetworkNode, ConnectionLine, SystemLabel, FlowStep } from '../primitives';
import { motion } from 'framer-motion';
import { tokens } from '@/lib/tokens';

// =============================================================================
// ATIS FLOW DIAGRAM: SIGNAL → ATIS → MEANING
// 
// Question: "How does ATIS work?"
// Purpose: Show intelligence flow from signals to meaning
// 
// Doctrine Compliance:
// - Explicit SVG viewBox: YES
// - Deterministic coordinates: YES
// - Semantic nodes: YES (5 signal types, ATIS, meaning)
// - Semantic connections: YES (direct flow)
// - Reserved label space: YES
// - Responsive behavior: YES (vertical on mobile)
// =============================================================================

interface ATISFlowDiagramProps {
  breakpoint?: 'mobile' | 'tablet' | 'desktop';
  activeStep?: number;
}

export function ATISFlowDiagram({ breakpoint = 'desktop', activeStep }: ATISFlowDiagramProps) {
  const isMobile = breakpoint === 'mobile';
  
  // Signal types from doctrine: COMPANY + POLICY + CAPITAL + PROJECT + RELATIONSHIP
  const signals = [
    { id: 'company', x: isMobile ? 50 : 15, y: isMobile ? 15 : 40, label: 'COMPANY', category: 'company' as const, role: 'primary' as const, step: 1 },
    { id: 'policy', x: isMobile ? 50 : 30, y: isMobile ? 25 : 40, label: 'POLICY', category: 'policy' as const, role: 'primary' as const, step: 2 },
    { id: 'capital', x: isMobile ? 50 : 45, y: isMobile ? 35 : 40, label: 'CAPITAL', category: 'capital' as const, role: 'primary' as const, step: 3 },
    { id: 'project', x: isMobile ? 50 : 60, y: isMobile ? 45 : 40, label: 'PROJECT', category: 'project' as const, role: 'primary' as const, step: 4 },
    { id: 'relationship', x: isMobile ? 50 : 75, y: isMobile ? 55 : 40, label: 'RELATIONSHIP', category: 'relationship' as const, role: 'primary' as const, step: 5 },
  ];

  // ATIS processor position
  const atisPosition = { x: isMobile ? 50 : 50, y: isMobile ? 65 : 40 };
  
  // Meaning/insight position
  const meaningPosition = { x: isMobile ? 50 : 85, y: isMobile ? 80 : 40 };

  // Connections from signals to ATIS
  const signalConnections = signals.map((signal, index) => ({
    from: { x: signal.x, y: signal.y },
    to: atisPosition,
    type: 'contextual' as const,
    delay: 0.3 + (index * 0.1),
  }));

  // Connection from ATIS to meaning
  const meaningConnection = {
    from: atisPosition,
    to: meaningPosition,
    type: 'direct' as const,
    delay: 0.8,
  };

  // ATIS label position
  const atisLabelPosition = { x: atisPosition.x, y: isMobile ? atisPosition.y - 8 : atisPosition.y - 8 };
  
  // Meaning label
  const meaningLabel = { x: meaningPosition.x, y: isMobile ? meaningPosition.y + 8 : meaningPosition.y - 8 };

  return (
    <DiagramContainer aspectRatio={isMobile ? 0.8 : 2} viewBox={isMobile ? "0 0 100 100" : "0 0 100 40"}>
      <rect x="0" y="0" width={isMobile ? "100" : "100"} height={isMobile ? "100" : "40"} fill="transparent" />
      
      {/* Connections first */}
      {signalConnections.map((conn, index) => (
        <ConnectionLine
          key={`signal-${index}`}
          from={conn.from}
          to={conn.to}
          type={conn.type}
          delay={conn.delay}
        />
      ))}
      
      {/* ATIS to meaning connection */}
      <ConnectionLine
        from={meaningConnection.from}
        to={meaningConnection.to}
        type={meaningConnection.type}
        delay={meaningConnection.delay}
      />
      
      {/* Signal nodes */}
      {signals.map((signal, index) => (
        <NetworkNode
          key={signal.id}
          x={signal.x}
          y={signal.y}
          label={signal.label}
          category={signal.category}
          role={signal.role}
          size="md"
        />
      ))}
      
      {/* ATIS node */}
      <NetworkNode
        x={atisPosition.x}
        y={atisPosition.y}
        label="ATIS"
        category="system"
        role="primary"
        size="lg"
      />
      
      {/* Meaning node */}
      <NetworkNode
        x={meaningPosition.x}
        y={meaningPosition.y}
        label="MEANING"
        category="context"
        role="primary"
        size="md"
      />
      
      {/* ATIS label */}
      <SystemLabel
        x={atisLabelPosition.x}
        y={atisLabelPosition.y}
        text="INTELLIGENCE"
        position="top"
        size="sm"
        delay={0.5}
      />
      
      {/* Meaning label */}
      <SystemLabel
        x={meaningLabel.x}
        y={meaningLabel.y}
        text="WHAT DOES THIS MEAN FOR YOU?"
        position={isMobile ? 'bottom' : 'bottom'}
        size="sm"
        delay={1.0}
      />
      
      {/* Step indicators (horizontal layout only) */}
      {!isMobile && (
        <>
          {signals.map((signal, index) => (
            <FlowStep
              key={`step-${signal.id}`}
              x={signal.x}
              y={60}
              label={signal.label}
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
        y={isMobile ? 97 : 95}
        text="ATIS CONNECTS THE SIGNALS"
        position="bottom"
        size="sm"
        delay={1.2}
      />
    </DiagramContainer>
  );
}
