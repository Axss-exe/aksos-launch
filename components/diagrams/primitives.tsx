'use client';

import { motion, MotionProps } from 'framer-motion';
import { ReactNode, useEffect, useState, useMemo } from 'react';
import { tokens } from '@/lib/design-tokens';

// =============================================================================
// DIAGRAM PRIMITIVES
// Reusable, geometry-aware, responsive components for building all AKSOS diagrams
// =============================================================================

// ----------------------------------------------------------------------------
// Geometry Utilities
// ----------------------------------------------------------------------------

export interface Point {
  x: number;
  y: number;
}

export interface Bounds {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface DiagramLayout {
  viewBox: { width: number; height: number };
  safeArea: Bounds;
  focalPoint: Point;
  contentZones: Bounds[];
  minSpacing: number;
  internalPadding: number;
}

export interface ResponsiveLayout {
  desktop: DiagramLayout;
  mobile?: DiagramLayout;
  tablet?: DiagramLayout;
}

// Breakpoints for responsive behavior
const BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
  desktop: 1440,
};

// Hook to detect current breakpoint
export function useBreakpoint(): 'mobile' | 'tablet' | 'desktop' {
  const [breakpoint, setBreakpoint] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    function handleResize() {
      const width = window.innerWidth;
      if (width < BREAKPOINTS.mobile) {
        setBreakpoint('mobile');
      } else if (width < BREAKPOINTS.tablet) {
        setBreakpoint('tablet');
      } else {
        setBreakpoint('desktop');
      }
    }
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return breakpoint;
}

// Hook to get viewport dimensions
export function useViewportDimensions(): { width: number; height: number } {
  const [dimensions, setDimensions] = useState({ width: 1440, height: 900 });
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    function handleResize() {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    }
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return dimensions;
}

/**
 * Calculate text dimensions based on character count and font size
 * Approximation for IBM Plex Mono (monospace)
 */
export function calculateTextDimensions(
  text: string,
  fontSize: number = 5,
  letterSpacing: number = 0.1
): { width: number; height: number } {
  const charWidth = fontSize * 0.6; // Approximate monospace character width
  const lineHeight = fontSize * 1.4;
  
  const spacingMultiplier = 1 + (letterSpacing * 0.5);
  const width = (text.length * charWidth) * spacingMultiplier;
  const height = lineHeight;
  
  return { width, height };
}

/**
 * Calculate multi-line text dimensions
 */
export function calculateMultilineTextDimensions(
  lines: string[],
  fontSize: number = 5,
  letterSpacing: number = 0.1
): { width: number; height: number } {
  const charWidth = fontSize * 0.6;
  const lineHeight = fontSize * 1.4;
  const spacingMultiplier = 1 + (letterSpacing * 0.5);
  
  const maxLineWidth = Math.max(...lines.map(line => line.length * charWidth * spacingMultiplier));
  const height = lines.length * lineHeight;
  
  return { width: maxLineWidth, height };
}

/**
 * Check if two bounds overlap
 */
export function boundsOverlap(a: Bounds, b: Bounds, padding: number = 0): boolean {
  return !(
    a.x + a.width + padding < b.x ||
    b.x + b.width + padding < a.x ||
    a.y + a.height + padding < b.y ||
    b.y + b.height + padding < a.y
  );
}

/**
 * Check if a point is inside a circular exclusion zone
 */
export function pointInExclusionZone(point: Point, center: Point, radius: number): boolean {
  const dx = point.x - center.x;
  const dy = point.y - center.y;
  return Math.sqrt(dx * dx + dy * dy) < radius;
}

/**
 * Check if a line intersects a circular exclusion zone
 */
export function lineIntersectsCircle(
  lineStart: Point,
  lineEnd: Point,
  center: Point,
  radius: number
): boolean {
  // Vector from line start to end
  const dx = lineEnd.x - lineStart.x;
  const dy = lineEnd.y - lineStart.y;
  
  // Vector from line start to circle center
  const fx = lineStart.x - center.x;
  const fy = lineStart.y - center.y;
  
  const a = dx * dx + dy * dy;
  const b = 2 * (fx * dx + fy * dy);
  const c = fx * fx + fy * fy - radius * radius;
  
  const discriminant = b * b - 4 * a * c;
  
  if (discriminant < 0) return false;
  
  const t1 = (-b + Math.sqrt(discriminant)) / (2 * a);
  const t2 = (-b - Math.sqrt(discriminant)) / (2 * a);
  
  return (t1 >= 0 && t1 <= 1) || (t2 >= 0 && t2 <= 1);
}

/**
 * Calculate endpoint for a line that avoids a circular exclusion zone
 * Returns the point where the line should terminate
 */
export function calculateTangentPoint(
  from: Point,
  to: Point,
  center: Point,
  radius: number
): Point {
  // Vector from center to 'to' point
  const cx = to.x - center.x;
  const cy = to.y - center.y;
  
  // Normalize and scale to radius
  const length = Math.sqrt(cx * cx + cy * cy);
  if (length === 0) return to;
  
  return {
    x: center.x + (cx / length) * radius,
    y: center.y + (cy / length) * radius
  };
}

/**
 * Generate a curved path that avoids the center exclusion zone
 */
export function generateCurvedPath(
  start: Point,
  end: Point,
  center: Point,
  radius: number,
  curvature: number = 0.3
): string {
  const midX = (start.x + end.x) / 2;
  const midY = (start.y + end.y) / 2;
  
  // Calculate control point to curve around center
  const directionX = Math.sign(midX - center.x);
  const directionY = Math.sign(midY - center.y);
  
  const controlOffset = radius * curvature * Math.max(
    Math.abs(midX - center.x),
    Math.abs(midY - center.y)
  ) / Math.sqrt((midX - center.x) ** 2 + (midY - center.y) ** 2);
  
  const controlPoint = {
    x: midX + directionX * controlOffset,
    y: midY + directionY * controlOffset
  };
  
  return `M ${start.x} ${start.y} Q ${controlPoint.x} ${controlPoint.y} ${end.x} ${end.y}`;
}

// ----------------------------------------------------------------------------
// Diagram Container - Responsive version
// ----------------------------------------------------------------------------

export interface DiagramContainerProps {
  children: ReactNode;
  viewBox?: { width: number; height: number };
  aspectRatio?: number;
  minHeight?: number;
  className?: string;
  layout?: DiagramLayout;
  mobileAspectRatio?: number;
  tabletAspectRatio?: number;
}

export function DiagramContainer({
  children,
  viewBox = { width: 100, height: 100 },
  aspectRatio = 1,
  minHeight = 300,
  className,
  layout,
  mobileAspectRatio,
  tabletAspectRatio,
}: DiagramContainerProps) {
  const breakpoint = useBreakpoint();
  
  // Determine aspect ratio based on breakpoint
  const getAspectRatio = () => {
    switch (breakpoint) {
      case 'mobile':
        return mobileAspectRatio || aspectRatio * 1.5; // Mobile often needs taller
      case 'tablet':
        return tabletAspectRatio || aspectRatio * 1.2; // Tablet slightly taller
      default:
        return aspectRatio;
    }
  };
  
  const currentAspectRatio = getAspectRatio();
  
  // Calculate padding-bottom percentage for aspect-ratio technique
  const paddingBottom = (1 / currentAspectRatio) * 100;
  
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: tokens.animation.duration.slow }}
      style={{
        position: 'relative',
        width: '100%',
        minHeight: `${minHeight}px`,
        aspectRatio: currentAspectRatio,
      }}
    >
      <svg
        viewBox={`0 0 ${viewBox.width} ${viewBox.height}`}
        preserveAspectRatio="xMidYMid meet"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      >
        {children}
      </svg>
    </motion.div>
  );
}

// ----------------------------------------------------------------------------
// Diagram Node
// ----------------------------------------------------------------------------

export interface DiagramNodeProps {
  x: number;
  y: number;
  r?: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  label?: string;
  labelPosition?: 'top' | 'bottom' | 'left' | 'right' | 'center';
  labelOffset?: number;
  labelFontSize?: number;
  labelColor?: string;
  hoverable?: boolean;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
  animate?: MotionProps['animate'];
  transition?: MotionProps['transition'];
  whileHover?: MotionProps['whileHover'];
  initial?: MotionProps['initial'];
  whileInView?: MotionProps['whileInView'];
  viewport?: MotionProps['viewport'];
  exclusionZone?: { center: Point; radius: number };
}

export function DiagramNode({
  x,
  y,
  r = 2,
  fill = tokens.color.ink,
  stroke = tokens.color.line,
  strokeWidth = 0.3,
  label,
  labelPosition = 'bottom',
  labelOffset = 8,
  labelFontSize = 5,
  labelColor = tokens.color.muted,
  hoverable = false,
  onHoverStart,
  onHoverEnd,
  animate,
  transition,
  whileHover,
  initial,
  whileInView,
  viewport,
  exclusionZone,
}: DiagramNodeProps) {
  // Calculate label position
  const getLabelPosition = () => {
    switch (labelPosition) {
      case 'top':
        return { x, y: y - labelOffset, anchor: 'middle' as const, dy: 0 };
      case 'bottom':
        return { x, y: y + labelOffset, anchor: 'middle' as const, dy: 0 };
      case 'left':
        return { x: x - labelOffset, y, anchor: 'end' as const, dy: 3 };
      case 'right':
        return { x: x + labelOffset, y, anchor: 'start' as const, dy: 3 };
      case 'center':
      default:
        return { x, y, anchor: 'middle' as const, dy: 0 };
    }
  };
  
  const labelPos = getLabelPosition();
  
  // Calculate label dimensions for collision detection
  const labelDims = label ? calculateTextDimensions(label, labelFontSize) : { width: 0, height: 0 };
  
  // Check if node or label is in exclusion zone
  const inExclusionZone = exclusionZone && (
    pointInExclusionZone({ x, y }, exclusionZone.center, exclusionZone.radius) ||
    (label && pointInExclusionZone({ x: labelPos.x, y: labelPos.y }, exclusionZone.center, exclusionZone.radius))
  );
  
  // If in exclusion zone, don't render (caller should handle repositioning)
  if (inExclusionZone) {
    return null;
  }
  
  const nodeProps: MotionProps = {
    initial,
    whileInView,
    viewport,
    animate,
    transition,
    whileHover,
  };
  
  return (
    <motion.g
      {...nodeProps}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
    >
      <circle
        cx={x}
        cy={y}
        r={r}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
      {label && (
        <text
          x={labelPos.x}
          y={labelPos.y}
          textAnchor={labelPos.anchor}
          dy={labelPos.dy}
          fontSize={labelFontSize}
          fontFamily={tokens.font.mono}
          fill={labelColor}
          letterSpacing="0.1em"
        >
          {label}
        </text>
      )}
    </motion.g>
  );
}

// ----------------------------------------------------------------------------
// Diagram Label
// ----------------------------------------------------------------------------

export interface DiagramLabelProps {
  x: number;
  y: number;
  text: string;
  textAnchor?: 'start' | 'middle' | 'end';
  fontSize?: number;
  fontFamily?: string;
  fill?: string;
  letterSpacing?: number;
  dy?: number;
  maxWidth?: number;
  lineHeight?: number;
  background?: boolean;
  backgroundColor?: string;
  padding?: number;
  rotate?: number;
  animate?: MotionProps['animate'];
  transition?: MotionProps['transition'];
  initial?: MotionProps['initial'];
  whileInView?: MotionProps['whileInView'];
  viewport?: MotionProps['viewport'];
}

export function DiagramLabel({
  x,
  y,
  text,
  textAnchor = 'middle',
  fontSize = 5,
  fontFamily = tokens.font.mono,
  fill = tokens.color.muted,
  letterSpacing = 0.1,
  dy = 0,
  maxWidth,
  lineHeight,
  background = false,
  backgroundColor = tokens.color.paper,
  padding = 2,
  rotate = 0,
  animate,
  transition,
  initial,
  whileInView,
  viewport,
}: DiagramLabelProps) {
  const labelProps: MotionProps = {
    initial,
    whileInView,
    viewport,
    animate,
    transition,
  };
  
  // Handle multi-line text if maxWidth is specified
  if (maxWidth && text.includes(' ')) {
    // This is a simplified approach - for production, use proper text wrapping
    const words = text.split(' ');
    const avgCharWidth = fontSize * 0.6 * (1 + letterSpacing * 0.5);
    const charsPerLine = Math.floor(maxWidth / avgCharWidth);
    
    // For now, just render single line with ellipsis if too long
    const displayText = text.length * avgCharWidth > maxWidth 
      ? text.substring(0, Math.floor(maxWidth / avgCharWidth)) + '\u2026' 
      : text;
    
    return (
      <motion.text
        {...labelProps}
        x={x}
        y={y}
        textAnchor={textAnchor}
        dy={dy}
        fontSize={fontSize}
        fontFamily={fontFamily}
        fill={fill}
        letterSpacing={`${letterSpacing}em`}
        rotate={rotate}
      >
        {displayText}
      </motion.text>
    );
  }
  
  return (
    <motion.text
      {...labelProps}
      x={x}
      y={y}
      textAnchor={textAnchor}
      dy={dy}
      fontSize={fontSize}
      fontFamily={fontFamily}
      fill={fill}
      letterSpacing={`${letterSpacing}em`}
      rotate={rotate}
    >
      {text}
    </motion.text>
  );
}

// ----------------------------------------------------------------------------
// Diagram Connection
// ----------------------------------------------------------------------------

export interface DiagramConnectionProps {
  from: Point;
  to: Point;
  stroke?: string;
  strokeWidth?: number;
  strokeDasharray?: string;
  strokeDashoffset?: number;
  pathLength?: number;
  curved?: boolean;
  curvature?: number;
  exclusionZone?: { center: Point; radius: number };
  animate?: MotionProps['animate'];
  transition?: MotionProps['transition'];
  initial?: MotionProps['initial'];
  whileInView?: MotionProps['whileInView'];
  viewport?: MotionProps['viewport'];
  whileHover?: MotionProps['whileHover'];
}

export function DiagramConnection({
  from,
  to,
  stroke = tokens.color.line,
  strokeWidth = 0.2,
  strokeDasharray,
  strokeDashoffset,
  pathLength,
  curved = false,
  curvature = 0.3,
  exclusionZone,
  animate,
  transition,
  initial,
  whileInView,
  viewport,
  whileHover,
}: DiagramConnectionProps) {
  const connectionProps: MotionProps = {
    initial,
    whileInView,
    viewport,
    animate,
    transition,
    whileHover,
  };
  
  // Check if line intersects exclusion zone
  const intersectsExclusion = exclusionZone && 
    lineIntersectsCircle(from, to, exclusionZone.center, exclusionZone.radius);
  
  if (intersectsExclusion && exclusionZone) {
    // Calculate tangent points to avoid exclusion zone
    const fromTangent = calculateTangentPoint(from, to, exclusionZone.center, exclusionZone.radius);
    const toTangent = calculateTangentPoint(to, from, exclusionZone.center, exclusionZone.radius);
    
    // Use curved path around exclusion zone
    const path = generateCurvedPath(fromTangent, toTangent, exclusionZone.center, exclusionZone.radius, curvature);
    
    return (
      <motion.path
        {...connectionProps}
        d={path}
        fill="none"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeDasharray={strokeDasharray}
        strokeDashoffset={strokeDashoffset}
      />
    );
  }
  
  if (curved) {
    const midX = (from.x + to.x) / 2;
    const midY = (from.y + to.y) / 2;
    const controlOffset = Math.abs(from.x - to.x) * curvature;
    const controlPoint = { x: midX, y: midY - controlOffset };
    
    const path = `M ${from.x} ${from.y} Q ${controlPoint.x} ${controlPoint.y} ${to.x} ${to.y}`;
    
    return (
      <motion.path
        {...connectionProps}
        d={path}
        fill="none"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeDasharray={strokeDasharray}
        strokeDashoffset={strokeDashoffset}
      />
    );
  }
  
  // Straight line
  return (
    <motion.line
      {...connectionProps}
      x1={from.x}
      y1={from.y}
      x2={to.x}
      y2={to.y}
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeDasharray={strokeDasharray}
      strokeDashoffset={strokeDashoffset}
    />
  );
}

// ----------------------------------------------------------------------------
// Diagram Arrow - Proper SVG arrow implementation
// ----------------------------------------------------------------------------

export interface DiagramArrowProps {
  x: number;
  y: number;
  direction?: 'up' | 'down' | 'left' | 'right' | number; // number = custom angle in degrees
  size?: number;
  stroke?: string;
  strokeWidth?: number;
  fill?: string;
  animate?: MotionProps['animate'];
  transition?: MotionProps['transition'];
  initial?: MotionProps['initial'];
  whileInView?: MotionProps['whileInView'];
  viewport?: MotionProps['viewport'];
}

// SVG Arrow marker definition (can be used with strokeLinecap or as separate element)
export function DiagramArrow({
  x,
  y,
  direction = 'right',
  size = 6,
  stroke = tokens.color.muted,
  strokeWidth = 0.3,
  fill = 'none',
  animate,
  transition,
  initial,
  whileInView,
  viewport,
}: DiagramArrowProps) {
  const arrowProps: MotionProps = {
    initial,
    whileInView,
    viewport,
    animate,
    transition,
  };
  
  // Calculate arrow points based on direction
  const getArrowPoints = () => {
    const halfSize = size / 2;
    
    switch (direction) {
      case 'up':
        return [
          { x: x, y: y - halfSize },
          { x: x - halfSize, y: y + halfSize },
          { x: x + halfSize, y: y + halfSize },
        ];
      case 'down':
        return [
          { x: x, y: y + halfSize },
          { x: x - halfSize, y: y - halfSize },
          { x: x + halfSize, y: y - halfSize },
        ];
      case 'left':
        return [
          { x: x - halfSize, y: y },
          { x: x + halfSize, y: y - halfSize },
          { x: x + halfSize, y: y + halfSize },
        ];
      case 'right':
      default:
        return [
          { x: x + halfSize, y: y },
          { x: x - halfSize, y: y - halfSize },
          { x: x - halfSize, y: y + halfSize },
        ];
    }
  };
  
  const points = getArrowPoints();
  const path = points.map((p, i) => i === 0 ? `M ${p.x} ${p.y}` : ` L ${p.x} ${p.y}`).join('') + ' Z';
  
  return (
    <motion.path
      {...arrowProps}
      d={path}
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
    />
  );
}

// ----------------------------------------------------------------------------
// Diagram Badge
// ----------------------------------------------------------------------------

export interface DiagramBadgeProps {
  x: number;
  y: number;
  text: string;
  width?: number;
  height?: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  fontSize?: number;
  fontFamily?: string;
  textColor?: string;
  letterSpacing?: number;
  animate?: MotionProps['animate'];
  transition?: MotionProps['transition'];
  initial?: MotionProps['initial'];
  whileInView?: MotionProps['whileInView'];
  viewport?: MotionProps['viewport'];
  whileHover?: MotionProps['whileHover'];
}

export function DiagramBadge({
  x,
  y,
  text,
  width = 20,
  height = 12,
  fill = 'none',
  stroke = tokens.color.line,
  strokeWidth = 0.3,
  fontSize = 5,
  fontFamily = tokens.font.mono,
  textColor = tokens.color.muted,
  letterSpacing = 0.1,
  animate,
  transition,
  initial,
  whileInView,
  viewport,
  whileHover,
}: DiagramBadgeProps) {
  const badgeProps: MotionProps = {
    initial,
    whileInView,
    viewport,
    animate,
    transition,
    whileHover,
  };
  
  const centerX = x - width / 2;
  const centerY = y - height / 2;
  
  return (
    <motion.g {...badgeProps}>
      <rect
        x={centerX}
        y={centerY}
        width={width}
        height={height}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
      <text
        x={x}
        y={y}
        textAnchor="middle"
        dy={-1}
        fontSize={fontSize}
        fontFamily={fontFamily}
        fill={textColor}
        letterSpacing={`${letterSpacing}em`}
      >
        {text}
      </text>
    </motion.g>
  );
}

// ----------------------------------------------------------------------------
// Diagram Group
// ----------------------------------------------------------------------------

export interface DiagramGroupProps {
  children: ReactNode;
  x?: number;
  y?: number;
  transform?: string;
  animate?: MotionProps['animate'];
  transition?: MotionProps['transition'];
  initial?: MotionProps['initial'];
  whileInView?: MotionProps['whileInView'];
  viewport?: MotionProps['viewport'];
  whileHover?: MotionProps['whileHover'];
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
}

export function DiagramGroup({
  children,
  x,
  y,
  transform,
  animate,
  transition,
  initial,
  whileInView,
  viewport,
  whileHover,
  onHoverStart,
  onHoverEnd,
}: DiagramGroupProps) {
  const groupProps: MotionProps = {
    initial,
    whileInView,
    viewport,
    animate,
    transition,
    whileHover,
  };
  
  return (
    <motion.g
      {...groupProps}
      transform={transform || (x !== undefined || y !== undefined ? `translate(${x || 0}, ${y || 0})` : undefined)}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
    >
      {children}
    </motion.g>
  );
}

// ----------------------------------------------------------------------------
// Arrow Marker (for use with stroke-linecap or as path marker)
// ----------------------------------------------------------------------------

export function createArrowMarker(
  id: string,
  size: number = 6,
  stroke: string = tokens.color.muted,
  strokeWidth: number = 0.3
): ReactNode {
  const halfSize = size / 2;
  const points = [
    { x: 0, y: -halfSize },
    { x: -size, y: 0 },
    { x: 0, y: halfSize },
  ];
  const path = points.map((p, i) => i === 0 ? `M ${p.x} ${p.y}` : ` L ${p.x} ${p.y}`).join('') + ' Z';
  
  return (
    <marker
      id={id}
      viewBox={`-${size} ${-halfSize} ${size} ${size}`}
      refX={0}
      refY={0}
      markerWidth={size}
      markerHeight={size}
      orient="auto"
    >
      <path
        d={path}
        fill="none"
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
    </marker>
  );
}

// ----------------------------------------------------------------------------
// Layout Utilities
// ----------------------------------------------------------------------------

/**
 * Create a layout model for a diagram
 */
export function createDiagramLayout(
  viewBoxWidth: number = 100,
  viewBoxHeight: number = 100,
  safeMargin: number = 5,
  focalPoint: Point = { x: 50, y: 50 }
): DiagramLayout {
  return {
    viewBox: { width: viewBoxWidth, height: viewBoxHeight },
    safeArea: {
      x: safeMargin,
      y: safeMargin,
      width: viewBoxWidth - safeMargin * 2,
      height: viewBoxHeight - safeMargin * 2,
    },
    focalPoint,
    contentZones: [],
    minSpacing: 2,
    internalPadding: safeMargin,
  };
}

/**
 * Calculate positions for nodes on a circle
 */
export function calculateCircularPositions(
  center: Point,
  radius: number,
  count: number,
  startAngle: number = 0
): Point[] {
  const positions: Point[] = [];
  const angleStep = (2 * Math.PI) / count;
  
  for (let i = 0; i < count; i++) {
    const angle = startAngle + i * angleStep;
    positions.push({
      x: center.x + radius * Math.cos(angle),
      y: center.y + radius * Math.sin(angle),
    });
  }
  
  return positions;
}

/**
 * Calculate positions for a horizontal flow
 */
export function calculateHorizontalFlowPositions(
  startX: number,
  startY: number,
  items: { width?: number }[],
  spacing: number = 10
): Point[] {
  const positions: Point[] = [];
  let currentX = startX;
  
  for (const item of items) {
    positions.push({ x: currentX, y: startY });
    currentX += (item.width || 10) + spacing;
  }
  
  return positions;
}

/**
 * Calculate positions for a vertical stack
 */
export function calculateVerticalStackPositions(
  startX: number,
  startY: number,
  items: { height?: number }[],
  spacing: number = 5
): Point[] {
  const positions: Point[] = [];
  let currentY = startY;
  
  for (const item of items) {
    positions.push({ x: startX, y: currentY });
    currentY += (item.height || 10) + spacing;
  }
  
  return positions;
}

// ----------------------------------------------------------------------------
// Responsive Layout Utilities
// ----------------------------------------------------------------------------

/**
 * Create a responsive layout that adapts to viewport size
 */
export function createResponsiveLayout(
  desktopLayout: DiagramLayout,
  mobileLayout?: Partial<DiagramLayout>,
  tabletLayout?: Partial<DiagramLayout>
): ResponsiveLayout {
  return {
    desktop: desktopLayout,
    mobile: mobileLayout ? { ...desktopLayout, ...mobileLayout } : undefined,
    tablet: tabletLayout ? { ...desktopLayout, ...tabletLayout } : undefined,
  };
}

/**
 * Get the appropriate layout for current breakpoint
 */
export function getResponsiveLayout(
  responsiveLayout: ResponsiveLayout,
  breakpoint: 'mobile' | 'tablet' | 'desktop'
): DiagramLayout {
  switch (breakpoint) {
    case 'mobile':
      return responsiveLayout.mobile || responsiveLayout.desktop;
    case 'tablet':
      return responsiveLayout.tablet || responsiveLayout.desktop;
    default:
      return responsiveLayout.desktop;
  }
}

/**
 * Calculate responsive viewBox dimensions
 */
export function calculateResponsiveViewBox(
  baseWidth: number = 100,
  baseHeight: number = 100,
  breakpoint: 'mobile' | 'tablet' | 'desktop'
): { width: number; height: number } {
  // For mobile, we might want a taller viewBox for vertical diagrams
  switch (breakpoint) {
    case 'mobile':
      return { width: baseWidth, height: baseHeight * 1.5 };
    case 'tablet':
      return { width: baseWidth, height: baseHeight * 1.2 };
    default:
      return { width: baseWidth, height: baseHeight };
  }
}

// ----------------------------------------------------------------------------
// Responsive Position Utilities
// ----------------------------------------------------------------------------

/**
 * Get mobile-optimized positions for a horizontal flow (converts to vertical)
 */
export function getMobileFlowPositions(
  items: Point[],
  centerX: number,
  startY: number,
  spacing: number = 15
): Point[] {
  return items.map((_, index) => ({
    x: centerX,
    y: startY + index * spacing,
  }));
}

/**
 * Get mobile-optimized positions for a radial layout (converts to vertical)
 */
export function getMobileRadialPositions(
  rings: { r: number; nodes: Point[] }[],
  centerX: number,
  startY: number
): { r: number; nodes: Point[] }[] {
  let currentY = startY;
  const spacing = 15;
  
  return rings.map(ring => {
    const positions = ring.nodes.map(() => ({
      x: centerX,
      y: currentY,
    }));
    currentY += ring.nodes.length * spacing + spacing;
    return { r: ring.r, nodes: positions };
  });
}
