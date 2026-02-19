"use client";
import { useState, useMemo } from "react";
import { ArrowUpDown, ArrowUp, ArrowDown, Search, Download } from "lucide-react";

interface Campaign {
  id: string;
  name: string;
  channel: string;
  status: "Active" | "Completed" | "Paused";
  budget: number;     // $K
  spend: number;      // $K
  impressions: number; // M
  clicks: number;     // K
  conversions: number; // K
  cpa: number;        // $
  roas: number;       // x
  ctr: number;        // %
}

const CAMPAIGNS: Campaign[] = [
  { id:"c1", name:"Daytona 500 Launch",      channel:"Email",         status:"Completed", budget:280, spend:271, impressions:12.4, clicks:840, conversions:94.2, cpa:2.88, roas:31.2, ctr:6.77 },
  { id:"c2", name:"Driver Fanbase Series",   channel:"Social/Influencer",status:"Active",budget:120, spend:89,  impressions:8.1,  clicks:320, conversions:23.0, cpa:3.87, roas:22.4, ctr:3.95 },
  { id:"c3", name:"Streaming Awareness Q1",  channel:"TV/CTV",        status:"Active",   budget:800, spend:744, impressions:31.2, clicks:210, conversions:18.2, cpa:40.88,roas:4.1,  ctr:0.67 },
  { id:"c4", name:"NASCAR Fantasy League",   channel:"App/Push",      status:"Active",   budget:45,  spend:38,  impressions:2.8,  clicks:420, conversions:31.4, cpa:1.21, roas:18.7, ctr:15.0 },
  { id:"c5", name:"Chase Elliott Spotlight", channel:"YouTube",       status:"Completed", budget:60,  spend:58,  impressions:5.2,  clicks:280, conversions:14.8, cpa:3.92, roas:19.3, ctr:5.38 },
  { id:"c6", name:"International Expansion", channel:"Display/Prog",  status:"Active",   budget:200, spend:141, impressions:18.6, clicks:190, conversions:9.4,  cpa:15.00,roas:7.8,  ctr:1.02 },
  { id:"c7", name:"Podcast Sponsorships",    channel:"Audio/Podcast", status:"Active",   budget:85,  spend:72,  impressions:3.4,  clicks:96,  conversions:8.2,  cpa:8.78, roas:12.4, ctr:2.82 },
  { id:"c8", name:"Race Day Push Alerts",    channel:"App/Push",      status:"Completed",budget:30,  spend:28,  impressions:1.9,  clicks:340, conversions:28.6, cpa:0.98, roas:24.8, ctr:17.9 },
  { id:"c9", name:"Prime Bundle Upsell",     channel:"Email",         status:"Active",   budget:95,  spend:61,  impressions:4.8,  clicks:510, conversions:52.1, cpa:1.17, roas:29.4, ctr:10.6 },
  { id:"c10",name:"Bristol Dirt Countdown",  channel:"Social/Influencer",status:"Active",budget:40,  spend:22,  impressions:3.1,  clicks:148, conversions:11.2, cpa:1.96, roas:20.1, ctr:4.77 },
];

type SortKey = keyof Campaign;

const STATUS_STYLE: Record<string, { bg: string; color: string; border: string }> = {
  Active:    { bg: "rgba(0,200,150,0.1)",  color: "#00C896", border: "rgba(0,200,150,0.25)" },
  Completed: { bg: "rgba(0,168,255,0.1)",  color: "#00A8FF", border: "rgba(0,168,255,0.25)" },
  Paused:    { bg: "rgba(245,158,11,0.1)", color: "#F59E0B", border: "rgba(245,158,11,0.25)" },
};

const CHANNEL_COLORS: Record<string, string> = {
  "Email": "#00A8FF",
  "Social/Influencer": "#7C6FFF",
  "TV/CTV": "#FF4F5B",
  "App/Push": "#00C896",
  "YouTube": "#FF9900",
  "Display/Prog": "#8B97AA",
  "Audio/Podcast": "#F59E0B",
};

function BudgetBar({ spend, budget }: { spend: number; budget: number }) {
  const pct = Math.min((spend / budget) * 100, 100);
  const over = spend > budget * 0.95;
  return (
    <div className="flex items-center gap-2" style={{ minWidth: 120 }}>
      <div className="progress-bar flex-1" style={{ height: 4, background: "#1A2437", borderRadius: 2, overflow: "hidden" }}>
        <div style={{
          height: "100%", borderRadius: 2,
          width: `${pct}%`,
          background: over ? "#FF4F5B" : "#00A8FF",
          transition: "width 0.5s ease",
        }} />
      </div>
      <span style={{ fontSize: 11, color: over ? "#FF4F5B" : "#8B97AA", minWidth: 36, textAlign: "right", fontVariantNumeric: "tabular-nums" }}>
        {pct.toFixed(0)}%
      </span>
    </div>
  );
}

function RoasCell({ roas }: { roas: number }) {
  const color = roas >= 20 ? "#00C896" : roas >= 10 ? "#00A8FF" : roas >= 5 ? "#F59E0B" : "#FF4F5B";
  return (
    <div className="flex items-center gap-1.5">
      <div style={{ width: 28, height: 4, background: "#1A2437", borderRadius: 2, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${Math.min((roas / 35) * 100, 100)}%`, background: color, borderRadius: 2 }} />
      </div>
      <span style={{ color, fontSize: 12, fontWeight: 700, fontVariantNumeric: "tabular-nums" }}>{roas.toFixed(1)}x</span>
    </div>
  );
}

function SortIcon({ k, sort }: { k: SortKey; sort: { key: SortKey; dir: number } }) {
  if (sort.key !== k) return <ArrowUpDown size={9} style={{ opacity: 0.4 }} />;
  return sort.dir === -1 ? <ArrowDown size={9} style={{ color: "#00A8FF" }} /> : <ArrowUp size={9} style={{ color: "#00A8FF" }} />;
}

export default function MarketingTracker() {
  const [sort, setSort] = useState<{ key: SortKey; dir: 1 | -1 }>({ key: "roas", dir: -1 });
  const [search, setSearch] = useState("");

  const sorted = useMemo(() => {
    return [...CAMPAIGNS]
      .filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.channel.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => {
        const av = a[sort.key]; const bv = b[sort.key];
        if (typeof av === "number" && typeof bv === "number") return (av - bv) * sort.dir;
        return String(av).localeCompare(String(bv)) * sort.dir;
      });
  }, [sort, search]);

  const totalSpend  = CAMPAIGNS.reduce((s, c) => s + c.spend, 0);
  const totalConv   = CAMPAIGNS.reduce((s, c) => s + c.conversions, 0);
  const avgRoas     = (CAMPAIGNS.reduce((s, c) => s + c.roas * c.spend, 0) / totalSpend);
  const totalImpr   = CAMPAIGNS.reduce((s, c) => s + c.impressions, 0);

  function toggleSort(key: SortKey) {
    setSort(s => s.key === key ? { key, dir: s.dir === -1 ? 1 : -1 } : { key, dir: -1 });
  }

  function exportCSV() {
    const rows = [
      ["Campaign","Channel","Status","Budget ($K)","Spend ($K)","Impressions (M)","Clicks (K)","Conversions (K)","CPA ($)","ROAS (x)","CTR (%)"],
      ...CAMPAIGNS.map(c => [c.name,c.channel,c.status,c.budget,c.spend,c.impressions,c.clicks,c.conversions,c.cpa,c.roas,c.ctr]),
    ];
    const csv = rows.map(r => r.map(v => `"${v}"`).join(",")).join("\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    a.download = "prime-video-nascar-marketing-q1-2026.csv";
    a.click();
  }

  return (
    <div className="rounded-[10px] overflow-hidden" style={{ background: "#0C1220", border: "1px solid #1A2437" }}>
      {/* Header */}
      <div className="flex items-center justify-between gap-4 px-5 py-4" style={{ borderBottom: "1px solid #1A2437" }}>
        <div>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: "#E8ECF4" }}>Campaign Attribution</h2>
          <p style={{ fontSize: 11, color: "#4E5E74", marginTop: 2 }}>Q1 2026 · {CAMPAIGNS.length} campaigns · Sorted by ROAS</p>
        </div>
        <div className="flex items-center gap-3">
          {/* Summary stats */}
          <div className="hidden lg:flex items-center gap-4 px-4 py-2 rounded-lg" style={{ background: "#060A12", border: "1px solid #1A2437" }}>
            <div className="text-center">
              <p style={{ fontSize: 10, color: "#4E5E74", textTransform: "uppercase", letterSpacing: "0.07em" }}>Total Spend</p>
              <p style={{ fontSize: 14, fontWeight: 700, color: "#E8ECF4", fontVariantNumeric: "tabular-nums" }}>${totalSpend.toFixed(0)}K</p>
            </div>
            <div style={{ width: 1, height: 28, background: "#1A2437" }} />
            <div className="text-center">
              <p style={{ fontSize: 10, color: "#4E5E74", textTransform: "uppercase", letterSpacing: "0.07em" }}>Conversions</p>
              <p style={{ fontSize: 14, fontWeight: 700, color: "#E8ECF4", fontVariantNumeric: "tabular-nums" }}>{totalConv.toFixed(1)}K</p>
            </div>
            <div style={{ width: 1, height: 28, background: "#1A2437" }} />
            <div className="text-center">
              <p style={{ fontSize: 10, color: "#4E5E74", textTransform: "uppercase", letterSpacing: "0.07em" }}>Blended ROAS</p>
              <p style={{ fontSize: 14, fontWeight: 700, color: "#00C896", fontVariantNumeric: "tabular-nums" }}>{avgRoas.toFixed(1)}x</p>
            </div>
            <div style={{ width: 1, height: 28, background: "#1A2437" }} />
            <div className="text-center">
              <p style={{ fontSize: 10, color: "#4E5E74", textTransform: "uppercase", letterSpacing: "0.07em" }}>Impressions</p>
              <p style={{ fontSize: 14, fontWeight: 700, color: "#E8ECF4", fontVariantNumeric: "tabular-nums" }}>{totalImpr.toFixed(1)}M</p>
            </div>
          </div>

          <div className="relative">
            <Search size={12} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#4E5E74" }} />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search campaigns..."
              style={{
                background: "#060A12", border: "1px solid #1A2437", borderRadius: 6,
                color: "#E8ECF4", fontSize: 12, padding: "6px 10px 6px 28px",
                outline: "none", width: 180,
              }}
            />
          </div>
          <button
            onClick={exportCSV}
            className="flex items-center gap-1.5"
            style={{ background: "#060A12", border: "1px solid #1A2437", borderRadius: 6, color: "#8B97AA", fontSize: 12, padding: "6px 12px", cursor: "pointer" }}
          >
            <Download size={11} />
            Export
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="data-table" style={{ width: "100%", minWidth: 900 }}>
          <thead>
            <tr>
              {([
                ["name",        "Campaign"],
                ["channel",     "Channel"],
                ["status",      "Status"],
                ["spend",       "Spend"],
                ["budget",      "Budget Util."],
                ["impressions", "Impr. (M)"],
                ["ctr",         "CTR"],
                ["conversions", "Conv. (K)"],
                ["cpa",         "CPA"],
                ["roas",        "ROAS"],
              ] as [SortKey, string][]).map(([key, label]) => (
                <th key={key} onClick={() => toggleSort(key)} style={{ paddingLeft: key === "name" ? 20 : 12, cursor: "pointer" }}>
                  <span className="flex items-center gap-1">
                    {label} <SortIcon k={key} sort={sort} />
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map(c => {
              const st = STATUS_STYLE[c.status];
              const chColor = CHANNEL_COLORS[c.channel] ?? "#8B97AA";
              return (
                <tr key={c.id}>
                  <td style={{ paddingLeft: 20, fontWeight: 600, color: "#E8ECF4", fontSize: 12, maxWidth: 220 }}>
                    <span className="truncate block">{c.name}</span>
                  </td>
                  <td>
                    <span style={{ fontSize: 11, color: chColor, fontWeight: 600 }}>{c.channel}</span>
                  </td>
                  <td>
                    <span style={{ fontSize: 10, padding: "2px 7px", borderRadius: 4, fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", background: st.bg, color: st.color, border: `1px solid ${st.border}` }}>
                      {c.status}
                    </span>
                  </td>
                  <td style={{ fontVariantNumeric: "tabular-nums", fontWeight: 600, fontSize: 12 }}>${c.spend}K</td>
                  <td style={{ minWidth: 140 }}><BudgetBar spend={c.spend} budget={c.budget} /></td>
                  <td style={{ fontVariantNumeric: "tabular-nums", color: "#8B97AA", fontSize: 12 }}>{c.impressions.toFixed(1)}</td>
                  <td style={{ fontVariantNumeric: "tabular-nums", color: "#8B97AA", fontSize: 12 }}>{c.ctr.toFixed(2)}%</td>
                  <td style={{ fontVariantNumeric: "tabular-nums", fontSize: 12 }}>{c.conversions.toFixed(1)}</td>
                  <td style={{ fontVariantNumeric: "tabular-nums", color: c.cpa < 5 ? "#00C896" : c.cpa < 15 ? "#8B97AA" : "#FF4F5B", fontWeight: 600, fontSize: 12 }}>${c.cpa.toFixed(2)}</td>
                  <td><RoasCell roas={c.roas} /></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer insight */}
      <div className="flex items-center gap-2 px-5 py-3" style={{ borderTop: "1px solid #1A2437", background: "#060A12" }}>
        <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 4, background: "rgba(0,200,150,0.1)", color: "#00C896", border: "1px solid rgba(0,200,150,0.2)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
          AI Recommendation
        </span>
        <span style={{ fontSize: 11, color: "#8B97AA" }}>
          Email and App/Push channels are outperforming TV/CTV by <strong style={{ color: "#E8ECF4" }}>7.6x ROAS</strong>.{" "}
          Reallocating 25% of TV budget could yield an estimated <strong style={{ color: "#00C896" }}>+$680K</strong> in incremental conversions.
        </span>
      </div>
    </div>
  );
}
