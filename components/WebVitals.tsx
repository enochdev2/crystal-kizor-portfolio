"use client";

import { useReportWebVitals } from "next/web-vitals";
import { track } from "@/lib/analytics";

export function WebVitals() {
  useReportWebVitals((metric) => {
    track("web_vital", {
      metric: metric.name,
      value: Number(metric.value.toFixed(2)),
      rating: "rating" in metric ? String(metric.rating) : "unknown",
    });
  });

  return null;
}
