import type { ReactNode } from "react";
import MagneticButton from "./MagneticButton";

type PillButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline";
  external?: boolean;
  cursorLabel?: string;
  className?: string;
  onClick?: () => void;
};

/** Black pill button / outline pill button, used for every CTA on the site. */
export default function PillButton({
  href,
  children,
  variant = "solid",
  external = false,
  cursorLabel = "OPEN",
  className = "",
  onClick,
}: PillButtonProps) {
  const base =
    "group inline-flex items-center gap-2.5 rounded-full px-6 py-3.5 text-[13px] font-semibold tracking-[0.04em] transition-colors duration-300";
  const styles =
    variant === "solid"
      ? "bg-[var(--color-ink)] text-[var(--color-cream)] hover:bg-[var(--color-ink-soft)]"
      : "bg-transparent text-[var(--color-ink)] border border-[var(--color-ink)]/70 hover:border-[var(--color-ink)]";

  const isAnchor = href.startsWith("#");
  const isMail = href.startsWith("mailto:") || href.startsWith("tel:");

  return (
    <MagneticButton
      as="a"
      href={href}
      onClick={onClick}
      className={`${base} ${styles} ${className}`}
      data-cursor={!isAnchor ? cursorLabel : undefined}
      target={external && !isMail ? "_blank" : undefined}
      rel={external && !isMail ? "noopener noreferrer" : undefined}
    >
      <span>{children}</span>
      <span data-arrow className="inline-block transition-transform duration-200">
        →
      </span>
    </MagneticButton>
  );
}
