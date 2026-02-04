import type { CaseStudy, Course } from '../types';

export const filterCourses = (
  courses: Course[],
  subjectId: string | null,
  level: Course['level'] | 'All'
) => {
  return courses.filter((course) => {
    const subjectMatch = !subjectId || course.subjectId === subjectId;
    const levelMatch = level === 'All' || course.level === level;
    return subjectMatch && levelMatch;
  });
};

export const filterCaseStudies = (caseStudies: CaseStudy[], segment: string | null) => {
  if (!segment) return caseStudies;
  return caseStudies.filter((study) => study.segment === segment);
};

