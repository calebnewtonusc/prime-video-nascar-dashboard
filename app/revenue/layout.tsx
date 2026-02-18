import Header from "@/components/Header";
import KPIStrip from "@/components/KPIStrip";

export default function RevenueLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <KPIStrip />
      {children}
    </>
  );
}
