import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { formatPrice } from "@/lib/format-price";
import { getMenuProductBySlug, getMenuProducts } from "@/lib/products";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const products = await getMenuProducts();

  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getMenuProductBySlug(slug);

  if (!product) return notFound();

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <article className="mx-auto max-w-4xl overflow-hidden rounded-3xl bg-neutral-900">
        <div className="p-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-neutral-300 transition hover:text-lime-400"
          >
            <span aria-hidden="true">←</span>
            Go back
          </Link>
        </div>

        <div className="relative mx-6 aspect-video overflow-hidden rounded-2xl">
          <Image
            src={product.image}
            alt={product.name}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 896px"
            className="object-cover"
          />
        </div>

        <div className="p-6 md:p-10">
          <h1 className="text-4xl font-bold md:text-5xl">{product.name}</h1>

          <p className="mt-4 text-2xl font-bold text-lime-400">
            {formatPrice(product.price)}
          </p>

          <p className="mt-6 max-w-2xl leading-7 text-neutral-300">
            {product.description}
          </p>

          <div className="mt-6">
            <span className="rounded-full bg-neutral-800 px-4 py-2 text-sm font-semibold text-neutral-300">
              🔥 {product.calorie} Calories
            </span>
          </div>

          <button
            type="button"
            className="mt-10 w-full rounded-full bg-lime-400 px-6 py-4 text-lg font-bold text-black transition hover:bg-lime-300 md:w-auto md:min-w-72 cursor-pointer"
          >
            Add to cart
          </button>
        </div>
      </article>
    </main>
  );
}
