"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { SectionHeading } from "./Animations";
import { RibbonIcon } from "./Icons";
import { recognitions } from "@/data/content";

export default function Verdicts() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".verdict-row",
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          stagger: 0.07,
          ease: "power3.out",
          scrollTrigger: { trigger: ".verdict-list", start: "top 80%" },
        }
      );
      gsap.fromTo(
        ".verdict-rule",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          ease: "power2.inOut",
          stagger: 0.1,
          scrollTrigger: { trigger: ".verdict-list", start: "top 82%" },
        }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} id="verdict" className="relative scroll-mt-24 py-24 sm:py-36 seal-radial">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-10">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <SectionHeading
              chapterLabel="Chapter IV · Recognition"
              num="IV"
              title="The Verdicts"
              description="Certificates of Excellence engraved in the registers of the world's most exacting journals. Each is a verdict — returned, again and again, in her favour."
            />
            <div className="gold-rule" />
            <p className="mt-6 max-w-md font-serif text-lg font-light italic text-slate-cold">
              “A reviewer's signature is a quiet act of justice — verifying that no flawed claim ever passes into the body of knowledge.”
            </p>
          </div>

          <div className="verdict-list relative">
            <div className="pointer-events-none absolute left-0 top-2 h-full w-px bg-gradient-to-b from-gold-500/50 via-gold-500/15 to-transparent" />
            <div className="space-y-3">
              {recognitions.map((r, i) => (
                <div key={i} className="verdict-row group relative flex items-center gap-5 border border-gold-500/12 bg-ink-900/50 px-6 py-5 backdrop-blur-sm transition-colors duration-500 hover:border-gold-500/40 hover:bg-ink-900/80">
                  <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-gold-500/30 text-gold-300 transition-all duration-500 group-hover:bg-gold-500/15">
                    <RibbonIcon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-serif text-base font-medium text-parchment-50 sm:text-lg">{r.title}</h3>
                    <p className="mt-0.5 truncate font-sans text-xs font-light text-slate-cold">{r.org}</p>
                  </div>
                  <span className="font-cinzel text-[11px] tracking-[0.2em] text-gold-400">{r.year}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}