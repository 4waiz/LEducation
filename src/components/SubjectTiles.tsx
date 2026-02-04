import { FiActivity, FiBookOpen, FiCode, FiDivide, FiGlobe, FiPenTool } from 'react-icons/fi';
import { subjects } from '../data/subjects';

const iconMap = {
  sigma: FiDivide,
  atom: FiActivity,
  code: FiCode,
  book: FiBookOpen,
  globe: FiGlobe,
  pen: FiPenTool,
};

export default function SubjectTiles() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {subjects.map((subject) => {
        const Icon = iconMap[subject.icon as keyof typeof iconMap];
        return (
          <div
            key={subject.id}
            className="play-card rounded-2xl p-5 transition-transform hover:-translate-y-1"
          >
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl border border-lime-400/40 text-lime-400">
                <Icon size={18} />
              </span>
              <div className="text-base font-semibold text-chalk-50">{subject.name}</div>
            </div>
            <p className="mt-3 text-sm text-chalk-300">{subject.description}</p>
          </div>
        );
      })}
    </div>
  );
}

