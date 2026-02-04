import type { FAQ } from '../types';

export const faqs: FAQ[] = [
  {
    id: 'standards',
    question: 'How are LEducation modules aligned to standards?',
    answer: 'Modules are mapped to state standards and verified through internal curriculum audits. Educators can view alignment tags directly in every lesson.',
  },
  {
    id: 'data',
    question: 'What student data do you collect?',
    answer: 'We collect only what is needed for learning progress and product safety. Data is encrypted in transit and at rest, and never sold.',
  },
  {
    id: 'accessibility',
    question: 'How does LEducation support accessibility?',
    answer: 'We design for accessibility-first workflows with keyboard navigation, screen reader support, and built-in scaffolds across activities.',
  },
  {
    id: 'integrations',
    question: 'Do you integrate with existing LMS platforms?',
    answer: 'We offer roster sync and SSO integrations for major LMS and SIS platforms, with district-specific onboarding support.',
  },
  {
    id: 'analytics',
    question: 'What analytics are available to teachers?',
    answer: 'Teachers receive formative dashboards that highlight mastery gaps, time-on-task, and recommended next lessons.',
  },
  {
    id: 'pd',
    question: 'Is professional development included?',
    answer: 'Yes. Every district rollout includes live training, coaching hours, and an on-demand implementation library.',
  },
  {
    id: 'privacy',
    question: 'Are you FERPA and GDPR ready?',
    answer: 'LEducation is built with FERPA and GDPR readiness in mind, with clear data retention and deletion protocols.',
  },
  {
    id: 'support',
    question: 'What support is offered during rollout?',
    answer: 'Dedicated success managers provide 24/7 ticketing, quarterly impact reviews, and data-driven action plans.',
  },
];

