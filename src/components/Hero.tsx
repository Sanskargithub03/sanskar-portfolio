import { useEffect, useRef } from "react";
import { motion, useMotionValue, useScroll, useTransform, useSpring } from "framer-motion";
import { siteConfig } from "@/data/siteConfig";
import HeroPortrait from "./HeroPortrait";
import RevealText from "./RevealText";
import PillButton from "./PillButton";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    if (reduced) return;
    const handle = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      mouseX.set(nx);
      mouseY.set(ny);
    };
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, [mouseX, mouseY, reduced]);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const scrollFade = useTransform(scrollYProgress, [0, 0.75, 1], [1, 1, 0]);
  const scrollScale = useTransform(scrollYProgress, [0, 1], [1, 0.97]);
  const smoothFade = useSpring(scrollFade, { stiffness: 100, damping: 30 });

  const resumeHref = siteConfig.social.resume;

  return (
    <section id="home" ref={sectionRef} className="relative w-full overflow-hidden">
      <motion.div style={reduced ? undefined : { opacity: smoothFade, scale: scrollScale }} className="relative w-full">
        {/* ================= MOBILE / TABLET (< lg) — unchanged stacked layout ================= */}
        <div className="relative flex min-h-[100svh] w-full flex-col pt-[76px] sm:pt-[84px] lg:hidden">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.09 } } }}
            className="relative mx-auto flex w-full max-w-2xl flex-1 flex-col px-5 sm:px-8"
          >
            <div className="relative z-30 flex justify-center">
              <RevealText
                text={siteConfig.hero.greeting}
                as="h1"
                mode="word"
                delay={0.15}
                className="font-serif-display text-[13vw] leading-[0.95] sm:text-5xl"
              />
            </div>

            <div className="relative z-10 mx-auto -mt-2 h-full max-h-[52vh] min-h-[340px] w-full max-w-[380px] sm:max-h-[56vh] sm:max-w-[440px]">
              <HeroPortrait mouseX={mouseX} mouseY={mouseY} />
            </div>

            <motion.div variants={fadeUp} className="relative z-30 -mt-2 flex flex-col items-center gap-2 text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-line)] bg-[var(--color-paper)]/70 px-3.5 py-1.5">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-amber)] opacity-60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--color-amber)]" />
                </span>
                <span className="text-[10.5px] font-medium text-[var(--color-ink-soft)]">{siteConfig.personal.availability}</span>
              </div>
              <p className="max-w-[260px] text-[11.5px] leading-relaxed text-[var(--color-taupe)]">{siteConfig.personal.tagline}</p>
            </motion.div>

            <motion.div variants={fadeUp} className="relative z-30 col-span-full -mt-1 flex flex-col items-center justify-between gap-1">
              <h2 className="font-display text-center text-[13vw] leading-[0.82] uppercase text-[var(--color-ink)] sm:text-[7vw]">
                {siteConfig.hero.lineOne}
                <br />
                {siteConfig.hero.lineTwo}
              </h2>
              <h3 className="font-display text-center text-[8vw] leading-[0.86] uppercase text-[var(--color-ink)] sm:text-[4.6vw]">
                {siteConfig.hero.roleLineOne}
                <br />
                {siteConfig.hero.roleLineTwo}
              </h3>
            </motion.div>

            <motion.div variants={fadeUp} className="relative z-30 flex flex-wrap items-center justify-center gap-2.5 pb-4 pt-1.5">
              <PillButton href={siteConfig.hero.ctas.primary.href} variant="solid" className="!px-5 !py-2.5 !text-[12px]">
                {siteConfig.hero.ctas.primary.label}
              </PillButton>
              <PillButton href={siteConfig.hero.ctas.secondary.href} variant="outline" className="!px-5 !py-2.5 !text-[12px]">
                {siteConfig.hero.ctas.secondary.label}
              </PillButton>
              <PillButton href={resumeHref} variant="outline" external cursorLabel="OPEN" className="!px-5 !py-2.5 !text-[12px]">
                {siteConfig.hero.ctas.tertiary.label}
              </PillButton>
            </motion.div>
          </motion.div>
        </div>

        {/* ================= DESKTOP (lg+) — precise reference-matched composition ================= */}
        {/* Coordinates below are measured percentages from the reference mockup's
            1370×1148 canvas, applied as absolute positions within this container.
            Layering (back → front): glow → "Hey, there" → portrait → badge/copy → bottom type.

            The inner wrapper is capped at max-w-[1600px] and centered — without
            this, on very wide monitors (1920px+) the width-percentage-based
            positions (e.g. "Hey," at left:12%, "there" at left:67%) spread the
            two words apart in absolute pixels while the vh-based type size stays
            fixed, breaking the "one phrase" reading. Capping the container keeps
            the gap-to-text-size ratio constant regardless of screen width. */}
        <div className="relative hidden min-h-[100svh] w-full lg:block">
          <div className="relative mx-auto h-full min-h-[100svh] w-full max-w-[1600px]">
          {/* Hey, there — one continuous line, split across the portrait's
              gap, BEHIND the portrait (z-10 < portrait's z-20) so the head
              can overlap it exactly like the reference. */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="absolute z-10 whitespace-nowrap font-serif-display leading-none"
            style={{ left: "15%", top: "13%", fontSize: "17vh" }}
          >
            Hey,
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute z-10 whitespace-nowrap font-serif-display leading-none"
            style={{ left: "64%", top: "13%", fontSize: "17vh" }}
          >
            there
          </motion.div>

          {/* Portrait — large, shifted slightly right of center, overlapping the greeting */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="absolute z-20"
            style={{ left: "33%", top: "6%", width: "45%", height: "94%" }}
          >
            <HeroPortrait mouseX={mouseX} mouseY={mouseY} />
          </motion.div>

          {/* Availability badge — left, aligned with portrait's upper-chest band */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="absolute z-30"
            style={{ left: "4.5%", top: "42.5%" }}
          >
            <div className="inline-flex w-fit items-center gap-2 whitespace-nowrap rounded-full border border-[var(--color-line)] bg-[var(--color-paper)]/80 px-4 py-2 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-amber)] opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-amber)]" />
              </span>
              <span className="text-[13px] font-medium text-[var(--color-ink-soft)]">{siteConfig.personal.availability}</span>
            </div>
          </motion.div>

          {/* Supporting copy — right, same band as the badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.48 }}
            className="absolute z-30 text-right"
            style={{ right: "4%", top: "39%", maxWidth: "17%" }}
          >
            <p className="text-[15px] leading-relaxed text-[var(--color-ink-soft)]">{siteConfig.personal.tagline}</p>
          </motion.div>

          {/* I AM SANSKAR — bottom left, large */}
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="font-display absolute z-30 whitespace-nowrap uppercase leading-[0.86] text-[var(--color-ink)]"
            style={{ left: "4.5%", top: "68%", fontSize: "12.5vh" }}
          >
            {siteConfig.hero.lineOne}
            <br />
            {siteConfig.hero.lineTwo}
          </motion.h2>

          {/* PRODUCT THINKER — bottom right, smaller than SANSKAR but still large */}
          <motion.h3
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
            className="font-display absolute z-30 whitespace-nowrap text-right uppercase leading-[0.9] text-[var(--color-ink)]"
            style={{ right: "4%", top: "80%", fontSize: "6.8vh" }}
          >
            {siteConfig.hero.roleLineOne}
            <br />
            {siteConfig.hero.roleLineTwo}
          </motion.h3>

          {/* CTAs — compact, tucked at the very bottom */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="absolute z-30 flex flex-wrap items-center gap-2"
            style={{ left: "4.5%", top: "93%" }}
          >
            <PillButton href={siteConfig.hero.ctas.primary.href} variant="solid" className="!px-4 !py-2 !text-[11px]">
              {siteConfig.hero.ctas.primary.label}
            </PillButton>
            <PillButton href={siteConfig.hero.ctas.secondary.href} variant="outline" className="!px-4 !py-2 !text-[11px]">
              {siteConfig.hero.ctas.secondary.label}
            </PillButton>
            <PillButton href={resumeHref} variant="outline" external cursorLabel="OPEN" className="!px-4 !py-2 !text-[11px]">
              {siteConfig.hero.ctas.tertiary.label}
            </PillButton>
          </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
