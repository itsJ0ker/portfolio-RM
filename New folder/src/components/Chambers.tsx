"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { SectionHeading } from "./Animations";
import { roleIcons } from "./Icons";
import { roles } from "@/data/content";

export default function Chambers() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".chamber",
        { opacity: 0, y: 70, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".chamber-grid", start: "top 78%" },
        }
      );
      gsap.fromTo(
        ".chamber-icon-ring",
        { scale: 0, rotate: -30 },
        {
          scale: 1,
          rotate: 0,
          duration: 0.9,
          ease: "back.out(2)",
          stagger: 0.12,
          delay: 0.25,
          scrollTrigger: { trigger: ".chamber-grid", start: "top 78%" },
        }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} id="chambers" className="relative scroll-mt-24 py-24 sm:py-36 seal-radial">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-10">
        <SectionHeading
          chapterLabel="Chapter II · The Offices She Holds"
          num="II"
          title="The Chambers of Influence"
          description="Six offices, one mandate — to advance the law through teaching, scholarship, and the fierce shepherding of young careers."
        />

        <div className="chamber-grid grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {roles.map((r) => {
            const Icon = roleIcons[r.icon] ?? roleIcons.scale;
            return (
              <article key={r.title} data-cursor-label={r.title} className="chamber gilt-card tilt-card group relative p-8">
                <span className="corner-diamond left-3 top-3" />
                <span className="corner-diamond right-3 top-3" />
                <span className="corner-diamond bottom-3 left-3" />
                <span className="corner-diamond bottom-3 right-3" />
                <div className="chamber-icon-ring mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-gold-500/40 text-gold-300 transition-colors duration-500 group-hover:border-gold-400 group-hover:bg-gold-500/10 group-hover:text-gold-200">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="font-serif text-2xl font-medium text-parchment-50 transition-colors group-hover:text-gold-200">{r.title}</h3>
                <p className="mt-1 font-cinzel text-[10px] uppercase tracking-[0.24em] text-gold-400">{r.sub}</p>
                <div className="gold-rule my-5" />
                <p className="font-sans text-sm font-light leading-[1.85] text-slate-cold">{r.body}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}