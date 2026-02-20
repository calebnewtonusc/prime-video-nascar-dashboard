export default function Loading() {
  return (
    <div className="min-h-screen" style={{ background: "#05080F" }}>
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-6 space-y-6">

        {/* Page title skeleton */}
        <div className="space-y-2">
          <div className="h-7 w-64 rounded animate-skeleton" style={{ background: "#0B1119" }} />
          <div className="h-4 w-48 rounded animate-skeleton" style={{ background: "#0B1119", animationDelay: "60ms" }} />
        </div>

        {/* 4 KPI cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {(["kpi-0", "kpi-1", "kpi-2", "kpi-3"] as const).map((id, i) => (
            <div
              key={id}
              className="h-24 rounded-xl animate-skeleton"
              style={{ background: "#0B1119", animationDelay: `${i * 60}ms` }}
            />
          ))}
        </div>

        {/* Marketing tracker skeleton */}
        <div className="h-56 rounded-xl animate-skeleton" style={{ background: "#0B1119", animationDelay: "80ms" }} />

        {/* Campaign table skeleton */}
        <div className="rounded-xl animate-skeleton" style={{ background: "#0B1119", height: 340, animationDelay: "100ms" }} />

        {/* Charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-72 rounded-xl animate-skeleton" style={{ background: "#0B1119", animationDelay: "60ms" }} />
          <div className="h-72 rounded-xl animate-skeleton" style={{ background: "#0B1119", animationDelay: "120ms" }} />
        </div>

        {/* Recommendations skeleton */}
        <div className="h-48 rounded-xl animate-skeleton" style={{ background: "#0B1119", animationDelay: "140ms" }} />

      </div>
    </div>
  );
}
