"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

const links = [
  { href: "#prologue", label: "Prologue" },
  { href: "#chambers", label: "Chambers" },
  { href: "#library", label: "Library" },
  { href: "#verdict", label: "Verdicts" },
  { href: "#bench", label: "The Bench" },
  { href: "#courtrooms", label: "Courtrooms" },
  { href: "#legacy", label: "Legacy" },
];

export default function Navbar() {
  const barRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        barRef.current,
        { y: -80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 3.4 }
      );
    }, barRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (open) {
      gsap.fromTo(".menu-link", { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.7, ease: "power3.out", stagger: 0.06, delay: 0.2 });
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (href: string) => {
    setOpen(false);
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }, 350);
  };

  return (
    <>
      <header
        ref={barRef}
        className={`fixed left-0 top-0 z-[120] w-full transition-all duration-500 ${
          scrolled ? "border-b border-gold-500/15 bg-ink-950/80 backdrop-blur-xl" : "border-b border-transparent bg-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-[1500px] items-center justify-between px-5 py-4 sm:px-10">
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="group flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center border border-gold-500/40 font-serif text-lg text-gold-300 transition-colors duration-500 group-hover:bg-gold-500/10">
              RM
            </span>
            <span className="hidden flex-col items-start sm:flex">
              <span className="font-cinzel text-[11px] uppercase tracking-[0.28em] text-parchment-100">
                Dr. Ritika Malik
              </span>
              <span className="text-[10px] uppercase tracking-[0.18em] text-gold-400">
                The Counsel of Ends &amp; Means
              </span>
            </span>
          </button>

          <div className="hidden items-center gap-7 lg:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                data-hover
                className="group relative font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-parchment-200/70 transition-colors hover:text-gold-300"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold-400 transition-all duration-500 group-hover:w-full" />
              </a>
            ))}
            <button
              onClick={() => go("#summons")}
              className="btn-gold px-5 py-2.5 font-cinzel text-[11px] uppercase tracking-[0.2em] text-ink-950"
            >
              Contact
            </button>
          </div>

          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="flex h-11 w-11 flex-col items-center justify-center gap-[7px] border border-gold-500/30 lg:hidden"
          >
            <span className={`h-px w-5 bg-gold-300 transition-all duration-500 ${open ? "translate-y-[4px] rotate-45" : ""}`} />
            <span className={`h-px w-5 bg-gold-300 transition-all duration-500 ${open ? "-translate-y-[4px] -rotate-45" : ""}`} />
          </button>
        </nav>
      </header>

      <div
        className={`fixed inset-0 z-[110] flex flex-col justify-between bg-ink-900/97 backdrop-blur-2xl transition-all duration-700 lg:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="pointer-events-none absolute inset-0 seal-radial" />
        <div className="relative flex flex-col gap-6 px-10 pt-36">
          {links.map((l) => (
            <button
              key={l.href}
              onClick={() => go(l.href)}
              className="menu-link group flex items-baseline gap-4 border-b border-gold-500/10 pb-4 text-left"
            >
              <span className="font-serif text-2xl font-light text-gold-300 group-hover:text-gold-200">{l.label}</span>
              <span className="h-px flex-1 bg-gold-500/10" />
            </button>
          ))}
          <button onClick={() => go("#summons")} className="btn-gold menu-link mt-4 w-fit px-8 py-4 font-cinzel text-xs uppercase tracking-[0.25em]">
            Open Communication
          </button>
        </div>
        <div className="relative px-10 pb-12">
          <p className="font-cinzel text-[10px] uppercase tracking-[0.3em] text-gold-400">Dr. Ritika Malik · BVIMR, New Delhi</p>
        </div>
      </div>
    </>
  );
}