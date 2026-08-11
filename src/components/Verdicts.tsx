"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { InkReveal } from "./Animations";
import { RibbonIcon } from "./Icons";
import { recognitions } from "@/data/content";

export default function Verdicts() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".verdict-row").forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", delay: (i % 4) * 0.08, scrollTrigger: { trigger: el, start: "top 88%" } }
        );
      });
      gsap.fromTo(
        ".verdict-rail",
        { scaleY: 0 },
        { scaleY: 1, transformOrigin: "top", duration: 1.8, ease: "power2.inOut", scrollTrigger: { trigger: ".verdict-book", start: "top 75%", end: "bottom 70%", scrub: 0.6 } }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} id="verdict" className="relative scroll-mt-24 py-24 sm:py-36">
      <div className="pointer-events-none absolute inset-0 paper-grain opacity-60" />
      <div className="mx-auto max-w-[1500px] px-5 sm:px-10">
        <div className="mb-14 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-4 flex items-center gap-3 font-cinzel text-[11px] uppercase tracking-[0.32em] text-gold-400">
              <span className="index-tick" />
              Chapter IV — Recognition
            </p>
            <h2 className="font-serif text-[clamp(2.1rem,5.5vw,4.2rem)] font-light leading-[1.02] text-parchment-50">
              <InkReveal text="The Verdicts" />
            </h2>
          </div>
          <blockquote className="max-w-md border-l border-gold-500/30 pl-5">
            <p className="font-serif text-lg font-light italic leading-relaxed text-slate-cold">
              &ldquo;A reviewer&apos;s signature is a quiet act of justice — verifying that no flawed claim ever passes into the body of knowledge.&rdquo;
            </p>
          </blockquote>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.5fr]">
          <div className="self-start">
            <div className="sticky top-28 border border-gold-500/15 bg-ink-900/40 p-8 backdrop-blur-sm">
              <span className="corner-diamond left-3 top-3" />
              <span className="corner-diamond right-3 top-3" />
              <p className="font-cinzel text-[10px] uppercase tracking-[0.3em] text-gold-400">Certified</p>
              <p className="mt-4 font-serif text-2xl font-light leading-snug text-parchment-100">
                Certificates of Excellence engraved in the registers of the world&apos;s most exacting journals.
              </p>
              <div className="gold-rule my-5" />
              <p className="font-sans text-sm font-light leading-relaxed text-slate-cold">
                Each is a verdict — returned, again and again, in her favour.
              </p>
              <span className="docket-stamp mt-6 px-3 py-1.5 text-[10px]">8 Verdicts · 2024–2026</span>
            </div>
          </div>

          <div className="verdict-book relative">
            <div className="verdict-rail pointer-events-none absolute left-[26px] top-3 bottom-3 w-px bg-gradient-to-b from-gold-400/60 via-gold-500/20 to-transparent" />
            <div className="space-y-3">
              {recognitions.map((r, i) => (
                <div
                  key={i}
                  className="verdict-row group relative flex items-center gap-5 border border-gold-500/12 bg-ink-900/45 py-5 pl-5 pr-5 backdrop-blur-sm transition-all duration-500 hover:translate-x-1 hover:border-gold-500/45 hover:bg-ink-900/80"
                >
                  <div className="relative flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-gold-500/30 text-gold-300 transition-all duration-500 group-hover:bg-gold-500/15">
                    <RibbonIcon className="h-5 w-5" />
                    <span className="absolute -bottom-1 -right-1 text-[9px] font-serif italic text-gold-500/70">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-serif text-base font-medium leading-snug text-parchment-50 sm:text-lg">{r.title}</h3>
                    <p className="mt-0.5 truncate font-sans text-xs font-light text-slate-cold">{r.org}</p>
                  </div>
                  <span className="shrink-0 font-cinzel text-[11px] tracking-[0.2em] text-gold-400">{r.year}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}