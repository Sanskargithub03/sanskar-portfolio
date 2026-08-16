import { motion, useMotionValue, useTransform, type MotionValue } from "framer-motion";
import type { Project } from "@/data/types";

type ProjectVisualProps = {
  screens: Project["screens"];
  accent: string;
  hovered?: boolean;
  className?: string;
  /** 0→1 as the card crosses the viewport. Drives a subtle per-layer
   *  scroll parallax, independent of the pointer-driven hover offsets. */
  scrollYProgress?: MotionValue<number>;
};

/**
 * Layered composition of REAL project screenshots — extracted from the
 * uploaded PRD (WhatsApp Smart Search AI) and rasterized from the
 * uploaded deck (YouTube Consent & Personalization). Renders up to three
 * layers front-to-back with independent hover parallax and scroll drift.
 */
export default function ProjectVisual({ screens, accent, hovered, className = "", scrollYProgress }: ProjectVisualProps) {
  const fallbackProgress = useMotionValue(0);
  const progress = scrollYProgress ?? fallbackProgress;
  const backScrollY = useTransform(progress, [0, 1], [-6, 6]);
  const midScrollY = useTransform(progress, [0, 1], [-9, 9]);
  const frontScrollY = useTransform(progress, [0, 1], [-11, 11]);

  const [primary, secondary, tertiary] = screens.layers;
  const isPortrait = screens.aspect === "portrait";

  if (isPortrait) {
    // Phone screenshots: layered diagonally, back-right to front-center,
    // matching the reference's editorial collage treatment.
    return (
      <div className={`relative h-full w-full ${className}`}>
        {tertiary && (
          <motion.div style={scrollYProgress ? { y: backScrollY } : undefined} className="absolute inset-0">
            <motion.div
              animate={{ x: hovered ? -12 : 0, y: hovered ? -8 : 0, rotate: hovered ? -6 : -4 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute right-[2%] top-[4%] h-[70%] w-[46%] overflow-hidden rounded-[18px] shadow-[0_20px_45px_-20px_rgba(22,19,15,0.35)]"
              style={{ outline: `1px solid ${accent}33` }}
            >
              <img src={tertiary.src} alt={tertiary.alt} className="h-full w-full object-cover object-top" loading="lazy" decoding="async" />
            </motion.div>
          </motion.div>
        )}

        {secondary && (
          <motion.div style={scrollYProgress ? { y: midScrollY } : undefined} className="absolute inset-0">
            <motion.div
              animate={{ x: hovered ? 10 : 0, y: hovered ? 6 : 0, rotate: hovered ? 4 : 3 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute left-[0%] top-[10%] h-[68%] w-[46%] overflow-hidden rounded-[18px] shadow-[0_20px_45px_-18px_rgba(22,19,15,0.3)]"
              style={{ outline: `1px solid ${accent}33` }}
            >
              <img src={secondary.src} alt={secondary.alt} className="h-full w-full object-cover object-top" loading="lazy" decoding="async" />
            </motion.div>
          </motion.div>
        )}

        {primary && (
          <motion.div style={scrollYProgress ? { y: frontScrollY } : undefined} className="absolute inset-0">
            <motion.div
              animate={{ y: hovered ? -14 : 0, rotate: hovered ? -1 : 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute bottom-[2%] left-[24%] h-[80%] w-[52%] overflow-hidden rounded-[20px] shadow-[0_28px_60px_-16px_rgba(22,19,15,0.45)]"
              style={{ outline: `1.5px solid ${accent}55` }}
            >
              <img src={primary.src} alt={primary.alt} className="h-full w-full object-cover object-top" loading="lazy" decoding="async" />
            </motion.div>
          </motion.div>
        )}
      </div>
    );
  }

  // Landscape (slide) screenshots: overlapping film-still treatment.
  return (
    <div className={`relative h-full w-full ${className}`}>
      {tertiary && (
        <motion.div style={scrollYProgress ? { y: backScrollY } : undefined} className="absolute inset-0">
          <motion.div
            animate={{ x: hovered ? -10 : 0, y: hovered ? -8 : -4, rotate: hovered ? -2 : -1.5 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-[4%] top-[6%] h-[55%] w-[72%] overflow-hidden rounded-[16px] shadow-[0_20px_45px_-20px_rgba(22,19,15,0.35)]"
            style={{ outline: `1px solid ${accent}33` }}
          >
            <img src={tertiary.src} alt={tertiary.alt} className="h-full w-full object-cover" loading="lazy" decoding="async" />
          </motion.div>
        </motion.div>
      )}

      {secondary && (
        <motion.div style={scrollYProgress ? { y: midScrollY } : undefined} className="absolute inset-0">
          <motion.div
            animate={{ x: hovered ? 8 : 0, y: hovered ? 6 : 3, rotate: hovered ? 1.5 : 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-[3%] top-[22%] h-[56%] w-[74%] overflow-hidden rounded-[16px] shadow-[0_20px_45px_-18px_rgba(22,19,15,0.3)]"
            style={{ outline: `1px solid ${accent}33` }}
          >
            <img src={secondary.src} alt={secondary.alt} className="h-full w-full object-cover" loading="lazy" decoding="async" />
          </motion.div>
        </motion.div>
      )}

      {primary && (
        <motion.div style={scrollYProgress ? { y: frontScrollY } : undefined} className="absolute inset-0">
          <motion.div
            animate={{ y: hovered ? -12 : 0, rotate: hovered ? -1 : 0.5 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-[6%] left-[8%] h-[58%] w-[76%] overflow-hidden rounded-[18px] shadow-[0_28px_60px_-16px_rgba(22,19,15,0.45)]"
            style={{ outline: `1.5px solid ${accent}55` }}
          >
            <img src={primary.src} alt={primary.alt} className="h-full w-full object-cover" loading="lazy" decoding="async" />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
