"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { SectionHeading } from "./Animations";
import { BookIcon } from "./Icons";
import { publications } from "@/data/content";

export default function Library() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".volume",
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.05,
          stagger: 0.09,
          ease: "power3.out",
          scrollTrigger: { trigger: ".volume-grid", start: "top 78%" },
        }
      );
      gsap.fromTo(
        ".library-shelf",
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: "top",
          duration: 1.3,
          ease: "power3.out",
          scrollTrigger: { trigger: ".volume-grid", start: "top 85%" },
        }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} id="library" className="relative scroll-mt-24 py-24 sm:py-36">
      <div className="pointer-events-none absolute inset-0 paper-grain opacity-50" />
      <div className="mx-auto max-w-[1500px] px-5 sm:px-10">
        <SectionHeading
          chapterLabel="Chapter III · The Written Word"
          num="III"
          title="Works Bound in Scholarship"
          description="From a Springer monograph to an edited volume released by a former Chief Justice — a bibliography that legislates itself into permanence."
        />

        <div className="volume-grid relative grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <div className="library-shelf pointer-events-none absolute left-0 top-0 h-full w-px bg-gradient-to-b from-gold-500/40 via-gold-500/10 to-transparent" />
          {publications.map((p, i) => (
            <article
              key={i}
              data-cursor-label={p.tag}
              className={`volume gilt-card group relative flex flex-col p-8 ${p.highlight ? "border-gold-500/40" : ""}`}
            >
              <span className="corner-diamond left-3 top-3" />
              <span className="corner-diamond right-3 top-3" />
              <span className="corner-diamond bottom-3 left-3" />
              <span className="corner-diamond bottom-3 right-3" />

              <div className="mb-6 flex items-center justify-between">
                <span className="flex h-12 w-12 items-center justify-center border border-gold-500/30 text-gold-300 transition-colors duration-500 group-hover:bg-gold-500/10">
                  <BookIcon className="h-6 w-6" />
                </span>
                <span className={`font-cinzel text-[10px] uppercase tracking-[0.26em] ${p.highlight ? "text-gold-300" : "text-slate-cold-2"}`}>
                  {p.kind}
                </span>
              </div>

              <h3 className="font-serif text-xl font-medium leading-snug text-parchment-50 transition-colors duration-500 group-hover:text-gold-200">
                {p.title}
              </h3>
              <div className="gold-rule my-5" />
              <p className="mb-6 font-sans text-[13px] font-light leading-relaxed text-slate-cold">{p.venue}</p>

              <div className="mt-auto flex items-center justify-between">
                <span className="border border-gold-500/30 bg-gold-500/5 px-3 py-1 font-cinzel text-[10px] uppercase tracking-[0.22em] text-gold-300">
                  {p.tag}
                </span>
                <span className="font-serif text-lg italic text-gold-500/70">No. {String(i + 1).padStart(2, "0")}</span>
              </div>
            </article>
          ))}

          <article className="volume gilt-card relative flex flex-col items-center justify-center overflow-hidden p-8 text-center border-gold-500/50">
            <div className="pointer-events-none absolute inset-0 paper-grain" />
            <span className="font-serif text-5xl text-gold-gradient">§</span>
            <h3 className="mt-4 font-serif text-xl font-light text-parchment-100">Further Works in Progress</h3>
            <p className="mt-3 max-w-xs font-sans text-[13px] font-light leading-relaxed text-slate-cold">
              Edited volumes, IEEE proceedings and UGC CARE papers continue to accumulate — the library never rests.
            </p>
            <span className="corner-diamond left-3 top-3" />
            <span className="corner-diamond right-3 top-3" />
          </article>
        </div>
      </div>
    </section>
  );
}