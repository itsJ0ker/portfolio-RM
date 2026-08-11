"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { SectionHeading } from "./Animations";
import { dignitaries } from "@/data/content";

export default function Dignitaries() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
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
    }, root);
    return () => ctx.revert();
  }, []);

  const columns = [
    { label: "The Supreme Bench", data: dignitaries.sc, icon: "⚖" },
    { label: "The High Courts & Tribunals", data: dignitaries.hc, icon: "§" },
    { label: "Officers of the Court", data: dignitaries.others, icon: "✧" },
  ];

  return (
    <section ref={rootRef} className="relative scroll-mt-24 py-24 sm:py-36">
      <div className="pointer-events-none absolute inset-0 paper-grain opacity-60" />
      <div className="mx-auto max-w-[1500px] px-5 sm:px-10">
        <SectionHeading
          chapterLabel="The Gallery of the Gown"
          num="✧"
          title="Among Whom She Has Sat"
          description="A professional life measured in the calibre of its company — five former Chief Justices, sitting judges, Solicitors General, and the living memory of the Indian bar."
        />

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {columns.map((col, ci) => (
            <div key={ci}>
              <p className="mb-6 flex items-center gap-3 font-cinzel text-[11px] uppercase tracking-[0.3em] text-gold-400">
                <span className="font-serif text-xl">{col.icon}</span> {col.label}
              </p>
              <ul className="space-y-2">
                {col.data.map((n, i) => (
                  <li key={i}>
                    <div data-hover className="name-plate group flex items-baseline justify-between gap-3 border-b border-gold-500/10 py-3">
                      <span className="font-serif text-[15px] font-light text-parchment-100 transition-colors group-hover:text-gold-200">
                        {n.name}
                      </span>
                      <span className="shrink-0 text-right font-sans text-[10px] uppercase tracking-[0.14em] text-slate-cold-2">
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