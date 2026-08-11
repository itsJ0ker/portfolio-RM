"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

export default function Preloader({ onDone }: { onDone?: () => void }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const sway = gsap.fromTo(
        ".scale-beam",
        { rotation: -7 },
        {
          rotation: 7,
          duration: 2.4,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          svgOrigin: "100 46",
          delay: 1.4,
        }
      );
      const swayL = gsap.fromTo(
        ".scale-pan-left",
        { rotation: 7 },
        {
          rotation: -7,
          duration: 2.4,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          svgOrigin: "50 46",
          delay: 1.4,
        }
      );
      const swayR = gsap.fromTo(
        ".scale-pan-right",
        { rotation: 7 },
        {
          rotation: -7,
          duration: 2.4,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          svgOrigin: "150 46",
          delay: 1.4,
        }
      );
            const shine = gsap.fromTo(
        ".scale-shine",
        { x: -90, opacity: 0 },
        { x: 240, opacity: 0.12, duration: 2.6, ease: "none", repeat: -1, yoyo: true }
      );

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
          ".scale-svg",
          { autoAlpha: 0, scale: 0.5, y: 26, rotate: -6 },
          { autoAlpha: 1, scale: 1, y: 0, rotate: 0, duration: 1.15, ease: "elastic.out(1,0.55)" },
          "-=0.3"
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
        .add(() => {
          sway.kill();
          swayL.kill();
          swayR.kill();
          shine.kill();
          gsap
            .timeline()
            .to(".scale-beam", { rotation: -9, duration: 0.5, ease: "power2.in", svgOrigin: "100 46" })
            .to(".scale-beam", { rotation: 0, duration: 1.0, ease: "power3.out", svgOrigin: "100 46" })
            .to(".scale-pan-left", { rotation: 9, duration: 0.5, ease: "power2.in", svgOrigin: "50 46" }, 0)
            .to(".scale-pan-left", { rotation: 0, duration: 1.0, ease: "power3.out", svgOrigin: "50 46" }, 0.5)
            .to(".scale-pan-right", { rotation: -9, duration: 0.5, ease: "power2.in", svgOrigin: "150 46" }, 0)
            .to(".scale-pan-right", { rotation: 0, duration: 1.0, ease: "power3.out", svgOrigin: "150 46" }, 0.5)
            .to(
              ".scale-svg",
              { scale: 1.07, duration: 0.35, ease: "sine.inOut", yoyo: true, repeat: 1, svgOrigin: "100 100" },
              0.5
            );
        }, "-=0.4")
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
        <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="1.6" className="scale-svg mt-8 h-28 w-28 text-gold-300 sm:h-36 sm:w-36" aria-hidden>
          <defs>
            <linearGradient id="scale-shine-grad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="rgba(232,200,120,0)" />
              <stop offset="0.5" stopColor="rgba(232,200,120,0.15)" />
              <stop offset="1" stopColor="rgba(232,200,120,0)" />
            </linearGradient>
          </defs>
          <g className="scale-post" strokeWidth="1.4">
            <path d="M100 170 V50" />
            <path d="M72 186 L100 167 L128 186" />
            <path d="M64 186 H136" />
            <path d="M89 60 H111" />
            <path d="M100 33 L107 42 L100 51 L93 42 Z" />
          </g>
          <g className="scale-beam">
            <path d="M32 46 H168" />
            <path d="M30 42 h6 v8 h-6 Z" />
            <path d="M164 42 h6 v8 h-6 Z" />
            <circle cx="100" cy="46" r="5.5" />
            <g className="scale-pan-left">
              <path d="M46 49 V112" strokeWidth="1.2" />
              <path d="M54 49 V112" strokeWidth="1.2" />
              <path d="M32 107 Q32 134 50 134 Q68 134 68 107" />
              <circle cx="50" cy="121" r="3" fill="currentColor" />
            </g>
            <g className="scale-pan-right">
              <path d="M146 49 V112" strokeWidth="1.2" />
              <path d="M154 49 V112" strokeWidth="1.2" />
              <path d="M132 107 Q132 134 150 134 Q168 134 168 107" />
              <circle cx="150" cy="121" r="3" fill="currentColor" />
            </g>
          </g>
          <rect className="scale-shine" x="-100" y="26" width="400" height="60" fill="url(#scale-shine-grad)" stroke="none" opacity="0" />
        </svg>
        <div className="gavel-progress mt-8 h-px w-56 origin-left bg-gold-500/80 sm:w-72" />
        <div className="pre-counter mt-6 font-cinzel text-xs text-slate-cold">
          <span className="pre-counter-text">0</span>
          <span className="text-gold-400">%</span>
        </div>
      </div>
    </div>
  );
}