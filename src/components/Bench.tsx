"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { InkReveal } from "./Animations";
import { editorial } from "@/data/content";

export default function Bench() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".bench-role").forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: (i % 2) * 0.1, scrollTrigger: { trigger: el, start: "top 86%" } }
        );
      });
      gsap.fromTo(
        ".publisher-chip",
        { opacity: 0, scale: 0.85 },
        { opacity: 1, scale: 1, duration: 0.7, stagger: 0.05, ease: "back.out(1.7)", scrollTrigger: { trigger: ".publisher-row", start: "top 82%" } }
      );

      const lines = Array.from(root.querySelectorAll<SVGPathElement>(".bench-sign-ink"));
      lines.forEach((line) => {
        const len = line.getTotalLength();
        gsap.set(line, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(line, {
          strokeDashoffset: 0,
          duration: 2.2,
          ease: "power2.inOut",
          scrollTrigger: { trigger: ".bench-sign", start: "top 82%" },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} id="bench" className="relative scroll-mt-24 overflow-hidden py-24 sm:py-36">
      <div className="pointer-events-none absolute -left-20 bottom-20 select-none" aria-hidden>
        <span className="super-monogram text-[20rem]">{`Rh`}</span>
      </div>
      <div className="mx-auto max-w-[1500px] px-5 sm:px-10">
        <div className="mb-14 grid items-end gap-8 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <p className="mb-4 flex items-center gap-3 font-cinzel text-[11px] uppercase tracking-[0.32em] text-gold-400">
              <span className="index-tick" />
              Chapter V — Editorial Trust
            </p>
            <h2 className="font-serif text-[clamp(2.1rem,5.5vw,4.2rem)] font-light leading-[1.02] text-parchment-100">
              <InkReveal text="The Editorial Bench" />
            </h2>
          </div>
          <p className="max-w-md font-sans text-sm font-light leading-[1.9] text-slate-cold lg:justify-self-end lg:text-right">
            {editorial.openings}
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {editorial.columns.map((c, i) => (
            <article key={i} className="bench-role group relative border-t border-gold-500/20 bg-ink-900/30 p-7 transition-all duration-500 hover:border-gold-500/50 hover:bg-ink-900/70">
              <span className="absolute right-6 top-5 font-serif text-4xl font-light text-slate-cold-2/40 transition-colors duration-500 group-hover:text-gold-400">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="font-cinzel text-[10px] uppercase tracking-[0.26em] text-gold-400">{c.role}</p>
              <h3 className="mt-3 font-serif text-lg font-medium leading-snug text-parchment-50">{c.journal}</h3>
              <div className="gold-rule my-4" />
              <p className="font-sans text-[13px] font-light leading-relaxed text-slate-cold">{c.note}</p>
            </article>
          ))}
        </div>

        <div className="mt-14">
          <p className="publisher-row mb-5 flex items-center gap-4 font-cinzel text-[10px] uppercase tracking-[0.3em] text-gold-400">
            <span className="h-px w-10 bg-gold-500/50" />
            Housed in the annals of
          </p>
          <div className="publisher-row flex flex-wrap gap-2.5">
            {editorial.publishers.map((p, i) => (
              <span
                key={i}
                data-cursor-label={p.note}
                className="publisher-chip flex cursor-pointer items-center gap-2.5 border border-gold-500/20 bg-ink-900/60 px-4 py-2.5 transition-all duration-500 hover:-translate-y-0.5 hover:border-gold-500/70 hover:bg-ink-900"
              >
                <span className="font-cinzel text-xs uppercase tracking-[0.16em] text-parchment-100">{p.name}</span>
                <span className="hidden text-[10px] italic text-slate-cold-2 group-hover:text-gold-300 sm:inline">· {p.note}</span>
              </span>
            ))}
          </div>
        </div>

        <div className="bench-sign mt-16 grid items-center gap-8 border-t border-gold-500/15 pt-12 lg:grid-cols-[auto_1fr]">
          <div className="mx-auto lg:mx-0">
            <svg viewBox="0 0 200 80" className="h-24 w-60 text-gold-300" fill="none" stroke="currentColor" strokeWidth="1.2">
              <path className="bench-sign-ink" d="M20 62 C 40 30, 90 22, 108 40 S 160 60, 190 36" />
              <path className="bench-sign-ink" d="M40 72 C 60 52, 100 48, 120 58 S 170 68, 196 52" opacity="0.7" />
            </svg>
            <p className="mt-2 text-center font-cinzel text-[10px] uppercase tracking-[0.32em] text-gold-400">Signed across continents</p>
          </div>
          <div className="relative">
            <p className="font-serif text-xl font-light italic leading-relaxed text-parchment-200/80 sm:text-2xl">
              “To be trusted with the finality of a manuscript is to guard the integrity of a discipline.
              Dr. Ritika Malik has been entrusted with that trust — again, and again, and again.”
            </p>
            <span className="docket-stamp absolute -right-2 top-1 px-3 py-1.5 text-[10px] sm:right-4 sm:-top-6">Editorial Seal</span>
          </div>
        </div>
      </div>
    </section>
  );
}