"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { Radio, ChevronDown, LogOut, User, RefreshCw, Menu, X } from "lucide-react";
import NavTabs from "@/components/NavTabs";
import ExportButton from "@/components/ExportButton";
import { useRouter } from "next/navigation";
import NotificationPanel from "@/components/NotificationPanel";

const DATE_RANGES = [
  { label: "Feb–Mar 2026 (Q1)", from: "2026-02-01", to: "2026-03-31" },
  { label: "Feb 2026",           from: "2026-02-01", to: "2026-02-28" },
  { label: "Mar 2026",           from: "2026-03-01", to: "2026-03-31" },
  { label: "Jan–Mar 2026",       from: "2026-01-01", to: "2026-03-31" },
  { label: "YTD 2026",           from: "2026-01-01", to: "2026-12-31" },
];

interface LiveState {
  status: "live" | "idle";
  currentViewersFormatted?: string;
  minutesRemaining?: number;
  leader?: string;
}

export default function Header() {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; email: string; role: string } | null>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showDateMenu, setShowDateMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [selectedRange, setSelectedRange] = useState(DATE_RANGES[0]);
  const [liveState, setLiveState] = useState<LiveState>({ status: "idle" });
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());
  const [refreshAge, setRefreshAge] = useState("just now");
  const eventSourceRef = useRef<EventSource | null>(null);
  const reconnectTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const dateMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("amz_user") : null;
    if (stored) {
      try { setUser(JSON.parse(stored) as { name: string; email: string; role: string }); }
      catch { /* ignore */ }
    }
  }, []);

  // SSE for live race data — auto-reconnects after Vercel 50s timeout
  useEffect(() => {
    let stopped = false;
    function connect() {
      if (stopped) return;
      const es = new EventSource("/api/live");
      eventSourceRef.current = es;
      es.onmessage = (e) => {
        try {
          const data = JSON.parse(e.data as string) as LiveState;
          setLiveState(data);
          setLastRefresh(new Date());
        } catch { /* ignore */ }
      };
      es.onerror = () => {
        es.close();
        if (!stopped) {
          reconnectTimerRef.current = setTimeout(connect, 3_000);
        }
      };
    }
    connect();
    return () => {
      stopped = true;
      eventSourceRef.current?.close();
      if (reconnectTimerRef.current) clearTimeout(reconnectTimerRef.current);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const secs = Math.floor((Date.now() - lastRefresh.getTime()) / 1000);
      if (secs < 10) setRefreshAge("just now");
      else if (secs < 60) setRefreshAge(`${secs}s ago`);
      else setRefreshAge(`${Math.floor(secs / 60)}m ago`);
    }, 5000);
    return () => clearInterval(interval);
  }, [lastRefresh]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) setShowUserMenu(false);
      if (dateMenuRef.current && !dateMenuRef.current.contains(e.target as Node)) setShowDateMenu(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    localStorage.removeItem("amz_user");
    router.push("/login");
    router.refresh();
  }

  function selectRange(range: typeof DATE_RANGES[0]) {
    setSelectedRange(range);
    setShowDateMenu(false);
    setShowMobileMenu(false);
    window.dispatchEvent(new CustomEvent("dateRangeChange", { detail: { from: range.from, to: range.to } }));
  }

  return (
    <header className="sticky top-0 z-50 w-full" style={{ background: "#060A12", borderBottom: "1px solid #1A2437" }}>
      <div style={{ height: 2, background: "linear-gradient(90deg, #00A8FF 0%, #0047AB 100%)" }} />
      <div className="max-w-[1600px] mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between gap-3 md:gap-6" style={{ height: 48 }}>

          {/* Branding */}
          <div className="flex items-center gap-2 md:gap-4 flex-shrink-0 min-w-0">
            <Image
              src="/prime-video-logo.png"
              alt="Prime Video"
              width={110}
              height={40}
              style={{ objectFit: "contain" }}
              className="flex-shrink-0"
            />
            <div className="hidden sm:block" style={{ width: 1, height: 22, background: "#1A2437", flexShrink: 0 }} />
            <div className="hidden sm:flex items-center gap-2 min-w-0">
              <span className="hidden md:block" style={{ fontSize: 13, fontWeight: 700, color: "#E8ECF4", whiteSpace: "nowrap" }}>NASCAR Cup Series Analytics</span>
              <span className="md:hidden" style={{ fontSize: 12, fontWeight: 700, color: "#E8ECF4", whiteSpace: "nowrap" }}>NASCAR Analytics</span>
              <span className="hidden lg:inline" style={{ fontSize: 9, fontWeight: 800, padding: "2px 6px", borderRadius: 3, textTransform: "uppercase", letterSpacing: "0.07em", background: "rgba(255,79,91,0.12)", color: "#FF4F5B", border: "1px solid rgba(255,79,91,0.2)", whiteSpace: "nowrap" }}>
                Confidential
              </span>
            </div>
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-1.5 md:gap-2 flex-shrink-0">

            {/* Live indicator */}
            <div className="flex items-center gap-1.5 px-2 md:px-2.5 py-1 rounded-md"
              style={{ background: "rgba(0,200,150,0.07)", border: "1px solid rgba(0,200,150,0.15)" }}>
              <span className="relative flex h-1.5 w-1.5 flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: "#00C896" }} />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5" style={{ background: "#00C896" }} />
              </span>
              <Radio size={10} style={{ color: "#00C896", flexShrink: 0 }} />
              <span className="hidden sm:inline" style={{ fontSize: 11, fontWeight: 600, color: "#00C896", whiteSpace: "nowrap" }}>
                {liveState.status === "live" && liveState.currentViewersFormatted
                  ? `Live · ${liveState.currentViewersFormatted}`
                  : "Live"}
              </span>
            </div>

            {/* Data freshness - desktop only */}
            <div className="hidden lg:flex items-center gap-1 px-2 rounded" style={{ fontSize: 10, color: "#4E5E74" }}>
              <RefreshCw size={9} />
              {refreshAge}
            </div>

            {/* Date range picker - desktop only */}
            <div className="hidden md:block relative" ref={dateMenuRef}>
              <button
                onClick={() => setShowDateMenu(!showDateMenu)}
                className="flex items-center gap-1 rounded-md"
                style={{ background: "#0A0F1E", border: "1px solid #1A2437", color: "#8B97AA", fontSize: 11, padding: "5px 9px", cursor: "pointer", whiteSpace: "nowrap" }}
              >
                {selectedRange.label} <ChevronDown size={10} />
              </button>
              {showDateMenu && (
                <div style={{ position: "absolute", top: "calc(100% + 6px)", right: 0, background: "#0C1220", border: "1px solid #243044", borderRadius: 8, padding: "4px", zIndex: 100, minWidth: 200 }}>
                  {DATE_RANGES.map((r) => (
                    <button
                      key={r.label}
                      onClick={() => selectRange(r)}
                      style={{
                        display: "block", width: "100%", textAlign: "left", padding: "8px 12px",
                        borderRadius: 5, border: "none", cursor: "pointer", fontSize: 12,
                        background: r.label === selectedRange.label ? "rgba(0,168,255,0.1)" : "transparent",
                        color: r.label === selectedRange.label ? "#00A8FF" : "#8B97AA",
                      }}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <NotificationPanel />

            {/* Export - desktop only */}
            <div className="hidden md:block">
              <ExportButton />
            </div>

            {/* User menu */}
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                style={{ display: "flex", alignItems: "center", gap: 6, padding: "4px 6px md:8px", borderRadius: 6, border: "1px solid #1A2437", background: "#0A0F1E", cursor: "pointer" }}
              >
                <div style={{ width: 22, height: 22, borderRadius: "50%", background: "#0047AB", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <User size={11} color="#00A8FF" />
                </div>
                <span className="hidden md:inline" style={{ fontSize: 11, color: "#8B97AA", maxWidth: 120, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {user?.name ?? "caleb.newton"}
                </span>
                <ChevronDown className="hidden md:inline-block" size={9} color="#4E5E74" />
              </button>

              {showUserMenu && (
                <div style={{ position: "absolute", top: "calc(100% + 6px)", right: 0, background: "#0C1220", border: "1px solid #243044", borderRadius: 8, padding: "4px", zIndex: 100, minWidth: 220 }}>
                  <div style={{ padding: "10px 12px", borderBottom: "1px solid #1A2437", marginBottom: 4 }}>
                    <p style={{ fontSize: 12, fontWeight: 700, color: "#E8ECF4" }}>{user?.name ?? "Caleb Newton"}</p>
                    <p style={{ fontSize: 10, color: "#4E5E74", marginTop: 2 }}>{user?.email ?? "caleb.newton@amazon.com"}</p>
                    <p style={{ fontSize: 10, color: "#4E5E74" }}>{user?.role ?? "PM"} · Prime Video Content</p>
                  </div>
                  {/* Mobile-only: date range picker in user menu */}
                  <div className="md:hidden px-3 py-2" style={{ borderBottom: "1px solid #1A2437" }}>
                    <p style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "#4E5E74", marginBottom: 6 }}>Date Range</p>
                    {DATE_RANGES.map((r) => (
                      <button
                        key={r.label}
                        onClick={() => selectRange(r)}
                        style={{
                          display: "block", width: "100%", textAlign: "left", padding: "6px 8px",
                          borderRadius: 4, border: "none", cursor: "pointer", fontSize: 11, marginBottom: 2,
                          background: r.label === selectedRange.label ? "rgba(0,168,255,0.1)" : "transparent",
                          color: r.label === selectedRange.label ? "#00A8FF" : "#8B97AA",
                        }}
                      >
                        {r.label}
                      </button>
                    ))}
                  </div>
                  {/* Mobile-only: Export button */}
                  <div className="md:hidden px-3 py-2" style={{ borderBottom: "1px solid #1A2437" }}>
                    <ExportButton />
                  </div>
                  <button
                    onClick={handleLogout}
                    style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "8px 12px", borderRadius: 5, border: "none", background: "transparent", cursor: "pointer", color: "#FF4F5B", fontSize: 12 }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "rgba(255,79,91,0.08)")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "transparent")}
                  >
                    <LogOut size={12} />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <NavTabs />
      </div>
    </header>
  );
}
