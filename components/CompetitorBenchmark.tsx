const platforms = [
  { name: "Prime Video",   share: 38, growth:  8, subs: "16.4M", color: "#00A8FF", isPrimary: true  },
  { name: "Peacock",       share: 28, growth: -3, subs: "12.1M", color: "#4E5E74", isPrimary: false },
  { name: "Fox Sports GO", share: 19, growth:  1, subs:  "8.3M", color: "#4E5E74", isPrimary: false },
  { name: "NBC Sports",    share:  9, growth: -4, subs:  "3.9M", color: "#4E5E74", isPrimary: false },
  { name: "Tubi / Other",  share:  6, growth:  2, subs:  "2.6M", color: "#4E5E74", isPrimary: false },
];

export default function CompetitorBenchmark() {
  return (
    <div className="rounded-[10px] overflow-hidden" style={{ background: "#0C1220", border: "1px solid #1A2437" }}>
      <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: "1px solid #1A2437" }}>
        <div>
          <h2 style={{ fontSize: 13, fontWeight: 700, color: "#E8ECF4" }}>Market Share</h2>
          <p style={{ fontSize: 10, color: "#4E5E74", marginTop: 1 }}>NASCAR streaming · Q1 2026</p>
        </div>
        <span style={{ fontSize: 9, fontWeight: 800, padding: "2px 7px", borderRadius: 3, textTransform: "uppercase", letterSpacing: "0.07em", background: "rgba(0,168,255,0.1)", color: "#00A8FF", border: "1px solid rgba(0,168,255,0.2)" }}>
          #1 Streamer
        </span>
      </div>
      <div className="px-4 py-3 space-y-2">
        {platforms.map((p, i) => (
          <div key={p.name} className="flex items-center gap-3">
            <span style={{ fontSize: 10, color: "#4E5E74", width: 12, flexShrink: 0 }}>{i + 1}</span>
            <div style={{ flex: 1 }}>
              <div className="flex items-center justify-between mb-1">
                <span style={{ fontSize: 11, fontWeight: p.isPrimary ? 700 : 500, color: p.isPrimary ? "#E8ECF4" : "#8B97AA" }}>
                  {p.name}
                  {p.isPrimary && <span style={{ marginLeft: 5, fontSize: 8, fontWeight: 800, color: "#00A8FF" }}>YOU</span>}
                </span>
                <div className="flex items-center gap-2">
                  <span style={{ fontSize: 11, fontWeight: 700, color: p.isPrimary ? "#00A8FF" : "#8B97AA", fontVariantNumeric: "tabular-nums" }}>{p.share}%</span>
                  <span style={{ fontSize: 10, fontWeight: 600, color: p.growth > 0 ? "#00C896" : "#FF4F5B", minWidth: 32, textAlign: "right", fontVariantNumeric: "tabular-nums" }}>
                    {p.growth > 0 ? "+" : ""}{p.growth}pp
                  </span>
                </div>
              </div>
              <div style={{ height: 3, background: "#1A2437", borderRadius: 2, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${(p.share / 40) * 100}%`, background: p.isPrimary ? "#00A8FF" : "#243044", borderRadius: 2 }} />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="px-4 pb-3">
        <p style={{ fontSize: 9, color: "#4E5E74" }}>Source: Nielsen Digital · YoY change in pp</p>
      </div>
    </div>
  );
}
