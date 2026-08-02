import type { Metadata } from "next";
import { Suspense } from "react";

import { getMenuProducts } from "@/lib/products";
import { ProductsGrid, SearchInput } from "@/components";

export const metadata: Metadata = {
  title: "Menu",

  description:
    "Explore our burger menu, compare prices and calories, and select your favorite meal.",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "Burger Menu",
    description:
      "Explore burgers, sandwiches, fries, prices, and nutritional information.",
    url: "/",
  },
};

interface Props {
  searchParams: Promise<{
    query?: string | string[];
  }>;
}

export default async function HomePage({ searchParams }: Props) {
  const products = await getMenuProducts();
  const { query } = await searchParams;

  const searchQuery =
    typeof query === "string" ? query.trim().toLowerCase() : "";

  const filteredProducts = searchQuery
    ? products.filter((product) => {
        return (
          product.name.toLowerCase().includes(searchQuery) ||
          product.description.toLowerCase().includes(searchQuery)
        );
      })
    : products;

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-4xl font-bold text-lime-400">Burger Menu</h1>

            {searchQuery && (
              <p className="mt-3 text-neutral-400">
                {filteredProducts.length}{" "}
                {filteredProducts.length === 1 ? "result" : "results"} for “
                {query}”
              </p>
            )}
          </div>

          <Suspense
            fallback={
              <div className="h-11 w-full max-w-xs animate-pulse rounded-full bg-neutral-900" />
            }
          >
            <SearchInput />
          </Suspense>
        </div>

        {filteredProducts.length > 0 ? (
          <ProductsGrid products={filteredProducts} />
        ) : (
          <section className="rounded-3xl border border-neutral-800 bg-neutral-900 px-6 py-16 text-center">
            <h2 className="text-2xl font-bold">No products found</h2>

            <p className="mt-3 text-neutral-400">
              Try searching for another burger or menu item.
            </p>
          </section>
        )}
      </div>
    </main>
  );
}
