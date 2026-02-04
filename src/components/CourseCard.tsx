import { FiBookOpen } from 'react-icons/fi';
import type { Course } from '../types';

export default function CourseCard({ course, onSelect }: { course: Course; onSelect: (course: Course) => void }) {
  return (
    <button
      onClick={() => onSelect(course)}
      className="group flex h-full flex-col rounded-2xl p-5 text-left play-card hover:border-lime-400/60"
    >
      <div className="flex items-center justify-between">
        <div className="text-xs uppercase tracking-[0.2em] text-chalk-400">{course.level}</div>
        <FiBookOpen className="text-chalk-400 transition-transform duration-300 group-hover:rotate-6 group-hover:text-lime-400" />
      </div>
      <div className="mt-4 text-lg font-semibold text-chalk-50">{course.title}</div>
      <p className="mt-2 text-sm text-chalk-300">{course.summary}</p>
      <div className="mt-auto pt-6 text-xs text-chalk-400">{course.duration}</div>
      <div className="mt-4 h-0.5 w-full origin-left scale-x-0 bg-lime-400 transition-transform duration-300 group-hover:scale-x-100" />
    </button>
  );
}

