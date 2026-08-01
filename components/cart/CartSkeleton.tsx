export const CartSkeleton = () => {
  return (
    <div className="grid animate-pulse gap-8 lg:grid-cols-[1fr_22rem]">
      <div className="space-y-4">
        {[1, 2].map((item) => (
          <div key={item} className="h-40 rounded-3xl bg-neutral-900" />
        ))}
      </div>

      <div className="h-72 rounded-3xl bg-neutral-900" />
    </div>
  );
};
