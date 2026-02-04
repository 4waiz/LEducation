import { Suspense, lazy, useMemo, useState } from 'react';
import CourseCard from '../components/CourseCard';
import FilterChips from '../components/FilterChips';
import { courses } from '../data/courses';
import { subjects } from '../data/subjects';
import { filterCourses } from '../utils/dataFilters';
import type { Course } from '../types';

const CourseDetailModal = lazy(() => import('../components/CourseDetailModal'));

export default function Courses() {
  const [subjectFilter, setSubjectFilter] = useState('All');
  const [levelFilter, setLevelFilter] = useState<'All' | Course['level']>('All');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const subjectOptions = ['All', ...subjects.map((subject) => subject.name)];
  const subjectId = useMemo(() => {
    if (subjectFilter === 'All') return null;
    return subjects.find((subject) => subject.name === subjectFilter)?.id ?? null;
  }, [subjectFilter]);

  const filteredCourses = filterCourses(courses, subjectId, levelFilter);

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-lime-400">Courses</div>
          <h1 className="mt-4 text-3xl font-semibold text-chalk-50">Filterable catalog</h1>
          <p className="mt-2 text-sm text-chalk-300">
            Standards-aligned modules with mastery checks, ready for classroom deployment.
          </p>
        </div>
        <div className="text-sm text-chalk-400">{filteredCourses.length} active courses</div>
      </div>

      <div className="mt-8 grid gap-6">
        <div>
          <div className="mb-3 text-xs uppercase tracking-[0.2em] text-chalk-500">Subject</div>
          <FilterChips options={subjectOptions} value={subjectFilter} onChange={setSubjectFilter} />
        </div>
        <div>
          <div className="mb-3 text-xs uppercase tracking-[0.2em] text-chalk-500">Level</div>
          <FilterChips
            options={['All', 'Foundation', 'Intermediate', 'Advanced']}
            value={levelFilter}
            onChange={(value) => setLevelFilter(value as 'All' | Course['level'])}
          />
        </div>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {filteredCourses.map((course) => (
          <CourseCard key={course.id} course={course} onSelect={setSelectedCourse} />
        ))}
      </div>

      <Suspense fallback={null}>
        <CourseDetailModal course={selectedCourse} onClose={() => setSelectedCourse(null)} />
      </Suspense>
    </div>
  );
}

