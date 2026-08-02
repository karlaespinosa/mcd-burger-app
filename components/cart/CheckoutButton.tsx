"use client";

import { useState } from "react";
import { toast } from "sonner";

import { checkoutAction } from "@/actions/checkout/actions";
import { useCartStore } from "@/store/cart-store";

export function CheckoutButton() {
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const [isPending, setIsPending] = useState(false);

  const handleCheckout = async () => {
    setIsPending(true);

    try {
      const result = await checkoutAction(items, {
        status: "idle",
        message: "",
      });

      if (result.status === "error") {
        toast.error(result.message);
        return;
      }

      clearCart();

      toast.success(result.message, {
        description: result.orderId
          ? `Order: ${result.orderId.slice(0, 8)}`
          : undefined,
      });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <button
      type="button"
      className="w-full cursor-pointer rounded-full bg-lime-400 px-6 py-2 text-2xl font-bold text-black transition hover:bg-lime-300 md:w-auto md:min-w-72"
      onClick={handleCheckout}
      disabled={isPending}
    >
      {isPending ? "Placing order..." : "Checkout"}
    </button>
  );
}
