"use client";

import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";
import { track, type AnalyticsEvent, type AnalyticsValue } from "@/lib/analytics";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  intent: string;
  event?: AnalyticsEvent;
  eventData?: Record<string, AnalyticsValue>;
};

export function IntentLink({
  children,
  intent,
  event = "enquiry_intent_selected",
  eventData,
  onClick,
  ...props
}: Props) {
  return (
    <a
      {...props}
      onClick={(clickEvent: MouseEvent<HTMLAnchorElement>) => {
        window.dispatchEvent(new CustomEvent("crystal:enquiry-intent", { detail: { intent } }));
        track(event, { intent, ...eventData });
        onClick?.(clickEvent);
      }}
    >
      {children}
    </a>
  );
}
