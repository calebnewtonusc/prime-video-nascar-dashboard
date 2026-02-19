"use client";
import { useEffect, useState } from "react";

const RACES = [
  { name: "Daytona 500",         track: "Daytona Int'l",   date: "Feb 16", viewers: 8.2, tvRating: 4.1, streamShare: 38, status: "Completed", winner: "C. Elliott" },
  { name: "Ambetter Health 400", track: "Atlanta Motor",   date: "Feb 23", viewers: 1.9, tvRating: 0.8, streamShare: 41, status: "Completed", winner: "W. Byron"   },
  { name: "Pennzoil 400",        track: "Las Vegas",       date: "Mar 2",  viewers: 2.1, tvRating: 0.9, streamShare: 43, status: "Completed", winner: "K. Larson"  },
  { name: "Shriners Children's", track: "Phoenix Raceway", date: "Mar 16", viewers: 2.4, tvRating: 1.1, streamShare: 44, status: "Completed", winner: "D. Hamlin"  },
  { name: "EchoPark Texas GP",   track: "COTA",            date: "Mar 23", viewers: 1.9, tvRating: 0.8, streamShare: 46, status: "Upcoming",  winner: null         },
  { name: "Food City 500",       track: "Bristol Motor",   date: "Mar 30", viewers: null,tvRating: null,streamShare: null,status: "Upcoming", winner: null         },
];

const STATUS_COLORS: Record<string, { bg: string; color: string; border: string }> = {
  Completed: { bg: "rgba(0,168,255,0.08)",  color: "#00A8FF", border: "rgba(0,168,255,0.2)" },
  Upcoming:  { bg: "rgba(245,158,11,0.08)", color: "#F59E0B", border: "rgba(245,158,11,0.2)" },
  Live:      { bg: "rgba(0,200,150,0.08)",  color: "#00C896", border: "rgba(0,200,150,0.2)" },
};

function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState("");
  useEffect(() => {
    function update() {
      const diff = targetDate.getTime() - Date.now();
      if (diff <= 0) { setTimeLeft("LIVE"); return; }
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setTimeLeft(`${d}d ${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`);
    }
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [targetDate]);
  return timeLeft;
}

export default function RaceSchedule() {
  const nextRaceDate = new Date("2026-03-23T14:00:00-05:00");
  const countdown = useCountdown(nextRaceDate);

  return (
    <div className="rounded-[10px] overflow-hidden h-full" style={{ background: "#0C1220", border: "1px solid #1A2437" }}>
      <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid #1A2437" }}>
        <div>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: "#E8ECF4" }}>Q1 Race Calendar</h2>
          <p style={{ fontSize: 11, color: "#4E5E74", marginTop: 2 }}>6 races · Feb – Mar 2026 · Prime Video streaming</p>
        </div>
        <div className="flex items-center gap-2">
          <span style={{ fontSize: 11, color: "#4E5E74" }}>Avg stream share:</span>
          <span style={{ fontSize: 14, fontWeight: 700, color: "#00C896", fontVariantNumeric: "tabular-nums" }}>
            {Math.round(RACES.filter(r => r.streamShare).reduce((s, r) => s + (r.streamShare ?? 0), 0) / RACES.filter(r => r.streamShare).length)}%
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "4px 10px", borderRadius: 6, background: "rgba(0,168,255,0.07)", border: "1px solid rgba(0,168,255,0.15)" }}>
            <span style={{ fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "#4E5E74" }}>Next Race</span>
            <span style={{ fontSize: 12, fontWeight: 800, color: "#00A8FF", fontVariantNumeric: "tabular-nums", letterSpacing: "-0.02em" }}>{countdown}</span>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, minWidth: 640 }}>
          <thead>
            <tr style={{ background: "#060A12" }}>
              {["Race", "Date", "Track", "Viewers", "TV Rating", "Stream Share", "Status"].map(h => (
                <th key={h} style={{ padding: "7px 12px", textAlign: "left", fontSize: 10, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: "#4E5E74", borderBottom: "1px solid #1A2437", whiteSpace: "nowrap" }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {RACES.map(r => {
              const s = STATUS_COLORS[r.status];
              return (
                <tr key={r.name} style={{ borderBottom: "1px solid #1A2437" }}>
                  <td style={{ padding: "10px 12px" }}>
                    <p style={{ fontWeight: 600, color: "#E8ECF4", fontSize: 12 }}>{r.name}</p>
                    {r.winner && <p style={{ fontSize: 10, color: "#4E5E74", marginTop: 1 }}>Winner: {r.winner}</p>}
                  </td>
                  <td style={{ padding: "10px 12px", color: "#8B97AA", fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap" }}>{r.date}</td>
                  <td style={{ padding: "10px 12px", color: "#8B97AA", fontSize: 11, whiteSpace: "nowrap" }}>{r.track}</td>
                  <td style={{ padding: "10px 12px", fontVariantNumeric: "tabular-nums", fontWeight: r.viewers ? 700 : 400, color: r.viewers ? "#E8ECF4" : "#4E5E74" }}>
                    {r.viewers ? `${r.viewers}M` : "—"}
                  </td>
                  <td style={{ padding: "10px 12px", fontVariantNumeric: "tabular-nums", color: "#8B97AA" }}>
                    {r.tvRating ? r.tvRating.toFixed(1) : "—"}
                  </td>
                  <td style={{ padding: "10px 12px" }}>
                    {r.streamShare ? (
                      <div className="flex items-center gap-2">
                        <div style={{ width: 40, height: 3, background: "#1A2437", borderRadius: 2, overflow: "hidden" }}>
                          <div style={{ height: "100%", width: `${(r.streamShare / 55) * 100}%`, background: "#00A8FF", borderRadius: 2 }} />
                        </div>
                        <span style={{ color: "#00A8FF", fontWeight: 700, fontVariantNumeric: "tabular-nums", fontSize: 12 }}>{r.streamShare}%</span>
                      </div>
                    ) : <span style={{ color: "#4E5E74" }}>—</span>}
                  </td>
                  <td style={{ padding: "10px 12px" }}>
                    {r.status === "Live" ? (
                      <span style={{ fontSize: 10, padding: "2px 7px", borderRadius: 4, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", background: s.bg, color: s.color, border: `1px solid ${s.border}`, display: "inline-flex", alignItems: "center", gap: 4 }}>
                        <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#00C896", display: "inline-block", animation: "pulse 1.5s ease-in-out infinite" }} />
                        LIVE NOW
                      </span>
                    ) : (
                      <span style={{ fontSize: 10, padding: "2px 7px", borderRadius: 4, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", background: s.bg, color: s.color, border: `1px solid ${s.border}` }}>
                        {r.status}
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }`}</style>
    </div>
  );
}
