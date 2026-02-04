import { motion } from 'framer-motion';
import { useMotionDurations } from '../hooks/useMotionDurations';

const chips = [
  'Mastery-based pacing',
  'Accessibility-first design',
  'Standards-aligned modules',
  'Privacy-respectful analytics',
];

export default function SpecCalloutChips() {
  const { fast } = useMotionDurations();

  return (
    <div className="flex flex-wrap gap-3">
      {chips.map((chip, index) => (
        <motion.div
          key={chip}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.08, duration: fast }}
          className="rounded-full border border-chalk-700/60 bg-navy-900/70 px-3 py-1 text-xs uppercase tracking-[0.2em] text-chalk-200"
        >
          {chip}
        </motion.div>
      ))}
    </div>
  );
}

