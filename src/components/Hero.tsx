"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { gsap as gsapLib } from "@/lib/gsap";
import Magnetic from "./Magnetic";
import { ScrambleText } from "./Animations";

const roles = [
  "Assistant Professor",
  "Placement Officer (Law)",
  "Academic Editor",
  "Peer Reviewer",
  "Author",
];

export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ctx = gsapLib.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(".hero-kicker", { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 0.9, delay: 3.2 }, 0)
        .fromTo(
          ".hero-name .char-mask",
          { yPercent: 120 },
          { yPercent: 0, duration: 1.3, ease: "power4.out", stagger: 0.04 },
          3.45
        )
        .fromTo(".hero-rule", { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: "power2.inOut" }, 4.1)
        .fromTo(".hero-role", { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 1, stagger: 0.12 }, 4.25)
        .fromTo(".hero-copy", { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 1.1 }, 4.5)
        .fromTo(".hero-badge", { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 1 }, 4.6)
        .fromTo(
          ".hero-emblem",
          { opacity: 0, scale: 0.6, rotate: -8 },
          { opacity: 1, scale: 1, rotate: 0, duration: 1.2, ease: "power4.out" },
          4.7
        );

      gsap.to(".hero-seal", { rotate: 360, duration: 60, ease: "none", repeat: -1 });
      gsap.to(".hero-float-1", { y: -24, duration: 5, ease: "sine.inOut", repeat: -1, yoyo: true });
    }, root);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ctx = gsapLib.context(() => {
      gsap.to(".hero-parallax-bg", {
        yPercent: 18,
        ease: "none",
        scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(".hero-content", {
        yPercent: -12,
        opacity: 0.25,
        ease: "none",
        scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(".hero-portrait-wrap", {
        yPercent: 6,
        ease: "none",
        scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: true },
      });

      const mq = window.matchMedia("(pointer: fine)");
      if (!mq.matches) return;
      const shift = gsap.utils.toArray<HTMLElement>(".parallax-depth");
      const onMove = (e: MouseEvent) => {
        const cx = e.clientX / window.innerWidth - 0.5;
        const cy = e.clientY / window.innerHeight - 0.5;
        shift.forEach((el, i) => {
          const depth = (i % 3) + 1;
          gsap.to(el, { x: cx * 14 * depth, y: cy * 10 * depth, duration: 1, ease: "power2.out" });
        });
      };
      window.addEventListener("mousemove", onMove);
      return () => window.removeEventListener("mousemove", onMove);
    }, root);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    let current = 0;
    const els = root.querySelectorAll<HTMLElement>(".hero-role");
    const tick = () => {
      els.forEach((el, i) => {
        gsap.set(el, { opacity: i === current ? 1 : 0, x: i === current ? 0 : -16, display: i === current ? "inline" : "none" });
      });
      current = (current + 1) % els.length;
    };
    tick();
    const id = setInterval(tick, 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="top" ref={rootRef} className="relative flex min-h-[100svh] flex-col overflow-hidden">
      <div className="hero-parallax-bg absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(110%_90%_at_50%_-10%,#14224a_0%,#0a1122_48%,#060a14_100%)]" />
        <div className="absolute inset-0 paper-grain" />
        <div className="hero-seal parallax-depth absolute -right-[180px] top-[8%] h-[520px] w-[520px] opacity-[0.07]" aria-hidden>
          <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" className="h-full w-full text-gold-400">
            <circle cx="100" cy="100" r="96" strokeWidth="0.6" />
            <circle cx="100" cy="100" r="86" strokeWidth="0.4" strokeDasharray="2 6" />
            <circle cx="100" cy="100" r="70" strokeWidth="0.4" />
            <path d="M100 30v26M100 144v26M30 100h26M144 100h26" strokeWidth="0.6" />
            <path d="M48 48l18 18M134 134l18 18M152 48l-18 18M66 134l-18 18" strokeWidth="0.4" />
          </svg>
        </div>
        <div className="hero-float-1 parallax-depth absolute left-[6%] top-[24%] hidden h-36 w-36 border border-gold-500/15 md:block" style={{ transform: "rotate(12deg)" }} />
        <div className="parallax-depth absolute bottom-[-160px] left-[-120px] h-[380px] w-[380px] rounded-full border border-gold-500/10" />
        <div className="absolute bottom-[12%] right-[8%] hidden h-px w-40 bg-gradient-to-r from-gold-500/50 to-transparent lg:block" />
      </div>

      <div className="hero-content relative z-10 mx-auto flex w-full max-w-[1500px] flex-1 flex-col justify-center px-5 pb-14 pt-24 sm:px-10 sm:pt-28 lg:pt-24">
        <div className="grid items-center gap-14 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <div className="hero-kicker mb-6 opacity-0">
              <span className="font-cinzel text-[10px] uppercase tracking-[0.4em] text-gold-400 sm:text-xs">
                Assistant Professor · BVIMR, New Delhi
              </span>
              <span className="mx-4 hidden text-gold-500/50 sm:inline">—</span>
              <span className="hidden font-cinzel text-[10px] uppercase tracking-[0.3em] text-slate-cold sm:inline">
                NAAC &apos;A++&apos;
              </span>
            </div>

            <h1 className="hero-name display-xl font-serif font-light leading-[0.95] tracking-tight text-parchment-50">
              Dr. Ritika Malik
            </h1>
            <div className="hero-rule gold-rule mt-7 w-full max-w-md origin-left" />

            <div className="mt-5 flex h-[26px] items-center overflow-hidden">
              {roles.map((r) => (
                <span key={r} className="hero-role hidden font-cinzel text-xs uppercase tracking-[0.32em] whitespace-nowrap text-gold-300 opacity-0 sm:text-sm">
                  {r}
                  <span className="ml-3 text-gold-500/60">✦</span>
                </span>
              ))}
            </div>

            <p className="hero-copy mt-8 max-w-xl font-sans text-sm font-light leading-[1.9] text-slate-cold opacity-0 sm:text-base">
              Where the classroom meets the courtroom — a chronicle of scholarship, mentorship,
              and the quiet rigour of academic integrity. From the pages of Scopus to the
              placement bench, her counsel shapes the legal minds of tomorrow.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4 opacity-0 hero-badge">
              <Magnetic>
                <a
                  href="#prologue"
                  data-cursor-label="Proceed"
                  className="btn-gold group inline-flex items-center gap-3 px-8 py-4 font-cinzel text-[11px] uppercase tracking-[0.25em] text-ink-950"
                >
                  <span className="relative z-10">Enter the Chronicle</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="relative z-10 h-4 w-4 transition-transform duration-500 group-hover:translate-y-1">
                    <path d="M12 5v14M6 13l6 6 6-6" />
                  </svg>
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href="#summons"
                  data-hover
                  className="btn-outline-gold inline-flex items-center gap-3 px-8 py-4 font-cinzel text-[11px] uppercase tracking-[0.25em]"
                >
                  Send a Summons
                </a>
              </Magnetic>
            </div>
          </div>

          <div className="hero-emblem relative hidden justify-center opacity-0 lg:flex">
            <div className="hero-portrait-wrap relative">
              <div className="absolute -inset-4 rounded-full border border-gold-500/25" aria-hidden />
              <div className="absolute -inset-10 rounded-full border border-gold-500/10" aria-hidden />
              <div className="tape-frame">
                <div className="vignette relative h-[420px] w-[340px] overflow-hidden border border-gold-500/30 xl:h-[470px] xl:w-[380px]">
                  <img
                    src="/images/portrait.jpg"
                    alt="Dr. Ritika Malik — portrait in academic regalia"
                    className="h-full w-full object-cover transition-transform duration-[1.4s] ease-out hover:scale-105"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-ink-950/20" />
                </div>
                <div className="absolute top-[-14px] right-4 flex h-20 w-20 rotate-3 items-center justify-center rounded-full border border-gold-500/50 bg-ink-900/90 backdrop-blur">
                  <span className="font-serif text-2xl text-gold-300">RM</span>
                </div>
              </div>
              <div className="absolute bottom-10 -right-9 rotate-3">
                <span className="docket-stamp border-ink-900/70 bg-ink-900/90 px-3 py-1.5 text-[10px] text-gold-400 backdrop-blur">
                  The Counsel of Ends &amp; Means
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-gold-500/15 pt-5">
          <div className="flex items-center gap-3 font-cinzel text-[10px] uppercase tracking-[0.3em] text-slate-cold-2">
            <span className="inline-block h-1.5 w-1.5 animate-pulse rotate-45 bg-gold-400" aria-hidden />
            <ScrambleText text="The Chronicle · Est. Scholarship 2011" />
          </div>
          <div className="hidden gap-10 text-right font-cinzel text-[10px] uppercase tracking-[0.24em] text-slate-cold-2 sm:flex">
            <span>249 Posts</span>
            <span>150+ Reviews</span>
            <span>51+ Drives</span>
          </div>
        </div>
      </div>

      <button
        onClick={() => document.getElementById("prologue")?.scrollIntoView({ behavior: "smooth" })}
        className="absolute bottom-0 left-1/2 z-10 -translate-x-1/2 pb-5 text-center transition-opacity duration-500 hover:opacity-70"
        aria-label="Scroll to first section"
        data-hover
      >
        <div className="scroll-hint-line mx-auto" />
        <div className="mt-3 font-cinzel text-[9px] uppercase tracking-[0.4em] text-slate-cold-2">Scroll to Proceed</div>
      </button>
    </section>
  );
}