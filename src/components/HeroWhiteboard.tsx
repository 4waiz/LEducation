import { motion, useScroll, useTransform } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMotionDurations } from '../hooks/useMotionDurations';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { downloadSvgAsPng } from '../utils/svg';
import DiagramOutput from './DiagramOutput';
import SpecCalloutChips from './SpecCalloutChips';
import WhiteboardCanvas from './WhiteboardCanvas';

export default function HeroWhiteboard() {
  const { medium } = useMotionDurations();
  const prefersReduced = usePrefersReducedMotion();
  const [svg, setSvg] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const { scrollYProgress } = useScroll({ offset: ['start start', 'end start'] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  const headline = ['Interactive learning', 'that feels engineered', 'for real classrooms'];

  return (
    <section className="relative overflow-hidden">
      <div className="doodle-letter left-[6%] top-[10%]">L</div>
      <div className="doodle-letter left-[48%] top-[6%]">E</div>
      <motion.div
        className="pointer-events-none absolute inset-0 bg-grid opacity-30"
        style={{ y: prefersReduced ? 0 : parallaxY }}
      />
      <div className="relative mx-auto grid max-w-6xl gap-10 px-6 pb-16 pt-12 lg:grid-cols-[1.1fr_1fr] lg:items-start">
        <div className="space-y-6 lg:pt-6">
          <div className="text-xs uppercase tracking-[0.3em] text-lime-400">LEducation Platform</div>
          <div className="space-y-2 text-4xl font-semibold leading-tight tracking-tightest text-chalk-50 md:text-5xl">
            {headline.map((line, index) => (
              <motion.span
                key={line}
                className="block"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.12, duration: medium }}
              >
                {line}
              </motion.span>
            ))}
          </div>
          <p className="max-w-xl text-sm text-chalk-300 md:text-base">
            LEducation blends chalkboard intuition with lab-grade instrumentation. Sketch, diagram, and guide students
            through mastery pathways with real-time formative intelligence.
          </p>
          <SpecCalloutChips />
          <div className="flex flex-wrap gap-4">
            <Link
              to="/contact"
              className="rounded-full bg-lime-400 px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-ink-900 transition-transform hover:shadow-soft active:scale-95"
            >
              Request a demo
            </Link>
            <Link
              to="/courses"
              className="rounded-full border border-chalk-700/60 px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] transition-transform hover:border-lime-400/50 active:scale-95"
            >
              Explore courses
            </Link>
          </div>
        </div>
        <div className="space-y-6">
          <div className="glass-panel rounded-2xl p-4">
            <div className="text-xs uppercase tracking-[0.2em] text-chalk-400">Interactive Whiteboard</div>
            <WhiteboardCanvas
              onGenerate={setSvg}
              onGenerating={setIsGenerating}
            />
          </div>
          <DiagramOutput
            svg={svg}
            onDownload={() => svg && downloadSvgAsPng(svg, 'leducation-diagram.png')}
            isGenerating={isGenerating}
            prefersReduced={prefersReduced}
          />
        </div>
      </div>
    </section>
  );
}

