# LEducation

Marketing website for LEducation, a mastery-focused learning platform for schools and districts, featuring a working whiteboard-to-diagram demo.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.4-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-0055FF?logo=framer&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-6-CA4245?logo=reactrouter&logoColor=white)

**Live site:** [l-education.vercel.app](https://l-education.vercel.app)

## Overview

"Chalkboard meets future lab": a hand-drawn, grid-paper visual style around an in-browser whiteboard that turns rough sketches into clean diagrams. The course catalog, subjects, case studies, jobs, FAQs and info pages are static data in `src/data/`, and there is no backend.

## Pages & Features

| Route | Page | Highlights |
| --- | --- | --- |
| `/` | Home | Hero whiteboard (draw, then generate a diagram), value proposition with count-up metrics, trust highlights, feature and capability cards, subject tiles, case studies, CTA |
| `/courses` | Courses | 12 courses filterable by subject (6) and level (Foundation, Intermediate, Advanced), with a lazy-loaded detail modal |
| `/learning-lab` | Learning Lab | Full whiteboard with templates (blank, flowchart, mind map, geometry), stroke width, eraser, undo/redo and clear, plus diagram output with PNG download (lazy-loaded route) |
| `/schools-districts` | Schools & Districts | Four-step rollout timeline, implementation approach, case studies filterable by segment with a detail modal |
| `/trust` | Trust | Privacy, security and accessibility overview, spec-sheet PDF link, FAQ accordion |
| `/careers` | Careers | Six job listings, benefits and a validated application form |
| `/contact` | Contact | Demo request form with validation |
| `/info/:slug` | Info pages | Nine Products, Solutions and Resources pages driven by `src/data/megaPages.ts` and linked from the mega menus |
| `*` | Not found | 404 page with a link home |

### How the diagram generator works

When you click **Generate**, each canvas stroke is simplified with the Ramer–Douglas–Peucker algorithm. Geometric heuristics then classify it as an arrow, rectangle, circle or straight line (`src/utils/sketch.ts`), and anything else becomes a smoothed quadratic path. The shapes are assembled into an SVG (`src/utils/svg.ts`), which can be rasterized to a PNG in the browser.

Site-wide:

- Desktop mega menus (Products, Solutions, Resources) and a slide-in mobile navigation drawer.
- Route progress bar and animated page transitions. Motion durations shrink when `prefers-reduced-motion` is set (`useMotionDurations`).
- Baloo 2 and Nunito from Google Fonts.
- The contact and careers forms validate client-side (`src/utils/validate.ts`) and show a confirmation, but nothing is sent.

## Tech Stack

- [React 18](https://react.dev) + TypeScript (strict mode), bundled with [Vite 5](https://vite.dev)
- [Tailwind CSS 3.4](https://tailwindcss.com) with PostCSS, Autoprefixer and custom CSS motifs (`src/styles/motifs.css`)
- [Framer Motion 11](https://motion.dev) for transitions, parallax and reveal animations
- [React Router 6](https://reactrouter.com) (`BrowserRouter`) with `React.lazy` code splitting
- HTML Canvas and SVG for the whiteboard; [React Icons](https://react-icons.github.io/react-icons/)

## Getting Started

Prerequisites: Node.js and npm.

```bash
npm install
npm run dev       # start the Vite dev server
npm run build     # type-check (tsc -b) and build to dist/
npm run preview   # serve the production build locally
```

## Project Structure

```
public/              # spec-sheet.pdf
src/
├── App.tsx          # layout, background motifs, navbar/footer
├── router.tsx       # route table with animated transitions
├── components/      # WhiteboardCanvas, DiagramOutput, HeroWhiteboard, CourseCard, modals, ...
├── data/            # courses, subjects, caseStudies, jobs, faqs, megaPages
├── hooks/           # useInViewOnce, useMotionDurations, usePrefersReducedMotion
├── pages/           # Home, Courses, LearningLab, SchoolsDistricts, TrustPrivacyAccessibility, ...
├── styles/          # index.css, motifs.css
├── utils/           # sketch.ts, svg.ts, validate.ts, dataFilters.ts, format.ts
└── types.ts         # shared types (Course, CaseStudy, Stroke, DiagramShape, ...)
```

## Deployment

Deployed on [Vercel](https://vercel.com) through its GitHub integration. No `vercel.json` is committed, so Vercel's Vite defaults apply: build with `npm run build` and serve `dist/`.

Routing happens client-side, so the host has to rewrite unknown paths to `index.html`. Without that rewrite, opening a route such as `/courses` directly returns a 404.

---

Built by [Awaiz Ahmed](https://github.com/4waiz) · Kanban Studios
