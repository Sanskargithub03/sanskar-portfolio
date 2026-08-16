import { useState } from "react";
import { motion } from "framer-motion";
import { siteConfig } from "@/data/siteConfig";

export default function Achievements() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="relative mx-auto w-full max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
      <div className="mb-14 sm:mb-20">
        <span className="eyebrow">Recognition</span>
        <h2 className="font-display mt-2 text-5xl uppercase leading-[0.88] sm:text-6xl lg:text-7xl">
          Selected
          <br />
          Achievements
        </h2>
      </div>

      <div className="hairline" />
      {siteConfig.achievements.map((a, i) => (
        <motion.div
          key={a.number}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(null)}
          className="relative flex items-center justify-between gap-6 border-b border-[var(--color-line)] py-7 sm:py-8"
        >
          <div className="flex items-center gap-6 sm:gap-10">
            <motion.span
              animate={{ scale: hovered === i ? 1.15 : 1, color: hovered === i ? "var(--color-amber)" : "var(--color-line)" }}
              transition={{ duration: 0.3 }}
              className="font-display text-3xl sm:text-4xl"
            >
              {a.number}
            </motion.span>
            <motion.div animate={{ x: hovered === i ? 8 : 0 }} transition={{ duration: 0.3 }}>
              <p className="text-lg font-semibold sm:text-xl">{a.title}</p>
              <p className="mt-1 text-[13px] text-[var(--color-taupe)]">
                {a.detail}
                {a.org ? ` · ${a.org}` : ""}
              </p>
            </motion.div>
          </div>
          <motion.div
            animate={{ scaleX: hovered === i ? 1 : 0.3, opacity: hovered === i ? 1 : 0.4 }}
            transition={{ duration: 0.4 }}
            className="hidden h-[1px] w-24 origin-right bg-[var(--color-ink)] sm:block"
          />
        </motion.div>
      ))}
    </section>
  );
}
