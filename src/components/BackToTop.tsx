"use client";
import { useEffect, useState } from "react";

export default function BackToTop({ show }: { show: boolean }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 900);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;
  return (
    <button
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-6 right-6 z-[120] flex h-12 w-12 items-center justify-center border border-gold-500/40 bg-ink-900/85 text-gold-300 backdrop-blur transition-all duration-500 hover:bg-gold-500/15 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5">
        <path d="M12 19V5M6 11l6-6 6 6" />
      </svg>
    </button>
  );
}