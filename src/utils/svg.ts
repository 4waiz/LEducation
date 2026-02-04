import type { DiagramShape } from '../types';

const strokeColor = '#e7ebee';
const accentColor = '#b8ff4d';

const shapeToSvg = (shape: DiagramShape) => {
  switch (shape.type) {
    case 'line':
      return `<line x1="${shape.x1}" y1="${shape.y1}" x2="${shape.x2}" y2="${shape.y2}" />`;
    case 'rect':
      return `<rect x="${shape.x}" y="${shape.y}" width="${shape.width}" height="${shape.height}" rx="6" />`;
    case 'circle':
      return `<circle cx="${shape.cx}" cy="${shape.cy}" r="${shape.r}" />`;
    case 'arrow':
      return `<line x1="${shape.x1}" y1="${shape.y1}" x2="${shape.x2}" y2="${shape.y2}" marker-end="url(#arrow)" />`;
    case 'path':
      return `<path d="${shape.d}" />`;
    default:
      return '';
  }
};

export const buildSvg = (shapes: DiagramShape[], width: number, height: number) => {
  const body = shapes.map(shapeToSvg).join('');
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" stroke="${strokeColor}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
  <defs>
    <marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto" markerUnits="strokeWidth">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="${accentColor}" />
    </marker>
  </defs>
  ${body}
</svg>`;
};

export const downloadSvgAsPng = async (svgText: string, filename: string) => {
  const svgBlob = new Blob([svgText], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(svgBlob);
  const img = new Image();
  const cleanup = () => URL.revokeObjectURL(url);

  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = () => reject(new Error('Failed to load SVG image.'));
    img.src = url;
  });

  const canvas = document.createElement('canvas');
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    cleanup();
    return;
  }
  ctx.fillStyle = 'rgba(7, 13, 22, 1)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0);

  canvas.toBlob((blob) => {
    if (!blob) {
      cleanup();
      return;
    }
    const pngUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = pngUrl;
    link.download = filename;
    link.click();
    setTimeout(() => URL.revokeObjectURL(pngUrl), 1000);
    cleanup();
  }, 'image/png');
};

