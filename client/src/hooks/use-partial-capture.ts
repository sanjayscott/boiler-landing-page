import { useEffect, useRef, useCallback } from "react";

interface PartialData {
  name?: string;
  phone?: string;
  postcode?: string;
  page?: string;
  source?: string;
}

export function usePartialCapture(page: string, source?: string) {
  const dataRef = useRef<PartialData>({});
  const submittedRef = useRef(false);
  const sentRef = useRef(false);

  const update = useCallback((field: string, value: string) => {
    dataRef.current = { ...dataRef.current, [field]: value, page, source };
  }, [page, source]);

  const markSubmitted = useCallback(() => {
    submittedRef.current = true;
  }, []);

  useEffect(() => {
    const sendPartial = () => {
      if (submittedRef.current || sentRef.current) return;
      const d = dataRef.current;
      if (!d.name && !d.phone && !d.postcode) return;
      sentRef.current = true;
      const payload = JSON.stringify(d);
      if (navigator.sendBeacon) {
        navigator.sendBeacon("/api/partial-leads", new Blob([payload], { type: "application/json" }));
      } else {
        fetch("/api/partial-leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: payload, keepalive: true }).catch(() => {});
      }
    };

    window.addEventListener("beforeunload", sendPartial);
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") sendPartial();
    });

    return () => {
      window.removeEventListener("beforeunload", sendPartial);
    };
  }, []);

  return { update, markSubmitted };
}
