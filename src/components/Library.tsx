"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { InkReveal } from "./Animations";
import { BookIcon } from "./Icons";
import { publications } from "@/data/content";

export default function Library() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".volume-row",
        { opacity: 0, x: -46 },
        { opacity: 1, x: 0, duration: 0.9, stagger: 0.08, ease: "power3.out", scrollTrigger: { trigger: ".volume-ledger", start: "top 80%" } }
      );
      gsap.fromTo(
        ".volume-mark",
        { scale: 0, rotate: -20 },
        { scale: 1, rotate: 0, duration: 0.8, ease: "back.out(2)", stagger: 0.08, scrollTrigger: { trigger: ".volume-ledger", start: "top 80%" } }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} id="library" className="relative scroll-mt-24 overflow-hidden py-24 sm:py-36">
      <div className="pointer-events-none absolute -right-24 top-24 select-none" aria-hidden>
        <span className="super-monogram text-[18rem]">{`{ }`}</span>
      </div>
      <div className="mx-auto max-w-[1500px] px-5 sm:px-10">
        <div className="mb-14 grid items-end gap-8 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <p className="mb-4 flex items-center gap-3 font-cinzel text-[11px] uppercase tracking-[0.32em] text-gold-400">
              <span className="index-tick" />
              Chapter III — The Written Word
            </p>
            <h2 className="font-serif text-[clamp(2.1rem,5.5vw,4.2rem)] font-light leading-[1.02] text-parchment-100">
              <InkReveal text="Works Bound in Scholarship" />
            </h2>
          </div>
          <p className="max-w-md font-sans text-sm font-light leading-[1.9] text-slate-cold lg:justify-self-end lg:text-right">
            From a Springer monograph to an edited volume released by a former Chief Justice — a
            bibliography that legislates itself into permanence.
          </p>
        </div>

        <div className="volume-ledger border-t border-gold-500/15">
          {publications.map((p, i) => (
            <div
              key={i}
              className={`volume-row group relative grid items-center gap-4 border-b border-gold-500/12 px-2 py-6 transition-colors duration-500 hover:bg-ink-900/40 sm:grid-cols-[56px_1fr_auto] sm:gap-6 sm:px-6 ${
                p.highlight ? "bg-gold-500/[0.04]" : "hover:bg-ink-900/40"
              }`}
            >
              <div className="hidden items-center gap-3 sm:flex">
                <span className="volume-mark flex h-11 w-11 items-center justify-center border border-gold-500/35 text-gold-300">
                  <BookIcon className="h-5 w-5" />
                </span>
                <span className="font-cinzel text-[11px] tracking-[0.18em] text-slate-cold-2">
                  Nº {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="min-w-0">
                <div className="mb-1 flex flex-wrap items-center gap-2">
                  <span className={`font-cinzel text-[10px] uppercase tracking-[0.24em] ${p.highlight ? "text-gold-300" : "text-slate-cold-2"}`}>
                    {p.kind}
                  </span>
                  {p.highlight ? (
                    <span className="border border-gold-500/30 bg-gold-500/10 px-1.5 py-0.5 font-cinzel text-[9px] uppercase tracking-[0.2em] text-gold-400">Highlight</span>
                  ) : null}
                </div>
                <h3 className="font-serif text-lg font-medium leading-snug text-parchment-50 transition-colors duration-500 group-hover:text-gold-200 sm:text-xl">
                  {p.title}
                </h3>
                <p className="mt-1 font-sans text-[13px] font-light leading-relaxed text-slate-cold">{p.venue}</p>
              </div>
              <div className="row-start-1 flex items-center justify-between gap-2 sm:row-auto sm:block sm:text-right">
                <span className="border border-gold-500/30 bg-gold-500/5 px-3 py-1 font-cinzel text-[10px] uppercase tracking-[0.2em] text-gold-300">
                  {p.tag}
                </span>
                <span className="font-serif text-xs italic text-gold-500/60 sm:hidden">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <span className="hidden h-8 w-px bg-gold-500/15 transition-colors duration-500 group-hover:bg-gold-500/40 sm:inline-block" />
            </div>
          ))}

          <div className="volume-row flex flex-col items-center gap-3 py-10 text-center">
            <span className="font-serif text-4xl text-gold-gradient">§</span>
            <h3 className="font-serif text-xl font-light text-parchment-100">Further Works in Progress</h3>
            <p className="max-w-sm font-sans text-[13px] font-light leading-relaxed text-slate-cold">
              Edited volumes, IEEE proceedings and UGC CARE papers continue to accumulate — the library never rests.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}