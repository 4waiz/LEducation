import { motion } from 'framer-motion';
import { useEffect, useRef, useState, type PointerEvent } from 'react';
import { useMotionDurations } from '../hooks/useMotionDurations';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import type { Point, Stroke } from '../types';
import { diagramizeStroke } from '../utils/sketch';
import { buildSvg } from '../utils/svg';

const strokeId = () => Math.random().toString(36).slice(2, 10);

const distance = (a: Point, b: Point) => Math.hypot(a.x - b.x, a.y - b.y);

const strokesIntersect = (stroke: Stroke, eraserPoints: Point[], radius: number) => {
  for (const point of stroke.points) {
    for (const eraser of eraserPoints) {
      if (distance(point, eraser) <= radius) return true;
    }
  }
  return false;
};

const drawStroke = (ctx: CanvasRenderingContext2D, stroke: Stroke) => {
  if (stroke.points.length < 2) return;
  ctx.save();
  ctx.lineWidth = stroke.width;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  if (stroke.eraser) {
    ctx.globalCompositeOperation = 'destination-out';
    ctx.strokeStyle = 'rgba(0,0,0,1)';
  } else {
    ctx.strokeStyle = '#e7ebee';
  }
  ctx.beginPath();
  ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
  for (let i = 1; i < stroke.points.length; i += 1) {
    const p = stroke.points[i];
    ctx.lineTo(p.x, p.y);
  }
  ctx.stroke();
  ctx.restore();
};

const buildTemplateStrokes = (
  template: 'flowchart' | 'mindmap' | 'geometry',
  width: number,
  height: number
): Stroke[] => {
  const baseStroke = (points: Point[]): Stroke => ({
    id: strokeId(),
    points,
    width: 3,
    eraser: false,
  });

  if (template === 'flowchart') {
    return [
      baseStroke([
        { x: width * 0.15, y: height * 0.2 },
        { x: width * 0.45, y: height * 0.2 },
        { x: width * 0.45, y: height * 0.38 },
        { x: width * 0.15, y: height * 0.38 },
        { x: width * 0.15, y: height * 0.2 },
      ]),
      baseStroke([
        { x: width * 0.55, y: height * 0.55 },
        { x: width * 0.85, y: height * 0.55 },
        { x: width * 0.85, y: height * 0.75 },
        { x: width * 0.55, y: height * 0.75 },
        { x: width * 0.55, y: height * 0.55 },
      ]),
      baseStroke([
        { x: width * 0.3, y: height * 0.38 },
        { x: width * 0.7, y: height * 0.55 },
      ]),
    ];
  }

  if (template === 'mindmap') {
    return [
      baseStroke([
        { x: width * 0.5, y: height * 0.5 },
        { x: width * 0.65, y: height * 0.35 },
      ]),
      baseStroke([
        { x: width * 0.5, y: height * 0.5 },
        { x: width * 0.7, y: height * 0.55 },
      ]),
      baseStroke([
        { x: width * 0.5, y: height * 0.5 },
        { x: width * 0.35, y: height * 0.35 },
      ]),
      baseStroke([
        { x: width * 0.5, y: height * 0.5 },
        { x: width * 0.3, y: height * 0.6 },
      ]),
      baseStroke([
        { x: width * 0.5, y: height * 0.5 },
        { x: width * 0.5, y: height * 0.25 },
      ]),
      baseStroke([
        { x: width * 0.5 + 60, y: height * 0.5 },
        { x: width * 0.5 + 90, y: height * 0.5 },
      ]),
    ];
  }

  return [
    baseStroke([
      { x: width * 0.2, y: height * 0.75 },
      { x: width * 0.5, y: height * 0.25 },
      { x: width * 0.8, y: height * 0.75 },
      { x: width * 0.2, y: height * 0.75 },
    ]),
    baseStroke([
      { x: width * 0.5, y: height * 0.25 },
      { x: width * 0.5, y: height * 0.75 },
    ]),
  ];
};

export default function WhiteboardCanvas({
  onGenerate,
  onGenerating,
  template = 'blank',
}: {
  onGenerate: (svg: string | null) => void;
  onGenerating?: (value: boolean) => void;
  template?: 'blank' | 'flowchart' | 'mindmap' | 'geometry';
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { fast } = useMotionDurations();
  const prefersReduced = usePrefersReducedMotion();
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [undone, setUndone] = useState<Stroke[]>([]);
  const [currentPoints, setCurrentPoints] = useState<Point[]>([]);
  const [strokeWidth, setStrokeWidth] = useState(3);
  const [isEraser, setIsEraser] = useState(false);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
      setCanvasSize({ width: rect.width, height: rect.height });
    };

    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  useEffect(() => {
    if (template === 'blank' || canvasSize.width === 0) return;
    setStrokes(buildTemplateStrokes(template, canvasSize.width, canvasSize.height));
    setUndone([]);
  }, [template, canvasSize.width, canvasSize.height]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);
    ctx.fillStyle = '#0b1524';
    ctx.fillRect(0, 0, canvasSize.width, canvasSize.height);

    strokes.forEach((stroke) => drawStroke(ctx, stroke));
    if (currentPoints.length > 1) {
      drawStroke(ctx, { id: 'current', points: currentPoints, width: strokeWidth, eraser: isEraser });
    }
  }, [strokes, currentPoints, strokeWidth, isEraser, canvasSize.height, canvasSize.width]);

  const getPoint = (event: PointerEvent<HTMLCanvasElement>): Point | null => {
    const target = canvasRef.current ?? event.currentTarget;
    if (!target) return null;
    const rect = target.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  };

  const handlePointerDown = (event: PointerEvent<HTMLCanvasElement>) => {
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    const point = getPoint(event);
    if (!point) return;
    setCurrentPoints([point]);
  };

  const handlePointerMove = (event: PointerEvent<HTMLCanvasElement>) => {
    event.preventDefault();
    if (currentPoints.length === 0) return;
    const point = getPoint(event);
    if (!point) return;
    setCurrentPoints((prev) => [...prev, point]);
  };

  const handlePointerUp = (event?: PointerEvent<HTMLCanvasElement>) => {
    event?.preventDefault();
    if (currentPoints.length < 2) {
      setCurrentPoints([]);
      return;
    }

    if (isEraser) {
      const radius = strokeWidth * 2.4;
      setStrokes((prev) => prev.filter((stroke) => !strokesIntersect(stroke, currentPoints, radius)));
    } else {
      const stroke: Stroke = {
        id: strokeId(),
        points: currentPoints,
        width: strokeWidth,
        eraser: false,
      };
      setStrokes((prev) => [...prev, stroke]);
      setUndone([]);
    }

    setCurrentPoints([]);
  };

  const handleUndo = () => {
    setStrokes((prev) => {
      if (prev.length === 0) return prev;
      const next = [...prev];
      const last = next.pop();
      if (last) setUndone((undo) => [...undo, last]);
      return next;
    });
  };

  const handleRedo = () => {
    setUndone((prev) => {
      if (prev.length === 0) return prev;
      const next = [...prev];
      const restored = next.pop();
      if (restored) setStrokes((strokesPrev) => [...strokesPrev, restored]);
      return next;
    });
  };

  const handleClear = () => {
    setStrokes([]);
    setUndone([]);
    setCurrentPoints([]);
  };

  const handleGenerate = async () => {
    if (strokes.length === 0 || canvasSize.width === 0 || canvasSize.height === 0) {
      onGenerate(null);
      return;
    }
    onGenerating?.(true);
    try {
      const shapes = strokes.map((stroke) => diagramizeStroke(stroke.points));
      const svg = buildSvg(shapes, canvasSize.width, canvasSize.height);
      await new Promise((resolve) => setTimeout(resolve, prefersReduced ? 10 : 450));
      onGenerate(svg);
    } finally {
      onGenerating?.(false);
    }
  };

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex flex-col gap-3 text-xs uppercase tracking-[0.2em] text-chalk-400">
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleUndo}
            className="rounded-full border border-chalk-700/60 px-3 py-2 text-xs uppercase tracking-[0.2em]"
          >
            Undo
          </button>
          <button
            onClick={handleRedo}
            className="rounded-full border border-chalk-700/60 px-3 py-2 text-xs uppercase tracking-[0.2em]"
          >
            Redo
          </button>
          <button
            onClick={handleClear}
            className="rounded-full border border-chalk-700/60 px-3 py-2 text-xs uppercase tracking-[0.2em]"
          >
            Clear
          </button>
          <div className="flex flex-1 items-center justify-end gap-2">
            <span>Stroke</span>
            <input
              type="range"
              min={2}
              max={8}
              value={strokeWidth}
              onChange={(event) => setStrokeWidth(Number(event.target.value))}
              className="accent-lime-400"
            />
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setIsEraser((prev) => !prev)}
            className={`rounded-full border px-3 py-2 text-xs uppercase tracking-[0.2em] ${
              isEraser ? 'border-lime-400 text-lime-400' : 'border-chalk-700/60'
            }`}
          >
            {isEraser ? 'Eraser On' : 'Eraser'}
          </button>
          <div className="ml-auto">
            <motion.button
              onClick={handleGenerate}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: fast }}
              className="rounded-full bg-lime-400 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-ink-900"
            >
              Generate
            </motion.button>
          </div>
        </div>
      </div>
      <canvas
        ref={canvasRef}
        className="h-64 w-full rounded-2xl border border-chalk-800/60 bg-navy-900/70 touch-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      />
    </div>
  );
}
