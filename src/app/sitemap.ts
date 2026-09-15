import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: site.url,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...[
      "#about",
      "#products",
      "#markets",
      "#import-solutions",
      "#why-us",
      "#quality",
      "#global-presence",
      "#contact",
    ].map((anchor) => ({
      url: `${site.url}/${anchor}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
