import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type RevealTextProps = {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  mode?: "word" | "char";
  delay?: number;
  triggerOnView?: boolean;
  stagger?: number;
};

/**
 * Splits text into words (or characters) and reveals them with a
 * staggered upward clip/fade. Used for the hero greeting and the
 * About paragraph's scroll-triggered reveal.
 */
export default function RevealText({
  text,
  as = "span",
  className = "",
  mode = "word",
  delay = 0,
  triggerOnView = false,
  stagger = 0.045,
}: RevealTextProps) {
  const reduced = useReducedMotion();
  const units = mode === "word" ? text.split(" ") : text.split("");
  const Wrapper = motion[as];

  if (reduced) {
    const Static = as;
    return <Static className={className}>{text}</Static>;
  }

  const container = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  };

  const child = {
    hidden: { y: "110%", opacity: 0 },
    visible: {
      y: "0%",
      opacity: 1,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <Wrapper
      className={className}
      variants={container}
      initial="hidden"
      {...(triggerOnView
        ? { whileInView: "visible", viewport: { once: true, margin: "-10% 0px" } }
        : { animate: "visible" })}
    >
      {units.map((unit, i) => (
        <span key={i} className="inline-block overflow-hidden align-top pb-[0.08em]">
          <motion.span variants={child} className="inline-block">
            {unit === "" ? "\u00A0" : unit}
            {mode === "word" && i < units.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </Wrapper>
  );
}
