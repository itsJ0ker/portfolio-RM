"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { SectionHeading } from "./Animations";
import { gallery, profile } from "@/data/content";

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
            delay: (i % 3) * 0.08,
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

  return (
    <section ref={rootRef} id="gallery" className="relative scroll-mt-24 py-24 sm:py-36 seal-radial">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-10">
        <SectionHeading
          chapterLabel="Chapter VIII · The Record"
          num="VIII"
          title="Frames from the Court Record"
          description="A visual deposition — moments from conferences, judicial programmes, placards of recognition, and the campus at work."
        />

        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
          {gallery.map((src, i) => (
            <figure key={i} className={`record-photo group relative cursor-pointer overflow-hidden border border-gold-500/15 ${i === 0 || i === 4 ? "col-span-2 lg:col-span-1 lg:row-span-2" : ""}`}>
              <button
                className="block h-full w-full"
                onClick={() => setLightbox(i)}
                aria-label={`Open case record ${i + 1}`}
                data-cursor-label="Enlarge"
              >
                <img
                  src={src}
                  alt={`Case record ${i + 1}`}
                  className="img-zoom h-[240px] w-full object-cover sm:h-[300px]"
                  loading="lazy"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-20" />
                <span className="absolute bottom-3 left-4 font-serif text-xs italic text-gold-200">§ Exhibit {String(i + 1).padStart(2, "0")}</span>
              </button>
            </figure>
          ))}
        </div>
      </div>

      {lightbox !== null && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center bg-ink-950/95 p-5 backdrop-blur-lg" onClick={() => setLightbox(null)}>
          <button className="absolute right-6 top-6 flex h-12 w-12 items-center justify-center border border-gold-500/40 text-gold-300 transition-colors hover:bg-gold-500/15" aria-label="Close">
            ✕
          </button>
          <div className="lightbox-card relative max-h-[86vh] max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <img src={gallery[lightbox]} alt={`Exhibit ${lightbox + 1}`} className="max-h-[80vh] w-full border border-gold-500/30 object-contain" />
            <p className="mt-4 text-center font-cinzel text-[11px] uppercase tracking-[0.3em] text-gold-300">
              Exhibit {String(lightbox + 1).padStart(2, "0")} · The {profile.name} Record
            </p>
          </div>
        </div>
      )}
    </section>
  );
}