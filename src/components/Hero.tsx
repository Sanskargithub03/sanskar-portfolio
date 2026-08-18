import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";

import { siteConfig } from "@/data/siteConfig";
import HeroPortrait from "./HeroPortrait";
import RevealText from "./RevealText";
import PillButton from "./PillButton";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 18,
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
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

    return () => {
      window.removeEventListener("mousemove", handle);
    };
  }, [mouseX, mouseY, reduced]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const scrollFade = useTransform(
    scrollYProgress,
    [0, 0.75, 1],
    [1, 1, 0]
  );

  const scrollScale = useTransform(
    scrollYProgress,
    [0, 1],
    [1, 0.97]
  );

  const smoothFade = useSpring(scrollFade, {
    stiffness: 100,
    damping: 30,
  });

  const resumeHref = siteConfig.social.resume;

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative w-full overflow-hidden"
    >
      <motion.div
        style={
          reduced
            ? undefined
            : {
                opacity: smoothFade,
                scale: scrollScale,
              }
        }
        className="relative w-full"
      >

        {/* =========================================================
            MOBILE / TABLET
            ========================================================= */}

        <div className="relative flex min-h-[100svh] w-full flex-col pt-[76px] sm:pt-[84px] lg:hidden">

          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.09,
                },
              },
            }}
            className="
              relative
              mx-auto
              flex
              w-full
              max-w-2xl
              flex-1
              flex-col
              px-5
              sm:px-8
            "
          >

            {/* MOBILE GREETING */}

            <div className="relative z-30 flex justify-center">
              <RevealText
                text={siteConfig.hero.greeting}
                as="h1"
                mode="word"
                delay={0.15}
                className="
                  font-serif-display
                  text-[18vw]
                  leading-[0.9]
                  tracking-[-0.035em]
                  sm:text-6xl
                "
              />
            </div>

            {/* MOBILE PORTRAIT */}

            <div
              className="
                relative
                z-10
                mx-auto
                -mt-1
                h-full
                min-h-[380px]
                w-full
                max-w-[420px]
                sm:min-h-[440px]
                sm:max-w-[470px]
              "
            >
              <HeroPortrait
                mouseX={mouseX}
                mouseY={mouseY}
              />
            </div>

            {/* MOBILE AVAILABILITY */}

            <motion.div
              variants={fadeUp}
              className="
                relative
                z-30
                -mt-2
                flex
                flex-col
                items-center
                gap-2
                text-center
              "
            >
              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-[var(--color-line)]
                  bg-[var(--color-paper)]/70
                  px-3.5
                  py-1.5
                  backdrop-blur-sm
                "
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span
                    className="
                      absolute
                      inline-flex
                      h-full
                      w-full
                      animate-ping
                      rounded-full
                      bg-[var(--color-amber)]
                      opacity-60
                    "
                  />

                  <span
                    className="
                      relative
                      inline-flex
                      h-1.5
                      w-1.5
                      rounded-full
                      bg-[var(--color-amber)]
                    "
                  />
                </span>

                <span
                  className="
                    text-[10.5px]
                    font-medium
                    text-[var(--color-ink-soft)]
                  "
                >
                  {siteConfig.personal.availability}
                </span>
              </div>

              <p
                className="
                  max-w-[270px]
                  text-[11.5px]
                  leading-relaxed
                  text-[var(--color-taupe)]
                "
              >
                {siteConfig.personal.tagline}
              </p>
            </motion.div>

            {/* MOBILE NAME */}

            <motion.div
              variants={fadeUp}
              className="
                relative
                z-30
                mt-2
                flex
                flex-col
                items-center
                gap-2
              "
            >
              <h2
                className="
                  font-display
                  text-center
                  text-[15vw]
                  uppercase
                  leading-[0.82]
                  tracking-[-0.035em]
                  text-[var(--color-ink)]
                  sm:text-[8vw]
                "
              >
                {siteConfig.hero.lineOne}
                <br />
                {siteConfig.hero.lineTwo}
              </h2>

              <h3
                className="
                  font-display
                  text-center
                  text-[9vw]
                  uppercase
                  leading-[0.86]
                  tracking-[-0.025em]
                  text-[var(--color-ink)]
                  sm:text-[5vw]
                "
              >
                {siteConfig.hero.roleLineOne}
                <br />
                {siteConfig.hero.roleLineTwo}
              </h3>
            </motion.div>

            {/* MOBILE CTA */}

            <motion.div
              variants={fadeUp}
              className="
                relative
                z-30
                flex
                flex-wrap
                items-center
                justify-center
                gap-2.5
                pb-6
                pt-3
              "
            >
              <PillButton
                href={siteConfig.hero.ctas.primary.href}
                variant="solid"
                className="!px-5 !py-2.5 !text-[12px]"
              >
                {siteConfig.hero.ctas.primary.label}
              </PillButton>

              <PillButton
                href={siteConfig.hero.ctas.secondary.href}
                variant="outline"
                className="!px-5 !py-2.5 !text-[12px]"
              >
                {siteConfig.hero.ctas.secondary.label}
              </PillButton>

              <PillButton
                href={resumeHref}
                variant="outline"
                external
                cursorLabel="OPEN"
                className="!px-5 !py-2.5 !text-[12px]"
              >
                {siteConfig.hero.ctas.tertiary.label}
              </PillButton>
            </motion.div>
          </motion.div>
        </div>


        {/* =========================================================
            DESKTOP
            ========================================================= */}

        <div
          className="
            relative
            hidden
            min-h-[100svh]
            w-full
            lg:block
          "
        >

          <div
            className="
              relative
              mx-auto
              h-full
              min-h-[100svh]
              w-full
              max-w-[1600px]
            "
          >

            {/* =====================================================
                HEY, THERE

                ONLY THIS PART HAS BEEN CHANGED.

                Same positioning logic as your reference code:
                centered across the complete hero,
                top 3%,
                z-10.

                Portrait stays above it at z-20,
                creating:

                       Hey,   [FACE]   there

                ===================================================== */}

            <motion.p
              initial={{
                opacity: 0,
                y: 16,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.9,
                ease: [0.22, 1, 0.36, 1],
              }}
style={{ wordSpacing: "15vw" }}
              className="
                absolute
                inset-x-0
                top-[17%]
                z-10
                text-center
                font-serif-display
                text-[clamp(3rem,min(15vw,22vh),12rem)]
                leading-[0.9]
                tracking-[-0.035em]
                whitespace-nowrap


              "
            >
              Hey, there
            </motion.p>


            {/* =====================================================
                PORTRAIT
                ===================================================== */}

            <motion.div
              initial={{
                opacity: 0,
                y: 30,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
                delay: 0.25,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="
                absolute
                z-20
              "
              style={{
                left: "28%",
                top: "7%",
                width: "44%",
                height: "93%",
              }}
            >
              <HeroPortrait
                mouseX={mouseX}
                mouseY={mouseY}
              />
            </motion.div>


            {/* =====================================================
                AVAILABILITY BADGE
                ===================================================== */}

            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                duration: 0.5,
                delay: 0.45,
              }}
              className="absolute z-30"
              style={{
                left: "4.5%",
                top: "42.5%",
              }}
            >
              <div
                className="
                  inline-flex
                  w-fit
                  items-center
                  gap-2
                  whitespace-nowrap
                  rounded-full
                  border
                  border-[var(--color-line)]
                  bg-[var(--color-paper)]/80
                  px-4
                  py-2
                  backdrop-blur-sm
                "
              >
                <span className="relative flex h-2 w-2">
                  <span
                    className="
                      absolute
                      inline-flex
                      h-full
                      w-full
                      animate-ping
                      rounded-full
                      bg-[var(--color-amber)]
                      opacity-60
                    "
                  />

                  <span
                    className="
                      relative
                      inline-flex
                      h-2
                      w-2
                      rounded-full
                      bg-[var(--color-amber)]
                    "
                  />
                </span>

                <span
                  className="
                    text-[13px]
                    font-medium
                    text-[var(--color-ink-soft)]
                  "
                >
                  {siteConfig.personal.availability}
                </span>
              </div>
            </motion.div>


            {/* =====================================================
                SUPPORTING COPY
                ===================================================== */}

            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                duration: 0.5,
                delay: 0.48,
              }}
              className="
                absolute
                z-30
                text-right
              "
              style={{
                right: "4%",
                top: "39%",
                maxWidth: "17%",
              }}
            >
              <p
                className="
                  text-[15px]
                  leading-relaxed
                  text-[var(--color-ink-soft)]
                "
              >
                {siteConfig.personal.tagline}
              </p>
            </motion.div>


            {/* =====================================================
                I AM SANSKAR
                ===================================================== */}

            <motion.h2
              initial={{
                opacity: 0,
                y: 24,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.55,
                delay: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                font-display
                absolute
                z-30
                whitespace-nowrap
                uppercase
                leading-[0.86]
                tracking-[-0.035em]
                text-[var(--color-ink)]
              "
              style={{
                left: "4.5%",
                top: "68%",
                fontSize: "clamp(78px, 12.5vh, 140px)",
              }}
            >
              {siteConfig.hero.lineOne}
              <br />
              {siteConfig.hero.lineTwo}
            </motion.h2>


            {/* =====================================================
                PRODUCT THINKER
                ===================================================== */}

            <motion.h3
              initial={{
                opacity: 0,
                y: 24,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.55,
                delay: 0.38,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                font-display
                absolute
                z-30
                whitespace-nowrap
                text-right
                uppercase
                leading-[0.9]
                tracking-[-0.03em]
                text-[var(--color-ink)]
              "
              style={{
                right: "4%",
                top: "80%",
                fontSize: "clamp(52px, 6.8vh, 80px)",
              }}
            >
              {siteConfig.hero.roleLineOne}
              <br />
              {siteConfig.hero.roleLineTwo}
            </motion.h3>


            {/* =====================================================
                CTA BUTTONS
                ===================================================== */}

            <motion.div
              initial={{
                opacity: 0,
                y: 12,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.5,
                delay: 0.55,
              }}
              className="
                absolute
                z-30
                flex
                flex-wrap
                items-center
                gap-2
              "
              style={{
                left: "4.5%",
                top: "93%",
              }}
            >
              <PillButton
                href={siteConfig.hero.ctas.primary.href}
                variant="solid"
                className="!px-4 !py-2 !text-[11px]"
              >
                {siteConfig.hero.ctas.primary.label}
              </PillButton>

              <PillButton
                href={siteConfig.hero.ctas.secondary.href}
                variant="outline"
                className="!px-4 !py-2 !text-[11px]"
              >
                {siteConfig.hero.ctas.secondary.label}
              </PillButton>

              <PillButton
                href={resumeHref}
                variant="outline"
                external
                cursorLabel="OPEN"
                className="!px-4 !py-2 !text-[11px]"
              >
                {siteConfig.hero.ctas.tertiary.label}
              </PillButton>
            </motion.div>

          </div>
        </div>

      </motion.div>
    </section>
  );
}
