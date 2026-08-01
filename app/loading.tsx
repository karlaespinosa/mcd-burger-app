export default function Loading() {
  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="h-12 w-64 animate-pulse rounded-xl bg-neutral-900" />

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl bg-neutral-900"
            >
              <div className="aspect-square animate-pulse bg-neutral-800" />

              <div className="space-y-4 p-5">
                <div className="h-6 w-2/3 animate-pulse rounded bg-neutral-800" />
                <div className="h-5 w-24 animate-pulse rounded bg-neutral-800" />

                <div className="space-y-2">
                  <div className="h-4 animate-pulse rounded bg-neutral-800" />
                  <div className="h-4 animate-pulse rounded bg-neutral-800" />
                  <div className="h-4 w-3/4 animate-pulse rounded bg-neutral-800" />
                </div>

                <div className="h-7 w-28 animate-pulse rounded-full bg-neutral-800" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
