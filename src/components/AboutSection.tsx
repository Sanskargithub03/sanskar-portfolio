import { motion } from "framer-motion";
import { siteConfig } from "@/data/siteConfig";
import RevealText from "./RevealText";

export default function AboutSection() {
  const { about } = siteConfig;

  return (
    <section id="about" className="relative mx-auto w-full max-w-7xl px-5 pb-24 pt-14 sm:px-8 sm:pb-32 sm:pt-16">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[380px_1fr] lg:gap-16">
        <div>
          <span className="eyebrow">Who I am</span>
          <h2 className="font-display mt-2 text-5xl uppercase leading-[0.88] sm:text-6xl">
            {about.heading[0]}
            <br />
            {about.heading[1]}
          </h2>
          <p className="mt-6 max-w-xs text-[13px] text-[var(--color-taupe)]">
            {siteConfig.personal.education.degree} · {siteConfig.personal.education.school} · CGPA {siteConfig.personal.education.cgpa}
          </p>
        </div>

        <div>
          <RevealText
            text={about.paragraph}
            as="p"
            mode="word"
            triggerOnView
            stagger={0.012}
            className="max-w-3xl text-2xl leading-[1.45] text-[var(--color-ink-soft)] sm:text-3xl"
          />

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="relative mt-8 inline-block font-serif-display text-3xl sm:text-4xl"
          >
            "{about.statement}"
            <motion.span
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
              className="absolute -bottom-1 left-0 h-[2px] w-full origin-left bg-[var(--color-amber)]"
            />
          </motion.p>

          <div className="mt-14 grid gap-8 sm:grid-cols-2">
            <div>
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--color-taupe)]">Product craft</p>
              <div className="flex flex-wrap gap-2">
                {about.productSkills.map((s) => (
                  <span key={s} className="rounded-full border border-[var(--color-line)] px-3.5 py-1.5 text-[12px] text-[var(--color-ink-soft)]">
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--color-taupe)]">Technical edge</p>
              <div className="flex flex-wrap gap-2">
                {about.technicalSkills.map((s) => (
                  <span key={s} className="rounded-full border border-[var(--color-line)] px-3.5 py-1.5 text-[12px] text-[var(--color-ink-soft)]">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
