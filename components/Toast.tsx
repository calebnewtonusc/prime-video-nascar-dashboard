"use client";
import { createContext, useContext, useState, useCallback, useRef } from "react";
import { CheckCircle, AlertTriangle, Info, X } from "lucide-react";

type ToastType = "success" | "warning" | "info" | "error";
interface Toast { id: string; message: string; type: ToastType; duration?: number; }
interface ToastContextValue { toast: (message: string, type?: ToastType, duration?: number) => void; }

const ToastContext = createContext<ToastContextValue>({ toast: () => {} });
export const useToast = () => useContext(ToastContext);

const ICONS = { success: CheckCircle, warning: AlertTriangle, info: Info, error: AlertTriangle };
const COLORS = {
  success: { bg: "rgba(0,200,150,0.12)", border: "rgba(0,200,150,0.25)", icon: "#00C896", text: "#E8ECF4" },
  warning: { bg: "rgba(255,153,0,0.12)",  border: "rgba(255,153,0,0.25)",  icon: "#FF9900", text: "#E8ECF4" },
  info:    { bg: "rgba(0,168,255,0.12)",  border: "rgba(0,168,255,0.25)",  icon: "#00A8FF", text: "#E8ECF4" },
  error:   { bg: "rgba(255,79,91,0.12)",  border: "rgba(255,79,91,0.25)",  icon: "#FF4F5B", text: "#E8ECF4" },
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const timers = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  const dismiss = useCallback((id: string) => {
    setToasts((t) => t.filter((x) => x.id !== id));
    const t = timers.current.get(id);
    if (t) clearTimeout(t);
    timers.current.delete(id);
  }, []);

  const toast = useCallback((message: string, type: ToastType = "info", duration = 4000) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    setToasts((prev) => [...prev.slice(-4), { id, message, type, duration }]);
    const timer = setTimeout(() => dismiss(id), duration);
    timers.current.set(id, timer);
  }, [dismiss]);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      {/* Toast container — fixed bottom-right */}
      <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 9999, display: "flex", flexDirection: "column", gap: 8, pointerEvents: "none" }}>
        {toasts.map((t) => {
          const c = COLORS[t.type];
          const Icon = ICONS[t.type];
          return (
            <div
              key={t.id}
              style={{
                display: "flex", alignItems: "center", gap: 10, padding: "10px 14px",
                background: "#0C1220", border: `1px solid ${c.border}`,
                borderLeft: `3px solid ${c.icon}`, borderRadius: 8,
                fontSize: 12, color: c.text, pointerEvents: "auto",
                minWidth: 260, maxWidth: 380,
                boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
                animation: "slideIn 0.2s ease",
              }}
            >
              <Icon size={14} color={c.icon} style={{ flexShrink: 0 }} />
              <span style={{ flex: 1 }}>{t.message}</span>
              <button
                onClick={() => dismiss(t.id)}
                style={{ background: "none", border: "none", cursor: "pointer", padding: 2, color: "#4E5E74", display: "flex", alignItems: "center" }}
              >
                <X size={12} />
              </button>
            </div>
          );
        })}
      </div>
      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(20px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </ToastContext.Provider>
  );
}
