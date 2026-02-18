export default function Loading() {
  return (
    <div className="min-h-screen" style={{ background: "#080C14" }}>
      {/* Header skeleton */}
      <div className="h-[89px] w-full border-b" style={{ background: "#080C14", borderColor: "#1F2937" }}>
        <div className="h-0.5 w-full" style={{ background: "linear-gradient(90deg, #CC0000, #1399FF, #FF9900, #10B981)" }} />
        <div className="max-w-[1600px] mx-auto px-6 flex items-center gap-4 h-16 mt-0">
          <div className="h-9 w-28 rounded animate-pulse" style={{ background: "#1F2937" }} />
          <div className="h-6 w-px" style={{ background: "#374151" }} />
          <div className="h-6 w-64 rounded animate-pulse" style={{ background: "#1F2937" }} />
          <div className="flex-1" />
          <div className="h-7 w-24 rounded-lg animate-pulse" style={{ background: "#1F2937" }} />
          <div className="h-7 w-28 rounded-lg animate-pulse" style={{ background: "#1399FF33" }} />
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 py-6 space-y-6">
        {/* ExecSummary skeleton */}
        <div className="grid grid-cols-3 gap-4">
          {[1,2,3].map(i => <div key={i} className="h-28 rounded-xl animate-pulse" style={{ background: "#111827" }} />)}
        </div>
        {/* KPI Cards skeleton */}
        <div className="grid grid-cols-4 gap-4">
          {[1,2,3,4].map(i => <div key={i} className="h-28 rounded-xl animate-pulse" style={{ background: "#111827" }} />)}
        </div>
        {/* Charts row */}
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 h-80 rounded-xl animate-pulse" style={{ background: "#111827" }} />
          <div className="h-80 rounded-xl animate-pulse" style={{ background: "#111827" }} />
        </div>
        {/* More rows */}
        <div className="grid grid-cols-2 gap-6">
          <div className="h-64 rounded-xl animate-pulse" style={{ background: "#111827" }} />
          <div className="h-64 rounded-xl animate-pulse" style={{ background: "#111827" }} />
        </div>
      </div>
    </div>
  );
}
