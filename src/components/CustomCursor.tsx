"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ring) return;
    if (window.matchMedia("(hover: none), (pointer: coarse)").matches) return;

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ringPos = { x: pos.x, y: pos.y };
    gsap.set([dot, ring], { x: pos.x, y: pos.y, xPercent: -50, yPercent: -50 });
    gsap.set(label, { xPercent: -50, yPercent: -50 });

    let labelTarget: HTMLElement | null = null;

    const onMove = (e: MouseEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      gsap.to(dot, { x: pos.x, y: pos.y, duration: 0.08, ease: "power2.out" });

      const t = (e.target as HTMLElement)?.closest?.("[data-cursor-label],[data-cursor]") as HTMLElement | null;
      const txt = t?.getAttribute("data-cursor-label");
      labelTarget = txt ? t : null;

      if (txt && label) {
        label.textContent = txt;
        gsap.to(label, { autoAlpha: 1, scale: 1, duration: 0.3, ease: "power3.out" });
        gsap.to(ring, { scale: 1.6, duration: 0.4, ease: "power3.out" });
        gsap.to(dot, { scale: 2.4, duration: 0.4, ease: "power3.out" });
      } else {
        gsap.to(label, { autoAlpha: 0, scale: 0.8, duration: 0.25, ease: "power3.out" });
        gsap.to(ring, { scale: 1, duration: 0.4, ease: "power3.out" });
        gsap.to(dot, { scale: 1, duration: 0.4, ease: "power3.out" });
      }
    };

    const onOver = (e: MouseEvent) => {
      const interactive = (e.target as HTMLElement)?.closest?.("a,button,[data-hover]");
      gsap.to(ring, { scale: interactive ? 2.1 : 1, borderColor: interactive ? "rgba(217,175,85,0.9)" : "rgba(217,175,85,0.5)", duration: 0.35, ease: "power3.out" });
    };

    gsap.ticker.add(() => {
      ringPos.x += (pos.x - ringPos.x) * 0.16;
      ringPos.y += (pos.y - ringPos.y) * 0.16;
      gsap.set(ring, { x: ringPos.x, y: ringPos.y });
      if (labelTarget && label) {
        gsap.set(label, { x: ringPos.x, y: ringPos.y + 40 });
      }
    });

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    document.documentElement.classList.add("has-cursor");

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden />
      <div ref={ringRef} className="cursor-ring" aria-hidden />
      <div ref={labelRef} className="cursor-label" aria-hidden />
    </>
  );
}