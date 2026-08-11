"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

export default function Marquee({ items, reverse, className }: { items: string[]; reverse?: boolean; className?: string }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const ctx = gsap.context(() => {
      const speed = 52;
      const distance = track.scrollWidth / 2;
      const endX = reverse ? 50 : -50;
      const tween = gsap.fromTo(track, { xPercent: reverse ? -50 : 0 }, { xPercent: endX, ease: "none", duration: distance / speed, repeat: -1 });
      tweenRef.current = tween;
      if (paused) tween.pause();
      return () => tween.kill();
    }, track);
    return () => ctx.revert();
  }, [paused, reverse]);

  const doubled = [...items, ...items];
  return (
    <div
      className={`relative overflow-hidden border-y border-gold-500/15 bg-ink-900/60 py-4 ${className ?? ""}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-ink-950 to-transparent sm:w-24" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-ink-950 to-transparent sm:w-24" />
      <div ref={trackRef} className="marquee-track will-change-transform">
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-7 pr-7 sm:gap-8 sm:pr-8">
            <span className="font-cinzel text-[10px] uppercase tracking-[0.28em] text-gold-300/90 sm:text-[11px]">{item}</span>
            <svg viewBox="0 0 10 10" className="h-1.5 w-1.5 rotate-45 text-gold-500/60" data-hover fill="none" stroke="currentColor" strokeWidth="1">
              <rect x="1" y="1" width="8" height="8" />
            </svg>
          </span>
        ))}
      </div>
    </div>
  );
}