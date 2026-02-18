"use client";
import { SWRConfig } from "swr";

export function SWRProvider({ children }: { children: React.ReactNode }) {
  return (
    <SWRConfig
      value={{
        fetcher: (url: string) => fetch(url).then((r) => { if (!r.ok) throw new Error("API error"); return r.json(); }),
        refreshInterval: 60_000,
        revalidateOnFocus: false,
        shouldRetryOnError: true,
        errorRetryCount: 3,
      }}
    >
      {children}
    </SWRConfig>
  );
}
