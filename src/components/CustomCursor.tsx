import { useEffect, useRef, useState } from "react";
import { useIsTouchDevice, useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Minimal custom cursor. Reads data-cursor="VIEW" | "OPEN" | "CASE STUDY"
 * off the nearest interactive ancestor to label itself. Disabled on
 * touch devices and when reduced-motion is requested.
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const isTouch = useIsTouchDevice();
  const reducedMotion = useReducedMotion();
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  const disabled = isTouch || reducedMotion;

  useEffect(() => {
    if (disabled) return;

    const move = (e: PointerEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
      const el = (e.target as HTMLElement)?.closest("[data-cursor]") as HTMLElement | null;
      setLabel(el?.getAttribute("data-cursor") ?? null);
    };
    const leave = () => setVisible(false);

    window.addEventListener("pointermove", move);
    document.addEventListener("mouseleave", leave);

    let raf: number;
    const render = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.22;
      pos.current.y += (target.current.y - pos.current.y) * 0.22;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("mouseleave", leave);
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disabled]);

  if (disabled) return null;

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[100] flex items-center justify-center rounded-full mix-blend-difference transition-[width,height,opacity] duration-200 ease-out"
      style={{
        width: label ? 76 : 10,
        height: label ? 76 : 10,
        background: "#F3EEE2",
        opacity: visible ? 1 : 0,
      }}
    >
      {label && (
        <span className="text-[10px] font-semibold tracking-[0.12em] text-[#16130F] uppercase">{label}</span>
      )}
    </div>
  );
}
