import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Marketing | NASCAR Analytics · Prime Video",
  description: "Q1 2026 campaign performance and ROAS analytics",
};

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
