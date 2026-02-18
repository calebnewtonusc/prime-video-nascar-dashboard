"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { label: "Overview",    href: "/" },
  { label: "Viewership",  href: "/viewership" },
  { label: "Revenue",     href: "/revenue" },
  { label: "Marketing",   href: "/marketing" },
  { label: "AI Insights", href: "/ai-insights" },
];

export default function NavTabs() {
  const path = usePathname();
  return (
    <nav className="flex items-center gap-0" style={{ borderTop: "1px solid #1A2437" }}>
      {TABS.map(t => {
        const active = t.href === "/" ? path === "/" : path.startsWith(t.href);
        return (
          <Link
            key={t.href}
            href={t.href}
            style={{
              padding: "9px 16px",
              fontSize: 12,
              fontWeight: active ? 600 : 500,
              color: active ? "#E8ECF4" : "#4E5E74",
              borderBottom: active ? "2px solid #00A8FF" : "2px solid transparent",
              marginBottom: -1,
              transition: "color 0.15s, border-color 0.15s",
              textDecoration: "none",
              whiteSpace: "nowrap",
            }}
          >
            {t.label}
          </Link>
        );
      })}
    </nav>
  );
}
