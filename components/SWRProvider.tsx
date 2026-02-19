"use client";
import { SWRConfig } from "swr";
import { ToastProvider } from "@/components/Toast";

export function SWRProvider({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <SWRConfig
        value={{
          fetcher: (url: string) =>
            fetch(url).then((r) => {
              if (!r.ok) throw new Error(`API ${r.status}`);
              return r.json();
            }),
          refreshInterval: 60_000,
          revalidateOnFocus: false,
          shouldRetryOnError: true,
          errorRetryCount: 3,
        }}
      >
        {children}
      </SWRConfig>
    </ToastProvider>
  );
}
