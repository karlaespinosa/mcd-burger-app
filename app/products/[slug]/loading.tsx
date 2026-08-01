export default function ProductLoading() {
  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <article className="mx-auto max-w-4xl overflow-hidden rounded-3xl bg-neutral-900">
        <div className="p-6">
          <div className="h-5 w-24 animate-pulse rounded bg-neutral-800" />
        </div>

        <div className="mx-6 aspect-video animate-pulse rounded-2xl bg-neutral-800" />

        <div className="space-y-6 p-6 md:p-10">
          <div className="h-12 w-2/3 animate-pulse rounded-xl bg-neutral-800" />

          <div className="h-8 w-28 animate-pulse rounded bg-neutral-800" />

          <div className="space-y-3">
            <div className="h-5 animate-pulse rounded bg-neutral-800" />
            <div className="h-5 animate-pulse rounded bg-neutral-800" />
            <div className="h-5 w-3/4 animate-pulse rounded bg-neutral-800" />
          </div>

          <div className="h-9 w-36 animate-pulse rounded-full bg-neutral-800" />

          <div className="h-14 w-full animate-pulse rounded-full bg-neutral-800 md:w-72" />
        </div>
      </article>
    </main>
  );
}
