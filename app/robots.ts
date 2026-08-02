import type { MetadataRoute } from "next";

import { SITE_URL } from "@/constants/sitemap";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/cart"],
      },
    ],

    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
