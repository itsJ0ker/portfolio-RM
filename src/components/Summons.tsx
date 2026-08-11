"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { InkReveal } from "./Animations";
import { profile } from "@/data/content";

export default function Summons() {
  const rootRef = useRef<HTMLElement>(null);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".summons-inner",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.1, ease: "power3.out", scrollTrigger: { trigger: root, start: "top 72%" } }
      );
      gsap.fromTo(
        ".summons-copy",
        { opacity: 0, y: 26 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.08, ease: "power3.out", scrollTrigger: { trigger: root, start: "top 72%" } }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
      gsap.fromTo(".summons-seal-ink", { scale: 0, rotate: -30 }, { scale: 1, rotate: 0, duration: 1, ease: "back.out(1.8)" });
    }, 900);
  };

  return (
    <section ref={rootRef} id="summons" className="relative scroll-mt-24 overflow-hidden py-24 sm:py-36">
      <div className="absolute inset-0 bg-[radial-gradient(90%_100%_at_50%_100%,#14224a_0%,#0a1122_55%,#060a14_100%)]" />
      <div className="pointer-events-none absolute inset-0 paper-grain" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold-500/10" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[760px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold-500/[0.06]" />

      <div className="summons-inner relative mx-auto max-w-[1500px] px-5 sm:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <p className="summons-copy font-cinzel text-[11px] uppercase tracking-[0.4em] text-gold-400">Epilogue — The Summons</p>
          <h2 className="summons-copy mt-5 font-serif text-[clamp(2.4rem,7vw,5.5rem)] font-light leading-[1.05] text-parchment-50">
            The Court Is Now
            <br />
            <span className="text-gold-gradient italic">In Session.</span>
          </h2>
          <InkReveal text="For scholarly collaboration, peer review, guest lectures, editorial roles, or a partnership in shaping the legal minds of tomorrow — address the Bench directly." className="summons-copy mx-auto mt-6 block max-w-xl font-sans text-sm font-light leading-relaxed text-slate-cold sm:text-base" />

          <div className="summons-copy mt-10 grid gap-4 sm:grid-cols-3">
            <a href={`mailto:${profile.email}`} data-hover target="_blank" rel="noreferrer" className="gilt-card group p-6">
              <p className="font-cinzel text-[10px] uppercase tracking-[0.26em] text-gold-400">Dispatch</p>
              <p className="mt-2 font-serif text-xs text-parchment-100 transition-colors group-hover:text-gold-200 sm:text-sm">{profile.email}</p>
            </a>
            <a href={`tel:${profile.phone.replace(/\s/g, "")}`} data-hover target="_blank" rel="noreferrer" className="gilt-card group p-6">
              <p className="font-cinzel text-[10px] uppercase tracking-[0.26em] text-gold-400">Chambers</p>
              <p className="mt-2 font-serif text-sm text-parchment-100 transition-colors group-hover:text-gold-200 sm:text-base">{profile.phone}</p>
            </a>
            <div className="gilt-card p-6">
              <p className="font-cinzel text-[10px] uppercase tracking-[0.26em] text-gold-400">The Courtroom</p>
              <p className="mt-2 font-serif text-sm leading-relaxed text-parchment-100">{profile.institution}</p>
            </div>
          </div>

          <form onSubmit={submit} className="summons-copy relative mx-auto mt-14 max-w-xl">
            {sent ? (
              <div className="relative border border-gold-500/40 bg-ink-900/80 p-10 backdrop-blur">
                <div className="summons-seal-ink mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border-2 border-gold-400 bg-gold-500/10">
                  <span className="font-cinzel text-sm uppercase tracking-[0.2em] text-gold-300">R.M.</span>
                </div>
                <p className="font-serif text-2xl italic text-parchment-50">Summons Accepted.</p>
                <p className="mt-3 font-sans text-sm font-light text-slate-cold">
                  The record has been received. Counsel will respond within chambers&apos; hours.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-6 font-cinzel text-[10px] uppercase tracking-[0.26em] text-gold-400 underline-offset-4 hover:underline"
                >
                  File another
                </button>
              </div>
            ) : (
              <div className="space-y-4 border border-gold-500/20 bg-ink-900/70 p-6 text-left backdrop-blur sm:p-8">
                <div className="grid gap-4 sm:grid-cols-2">
                  <input required placeholder="Your Name" className="w-full border border-gold-500/20 bg-ink-950/60 px-4 py-3 font-sans text-sm text-parchment-100 placeholder:text-slate-cold-2 focus:border-gold-500/60 focus:outline-none" />
                  <input required type="email" placeholder="Your Email" className="w-full border border-gold-500/20 bg-ink-950/60 px-4 py-3 font-sans text-sm text-parchment-100 placeholder:text-slate-cold-2 focus:border-gold-500/60 focus:outline-none" />
                </div>
                <input placeholder="Subject of the Matter" className="w-full border border-gold-500/20 bg-ink-950/60 px-4 py-3 font-sans text-sm text-parchment-100 placeholder:text-slate-cold-2 focus:border-gold-500/60 focus:outline-none" />
                <textarea rows={4} placeholder="State your case…" className="w-full resize-none border border-gold-500/20 bg-ink-950/60 px-4 py-3 font-sans text-sm text-parchment-100 placeholder:text-slate-cold-2 focus:border-gold-500/60 focus:outline-none" />
                <button type="submit" disabled={sending} className="btn-gold w-full px-8 py-4 font-cinzel text-[11px] uppercase tracking-[0.28em] text-ink-950 disabled:opacity-60">
                  {sending ? "Filing…" : "File & Submit"}
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}