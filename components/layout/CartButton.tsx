"use client";

import { ShoppingCart } from "lucide-react";
import Link from "next/link";

import { useCartStore } from "@/store/cart-store";

export const CartButton = () => {
  const items = useCartStore((state) => state.items);
  const hasHydrated = useCartStore((state) => state.hasHydrated);

  const totalQuantity = Object.values(items).reduce(
    (total, quantity) => total + quantity,
    0,
  );

  return (
    <Link
      href="/cart"
      aria-label={`View shopping cart with ${totalQuantity} items`}
      className="group relative flex items-center gap-3 rounded-full border border-neutral-800 bg-neutral-950 px-4 py-2.5 transition-all duration-300 hover:border-lime-400/50 hover:bg-neutral-900"
    >
      <ShoppingCart
        aria-hidden="true"
        className="h-5 w-5 text-neutral-200 transition-transform duration-300 group-hover:scale-110 group-hover:text-lime-400"
      />

      <span className="hidden text-sm font-semibold text-neutral-200 sm:inline">
        Cart
      </span>

      <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-lime-400 px-1.5 text-xs font-bold text-black">
        {hasHydrated ? totalQuantity : 0}
      </span>
    </Link>
  );
};
