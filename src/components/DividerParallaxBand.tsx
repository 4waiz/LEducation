import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

export default function DividerParallaxBand() {
  const ref = useRef<HTMLDivElement | null>(null);
  const prefersReduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <div ref={ref} className="relative my-20 overflow-hidden rounded-3xl border border-chalk-800/60">
      <motion.div
        className="absolute inset-0 bg-grid opacity-30"
        style={{ y: prefersReduced ? 0 : y }}
      />
      <div className="relative z-10 px-6 py-12 text-center">
        <div className="text-xs uppercase tracking-[0.3em] text-lime-400">Insight</div>
        <div className="mt-3 text-2xl font-semibold text-chalk-50">
          42% faster content mastery when visuals lead instruction
        </div>
        <p className="mt-2 text-sm text-chalk-300">
          Visual-first pathways reduce cognitive load while improving retention and transfer.
        </p>
      </div>
    </div>
  );
}

