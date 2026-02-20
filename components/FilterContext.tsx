"use client";
import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";

export interface FilterState {
  selectedRace: string;       // race id or "all"
  selectedDriver: string;     // driver name or "all"
  selectedTeam: string;       // team name or "all"
  selectedManufacturer: string; // "all" | "Chevrolet" | "Ford" | "Toyota"
  dateRange: { from: string; to: string };
}

interface FilterContextValue {
  filters: FilterState;
  setFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  resetFilters: () => void;
  activeFilterCount: number;
}

const DEFAULT_FILTERS: FilterState = {
  selectedRace: "all",
  selectedDriver: "all",
  selectedTeam: "all",
  selectedManufacturer: "all",
  dateRange: { from: "2026-02-01", to: "2026-03-31" },
};

const FilterContext = createContext<FilterContextValue>({
  filters: DEFAULT_FILTERS,
  setFilter: () => {},
  resetFilters: () => {},
  activeFilterCount: 0,
});

export function FilterProvider({ children }: { children: ReactNode }) {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);

  const setFilter = useCallback(<K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  const resetFilters = useCallback(() => setFilters(DEFAULT_FILTERS), []);

  const activeFilterCount = [
    filters.selectedRace !== "all",
    filters.selectedDriver !== "all",
    filters.selectedTeam !== "all",
    filters.selectedManufacturer !== "all",
  ].filter(Boolean).length;

  return (
    <FilterContext.Provider value={{ filters, setFilter, resetFilters, activeFilterCount }}>
      {children}
    </FilterContext.Provider>
  );
}

export function useFilters() {
  return useContext(FilterContext);
}
