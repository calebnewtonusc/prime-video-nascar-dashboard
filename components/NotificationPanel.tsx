"use client";
import { useState } from "react";
import { Bell, X, TrendingDown, TrendingUp, AlertTriangle, Zap } from "lucide-react";

interface Notification {
  id: string;
  type: "alert" | "insight" | "milestone" | "warning";
  title: string;
  body: string;
  time: string;
  read: boolean;
}

const NOTIFICATIONS: Notification[] = [
  { id: "n1", type: "alert",     title: "Post-Daytona churn spike",  body: "18% of trial subscribers show low engagement signals. Win-back sequence recommended.", time: "2m ago",  read: false },
  { id: "n2", type: "milestone", title: "342K new subscribers",       body: "Daytona 500 drove record subscriber growth — 28.4% above Q1 2025 pace.",              time: "4h ago",  read: false },
  { id: "n3", type: "warning",   title: "Programmatic CPM +22%",      body: "NASCAR Everywhere CPMs rose sharply. Shift $400K to paid social to protect CPA.",     time: "6h ago",  read: false },
  { id: "n4", type: "insight",   title: "Bristol surge forecast",      body: "AI model predicts Bristol dirt race viewership 3.1M — above 2.1M target.",            time: "12h ago", read: true  },
  { id: "n5", type: "insight",   title: "Email ROAS breakout",         body: "Race Day Email hit 11.6x ROAS — recommend +$150K budget increase through Q1.",        time: "1d ago",  read: true  },
];

const TYPE_CONFIG = {
  alert:     { icon: TrendingDown, color: "#FF4F5B", bg: "rgba(255,79,91,0.1)"  },
  insight:   { icon: Zap,          color: "#3A6FA8", bg: "rgba(0,168,255,0.1)"  },
  milestone: { icon: TrendingUp,   color: "#00C896", bg: "rgba(0,200,150,0.1)"  },
  warning:   { icon: AlertTriangle,color: "#9A7030", bg: "rgba(154,112,48,0.1)"  },
};

export default function NotificationPanel() {
  const [open, setOpen] = useState(false);
  const [notes, setNotes] = useState(NOTIFICATIONS);
  const unread = notes.filter((n) => !n.read).length;

  function markAllRead() { setNotes((n) => n.map((x) => ({ ...x, read: true }))); }

  return (
    <>
      {/* Bell button */}
      <button
        onClick={() => setOpen(!open)}
        style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, borderRadius: 6, border: "1px solid #1A2437", background: "#0A0F1E", cursor: "pointer" }}
      >
        <Bell size={13} color="#8B97AA" />
        {unread > 0 && (
          <span style={{ position: "absolute", top: 4, right: 4, width: 7, height: 7, borderRadius: "50%", background: "#FF4F5B", border: "2px solid #060A12" }} />
        )}
      </button>

      {/* Panel */}
      {open && (
        <>
          {/* Backdrop */}
          <div style={{ position: "fixed", inset: 0, zIndex: 1000 }} onClick={() => setOpen(false)} />
          {/* Drawer */}
          <div style={{ position: "fixed", top: 0, right: 0, bottom: 0, width: 360, background: "#0C1220", borderLeft: "1px solid #1A2437", zIndex: 1001, display: "flex", flexDirection: "column", boxShadow: "-8px 0 32px rgba(0,0,0,0.4)" }}>
            <div style={{ padding: "16px 20px", borderBottom: "1px solid #1A2437", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <h2 style={{ fontSize: 14, fontWeight: 700, color: "#E8ECF4" }}>Alerts & Insights</h2>
                <p style={{ fontSize: 11, color: "#4E5E74", marginTop: 2 }}>{unread} unread</p>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                {unread > 0 && (
                  <button onClick={markAllRead} style={{ fontSize: 11, color: "#3A6FA8", background: "none", border: "none", cursor: "pointer" }}>
                    Mark all read
                  </button>
                )}
                <button onClick={() => setOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "#4E5E74" }}>
                  <X size={16} />
                </button>
              </div>
            </div>

            <div style={{ flex: 1, overflowY: "auto" }}>
              {notes.map((n) => {
                const cfg = TYPE_CONFIG[n.type];
                const Icon = cfg.icon;
                return (
                  <div
                    key={n.id}
                    style={{ padding: "14px 20px", borderBottom: "1px solid #1A2437", background: n.read ? "transparent" : "rgba(0,168,255,0.02)", cursor: "pointer" }}
                    onClick={() => setNotes((prev) => prev.map((x) => x.id === n.id ? { ...x, read: true } : x))}
                  >
                    <div style={{ display: "flex", gap: 12 }}>
                      <div style={{ width: 30, height: 30, borderRadius: 6, background: cfg.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <Icon size={13} color={cfg.color} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
                          <p style={{ fontSize: 12, fontWeight: 600, color: "#E8ECF4" }}>{n.title}</p>
                          {!n.read && <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#3A6FA8", flexShrink: 0, marginTop: 3 }} />}
                        </div>
                        <p style={{ fontSize: 11, color: "#8B97AA", lineHeight: 1.5 }}>{n.body}</p>
                        <p style={{ fontSize: 10, color: "#4E5E74", marginTop: 6 }}>{n.time}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{ padding: "12px 20px", borderTop: "1px solid #1A2437" }}>
              <p style={{ fontSize: 10, color: "#2E3F56", textAlign: "center" }}>Powered by Amazon Bedrock AI · Updated every 5 min</p>
            </div>
          </div>
        </>
      )}
    </>
  );
}
