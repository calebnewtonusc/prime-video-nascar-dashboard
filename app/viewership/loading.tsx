export default function Loading() {
  return (
    <div className="min-h-screen" style={{ background: "#05080F" }}>
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-5 space-y-5">

        {/* Page title skeleton */}
        <div className="flex items-center gap-3 mb-2">
          <div className="h-6 w-48 rounded animate-skeleton" style={{ background: "#0B1119" }} />
          <div className="h-5 w-16 rounded animate-skeleton" style={{ background: "#0B1119", animationDelay: "80ms" }} />
        </div>

        {/* Filter bar skeleton */}
        <div className="flex gap-3 py-2 border-b" style={{ borderColor: "#12202F" }}>
          {([{ w: 80, id: "f-80" }, { w: 120, id: "f-120" }, { w: 100, id: "f-100" }, { w: 110, id: "f-110" }]).map(({ w, id }, i) => (
            <div key={id} className="h-8 rounded-md animate-skeleton" style={{ width: w, background: "#0B1119", animationDelay: `${i * 60}ms` }} />
          ))}
        </div>

        {/* Key insights skeleton */}
        <div className="h-64 rounded-[10px] animate-skeleton" style={{ background: "#0B1119" }} />

        {/* KPI trend skeleton */}
        <div className="h-72 rounded-[10px] animate-skeleton" style={{ background: "#0B1119", animationDelay: "80ms" }} />

        {/* Viewership chart skeleton */}
        <div className="h-96 rounded-[10px] animate-skeleton" style={{ background: "#0B1119", animationDelay: "120ms" }} />

        {/* Two column row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="h-72 rounded-[10px] animate-skeleton" style={{ background: "#0B1119", animationDelay: "100ms" }} />
          <div className="h-72 rounded-[10px] animate-skeleton" style={{ background: "#0B1119", animationDelay: "160ms" }} />
        </div>

        {/* Race calendar + driver leaderboard */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="h-80 rounded-[10px] animate-skeleton" style={{ background: "#0B1119", animationDelay: "80ms" }} />
          <div className="h-80 rounded-[10px] animate-skeleton" style={{ background: "#0B1119", animationDelay: "140ms" }} />
        </div>
      </div>
    </div>
  );
}
