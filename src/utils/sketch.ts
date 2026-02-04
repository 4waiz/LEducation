import type { DiagramShape, Point } from '../types';

const toFixed = (value: number) => Number(value.toFixed(1));

const distance = (a: Point, b: Point) => Math.hypot(a.x - b.x, a.y - b.y);

const perpendicularDistance = (point: Point, lineStart: Point, lineEnd: Point) => {
  const dx = lineEnd.x - lineStart.x;
  const dy = lineEnd.y - lineStart.y;
  if (dx === 0 && dy === 0) return distance(point, lineStart);
  const t = ((point.x - lineStart.x) * dx + (point.y - lineStart.y) * dy) / (dx * dx + dy * dy);
  const proj = { x: lineStart.x + t * dx, y: lineStart.y + t * dy };
  return distance(point, proj);
};

export const simplifyPoints = (points: Point[], epsilon = 2.5): Point[] => {
  if (points.length < 3) return points;
  let dmax = 0;
  let index = 0;
  const end = points.length - 1;
  for (let i = 1; i < end; i += 1) {
    const d = perpendicularDistance(points[i], points[0], points[end]);
    if (d > dmax) {
      index = i;
      dmax = d;
    }
  }
  if (dmax > epsilon) {
    const rec1 = simplifyPoints(points.slice(0, index + 1), epsilon);
    const rec2 = simplifyPoints(points.slice(index, points.length), epsilon);
    return [...rec1.slice(0, -1), ...rec2];
  }
  return [points[0], points[end]];
};

export const smoothPath = (points: Point[]): string => {
  if (points.length < 2) return '';
  const first = points[0];
  let d = `M ${toFixed(first.x)} ${toFixed(first.y)}`;
  for (let i = 1; i < points.length - 1; i += 1) {
    const p1 = points[i];
    const p2 = points[i + 1];
    const mid = { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 };
    d += ` Q ${toFixed(p1.x)} ${toFixed(p1.y)} ${toFixed(mid.x)} ${toFixed(mid.y)}`;
  }
  const last = points[points.length - 1];
  d += ` L ${toFixed(last.x)} ${toFixed(last.y)}`;
  return d;
};

const boundingBox = (points: Point[]) => {
  const xs = points.map((p) => p.x);
  const ys = points.map((p) => p.y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  return { minX, maxX, minY, maxY, width: maxX - minX, height: maxY - minY };
};

const isClosed = (points: Point[], threshold = 12) =>
  distance(points[0], points[points.length - 1]) < threshold;

const isLineLike = (points: Point[], tolerance = 6) => {
  if (points.length < 2) return false;
  const start = points[0];
  const end = points[points.length - 1];
  let max = 0;
  for (const point of points) {
    max = Math.max(max, perpendicularDistance(point, start, end));
  }
  return max <= tolerance && distance(start, end) > 30;
};

const isRectangleLike = (points: Point[]) => {
  if (!isClosed(points)) return false;
  const { minX, maxX, minY, maxY, width, height } = boundingBox(points);
  if (width < 30 || height < 30) return false;
  const edgeTolerance = 8;
  for (const p of points) {
    const d = Math.min(
      Math.abs(p.x - minX),
      Math.abs(p.x - maxX),
      Math.abs(p.y - minY),
      Math.abs(p.y - maxY)
    );
    if (d > edgeTolerance) return false;
  }
  return true;
};

const isCircleLike = (points: Point[]) => {
  if (!isClosed(points)) return false;
  const { minX, maxX, minY, maxY, width, height } = boundingBox(points);
  if (width < 24 || height < 24) return false;
  const aspect = width / height;
  if (aspect < 0.75 || aspect > 1.25) return false;
  const center = { x: (minX + maxX) / 2, y: (minY + maxY) / 2 };
  const radii = points.map((p) => distance(p, center));
  const avg = radii.reduce((a, b) => a + b, 0) / radii.length;
  const variance =
    radii.reduce((a, b) => a + Math.pow(b - avg, 2), 0) / (radii.length || 1);
  return Math.sqrt(variance) / avg < 0.18;
};

const isArrowLike = (points: Point[]) => {
  if (isClosed(points)) return false;
  if (points.length < 6) return false;
  const shaftPoints = points.slice(0, -3);
  if (!isLineLike(shaftPoints, 5)) return false;
  const a = points[points.length - 3];
  const b = points[points.length - 2];
  const c = points[points.length - 1];
  const ab = { x: b.x - a.x, y: b.y - a.y };
  const bc = { x: c.x - b.x, y: c.y - b.y };
  const dot = ab.x * bc.x + ab.y * bc.y;
  const mag = Math.hypot(ab.x, ab.y) * Math.hypot(bc.x, bc.y);
  if (mag === 0) return false;
  const angle = Math.acos(Math.min(Math.max(dot / mag, -1), 1));
  return angle < 2.3;
};

export const detectShape = (points: Point[]): DiagramShape | null => {
  if (points.length < 2) return null;
  if (isArrowLike(points)) {
    const start = points[0];
    const end = points[points.length - 1];
    return { type: 'arrow', x1: start.x, y1: start.y, x2: end.x, y2: end.y, headSize: 14 };
  }
  if (isRectangleLike(points)) {
    const { minX, minY, width, height } = boundingBox(points);
    return { type: 'rect', x: minX, y: minY, width, height };
  }
  if (isCircleLike(points)) {
    const { minX, maxX, minY, maxY } = boundingBox(points);
    const cx = (minX + maxX) / 2;
    const cy = (minY + maxY) / 2;
    const r = Math.min(maxX - minX, maxY - minY) / 2;
    return { type: 'circle', cx, cy, r };
  }
  if (isLineLike(points)) {
    const start = points[0];
    const end = points[points.length - 1];
    return { type: 'line', x1: start.x, y1: start.y, x2: end.x, y2: end.y };
  }
  return null;
};

export const diagramizeStroke = (points: Point[]): DiagramShape => {
  const simplified = simplifyPoints(points, 2.8);
  const shape = detectShape(simplified);
  if (shape) return shape;
  const path = smoothPath(simplified);
  return { type: 'path', d: path };
};

