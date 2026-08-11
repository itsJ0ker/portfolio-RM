"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { InkReveal, Highlighted } from "./Animations";
import { Counter } from "./Animations";
import { aboutParts, stats, profile } from "@/data/content";

export default function Prologue() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".prologue-paragraph",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          stagger: 0.18,
          ease: "power3.out",
          scrollTrigger: { trigger: "#prologue", start: "top 65%" },
        }
      );
      gsap.fromTo(
        ".prologue-seal",
        { rotate: -120, opacity: 0, scale: 0.6 },
        {
          rotate: 0,
          opacity: 1,
          scale: 1,
          duration: 1.6,
          ease: "power3.out",
          scrollTrigger: { trigger: "#prologue", start: "top 72%" },
        }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} id="prologue" className="relative scroll-mt-24 py-24 sm:py-36">
      <div className="pointer-events-none absolute inset-0 paper-grain opacity-60" />
      <div className="pointer-events-none absolute right-6 top-10 select-none" aria-hidden>
        <span className="super-monogram text-[12rem]">I</span>
      </div>
      <div className="mx-auto grid max-w-[1500px] items-start gap-14 px-5 sm:px-10 lg:grid-cols-[1fr_0.85fr]">
        <div>
          <p className="mb-4 flex items-center gap-3 font-cinzel text-[11px] uppercase tracking-[0.32em] text-gold-400">
            <span className="index-tick" />
            Prologue — The Advocate
          </p>
          <h2 className="mb-10 font-serif text-[clamp(2.1rem,5.5vw,4.2rem)] font-light leading-[1.02] text-parchment-50">
            <InkReveal text="The Woman Beneath the Gown" />
          </h2>
          <div className="space-y-6">
            {aboutParts.map((p, i) => (
              <p key={i} className={`prologue-paragraph max-w-xl font-serif text-lg font-light leading-[1.85] text-parchment-200/90 sm:text-xl ${i === 0 ? "drop-cap" : ""}`}>
                <Highlighted text={p.text} />
              </p>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <a href="#chambers" data-hover className="group flex items-center gap-3 font-cinzel text-[11px] uppercase tracking-[0.3em] text-gold-300 transition-colors hover:text-gold-200">
              Continue the Record
              <span className="h-px w-10 bg-gold-500/60 transition-all duration-500 group-hover:w-16" />
            </a>
            <span className="hidden h-8 w-px bg-gold-500/20 sm:block" />
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="font-sans text-sm text-slate-cold transition-colors hover:text-gold-200">
              linkedin.com/in/dr-ritika-malik-87827926
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="prologue-seal relative mb-10 flex flex-col items-center overflow-hidden border border-gold-500/15 p-8 text-center">
            <span className="corner-diamond left-4 top-4" />
            <span className="corner-diamond right-4 top-4" />
            <span className="corner-diamond bottom-4 left-4" />
            <span className="corner-diamond bottom-4 right-4" />
            <span className="font-serif text-7xl font-light text-gold-gradient">“</span>
            <p className="font-serif text-xl font-light italic leading-relaxed text-parchment-100 sm:text-2xl">
              Education is the transfer of courage — from those who hold it to those who will one day dispense justice.
            </p>
            <div className="gold-rule my-6 w-20" />
            <p className="font-cinzel text-[10px] uppercase tracking-[0.3em] text-gold-400">A Working Philosophy</p>
            <div className="absolute -right-8 -top-9 h-28 w-28 rounded-full border border-gold-500/10" />
          </div>
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-[1500px] px-5 sm:px-10">
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {stats.map((s) => (
            <Counter key={s.label} value={s.value} suffix={s.suffix} label={s.label} note={s.note} />
          ))}
        </div>
      </div>
    </section>
  );
}