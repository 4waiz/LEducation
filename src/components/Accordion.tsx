import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import type { FAQ } from '../types';
import { useMotionDurations } from '../hooks/useMotionDurations';

export default function Accordion({ items }: { items: FAQ[] }) {
  const { medium } = useMotionDurations();
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="grid gap-3">
      {items.map((item) => {
        const open = item.id === openId;
        return (
          <div key={item.id} className="rounded-2xl border border-chalk-800/60 bg-navy-900/70">
            <button
              className="flex w-full items-center justify-between px-5 py-4 text-left"
              onClick={() => setOpenId(open ? null : item.id)}
            >
              <span className="text-sm font-semibold text-chalk-50">{item.question}</span>
              <span className="text-lime-400">{open ? '-' : '+'}</span>
            </button>
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  initial={{ opacity: 0, scaleY: 0.98 }}
                  animate={{ opacity: 1, scaleY: 1 }}
                  exit={{ opacity: 0, scaleY: 0.98 }}
                  transition={{ duration: medium }}
                  className="origin-top px-5 pb-4 text-sm text-chalk-300"
                >
                  {item.answer}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

