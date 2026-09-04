'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import { tokens } from '@/lib/tokens';

// =============================================================================
// HERO GRAPH: OBSIDIAN-STYLE KNOWLEDGE GRAPH
// 
// Purpose: Living ecosystem of relationships - the only fully production-ready graphic
// Requirements:
// - Large, animated, Obsidian-style knowledge graph
// - Dense but controlled network
// - Nodes: many, isolated, small clusters, larger clusters, varying sizes
// - Long-distance and local relationships
// - Gentle drift, spatially coherent, subtle activity
// - Hover: identify node, highlight relationships, dim unrelated
// - No labels on every node (primarily visual)
// - Responsive: works on mobile (tap instead of hover)
// - Accessible: keyboard focus equivalent
// - Performant: no excessive re-renders
// =============================================================================

interface HeroGraphProps {
  breakpoint?: 'mobile' | 'tablet' | 'desktop';
}

interface Node {
  id: string;
  x: number;
  y: number;
  size: number;
  category: string;
  label?: string;
  cluster?: string;
}

interface Edge {
  from: string;
  to: string;
  strength: number;
}

// Generate deterministic node positions using seeded randomness
const seededRandom = (seed: number) => {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
};

const generateNodes = (breakpoint: 'mobile' | 'tablet' | 'desktop'): Node[] => {
  const counts = {
    mobile: { primary: 15, secondary: 10, tertiary: 0 },
    tablet: { primary: 20, secondary: 15, tertiary: 10 },
    desktop: { primary: 25, secondary: 20, tertiary: 15 },
  };

  const config = counts[breakpoint];
  const nodes: Node[] = [];

  // Categories with their colors and typical sizes
  const categories = [
    { name: 'person', color: tokens.color.ink, baseSize: 1.5 },
    { name: 'enterprise', color: tokens.color.ink, baseSize: 2 },
    { name: 'institution', color: tokens.color.muted, baseSize: 1.8 },
    { name: 'government', color: tokens.color.muted, baseSize: 1.6 },
    { name: 'capital', color: tokens.color.green, baseSize: 1.7 },
    { name: 'project', color: tokens.color.signal, baseSize: 1.4 },
    { name: 'policy', color: tokens.color.muted, baseSize: 1.5 },
    { name: 'market', color: tokens.color.lineStrong, baseSize: 1.6 },
    { name: 'opportunity', color: tokens.color.signal, baseSize: 1.3 },
    { name: 'event', color: tokens.color.signalDark, baseSize: 1.4 },
    { name: 'relationship', color: tokens.color.lineStrong, baseSize: 1.2 },
  ];

  // Generate primary nodes (always visible)
  for (let i = 0; i < config.primary; i++) {
    const angle = (i / config.primary) * Math.PI * 2;
    const distance = 25 + seededRandom(i) * 15;
    const x = 50 + Math.cos(angle) * distance;
    const y = 50 + Math.sin(angle) * distance;
    const category = categories[i % categories.length];
    
    nodes.push({
      id: `node-${i}`,
      x: Math.round(x * 10) / 10,
      y: Math.round(y * 10) / 10,
      size: category.baseSize * (0.8 + seededRandom(i * 100) * 0.4),
      category: category.name,
      cluster: seededRandom(i * 100) > 0.5 ? 'A' : 'B',
    });
  }

  // Generate secondary nodes
  let offset = config.primary;
  for (let i = 0; i < config.secondary; i++) {
    const angle = seededRandom(i + offset) * Math.PI * 2;
    const distance = 35 + seededRandom(i + offset + 100) * 10;
    const x = 50 + Math.cos(angle) * distance;
    const y = 50 + Math.sin(angle) * distance;
    const category = categories[Math.floor(seededRandom(i + offset + 200) * categories.length)];
    
    nodes.push({
      id: `node-${offset + i}`,
      x: Math.round(x * 10) / 10,
      y: Math.round(y * 10) / 10,
      size: category.baseSize * (0.6 + seededRandom(i + offset + 300) * 0.4),
      category: category.name,
      cluster: seededRandom(i + offset + 400) > 0.5 ? 'A' : 'B',
    });
  }

  // Generate tertiary nodes
  offset += config.secondary;
  for (let i = 0; i < config.tertiary; i++) {
    const angle = seededRandom(i + offset) * Math.PI * 2;
    const distance = 40 + seededRandom(i + offset + 500) * 5;
    const x = 50 + Math.cos(angle) * distance;
    const y = 50 + Math.sin(angle) * distance;
    const category = categories[Math.floor(seededRandom(i + offset + 600) * categories.length)];
    
    nodes.push({
      id: `node-${offset + i}`,
      x: Math.round(x * 10) / 10,
      y: Math.round(y * 10) / 10,
      size: category.baseSize * (0.4 + seededRandom(i + offset + 700) * 0.4),
      category: category.name,
      cluster: seededRandom(i + offset + 800) > 0.5 ? 'A' : 'B',
    });
  }

  // Add some isolated nodes
  for (let i = 0; i < 5; i++) {
    const x = 10 + seededRandom(i + 1000) * 80;
    const y = 10 + seededRandom(i + 2000) * 80;
    const category = categories[Math.floor(seededRandom(i + 3000) * categories.length)];
    
    nodes.push({
      id: `isolated-${i}`,
      x: Math.round(x * 10) / 10,
      y: Math.round(y * 10) / 10,
      size: category.baseSize * 0.5,
      category: category.name,
      cluster: 'isolated',
    });
  }

  // Add some cluster-specific nodes to create denser areas
  for (let i = 0; i < 8; i++) {
    const clusterX = seededRandom(i + 4000) > 0.5 ? 20 : 80;
    const clusterY = seededRandom(i + 5000) > 0.5 ? 20 : 80;
    const x = clusterX + (seededRandom(i + 6000) - 0.5) * 15;
    const y = clusterY + (seededRandom(i + 7000) - 0.5) * 15;
    const category = categories[Math.floor(seededRandom(i + 8000) * categories.length)];
    
    nodes.push({
      id: `cluster-${i}`,
      x: Math.round(x * 10) / 10,
      y: Math.round(y * 10) / 10,
      size: category.baseSize * (0.6 + seededRandom(i + 9000) * 0.3),
      category: category.name,
      cluster: seededRandom(i + 10000) > 0.5 ? 'C' : 'D',
    });
  }

  return nodes;
};

const generateEdges = (nodes: Node[]): Edge[] => {
  const edges: Edge[] = [];
  const nodeMap = new Map<string, Node>(nodes.map(n => [n.id, n]));

  // Create edges within clusters
  const clusters = new Map<string, Node[]>();
  nodes.forEach(node => {
    if (node.cluster && node.cluster !== 'isolated') {
      if (!clusters.has(node.cluster)) {
        clusters.set(node.cluster, []);
      }
      clusters.get(node.cluster)!.push(node);
    }
  });

  // Connect nodes within same cluster
  clusters.forEach((clusterNodes, clusterId) => {
    for (let i = 0; i < clusterNodes.length; i++) {
      for (let j = i + 1; j < clusterNodes.length; j++) {
        const n1 = clusterNodes[i];
        const n2 = clusterNodes[j];
        const dx = n1.x - n2.x;
        const dy = n1.y - n2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Only connect if reasonably close
        if (distance < 25) {
          edges.push({
            from: n1.id,
            to: n2.id,
            strength: Math.max(0.1, 1 - distance / 30),
          });
        }
      }
    }
  });

  // Create some long-distance relationships
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const n1 = nodes[i];
      const n2 = nodes[j];
      const dx = n1.x - n2.x;
      const dy = n1.y - n2.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // Long-distance relationships (20-40 units apart)
      if (distance > 20 && distance < 45 && seededRandom(i * 1000 + j) > 0.7) {
        edges.push({
          from: n1.id,
          to: n2.id,
          strength: 0.3 + seededRandom(i * 1000 + j + 1) * 0.4,
        });
      }
    }
  }

  return edges;
};

const categoryColors: Record<string, string> = {
  person: tokens.color.ink,
  enterprise: tokens.color.ink,
  institution: tokens.color.muted,
  government: tokens.color.muted,
  capital: tokens.color.green,
  project: tokens.color.signal,
  policy: tokens.color.muted,
  market: tokens.color.lineStrong,
  opportunity: tokens.color.signal,
  event: tokens.color.signalDark,
  relationship: tokens.color.lineStrong,
};

export function HeroGraph({ breakpoint = 'desktop' }: HeroGraphProps) {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [focusedNode, setFocusedNode] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  
  // Generate nodes and edges
  useEffect(() => {
    const newNodes = generateNodes(breakpoint);
    const newEdges = generateEdges(newNodes);
    setNodes(newNodes);
    setEdges(newEdges);
  }, [breakpoint]);

  // Handle hover with keyboard accessibility
  const handleNodeHover = useCallback((nodeId: string | null) => {
    setHoveredNode(nodeId);
  }, []);

  const handleNodeFocus = useCallback((nodeId: string | null) => {
    setFocusedNode(nodeId);
  }, []);

  // Get connected node IDs for highlighting
  const getConnectedNodes = useCallback((nodeId: string): Set<string> => {
    const connected = new Set<string>();
    edges.forEach(edge => {
      if (edge.from === nodeId) connected.add(edge.to);
      if (edge.to === nodeId) connected.add(edge.from);
    });
    connected.add(nodeId);
    return connected;
  }, [edges]);

  // Get edges connected to a node
  const getConnectedEdges = useCallback((nodeId: string): Edge[] => {
    return edges.filter(edge => edge.from === nodeId || edge.to === nodeId);
  }, [edges]);

  // Determine if node is hovered or focused
  const isActive = useCallback((nodeId: string) => {
    return hoveredNode === nodeId || focusedNode === nodeId;
  }, [hoveredNode, focusedNode]);

  // Determine if node is connected to active node
  const isConnected = useCallback((nodeId: string) => {
    if (!hoveredNode && !focusedNode) return false;
    const activeNode = hoveredNode || focusedNode;
    if (!activeNode) return false;
    return getConnectedNodes(activeNode).has(nodeId);
  }, [hoveredNode, focusedNode, getConnectedNodes]);

  // Handle container ref for dimensions
  const containerRef = useCallback((el: HTMLDivElement | null) => {
    if (el) {
      const rect = el.getBoundingClientRect();
      setDimensions({ width: rect.width, height: rect.height });
    }
  }, []);

  // Spring animation for gentle drift
  const xDrift = useSpring(0, { stiffness: 50, damping: 20 });
  const yDrift = useSpring(0, { stiffness: 50, damping: 20 });

  // Animate drift on mount
  useEffect(() => {
    const driftInterval = setInterval(() => {
      xDrift.set(Math.sin(Date.now() / 10000) * 0.5);
      yDrift.set(Math.cos(Date.now() / 15000) * 0.5);
    }, 50);
    
    return () => clearInterval(driftInterval);
  }, [xDrift, yDrift]);

  // Node component
  const NodeComponent = ({ node }: { node: Node }) => {
    const isActiveNode = isActive(node.id);
    const isConnectedNode = isConnected(node.id);
    const color = categoryColors[node.category] || tokens.color.ink;
    
    // Calculate opacity based on state
    const opacity = isActiveNode 
      ? 1 
      : isConnectedNode 
        ? 0.6 
        : hoveredNode || focusedNode 
          ? 0.2 
          : 1;
    
    // Scale for active node
    const scale = isActiveNode ? 1.2 : 1;
    
    return (
      <motion.g
        key={node.id}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity, scale }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        onHoverStart={() => handleNodeHover(node.id)}
        onHoverEnd={() => handleNodeHover(null)}
        onTap={() => {
          if (hoveredNode === node.id) {
            handleNodeHover(null);
            handleNodeFocus(null);
          } else {
            handleNodeHover(node.id);
            handleNodeFocus(node.id);
          }
        }}
        onFocus={() => handleNodeFocus(node.id)}
        onBlur={() => handleNodeFocus(null)}
        style={{ cursor: 'pointer', transformOrigin: `${node.x}px ${node.y}px` }}
        tabIndex={0}
        role="button"
        aria-label={node.label || `Node ${node.id}`}
      >
        {/* Node circle */}
        <circle
          cx={node.x}
          cy={node.y}
          r={node.size * 2}
          fill={color}
          opacity={0.8}
        />
        
        {/* Inner highlight for active node */}
        {isActiveNode && (
          <circle
            cx={node.x}
            cy={node.y}
            r={node.size * 1.5}
            fill={tokens.color.signal}
            opacity={0.3}
          />
        )}
        
        {/* Subtle glow for connected nodes */}
        {isConnectedNode && !isActiveNode && (
          <circle
            cx={node.x}
            cy={node.y}
            r={node.size * 2.5}
            fill={color}
            opacity={0.15}
          />
        )}
        
        {/* Label - only for some nodes on desktop */}
        {breakpoint === 'desktop' && node.label && (
          <motion.text
            x={node.x}
            y={node.y + node.size * 3 + 4}
            textAnchor="middle"
            fontSize={node.size * 1.5}
            fontFamily={tokens.font.mono}
            fill={tokens.color.muted}
            letterSpacing="0.05em"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: isActiveNode || isConnectedNode ? 1 : 0, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {node.label}
          </motion.text>
        )}
      </motion.g>
    );
  };

  // Edge component
  const EdgeComponent = ({ edge }: { edge: Edge }) => {
    const fromNode = nodes.find(n => n.id === edge.from);
    const toNode = nodes.find(n => n.id === edge.to);
    
    if (!fromNode || !toNode) return null;
    
    const isActiveEdge = isConnected(edge.from) || isConnected(edge.to);
    const isDirectConnection = isActive(edge.from) || isActive(edge.to);
    
    const opacity = isDirectConnection 
      ? 1 
      : isActiveEdge 
        ? 0.4 
        : hoveredNode || focusedNode 
          ? 0.1 
          : 0.2 + edge.strength * 0.3;
    
    const strokeWidth = isDirectConnection ? 0.5 : 0.25;
    const strokeColor = isDirectConnection 
      ? tokens.color.signal 
      : tokens.color.lineStrong;
    
    return (
      <motion.path
        key={`${edge.from}-${edge.to}`}
        d={`M${fromNode.x} ${fromNode.y} L${toNode.x} ${toNode.y}`}
        fill="none"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        opacity={opacity}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      />
    );
  };

  // Add labels to some nodes for desktop
  useEffect(() => {
    if (breakpoint === 'desktop' && nodes.length > 0) {
      const nodesWithLabels = [...nodes];
      const labelCategories = ['person', 'enterprise', 'capital', 'project', 'policy', 'institution'];
      
      // Add labels to a few representative nodes
      for (let i = 0; i < Math.min(6, nodesWithLabels.length); i++) {
        const category = labelCategories[i % labelCategories.length];
        const node = nodesWithLabels[i];
        if (node) {
          node.label = category.toUpperCase();
        }
      }
      
      setNodes(nodesWithLabels);
    }
  }, [breakpoint]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'visible',
      }}
    >
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      >
        {/* Background */}
        <rect x="0" y="0" width="100" height="100" fill="transparent" />
        
        {/* Edges first (so nodes appear on top) */}
        {edges.map((edge, index) => (
          <EdgeComponent key={`${edge.from}-${edge.to}-${index}`} edge={edge} />
        ))}
        
        {/* Nodes */}
        {nodes.map((node, index) => (
          <NodeComponent key={node.id} node={node} />
        ))}
        
        {/* Subtle grid lines for spatial reference */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.05 }}
          transition={{ duration: 1 }}
        >
          <line x1="0" y1="25" x2="100" y2="25" stroke={tokens.color.line} strokeWidth="0.1" />
          <line x1="0" y1="50" x2="100" y2="50" stroke={tokens.color.line} strokeWidth="0.1" />
          <line x1="0" y1="75" x2="100" y2="75" stroke={tokens.color.line} strokeWidth="0.1" />
          <line x1="25" y1="0" x2="25" y2="100" stroke={tokens.color.line} strokeWidth="0.1" />
          <line x1="50" y1="0" x2="50" y2="100" stroke={tokens.color.line} strokeWidth="0.1" />
          <line x1="75" y1="0" x2="75" y2="100" stroke={tokens.color.line} strokeWidth="0.1" />
        </motion.g>
      </svg>
      
      {/* Accessibility hint */}
      <div
        role="status"
        aria-live="polite"
        style={{
          position: 'absolute',
          top: '-1000px',
          left: '0',
          width: '1px',
          height: '1px',
          overflow: 'hidden',
        }}
      >
        {hoveredNode || focusedNode 
          ? `Node ${hoveredNode || focusedNode} selected. Use tab to navigate, arrow keys to move.`
          : 'Interactive knowledge graph. Hover or tap nodes to see connections.'}
      </div>
    </div>
  );
}
