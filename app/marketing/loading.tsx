export default function Loading() {
  return (
    <div className="min-h-screen" style={{ background: "#080C14" }}>
      <div className="max-w-[1600px] mx-auto px-6 py-6 space-y-6">
        <div className="h-8 w-64 rounded animate-pulse" style={{ background: "#111827" }} />
        <div className="grid grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-20 rounded-xl animate-pulse" style={{ background: "#111827" }} />
          ))}
        </div>
        <div className="h-96 rounded-xl animate-pulse" style={{ background: "#111827" }} />
      </div>
    </div>
  );
}
