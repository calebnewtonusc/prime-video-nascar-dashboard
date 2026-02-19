import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Revenue | NASCAR Analytics · Prime Video",
  description: "Q1 2026 revenue breakdown by stream, advertising, and international",
};

export default function RevenueLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
