"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { InkReveal, GhostMarker } from "./Animations";
import { roleIcons } from "./Icons";
import { roles } from "@/data/content";

export default function Chambers() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".chamber").forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 70 },
          { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: (i % 2) * 0.1, scrollTrigger: { trigger: el, start: "top 86%" } }
        );
      });
      gsap.fromTo(
        ".chamber-icon-ring",
        { scale: 0, rotate: -30 },
        { scale: 1, rotate: 0, duration: 0.9, ease: "back.out(2)", delay: 0.2, scrollTrigger: { trigger: ".chamber-grid", start: "top 80%" } }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} id="chambers" className="relative scroll-mt-24 overflow-hidden py-24 sm:py-36">
      <GhostMarker num="II" label="The Chambers" side="right" />
      <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto max-w-[1500px] px-5 sm:px-10">
        <div className="filigree-borders" />
      </div>
      <div className="mx-auto max-w-[1500px] px-5 sm:px-10">
        <div className="mb-14 grid items-end gap-8 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <p className="mb-4 flex items-center gap-3 font-cinzel text-[11px] uppercase tracking-[0.32em] text-gold-400">
              <span className="index-tick" />
              Chapter II — The Offices She Holds
            </p>
            <h2 className="font-serif text-[clamp(2.1rem,5.5vw,4.2rem)] font-light leading-[1.02] text-parchment-50">
              <InkReveal text="The Chambers of Influence" />
            </h2>
          </div>
          <p className="max-w-md font-sans text-sm font-light leading-[1.9] text-slate-cold lg:justify-self-end lg:text-right">
            Six offices, one mandate — to advance the law through teaching, scholarship, and the
            fierce shepherding of young careers.
          </p>
        </div>

        <div className="chamber-grid grid gap-px overflow-hidden border border-gold-500/12 bg-gold-500/12 sm:grid-cols-2 lg:grid-cols-3">
          {roles.map((r, i) => {
            const Icon = roleIcons[r.icon] ?? roleIcons.scale;
            return (
              <article key={r.title} className="chamber group relative flex flex-col bg-ink-950/95 p-8 transition-colors duration-500 hover:bg-ink-900">
                <div className="flex items-start justify-between">
                  <div className="chamber-icon-ring flex h-14 w-14 items-center justify-center border border-gold-500/35 text-gold-300 transition-colors duration-500 group-hover:border-gold-400 group-hover:text-gold-200">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="font-serif text-3xl font-light text-slate-cold-2/40 transition-colors duration-500 group-hover:text-gold-500/60">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-6 font-serif text-2xl font-medium leading-tight text-parchment-50 transition-colors group-hover:text-gold-200">
                  {r.title}
                </h3>
                <p className="mt-1.5 font-cinzel text-[10px] uppercase tracking-[0.24em] text-gold-400">{r.sub}</p>
                <div className="gold-rule my-5" />
                <p className="font-sans text-sm font-light leading-[1.85] text-slate-cold">{r.body}</p>
                <div className="mt-auto pt-6">
                  <span className="inline-flex items-center gap-2 font-cinzel text-[10px] uppercase tracking-[0.26em] text-slate-cold-2 transition-colors duration-500 group-hover:text-gold-300">
                    File No. {String(i + 1).padStart(2, "0")}/{String(roles.length).padStart(2, "0")}
                    <span className="h-px w-6 bg-gold-500/30 transition-all duration-500 group-hover:w-10 group-hover:bg-gold-400" />
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}