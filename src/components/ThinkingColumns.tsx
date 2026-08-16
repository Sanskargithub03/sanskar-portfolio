import { useState } from "react";
import { motion } from "framer-motion";
import { siteConfig } from "@/data/siteConfig";

export default function ThinkingColumns() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="relative mx-auto w-full max-w-7xl px-5 pb-16 pt-20 sm:px-8 sm:pb-20 sm:pt-24">
      <div className="mb-12 flex items-end justify-between sm:mb-16">
        <div>
          <span className="eyebrow">How I approach it</span>
          <h2 className="font-display mt-2 text-5xl uppercase leading-[0.9] sm:text-6xl">How I Think</h2>
        </div>
      </div>

      <div className="hairline mb-1" />
      <div className="flex snap-x snap-mandatory gap-0 overflow-x-auto pb-2 sm:grid sm:grid-cols-2 sm:divide-y-0 sm:overflow-visible sm:pb-0 lg:grid-cols-4 lg:divide-x lg:divide-[var(--color-line)]">
        {siteConfig.howIThink.map((item, i) => {
          const isHovered = hovered === i;
          const isDimmed = hovered !== null && hovered !== i;
          return (
            <motion.div
              key={item.number}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              animate={{
                opacity: isDimmed ? 0.4 : 1,
                paddingTop: isHovered ? 8 : 28,
              }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="group relative flex w-[78vw] shrink-0 snap-start flex-col gap-5 border-b border-[var(--color-line)] px-5 pb-8 pt-7 sm:w-auto sm:shrink sm:border-b-0 sm:px-7 lg:px-8 lg:first:pl-0"
            >
              <motion.span
                animate={{ fontSize: isHovered ? "3.2rem" : "2.2rem", color: isHovered ? "var(--color-amber)" : "var(--color-line)" }}
                transition={{ duration: 0.4 }}
                className="font-display leading-none"
              >
                {item.number}
              </motion.span>
              <motion.h3
                animate={{ x: isHovered ? 4 : 0 }}
                transition={{ duration: 0.35 }}
                className="text-lg font-semibold uppercase tracking-tight sm:text-xl"
              >
                {item.title}
              </motion.h3>
              <p className="text-[14px] leading-relaxed text-[var(--color-taupe)]">{item.description}</p>
            </motion.div>
          );
        })}
      </div>
      <div className="hairline mt-1" />
    </section>
  );
}
