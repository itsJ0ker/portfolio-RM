"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export default function Marquee({ items }: { items: string[] }) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const ctx = gsap.context(() => {
      const speed = 42;
      const distance = track.scrollWidth / 2;
      const tween = gsap.to(track, {
        xPercent: -50,
        ease: "none",
        duration: distance / speed,
        repeat: -1,
      });
      return () => tween.kill();
    }, track);
    return () => ctx.revert();
  }, []);

  const doubled = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-gold-500/15 bg-ink-900/60 py-4">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink-950 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink-950 to-transparent" />
      <div ref={trackRef} className="marquee-track will-change-transform">
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-8 pr-8">
            <span className="font-cinzel text-[11px] uppercase tracking-[0.3em] text-gold-300/90">{item}</span>
            <span className="inline-block h-1.5 w-1.5 rotate-45 border border-gold-500/60" data-hover />
          </span>
        ))}
      </div>
    </div>
  );
}