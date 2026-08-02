"use server";

import { getMenuProducts } from "@/lib/products";
import type { CartItems } from "@/types/cart";
import type { CheckoutState } from "@/types/checkout";

export const checkoutAction = async (
  items: CartItems,
  _previousState: CheckoutState,
): Promise<CheckoutState> => {
  const entries = Object.entries(items);

  if (entries.length === 0) {
    return {
      status: "error",
      message: "Your cart is empty.",
    };
  }

  const hasInvalidQuantity = entries.some(
    ([productId, quantity]) =>
      productId.length === 0 || !Number.isInteger(quantity) || quantity < 1,
  );

  if (hasInvalidQuantity) {
    return {
      status: "error",
      message: "One or more product quantities are invalid.",
    };
  }

  const products = await getMenuProducts();
  const validProductIds = new Set(products.map((product) => product.id));

  const hasUnknownProduct = entries.some(
    ([productId]) => !validProductIds.has(productId),
  );

  if (hasUnknownProduct) {
    return {
      status: "error",
      message: "One or more products no longer exist.",
    };
  }

  await new Promise((resolve) => {
    setTimeout(resolve, 800);
  });

  return {
    status: "success",
    message: "Your order was placed successfully.",
    orderId: crypto.randomUUID(),
  };
};
