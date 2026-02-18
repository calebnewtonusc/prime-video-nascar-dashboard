"use client";
import { useEffect } from "react";
import Link from "next/link";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error("Dashboard error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6" style={{ background: "#080C14" }}>
      <div className="text-center max-w-md">
        <p className="text-[10px] font-black uppercase tracking-widest mb-2" style={{ color: "#EF4444" }}>ERROR · SOMETHING WENT WRONG</p>
        <h2 className="text-2xl font-black text-white mb-2">Data failed to load</h2>
        <p className="text-sm" style={{ color: "#9CA3AF" }}>An error occurred while loading the dashboard. Try again or return to the overview.</p>
      </div>
      <div className="flex items-center gap-3">
        <button onClick={reset} className="px-5 py-2 rounded-lg text-[13px] font-bold text-white" style={{ background: "linear-gradient(135deg, #1399FF, #0D7FCC)" }}>
          Try Again
        </button>
        <Link href="/" className="px-5 py-2 rounded-lg text-[13px] font-semibold" style={{ background: "#1F2937", color: "#9CA3AF" }}>
          Return Home
        </Link>
      </div>
    </div>
  );
}
