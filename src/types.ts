export type Subject = {
  id: string;
  name: string;
  description: string;
  icon: string;
};

export type Course = {
  id: string;
  title: string;
  subjectId: string;
  level: 'Foundation' | 'Intermediate' | 'Advanced';
  duration: string;
  outcomes: string[];
  summary: string;
};

export type CaseStudy = {
  id: string;
  title: string;
  segment: string;
  subject: string;
  challenge: string;
  solution: string;
  results: string[];
};

export type Job = {
  id: string;
  title: string;
  location: string;
  remote: boolean;
  description: string;
  requirements: string[];
};

export type FAQ = {
  id: string;
  question: string;
  answer: string;
};

export type Point = {
  x: number;
  y: number;
};

export type Stroke = {
  id: string;
  points: Point[];
  width: number;
  eraser: boolean;
};

export type DiagramShape =
  | { type: 'line'; x1: number; y1: number; x2: number; y2: number }
  | { type: 'rect'; x: number; y: number; width: number; height: number }
  | { type: 'circle'; cx: number; cy: number; r: number }
  | { type: 'arrow'; x1: number; y1: number; x2: number; y2: number; headSize: number }
  | { type: 'path'; d: string };

export type Diagram = {
  width: number;
  height: number;
  shapes: DiagramShape[];
};

