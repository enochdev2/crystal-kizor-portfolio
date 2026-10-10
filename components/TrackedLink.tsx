"use client";

import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";
import { track, type AnalyticsEvent, type AnalyticsValue } from "@/lib/analytics";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  event: AnalyticsEvent;
  eventData?: Record<string, AnalyticsValue>;
};

export function TrackedLink({ children, event, eventData, onClick, ...props }: Props) {
  return (
    <a
      {...props}
      onClick={(clickEvent: MouseEvent<HTMLAnchorElement>) => {
        track(event, eventData);
        onClick?.(clickEvent);
      }}
    >
      {children}
    </a>
  );
}
