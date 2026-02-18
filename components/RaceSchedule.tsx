"use client";

import { Flag, Calendar, TrendingUp, Star } from "lucide-react";

type RaceStatus = "COMPLETED" | "LIVE" | "UPCOMING";

interface Race {
  race: string;
  date: string;
  venue: string;
  viewers: string;
  viewersRaw: number;
  revenue: string;
  rating: number;
  status: RaceStatus;
  isBlockbuster?: boolean;
  projected?: boolean;
}

const races: Race[] = [
  {
    race: "Daytona 500",
    date: "Feb 16, 2026",
    venue: "Daytona International Speedway",
    viewers: "8.2M",
    viewersRaw: 8.2,
    revenue: "$3.2M",
    rating: 4.7,
    status: "COMPLETED",
    isBlockbuster: true,
  },
  {
    race: "Pennzoil 400",
    date: "Mar 1, 2026",
    venue: "Las Vegas Motor Speedway",
    viewers: "2.1M",
    viewersRaw: 2.1,
    revenue: "$0.9M",
    rating: 3.1,
    status: "UPCOMING",
    projected: true,
  },
  {
    race: "Ambetter 400",
    date: "Mar 8, 2026",
    venue: "Atlanta Motor Speedway",
    viewers: "1.8M",
    viewersRaw: 1.8,
    revenue: "$0.7M",
    rating: 2.9,
    status: "UPCOMING",
    projected: true,
  },
  {
    race: "United Rentals 500",
    date: "Mar 15, 2026",
    venue: "Phoenix Raceway",
    viewers: "2.4M",
    viewersRaw: 2.4,
    revenue: "$0.9M",
    rating: 3.5,
    status: "UPCOMING",
    projected: true,
  },
  {
    race: "EchoPark 500",
    date: "Mar 22, 2026",
    venue: "Circuit of the Americas",
    viewers: "1.9M",
    viewersRaw: 1.9,
    revenue: "$0.8M",
    rating: 3.2,
    status: "UPCOMING",
    projected: true,
  },
  {
    race: "Food City 500",
    date: "Mar 29, 2026",
    venue: "Bristol Motor Speedway (Dirt)",
    viewers: "2.3M",
    viewersRaw: 2.3,
    revenue: "$0.8M",
    rating: 3.4,
    status: "UPCOMING",
    projected: true,
  },
];

const columns = ["Race", "Date", "Venue", "Viewers", "Revenue", "Rating", "Status"];

function StatusBadge({ status }: { status: RaceStatus }) {
  if (status === "COMPLETED") {
    return (
      <span
        className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full"
        style={{ background: "#1399FF22", color: "#1399FF", border: "1px solid #1399FF44" }}
      >
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#1399FF" }} />
        COMPLETED
      </span>
    );
  }

  if (status === "LIVE") {
    return (
      <span
        className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full"
        style={{ background: "#10B98122", color: "#10B981", border: "1px solid #10B98144" }}
      >
        <span className="relative flex h-2 w-2">
          <span
            className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
            style={{ background: "#10B981" }}
          />
          <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: "#10B981" }} />
        </span>
        LIVE
      </span>
    );
  }

  return (
    <span
      className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full"
      style={{ background: "#374151", color: "#9CA3AF", border: "1px solid #4B5563" }}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-gray-500" />
      UPCOMING
    </span>
  );
}

function RatingStars({ rating }: { rating: number }) {
  const full = Math.floor(rating / 1);
  return (
    <div className="flex items-center gap-1">
      <Star size={12} className="fill-yellow-400 text-yellow-400" />
      <span className="text-sm font-semibold text-white">{rating.toFixed(1)}</span>
    </div>
  );
}

function ViewerBar({ value, max }: { value: number; max: number }) {
  const pct = Math.round((value / max) * 100);
  return (
    <div className="flex items-center gap-2">
      <div className="w-12 h-1.5 rounded-full overflow-hidden" style={{ background: "#252D3D" }}>
        <div
          className="h-full rounded-full"
          style={{ width: `${pct}%`, background: "#1399FF" }}
        />
      </div>
    </div>
  );
}

export default function RaceSchedule() {
  const maxViewers = Math.max(...races.map((r) => r.viewersRaw));

  return (
    <div
      style={{ background: "#1A1F2E", border: "1px solid #252D3D" }}
      className="rounded-xl p-6 w-full"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: "#1399FF22", border: "1px solid #1399FF44" }}
            >
              <Flag size={16} style={{ color: "#1399FF" }} />
            </div>
            <h2 className="text-xl font-bold text-white">Q1 Race Schedule</h2>
          </div>
          <p className="text-sm text-gray-400 mt-1 ml-10.5">6 races &bull; February &ndash; March 2026</p>
        </div>
        <div className="flex items-center gap-3 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <Calendar size={13} />
            <span>Q1 2026</span>
          </div>
          <div className="flex items-center gap-1">
            <TrendingUp size={13} />
            <span>+22.4% YoY</span>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg" style={{ border: "1px solid #252D3D" }}>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ background: "#0F1117", borderBottom: "1px solid #252D3D" }}>
              {columns.map((col) => (
                <th
                  key={col}
                  className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide cursor-default select-none whitespace-nowrap"
                >
                  <div className="flex items-center gap-1 hover:text-gray-300 transition-colors">
                    {col}
                    <svg
                      width="8"
                      height="10"
                      viewBox="0 0 8 10"
                      fill="none"
                      className="opacity-40"
                    >
                      <path d="M4 0L7 3H1L4 0Z" fill="currentColor" />
                      <path d="M4 10L1 7H7L4 10Z" fill="currentColor" />
                    </svg>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {races.map((race, i) => (
              <tr
                key={race.race}
                className="group transition-colors cursor-default"
                style={{
                  background: race.isBlockbuster ? "#1F1A0F" : undefined,
                  borderBottom: i < races.length - 1 ? "1px solid #252D3D" : undefined,
                  outline: race.isBlockbuster ? "1px solid #F59E0B33" : undefined,
                }}
                onMouseEnter={(e) => {
                  if (!race.isBlockbuster)
                    (e.currentTarget as HTMLElement).style.background = "#252D3D55";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = race.isBlockbuster
                    ? "#1F1A0F"
                    : "";
                }}
              >
                {/* Race name */}
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-2">
                    {race.isBlockbuster && (
                      <Star
                        size={13}
                        className="flex-shrink-0"
                        style={{ color: "#F59E0B", fill: "#F59E0B" }}
                      />
                    )}
                    <div>
                      <p
                        className="font-semibold"
                        style={{ color: race.isBlockbuster ? "#F59E0B" : "#F9FAFB" }}
                      >
                        {race.race}
                      </p>
                      {race.isBlockbuster && (
                        <p className="text-xs" style={{ color: "#F59E0B88" }}>
                          Blockbuster Event
                        </p>
                      )}
                    </div>
                  </div>
                </td>

                {/* Date */}
                <td className="px-4 py-3.5 whitespace-nowrap text-gray-400">
                  {race.date}
                </td>

                {/* Venue */}
                <td className="px-4 py-3.5">
                  <span className="text-gray-300 text-xs leading-tight block max-w-[180px]">
                    {race.venue}
                  </span>
                </td>

                {/* Viewers */}
                <td className="px-4 py-3.5">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-white">{race.viewers}</span>
                      {race.projected && (
                        <span className="text-xs text-gray-600">proj.</span>
                      )}
                    </div>
                    <ViewerBar value={race.viewersRaw} max={maxViewers} />
                  </div>
                </td>

                {/* Revenue */}
                <td className="px-4 py-3.5">
                  <div>
                    <span className="font-semibold" style={{ color: "#10B981" }}>
                      {race.revenue}
                    </span>
                    {race.projected && (
                      <p className="text-xs text-gray-600">projected</p>
                    )}
                  </div>
                </td>

                {/* Rating */}
                <td className="px-4 py-3.5">
                  <RatingStars rating={race.rating} />
                </td>

                {/* Status */}
                <td className="px-4 py-3.5">
                  <StatusBadge status={race.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer stats */}
      <div className="mt-4 grid grid-cols-4 gap-3">
        {[
          { icon: <Flag size={14} />, label: "Total Races", value: "6", color: "#1399FF" },
          { icon: <TrendingUp size={14} />, label: "Completed", value: "1", color: "#10B981" },
          { icon: <Calendar size={14} />, label: "Upcoming", value: "5", color: "#9CA3AF" },
          { icon: <Star size={14} />, label: "Avg Rating", value: "3.3", color: "#F59E0B" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg"
            style={{ background: "#0F1117", border: "1px solid #252D3D" }}
          >
            <span style={{ color: stat.color }}>{stat.icon}</span>
            <div>
              <p className="text-xs text-gray-500">{stat.label}</p>
              <p className="text-sm font-bold text-white">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
