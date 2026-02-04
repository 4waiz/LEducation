import { useEffect, useState } from 'react';
import { useInViewOnce } from '../hooks/useInViewOnce';

export default function MetricCounter({
  value,
  label,
  suffix = '%',
}: {
  value: number;
  label: string;
  suffix?: string;
}) {
  const { ref, inView } = useInViewOnce<HTMLDivElement>();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(value);
      return;
    }
    let frame = 0;
    const totalFrames = 45;
    const tick = () => {
      frame += 1;
      const progress = Math.min(frame / totalFrames, 1);
      setDisplay(Math.round(value * progress));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, value]);

  return (
    <div ref={ref} className="rounded-2xl border border-chalk-800/60 bg-navy-900/70 p-5">
      <div className="text-2xl font-semibold text-lime-400">
        {display}
        {suffix}
      </div>
      <div className="mt-2 text-sm text-chalk-300">{label}</div>
    </div>
  );
}

