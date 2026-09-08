import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { siteConfig } from "@/data/siteConfig";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useLenis } from "@/hooks/useLenis";

import Loader from "@/components/Loader";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ThinkingColumns from "@/components/ThinkingColumns";
import ImpactStats from "@/components/ImpactStats";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectCarousel from "@/components/ProjectCarousel";
import ProjectDetail from "@/components/ProjectDetail";
import AboutSection from "@/components/AboutSection";
import SkillGrid from "@/components/SkillGrid";
import TechnicalEdge from "@/components/TechnicalEdge";
import Achievements from "@/components/Achievements";
import Gallery from "@/components/Gallery";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const reduced = useReducedMotion();

  useLenis(!reduced);

  useEffect(() => {
    if (reduced) {
      setLoading(false);
      return;
    }

    const t = setTimeout(() => setLoading(false), 850);

    return () => clearTimeout(t);
  }, [reduced]);

  const selectedProject =
    siteConfig.projects.find((p) => p.slug === selectedSlug) ?? null;

  return (
    <>
      <Loader show={loading} />
      <CustomCursor />
      <Navbar />

      <main className="relative">
        {/* Hero */}
        <Hero />

        {/* How I Think */}
        <ThinkingColumns />

        {/* Professional Experience */}
        <ExperienceSection />

        {/* Product Work */}
        <ProjectCarousel onOpenProject={setSelectedSlug} />

        {/* Impact / Results */}
        <ImpactStats />

        {/* About */}
        <AboutSection />

        {/* Skills */}
        <SkillGrid />

        {/* Technical Background */}
        <TechnicalEdge />

        {/* Achievements */}
        <Achievements />

        {/* Gallery */}
        <Gallery />

        {/* Contact */}
        <Contact />
      </main>

      <Footer />

      <AnimatePresence>
        {selectedProject && (
          <ProjectDetail
            project={selectedProject}
            onClose={() => setSelectedSlug(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
