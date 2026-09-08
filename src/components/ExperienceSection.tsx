import { useState } from "react";
import { motion } from "framer-motion";
import { siteConfig } from "@/data/siteConfig";

export default function ExperienceSection() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [openMobile, setOpenMobile] = useState<number | null>(0);

  const gramiqExperience = {
    slug: "gramiq",
    role: "Product & Business Intern",
    org: "GramIQ",
    logo: "/images/gramiqlogo.png",
    period: "2026 — Present",
    tags: ["Product", "Business Analysis", "Research", "Strategy"],
    highlights: [
      {
        value: "Product",
        label: "Problem & opportunity research",
      },
      {
        value: "Growth",
        label: "Funding & partnership research",
      },
      {
        value: "Strategy",
        label: "Market & ecosystem analysis",
      },
    ],
    impact: [
      "Conduct product, market, competitor, and ecosystem research to identify product and business opportunities.",
      "Analyze user and business problems, translating research into structured insights and actionable recommendations.",
      "Research grants, CSR programs, awards, accelerators, and funding opportunities to support strategic growth initiatives.",
      "Evaluate CSR and partnership opportunities and structure findings to support business decision-making and outreach.",
      "Support growth, social media, and cross-functional initiatives across product, business, research, and strategy.",
    ],
  };

  const experiences = [gramiqExperience, ...siteConfig.experience];

  return (
    <section
      id="experience"
      className="relative mx-auto w-full max-w-7xl px-5 py-24 sm:px-8 sm:py-32"
    >
      <div className="mb-14 sm:mb-20">
        <span className="eyebrow">Growth &amp; execution</span>

        <h2 className="font-display mt-2 text-5xl uppercase leading-[0.88] sm:text-6xl lg:text-7xl">
          Experience
          <br />
          &amp; Growth
        </h2>
      </div>

      <div className="hairline" />

      {/* Desktop Experience */}
      <div className="hidden sm:block">
        {experiences.map((exp, i) => {
          const isDimmed = hovered !== null && hovered !== i;
          const isHovered = hovered === i;

          return (
            <motion.div
              key={exp.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{
                once: true,
                margin: "-15% 0px",
              }}
              transition={{
                duration: 0.7,
                delay: i * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              animate={{
                backgroundColor: isHovered
                  ? "var(--color-cream-deep)"
                  : "rgba(0,0,0,0)",
              }}
              className="group relative -mx-5 border-b border-[var(--color-line)] px-5 py-10 transition-opacity duration-400 sm:-mx-6 sm:px-6"
              style={{
                opacity: isDimmed ? 0.45 : 1,
              }}
            >
              {/* Amber top line */}
              <motion.div
                className="absolute inset-x-0 top-0 h-[2px] origin-left bg-[var(--color-amber)]"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.9,
                  delay: i * 0.12 + 0.2,
                  ease: [0.65, 0, 0.35, 1],
                }}
              />

              <div className="grid grid-cols-[auto_auto_1fr_auto] items-center gap-5 sm:gap-8">
                {/* Experience Number */}
                <span className="font-display text-2xl text-[var(--color-line)] sm:text-3xl">
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Company Logo */}
                <motion.img
                  initial={{
                    opacity: 0,
                    scale: 0.85,
                  }}
                  whileInView={{
                    opacity: 1,
                    scale: 1,
                  }}
                  viewport={{ once: true }}
                  animate={{
                    scale: isHovered ? 1.08 : 1,
                  }}
                  transition={{ duration: 0.4 }}
                  src={exp.logo}
                  alt={`${exp.org} logo`}
                  className="h-14 w-14 rounded-2xl border border-[var(--color-line)] bg-[var(--color-paper)] object-contain p-2 sm:h-16 sm:w-16"
                  loading="lazy"
                />

                {/* Role + Organization */}
                <div>
                  <p className="font-display text-2xl uppercase leading-none sm:text-3xl">
                    {exp.role}
                  </p>

                  <p className="mt-2 text-[13px] text-[var(--color-taupe)]">
                    {exp.org}
                  </p>

                  {/* Tags */}
                  <div className="mt-3 flex flex-wrap gap-2">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-[var(--color-line)] px-3 py-1 text-[10.5px] uppercase tracking-wide text-[var(--color-taupe)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Period */}
                {exp.period && (
                  <span className="eyebrow justify-self-end">
                    {exp.period}
                  </span>
                )}
              </div>

              {/* Impact Highlights */}
              <motion.div
                initial={false}
                animate={{
                  height: isHovered ? "auto" : 0,
                  opacity: isHovered ? 1 : 0,
                  marginTop: isHovered ? 20 : 0,
                }}
                transition={{
                  duration: 0.4,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="overflow-hidden pl-[108px]"
              >
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--color-taupe)]">
                  Impact
                </p>

                <div className="flex flex-wrap gap-8">
                  {exp.highlights.map((highlight) => (
                    <div key={highlight.label}>
                      <span className="font-display text-3xl text-[var(--color-ink)]">
                        {highlight.value}
                      </span>

                      <p className="mt-1 text-[12px] text-[var(--color-taupe)]">
                        {highlight.label}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Experience Details */}
              <ul className="mt-6 grid gap-2.5 pl-[108px] sm:max-w-2xl sm:grid-cols-2">
                {exp.impact.map((line, li) => (
                  <motion.li
                    key={line}
                    initial={{
                      opacity: 0,
                      x: -10,
                    }}
                    whileInView={{
                      opacity: 1,
                      x: 0,
                    }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: i * 0.12 + 0.25 + li * 0.06,
                    }}
                    className="flex items-start gap-2 text-[13.5px] leading-relaxed text-[var(--color-ink-soft)]"
                  >
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--color-amber)]" />
                    {line}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </div>

      {/* Mobile Accordion */}
      <div className="sm:hidden">
        {experiences.map((exp, i) => {
          const open = openMobile === i;

          return (
            <div
              key={exp.slug}
              className="border-b border-[var(--color-line)]"
            >
              <button
                onClick={() => setOpenMobile(open ? null : i)}
                className="flex w-full items-center justify-between gap-4 py-6 text-left"
                aria-expanded={open}
              >
                <div className="flex items-center gap-4">
                  {/* Mobile Logo */}
                  <img
                    src={exp.logo}
                    alt={`${exp.org} logo`}
                    className="h-11 w-11 rounded-xl border border-[var(--color-line)] bg-[var(--color-paper)] object-contain p-1.5"
                    loading="lazy"
                  />

                  <div>
                    <p className="font-display text-xl uppercase leading-none">
                      {exp.role}
                    </p>

                    <p className="mt-1 text-[12px] text-[var(--color-taupe)]">
                      {exp.org}
                    </p>
                  </div>
                </div>

                {/* Expand Button */}
                <motion.span
                  animate={{
                    rotate: open ? 45 : 0,
                  }}
                  className="text-xl"
                >
                  +
                </motion.span>
              </button>

              {/* Mobile Content */}
              <motion.div
                initial={false}
                animate={{
                  height: open ? "auto" : 0,
                  opacity: open ? 1 : 0,
                }}
                className="overflow-hidden"
              >
                {/* Tags */}
                <div className="mb-4 flex flex-wrap gap-2">
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[var(--color-line)] px-3 py-1 text-[10px] uppercase tracking-wide text-[var(--color-taupe)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Experience Details */}
                <ul className="grid gap-2 pb-6">
                  {exp.impact.map((line) => (
                    <li
                      key={line}
                      className="flex items-start gap-2 text-[13px] leading-relaxed text-[var(--color-ink-soft)]"
                    >
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--color-amber)]" />
                      {line}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
