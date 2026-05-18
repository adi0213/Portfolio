import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Cursor from '@/components/Cursor';
import PageLoader from '@/components/PageLoader';
import ScrollProgress from '@/components/ScrollProgress';
import SplinePet from '@/components/SplinePet';
import SplineWatermarkKiller from '@/components/SplineWatermarkKiller';
import HeroSection from '@/sections/HeroSection';
import AboutSection from '@/sections/AboutSection';
import SkillsSection from '@/sections/SkillsSection';
import ProjectsSection from '@/sections/ProjectsSection';
import WorkflowSection from '@/sections/WorkflowSection';
import ContactSection from '@/sections/ContactSection';
import { useEffect } from 'react';
import Lenis from 'lenis';

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <>
      <SplineWatermarkKiller />
      <PageLoader />
      <Cursor />
      <ScrollProgress />
      <div className="relative">
        <Navigation />
        <main>
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <WorkflowSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
      {/* 🐾 Floating 3D Pet — fixed bottom-right corner */}
      <SplinePet />
    </>
  );
}
