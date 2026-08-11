"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { SectionHeading } from "./Animations";
import { placements, devPrograms } from "@/data/content";

export default function Legacy() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".legacy-pillar",
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.05,
          stagger: 0.09,
          ease: "power3.out",
          scrollTrigger: { trigger: ".legacy-grid", start: "top 80%" },
        }
      );
      gsap.fromTo(
        ".dev-row",
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
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
        <SectionHeading
          chapterLabel="Chapter VII · The Legacy"
          num="VII"
          title="The Placement Bench & Beyond"
          description="A placement cell is a promise kept in instalments — internship to offer-letter, aptitude to ambition. Dr. Malik has kept it, year after year."
        />

        <div className="legacy-grid grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {placements.map((p, i) => (
            <article key={i} className="legacy-pillar gilt-card group relative p-7">
              <span className="corner-diamond left-3 top-3" />
              <span className="corner-diamond right-3 top-3" />
              <span className="corner-diamond bottom-3 left-3" />
              <span className="corner-diamond bottom-3 right-3" />
              <p className="font-serif text-3xl font-light text-gold-gradient">{String(i + 1).padStart(2, "0")}</p>
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

        <div className="mt-16 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
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
                <span className="hidden text-gold-500/70 transition-transform duration-500 group-hover:translate-x-1 sm:block">→</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}