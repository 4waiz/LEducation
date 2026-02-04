export type MegaPage = {
  slug: string;
  title: string;
  category: 'Products' | 'Solutions' | 'Resources';
  summary: string;
  highlights: string[];
  metrics: string[];
  ctaLabel: string;
  ctaHref: string;
};

export const megaPages: MegaPage[] = [
  {
    slug: 'learning-lab',
    title: 'Learning Lab',
    category: 'Products',
    summary: 'An interactive whiteboard and Diagramizer built for concept clarity and student ownership.',
    highlights: [
      'Sketch-to-diagram conversion with smart shape detection',
      'Teacher-ready templates for flowcharts, mind maps, and geometry',
      'Exportable visuals for classroom handouts and LMS posts',
    ],
    metrics: ['31% faster concept capture', '2.3x more student annotations', '48-hour onboarding'],
    ctaLabel: 'Open Learning Lab',
    ctaHref: '/learning-lab',
  },
  {
    slug: 'course-catalog',
    title: 'Course Catalog',
    category: 'Products',
    summary: 'Standards-aligned modules with mastery checks and formative micro-assessments.',
    highlights: [
      'Adaptive sequencing with mastery-based pacing',
      'Built-in formative checks and teacher action cues',
      'Multi-modal supports for diverse learners',
    ],
    metrics: ['42% completion lift', '28 hours saved per teacher', '90-day rollout'],
    ctaLabel: 'Explore Courses',
    ctaHref: '/courses',
  },
  {
    slug: 'analytics-suite',
    title: 'Analytics Suite',
    category: 'Products',
    summary: 'Privacy-respectful analytics that surface mastery gaps and next best actions.',
    highlights: [
      'Role-based dashboards for teachers and district leaders',
      'Mastery signals with confidence scoring',
      'Actionable insights tied to standards',
    ],
    metrics: ['30% fewer manual reports', '1.8x data-driven interventions', 'SOC-aligned practices'],
    ctaLabel: 'See District Impact',
    ctaHref: '/schools-districts',
  },
  {
    slug: 'schools-districts',
    title: 'Schools & Districts',
    category: 'Solutions',
    summary: 'Implementation plans, coaching, and impact reviews aligned to district goals.',
    highlights: [
      'Dedicated success manager and rollout plan',
      'SSO, roster sync, and SIS readiness',
      'Quarterly impact reviews with leadership dashboards',
    ],
    metrics: ['96% on-time rollouts', '28% usage lift', '4-week pilot-to-scale'],
    ctaLabel: 'View Rollout Plan',
    ctaHref: '/schools-districts',
  },
  {
    slug: 'trust-privacy',
    title: 'Trust & Privacy',
    category: 'Solutions',
    summary: 'FERPA/GDPR-ready commitments with accessibility-first design.',
    highlights: [
      'Data minimization and encryption at rest and in transit',
      'WCAG-aligned experiences and keyboard navigation',
      'Transparent retention and deletion workflows',
    ],
    metrics: ['Zero data sales', 'Audit-ready documentation', 'District-grade access controls'],
    ctaLabel: 'Read Trust Details',
    ctaHref: '/trust',
  },
  {
    slug: 'educator-success',
    title: 'Educator Success',
    category: 'Solutions',
    summary: 'Professional development, workflow automation, and instructional coaching.',
    highlights: [
      'Live onboarding and facilitator training',
      'Automated grouping and feedback cues',
      'On-demand implementation playbooks',
    ],
    metrics: ['19 hours saved per month', '94% teacher satisfaction', '1:1 coaching included'],
    ctaLabel: 'Talk to Success Team',
    ctaHref: '/schools-districts',
  },
  {
    slug: 'case-studies',
    title: 'Case Studies',
    category: 'Resources',
    summary: 'Evidence-backed stories from districts driving measurable outcomes.',
    highlights: [
      'District, charter, and magnet school highlights',
      'STEM, literacy, and multi-subject results',
      'Impact metrics within 90 days',
    ],
    metrics: ['18% completion growth', '2.1x proficiency flags', '27% accuracy gains'],
    ctaLabel: 'Browse Case Studies',
    ctaHref: '/schools-districts',
  },
  {
    slug: 'careers',
    title: 'Careers',
    category: 'Resources',
    summary: 'Join a team shaping mastery-based learning for real classrooms.',
    highlights: [
      'Remote-friendly roles across product and research',
      'Learning stipends and mentorship',
      'Mission-driven culture with impact focus',
    ],
    metrics: ['6 open roles', '4.8/5 team satisfaction', 'Annual impact days'],
    ctaLabel: 'View Open Roles',
    ctaHref: '/careers',
  },
  {
    slug: 'contact',
    title: 'Contact',
    category: 'Resources',
    summary: 'Request a demo or connect with our partnerships team.',
    highlights: [
      '30-minute demo tailored to your priorities',
      'Security and privacy documentation included',
      'Dedicated implementation consult',
    ],
    metrics: ['48-hour demo setup', '1 business day response', 'District-grade onboarding'],
    ctaLabel: 'Request a Demo',
    ctaHref: '/contact',
  },
];

export const megaPagesByCategory = (category: MegaPage['category']) =>
  megaPages.filter((page) => page.category === category);

export const megaPageBySlug = (slug?: string) =>
  megaPages.find((page) => page.slug === slug);
