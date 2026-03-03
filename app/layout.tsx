import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "aos/dist/aos.css";
import { SWRProvider } from "@/components/SWRProvider";
import SessionWarning from "@/components/SessionWarning";
import { AOSInit } from "@/components/AOSInit";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NASCAR Analytics | Amazon Prime Video",
  description: "Q1 2026 Go-To-Market Strategy — Performance & Audience Intelligence",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <AOSInit />
        <SWRProvider>
          {children}
          <SessionWarning />
        </SWRProvider>
      </body>
    </html>
  );
}
