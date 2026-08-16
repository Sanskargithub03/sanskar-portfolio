import { useState } from "react";
import { motion } from "framer-motion";
import { siteConfig } from "@/data/siteConfig";

function Tile({ label, index }: { label: string; index: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      animate={{ x: hovered ? 2 : 0, borderColor: hovered ? "var(--color-ink)" : "var(--color-line)" }}
      transition={{ duration: 0.25 }}
      className="flex items-center justify-between border-b px-1 py-3.5 text-[14px]"
    >
      <motion.span animate={{ x: hovered ? 4 : 0 }} transition={{ duration: 0.25 }} className="text-[var(--color-ink-soft)]">
        {label}
      </motion.span>
      <motion.span
        animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -6 }}
        transition={{ duration: 0.25 }}
        className="font-display text-[13px] text-[var(--color-amber)]"
      >
        {String(index + 1).padStart(2, "0")}
      </motion.span>
    </motion.div>
  );
}

export default function SkillGrid() {
  return (
    <section id="toolkit" className="relative mx-auto w-full max-w-7xl px-5 pb-14 pt-12 sm:px-8 sm:pb-16 sm:pt-16">
      <div className="mb-14 sm:mb-20">
        <span className="eyebrow">What I reach for</span>
        <h2 className="font-display mt-2 text-5xl uppercase leading-[0.88] sm:text-6xl lg:text-7xl">
          Product
          <br />
          Toolkit
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-12 sm:grid-cols-3 sm:gap-8">
        {siteConfig.toolkit.categories.map((cat) => (
          <div key={cat.name}>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--color-taupe)]">{cat.name}</p>
            <div className="hairline mb-1" />
            {cat.items.map((item, i) => (
              <Tile key={item} label={item} index={i} />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
