import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/config/site";

export const dynamic = "force-static";

/**
 * Generates a comprehensive sitemap for the website
 *
 * Priority guidelines:
 * - 1.0: Homepage (most important)
 * - 0.8-0.9: Main pages (About, Blog listing, etc.)
 * - 0.6-0.7: Blog posts, category pages
 * - 0.4-0.5: Archive pages, tag pages
 * - 0.3: Less important pages
 *
 * Change frequency guidelines:
 * - always: Pages that change with every access
 * - hourly: Pages that change hourly
 * - daily: Pages that change daily
 * - weekly: Pages that change weekly
 * - monthly: Pages that change monthly
 * - yearly: Pages that change yearly
 * - never: Archived pages
 */

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = SITE_CONFIG.url;
  const currentDate = new Date().toISOString();

  // Static routes with priorities and change frequencies
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];

  return staticRoutes;
}
