"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { InkReveal } from "./Animations";
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
        const wide = window.innerWidth >= 1024;
        const from = wide ? { opacity: 0, x: i % 2 === 0 ? -60 : 60 } : { opacity: 0, y: 40 };
        gsap.fromTo(
          item,
          from,
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
    <section ref={rootRef} id="courtrooms" className="relative scroll-mt-24 py-24 sm:py-36">
      <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto max-w-[1500px] px-5 sm:px-10">
        <div className="filigree-borders" />
      </div>
      <div className="mx-auto max-w-[1500px] px-5 sm:px-10">
        <div className="mb-14 grid items-end gap-8 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <p className="mb-4 flex items-center gap-3 font-cinzel text-[11px] uppercase tracking-[0.32em] text-gold-400">
              <span className="index-tick" />
              Chapter VI — The Courtrooms
            </p>
            <h2 className="font-serif text-[clamp(2.1rem,5.5vw,4.2rem)] font-light leading-[1.02] text-parchment-100">
              <InkReveal text="Convened Dialogues of Consequence" />
            </h2>
          </div>
          <p className="max-w-md font-sans text-sm font-light leading-[1.9] text-slate-cold lg:justify-self-end lg:text-right">
            From Delhi High Court judges to former Chief Justices of India — the sessions Dr.
            Malik convenes are where the governance of a nation is debated within four walls.
          </p>
        </div>

        <div className="timeline relative mt-4 lg:ml-16">
          <div className="timeline-line absolute left-[6px] top-2 h-[calc(100%-16px)] w-px bg-gradient-to-b from-gold-400/70 via-gold-500/30 to-transparent lg:left-1/2 lg:-translate-x-1/2" />

          <ol className="space-y-10 lg:space-y-16">
            {conferences.map((c, i) => {
              const left = i % 2 === 0;
              return (
                <li key={i} className="timeline-item relative pl-8 lg:grid lg:grid-cols-2 lg:gap-16 lg:pl-0">
                  <span
                    className={`absolute left-0 top-1.5 flex h-[26px] w-[26px] items-center justify-center border border-gold-400 bg-ink-950 lg:left-1/2 lg:-translate-x-1/2 ${
                      left ? "lg:col-start-1" : ""
                    } ${i % 3 === 0 ? "rotate-45" : ""}`}
                  >
                    <span className={`h-[5px] w-[5px] ${i % 3 === 0 ? "rotate-45 bg-gold-400" : "bg-gold-400"}`} />
                  </span>
                  <div className={`${left ? "lg:col-start-1 lg:pr-4" : "lg:col-start-2 lg:pl-4"}`}>
                    <article className="gilt-card group relative p-7">
                      <span className="corner-diamond left-3 top-3" />
                      <span className="corner-diamond right-3 top-3" />
                      <div className="flex items-center justify-between gap-4">
                        <span className="font-cinzel text-[10px] uppercase tracking-[0.26em] text-gold-400">{c.role}</span>
                        <span className="whitespace-nowrap font-cinzel text-[10px] tracking-[0.18em] text-gold-400/80">{c.date}</span>
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