import Script from "next/script";
import { WebVitals } from "@/components/WebVitals";

export function Analytics() {
  if (process.env.NODE_ENV !== "production") {
    return <WebVitals />;
  }

  return (
    <>
      <Script id="vercel-analytics-init" strategy="afterInteractive">
        {`window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };`}
      </Script>
      <Script src="/_vercel/insights/script.js" strategy="afterInteractive" />

      <Script id="vercel-speed-insights-init" strategy="afterInteractive">
        {`window.si = window.si || function () { (window.siq = window.siq || []).push(arguments); };`}
      </Script>
      <Script src="/_vercel/speed-insights/script.js" strategy="afterInteractive" />
      <WebVitals />
    </>
  );
}
