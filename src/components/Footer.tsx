import { siteConfig } from "@/data/siteConfig";

export default function Footer() {
  return (
    <footer className="relative w-full border-t border-[var(--color-line)] px-5 py-10 sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 text-center sm:flex-row sm:items-end sm:justify-between sm:text-left">
        <div>
          <p className="font-serif-display text-2xl">{siteConfig.personal.name}.</p>
          <div className="mt-2 flex justify-center gap-3 text-[11px] uppercase tracking-widest text-[var(--color-taupe)] sm:justify-start">
            {siteConfig.footer.tags.map((t, i) => (
              <span key={t}>
                {t}
                {i < siteConfig.footer.tags.length - 1 && <span className="ml-3 text-[var(--color-line)]">/</span>}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-5 text-[13px] text-[var(--color-ink-soft)]">
          <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-ink)]" data-cursor="OPEN">
            LinkedIn
          </a>
          <a href={siteConfig.social.github} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-ink)]" data-cursor="OPEN">
            GitHub
          </a>
          <a href={`mailto:${siteConfig.personal.email}`} className="hover:text-[var(--color-ink)]">
            Email
          </a>
        </div>

        <div className="flex flex-col items-center gap-3 sm:items-end">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-[12px] font-semibold uppercase tracking-widest text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]"
          >
            Back to top ↑
          </button>
          <p className="text-[11px] text-[var(--color-taupe)]">© {siteConfig.footer.year} {siteConfig.personal.name}.</p>
        </div>
      </div>
    </footer>
  );
}
