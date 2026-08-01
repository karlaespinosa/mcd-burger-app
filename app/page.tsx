import { getMenuProducts } from "@/lib/products";
import { ProductsGrid } from "@/components";

export default async function HomePage() {
  const products = await getMenuProducts();
  console.log(products);

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 text-4xl font-bold text-lime-400">Burger Menu</h1>

        <ProductsGrid products={products} />
      </div>
    </main>
  );
}
