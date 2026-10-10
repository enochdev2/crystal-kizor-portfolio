export type AnalyticsValue = string | number | boolean | null;

export type AnalyticsEvent =
  | "cta_clicked"
  | "initiative_link_clicked"
  | "project_card_clicked"
  | "project_enquiry_clicked"
  | "enquiry_intent_selected"
  | "enquiry_started"
  | "enquiry_submitted"
  | "web_vital";

type VercelAnalyticsCommand = (
  command: "event" | "pageview" | "beforeSend",
  payload?: unknown,
) => void;

declare global {
  interface Window {
    va?: VercelAnalyticsCommand;
    vaq?: unknown[][];
  }
}

export function track(event: AnalyticsEvent, properties: Record<string, AnalyticsValue> = {}) {
  if (typeof window === "undefined") return;

  // Vercel Web Analytics consumes this queue once /_vercel/insights/script.js
  // is available in production. No personal form fields are ever sent here.
  window.va?.("event", { name: event, data: properties });

  // Keep a local event for Playwright/dev inspection without pretending it is
  // persistence. Production persistence is handled by Vercel Analytics.
  window.dispatchEvent(
    new CustomEvent("crystal:analytics", {
      detail: {
        event,
        properties,
        path: window.location.pathname,
      },
    }),
  );
}
