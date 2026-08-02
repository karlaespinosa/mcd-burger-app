import Link from "next/link";
import type { Metadata } from "next";

import { CartContent } from "@/components";
import { getMenuProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Shopping Cart",

  description:
    "Review the products and quantities currently in your shopping cart.",

  robots: {
    index: false,
    follow: false,
  },
};

export default async function CartPage() {
  const products = await getMenuProducts();

  return (
    <main className="min-h-screen bg-black px-5 py-10 text-white sm:px-8">
      <section className="mx-auto w-full max-w-6xl">
        <header className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-lime-400">
              Your order
            </p>

            <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
              Shopping Cart
            </h1>
          </div>

          <Link
            href="/"
            className="inline-flex h-11 w-fit items-center justify-center rounded-full border border-neutral-700 px-5 text-sm font-semibold text-neutral-200 transition-colors hover:border-lime-400 hover:text-lime-400"
          >
            Continue shopping
          </Link>
        </header>

        <CartContent products={products} />
      </section>
    </main>
  );
}
