"use client";
import "@/app/globals.css";
import { useState } from "react";
import Preloader from "@/components/Preloader";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Prologue from "@/components/Prologue";
import Chambers from "@/components/Chambers";
import Library from "@/components/Library";
import Verdicts from "@/components/Verdicts";
import Bench from "@/components/Bench";
import Courtrooms from "@/components/Courtrooms";
import Legacy from "@/components/Legacy";
import Gallery from "@/components/Gallery";
import Dignitaries from "@/components/Dignitaries";
import Summons from "@/components/Summons";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import { marqueeChips } from "@/data/content";

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  return (
    <main className="relative">
      <Preloader onDone={() => setLoaded(true)} />
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <Hero />
      <div className="relative z-10">
        <Marquee items={marqueeChips} reverse />
      </div>
      <Prologue />
      <Chambers />
      <Library />
      <Verdicts />
      <Bench />
      <Courtrooms />
      <Legacy />
      <Gallery />
      <Dignitaries />
      <Summons />
      <Footer />
      <BackToTop show={loaded} />
    </main>
  );
}