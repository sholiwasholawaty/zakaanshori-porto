import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const sans = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

const title = "Zaka Anshori \u2014 Independent Founder & Builder";
const description =
  "Independent founder and builder creating digital products and AI systems that solve real problems.";

export const metadata: Metadata = {
  metadataBase: new URL("https://zakaanshori.com"),
  title,
  description,
  openGraph: { title, description, url: "https://zakaanshori.com", siteName: "Zaka Anshori", type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export const viewport: Viewport = { themeColor: "#050505" };

// Jalan sebelum render supaya tidak ada kedip saat user memilih mode terang.
const themeScript = `try{if(localStorage.getItem("theme")==="light"){document.documentElement.classList.remove("dark")}}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`dark ${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="font-sans">{children}</body>
    </html>
  );
}
