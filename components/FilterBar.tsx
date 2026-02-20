"use client";
import { useFilters } from "@/components/FilterContext";
import { Filter, X, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const RACES = [
  { id: "all", name: "All Races" },
  { id: "daytona-2026", name: "Daytona 500" },
  { id: "las-vegas-2026", name: "Pennzoil 400" },
  { id: "atlanta-2026", name: "Ambetter Health 400" },
  { id: "phoenix-2026", name: "United Rentals 500" },
  { id: "cota-2026", name: "EchoPark Grand Prix" },
  { id: "bristol-dirt-2026", name: "Food City 500" },
];

const DRIVERS = [
  "all", "Chase Elliott", "Kyle Larson", "Denny Hamlin", "Ross Chastain",
  "Ryan Blaney", "Christopher Bell", "William Byron", "Martin Truex Jr.", "Tyler Reddick", "Alex Bowman",
];

const TEAMS = [
  "all", "Hendrick Motorsports", "Joe Gibbs Racing", "Team Penske",
  "Trackhouse Racing", "23XI Racing",
];

const MANUFACTURERS = ["all", "Chevrolet", "Ford", "Toyota"];

interface DropdownProps {
  label: string;
  value: string;
  options: { id: string; name: string }[] | string[];
  onChange: (v: string) => void;
  width?: number;
}

function Dropdown({ label, value, options, onChange, width = 160 }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  const normalizedOptions = options.map(o =>
    typeof o === "string" ? { id: o, name: o === "all" ? `All ${label}s` : o } : o
  );
  const displayValue = normalizedOptions.find(o => o.id === value)?.name ?? value;
  const isActive = value !== "all";

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: "flex", alignItems: "center", gap: 6,
          padding: "5px 10px", borderRadius: 6,
          background: isActive ? "rgba(0,168,224,0.12)" : "#0A0F1E",
          border: isActive ? "1px solid rgba(0,168,224,0.35)" : "1px solid #1A2437",
          color: isActive ? "#00A8E0" : "#8B97AA",
          fontSize: 11, fontWeight: isActive ? 700 : 500,
          cursor: "pointer", whiteSpace: "nowrap",
          transition: "all 0.15s",
        }}
      >
        {isActive && <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#00A8E0", flexShrink: 0 }} />}
        {displayValue}
        <ChevronDown size={9} style={{ opacity: 0.6 }} />
      </button>
      {open && (
        <div style={{
          position: "absolute", top: "calc(100% + 5px)", left: 0, zIndex: 200,
          background: "#0C1220", border: "1px solid #243044", borderRadius: 8,
          padding: 4, minWidth: width, maxHeight: 240, overflowY: "auto",
          boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
        }}>
          {normalizedOptions.map(o => (
            <button
              key={o.id}
              onClick={() => { onChange(o.id); setOpen(false); }}
              style={{
                display: "block", width: "100%", textAlign: "left",
                padding: "7px 10px", borderRadius: 5, border: "none",
                cursor: "pointer", fontSize: 11,
                background: o.id === value ? "rgba(0,168,224,0.1)" : "transparent",
                color: o.id === value ? "#00A8E0" : "#8B97AA",
                fontWeight: o.id === value ? 700 : 400,
                transition: "background 0.1s",
              }}
              onMouseEnter={e => { if (o.id !== value) (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)"; }}
              onMouseLeave={e => { if (o.id !== value) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
            >
              {o.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function FilterBar() {
  const { filters, setFilter, resetFilters, activeFilterCount } = useFilters();

  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap",
      padding: "10px 0", borderBottom: "1px solid #12202F", marginBottom: 16,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginRight: 4 }}>
        <Filter size={12} style={{ color: activeFilterCount > 0 ? "#00A8E0" : "#4E5E74" }} />
        <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#4E5E74" }}>
          Filters
        </span>
        {activeFilterCount > 0 && (
          <span style={{
            fontSize: 9, fontWeight: 800, padding: "1px 5px", borderRadius: 10,
            background: "#00A8E0", color: "#000",
          }}>
            {activeFilterCount}
          </span>
        )}
      </div>

      <Dropdown
        label="Race"
        value={filters.selectedRace}
        options={RACES}
        onChange={v => setFilter("selectedRace", v)}
        width={190}
      />
      <Dropdown
        label="Driver"
        value={filters.selectedDriver}
        options={DRIVERS}
        onChange={v => setFilter("selectedDriver", v)}
        width={180}
      />
      <Dropdown
        label="Team"
        value={filters.selectedTeam}
        options={TEAMS}
        onChange={v => setFilter("selectedTeam", v)}
        width={200}
      />
      <Dropdown
        label="Manufacturer"
        value={filters.selectedManufacturer}
        options={MANUFACTURERS}
        onChange={v => setFilter("selectedManufacturer", v)}
        width={150}
      />

      {activeFilterCount > 0 && (
        <button
          onClick={resetFilters}
          style={{
            display: "flex", alignItems: "center", gap: 5, padding: "5px 10px",
            borderRadius: 6, border: "1px solid rgba(255,79,91,0.25)",
            background: "rgba(255,79,91,0.07)", color: "#FF4F5B",
            fontSize: 11, fontWeight: 600, cursor: "pointer",
            transition: "all 0.15s",
          }}
        >
          <X size={9} />
          Clear
        </button>
      )}

      <span style={{ marginLeft: "auto", fontSize: 10, color: "#2E4560" }}>
        Filters apply to all charts on this page
      </span>
    </div>
  );
}
