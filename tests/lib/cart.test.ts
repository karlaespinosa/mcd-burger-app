import { describe, expect, it } from "vitest";

import {
  getCartItems,
  getCartSubtotal,
  getCartTotalQuantity,
} from "@/lib/cart";
import type { Product } from "@/types/product";

const products: Product[] = [
  {
    id: "1",
    name: "Burger A",
    price: 499,
    image: "https://example.com/burger-a.jpg",
    description: "A classic burger.",
    calorie: 760,
    slug: "burger-a",
  },
  {
    id: "2",
    name: "Black Burger",
    price: 599,
    image: "https://example.com/black-burger.jpg",
    description: "A burger with a black bun.",
    calorie: 640,
    slug: "black-burger",
  },
  {
    id: "3",
    name: "Fries",
    price: 699,
    image: "https://example.com/fries.jpg",
    description: "Crispy fries.",
    calorie: 920,
    slug: "fries",
  },
];

describe("getCartItems", () => {
  it("returns an empty array when the cart is empty", () => {
    expect(getCartItems(products, {})).toEqual([]);
  });

  it("returns only products included in the cart", () => {
    const result = getCartItems(products, {
      "1": 2,
      "3": 1,
    });

    expect(result).toEqual([
      {
        product: products[0],
        quantity: 2,
      },
      {
        product: products[2],
        quantity: 1,
      },
    ]);
  });

  it("ignores product ids that do not exist in the catalog", () => {
    const result = getCartItems(products, {
      "999": 4,
    });

    expect(result).toEqual([]);
  });
});

describe("getCartTotalQuantity", () => {
  it("returns zero when the cart is empty", () => {
    expect(getCartTotalQuantity({})).toBe(0);
  });

  it("returns the quantity of a single product", () => {
    expect(
      getCartTotalQuantity({
        "1": 3,
      }),
    ).toBe(3);
  });

  it("adds the quantities of all products", () => {
    expect(
      getCartTotalQuantity({
        "1": 2,
        "2": 3,
        "3": 1,
      }),
    ).toBe(6);
  });
});

describe("getCartSubtotal", () => {
  it("returns zero when the cart is empty", () => {
    expect(getCartSubtotal(products, {})).toBe(0);
  });

  it("calculates the subtotal for one product", () => {
    const subtotal = getCartSubtotal(products, {
      "1": 2,
    });

    expect(subtotal).toBe(998);
  });

  it("calculates the subtotal for multiple products", () => {
    const subtotal = getCartSubtotal(products, {
      "1": 2,
      "2": 1,
    });

    expect(subtotal).toBe(1597);
  });

  it("ignores products that do not exist in the catalog", () => {
    const subtotal = getCartSubtotal(products, {
      "1": 1,
      "999": 10,
    });

    expect(subtotal).toBe(499);
  });
});
