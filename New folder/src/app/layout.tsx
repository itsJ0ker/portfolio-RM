import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope, Cinzel } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Dr. Ritika Malik | Assistant Professor · Placement Officer (Law) · Academic Editor",
  description:
    "Portfolio of Dr. Ritika Malik — Assistant Professor & Placement Officer (Law) at BVIMR New Delhi. Academic Editor, Peer Reviewer (Elsevier, Emerald, Springer, Frontiers), Author, and Convenor of national conferences.",
  authors: [{ name: "Dr. Ritika Malik" }],
  keywords: [
    "Ritika Malik",
    "Assistant Professor",
    "Placement Officer Law",
    "BVIMR",
    "Academic Editor",
    "Peer Reviewer",
    "Scopus",
    "Legal Education",
  ],
  openGraph: {
    title: "Dr. Ritika Malik — The Chronicle",
    description:
      "Assistant Professor | Placement Officer (Law) | Academic Editor | Peer Reviewer. A portfolio chronicling scholarship, mentorship and the counsel of law.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a1122",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${manrope.variable} ${cinzel.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}