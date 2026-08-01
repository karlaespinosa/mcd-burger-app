import Link from "next/link";
import { CircleAlert } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-[calc(100vh-4.5rem)] items-center justify-center bg-black px-6 py-16 text-white">
      <section className="w-full max-w-xl rounded-3xl border border-neutral-800 bg-neutral-900 p-8 text-center sm:p-12">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-neutral-800">
          <CircleAlert aria-hidden="true" className="h-8 w-8 text-lime-400" />
        </div>

        <p className="mt-6 text-sm font-bold uppercase tracking-[0.2em] text-lime-400">
          Error 404
        </p>

        <h1 className="mt-3 text-3xl font-bold sm:text-4xl">Page not found</h1>

        <p className="mt-4 leading-7 text-neutral-400">
          The page or product you are looking for does not exist.
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-lime-400 px-7 font-bold text-black transition hover:bg-lime-300"
        >
          Return to menu
        </Link>
      </section>
    </main>
  );
}
