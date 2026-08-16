import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/data/siteConfig";

export default function Loader({ show }: { show: boolean }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[var(--color-cream)]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: [0.65, 0, 0.35, 1] } }}
        >
          <motion.p
            className="font-display text-[15px] uppercase tracking-[0.35em] text-[var(--color-ink)]"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {siteConfig.personal.name}
          </motion.p>
          <motion.div
            className="mt-4 h-[2px] w-28 origin-left bg-[var(--color-ink)]"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1], delay: 0.1 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
