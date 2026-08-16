import { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { siteConfig } from "@/data/siteConfig";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useImageFallback } from "@/hooks/useImageFallback";

export default function HeroPortrait({
  mouseX,
  mouseY,
}: {
  mouseX: ReturnType<typeof useMotionValue<number>>;
  mouseY: ReturnType<typeof useMotionValue<number>>;
}) {
  const reduced = useReducedMotion();
  const [imgLoaded, setImgLoaded] = useState(false);
  const { src, onError } = useImageFallback(siteConfig.personal.photo, siteConfig.personal.photoFallback);

  const portraitX = useSpring(useTransform(mouseX, [-1, 1], [-8, 8]), { stiffness: 60, damping: 18 });
  const portraitY = useSpring(useTransform(mouseY, [-1, 1], [-6, 6]), { stiffness: 60, damping: 18 });
  const glowX = useSpring(useTransform(mouseX, [-1, 1], [-18, 18]), { stiffness: 40, damping: 20 });
  const glowY = useSpring(useTransform(mouseY, [-1, 1], [-14, 14]), { stiffness: 40, damping: 20 });

  return (
    <div className="relative mx-auto h-full w-full select-none">
      {/* Warm peach → cream glow — the surface the portrait "emerges" from.
          This renders immediately and independently of the photo, so the
          hero never looks empty even while the image is still loading. */}
      <motion.div
        aria-hidden
        style={reduced ? undefined : { x: glowX, y: glowY }}
        className="pointer-events-none absolute left-1/2 top-[8%] h-[85%] w-[130%] -translate-x-1/2 rounded-full opacity-90 blur-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.9 }}
        transition={{ duration: 1.4, ease: "easeOut" }}
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, var(--color-peach) 0%, var(--color-amber-soft) 38%, rgba(243,238,226,0) 72%)",
          }}
        />
      </motion.div>

      <motion.div
        style={reduced ? undefined : { x: portraitX, y: portraitY }}
        initial={{ opacity: 0, y: 46, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="relative mx-auto h-full w-full"
      >
        {/* The photo itself fades in independently once it actually
            decodes — separate from the container's rise/scale above —
            so a slow network never shows a hard pop-in or a broken icon. */}
        <motion.img
          key={src}
          src={src}
          onLoad={() => setImgLoaded(true)}
          onError={onError}
          alt={siteConfig.personal.photoAlt}
          initial={false}
          animate={{ opacity: imgLoaded ? 1 : 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative z-10 h-full w-full object-cover object-top"
          style={{
            maskImage: "linear-gradient(to bottom, black 72%, rgba(0,0,0,0.35) 88%, transparent 99%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 72%, rgba(0,0,0,0.35) 88%, transparent 99%)",
            filter: "drop-shadow(0 30px 40px rgba(60, 40, 20, 0.12))",
          }}
          loading="eager"
          decoding="async"
        />

        {/* Soft left/right edge feathering — only over the lower/shoulder
            band, where the box is wider than the actual photo content and
            a hard rectangular edge could show. The head area is already
            naturally transparent (real alpha-channel cutout), so feathering
            there would incorrectly fade into whatever sits beside it. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 z-20"
          style={{ top: "38%" }}
        >
          <div
            className="absolute inset-y-0 left-0 w-[14%]"
            style={{ background: "linear-gradient(to right, var(--color-cream) 0%, rgba(243,238,226,0) 100%)" }}
          />
          <div
            className="absolute inset-y-0 right-0 w-[14%]"
            style={{ background: "linear-gradient(to left, var(--color-cream) 0%, rgba(243,238,226,0) 100%)" }}
          />
        </div>
      </motion.div>
    </div>
  );
}
