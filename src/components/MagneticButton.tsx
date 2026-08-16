import { useRef, type ReactNode, type ElementType, type ComponentPropsWithoutRef } from "react";
import { useIsTouchDevice, useReducedMotion } from "@/hooks/useReducedMotion";

type MagneticButtonProps<T extends ElementType> = {
  as?: T;
  children: ReactNode;
  className?: string;
  strength?: number;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

/**
 * Wraps any interactive element (button/a) with a very subtle magnetic
 * pull toward the pointer — 3–5px max. No-op on touch devices and when
 * reduced motion is requested.
 */
export default function MagneticButton<T extends ElementType = "button">({
  as,
  children,
  className = "",
  strength = 4,
  ...rest
}: MagneticButtonProps<T>) {
  const ref = useRef<HTMLElement>(null);
  const isTouch = useIsTouchDevice();
  const reduced = useReducedMotion();
  const Component = (as || "button") as ElementType;
  const disabled = isTouch || reduced;

  const handleMove = (e: React.MouseEvent) => {
    if (disabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    const x = (relX / rect.width) * strength * 2;
    const y = (relY / rect.height) * strength * 2;
    ref.current.style.transform = `translate(${x}px, ${y}px)`;
    const arrow = ref.current.querySelector<HTMLElement>("[data-arrow]");
    if (arrow) arrow.style.transform = `translate(${x * 0.6}px, ${y * 0.6}px)`;
  };

  const handleLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = "translate(0px, 0px)";
    const arrow = ref.current.querySelector<HTMLElement>("[data-arrow]");
    if (arrow) arrow.style.transform = "translate(0px, 0px)";
  };

  return (
    <Component
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`transition-transform duration-200 ease-out will-change-transform ${className}`}
      {...rest}
    >
      {children}
    </Component>
  );
}
