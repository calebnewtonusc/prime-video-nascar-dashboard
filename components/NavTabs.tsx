"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { label: "Overview", href: "/" },
  { label: "Viewership", href: "/viewership" },
  { label: "Revenue", href: "/revenue" },
  { label: "Marketing", href: "/marketing" },
  { label: "AI Insights", href: "/ai-insights" },
];

export default function NavTabs() {
  const pathname = usePathname();
  return (
    <div className="flex items-center gap-1 overflow-x-auto">
      {TABS.map((tab) => {
        const active = tab.href === "/" ? pathname === "/" : pathname.startsWith(tab.href);
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className="px-4 py-2.5 text-[12px] font-semibold whitespace-nowrap border-b-2 transition-all duration-150"
            style={{
              color: active ? "#1399FF" : "#6B7280",
              borderColor: active ? "#1399FF" : "transparent",
            }}
          >
            {tab.label}
          </Link>
        );
      })}
      <div className="ml-auto flex items-center gap-2 pb-2 pl-4">
        <span className="text-[10px] font-bold px-2 py-0.5 rounded" style={{ background: "#1F2937", color: "#6B7280" }}>CONFIDENTIAL</span>
        <span className="text-[10px]" style={{ color: "#374151" }}>Amazon Prime Video © 2026</span>
      </div>
    </div>
  );
}
