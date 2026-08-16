import { useRef, useState } from "react";
import { motion, useMotionValue, useScroll, useSpring } from "framer-motion";
import type { Project } from "@/data/types";
import ProjectVisual from "./ProjectVisual";
import PillButton from "./PillButton";
import MagneticButton from "./MagneticButton";
import { useIsTouchDevice, useReducedMotion } from "@/hooks/useReducedMotion";

export default function ProjectCard({
  project,
  onOpen,
  layoutId,
}: {
  project: Project;
  onOpen: () => void;
  layoutId: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [showDemoTip, setShowDemoTip] = useState(false);
  const isTouch = useIsTouchDevice();
  const reduced = useReducedMotion();
  const disableTilt = isTouch || reduced;

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 150, damping: 18 });
  const sry = useSpring(ry, { stiffness: 150, damping: 18 });

  // Scroll-linked depth: layers drift at slightly different speeds as the
  // card moves through the viewport (independent of the pointer-driven
  // hover offsets applied inside ProjectVisual).
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const handleMove = (e: React.MouseEvent) => {
    if (disableTilt || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    ry.set(px * 5);
    rx.set(-py * 5);
  };
  const handleLeave = () => {
    setHovered(false);
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.article
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={disableTilt ? undefined : { rotateX: srx, rotateY: sry, transformPerspective: 1200 }}
      className="flex h-full w-full flex-col gap-8 lg:flex-row lg:items-center lg:gap-14"
    >
      <motion.button
        layoutId={layoutId}
        onClick={onOpen}
        data-cursor="VIEW"
        aria-label={`View case study: ${project.title}`}
        animate={{ scale: !disableTilt && hovered ? 1.03 : 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-[28px] bg-[var(--color-cream-deep)] text-left lg:aspect-square lg:w-[46%]"
      >
        <ProjectVisual
          screens={project.screens}
          accent={project.accent}
          hovered={hovered}
          scrollYProgress={reduced ? undefined : scrollYProgress}
        />
        <span className="absolute right-5 top-5 rounded-full bg-[var(--color-ink)]/85 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-[var(--color-cream)] backdrop-blur">
          {project.index}
        </span>
      </motion.button>

      <div className="flex flex-1 flex-col justify-center gap-5">
        <div>
          <span className="eyebrow">{project.category}</span>
          <h3 className="font-display mt-2 text-4xl leading-[0.95] uppercase sm:text-5xl">{project.title}</h3>
        </div>
        <p className="max-w-md text-[15px] leading-relaxed text-[var(--color-taupe)]">{project.description}</p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <MagneticButton
            as="button"
            onClick={onOpen}
            data-cursor="CASE STUDY"
            strength={4}
            className="group inline-flex items-center gap-2 rounded-full bg-[var(--color-ink)] px-6 py-3.5 text-[13px] font-semibold text-[var(--color-cream)] transition-colors hover:bg-[var(--color-ink-soft)]"
          >
            View Case Study
            <span data-arrow className="inline-block transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>
          </MagneticButton>

          <div
            className="relative"
            onMouseEnter={() => setShowDemoTip(true)}
            onMouseLeave={() => setShowDemoTip(false)}
          >
            <PillButton href={project.links.demo} variant="outline" external cursorLabel="OPEN">
              Live Demo
            </PillButton>
            {showDemoTip && (
              <motion.span
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="pointer-events-none absolute -top-9 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded-full bg-[var(--color-ink)] px-3 py-1.5 text-[11px] text-[var(--color-cream)] sm:block"
              >
                Open interactive prototype
              </motion.span>
            )}
          </div>

          <PillButton href={project.links.github} variant="outline" external cursorLabel="OPEN">
            GitHub
          </PillButton>
        </div>
      </div>
    </motion.article>
  );
}
