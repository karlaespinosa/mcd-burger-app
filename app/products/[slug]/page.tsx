import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { formatPrice } from "@/lib/format-price";
import { getMenuProductBySlug, getMenuProducts } from "@/lib/products";

import { AddToCartButton, GoBackButton } from "@/components";

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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getMenuProductBySlug(slug);

  if (!product) {
    return {
      title: "Product not found",
      description: "The requested product could not be found.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return {
    title: product.name,

    description: product.description,

    alternates: {
      canonical: `/products/${product.slug}`,
    },

    openGraph: {
      type: "website",
      title: product.name,
      description: product.description,
      url: `/products/${product.slug}`,
      images: [
        {
          url: product.image,
          alt: product.name,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.description,
      images: [product.image],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getMenuProductBySlug(slug);

  if (!product) return notFound();

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <article className="mx-auto max-w-4xl overflow-hidden rounded-3xl bg-neutral-900">
        <div className="p-6">
          <GoBackButton />
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

          <AddToCartButton productId={product.id} productName={product.name} />
        </div>
      </article>
    </main>
  );
}
