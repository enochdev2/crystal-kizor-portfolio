const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

function normalizeSiteUrl(value: string) {
  return value.replace(/\/$/, "");
}

export function getSiteUrl() {
  if (configuredSiteUrl) return normalizeSiteUrl(configuredSiteUrl);

  // Vercel exposes VERCEL_ENV for preview/production deployments. A production
  // deployment must never publish localhost canonical/OG/sitemap URLs.
  if (process.env.VERCEL_ENV === "production") {
    throw new Error(
      "NEXT_PUBLIC_SITE_URL is required for production deployments. Set it in Vercel Project Settings → Environment Variables.",
    );
  }

  return "http://localhost:3000";
}
