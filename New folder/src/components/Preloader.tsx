"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

export default function Preloader({ onDone }: { onDone?: () => void }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setGone(true);
          onDone?.();
        },
      });

      tl.fromTo(
        ".pre-name",
        { yPercent: 120, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.9, ease: "power4.out", stagger: 0.08 }
      )
        .fromTo(
          ".pre-sub",
          { opacity: 0, letterSpacing: "0.3em" },
          { opacity: 1, letterSpacing: "0.32em", duration: 0.8, ease: "power2.out" },
          "-=0.4"
        )
        .fromTo(
          ".gavel-progress",
          { scaleX: 0 },
          { scaleX: 1, duration: 1.6, ease: "power2.inOut" },
          "-=0.5"
        )
        .fromTo(
          ".pre-counter",
          { opacity: 0 },
          { opacity: 1, duration: 0.4 },
          "-=1.2"
        )
        .to(".pre-counter-text", { textContent: 100, snap: { textContent: 1 }, duration: 1.4, ease: "power2.inOut" }, "-=1.4")
        .to(".pre-loader", { yPercent: -100, duration: 1.0, ease: "power4.inOut" }, "+=0.15")
        .set(".pre-loader", { display: "none" });
    }, rootRef);

    return () => ctx.revert();
  }, [onDone]);

  if (gone) return null;
  return (
    <div ref={rootRef} className="pre-loader fixed inset-0 z-[200] flex flex-col items-center justify-center bg-ink-950">
      <div className="pointer-events-none absolute inset-0 seal-radial" />
      <div className="pointer-events-none absolute inset-0 paper-grain" />
      <div className="relative flex flex-col items-center px-6 text-center">
        <div className="pre-sub font-cinzel text-[10px] uppercase text-gold-400 sm:text-xs">
          The Chronicle of
        </div>
        <h1 className="pre-name mt-4 font-serif text-5xl font-light tracking-tight text-parchment-50 sm:text-7xl">
          Dr.&nbsp;Ritika&nbsp;Malik
          <span className="text-gold-400">.</span>
        </h1>
        <div className="gavel-line mt-8 flex items-center gap-3">
          <span className="h-px w-16 bg-gold-500/40 sm:w-24" />
          <span className="font-serif text-lg italic text-gold-300">⚖</span>
          <span className="h-px w-16 bg-gold-500/40 sm:w-24" />
        </div>
        <div className="gavel-progress mt-8 h-px w-56 origin-left bg-gold-500/80 sm:w-72" />
        <div className="pre-counter mt-6 font-cinzel text-xs text-slate-cold">
          <span className="pre-counter-text">0</span>
          <span className="text-gold-400">%</span>
        </div>
      </div>
    </div>
  );
}