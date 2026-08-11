"use client";
import React, { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export function SplitText({ text, as = "span", className }: { text: string; as?: "span" | "h2" | "h3" | "div"; className?: string }) {
  const ref = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const chars = el.querySelectorAll<HTMLElement>(".char-mask");
      gsap.fromTo(
        chars,
        { yPercent: 115 },
        {
          yPercent: 0,
          duration: 1.15,
          ease: "power4.out",
          stagger: 0.032,
          scrollTrigger: { trigger: el, start: "top 88%" },
        }
      );
    }, el);
    return () => ctx.revert();
  }, [text]);

  const words = text.split(" ");
  return React.createElement(
    as,
    { ref, className },
    words.map((word, i) => (
      <span key={i} className="inline-block whitespace-nowrap">
        {word.split("").map((ch, j) => (
          <span key={j} className="char-mask" aria-hidden>
            <span className="char-inner inline-block">{ch}</span>
          </span>
        ))}
        {i < words.length - 1 ? "\u00A0" : ""}
      </span>
    ))
  );
}

export function RevealText({ text, className, italic }: { text: string; className?: string; italic?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll(".line-inner"),
        { yPercent: 118 },
        {
          yPercent: 0,
          duration: 1.1,
          ease: "power4.out",
          stagger: 0.07,
          scrollTrigger: { trigger: el, start: "top 86%" },
        }
      );
    }, el);
    return () => ctx.revert();
  }, [text]);

  const lines = text.split("\n");
  return (
    <span ref={ref} className={`block ${className ?? ""}`}>
      {lines.map((line, i) => (
        <span key={i} className="line-mask pb-[0.12em]">
          <span className={`line-inner block ${italic ? "italic" : ""}`}>{line}</span>
        </span>
      ))}
    </span>
  );
}

export function SectionHeading({
  chapterLabel,
  num,
  title,
  description,
  align = "left",
}: {
  chapterLabel: string;
  num: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".heading-label",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 82%" } }
      );
      gsap.fromTo(
        ".heading-line",
        { scaleX: 0 },
        { scaleX: 1, duration: 1.1, ease: "power2.inOut", scrollTrigger: { trigger: el, start: "top 82%" } }
      );
      gsap.fromTo(
        ".heading-desc",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.9, delay: 0.2, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 80%" } }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className={`relative mb-12 sm:mb-16 ${align === "center" ? "text-center" : ""}`}>
      <div className={`heading-label mb-5 flex items-center gap-4 font-cinzel text-[11px] uppercase tracking-[0.32em] text-gold-400 ${align === "center" ? "justify-center" : ""}`}>
        <span className="chapter-num text-2xl">{num}</span>
        <span className="heading-line h-px w-12 bg-gold-500/60 sm:w-20" />
        {chapterLabel}
      </div>
      <h2 className="font-serif text-4xl font-light leading-[1.05] text-parchment-50 sm:text-6xl lg:text-7xl">
        <SplitText text={title} />
      </h2>
      {description ? (
        <p className={`heading-desc mt-6 max-w-2xl font-sans text-sm font-light leading-relaxed text-slate-cold sm:text-base ${align === "center" ? "mx-auto" : ""}`}>
          {description}
        </p>
      ) : null}
    </div>
  );
}

export function Counter({ value, suffix = "", label, note }: { value: number; suffix?: string; label: string; note?: string }) {
  const numRef = useRef<HTMLSpanElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const counter = { v: 0 };
      gsap.to(counter, {
        v: value,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 88%" },
        onUpdate: () => {
          if (numRef.current) numRef.current.textContent = String(Math.round(counter.v));
        },
      });
      gsap.fromTo(
        el.querySelectorAll(".stat-anim"),
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.12, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%" } }
      );
    }, el);
    return () => ctx.revert();
  }, [value]);

  return (
    <div ref={rootRef} className="stat-anim gilt-card relative px-6 py-8 text-center sm:px-8">
      <span className="corner-diamond left-3 top-3" />
      <span className="corner-diamond right-3 top-3" />
      <span className="corner-diamond bottom-3 left-3" />
      <span className="corner-diamond bottom-3 right-3" />
      <div className="stat-num text-5xl font-medium text-gold-gradient sm:text-6xl">
        <span ref={numRef}>{value}</span>
        {suffix}
      </div>
      <div className="gold-rule mt-4 mb-3 w-16 mx-auto" />
      <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-parchment-200">{label}</p>
      {note ? <p className="mt-2 font-sans text-[11px] italic text-slate-cold-2">{note}</p> : null}
    </div>
  );
}

/* ------- InkReveal: gold serif line that fills in on scroll ------- */
export function InkReveal({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) el.classList.add("is-inked");
        },
        { threshold: 0.4 }
      );
      io.observe(el);
      return () => io.disconnect();
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <span ref={ref as React.Ref<HTMLSpanElement>} className={`ink-fill ${className ?? ""}`}>
      {text}
    </span>
  );
}

/* ------- GhostMarker: huge roman numeral watermark for the left rail ------- */
export function GhostMarker({ num, label, side = "left" }: { num: string; label: string; side?: "left" | "right" }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, x: side === "left" ? -40 : 40 },
        { opacity: 1, x: 0, duration: 1.2, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 85%" } }
      );
    }, el);
    return () => ctx.revert();
  }, [side]);

  return (
    <div
      ref={ref}
      className={`pointer-events-none absolute top-16 hidden select-none lg:block ${side === "left" ? "-left-2" : "-right-2"}`}
      aria-hidden
    >
      <span className="super-monogram block text-[11rem] leading-none">{num}</span>
      <span
        className={`mt-2 block font-cinzel text-[10px] uppercase tracking-[0.4em] text-gold-500/30 ${side === "right" ? "text-right" : ""}`}
        style={{ writingMode: "vertical-rl" }}
      >
        {label}
      </span>
    </div>
  );
}

/* ------- ScrambleText: decodes placeholder -> word on hover / in view ------- */
const SCRAMBLE = "█▓▒░#*+=°/\\|()";

export function ScrambleText({ text, className, inView }: { text: string; className?: string; inView?: boolean }) {
  const [display, setDisplay] = React.useState(text);
  const doneRef = useRef(false);

  useEffect(() => {
    if (doneRef.current) return;
    let raf = 0;
    const chars = text.split("");
    let step = 0;
    const tick = () => {
      const limit = Math.floor(step / 4);
      const out = chars.map((c, i) => (i < limit ? c : SCRAMBLE[(i + step) % SCRAMBLE.length])).join("");
      setDisplay(out);
      step++;
      if (limit < chars.length) raf = requestAnimationFrame(tick);
      else {
        setDisplay(text);
        doneRef.current = true;
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [text, inView]);

  return (
    <span className={`tabular-nums ${className ?? ""}`} aria-hidden>
      {display}
    </span>
  );
}

/* ------- RevealIn: reusable generic scroll reveal with direction ------- */
export function RevealIn({
  children,
  from = "up",
  delay,
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  from?: "up" | "down" | "left" | "right" | "scale";
  delay?: number;
  className?: string;
  as?: "div" | "li" | "article" | "section";
}) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const v = { up: { y: 46 }, down: { y: -46 }, left: { x: -56 }, right: { x: 56 }, scale: { scale: 0.9 } };
    const fromV = v[from];
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, ...fromV },
        { opacity: 1, x: 0, y: 0, scale: 1, duration: 1.05, delay, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 85%" } }
      );
    }, el);
    return () => ctx.revert();
  }, [from, delay]);

  return React.createElement(
    Tag,
    { ref: ref as never, className },
    children
  );
}

export { ScrollTrigger };

/* ------- Highlighted: renders text with **word** wrapped in <mark class="hl"> ------- */
export function Highlighted({ text, className }: { text: string; className?: string }) {
  const parts = text.split("**");
  return (
    <>
      {parts.map((chunk, i) =>
        i % 2 === 1 ? (
          <mark key={i} className={`hl ${className ?? ""}`}>
            {chunk}
          </mark>
        ) : (
          <span key={i}>{chunk}</span>
        )
      )}
    </>
  );
}