import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SWRProvider } from "@/components/SWRProvider";

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
        <SWRProvider>{children}</SWRProvider>
      </body>
    </html>
  );
}
