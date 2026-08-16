import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { siteConfig } from "@/data/siteConfig";
import PillButton from "./PillButton";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useImageFallback } from "@/hooks/useImageFallback";

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const [imgLoaded, setImgLoaded] = useState(false);
  const { src, onError } = useImageFallback(siteConfig.personal.photo, siteConfig.personal.photoFallback);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  return (
    <section id="contact" ref={ref} className="relative mx-auto w-full max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div>
          <span className="eyebrow">Get in touch</span>
          <h2 className="font-display mt-2 text-6xl uppercase leading-[0.86] sm:text-7xl lg:text-8xl">
            {siteConfig.contact.heading[0]}
            <br />
            {siteConfig.contact.heading[1]}
          </h2>
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-[var(--color-taupe)]">{siteConfig.contact.subheading}</p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <PillButton href={`mailto:${siteConfig.personal.email}`} variant="solid" cursorLabel="EMAIL">
              Email Me
            </PillButton>
            <PillButton href={siteConfig.social.linkedin} variant="outline" external cursorLabel="OPEN">
              LinkedIn
            </PillButton>
            <PillButton href={siteConfig.social.resume} variant="outline" external cursorLabel="OPEN">
              View Resume
            </PillButton>
          </div>

          <div className="mt-10 flex flex-col gap-2 border-t border-[var(--color-line)] pt-6 text-[14px] text-[var(--color-ink-soft)]">
            <a href={`mailto:${siteConfig.personal.email}`} className="w-fit hover:text-[var(--color-ink)]">
              {siteConfig.personal.email}
            </a>
            <a href={`tel:${siteConfig.personal.phone}`} className="w-fit hover:text-[var(--color-ink)]">
              {siteConfig.personal.phoneDisplay}
            </a>
          </div>
        </div>

        <motion.div style={reduced ? undefined : { y: imgY }} className="relative mx-auto aspect-[3/4] w-full max-w-[320px]">
          <div
            className="pointer-events-none absolute left-1/2 top-[6%] h-[90%] w-[130%] -translate-x-1/2 rounded-full opacity-80 blur-3xl"
            style={{
              background: "radial-gradient(closest-side, var(--color-peach) 0%, var(--color-amber-soft) 40%, rgba(243,238,226,0) 72%)",
            }}
          />
          <img
            src={src}
            onError={onError}
            onLoad={() => setImgLoaded(true)}
            alt={siteConfig.personal.photoAlt}
            className="relative z-10 h-full w-full object-cover object-top transition-opacity duration-500"
            style={{
              opacity: imgLoaded ? 1 : 0,
              maskImage: "linear-gradient(to bottom, black 76%, transparent 98%)",
              WebkitMaskImage: "linear-gradient(to bottom, black 76%, transparent 98%)",
              filter: "drop-shadow(0 24px 30px rgba(60,40,20,0.12))",
            }}
            loading="lazy"
          />
        </motion.div>
      </div>
    </section>
  );
}
