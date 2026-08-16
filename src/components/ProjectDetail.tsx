import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { Project } from "@/data/types";
import PillButton from "./PillButton";
import Lightbox from "./Lightbox";
import { pauseLenis, resumeLenis } from "@/hooks/useLenis";

function DetailBlock({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-[var(--color-line)] py-8">
      <span className="eyebrow">{label}</span>
      <div className="mt-4">{children}</div>
    </div>
  );
}

export default function ProjectDetail({ project, onClose }: { project: Project; onClose: () => void }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    pauseLenis();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      resumeLenis();
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const isWhatsapp = "mvp" in project;
  const heroImage = project.screens.layers[0];
  const lightboxItems = project.screens.gallery.map((g) => ({
    id: g.src,
    project: project.title,
    caption: g.caption,
    src: g.src,
    aspect: project.screens.aspect,
  }));

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} case study`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="fixed inset-0 z-[90] overflow-y-auto bg-[var(--color-cream)]"
      data-lenis-prevent
    >
      <div className="mx-auto max-w-5xl px-5 pb-28 pt-8 sm:px-8">
        <button
          onClick={onClose}
          className="group mb-10 inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-widest text-[var(--color-ink)]"
        >
          <span className="transition-transform group-hover:-translate-x-1">←</span> Back to Work
        </button>

        <div className="flex items-start justify-between gap-6">
          <div>
            <span className="eyebrow">{project.category}</span>
            <h1 className="font-display mt-3 text-5xl uppercase leading-[0.9] sm:text-7xl">{project.title}</h1>
          </div>
          <span className="font-display shrink-0 text-4xl text-[var(--color-line)] sm:text-6xl">{project.index}</span>
        </div>

        {/* Hero — the card's front screenshot expands into this image via
            the shared layoutId, becoming the project's hero shot. */}
        <motion.div
          layoutId={`project-image-${project.slug}`}
          className="relative mt-10 aspect-[16/9] w-full overflow-hidden rounded-[28px] bg-[var(--color-cream-deep)]"
        >
          {heroImage && (
            <img
              src={heroImage.src}
              alt={heroImage.alt}
              className={`h-full w-full ${project.screens.aspect === "portrait" ? "object-contain bg-[var(--color-ink)]" : "object-cover"}`}
              loading="eager"
            />
          )}
        </motion.div>

        <DetailBlock label="Problem">
          <p className="max-w-2xl text-lg leading-relaxed text-[var(--color-ink-soft)]">{project.problem}</p>
        </DetailBlock>

        <DetailBlock label="Users">
          <ul className="grid gap-3 sm:grid-cols-2">
            {project.users.map((u) => (
              <li key={u} className="rounded-2xl border border-[var(--color-line)] p-4 text-[14px] text-[var(--color-ink-soft)]">
                {u}
              </li>
            ))}
          </ul>
        </DetailBlock>

        {isWhatsapp ? (
          <>
            <DetailBlock label="Flow">
              <div className="flex flex-wrap items-center gap-2">
                {project.flow!.map((step, i) => (
                  <span key={step} className="flex items-center gap-2">
                    <span className="rounded-full border border-[var(--color-line)] px-4 py-2 text-[13px]">{step}</span>
                    {i < project.flow!.length - 1 && <span className="text-[var(--color-taupe)]">→</span>}
                  </span>
                ))}
              </div>
            </DetailBlock>
            <DetailBlock label="MVP scope">
              <ul className="grid gap-2 sm:grid-cols-2">
                {project.mvp!.map((m) => (
                  <li key={m} className="flex items-start gap-2 text-[14px] text-[var(--color-ink-soft)]">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--color-amber)]" /> {m}
                  </li>
                ))}
              </ul>
            </DetailBlock>
            <DetailBlock label="What's next">
              <div className="flex flex-wrap gap-2">
                {project.future!.map((f) => (
                  <span key={f} className="rounded-full bg-[var(--color-cream-deep)] px-4 py-2 text-[12.5px] text-[var(--color-ink-soft)]">
                    {f}
                  </span>
                ))}
              </div>
            </DetailBlock>
          </>
        ) : (
          <>
            <DetailBlock label="Proposed solution">
              <div className="grid gap-4 sm:grid-cols-2">
                {project.solution!.map((s) => (
                  <div key={s.step} className="rounded-2xl border border-[var(--color-line)] p-5">
                    <span className="font-display text-2xl text-[var(--color-line)]">{s.step}</span>
                    <p className="mt-2 text-[15px] font-medium">{s.title}</p>
                  </div>
                ))}
              </div>
            </DetailBlock>
            <DetailBlock label="Product principle">
              <p className="max-w-2xl text-[15px] italic leading-relaxed text-[var(--color-ink-soft)]">{project.principle}</p>
            </DetailBlock>

            {project.diagnosticThinking && (
              <DetailBlock label="Product thinking — a diagnostic scenario">
                <p className="mb-4 max-w-2xl text-[15px] font-medium text-[var(--color-ink)]">
                  {project.diagnosticThinking.scenario}
                </p>
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--color-taupe)]">
                  Hypothesis tree
                </p>
                <ul className="mb-5 grid gap-2 sm:grid-cols-2">
                  {project.diagnosticThinking.hypotheses.map((h) => (
                    <li key={h} className="flex items-start gap-2 text-[13.5px] leading-relaxed text-[var(--color-ink-soft)]">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--color-amber)]" /> {h}
                    </li>
                  ))}
                </ul>
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--color-taupe)]">
                  Root cause & next steps
                </p>
                <ul className="grid gap-2">
                  {project.diagnosticThinking.rootCause.map((r) => (
                    <li key={r} className="flex items-start gap-2 text-[13.5px] leading-relaxed text-[var(--color-ink-soft)]">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--color-amber)]" /> {r}
                    </li>
                  ))}
                </ul>
              </DetailBlock>
            )}

            <DetailBlock label="Success criteria">
              <ul className="grid gap-2">
                {project.successCriteria!.map((s) => (
                  <li key={s} className="flex items-start gap-2 text-[14px] text-[var(--color-ink-soft)]">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--color-amber)]" /> {s}
                  </li>
                ))}
              </ul>
            </DetailBlock>
            <DetailBlock label="Rollout">
              <div className="flex flex-wrap gap-2">
                {project.rollout!.map((r) => (
                  <span key={r} className="rounded-full border border-[var(--color-line)] px-4 py-2 text-[13px]">
                    {r}
                  </span>
                ))}
              </div>
            </DetailBlock>
            <DetailBlock label="Trade-offs">
              <div className="flex flex-wrap gap-2">
                {project.tradeoffs!.map((t) => (
                  <span key={t} className="rounded-full bg-[var(--color-cream-deep)] px-4 py-2 text-[12.5px] text-[var(--color-ink-soft)]">
                    {t}
                  </span>
                ))}
              </div>
            </DetailBlock>
          </>
        )}

        <DetailBlock label="Metrics">
          <p className="text-[13px] uppercase tracking-widest text-[var(--color-taupe)]">North star</p>
          <p className="font-display mb-4 mt-1 text-3xl">{project.metrics.northStar}</p>
          <div className="mb-5 flex flex-wrap gap-2">
            {project.metrics.supporting.map((m) => (
              <span key={m} className="rounded-full border border-[var(--color-line)] px-4 py-2 text-[13px]">
                {m}
              </span>
            ))}
          </div>
          {project.dashboard && (
            <div className="flex flex-wrap items-end gap-4 rounded-2xl border border-[var(--color-line)] p-5">
              <div>
                <span className="font-display text-4xl">{project.dashboard.kpi}</span>
                <p className="mt-1 text-[12px] text-[var(--color-taupe)]">{project.dashboard.kpiLabel}</p>
              </div>
              <span className="text-[12.5px] font-medium text-[var(--color-amber)]">{project.dashboard.kpiChange}</span>
              <span className="text-[11px] italic text-[var(--color-taupe)]">{project.dashboard.note}</span>
            </div>
          )}
        </DetailBlock>

        {/* Real screenshots gallery */}
        <DetailBlock label="Screens">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {project.screens.gallery.map((shot, i) => (
              <button
                key={shot.src}
                onClick={() => setLightboxIndex(i)}
                data-cursor="EXPLORE"
                aria-label={`Open ${shot.caption}`}
                className={`group relative overflow-hidden rounded-2xl border border-[var(--color-line)] ${
                  project.screens.aspect === "portrait" ? "aspect-[3/4] bg-[var(--color-ink)]" : "aspect-video bg-[var(--color-cream-deep)]"
                }`}
              >
                <img
                  src={shot.thumb}
                  alt={shot.caption}
                  className={`h-full w-full transition-transform duration-500 group-hover:scale-105 ${
                    project.screens.aspect === "portrait" ? "object-contain" : "object-cover"
                  }`}
                  loading="lazy"
                />
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/40 via-transparent to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="text-[11px] font-medium text-white">{shot.caption}</span>
                </div>
              </button>
            ))}
          </div>
        </DetailBlock>

        <div className="border-t border-[var(--color-line)] pt-8">
          <div className="flex flex-wrap items-center gap-3">
            {project.links.caseStudyPdf ? (
              <PillButton href={project.links.caseStudyPdf} variant="solid" external cursorLabel="CASE STUDY">
                Full Case Study (PDF)
              </PillButton>
            ) : null}
            <PillButton href={project.links.demo} variant="solid" external cursorLabel="OPEN">
              Live Demo
            </PillButton>
            <PillButton href={project.links.github} variant="outline" external cursorLabel="OPEN">
              GitHub
            </PillButton>
          </div>
        </div>
      </div>

      <Lightbox items={lightboxItems} index={lightboxIndex} onClose={() => setLightboxIndex(null)} onNavigate={setLightboxIndex} />
    </motion.div>
  );
}
