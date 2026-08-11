"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { profile, marqueeChips } from "@/data/content";
import Marquee from "./Marquee";

export default function Footer() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".footer-item",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.08, ease: "power3.out", scrollTrigger: { trigger: root, start: "top 88%" } }
      );
      gsap.to(".footer-monogram", {
        y: -10,
        scale: 1.03,
        duration: 4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={ref} className="relative overflow-hidden border-t border-gold-500/15 bg-ink-950">
      <div className="pointer-events-none absolute inset-0 paper-grain opacity-40" />
      <Marquee items={marqueeChips} />
      <div className="relative mx-auto max-w-[1500px] px-5 pb-10 pt-16 sm:px-10">
        <div className="grid gap-12 pb-16 lg:grid-cols-[1.2fr_1fr_1fr]">
          <div className="footer-item">
            <div className="footer-monogram inline-flex h-16 w-16 items-center justify-center border border-gold-500/40 font-serif text-2xl text-gold-300">
              RM
            </div>
            <p className="mt-5 font-serif text-2xl font-light text-parchment-100">Dr. Ritika Malik</p>
            <p className="mt-1 font-sans text-sm font-light text-slate-cold">{profile.headlineShort}</p>
            <p className="mt-5 max-w-sm font-serif text-lg font-light italic leading-relaxed text-gold-300/80">
              “The best counsel is that which shapes the next generation of counsel.”
            </p>
            <a
              href={`mailto:${profile.email}`}
              data-hover
              className="btn-gold mt-8 inline-flex items-center gap-3 px-7 py-3.5 font-cinzel text-[11px] uppercase tracking-[0.24em] text-ink-950"
            >
              Enter the Chambers
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4">
                <path d="M7 17L17 7M9 7h8v8" />
              </svg>
            </a>
          </div>

          <div className="footer-item">
            <p className="font-cinzel text-[10px] uppercase tracking-[0.3em] text-gold-400">The Chronicle</p>
            <ul className="mt-5 space-y-3">
              {[
                ["#prologue", "Prologue"],
                ["#chambers", "Chambers"],
                ["#library", "The Written Word"],
                ["#verdict", "The Verdicts"],
                ["#bench", "The Editorial Bench"],
                ["#courtrooms", "The Courtrooms"],
                ["#legacy", "The Legacy"],
              ].map(([href, label]) => (
                <li key={href}>
                  <a href={href} className="group inline-flex items-center gap-2 font-sans text-sm font-light text-slate-cold transition-colors hover:text-gold-200">
                    <span className="h-px w-0 bg-gold-400 transition-all duration-400 group-hover:w-4" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-item">
            <p className="font-cinzel text-[10px] uppercase tracking-[0.3em] text-gold-400">Offices</p>
            <ul className="mt-5 space-y-3 font-sans text-sm font-light text-slate-cold">
              <li>{profile.institution}</li>
              <li>NAAC &apos;A++&apos; Grade</li>
              <li className="pt-2">
                <a href={`mailto:${profile.email}`} className="transition-colors hover:text-gold-200">{profile.email}</a>
              </li>
              <li>
                <a href={`tel:${profile.phone}`} className="transition-colors hover:text-gold-200">{profile.phone}</a>
              </li>
              <li className="pt-2">
                <a href={profile.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 transition-colors hover:text-gold-200">
                  LinkedIn
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="h-4 w-4"><path d="M7 17L17 7M9 7h8v8" /></svg>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-item mt-14 flex flex-col items-center justify-between gap-4 border-t border-gold-500/10 pt-6 sm:flex-row">
          <p className="font-cinzel text-[10px] uppercase tracking-[0.26em] text-slate-cold-2">
            © {new Date().getFullYear()} Dr. Ritika Malik · BVIMR, New Delhi
          </p>
          <p className="font-cinzel text-[10px] uppercase tracking-[0.26em] text-gold-500/60">
            Lex Promovet · Scientia Gubernat
          </p>
        </div>
      </div>
    </footer>
  );
}