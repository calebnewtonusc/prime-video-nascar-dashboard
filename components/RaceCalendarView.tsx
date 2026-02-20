"use client";
import { useState, useEffect } from "react";
import { Calendar, TrendingUp, Clock, Users, Zap, ChevronDown, ChevronUp } from "lucide-react";

interface Race {
  id: string;
  name: string;
  shortName: string;
  track: string;
  date: string;
  dateObj: Date;
  viewers: number | null;
  tvRating: number | null;
  streamShare: number | null;
  status: "completed" | "upcoming" | "live";
  winner: string | null;
  predictedViewers: number;
  predictedSubs: number;
  confidence: number;
  insight: string;
  accentColor: string;
}

const RACES: Race[] = [
  {
    id: "daytona",
    name: "Daytona 500",
    shortName: "Daytona",
    track: "Daytona Int'l",
    date: "Feb 16, 2026",
    dateObj: new Date("2026-02-16"),
    viewers: 8.2,
    tvRating: 4.1,
    streamShare: 38,
    status: "completed",
    winner: "Chase Elliott",
    predictedViewers: 7.5,
    predictedSubs: 310,
    confidence: 94,
    insight: "Beat viewership target by 9.3% — Daytona 500 halo effect drove 342K new subs.",
    accentColor: "#FF9900",
  },
  {
    id: "lasvegas",
    name: "Pennzoil 400",
    shortName: "Las Vegas",
    track: "Las Vegas Motor Speedway",
    date: "Feb 23, 2026",
    dateObj: new Date("2026-02-23"),
    viewers: 2.1,
    tvRating: 0.9,
    streamShare: 41,
    status: "completed",
    winner: "Kyle Larson",
    predictedViewers: 2.0,
    predictedSubs: 74,
    confidence: 88,
    insight: "Exceeded predicted 2.0M. Post-Daytona subscriber retention held at 94%.",
    accentColor: "#00A8E0",
  },
  {
    id: "atlanta",
    name: "Ambetter Health 400",
    shortName: "Atlanta",
    track: "Atlanta Motor Speedway",
    date: "Mar 1, 2026",
    dateObj: new Date("2026-03-01"),
    viewers: 2.4,
    tvRating: 1.1,
    streamShare: 43,
    status: "completed",
    winner: "William Byron",
    predictedViewers: 2.2,
    predictedSubs: 88,
    confidence: 85,
    insight: "Superspeedway pack racing format drove 9% viewership lift above projection.",
    accentColor: "#00A8E0",
  },
  {
    id: "phoenix",
    name: "United Rentals 500",
    shortName: "Phoenix",
    track: "Phoenix Raceway",
    date: "Mar 8, 2026",
    dateObj: new Date("2026-03-08"),
    viewers: null,
    tvRating: null,
    streamShare: null,
    status: "upcoming",
    winner: null,
    predictedViewers: 1.9,
    predictedSubs: 62,
    confidence: 82,
    insight: "Short track format historically underperforms vs avg — targeted ads recommended for Phoenix market.",
    accentColor: "#7C6FFF",
  },
  {
    id: "cota",
    name: "EchoPark Grand Prix",
    shortName: "COTA",
    track: "Circuit of the Americas",
    date: "Mar 22, 2026",
    dateObj: new Date("2026-03-22"),
    viewers: null,
    tvRating: null,
    streamShare: null,
    status: "upcoming",
    winner: null,
    predictedViewers: 2.6,
    predictedSubs: 96,
    confidence: 74,
    insight: "Road course format + Austin market = +34% intl viewership share. Spanish-language creative ready.",
    accentColor: "#00C896",
  },
  {
    id: "bristol",
    name: "Food City 500",
    shortName: "Bristol",
    track: "Bristol Motor Speedway",
    date: "Mar 30, 2026",
    dateObj: new Date("2026-03-30"),
    viewers: null,
    tvRating: null,
    streamShare: null,
    status: "upcoming",
    winner: null,
    predictedViewers: 3.1,
    predictedSubs: 118,
    confidence: 87,
    insight: "Bristol Dirt predicted to be Q1's 2nd biggest race. Model confidence 87% — increase ad inventory 15%.",
    accentColor: "#FF9900",
  },
];

const STATUS_STYLE: Record<string, { bg: string; color: string; border: string; label: string }> = {
  completed: { bg: "rgba(0,168,224,0.08)", color: "#00A8E0", border: "rgba(0,168,224,0.2)", label: "Completed" },
  upcoming: { bg: "rgba(245,158,11,0.08)", color: "#F59E0B", border: "rgba(245,158,11,0.2)", label: "Upcoming" },
  live: { bg: "rgba(0,200,150,0.08)", color: "#00C896", border: "rgba(0,200,150,0.2)", label: "Live" },
};

function useCountdown(target: Date) {
  const [text, setText] = useState("");
  useEffect(() => {
    function update() {
      const diff = target.getTime() - Date.now();
      if (diff <= 0) { setText("LIVE"); return; }
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setText(`${d}d ${String(h).padStart(2, "0")}h ${String(m).padStart(2, "0")}m ${String(s).padStart(2, "0")}s`);
    }
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [target]);
  return text;
}

function NextRaceCountdown({ race }: { race: Race }) {
  const countdown = useCountdown(race.dateObj);
  return (
    <div style={{
      padding: "12px 16px", borderRadius: 8, marginBottom: 16,
      background: "rgba(0,168,224,0.05)", border: "1px solid rgba(0,168,224,0.15)",
      display: "flex", alignItems: "center", gap: 10,
    }}>
      <Clock size={12} style={{ color: "#00A8E0", flexShrink: 0 }} />
      <div>
        <p style={{ fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#4E5E74", marginBottom: 3 }}>
          Next Race: {race.name}
        </p>
        <p style={{ fontSize: 16, fontWeight: 900, color: "#00A8E0", fontVariantNumeric: "tabular-nums", letterSpacing: "-0.02em" }}>
          {countdown}
        </p>
      </div>
      <div style={{ marginLeft: "auto", textAlign: "right" }}>
        <p style={{ fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "#4E5E74", marginBottom: 2 }}>AI Prediction</p>
        <p style={{ fontSize: 14, fontWeight: 800, color: "#F59E0B", fontVariantNumeric: "tabular-nums" }}>
          {race.predictedViewers}M viewers
        </p>
        <p style={{ fontSize: 9, color: "#2E4560" }}>{race.confidence}% confidence</p>
      </div>
    </div>
  );
}

function RaceCard({ race, isExpanded, onToggle }: { race: Race; isExpanded: boolean; onToggle: () => void }) {
  const s = STATUS_STYLE[race.status];
  const viewersBeat = race.viewers !== null && race.viewers >= race.predictedViewers;

  return (
    <div
      style={{
        background: isExpanded ? "#0A1525" : "transparent",
        borderRadius: 8,
        border: isExpanded ? "1px solid #1A2437" : "1px solid transparent",
        overflow: "hidden",
        transition: "background 0.2s, border-color 0.2s",
        marginBottom: 2,
      }}
    >
      {/* Row */}
      <button
        onClick={onToggle}
        style={{
          width: "100%", background: "none", border: "none", cursor: "pointer",
          display: "grid", gridTemplateColumns: "28px 1fr auto auto auto auto",
          alignItems: "center", gap: 10, padding: "10px 12px", textAlign: "left",
        }}
      >
        {/* Race number */}
        <div style={{
          width: 24, height: 24, borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center",
          background: race.status === "completed" ? race.accentColor + "22" : "#0F1D30",
          border: `1px solid ${race.status === "completed" ? race.accentColor + "44" : "#1A2437"}`,
          flexShrink: 0,
        }}>
          <span style={{ fontSize: 10, fontWeight: 800, color: race.status === "completed" ? race.accentColor : "#4E5E74" }}>
            {RACES.indexOf(race) + 1}
          </span>
        </div>

        {/* Name + track */}
        <div style={{ minWidth: 0 }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: "#E8ECF4", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {race.name}
          </p>
          <p style={{ fontSize: 10, color: "#4E5E74", marginTop: 1 }}>{race.track} · {race.date}</p>
        </div>

        {/* Viewers actual or predicted */}
        <div style={{ textAlign: "right", minWidth: 52 }}>
          {race.viewers !== null ? (
            <>
              <p style={{ fontSize: 13, fontWeight: 800, color: "#E8ECF4", fontVariantNumeric: "tabular-nums" }}>{race.viewers}M</p>
              <p style={{ fontSize: 9, color: viewersBeat ? "#00C896" : "#FF4F5B", fontWeight: 700 }}>
                {viewersBeat ? "Beat" : "Missed"}
              </p>
            </>
          ) : (
            <>
              <p style={{ fontSize: 13, fontWeight: 800, color: "#F59E0B", fontVariantNumeric: "tabular-nums" }}>~{race.predictedViewers}M</p>
              <p style={{ fontSize: 9, color: "#4E5E74" }}>projected</p>
            </>
          )}
        </div>

        {/* Stream share */}
        <div style={{ textAlign: "right", minWidth: 44 }}>
          {race.streamShare !== null ? (
            <>
              <p style={{ fontSize: 12, fontWeight: 700, color: "#00A8E0", fontVariantNumeric: "tabular-nums" }}>{race.streamShare}%</p>
              <p style={{ fontSize: 9, color: "#4E5E74" }}>stream</p>
            </>
          ) : (
            <p style={{ fontSize: 11, color: "#2E4560" }}>—</p>
          )}
        </div>

        {/* Status badge */}
        <span style={{
          fontSize: 9, padding: "2px 7px", borderRadius: 4, fontWeight: 700,
          textTransform: "uppercase", letterSpacing: "0.05em",
          background: s.bg, color: s.color, border: `1px solid ${s.border}`,
          flexShrink: 0, whiteSpace: "nowrap",
        }}>
          {s.label}
        </span>

        {/* Expand */}
        <div style={{ color: "#4E5E74", flexShrink: 0 }}>
          {isExpanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
        </div>
      </button>

      {/* Expanded detail */}
      {isExpanded && (
        <div style={{ padding: "12px 12px 14px", borderTop: "1px solid #1A2437", animation: "fadeIn 0.2s ease" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 8, marginBottom: 12 }}>
            {race.winner && (
              <div style={{ padding: "8px 10px", borderRadius: 6, background: "#060A12" }}>
                <p style={{ fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#4E5E74", marginBottom: 3 }}>Winner</p>
                <p style={{ fontSize: 12, fontWeight: 700, color: "#E8ECF4" }}>{race.winner}</p>
              </div>
            )}
            {race.tvRating && (
              <div style={{ padding: "8px 10px", borderRadius: 6, background: "#060A12" }}>
                <p style={{ fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#4E5E74", marginBottom: 3 }}>TV Rating</p>
                <p style={{ fontSize: 12, fontWeight: 700, color: "#E8ECF4" }}>{race.tvRating.toFixed(1)}</p>
              </div>
            )}
            <div style={{ padding: "8px 10px", borderRadius: 6, background: "#060A12" }}>
              <p style={{ fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#4E5E74", marginBottom: 3 }}>
                {race.viewers !== null ? "Actual" : "Predicted"} Viewers
              </p>
              <p style={{ fontSize: 12, fontWeight: 700, color: race.viewers !== null ? "#E8ECF4" : "#F59E0B" }}>
                {race.viewers !== null ? `${race.viewers}M` : `${race.predictedViewers}M`}
              </p>
            </div>
            <div style={{ padding: "8px 10px", borderRadius: 6, background: "#060A12" }}>
              <p style={{ fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#4E5E74", marginBottom: 3 }}>New Subs</p>
              <p style={{ fontSize: 12, fontWeight: 700, color: "#00A8E0" }}>
                {race.viewers !== null ? `${race.predictedSubs}K` : `~${race.predictedSubs}K`}
              </p>
            </div>
            <div style={{ padding: "8px 10px", borderRadius: 6, background: "#060A12" }}>
              <p style={{ fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#4E5E74", marginBottom: 3 }}>AI Confidence</p>
              <p style={{ fontSize: 12, fontWeight: 700, color: race.confidence >= 85 ? "#00C896" : race.confidence >= 75 ? "#F59E0B" : "#FF4F5B" }}>
                {race.confidence}%
              </p>
            </div>
          </div>

          {/* AI Insight */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: 8, padding: "8px 10px", borderRadius: 6, background: "rgba(0,168,224,0.04)", border: "1px solid rgba(0,168,224,0.1)" }}>
            <Zap size={10} style={{ color: "#00A8E0", marginTop: 2, flexShrink: 0 }} />
            <p style={{ fontSize: 11, color: "#8B97AA", lineHeight: 1.6 }}>{race.insight}</p>
          </div>

          {/* Predicted vs target bar */}
          {race.viewers !== null && (
            <div style={{ marginTop: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                <span style={{ fontSize: 9, fontWeight: 700, color: "#4E5E74", textTransform: "uppercase", letterSpacing: "0.07em" }}>Actual vs Predicted</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: viewersBeat ? "#00C896" : "#FF4F5B" }}>
                  {viewersBeat ? "+" : ""}{((race.viewers - race.predictedViewers) / race.predictedViewers * 100).toFixed(1)}%
                </span>
              </div>
              <div style={{ height: 6, borderRadius: 3, background: "#1A2437", overflow: "hidden", position: "relative" }}>
                <div style={{ position: "absolute", inset: 0 }}>
                  <div style={{
                    height: "100%",
                    width: `${Math.min((race.viewers / Math.max(race.viewers, race.predictedViewers)) * 100, 100)}%`,
                    background: viewersBeat ? "#00C896" : "#FF4F5B",
                    borderRadius: 3, transition: "width 0.8s ease",
                  }} />
                </div>
                <div style={{
                  position: "absolute",
                  left: `${Math.min((race.predictedViewers / Math.max(race.viewers, race.predictedViewers)) * 100, 100)}%`,
                  top: 0, bottom: 0, width: 1, background: "#F59E0B",
                }} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 3 }}>
                <span style={{ fontSize: 9, color: "#4E5E74" }}>0</span>
                <span style={{ fontSize: 9, color: "#F59E0B" }}>Target: {race.predictedViewers}M</span>
                <span style={{ fontSize: 9, color: "#4E5E74" }}>10M</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function RaceCalendarView() {
  const nextRace = RACES.find(r => r.status === "upcoming");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const completed = RACES.filter(r => r.status === "completed");
  const upcoming = RACES.filter(r => r.status === "upcoming");
  const avgStreamShare = Math.round(RACES.filter(r => r.streamShare).reduce((s, r) => s + (r.streamShare ?? 0), 0) / RACES.filter(r => r.streamShare).length);

  return (
    <div className="card-hover rounded-[10px] overflow-hidden h-full" style={{ background: "#0C1220", border: "1px solid #1A2437" }}>
      {/* Header */}
      <div style={{ padding: "16px 20px", borderBottom: "1px solid #1A2437" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Calendar size={14} style={{ color: "#00A8E0" }} />
            <h2 style={{ fontSize: 15, fontWeight: 700, color: "#E8ECF4" }}>Q1 Race Calendar</h2>
            <span style={{ fontSize: 9, fontWeight: 800, padding: "2px 6px", borderRadius: 3, background: "rgba(0,168,224,0.1)", color: "#00A8E0", border: "1px solid rgba(0,168,224,0.2)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
              AI Predictions
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ textAlign: "right" }}>
              <p style={{ fontSize: 9, color: "#4E5E74", textTransform: "uppercase", letterSpacing: "0.07em" }}>Completed</p>
              <p style={{ fontSize: 14, fontWeight: 800, color: "#00C896", fontVariantNumeric: "tabular-nums" }}>{completed.length}/{RACES.length}</p>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ fontSize: 9, color: "#4E5E74", textTransform: "uppercase", letterSpacing: "0.07em" }}>Avg Stream</p>
              <p style={{ fontSize: 14, fontWeight: 800, color: "#00A8E0", fontVariantNumeric: "tabular-nums" }}>{avgStreamShare}%</p>
            </div>
          </div>
        </div>
        <p style={{ fontSize: 11, color: "#4E5E74" }}>6 races · Feb–Mar 2026 · Click any race for prediction overlay</p>
      </div>

      <div style={{ padding: "14px 16px" }}>
        {/* Countdown to next race */}
        {nextRace && <NextRaceCountdown race={nextRace} />}

        {/* Progress track */}
        <div style={{ display: "flex", alignItems: "center", gap: 3, marginBottom: 14 }}>
          {RACES.map((r, i) => (
            <div key={r.id} style={{ flex: 1, position: "relative" }}>
              <div style={{
                height: 4, borderRadius: 2,
                background: r.status === "completed" ? r.accentColor : "#1A2437",
                transition: "background 0.3s",
              }} />
              {i < RACES.length - 1 && (
                <div style={{ position: "absolute", right: -2, top: -3, width: 10, height: 10, borderRadius: "50%", background: r.status === "completed" ? r.accentColor : "#1A2437", border: "2px solid #0C1220", zIndex: 1 }} />
              )}
            </div>
          ))}
        </div>

        {/* Race list */}
        <div>
          {RACES.map(race => (
            <RaceCard
              key={race.id}
              race={race}
              isExpanded={expandedId === race.id}
              onToggle={() => setExpandedId(expandedId === race.id ? null : race.id)}
            />
          ))}
        </div>

        {/* Upcoming totals */}
        <div style={{ marginTop: 12, padding: "10px 12px", borderRadius: 8, background: "rgba(245,158,11,0.05)", border: "1px solid rgba(245,158,11,0.15)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
            <TrendingUp size={10} style={{ color: "#F59E0B" }} />
            <span style={{ fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#F59E0B" }}>
              Remaining Q1 Forecast
            </span>
          </div>
          <div style={{ display: "flex", gap: 16 }}>
            <div>
              <p style={{ fontSize: 10, color: "#4E5E74", marginBottom: 1 }}>Projected Viewers</p>
              <p style={{ fontSize: 16, fontWeight: 800, color: "#F59E0B", fontVariantNumeric: "tabular-nums" }}>
                {upcoming.reduce((s, r) => s + r.predictedViewers, 0).toFixed(1)}M
              </p>
            </div>
            <div>
              <p style={{ fontSize: 10, color: "#4E5E74", marginBottom: 1 }}>Projected New Subs</p>
              <p style={{ fontSize: 16, fontWeight: 800, color: "#00A8E0", fontVariantNumeric: "tabular-nums" }}>
                ~{upcoming.reduce((s, r) => s + r.predictedSubs, 0)}K
              </p>
            </div>
            <div>
              <p style={{ fontSize: 10, color: "#4E5E74", marginBottom: 1 }}>Races Remaining</p>
              <p style={{ fontSize: 16, fontWeight: 800, color: "#8B97AA", fontVariantNumeric: "tabular-nums" }}>
                {upcoming.length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
