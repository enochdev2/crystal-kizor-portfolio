import type { NextConfig } from "next";

const isProductionDeployment = process.env.VERCEL_ENV === "production";

if (isProductionDeployment && !process.env.NEXT_PUBLIC_SITE_URL) {
  throw new Error("NEXT_PUBLIC_SITE_URL is required for the production Vercel deployment.");
}

if (isProductionDeployment) {
  const hasResend = Boolean(
    process.env.RESEND_API_KEY && process.env.ENQUIRY_TO_EMAIL && process.env.ENQUIRY_FROM_EMAIL,
  );
  const hasWebhook = Boolean(process.env.ENQUIRY_WEBHOOK_URL);

  if (!hasResend && !hasWebhook) {
    throw new Error(
      "Configure enquiry delivery before production: set Resend credentials or ENQUIRY_WEBHOOK_URL.",
    );
  }
}

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
