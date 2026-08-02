"use client";

import { LoaderCircle, Search, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

import { useDebounce } from "@/hooks/useDebounce";

const SEARCH_PARAM = "query";

export function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const urlQuery = searchParams.get(SEARCH_PARAM) ?? "";

  const [query, setQuery] = useState(urlQuery);
  const [isPending, startTransition] = useTransition();

  const debouncedQuery = useDebounce(query, 400);

  useEffect(() => {
    const normalizedQuery = debouncedQuery.trim();

    if (normalizedQuery === urlQuery) return;

    const nextUrl = normalizedQuery
      ? `/?query=${encodeURIComponent(normalizedQuery)}`
      : "/";

    startTransition(() => {
      router.replace(nextUrl, {
        scroll: false,
      });
    });
  }, [debouncedQuery, router, urlQuery]);

  const handleClear = () => setQuery("");

  return (
    <div className="relative w-full max-w-xs">
      <Search
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-neutral-500"
      />

      <label htmlFor="product-search" className="sr-only">
        Search menu products
      </label>

      <input
        id="product-search"
        type="text"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search menu..."
        autoComplete="off"
        aria-busy={isPending}
        className="h-11 w-full rounded-full border border-neutral-800 bg-neutral-950 pr-10 pl-10 text-sm text-white outline-none transition placeholder:text-neutral-500 focus:border-lime-400 focus:ring-2 focus:ring-lime-400/20"
      />

      <div className="absolute top-1/2 right-2 flex -translate-y-1/2 items-center">
        {isPending ? (
          <LoaderCircle
            aria-label="Searching"
            className="h-5 w-5 animate-spin text-lime-400"
          />
        ) : query ? (
          <button
            type="button"
            onClick={handleClear}
            aria-label="Clear search"
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-neutral-500 transition hover:bg-neutral-800 hover:text-white"
          >
            <X aria-hidden="true" className="h-4 w-4" />
          </button>
        ) : null}
      </div>
    </div>
  );
}
