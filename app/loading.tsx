export default function Loading() {
  return (
    <div className="min-h-screen" style={{ background: "#05080F" }}>
      {/* Header skeleton */}
      <div className="h-[89px] w-full border-b" style={{ background: "#05080F", borderColor: "#182035" }}>
        <div className="h-0.5 w-full" style={{ background: "linear-gradient(90deg, #00A8E0, #0047AB, #FF9900)" }} />
        <div className="max-w-[1600px] mx-auto px-6 flex items-center gap-4 h-16 mt-0">
          <div className="h-9 w-28 rounded animate-skeleton" style={{ background: "#182035" }} />
          <div className="h-6 w-px" style={{ background: "#243044" }} />
          <div className="h-6 w-64 rounded animate-skeleton" style={{ background: "#182035", animationDelay: "80ms" }} />
          <div className="flex-1" />
          <div className="h-7 w-24 rounded-lg animate-skeleton" style={{ background: "#182035", animationDelay: "160ms" }} />
          <div className="h-7 w-28 rounded-lg animate-skeleton" style={{ background: "rgba(0,168,224,0.15)", animationDelay: "240ms" }} />
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 py-6 space-y-5">
        {/* Stats bar skeleton */}
        <div className="h-24 rounded-[10px] animate-skeleton" style={{ background: "#0B1119" }} />

        {/* KPI Cards skeleton */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {(["kpi-0", "kpi-1", "kpi-2", "kpi-3"] as const).map((id, i) => (
            <div key={id} className="h-32 rounded-[10px] animate-skeleton" style={{ background: "#0B1119", animationDelay: `${i * 60}ms` }} />
          ))}
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 h-80 rounded-[10px] animate-skeleton" style={{ background: "#0B1119", animationDelay: "80ms" }} />
          <div className="h-80 rounded-[10px] animate-skeleton" style={{ background: "#0B1119", animationDelay: "140ms" }} />
        </div>

        {/* More rows */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="h-64 rounded-[10px] animate-skeleton" style={{ background: "#0B1119", animationDelay: "100ms" }} />
          <div className="h-64 rounded-[10px] animate-skeleton" style={{ background: "#0B1119", animationDelay: "160ms" }} />
        </div>
      </div>
    </div>
  );
}
