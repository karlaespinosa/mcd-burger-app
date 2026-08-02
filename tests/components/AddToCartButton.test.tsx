import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { AddToCartButton } from "@/components/products/AddToCartButton";
import { useCartStore } from "@/store/cart-store";
import { mockProduct } from "@/tests/mocks/product";

const { toastSuccessMock } = vi.hoisted(() => ({
  toastSuccessMock: vi.fn(),
}));

vi.mock("sonner", () => ({
  toast: {
    success: toastSuccessMock,
  },
}));

describe("AddToCartButton", () => {
  beforeEach(() => {
    toastSuccessMock.mockClear();

    useCartStore.setState({
      items: {},
      hasHydrated: true,
    });
  });

  it("renders the add to cart button", () => {
    render(
      <AddToCartButton
        productId={mockProduct.id}
        productName={mockProduct.name}
      />,
    );

    expect(
      screen.getByRole("button", {
        name: /add to cart/i,
      }),
    ).toBeInTheDocument();
  });

  it("adds the product when clicked", async () => {
    const user = userEvent.setup();

    render(
      <AddToCartButton
        productId={mockProduct.id}
        productName={mockProduct.name}
      />,
    );

    await user.click(
      screen.getByRole("button", {
        name: /add to cart/i,
      }),
    );

    expect(useCartStore.getState().items).toEqual({
      [mockProduct.id]: 1,
    });
  });

  it("shows a success toast after adding the product", async () => {
    const user = userEvent.setup();

    render(
      <AddToCartButton
        productId={mockProduct.id}
        productName={mockProduct.name}
      />,
    );

    await user.click(
      screen.getByRole("button", {
        name: /add to cart/i,
      }),
    );

    expect(toastSuccessMock).toHaveBeenCalledWith(
      `${mockProduct.name} added to your cart.`,
    );
  });
});
