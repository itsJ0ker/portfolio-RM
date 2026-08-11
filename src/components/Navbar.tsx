"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

const links = [
  { href: "#prologue", label: "Prologue", num: "I" },
  { href: "#chambers", label: "Chambers", num: "II" },
  { href: "#library", label: "Library", num: "III" },
  { href: "#verdict", label: "Verdicts", num: "IV" },
  { href: "#bench", label: "The Bench", num: "V" },
  { href: "#courtrooms", label: "Courtrooms", num: "VI" },
  { href: "#legacy", label: "Legacy", num: "VII" },
];

export default function Navbar() {
  const barRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 60);
      setHidden(y > 500 && y > lastY && !open);
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const ids = links.map((l) => l.href.replace("#", ""));
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const io = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting) setActive(id);
        },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      io.observe(el);
      observers.push(io);
    });
    return () => observers.forEach((o) => o.disconnect());
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
          hidden && !open ? "-translate-y-full" : "translate-y-0"
        } ${
          scrolled ? "border-b border-gold-500/15 bg-ink-950/80 backdrop-blur-xl" : "border-b border-transparent bg-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-[1500px] items-center justify-between px-5 py-4 sm:px-10">
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="group flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center border border-gold-500/40 font-serif text-lg text-gold-300 transition-all duration-500 group-hover:rotate-[10deg] group-hover:bg-gold-500/10">
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

          <div className="hidden items-center gap-6 lg:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                data-hover
                className={`group relative flex items-center gap-1.5 font-sans text-[11px] font-medium uppercase tracking-[0.2em] transition-colors ${
                  active === l.href.replace("#", "") ? "text-gold-300" : "text-parchment-200/70 hover:text-gold-300"
                }`}
              >
                <span className={`text-[8px] font-serif italic transition-opacity ${active === l.href.replace("#", "") ? "text-gold-400 opacity-100" : "opacity-40"}`}>
                  {l.num}
                </span>
                {l.label}
                <span className={`absolute -bottom-1 left-0 h-px bg-gold-400 transition-all duration-500 ${active === l.href.replace("#", "") ? "w-full" : "w-0 group-hover:w-full"}`} />
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
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-11 w-11 flex-col items-center justify-center gap-[7px] border border-gold-500/30 lg:hidden"
          >
            <span className={`h-px w-5 bg-gold-300 transition-all duration-500 ${open ? "translate-y-[4px] rotate-45" : ""}`} />
            <span className={`h-px w-5 bg-gold-300 transition-all duration-500 ${open ? "-translate-y-[4px] -rotate-45" : ""}`} />
          </button>
        </nav>
      </header>

      <div
        role="dialog"
        aria-modal="true"
        className={`fixed inset-0 z-[110] flex flex-col justify-between bg-ink-900/97 backdrop-blur-2xl transition-all duration-700 lg:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="pointer-events-none absolute inset-0 seal-radial" />
        <div className="pointer-events-none absolute inset-0 paper-grain" />
        <div className="relative flex flex-col gap-5 overflow-y-auto px-6 pt-28 sm:px-10">
          {links.map((l, i) => (
            <button
              key={l.href}
              onClick={() => go(l.href)}
              className="menu-link group flex items-center gap-4 border-b border-gold-500/10 pb-4 text-left"
            >
              <span className="font-serif text-lg font-light text-gold-500/70">{String(i + 1).padStart(2, "0")}</span>
              <span className="font-serif text-2xl font-light text-parchment-100 transition-colors group-hover:text-gold-200 sm:text-3xl">
                {l.label}
              </span>
              <span className="ml-auto h-px w-6 bg-gold-500/20 transition-all duration-500 group-hover:w-12 group-hover:bg-gold-500/60" />
            </button>
          ))}
          <button onClick={() => go("#summons")} className="btn-gold menu-link mt-4 w-fit px-8 py-4 font-cinzel text-xs uppercase tracking-[0.25em]">
            Open Communication
          </button>
        </div>
        <div className="relative border-t border-gold-500/10 px-6 py-6 sm:px-10">
          <p className="font-cinzel text-[10px] uppercase tracking-[0.3em] text-gold-400">The Chronicle · © MMXXVI</p>
        </div>
      </div>
    </>
  );
}