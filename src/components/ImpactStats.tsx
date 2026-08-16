import { motion } from "framer-motion";
import { siteConfig } from "@/data/siteConfig";
import { useCountUp } from "@/hooks/useCountUp";

function formatValue(value: number, raw: number) {
  if (raw % 1 !== 0) return value.toFixed(1);
  if (raw >= 1000) return Math.round(value).toLocaleString("en-IN");
  return Math.round(value).toString();
}

function StatItem({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { ref, display } = useCountUp(value);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="flex min-w-[150px] flex-col gap-2 px-6 py-6 sm:px-8"
    >
      <span className="font-display text-4xl text-[var(--color-ink)] sm:text-5xl">
        {formatValue(display, value)}
        {suffix}
      </span>
      <span className="max-w-[160px] text-[12.5px] leading-snug text-[var(--color-taupe)]">{label}</span>
    </motion.div>
  );
}

export default function ImpactStats() {
  return (
    <section className="relative w-full border-y border-[var(--color-line)] bg-[var(--color-cream-deep)]/50 py-4">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mx-auto flex max-w-7xl flex-wrap items-center justify-center divide-x divide-[var(--color-line)] px-2 sm:justify-between"
      >
        {siteConfig.impact.map((stat) => (
          <StatItem key={stat.label} {...stat} />
        ))}
      </motion.div>
    </section>
  );
}
