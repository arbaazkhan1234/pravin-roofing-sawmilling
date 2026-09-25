import type { Metadata } from "next";
import { Fraunces, Work_Sans } from "next/font/google";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT", "WONK"],
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pravin Roofing and Sawmilling Co. Ltd. | Solid Wood Doors & Lumber, Penal",
  description:
    "Solid wood doors, custom lumber, and live-edge slabs — imported hardwood, milled and finished in Penal, Trinidad and Tobago.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${workSans.variable} scroll-smooth`}
    >
      {/* suppressHydrationWarning here only covers this element's own attributes
          — it's the standard fix for browser extensions (e.g. ColorZilla's
          cz-shortcut-listen) injecting attributes into <body> before React
          hydrates. It does not hide real hydration mismatches elsewhere. */}
      <body
        className="min-h-full bg-bone text-charcoal antialiased"
        suppressHydrationWarning
      >
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
