import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Prime Video NASCAR Dashboard | Q1 2026",
  description: "Amazon Prime Video NASCAR Cup Series Analytics Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#0F1117] text-[#F9FAFB]">{children}</body>
    </html>
  );
}
