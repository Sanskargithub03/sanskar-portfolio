import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { siteConfig } from "@/data/siteConfig";
import Lightbox, { type LightboxItem } from "./Lightbox";

type Tile = LightboxItem & { size: "large" | "stack" | "wide" };

// Large tile (~42% width) + two stacked beside it + one full-width tile
// below, per the brief — built from REAL screens across both projects.
const sizeClasses: Record<Tile["size"], string> = {
  large: "col-span-12 row-span-2 sm:col-span-6",
  stack: "col-span-6 row-span-1 sm:col-span-6",
  wide: "col-span-12 row-span-1",
};

export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const tiles: Tile[] = useMemo(() => {
    const wa = siteConfig.projects.find((p) => p.slug.includes("whatsapp"))!;
    const yt = siteConfig.projects.find((p) => p.slug.includes("youtube"))!;
    const pick = (proj: typeof wa, captionMatch: string) => proj.screens.gallery.find((g) => g.caption.includes(captionMatch)) ?? proj.screens.gallery[0];

    return [
      { ...pick(yt, "Problem statement"), id: "g1", project: yt.title, size: "large", aspect: "landscape" },
      { ...pick(wa, "Ranked semantic"), id: "g2", project: wa.title, size: "stack", aspect: "portrait" },
      { ...pick(wa, "on-device"), id: "g3", project: wa.title, size: "stack", aspect: "portrait" },
      { ...pick(yt, "layered consent"), id: "g4", project: yt.title, size: "wide", aspect: "landscape" },
      { ...pick(yt, "consent health"), id: "g5", project: yt.title, size: "stack", aspect: "landscape" },
      { ...pick(wa, "AI processing"), id: "g6", project: wa.title, size: "stack", aspect: "portrait" },
    ];
  }, []);

  return (
    <section className="relative mx-auto w-full max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
      <div className="mb-14 sm:mb-20">
        <span className="eyebrow">Inside the process</span>
        <h2 className="font-display mt-2 text-5xl uppercase leading-[0.88] sm:text-6xl lg:text-7xl">
          Behind the
          <br />
          Build
        </h2>
      </div>

      <div className="grid auto-rows-[170px] grid-cols-12 gap-4 sm:auto-rows-[220px] sm:gap-5">
        {tiles.map((tile, i) => (
          <motion.button
            key={tile.id}
            onClick={() => setLightboxIndex(i)}
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.6, delay: (i % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
            data-cursor="EXPLORE"
            aria-label={`Open ${tile.caption}`}
            className={`group relative overflow-hidden rounded-[20px] border border-[var(--color-line)] text-left ${sizeClasses[tile.size]} ${
              tile.aspect === "portrait" ? "bg-[var(--color-ink)]" : "bg-[var(--color-cream-deep)]"
            }`}
          >
            <motion.img
              src={tile.src}
              alt={tile.caption}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className={`h-full w-full ${tile.aspect === "portrait" ? "object-contain" : "object-cover"}`}
              loading="lazy"
            />
            <div className="absolute inset-0 flex flex-col justify-between p-4 sm:p-5">
              <span className="w-fit rounded-full bg-black/40 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
                {tile.project.includes("WhatsApp") ? "WhatsApp Smart Search" : "YouTube Consent"}
              </span>
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/40 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:p-5">
                <span className="relative z-10 translate-y-2 text-[12px] font-medium text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  Explore →
                </span>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      <Lightbox items={tiles} index={lightboxIndex} onClose={() => setLightboxIndex(null)} onNavigate={setLightboxIndex} />
    </section>
  );
}
