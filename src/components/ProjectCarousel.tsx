import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteConfig } from "@/data/siteConfig";
import ProjectCard from "./ProjectCard";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectCarousel({ onOpenProject }: { onOpenProject: (slug: string) => void }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const reduced = useReducedMotion();
  const projects = siteConfig.projects;

  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        const track = trackRef.current;
        const wrapper = wrapperRef.current;
        if (!track || !wrapper) return;

        const scrollAmount = () => Math.max(track.scrollWidth - window.innerWidth, 0);

        const tween = gsap.to(track, {
          x: () => -scrollAmount(),
          ease: "none",
          scrollTrigger: {
            trigger: wrapper,
            start: "top top",
            end: () => `+=${scrollAmount()}`,
            scrub: 0.25,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              setProgress(self.progress);
              setActiveIndex(Math.min(projects.length - 1, Math.round(self.progress * (projects.length - 1))));
            },
          },
        });

        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
        };
      });

      return () => mm.revert();
    }, wrapperRef);

    return () => ctx.revert();
  }, [reduced, projects.length]);

  // Mobile: track active index from native horizontal scroll.
  const handleMobileScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const max = track.scrollWidth - track.clientWidth;
    const p = max > 0 ? track.scrollLeft / max : 0;
    setProgress(p);
    setActiveIndex(Math.min(projects.length - 1, Math.round(p * (projects.length - 1))));
  };

  return (
    <section id="work" className="relative w-full pb-20 pt-14 sm:pb-28 sm:pt-16">
      <div className="mx-auto mb-10 flex max-w-7xl items-end justify-between px-5 sm:mb-14 sm:px-8">
        <div>
          <span className="eyebrow">Selected work</span>
          <h2 className="font-display mt-2 text-5xl uppercase leading-[0.88] sm:text-6xl lg:text-7xl">
            Recent
            <br />
            Product Work
          </h2>
        </div>
      </div>

      <div
        ref={wrapperRef}
        className={`relative w-full ${reduced ? "" : "lg:h-screen lg:overflow-hidden"}`}
      >
        <div
          ref={trackRef}
          onScroll={handleMobileScroll}
          className={`flex snap-x snap-mandatory gap-8 overflow-x-auto px-5 pb-6 sm:px-8 lg:pl-8 ${
            reduced ? "lg:pb-6" : "lg:h-full lg:snap-none lg:items-center lg:overflow-visible lg:pb-0"
          }`}
        >
          {projects.map((project) => (
            <div
              key={project.slug}
              className="w-[90vw] shrink-0 snap-start sm:w-[85vw] lg:w-[76vw] lg:pr-8"
            >
              <ProjectCard project={project} onOpen={() => onOpenProject(project.slug)} layoutId={`project-image-${project.slug}`} />
            </div>
          ))}
          <div className="hidden shrink-0 lg:block lg:w-[8vw]" aria-hidden />
        </div>

        {/* Progress indicator */}
        <div
          className={`mx-auto mt-8 flex max-w-7xl items-center gap-4 px-5 sm:px-8 ${
            reduced ? "" : "lg:absolute lg:inset-x-0 lg:bottom-10 lg:mt-0"
          }`}
        >
          <span className="font-display text-sm tabular-nums text-[var(--color-ink)]">
            {String(activeIndex + 1).padStart(2, "0")}
          </span>
          <div className="h-[2px] flex-1 max-w-[220px] overflow-hidden rounded-full bg-[var(--color-line)]">
            <div
              className="h-full rounded-full bg-[var(--color-ink)] transition-[width] duration-150"
              style={{ width: `${Math.max(progress * 100, projects.length ? 100 / projects.length : 0)}%` }}
            />
          </div>
          <span className="font-display text-sm tabular-nums text-[var(--color-taupe)]">
            {String(projects.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    </section>
  );
}
