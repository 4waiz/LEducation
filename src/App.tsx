import AppRoutes from './router';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import RouteProgress from './components/RouteProgress';
import DoodleField from './components/DoodleField';

export default function App() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-navy-950 text-chalk-50">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-30" />
      <div className="pointer-events-none absolute inset-0 bg-blueprint-dots opacity-30 mix-blend-multiply" />
      <div className="floating-shape left-[6%] top-[12%] h-36 w-36" />
      <div className="floating-shape left-[78%] top-[8%] h-24 w-24" />
      <div className="floating-shape left-[10%] top-[70%] h-32 w-32" />
      <DoodleField />
      <RouteProgress />
      <Navbar />
      <AppRoutes />
      <Footer />
    </div>
  );
}

