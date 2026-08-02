import type { MetadataRoute } from "next";

import { getMenuProducts } from "@/lib/products";
import { SITE_URL } from "@/constants/sitemap";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getMenuProducts();

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },

    ...products.map((product) => ({
      url: `${SITE_URL}/products/${product.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
