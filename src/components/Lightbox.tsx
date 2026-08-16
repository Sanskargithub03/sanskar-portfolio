import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { pauseLenis, resumeLenis } from "@/hooks/useLenis";

export type LightboxItem = {
  id: string;
  project: string;
  caption: string;
  src: string;
  aspect?: "portrait" | "landscape";
};

export default function Lightbox({
  items,
  index,
  onClose,
  onNavigate,
}: {
  items: LightboxItem[];
  index: number | null;
  onClose: () => void;
  onNavigate: (i: number) => void;
}) {
  useEffect(() => {
    if (index === null) return;
    document.body.style.overflow = "hidden";
    pauseLenis();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNavigate((index + 1) % items.length);
      if (e.key === "ArrowLeft") onNavigate((index - 1 + items.length) % items.length);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      resumeLenis();
      window.removeEventListener("keydown", onKey);
    };
  }, [index, items.length, onClose, onNavigate]);

  const item = index !== null ? items[index] : null;

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[95] flex flex-col items-center justify-center bg-[var(--color-ink)]/95 px-6 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={item.caption}
        >
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10"
          >
            ✕
          </button>

          <button
            onClick={() => onNavigate((index! - 1 + items.length) % items.length)}
            aria-label="Previous image"
            className="absolute left-4 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10 sm:flex"
          >
            ←
          </button>
          <button
            onClick={() => onNavigate((index! + 1) % items.length)}
            aria-label="Next image"
            className="absolute right-4 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10 sm:flex"
          >
            →
          </button>

          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className={`relative w-full overflow-hidden rounded-[24px] ${
              item.aspect === "portrait" ? "max-w-sm bg-[var(--color-ink)]" : "max-w-3xl bg-[var(--color-cream-deep)]"
            }`}
          >
            <img
              src={item.src}
              alt={item.caption}
              className={`w-full ${item.aspect === "portrait" ? "max-h-[75vh] object-contain" : "object-cover"}`}
            />
          </motion.div>
          <p className="mt-5 text-[13px] text-white/70">
            {item.project} — {item.caption}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
