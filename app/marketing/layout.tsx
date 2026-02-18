import Header from "@/components/Header";
import KPIStrip from "@/components/KPIStrip";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <KPIStrip />
      {children}
    </>
  );
}
