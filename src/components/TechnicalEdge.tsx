import { motion } from "framer-motion";
import { siteConfig } from "@/data/siteConfig";
import PillButton from "./PillButton";

export default function TechnicalEdge() {
  const { technicalEdge } = siteConfig;
  return (
    <section className="relative mx-auto w-full max-w-4xl px-5 pb-16 pt-4 sm:px-8 sm:pb-20 sm:pt-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="rounded-[28px] border border-[var(--color-line)] p-6 sm:p-8"
      >
        <span className="eyebrow">Technical edge</span>
        <h3 className="font-display mt-2 text-2xl uppercase sm:text-3xl">{technicalEdge.title}</h3>
        <p className="mt-3 max-w-xl text-[13.5px] leading-relaxed text-[var(--color-taupe)]">{technicalEdge.description}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {technicalEdge.concepts.map((c) => (
            <span key={c} className="rounded-full bg-[var(--color-cream-deep)] px-3 py-1 text-[11px] text-[var(--color-ink-soft)]">
              {c}
            </span>
          ))}
        </div>
        <div className="mt-5">
          <PillButton href={technicalEdge.github} variant="outline" external cursorLabel="OPEN" className="!px-5 !py-2.5 !text-[12px]">
            View on GitHub
          </PillButton>
        </div>
      </motion.div>
    </section>
  );
}
