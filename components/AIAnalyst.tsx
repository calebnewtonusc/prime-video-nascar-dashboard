"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  Send,
  RefreshCw,
  Bot,
  User,
  AlertCircle,
  Loader2,
  Terminal,
  ChevronRight,
  Sparkles,
  StopCircle,
} from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────────────────

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  streaming?: boolean;
}

interface HealthState {
  status: "checking" | "ok" | "error";
}

// ── Suggested prompts ─────────────────────────────────────────────────────────

const PROMPTS = [
  { label: "Q1 growth drivers",        text: "What were the main drivers of Q1 2026 viewership growth?" },
  { label: "Best campaign ROI",         text: "Which marketing campaign had the best return on investment and why?" },
  { label: "Top Q2 priorities",         text: "What are the top 3 strategic priorities for Q2 2026 with expected impact?" },
  { label: "Churn risk briefing",       text: "Summarize the subscriber churn risk and the recommended interventions." },
  { label: "International expansion",   text: "Explain the UK & Brazil expansion opportunity with ROI projections." },
  { label: "Executive summary",         text: "Generate a concise executive summary of Q1 2026 NASCAR performance for Amazon leadership." },
];

// ── Markdown components (stable reference) ────────────────────────────────────

const MD_COMPONENTS = {
  p: ({ children }: { children?: React.ReactNode }) => <p style={{ margin: "0 0 8px", lineHeight: 1.75 }}>{children}</p>,
  strong: ({ children }: { children?: React.ReactNode }) => <strong style={{ color: "#E8ECF4", fontWeight: 700 }}>{children}</strong>,
  ul: ({ children }: { children?: React.ReactNode }) => <ul style={{ margin: "6px 0", paddingLeft: 18, listStyleType: "disc" }}>{children}</ul>,
  ol: ({ children }: { children?: React.ReactNode }) => <ol style={{ margin: "6px 0", paddingLeft: 18 }}>{children}</ol>,
  li: ({ children }: { children?: React.ReactNode }) => <li style={{ margin: "3px 0" }}>{children}</li>,
  table: ({ children }: { children?: React.ReactNode }) => (
    <div style={{ overflowX: "auto", margin: "8px 0" }}>
      <table style={{ borderCollapse: "collapse", width: "100%", fontSize: 11 }}>{children}</table>
    </div>
  ),
  th: ({ children }: { children?: React.ReactNode }) => (
    <th style={{ padding: "5px 10px", borderBottom: "1px solid #2A3A52", color: "#8B97AA", fontWeight: 700, textAlign: "left", whiteSpace: "nowrap" }}>{children}</th>
  ),
  td: ({ children }: { children?: React.ReactNode }) => (
    <td style={{ padding: "5px 10px", borderBottom: "1px solid #1A2437", color: "#C8D4E0" }}>{children}</td>
  ),
  code: ({ children, className }: { children?: React.ReactNode; className?: string }) => {
    const isBlock = className?.startsWith("language-");
    return isBlock ? (
      <pre style={{ background: "#060A12", border: "1px solid #1A2437", borderRadius: 6, padding: "10px 12px", overflowX: "auto", margin: "8px 0" }}>
        <code style={{ fontSize: 11, color: "#00C896", fontFamily: "monospace" }}>{children}</code>
      </pre>
    ) : (
      <code style={{ background: "#060A12", padding: "1px 5px", borderRadius: 3, fontSize: 11, color: "#3A6FA8", fontFamily: "monospace" }}>{children}</code>
    );
  },
  h1: ({ children }: { children?: React.ReactNode }) => <h1 style={{ fontSize: 15, fontWeight: 800, color: "#E8ECF4", margin: "12px 0 6px" }}>{children}</h1>,
  h2: ({ children }: { children?: React.ReactNode }) => <h2 style={{ fontSize: 13, fontWeight: 700, color: "#E8ECF4", margin: "10px 0 5px" }}>{children}</h2>,
  h3: ({ children }: { children?: React.ReactNode }) => <h3 style={{ fontSize: 12, fontWeight: 700, color: "#E8ECF4", margin: "8px 0 4px" }}>{children}</h3>,
  blockquote: ({ children }: { children?: React.ReactNode }) => (
    <blockquote style={{ borderLeft: "2px solid #3A6FA8", paddingLeft: 10, margin: "8px 0", color: "#8B97AA" }}>{children}</blockquote>
  ),
};

// ── AIAnalystHeader ────────────────────────────────────────────────────────────

function AIAnalystHeader({
  health,
  hasMessages,
  isLoading,
  onClearChat,
  onCheckHealth,
}: {
  health: HealthState;
  hasMessages: boolean;
  isLoading: boolean;
  onClearChat: () => void;
  onCheckHealth: () => void;
}) {
  return (
    <div style={{ background: "#060A12", borderBottom: "1px solid #1A2437", padding: "10px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ width: 30, height: 30, borderRadius: 8, background: "rgba(0,168,255,0.08)", border: "1px solid rgba(0,168,255,0.18)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Sparkles size={14} style={{ color: "#3A6FA8" }} />
        </div>
        <div>
          <span style={{ fontSize: 13, fontWeight: 800, color: "#E8ECF4" }}>AI Analyst</span>
          <span style={{ fontSize: 10, color: "#4E5E74", marginLeft: 6 }}>Claude AI</span>
        </div>
        {health.status === "checking" && (
          <span style={{ fontSize: 10, color: "#4E5E74", display: "flex", alignItems: "center", gap: 4, marginLeft: 4 }}>
            <Loader2 size={10} className="animate-spin" /> Connecting…
          </span>
        )}
        {health.status === "ok" && (
          <span style={{ fontSize: 9, fontWeight: 800, padding: "2px 8px", borderRadius: 4, background: "rgba(0,200,150,0.1)", color: "#00C896", border: "1px solid rgba(0,200,150,0.2)", textTransform: "uppercase", letterSpacing: "0.07em", marginLeft: 4 }}>
            ● claude-sonnet-4-6
          </span>
        )}
        {health.status === "error" && (
          <span style={{ fontSize: 9, fontWeight: 800, padding: "2px 8px", borderRadius: 4, background: "rgba(255,79,91,0.08)", color: "#FF4F5B", border: "1px solid rgba(255,79,91,0.18)", textTransform: "uppercase", letterSpacing: "0.07em", marginLeft: 4 }}>
            ● Not connected
          </span>
        )}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {hasMessages && !isLoading && (
          <button onClick={onClearChat} style={{ fontSize: 10, color: "#4E5E74", background: "transparent", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 3, padding: "4px 8px", borderRadius: 5 }}>
            <RefreshCw size={10} /> New chat
          </button>
        )}
        <button onClick={onCheckHealth} title="Retry connection" style={{ color: "#4E5E74", background: "transparent", border: "none", cursor: "pointer", display: "flex", alignItems: "center", padding: 4, borderRadius: 5 }}>
          <RefreshCw size={12} />
        </button>
      </div>
    </div>
  );
}

// ── SetupGuide ─────────────────────────────────────────────────────────────────

function SetupGuide({ onRetry }: { onRetry: () => void }) {
  return (
    <div style={{ padding: "20px 20px 16px", display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 10, background: "rgba(255,79,91,0.04)", border: "1px solid rgba(255,79,91,0.14)", borderRadius: 8, padding: "12px 14px" }}>
        <AlertCircle size={14} style={{ color: "#FF4F5B", flexShrink: 0, marginTop: 1 }} />
        <div>
          <p style={{ fontSize: 12, fontWeight: 700, color: "#E8ECF4", marginBottom: 4 }}>Anthropic API key not configured</p>
          <p style={{ fontSize: 11, color: "#8B97AA", lineHeight: 1.65 }}>
            Add your{" "}
            <code style={{ fontSize: 10, background: "#060A12", padding: "1px 5px", borderRadius: 3, color: "#3A6FA8", fontFamily: "monospace" }}>ANTHROPIC_API_KEY</code>
            {" "}environment variable to enable real-time AI analysis.
          </p>
        </div>
      </div>
      <div style={{ background: "#060A12", border: "1px solid #1A2437", borderRadius: 8, padding: "12px 16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
          <Terminal size={11} style={{ color: "#4E5E74" }} />
          <span style={{ fontSize: 9, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: "#4E5E74" }}>Setup</span>
        </div>
        {[
          { step: "1. Get your API key at", cmd: "console.anthropic.com" },
          { step: "2. Add to Vercel: ANTHROPIC_API_KEY=<your_key>", cmd: "" },
        ].map(({ step, cmd }) => (
          <div key={step} style={{ marginBottom: 8 }}>
            <span style={{ fontSize: 10, color: "#4E5E74" }}>{step}</span>
            <code style={{ display: "block", fontSize: 11, color: "#00C896", fontFamily: "monospace", marginTop: 3, lineHeight: 1.5 }}>{cmd}</code>
          </div>
        ))}
        <p style={{ fontSize: 10, color: "#2E3F56", marginTop: 6 }}>Model: claude-sonnet-4-6</p>
      </div>
      <button onClick={onRetry} style={{ alignSelf: "flex-start", fontSize: 11, fontWeight: 700, color: "#3A6FA8", background: "rgba(0,168,255,0.08)", border: "1px solid rgba(0,168,255,0.2)", borderRadius: 6, padding: "6px 14px", cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
        <RefreshCw size={11} /> Retry connection
      </button>
    </div>
  );
}

// ── EmptyState ─────────────────────────────────────────────────────────────────

function EmptyState({ healthOk, onPrompt }: { healthOk: boolean; onPrompt: (text: string) => void }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flex: 1, gap: 14, paddingTop: 28, paddingBottom: 16 }}>
      <div style={{ width: 52, height: 52, borderRadius: 14, background: "rgba(0,168,255,0.07)", border: "1px solid rgba(0,168,255,0.14)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Bot size={24} style={{ color: "#3A6FA8" }} />
      </div>
      <div style={{ textAlign: "center" }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: "#E8ECF4", marginBottom: 4 }}>Ask me about the Q1 2026 data</p>
        <p style={{ fontSize: 11, color: "#4E5E74" }}>Viewership · Revenue · Campaigns · Churn · Strategy</p>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center", maxWidth: 560 }}>
        {PROMPTS.map((p) => (
          <button key={p.label} onClick={() => onPrompt(p.text)} disabled={!healthOk} style={{ fontSize: 11, fontWeight: 600, padding: "5px 12px", borderRadius: 20, background: "rgba(0,168,255,0.05)", border: "1px solid rgba(0,168,255,0.14)", color: "#8B97AA", cursor: "pointer", display: "flex", alignItems: "center", gap: 5, transition: "background 0.15s, border-color 0.15s, color 0.15s, opacity 0.15s" }}>
            <ChevronRight size={10} style={{ color: "#3A6FA8", flexShrink: 0 }} />
            {p.label}
          </button>
        ))}
      </div>
    </div>
  );
}

// ── ChatBubble ─────────────────────────────────────────────────────────────────

function ChatBubble({ m }: { m: ChatMessage }) {
  const isUser = m.role === "user";
  return (
    <div style={{ display: "flex", gap: 9, alignItems: "flex-start", flexDirection: isUser ? "row-reverse" : "row" }}>
      <div style={{ flexShrink: 0, width: 26, height: 26, borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center", background: isUser ? "rgba(0,168,255,0.1)" : "rgba(0,200,150,0.08)", border: isUser ? "1px solid rgba(0,168,255,0.2)" : "1px solid rgba(0,200,150,0.16)" }}>
        {isUser ? <User size={12} style={{ color: "#3A6FA8" }} /> : <Bot size={12} style={{ color: "#00C896" }} />}
      </div>
      <div style={{ maxWidth: "84%", padding: "10px 14px", borderRadius: isUser ? "12px 4px 12px 12px" : "4px 12px 12px 12px", background: isUser ? "rgba(0,168,255,0.07)" : "rgba(255,255,255,0.02)", border: isUser ? "1px solid rgba(0,168,255,0.12)" : "1px solid #1A2437", fontSize: 12, color: "#C8D4E0", lineHeight: 1.75, wordBreak: "break-word" }}>
        {!m.content && m.streaming && (
          <span style={{ display: "inline-flex", gap: 3, alignItems: "center", padding: "2px 0" }}>
            {([0, 180, 360] as const).map((delay) => (
              <span key={`dot-${delay}`} className="animate-pulse" style={{ width: 5, height: 5, borderRadius: "50%", background: "#00C896", animationDelay: `${delay}ms` }} />
            ))}
          </span>
        )}
        {m.content && isUser && <span style={{ whiteSpace: "pre-wrap" }}>{m.content}</span>}
        {m.content && !isUser && (
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={MD_COMPONENTS}>{m.content}</ReactMarkdown>
        )}
        {m.content && m.streaming && (
          <span className="ai-cursor" style={{ display: "inline-block", width: 2, height: 13, background: "#00C896", marginLeft: 2, verticalAlign: "text-bottom" }} />
        )}
      </div>
    </div>
  );
}

// ── ChatInputBar ───────────────────────────────────────────────────────────────

function ChatInputBar({
  input,
  health,
  isLoading,
  inputRef,
  onInput,
  onSubmit,
  onStop,
}: {
  input: string;
  health: HealthState;
  isLoading: boolean;
  inputRef: React.RefObject<HTMLTextAreaElement>;
  onInput: (v: string) => void;
  onSubmit: () => void;
  onStop: () => void;
}) {
  return (
    <div style={{ borderTop: "1px solid #1A2437", padding: "10px 14px", display: "flex", gap: 8, alignItems: "flex-end", background: "#060A12", flexShrink: 0 }}>
      <textarea
        ref={inputRef}
        value={input}
        rows={1}
        onChange={(e) => {
          onInput(e.target.value);
          e.target.style.height = "auto";
          e.target.style.height = Math.min(e.target.scrollHeight, 100) + "px";
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); onSubmit(); }
        }}
        placeholder={health.status === "checking" ? "Connecting to Claude AI…" : "Ask about the data… (Enter to send, Shift+Enter for new line)"}
        disabled={health.status !== "ok" || isLoading}
        style={{ flex: 1, background: "#0C1220", border: "1px solid #1A2437", borderRadius: 8, padding: "8px 12px", fontSize: 12, color: "#E8ECF4", resize: "none", outline: "none", fontFamily: "inherit", lineHeight: 1.55, opacity: health.status !== "ok" ? 0.45 : 1, transition: "border-color 0.15s" }}
      />
      {isLoading ? (
        <button onClick={onStop} title="Stop generation" style={{ flexShrink: 0, width: 36, height: 36, borderRadius: 8, background: "rgba(255,79,91,0.1)", border: "1px solid rgba(255,79,91,0.2)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <StopCircle size={14} style={{ color: "#FF4F5B" }} />
        </button>
      ) : (
        <button onClick={onSubmit} disabled={!input.trim() || health.status !== "ok"} style={{ flexShrink: 0, width: 36, height: 36, borderRadius: 8, background: !input.trim() || health.status !== "ok" ? "rgba(0,168,255,0.04)" : "rgba(0,168,255,0.14)", border: "1px solid rgba(0,168,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", cursor: !input.trim() || health.status !== "ok" ? "default" : "pointer", transition: "background 0.15s, border-color 0.15s, opacity 0.15s" }}>
          <Send size={14} style={{ color: "#3A6FA8" }} />
        </button>
      )}
    </div>
  );
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function AIAnalyst() {
  const [health, setHealth] = useState<HealthState>({ status: "checking" });
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef     = useRef<HTMLTextAreaElement>(null);
  const abortRef     = useRef<AbortController | null>(null);
  const msgIdRef     = useRef(0);
  const nextId = useCallback(() => `msg-${++msgIdRef.current}`, []);

  const checkHealth = useCallback(async () => {
    setHealth((h) => ({ ...h, status: "checking" }));
    try {
      const r = await fetch("/api/ai/health");
      const data = await r.json();
      setHealth({ status: data.status });
    } catch {
      setHealth({ status: "error" });
    }
  }, []);

  useEffect(() => { checkHealth(); }, [checkHealth]);

  useEffect(() => {
    if (messages.length > 0 && containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  const submit = useCallback(async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading || health.status !== "ok") return;

    const history = messages.map((m) => ({ role: m.role, content: m.content }));
    const userMsgId = nextId();
    const assistantMsgId = nextId();
    setMessages((prev) => [
      ...prev,
      { id: userMsgId, role: "user", content: trimmed },
      { id: assistantMsgId, role: "assistant", content: "", streaming: true },
    ]);
    setInput("");
    setIsLoading(true);
    if (inputRef.current) inputRef.current.style.height = "auto";

    abortRef.current?.abort();
    abortRef.current = new AbortController();

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...history, { role: "user", content: trimmed }] }),
        signal: abortRef.current.signal,
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({ error: "Unknown error" }));
        const msg = errData.error === "NO_API_KEY"
          ? "ANTHROPIC_API_KEY is not configured. Add it to your environment variables and try again."
          : `Error: ${errData.error}`;
        setMessages((prev) => { const last = prev[prev.length - 1]; return [...prev.slice(0, -1), { ...last, content: msg, streaming: false }]; });
        return;
      }

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let full = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        full += decoder.decode(value, { stream: true });
        setMessages((prev) => { const last = prev[prev.length - 1]; return [...prev.slice(0, -1), { ...last, content: full, streaming: true }]; });
      }
      setMessages((prev) => { const last = prev[prev.length - 1]; return [...prev.slice(0, -1), { ...last, streaming: false }]; });
    } catch (err) {
      if ((err as Error).name !== "AbortError") {
        setMessages((prev) => { const last = prev[prev.length - 1]; return [...prev.slice(0, -1), { ...last, content: "Request failed. Ensure ANTHROPIC_API_KEY is configured and try again.", streaming: false }]; });
      }
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, health, messages, nextId]);

  const stopStreaming = () => {
    abortRef.current?.abort();
    setIsLoading(false);
    setMessages((prev) => { const last = prev[prev.length - 1]; if (last?.streaming) return [...prev.slice(0, -1), { ...last, streaming: false }]; return prev; });
  };

  return (
    <div style={{ background: "#0C1220", border: "1px solid #1A2437", borderRadius: 12, overflow: "hidden", display: "flex", flexDirection: "column" }}>
      <AIAnalystHeader
        health={health}
        hasMessages={messages.length > 0}
        isLoading={isLoading}
        onClearChat={() => setMessages([])}
        onCheckHealth={checkHealth}
      />
      {health.status === "error" && <SetupGuide onRetry={checkHealth} />}
      {health.status !== "error" && (
        <>
          <div ref={containerRef} style={{ minHeight: 300, maxHeight: 440, overflowY: "auto", padding: "16px 18px", display: "flex", flexDirection: "column", gap: 14 }}>
            {messages.length === 0
              ? <EmptyState healthOk={health.status === "ok"} onPrompt={submit} />
              : messages.map((m) => <ChatBubble key={m.id} m={m} />)
            }
          </div>
          <ChatInputBar
            input={input}
            health={health}
            isLoading={isLoading}
            inputRef={inputRef}
            onInput={setInput}
            onSubmit={() => submit(input)}
            onStop={stopStreaming}
          />
        </>
      )}
    </div>
  );
}
