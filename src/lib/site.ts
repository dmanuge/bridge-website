export const siteUrl =
  import.meta.env.PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://www.bridge.co";

export const applicationUrl =
  import.meta.env.PUBLIC_APPLICATION_URL?.replace(/\/$/, "") ||
  "https://app.bridgemarketplace.app";

export function applicationHref(source: string, financing?: string) {
  const url = new URL(applicationUrl);
  url.searchParams.set("utm_source", "bridge.co");
  url.searchParams.set("utm_medium", "website");
  url.searchParams.set("utm_campaign", "two_doors");
  url.searchParams.set("utm_content", source);
  if (financing) url.searchParams.set("financing_goal", financing);
  return url.toString();
}
