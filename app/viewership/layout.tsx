import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Viewership | NASCAR Analytics · Prime Video",
  description: "Q1 2026 race viewership data and audience analytics",
};

export default function ViewershipLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
