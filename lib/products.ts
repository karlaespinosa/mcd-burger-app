import type { Product, ProductsResponse } from "@/types/product";

const PRODUCTS_API_URL = "https://mcd-burger-api.github.io/data/products.json";

export const getMenuProducts = async (): Promise<Product[]> => {
  const response = await fetch(PRODUCTS_API_URL, {
    cache: "force-cache",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const data: ProductsResponse = await response.json();
  return data.products;
};

export const getMenuProductById = async (
  slug: string,
): Promise<Product | undefined> => {
  const products = await getMenuProducts();

  return products.find((product) => product.slug === slug);
};
