import type { Metadata } from "next";
import { Bellefair, Barlow, Barlow_Condensed } from "next/font/google";
import "./globals.css";

const bellefair = Bellefair({
  variable: "--font-bellefair",
  subsets: ["latin"],
  weight: "400",
});

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Space Tourism | Explore the Universe",
  description: "Experience the ultimate adventure with our space tourism destinations. Visit the Moon, Mars, Europa, and Titan with our expert crew.",
  keywords: ["space tourism", "space travel", "moon", "mars", "europa", "titan"],
  authors: [{ name: "Chris Ebube Roland" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${bellefair.variable} ${barlow.variable} ${barlowCondensed.variable} antialiased space-theme`}
      >
        {children}
      </body>
    </html>
  );
}