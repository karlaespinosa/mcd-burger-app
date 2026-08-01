"use client";

import { RotateCcw, TriangleAlert } from "lucide-react";

import "./globals.css";

interface GlobalErrorProps {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <main className="flex min-h-screen items-center justify-center px-6 py-16">
          <section className="w-full max-w-xl rounded-3xl border border-neutral-800 bg-neutral-900 p-8 text-center sm:p-12">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10">
              <TriangleAlert
                aria-hidden="true"
                className="h-8 w-8 text-red-400"
              />
            </div>

            <p className="mt-6 text-sm font-bold uppercase tracking-[0.2em] text-red-400">
              Application error
            </p>

            <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
              The application could not continue
            </h1>

            <p className="mt-4 leading-7 text-neutral-400">
              An unexpected error affected the application. Please try again.
            </p>

            {process.env.NODE_ENV === "development" && (
              <p className="mt-4 wrap-break-word rounded-xl bg-neutral-950 p-4 text-left text-sm text-neutral-500">
                {error.message}
              </p>
            )}

            <button
              type="button"
              onClick={reset}
              className="mt-8 inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-full bg-lime-400 px-7 font-bold text-black transition hover:bg-lime-300"
            >
              <RotateCcw aria-hidden="true" className="h-4 w-4" />
              Try again
            </button>
          </section>
        </main>
      </body>
    </html>
  );
}
