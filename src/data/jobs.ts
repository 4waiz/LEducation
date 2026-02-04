import type { Job } from '../types';

export const jobs: Job[] = [
  {
    id: 'product-designer',
    title: 'Product Designer, Learning Lab',
    location: 'San Francisco, CA',
    remote: true,
    description: 'Shape the next generation of interactive learning workflows.',
    requirements: ['5+ years in product design', 'Figma systems expertise', 'Experience with education products'],
  },
  {
    id: 'frontend-engineer',
    title: 'Frontend Engineer, Growth',
    location: 'Remote (US)',
    remote: true,
    description: 'Build responsive, high-performance experiences across marketing and product.',
    requirements: ['React + TypeScript mastery', 'Motion and interaction design sensibility', 'Performance-first mindset'],
  },
  {
    id: 'district-success',
    title: 'District Success Manager',
    location: 'Chicago, IL',
    remote: false,
    description: 'Partner with district leaders to deliver successful rollouts.',
    requirements: ['5+ years in K-12 partnerships', 'Strong facilitation skills', 'Data storytelling experience'],
  },
  {
    id: 'learning-scientist',
    title: 'Learning Scientist',
    location: 'Remote (US)',
    remote: true,
    description: 'Lead evidence-based design for mastery pathways and assessments.',
    requirements: ['M.A. or Ph.D. in learning sciences', 'Assessment design background', 'Comfort with research synthesis'],
  },
  {
    id: 'platform-engineer',
    title: 'Platform Engineer',
    location: 'Austin, TX',
    remote: true,
    description: 'Scale platform reliability for district-wide adoption.',
    requirements: ['Experience with cloud infrastructure', 'Security and privacy expertise', 'Strong observability practices'],
  },
  {
    id: 'content-strategist',
    title: 'Content Strategist, K-12',
    location: 'New York, NY',
    remote: false,
    description: 'Craft standards-aligned narratives and launch campaigns.',
    requirements: ['Editorial leadership experience', 'K-12 standards knowledge', 'Strong stakeholder collaboration'],
  },
];

