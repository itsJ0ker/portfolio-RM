"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { InkReveal } from "./Animations";
import { placements, devPrograms } from "@/data/content";

export default function Legacy() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".legacy-pillar").forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 60 },
          { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: (i % 3) * 0.08, scrollTrigger: { trigger: el, start: "top 86%" } }
        );
      });
gsap.fromTo(
        ".dev-row",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: ".dev-list", start: "top 82%" },
        }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} id="legacy" className="relative scroll-mt-24 py-24 sm:py-36">
      <div className="pointer-events-none absolute inset-0 paper-grain opacity-50" />
      <div className="mx-auto max-w-[1500px] px-5 sm:px-10">
        <div className="mb-14 grid items-end gap-8 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <p className="mb-4 flex items-center gap-3 font-cinzel text-[11px] uppercase tracking-[0.32em] text-gold-400">
              <span className="index-tick" />
              Chapter VII — The Legacy
            </p>
            <h2 className="font-serif text-[clamp(2.1rem,5.5vw,4.2rem)] font-light leading-[1.02] text-parchment-100">
              <InkReveal text="The Placement Bench & Beyond" />
            </h2>
          </div>
          <p className="max-w-md font-sans text-sm font-light leading-[1.9] text-slate-cold lg:justify-self-end lg:text-right">
            A placement cell is a promise kept in instalments — internship to offer-letter,
            aptitude to ambition. Dr. Malik has kept it, year after year.
          </p>
        </div>

        <div className="legacy-grid grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {placements.map((p, i) => (
            <article key={i} className="legacy-pillar group relative border-t border-gold-500/20 bg-ink-900/30 p-7 transition-all duration-500 hover:border-gold-500/50 hover:bg-ink-900/70">
              <div className="flex items-start justify-between">
                <span className="font-serif text-3xl font-light text-slate-cold-2/40 transition-colors duration-500 group-hover:text-gold-400">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="docket-stamp px-1.5 py-0.5 text-[8px] tracking-[0.2em] opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  Filed
                </span>
              </div>
              <h3 className="mt-3 font-serif text-lg font-medium text-parchment-50">{p.title}</h3>
              <div className="gold-rule my-4" />
              <ul className="space-y-2.5">
                {p.list.map((item, j) => (
                  <li key={j} className="flex items-start gap-3 font-sans text-[13px] font-light leading-relaxed text-slate-cold">
                    <span className="mt-[7px] inline-block h-1.5 w-1.5 rotate-45 border border-gold-400/70" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="flex items-center gap-4 font-cinzel text-[10px] uppercase tracking-[0.3em] text-gold-400">
              <span className="h-px w-10 bg-gold-500/50" /> The Learning Docket
            </p>
            <p className="mt-4 max-w-md font-serif text-lg font-light leading-relaxed text-parchment-200/80">
              A teacher who refuses to stop learning — from Bennett University to Solapur, from SPSS to Generative AI, certified by Google.org and the Asian Development Bank.
            </p>
          </div>
          <div className="dev-list space-y-3">
            {devPrograms.map((d, i) => (
              <div key={i} data-cursor-label={d.org} className="dev-row group flex items-center gap-5 border border-gold-500/12 bg-ink-900/50 px-6 py-4 backdrop-blur-sm transition-colors duration-500 hover:border-gold-500/45">
                <span className="w-16 font-cinzel text-[10px] uppercase tracking-[0.16em] text-gold-400">{d.date}</span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-serif text-[15px] font-medium text-parchment-50">{d.title}</p>
                  <p className="truncate font-sans text-xs font-light text-slate-cold">{d.org}</p>
                </div>
                <span className="hidden h-8 w-px bg-gold-500/20 sm:block" />
                <span className="hidden text-gold-500/70 transition-transform duration-500 group-hover:translate-x-1 sm:block">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}