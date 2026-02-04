import type { CaseStudy } from '../types';

export default function CaseStudyCard({
  study,
  onSelect,
}: {
  study: CaseStudy;
  onSelect: (study: CaseStudy) => void;
}) {
  return (
    <button
      onClick={() => onSelect(study)}
      className="group relative overflow-hidden rounded-2xl p-6 text-left transition-transform duration-300 play-card hover:-translate-y-2 hover:border-lime-400/60"
    >
      <div className="text-xs uppercase tracking-[0.2em] text-chalk-400">{study.segment}</div>
      <div className="mt-3 text-lg font-semibold text-chalk-50">{study.title}</div>
      <p className="mt-2 text-sm text-chalk-300">{study.challenge}</p>
      <div className="mt-4 text-xs text-lime-400">{study.subject}</div>
      <div className="absolute inset-x-0 bottom-0 translate-y-full bg-navy-950/95 px-6 py-4 text-xs text-chalk-200 transition-transform duration-300 group-hover:translate-y-0">
        <div className="font-semibold text-chalk-100">Outcomes</div>
        <ul className="mt-2 grid gap-1">
          {study.results.map((result) => (
            <li key={result}>• {result}</li>
          ))}
        </ul>
      </div>
    </button>
  );
}

