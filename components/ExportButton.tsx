"use client";

import { useRef, useEffect, useState } from "react";
import { Download, FileText, Printer, ChevronDown } from "lucide-react";

const CSV_DATA = `NASCAR Cup Series Analytics - Q1 2026 Export
Generated: ${new Date().toISOString()}

=== KPI METRICS ===
Metric,Value,Change,Period
Total Q1 Viewers,16400000,+23%,Q1 2026
New Subscribers,342000,+31%,Q1 2026
Q1 Revenue,$12800000,+18%,Q1 2026
Avg Race Viewers,5467000,+19%,Q1 2026
Retention Rate,78%,+9pts,Q1 2026
Prime Conversion,12.4%,+2.1pts,Q1 2026

=== RACE SCHEDULE ===
Race,Date,Viewers (M),Revenue ($M),YoY Change
Daytona 500,Feb 16 2026,9.2,$4.1,+31%
Las Vegas Motor Speedway,Mar 2 2026,4.8,$2.3,+18%
Atlanta Motor Speedway,Mar 9 2026,4.1,$1.9,+22%
Phoenix Raceway,Mar 16 2026,3.9,$1.8,+15%
Circuit of the Americas,Mar 23 2026,3.4,$1.6,+28%
Bristol Motor Speedway Dirt,Mar 30 2026,3.2,$1.1,+11%

=== MARKETING CAMPAIGNS ===
Campaign,Impressions (M),Clicks (K),CTR,Conv Rate,Revenue ($M)
Daytona Takeover,142,890,0.63%,4.2%,$1.82
NASCAR Everywhere,98,620,0.63%,3.8%,$1.24
Speed & Drama,76,480,0.63%,3.1%,$0.98
Driver Fanbase,54,310,0.57%,2.9%,$0.64
Race Day Email,38,290,0.76%,5.1%,$0.74

=== DRIVER LEADERBOARD (TOP 5) ===
Rank,Driver,Team,Engagement (M),Fan Growth,Social Mentions (K)
1,Kyle Larson,Hendrick Motorsports,3.2,+41%,284
2,Chase Elliott,Hendrick Motorsports,2.9,+38%,261
3,Denny Hamlin,Joe Gibbs Racing,2.6,+29%,218
4,Martin Truex Jr.,Joe Gibbs Racing,2.1,+22%,176
5,William Byron,Hendrick Motorsports,1.8,+19%,154
`;

export default function ExportButton() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  function handleExportCSV() {
    const blob = new Blob([CSV_DATA], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "nascar-q1-2026-dashboard.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setOpen(false);
  }

  function handlePrint() {
    window.print();
    setOpen(false);
  }

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 px-4 py-1.5 rounded-lg text-[12px] font-bold text-white transition-all hover:brightness-110 active:scale-95"
        style={{
          background: "linear-gradient(135deg, #3A6FA8, #0D7FCC)",
          boxShadow: "0 0 14px rgba(58,111,168,0.3), 0 2px 6px rgba(0,0,0,0.4)",
        }}
      >
        <Download size={13} strokeWidth={2.5} />
        Export
        <ChevronDown size={12} strokeWidth={2.5} className={`transition-transform duration-150 ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div
          className="absolute right-0 mt-1.5 w-48 rounded-lg overflow-hidden z-50"
          style={{
            background: "#1F2937",
            border: "1px solid #374151",
            boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
          }}
        >
          <button
            onClick={handleExportCSV}
            className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[12px] font-semibold text-left transition-colors hover:bg-[#374151]"
            style={{ color: "#D1D5DB" }}
          >
            <FileText size={14} style={{ color: "#3A6FA8" }} />
            Export CSV
          </button>
          <div style={{ height: "1px", background: "#374151" }} />
          <button
            onClick={handlePrint}
            className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[12px] font-semibold text-left transition-colors hover:bg-[#374151]"
            style={{ color: "#D1D5DB" }}
          >
            <Printer size={14} style={{ color: "#10B981" }} />
            Print / Save PDF
          </button>
        </div>
      )}
    </div>
  );
}
