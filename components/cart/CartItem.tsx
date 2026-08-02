"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { formatPrice } from "@/lib/format-price";
import { useCartStore } from "@/store/cart-store";
import { Dialog } from "@/components";
import type { Product } from "@/types/product";

interface CartItemProps {
  product: Product;
  quantity: number;
}

export const CartItem = ({ product, quantity }: CartItemProps) => {
  const addProduct = useCartStore((state) => state.addProduct);
  const decreaseProduct = useCartStore((state) => state.decreaseProduct);
  const removeProduct = useCartStore((state) => state.removeProduct);

  const handleRemove = () => {
    removeProduct(product.id);

    toast.success("Product removed", {
      description: product.name,
    });
  };

  return (
    <article className="flex flex-col gap-5 rounded-3xl border border-neutral-800 bg-neutral-900 p-4 sm:flex-row sm:items-center">
      <div className="relative aspect-video w-full shrink-0 overflow-hidden rounded-2xl sm:h-32 sm:w-40">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, 160px"
          className="object-cover"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold">{product.name}</h2>

            <p className="mt-1 text-sm text-neutral-400">
              {formatPrice(product.price)} each
            </p>
          </div>

          <Dialog
            title="Remove item?"
            description={`Are you sure you want to remove ${product.name} from your cart?`}
            confirmLabel="Remove"
            onConfirm={handleRemove}
            trigger={
              <button
                type="button"
                aria-label={`Remove ${product.name} from cart`}
                className="cursor-pointer rounded-full p-2 text-neutral-500 transition hover:bg-neutral-800 hover:text-red-400"
              >
                <Trash2 aria-hidden="true" className="h-5 w-5" />
              </button>
            }
          />
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center rounded-full border border-neutral-700 bg-neutral-950">
            <button
              type="button"
              onClick={() => decreaseProduct(product.id)}
              aria-label={`Decrease quantity of ${product.name}`}
              className="cursor-pointer rounded-l-full p-2.5 text-neutral-300 transition hover:bg-neutral-800 hover:text-white"
            >
              <Minus aria-hidden="true" className="h-4 w-4" />
            </button>

            <span className="min-w-10 text-center text-sm font-bold">
              {quantity}
            </span>

            <button
              type="button"
              onClick={() => addProduct(product.id)}
              aria-label={`Increase quantity of ${product.name}`}
              className="cursor-pointer rounded-r-full p-2.5 text-neutral-300 transition hover:bg-neutral-800 hover:text-white"
            >
              <Plus aria-hidden="true" className="h-4 w-4" />
            </button>
          </div>

          <p className="text-lg font-bold text-lime-400">
            {formatPrice(product.price * quantity)}
          </p>
        </div>
      </div>
    </article>
  );
};
