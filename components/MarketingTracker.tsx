"use client";

type CampaignStatus = "COMPLETED" | "ACTIVE";

interface Campaign {
  name: string;
  channel: string;
  budget: string;
  budgetRaw: number;
  impressions: string;
  clicks: string;
  conversions: string;
  conversionsRaw: number;
  cpa: string;
  cpaRaw: number;
  roas: string;
  roasRaw: number;
  status: CampaignStatus;
  isBest: boolean;
}

const campaigns: Campaign[] = [
  {
    name: "Daytona Takeover",
    channel: "Social Media",
    budget: "$280K",
    budgetRaw: 280,
    impressions: "48M",
    clicks: "890K",
    conversions: "62K",
    conversionsRaw: 62,
    cpa: "$4.52",
    cpaRaw: 4.52,
    roas: "8.2x",
    roasRaw: 8.2,
    status: "COMPLETED",
    isBest: false,
  },
  {
    name: "NASCAR Everywhere",
    channel: "Programmatic",
    budget: "$195K",
    budgetRaw: 195,
    impressions: "82M",
    clicks: "420K",
    conversions: "28K",
    conversionsRaw: 28,
    cpa: "$6.96",
    cpaRaw: 6.96,
    roas: "5.8x",
    roasRaw: 5.8,
    status: "ACTIVE",
    isBest: false,
  },
  {
    name: "Speed & Drama",
    channel: "TV Spots",
    budget: "$440K",
    budgetRaw: 440,
    impressions: "28M",
    clicks: "-",
    conversions: "41K",
    conversionsRaw: 41,
    cpa: "$10.73",
    cpaRaw: 10.73,
    roas: "4.1x",
    roasRaw: 4.1,
    status: "COMPLETED",
    isBest: false,
  },
  {
    name: "Driver Fanbase",
    channel: "Influencer",
    budget: "$120K",
    budgetRaw: 120,
    impressions: "18M",
    clicks: "1.2M",
    conversions: "31K",
    conversionsRaw: 31,
    cpa: "$3.87",
    cpaRaw: 3.87,
    roas: "9.4x",
    roasRaw: 9.4,
    status: "ACTIVE",
    isBest: false,
  },
  {
    name: "Race Day Email",
    channel: "Email",
    budget: "$18K",
    budgetRaw: 18,
    impressions: "8.4M",
    clicks: "980K",
    conversions: "48K",
    conversionsRaw: 48,
    cpa: "$0.38",
    cpaRaw: 0.38,
    roas: "31.2x",
    roasRaw: 31.2,
    status: "ACTIVE",
    isBest: true,
  },
];

const STATUS_STYLES: Record<CampaignStatus, { bg: string; text: string; dot: string }> = {
  COMPLETED: { bg: "rgba(16,185,129,0.12)", text: "#10B981", dot: "#10B981" },
  ACTIVE: { bg: "rgba(19,153,255,0.12)", text: "#1399FF", dot: "#1399FF" },
};

const CHANNEL_ICONS: Record<string, string> = {
  "Social Media": "S",
  Programmatic: "P",
  "TV Spots": "T",
  Influencer: "I",
  Email: "E",
};

function RoasBar({ value, max }: { value: number; max: number }) {
  const pct = Math.min((value / max) * 100, 100);
  const color =
    pct >= 80 ? "#10B981" : pct >= 50 ? "#FF9900" : pct >= 30 ? "#F59E0B" : "#EF4444";

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-bold" style={{ color, minWidth: "40px" }}>
        {value}x
      </span>
      <div
        className="flex-1 h-1.5 rounded-full overflow-hidden"
        style={{ backgroundColor: "rgba(255,255,255,0.08)", minWidth: "60px" }}
      >
        <div
          className="h-full rounded-full"
          style={{
            width: `${pct}%`,
            backgroundColor: color,
            boxShadow: `0 0 4px ${color}60`,
          }}
        />
      </div>
    </div>
  );
}

const totalBudget = campaigns.reduce((s, c) => s + c.budgetRaw, 0);
const totalConversions = campaigns.reduce((s, c) => s + c.conversionsRaw, 0);
const totalCPAAvg =
  campaigns.reduce((s, c) => s + c.cpaRaw, 0) / campaigns.length;
const bestROAS = Math.max(...campaigns.map((c) => c.roasRaw));
const maxRoas = bestROAS;

export default function MarketingTracker() {
  return (
    <div
      className="rounded-xl p-6"
      style={{ backgroundColor: "#1A1F2E", border: "1px solid #252D3D" }}
    >
      {/* Header */}
      <div className="mb-5">
        <h2 className="text-lg font-bold text-[#F9FAFB] leading-tight">
          Go-To-Market Campaign Tracker
        </h2>
        <p className="text-xs text-[#9CA3AF] mt-1">Q1 2026 NASCAR Launch</p>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        {[
          {
            label: "Total Spend",
            value: `$${totalBudget}K`,
            color: "#1399FF",
            sub: "5 campaigns",
          },
          {
            label: "Total Conversions",
            value: `${totalConversions}K`,
            color: "#10B981",
            sub: "subscribers acquired",
          },
          {
            label: "Avg CPA",
            value: `$${totalCPAAvg.toFixed(2)}`,
            color: "#FF9900",
            sub: "blended average",
          },
          {
            label: "Best ROAS",
            value: `${bestROAS}x`,
            color: "#F59E0B",
            sub: "Race Day Email",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-lg p-3"
            style={{ backgroundColor: "#0F1117", border: "1px solid #252D3D" }}
          >
            <p className="text-[10px] text-[#9CA3AF] uppercase tracking-wider mb-1">
              {stat.label}
            </p>
            <p className="text-lg font-bold" style={{ color: stat.color }}>
              {stat.value}
            </p>
            <p className="text-[10px] text-[#9CA3AF] mt-0.5">{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: "1px solid #252D3D" }}>
              {[
                "Campaign",
                "Channel",
                "Budget",
                "Impressions",
                "Clicks",
                "Conv.",
                "CPA",
                "ROAS",
                "Status",
              ].map((h) => (
                <th
                  key={h}
                  className="py-2.5 px-3 text-left text-[10px] font-semibold uppercase tracking-wider cursor-pointer select-none"
                  style={{ color: "#9CA3AF" }}
                >
                  <span className="flex items-center gap-1">
                    {h}
                    <svg
                      className="w-3 h-3 opacity-40"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16V4m0 0L3 8m4-4l4 4m6 8v-8m0 8l4-4m-4 4l-4-4"
                      />
                    </svg>
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {campaigns.map((c, i) => {
              const statusStyle = STATUS_STYLES[c.status];
              return (
                <tr
                  key={c.name}
                  className="transition-colors"
                  style={{
                    borderBottom:
                      i < campaigns.length - 1
                        ? "1px solid #252D3D"
                        : undefined,
                    backgroundColor: c.isBest
                      ? "rgba(245,158,11,0.06)"
                      : "transparent",
                  }}
                >
                  {/* Campaign name */}
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      {c.isBest && (
                        <span
                          className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-bold uppercase"
                          style={{
                            backgroundColor: "rgba(245,158,11,0.2)",
                            color: "#F59E0B",
                            border: "1px solid rgba(245,158,11,0.4)",
                          }}
                        >
                          Best
                        </span>
                      )}
                      <span className="font-semibold text-[#F9FAFB] whitespace-nowrap">
                        {c.name}
                      </span>
                    </div>
                  </td>

                  {/* Channel */}
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <span
                        className="inline-flex items-center justify-center w-5 h-5 rounded text-[9px] font-bold text-white"
                        style={{ backgroundColor: "#252D3D" }}
                      >
                        {CHANNEL_ICONS[c.channel]}
                      </span>
                      <span className="text-[#9CA3AF] text-xs whitespace-nowrap">
                        {c.channel}
                      </span>
                    </div>
                  </td>

                  {/* Budget */}
                  <td className="py-3 px-3 text-[#F9FAFB] font-medium whitespace-nowrap">
                    {c.budget}
                  </td>

                  {/* Impressions */}
                  <td className="py-3 px-3 text-[#9CA3AF] whitespace-nowrap">
                    {c.impressions}
                  </td>

                  {/* Clicks */}
                  <td className="py-3 px-3 text-[#9CA3AF] whitespace-nowrap">
                    {c.clicks}
                  </td>

                  {/* Conversions */}
                  <td className="py-3 px-3 text-[#F9FAFB] font-medium whitespace-nowrap">
                    {c.conversions}
                  </td>

                  {/* CPA */}
                  <td
                    className="py-3 px-3 font-semibold whitespace-nowrap"
                    style={{
                      color:
                        c.cpaRaw <= 1
                          ? "#10B981"
                          : c.cpaRaw <= 5
                          ? "#FF9900"
                          : "#9CA3AF",
                    }}
                  >
                    {c.cpa}
                  </td>

                  {/* ROAS bar */}
                  <td className="py-3 px-3 min-w-[120px]">
                    <RoasBar value={c.roasRaw} max={maxRoas} />
                  </td>

                  {/* Status */}
                  <td className="py-3 px-3">
                    <span
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider whitespace-nowrap"
                      style={{
                        backgroundColor: statusStyle.bg,
                        color: statusStyle.text,
                      }}
                    >
                      <span
                        className="inline-block w-1.5 h-1.5 rounded-full"
                        style={{
                          backgroundColor: statusStyle.dot,
                          boxShadow:
                            c.status === "ACTIVE"
                              ? `0 0 4px ${statusStyle.dot}`
                              : undefined,
                        }}
                      />
                      {c.status}
                    </span>
                  </td>
                </tr>
              );
            })}

            {/* Totals row */}
            <tr
              style={{
                borderTop: "2px solid #252D3D",
                backgroundColor: "rgba(19,153,255,0.04)",
              }}
            >
              <td className="py-3 px-3">
                <span className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider">
                  Total
                </span>
              </td>
              <td className="py-3 px-3">
                <span className="text-xs text-[#9CA3AF]">5 Campaigns</span>
              </td>
              <td className="py-3 px-3 font-bold text-[#F9FAFB]">
                ${totalBudget}K
              </td>
              <td className="py-3 px-3 text-[#9CA3AF]">185M</td>
              <td className="py-3 px-3 text-[#9CA3AF]">3.5M+</td>
              <td className="py-3 px-3 font-bold text-[#F9FAFB]">
                {totalConversions}K
              </td>
              <td
                className="py-3 px-3 font-bold"
                style={{ color: "#FF9900" }}
              >
                ${totalCPAAvg.toFixed(2)}
              </td>
              <td className="py-3 px-3">
                <RoasBar value={11.74} max={maxRoas} />
              </td>
              <td className="py-3 px-3">
                <span className="text-xs text-[#9CA3AF]">Blended avg</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div
        className="mt-4 pt-3 flex items-center justify-between"
        style={{ borderTop: "1px solid #252D3D" }}
      >
        <p className="text-[10px] text-[#9CA3AF]">
          Data as of Feb 17, 2026 &bull; Conversions = paid subscriptions
          attributed within 30-day window
        </p>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span
              className="inline-block w-2 h-2 rounded-sm"
              style={{ backgroundColor: "#10B981" }}
            />
            <span className="text-[10px] text-[#9CA3AF]">High ROAS</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span
              className="inline-block w-2 h-2 rounded-sm"
              style={{ backgroundColor: "#FF9900" }}
            />
            <span className="text-[10px] text-[#9CA3AF]">Mid ROAS</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span
              className="inline-block w-2 h-2 rounded-sm"
              style={{ backgroundColor: "#EF4444" }}
            />
            <span className="text-[10px] text-[#9CA3AF]">Low ROAS</span>
          </div>
        </div>
      </div>
    </div>
  );
}
