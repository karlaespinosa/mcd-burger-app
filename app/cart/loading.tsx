export default function CartLoading() {
  return (
    <main className="min-h-screen bg-black px-5 py-10 text-white sm:px-8">
      <section className="mx-auto w-full max-w-6xl">
        <header className="mb-10 space-y-3">
          <div className="h-4 w-28 animate-pulse rounded bg-neutral-900" />
          <div className="h-12 w-72 animate-pulse rounded-xl bg-neutral-900" />
        </header>

        <div className="grid animate-pulse gap-8 lg:grid-cols-[1fr_22rem]">
          <div className="space-y-4">
            {Array.from({ length: 2 }).map((_, index) => (
              <div key={index} className="h-44 rounded-3xl bg-neutral-900" />
            ))}
          </div>

          <div className="h-72 rounded-3xl bg-neutral-900" />
        </div>
      </section>
    </main>
  );
}
