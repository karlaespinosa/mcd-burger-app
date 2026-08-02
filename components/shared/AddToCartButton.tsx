"use client";

import { useState } from "react";
import { toast } from "sonner";

import { useCartStore } from "@/store/cart-store";
import { QuantityStepper } from "@/components";

interface Props {
  productId: string;
  productName: string;
}

export function AddToCartButton({ productId, productName }: Props) {
  const [quantity, setQuantity] = useState(1);
  const addProductsBatch = useCartStore((state) => state.addProductsBatch);

  const onIncrement = () => setQuantity((prev) => prev + 1);

  const onDecrement = () => {
    if (quantity === 1) return;

    setQuantity((prev) => prev - 1);
  };

  const handleAddToCart = () => {
    addProductsBatch(productId, quantity);

    toast.success(`${quantity} ${productName} added to your cart.`);
  };

  return (
    <div className="flex items-center justify-start gap-3">
      <QuantityStepper
        value={quantity}
        ariaLabelIncreaseBtn={`Add quantity of ${productName}`}
        ariaLabelDecreaseBtn={`Remove quantity of ${productName}`}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
      />
      <button
        type="button"
        onClick={handleAddToCart}
        className="w-full cursor-pointer rounded-full bg-lime-400 px-2 py-1 text-2xl font-bold text-black transition hover:bg-lime-300 md:w-auto md:min-w-52"
      >
        Add to cart
      </button>
    </div>
  );
}
