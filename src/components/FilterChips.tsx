import { motion } from 'framer-motion';
import { useId } from 'react';

export default function FilterChips({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string;
  onChange: (value: string) => void;
}) {
  const layoutId = useId();

  return (
    <div className="flex flex-wrap gap-3">
      {options.map((option) => {
        const active = option === value;
        return (
          <button
            key={option}
            onClick={() => onChange(option)}
            className="relative rounded-full border border-chalk-700/60 px-4 py-2 text-xs uppercase tracking-[0.2em] text-chalk-200"
          >
            {active && (
              <motion.span
                layoutId={`chip-${layoutId}`}
                className="absolute inset-0 rounded-full bg-lime-400"
                transition={{ duration: 0.25, ease: 'easeOut' }}
              />
            )}
            <span className={`relative z-10 ${active ? 'text-ink-900' : ''}`}>{option}</span>
          </button>
        );
      })}
    </div>
  );
}
