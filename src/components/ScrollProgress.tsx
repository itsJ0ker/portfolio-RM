"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(barRef.current, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.4,
        },
      });
      gsap.fromTo(
        rootRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          delay: 3.6,
        }
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="fixed left-0 top-0 z-[130] h-[3px] w-full opacity-0">
      <div
        ref={barRef}
        className="h-full origin-left scale-x-0 bg-gradient-to-r from-gold-500 via-gold-300 to-gold-500"
      />
    </div>
  );
}