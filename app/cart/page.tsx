import Link from "next/link";

export default function CartPage() {
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

        <section className="overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-900">
          <div className="flex min-h-96 flex-col items-center justify-center px-6 py-16 text-center">
            <div
              aria-hidden="true"
              className="flex h-16 w-16 items-center justify-center rounded-2xl bg-neutral-800 text-3xl"
            >
              🛒
            </div>

            <h2 className="mt-6 text-2xl font-bold text-white">
              Your cart is empty
            </h2>

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
      </section>
    </main>
  );
}
