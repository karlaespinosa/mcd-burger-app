"use client";

import { formatPrice } from "@/lib/format-price";
import { useCartStore } from "@/store/cart-store";
import type { Product } from "@/types/product";

import { CartItem } from "./CartItem";
import { EmptyCart } from "./EmptyCart";
import { CartSkeleton } from "./CartSkeleton";

interface CartContentProps {
  products: Product[];
}

export const CartContent = ({ products }: CartContentProps) => {
  const items = useCartStore((state) => state.items);
  const hasHydrated = useCartStore((state) => state.hasHydrated);
  const clearCart = useCartStore((state) => state.clearCart);

  if (!hasHydrated) {
    return <CartSkeleton />;
  }

  const cartItems = products
    .filter((product) => items[product.id])
    .map((product) => ({
      product,
      quantity: items[product.id],
    }));

  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const subtotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );

  if (cartItems.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_22rem]">
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-neutral-400">
            {totalQuantity} {totalQuantity === 1 ? "item" : "items"}
          </p>

          <button
            type="button"
            onClick={clearCart}
            className="cursor-pointer text-sm font-semibold text-neutral-400 transition hover:text-red-400"
          >
            Clear cart
          </button>
        </div>

        <div className="space-y-4">
          {cartItems.map(({ product, quantity }) => (
            <CartItem key={product.id} product={product} quantity={quantity} />
          ))}
        </div>
      </section>

      <aside className="h-fit rounded-3xl border border-neutral-800 bg-neutral-900 p-6 lg:sticky lg:top-28">
        <h2 className="text-xl font-bold">Order summary</h2>

        <div className="mt-6 space-y-4 border-b border-neutral-800 pb-6">
          <div className="flex items-center justify-between text-neutral-400">
            <span>Items</span>
            <span>{totalQuantity}</span>
          </div>

          <div className="flex items-center justify-between text-neutral-400">
            <span>Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <span className="text-lg font-bold">Total</span>

          <span className="text-2xl font-bold text-lime-400">
            {formatPrice(subtotal)}
          </span>
        </div>
      </aside>
    </div>
  );
};
