import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { AddToCartButton } from "@/components";
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

  it("renders the quantity stepper and add to cart button", () => {
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

    expect(
      screen.getByRole("button", {
        name: `Add quantity of ${mockProduct.name}`,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: `Remove quantity of ${mockProduct.name}`,
      }),
    ).toBeInTheDocument();

    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("adds one product by default", async () => {
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

  it("increases the quantity before adding the product", async () => {
    const user = userEvent.setup();

    render(
      <AddToCartButton
        productId={mockProduct.id}
        productName={mockProduct.name}
      />,
    );

    const incrementButton = screen.getByRole("button", {
      name: `Add quantity of ${mockProduct.name}`,
    });

    await user.click(incrementButton);
    await user.click(incrementButton);

    expect(screen.getByText("3")).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", {
        name: /add to cart/i,
      }),
    );

    expect(useCartStore.getState().items).toEqual({
      [mockProduct.id]: 3,
    });
  });

  it("decreases the selected quantity", async () => {
    const user = userEvent.setup();

    render(
      <AddToCartButton
        productId={mockProduct.id}
        productName={mockProduct.name}
      />,
    );

    await user.click(
      screen.getByRole("button", {
        name: `Add quantity of ${mockProduct.name}`,
      }),
    );

    expect(screen.getByText("2")).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", {
        name: `Remove quantity of ${mockProduct.name}`,
      }),
    );

    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("does not decrease the quantity below one", async () => {
    const user = userEvent.setup();

    render(
      <AddToCartButton
        productId={mockProduct.id}
        productName={mockProduct.name}
      />,
    );

    await user.click(
      screen.getByRole("button", {
        name: `Remove quantity of ${mockProduct.name}`,
      }),
    );

    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("shows a success toast with the selected quantity", async () => {
    const user = userEvent.setup();

    render(
      <AddToCartButton
        productId={mockProduct.id}
        productName={mockProduct.name}
      />,
    );

    const incrementButton = screen.getByRole("button", {
      name: `Add quantity of ${mockProduct.name}`,
    });

    await user.click(incrementButton);
    await user.click(incrementButton);

    await user.click(
      screen.getByRole("button", {
        name: /add to cart/i,
      }),
    );

    expect(toastSuccessMock).toHaveBeenCalledOnce();

    expect(toastSuccessMock).toHaveBeenCalledWith(
      `3 ${mockProduct.name} added to your cart.`,
    );
  });
});
