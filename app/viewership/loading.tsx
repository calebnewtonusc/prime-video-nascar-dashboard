export default function Loading() {
  return (
    <div className="min-h-screen" style={{ background: "#080C14" }}>
      <div className="max-w-[1600px] mx-auto px-6 py-6 space-y-6">
        {/* 3 skeleton KPI cards */}
        <div className="grid grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-24 rounded-xl animate-pulse"
              style={{ background: "#111827" }}
            />
          ))}
        </div>
        {/* Big chart skeleton */}
        <div
          className="h-80 rounded-xl animate-pulse"
          style={{ background: "#111827" }}
        />
        {/* Two smaller skeletons */}
        <div className="grid grid-cols-2 gap-6">
          <div
            className="h-64 rounded-xl animate-pulse"
            style={{ background: "#111827" }}
          />
          <div
            className="h-64 rounded-xl animate-pulse"
            style={{ background: "#111827" }}
          />
        </div>
      </div>
    </div>
  );
}
