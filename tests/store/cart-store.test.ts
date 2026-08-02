import { beforeEach, describe, expect, it } from "vitest";

import { useCartStore } from "@/store/cart-store";

describe("useCartStore", () => {
  beforeEach(() => {
    useCartStore.setState({
      items: {},
      hasHydrated: true,
    });
  });

  it("starts with an empty cart", () => {
    expect(useCartStore.getState().items).toEqual({});
  });

  it("adds a product with quantity one", () => {
    useCartStore.getState().addProduct("1");

    expect(useCartStore.getState().items).toEqual({
      "1": 1,
    });
  });

  it("increments the quantity of an existing product", () => {
    useCartStore.getState().addProduct("1");
    useCartStore.getState().addProduct("1");

    expect(useCartStore.getState().items).toEqual({
      "1": 2,
    });
  });

  it("stores different products independently", () => {
    useCartStore.getState().addProduct("1");
    useCartStore.getState().addProduct("4");

    expect(useCartStore.getState().items).toEqual({
      "1": 1,
      "4": 1,
    });
  });

  it("decreases a product quantity", () => {
    useCartStore.setState({
      items: {
        "1": 3,
      },
    });

    useCartStore.getState().decreaseProduct("1");

    expect(useCartStore.getState().items).toEqual({
      "1": 2,
    });
  });

  it("removes a product when decreasing from one", () => {
    useCartStore.setState({
      items: {
        "1": 1,
      },
    });

    useCartStore.getState().decreaseProduct("1");

    expect(useCartStore.getState().items).toEqual({});
  });

  it("removes only the selected product", () => {
    useCartStore.setState({
      items: {
        "1": 3,
        "4": 2,
      },
    });

    useCartStore.getState().removeProduct("1");

    expect(useCartStore.getState().items).toEqual({
      "4": 2,
    });
  });

  it("clears all products", () => {
    useCartStore.setState({
      items: {
        "1": 3,
        "4": 2,
      },
    });

    useCartStore.getState().clearCart();

    expect(useCartStore.getState().items).toEqual({});
  });
});
