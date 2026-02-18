import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Prime Video · NASCAR Q1 2026 Analytics",
  description:
    "Amazon Prime Video NASCAR Cup Series Go-To-Market Analytics Dashboard — Q1 2026",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ background: "#080C14", color: "#F9FAFB" }}>{children}</body>
    </html>
  );
}
