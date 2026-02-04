import { Suspense, lazy, type ReactNode } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router-dom';
import PageTransition from './components/PageTransition';
import Home from './pages/Home';
import Courses from './pages/Courses';
import SchoolsDistricts from './pages/SchoolsDistricts';
import TrustPrivacyAccessibility from './pages/TrustPrivacyAccessibility';
import Careers from './pages/Careers';
import Contact from './pages/Contact';
import InfoDetail from './pages/InfoDetail';
import NotFound from './pages/NotFound';

const LearningLab = lazy(() => import('./pages/LearningLab'));

const LazyPage = ({ children }: { children: ReactNode }) => (
  <Suspense
    fallback={
      <div className="min-h-[50vh] grid place-items-center text-chalk-300">
        Loading the lab...
      </div>
    }
  >
    {children}
  </Suspense>
);

export default function AppRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <Home />
            </PageTransition>
          }
        />
        <Route
          path="/courses"
          element={
            <PageTransition>
              <Courses />
            </PageTransition>
          }
        />
        <Route
          path="/learning-lab"
          element={
            <PageTransition>
              <LazyPage>
                <LearningLab />
              </LazyPage>
            </PageTransition>
          }
        />
        <Route
          path="/schools-districts"
          element={
            <PageTransition>
              <SchoolsDistricts />
            </PageTransition>
          }
        />
        <Route
          path="/trust"
          element={
            <PageTransition>
              <TrustPrivacyAccessibility />
            </PageTransition>
          }
        />
        <Route
          path="/careers"
          element={
            <PageTransition>
              <Careers />
            </PageTransition>
          }
        />
        <Route
          path="/contact"
          element={
            <PageTransition>
              <Contact />
            </PageTransition>
          }
        />
        <Route
          path="/info/:slug"
          element={
            <PageTransition>
              <InfoDetail />
            </PageTransition>
          }
        />
        <Route
          path="*"
          element={
            <PageTransition>
              <NotFound />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}


