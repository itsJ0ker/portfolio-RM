"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { SectionHeading } from "./Animations";
import { conferences } from "@/data/content";

export default function Courtrooms() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".timeline-line",
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: "top",
          duration: 1.8,
          ease: "power2.inOut",
          scrollTrigger: { trigger: ".timeline", start: "top 72%", end: "bottom 70%", scrub: 0.6 },
        }
      );
      gsap.utils.toArray<HTMLElement>(".timeline-item").forEach((item, i) => {
        gsap.fromTo(
          item,
          { opacity: 0, x: i % 2 === 0 ? -60 : 60, y: 20 },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: { trigger: item, start: "top 82%" },
          }
        );
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} id="courtrooms" className="relative scroll-mt-24 py-24 sm:py-36 seal-radial">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-10">
        <SectionHeading
          chapterLabel="Chapter VI · The Courtrooms"
          num="VI"
          title="Convened Dialogues of Consequence"
          description="From Delhi High Court judges to former Chief Justices of India — the sessions Dr. Malik convenes are where the governance of a nation is debated within four walls."
        />

        <div className="timeline relative mt-4 lg:ml-16">
          <div className="timeline-line absolute left-[6px] top-2 h-[calc(100%-16px)] w-px bg-gradient-to-b from-gold-400/70 via-gold-500/30 to-transparent lg:left-1/2 lg:-translate-x-1/2" />

          <ol className="space-y-10 lg:space-y-16">
            {conferences.map((c, i) => {
              const left = i % 2 === 0;
              return (
                <li key={i} className="timeline-item relative pl-8 lg:grid lg:grid-cols-2 lg:gap-16 lg:pl-0">
                  <span className={`absolute left-0 top-1.5 h-[13px] w-[13px] rotate-45 border border-gold-400 bg-ink-950 lg:left-1/2 lg:-translate-x-1/2 ${left ? "lg:col-start-1" : ""}`} />
                  <div className={`${left ? "lg:col-start-1 lg:pr-4" : "lg:col-start-2 lg:pl-4"}`}>
                    <article className="gilt-card group relative p-7">
                      <span className="corner-diamond left-3 top-3" />
                      <span className="corner-diamond right-3 top-3" />
                      <div className="flex items-center justify-between gap-4">
                        <span className="font-cinzel text-[10px] uppercase tracking-[0.26em] text-gold-400">{c.role}</span>
                        <span className="whitespace-nowrap font-cinzel text-[10px] tracking-[0.18em] text-slate-cold-2">{c.date}</span>
                      </div>
                      <h3 className="mt-3 font-serif text-xl font-medium leading-snug text-parchment-50">{c.title}</h3>
                      <p className="mt-1 font-sans text-xs italic text-gold-300/80">{c.orgs}</p>
                      <div className="gold-rule my-4" />
                      <p className="font-sans text-[13px] font-light leading-relaxed text-slate-cold">{c.detail}</p>
                    </article>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}