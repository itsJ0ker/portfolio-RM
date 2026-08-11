"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { InkReveal } from "./Animations";
import { gallery, profile } from "@/data/content";

const captions = [
  "Inauguration of the 4th National Conference on GST Reforms",
  "Judicial Development Programme 2024 — In Session",
  "National Seminar: Courtroom to Boardroom",
  "CORPEX Corporate Law Conclave 2024",
  "Technical session, Advancing the SDGs in India",
  "Certification ceremony — Law Placement Cell",
  "Guest Lecture Series: From Statute to Story",
  "Placement drive — final-year law students",
  "Campus convening, BVIMR New Delhi",
  "Felicitation and the record of recognition",
];

export default function Gallery() {
  const rootRef = useRef<HTMLElement>(null);
  const [lightbox, setLightbox] = useState<number | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".record-photo").forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 50, scale: 0.94 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            delay: (i % 4) * 0.07,
            scrollTrigger: { trigger: el, start: "top 88%" },
          }
        );
      });
    }, root);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? "hidden" : "";
    if (lightbox !== null) {
      gsap.fromTo(".lightbox-card", { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: "power3.out" });
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightbox]);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") setLightbox((v) => (v! + 1) % gallery.length);
      if (e.key === "ArrowLeft") setLightbox((v) => (v! - 1 + gallery.length) % gallery.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  const prev = () => setLightbox((v) => (v! - 1 + gallery.length) % gallery.length);
  const next = () => setLightbox((v) => (v! + 1) % gallery.length);

  return (
    <section ref={rootRef} id="gallery" className="relative scroll-mt-24 py-24 sm:py-36">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-10">
        <div className="mb-14 grid items-end gap-8 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <p className="mb-4 flex items-center gap-3 font-cinzel text-[11px] uppercase tracking-[0.32em] text-gold-400">
              <span className="index-tick" />
              Chapter VIII — The Record
            </p>
            <h2 className="font-serif text-[clamp(2.1rem,5.5vw,4.2rem)] font-light leading-[1.02] text-parchment-50">
              <InkReveal text="Frames from the Court Record" />
            </h2>
          </div>
          <p className="max-w-md font-sans text-sm font-light leading-[1.9] text-slate-cold lg:justify-self-end lg:text-right">
            A visual deposition — moments from conferences, judicial programmes, placards of
            recognition, and the campus at work.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
          {gallery.map((src, i) => (
            <figure
              key={i}
              className={`record-photo group relative cursor-pointer overflow-hidden border border-gold-500/15 ${
                i === 0 || i === 4 ? "col-span-2 sm:col-span-1 sm:row-span-2" : ""
              }`}
            >
              <button
                className="block h-full w-full"
                onClick={() => setLightbox(i)}
                aria-label={`Open case record ${i + 1}`}
                data-cursor-label="Enlarge"
              >
                <img
                  src={src}
                  alt={captions[i] ?? `Case record ${i + 1}`}
                  className="img-zoom aspect-[4/3] h-auto w-full object-cover"
                  loading="lazy"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-30" />
                <span className="absolute bottom-3 left-4 font-cinzel text-[9px] uppercase tracking-[0.22em] text-gold-200">
                  § Exhibit {String(i + 1).padStart(2, "0")}
                </span>
              </button>
            </figure>
          ))}
        </div>
      </div>

      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[150] flex items-center justify-center bg-ink-950/95 p-4 backdrop-blur-lg"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            className="absolute right-5 top-5 z-10 flex h-12 w-12 items-center justify-center border border-gold-500/40 text-gold-300 transition-colors hover:bg-gold-500/15"
            aria-label="Close"
            onClick={() => setLightbox(null)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
          <button
            className="absolute left-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-gold-500/40 text-gold-300 transition-colors hover:bg-gold-500/15 sm:left-8"
            aria-label="Previous"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5"><path d="M15 18l-6-6 6-6" /></svg>
          </button>
          <button
            className="absolute right-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-gold-500/40 text-gold-300 transition-colors hover:bg-gold-500/15 sm:right-8"
            aria-label="Next"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5"><path d="M9 6l6 6-6 6" /></svg>
          </button>
          <div className="lightbox-card relative max-h-[86vh] max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <img
              src={gallery[lightbox]}
              alt={captions[lightbox] ?? `Exhibit ${lightbox + 1}`}
              className="max-h-[74vh] w-full border border-gold-500/30 object-contain"
            />
            <p className="mt-4 text-center font-cinzel text-[10px] uppercase tracking-[0.3em] text-gold-300">
              Exhibit {String(lightbox + 1).padStart(2, "0")} — {captions[lightbox]}
            </p>
            <p className="mt-1 text-center font-sans text-[11px] italic text-slate-cold-2">
              {profile.name} · The Record · {lightbox + 1} of {gallery.length}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}