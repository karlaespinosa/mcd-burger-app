import type { CartItems } from "@/types/cart";
import type { Product } from "@/types/product";

export function getCartItems(products: Product[], items: CartItems) {
  return products
    .filter((product) => items[product.id])
    .map((product) => ({
      product,
      quantity: items[product.id],
    }));
}

export function getCartTotalQuantity(items: CartItems): number {
  return Object.values(items).reduce((total, quantity) => total + quantity, 0);
}

export function getCartSubtotal(products: Product[], items: CartItems): number {
  return getCartItems(products, items).reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );
}
