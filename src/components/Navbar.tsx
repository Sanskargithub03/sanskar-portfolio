import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/data/siteConfig";
import PillButton from "./PillButton";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#home");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = siteConfig.nav.map((n) => document.querySelector(n.href)).filter(Boolean) as HTMLElement[];
    if (!sections.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 sm:px-6"
      >
        <div
          className={`mt-3 flex w-full max-w-6xl items-center justify-between rounded-full px-5 transition-all duration-500 ${
            scrolled
              ? "border border-[var(--color-line)] bg-[var(--color-cream)]/80 py-2.5 shadow-[0_8px_30px_-15px_rgba(22,19,15,0.25)] backdrop-blur-md"
              : "border border-transparent bg-transparent py-3.5"
          }`}
        >
          <a
  href="#home"
  className="relative -left-30 font-serif-display text-lg font-black text-[var(--color-ink)] sm:text-xl"
  data-cursor=""
>
Sanskar
</a>

          <nav className="hidden items-center gap-1 md:flex">
            {siteConfig.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`relative rounded-full px-4 py-2 text-[13px] font-medium transition-colors ${
                  active === item.href ? "text-[var(--color-ink)]" : "text-[var(--color-taupe)] hover:text-[var(--color-ink)]"
                }`}
              >
                {item.label}
                {active === item.href && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-x-3 -bottom-0.5 h-[2px] rounded-full bg-[var(--color-amber)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </nav>

          <div className="hidden md:block">
            <PillButton href="#contact" className="!px-5 !py-2.5 !text-[12px]">
              Contact
            </PillButton>
          </div>

          <button
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] md:hidden"
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className="h-[1.5px] w-5 bg-[var(--color-ink)]"
            />
            <motion.span animate={menuOpen ? { opacity: 0 } : { opacity: 1 }} className="h-[1.5px] w-5 bg-[var(--color-ink)]" />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className="h-[1.5px] w-5 bg-[var(--color-ink)]"
            />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-[var(--color-cream)] md:hidden"
          >
            <div className="flex h-full flex-col items-center justify-center gap-8">
              {siteConfig.nav.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * i, duration: 0.4 }}
                  className="font-display text-4xl uppercase tracking-tight"
                >
                  {item.label}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 * siteConfig.nav.length, duration: 0.4 }}
                className="mt-4 rounded-full bg-[var(--color-ink)] px-8 py-3.5 text-[13px] font-semibold uppercase tracking-widest text-[var(--color-cream)]"
              >
                Contact
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
