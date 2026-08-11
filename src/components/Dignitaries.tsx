"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { InkReveal } from "./Animations";
import { dignitaries } from "@/data/content";

export default function Dignitaries() {
  const rootRef = useRef<HTMLElement>(null);
  const tickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      const track = tickerRef.current;
      if (track) {
        const dist = track.scrollWidth / 2;
        gsap.to(track, { xPercent: -50, ease: "none", duration: dist / 40, repeat: -1 });
      }
      gsap.utils.toArray<HTMLElement>(".name-plate").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 92%" },
          }
        );
      });
      gsap.fromTo(
        ".dignitary-col",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.12, ease: "power3.out", scrollTrigger: { trigger: ".dignitary-grid", start: "top 82%" } }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  const allNames = [...dignitaries.sc, ...dignitaries.hc, ...dignitaries.others];

  return (
    <section ref={rootRef} className="relative scroll-mt-24 overflow-hidden py-24 sm:py-36">
      <div className="pointer-events-none absolute inset-0 paper-grain opacity-60" />
      <div className="pointer-events-none absolute -right-16 bottom-16 select-none" aria-hidden>
        <span className="super-monogram text-[18rem]">{`§`}</span>
      </div>

      <div className="mb-10 border-y border-gold-500/15 bg-ink-900/40 py-4">
        <div ref={tickerRef} className="marquee-track will-change-transform">
          {[...allNames, ...allNames].map((n, i) => (
            <span key={i} className="flex items-center gap-6 pr-6">
              <span className="whitespace-nowrap font-serif text-lg font-light text-parchment-100/80">{n.name}</span>
              <span className="inline-block h-1.5 w-1.5 rotate-45 border border-gold-500/60" data-hover />
            </span>
          ))}
        </div>
      </div>

      <div className="relative mx-auto max-w-[1500px] px-5 sm:px-10">
        <div className="mb-14 grid items-end gap-8 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <p className="mb-4 flex items-center gap-3 font-cinzel text-[11px] uppercase tracking-[0.32em] text-gold-400">
              <span className="index-tick" />
              The Gallery of the Gown
            </p>
            <h2 className="font-serif text-[clamp(2.1rem,5.5vw,4.2rem)] font-light leading-[1.02] text-parchment-50">
              <InkReveal text="Among Whom She Has Sat" />
            </h2>
          </div>
          <p className="max-w-md font-sans text-sm font-light leading-[1.9] text-slate-cold lg:justify-self-end lg:text-right">
            A professional life measured in the calibre of its company — former Chief Justices,
            sitting judges, Solicitors General, and the living memory of the Indian bar.
          </p>
        </div>

        <div className="dignitary-grid grid gap-px overflow-hidden border border-gold-500/12 bg-gold-500/12 lg:grid-cols-3">
          {[
            { label: "The Supreme Bench", data: dignitaries.sc, icon: "The Highest Court" },
            { label: "High Courts & Tribunals", data: dignitaries.hc, icon: "Delhi · NGT" },
            { label: "Officers of the Court", data: dignitaries.others, icon: "SG · ASG · Senior Counsel" },
          ].map((col, ci) => (
            <div key={ci} className="dignitary-col bg-ink-950/95 p-7">
              <p className="mb-5 flex items-center justify-between border-b border-gold-500/20 pb-4">
                <span className="font-cinzel text-[11px] uppercase tracking-[0.28em] text-gold-400">{col.label}</span>
                <span className="font-cinzel text-[9px] uppercase tracking-[0.2em] text-slate-cold-2">{col.icon}</span>
              </p>
              <ul className="space-y-1">
                {col.data.map((n, i) => (
                  <li key={i}>
                    <div data-hover className="name-plate group flex items-baseline justify-between gap-3 py-2.5">
                      <span className="font-serif text-[15px] font-light text-parchment-100 transition-colors group-hover:text-gold-200">
                        {n.name}
                      </span>
                      <span className="shrink-0 text-right font-sans text-[10px] uppercase tracking-[0.12em] text-slate-cold-2">
                        {n.role}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}