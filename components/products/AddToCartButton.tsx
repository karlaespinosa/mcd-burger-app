"use client";

import { toast } from "sonner";

import { useCartStore } from "@/store/cart-store";

interface Props {
  productId: string;
  productName: string;
}

export function AddToCartButton({ productId, productName }: Props) {
  const addProduct = useCartStore((state) => state.addProduct);

  const handleAddToCart = () => {
    addProduct(productId);

    toast.success(`${productName} added to your cart.`);
  };

  return (
    <button
      type="button"
      onClick={handleAddToCart}
      className="mt-10 w-full cursor-pointer rounded-full bg-lime-400 px-6 py-4 text-lg font-bold text-black transition hover:bg-lime-300 md:w-auto md:min-w-72"
    >
      Add to cart
    </button>
  );
}
