import Link from "next/link";
import { ShoppingCart } from "lucide-react";

export const EmptyCart = () => {
  return (
    <section className="overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-900">
      <div className="flex min-h-96 flex-col items-center justify-center px-6 py-16 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-neutral-800">
          <ShoppingCart
            aria-hidden="true"
            className="h-8 w-8 text-neutral-300"
          />
        </div>

        <h2 className="mt-6 text-2xl font-bold">Your cart is empty</h2>

        <p className="mt-3 max-w-md leading-7 text-neutral-400">
          Add a burger, fries, or another item from the menu to begin your
          order.
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-lime-400 px-7 font-bold text-black transition-colors hover:bg-lime-300"
        >
          Browse menu
        </Link>
      </div>
    </section>
  );
};
