import { useEffect, useMemo, useRef } from "react";

export interface TrackingParams {
  ref: string | null;
  epc: string | null;
  source: string | null;
}

export function useTrackingParams(): TrackingParams {
  return useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    return {
      ref: params.get("ref"),
      epc: params.get("epc"),
      source: params.get("source") || params.get("utm_source"),
    };
  }, []);
}

export function useTrackVisit(page: string) {
  const tracked = useRef(false);
  const params = useTrackingParams();

  useEffect(() => {
    if (tracked.current) return;
    tracked.current = true;

    fetch("/api/visits", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ref: params.ref,
        epc: params.epc,
        page,
      }),
    }).catch(() => {});
  }, [page, params]);

  return params;
}
