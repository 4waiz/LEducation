import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

export default function Timeline({ steps }: { steps: { title: string; description: string }[] }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const prefersReduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={ref} className="relative">
      <div className="absolute left-4 top-0 h-full w-0.5 bg-chalk-800/60" />
      <motion.div
        className="absolute left-4 top-0 h-full w-0.5 origin-top bg-lime-400"
        style={{ scaleY: prefersReduced ? 1 : scaleY }}
      />
      <div className="grid gap-8">
        {steps.map((step, index) => (
          <div key={step.title} className="relative pl-12">
            <div className="absolute left-1 top-1.5 h-6 w-6 rounded-full border border-lime-400/50 bg-navy-900" />
            <div className="text-sm uppercase tracking-[0.2em] text-chalk-400">Phase {index + 1}</div>
            <div className="mt-2 text-lg font-semibold text-chalk-50">{step.title}</div>
            <p className="mt-2 text-sm text-chalk-300">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

