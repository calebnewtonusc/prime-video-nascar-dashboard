import type { Metadata } from "next";
import Header from "@/components/Header";
import KPIStrip from "@/components/KPIStrip";

export const metadata: Metadata = {
  title: "AI Insights | NASCAR Analytics · Prime Video",
  description: "Amazon Bedrock-powered predictive analytics and churn signals",
};

export default function AIInsightsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <KPIStrip />
      {children}
    </>
  );
}
