export default function Loading() {
  return (
    <div className="min-h-screen" style={{ background: "#05080F" }}>
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-6 space-y-6">

        {/* Page title + badge skeleton */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg animate-skeleton" style={{ background: "#0B1119" }} />
              <div className="h-7 w-48 rounded animate-skeleton" style={{ background: "#0B1119", animationDelay: "60ms" }} />
            </div>
            <div className="h-4 w-64 rounded animate-skeleton" style={{ background: "#0B1119", animationDelay: "80ms" }} />
          </div>
          <div className="h-7 w-28 rounded-full animate-skeleton" style={{ background: "#0B1119", animationDelay: "100ms" }} />
        </div>

        {/* Model status strip */}
        <div className="h-14 rounded-[10px] animate-skeleton" style={{ background: "#0B1119", animationDelay: "60ms" }} />

        {/* 4 metric cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {(["metric-0", "metric-1", "metric-2", "metric-3"] as const).map((id, i) => (
            <div
              key={id}
              className="h-24 rounded-xl animate-skeleton"
              style={{ background: "#0B1119", animationDelay: `${i * 60}ms` }}
            />
          ))}
        </div>

        {/* Main chart / insights area */}
        <div className="h-96 rounded-xl animate-skeleton" style={{ background: "#0B1119", animationDelay: "80ms" }} />

        {/* Secondary row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-64 rounded-xl animate-skeleton" style={{ background: "#0B1119", animationDelay: "100ms" }} />
          <div className="h-64 rounded-xl animate-skeleton" style={{ background: "#0B1119", animationDelay: "160ms" }} />
        </div>

        {/* Signals list */}
        <div className="h-48 rounded-xl animate-skeleton" style={{ background: "#0B1119", animationDelay: "120ms" }} />

      </div>
    </div>
  );
}
