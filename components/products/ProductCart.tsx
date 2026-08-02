import Image from "next/image";
import Link from "next/link";

import { AddToCartButton } from "@/components";
import { formatPrice } from "@/lib/format-price";
import type { Product } from "@/types/product";

interface Props {
  product: Product;
}

export const ProductCard = ({ product }: Props) => {
  return (
    <article className="group flex h-full min-w-0 flex-col overflow-hidden rounded-2xl bg-neutral-900 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
      <Link href={`/products/${product.slug}`} className="flex flex-1 flex-col">
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </div>

        <div className="flex flex-1 flex-col p-5">
          <h2 className="text-xl font-bold text-white">{product.name}</h2>

          <p className="mt-2 text-lg font-bold text-lime-400">
            {formatPrice(product.price)}
          </p>

          <p className="mt-3 line-clamp-3 text-sm leading-6 text-neutral-300">
            {product.description}
          </p>

          <div className="mt-auto pt-5">
            <span className="inline-flex rounded-full bg-neutral-800 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-neutral-300">
              🔥 {product.calorie} Cal
            </span>
          </div>
        </div>
      </Link>

      <div className="p-5 pt-0">
        <AddToCartButton productId={product.id} productName={product.name} />
      </div>
    </article>
  );
};
