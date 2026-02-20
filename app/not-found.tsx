import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6" style={{ background: "#080C14" }}>
      <div className="text-center">
        <p className="text-[10px] font-black uppercase tracking-widest mb-2" style={{ color: "#6B7280" }}>404 · PAGE NOT FOUND</p>
        <h1 className="text-6xl font-black" style={{ color: "#1F2937" }}>404</h1>
        <p className="text-lg font-semibold mt-2" style={{ color: "#9CA3AF" }}>This section doesn&apos;t exist yet.</p>
      </div>
      <Link href="/" className="flex items-center gap-2 px-5 py-2 rounded-lg text-[13px] font-bold text-white" style={{ background: "linear-gradient(135deg, #3A6FA8, #0D7FCC)" }}>
        ← Back to Dashboard
      </Link>
    </div>
  );
}
