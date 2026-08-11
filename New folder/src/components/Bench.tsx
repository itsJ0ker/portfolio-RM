"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { SectionHeading } from "./Animations";
import { editorial } from "@/data/content";

export default function Bench() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".bench-column",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".bench-grid", start: "top 78%" },
        }
      );
      gsap.fromTo(
        ".publisher-chip",
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.7,
          stagger: 0.05,
          ease: "back.out(1.7)",
          scrollTrigger: { trigger: ".publisher-row", start: "top 82%" },
        }
      );
      gsap.fromTo(
        ".bench-sign",
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1.8,
          ease: "power2.inOut",
          scrollTrigger: { trigger: ".bench-sign", start: "top 90%" },
        }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} id="bench" className="relative scroll-mt-24 py-24 sm:py-36">
      <div className="pointer-events-none absolute inset-0 paper-grain opacity-50" />
      <div className="mx-auto max-w-[1500px] px-5 sm:px-10">
        <SectionHeading
          chapterLabel="Chapter V · Editorial Trust"
          num="V"
          title="The Editorial Bench"
          description={editorial.openings}
        />

        <div className="bench-grid grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {editorial.columns.map((c, i) => (
            <article key={i} className="bench-column gilt-card group relative p-7">
              <span className="corner-diamond left-3 top-3" />
              <span className="corner-diamond right-3 top-3" />
              <span className="font-serif text-3xl font-light text-gold-gradient">{(i + 1).toString().padStart(2, "0")}</span>
              <p className="mt-4 font-cinzel text-[10px] uppercase tracking-[0.26em] text-gold-400">{c.role}</p>
              <h3 className="mt-2 font-serif text-lg font-medium leading-snug text-parchment-50">{c.journal}</h3>
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
          <div className="publisher-row flex flex-wrap gap-3">
            {editorial.publishers.map((p, i) => (
              <span key={i} data-cursor-label={p.note} className="publisher-chip group flex cursor-pointer items-center gap-3 border border-gold-500/20 bg-ink-900/60 px-5 py-3 transition-all duration-500 hover:border-gold-500/60 hover:bg-ink-900">
                <span className="font-cinzel text-xs uppercase tracking-[0.18em] text-parchment-100">{p.name}</span>
                <span className="hidden text-[10px] italic text-slate-cold-2 group-hover:text-gold-300 sm:inline">· {p.note}</span>
              </span>
            ))}
          </div>
        </div>

        <div className="bench-sign mt-16 grid items-center gap-8 border-t border-gold-500/15 pt-12 lg:grid-cols-[auto_1fr]">
          <div className="mx-auto lg:mx-0">
            <svg viewBox="0 0 200 80" className="h-20 w-52 text-gold-300" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M20 62 C 40 30, 90 22, 108 40 S 160 60, 190 36" strokeDasharray="4 5" />
              <path d="M40 72 C 60 52, 100 48, 120 58 S 170 68, 196 52" strokeDasharray="2 5" opacity="0.6" />
            </svg>
            <p className="mt-2 text-center font-cinzel text-[10px] uppercase tracking-[0.32em] text-gold-400">Signed across continents</p>
          </div>
          <p className="font-serif text-xl font-light italic leading-relaxed text-parchment-200/80 sm:text-2xl">
            “To be trusted with the finality of a manuscript is to guard the integrity of a discipline. Dr. Ritika Malik has been entrusted with that trust — again, and again, and again.”
          </p>
        </div>
      </div>
    </section>
  );
}