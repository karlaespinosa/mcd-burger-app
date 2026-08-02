import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { CartItem } from "@/components/cart/CartItem";
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

vi.mock("next/image", () => ({
  default: ({ alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img alt={alt} {...props} />
  ),
}));

describe("CartItem", () => {
  beforeEach(() => {
    toastSuccessMock.mockClear();

    useCartStore.setState({
      items: {
        [mockProduct.id]: 2,
      },
      hasHydrated: true,
    });
  });

  it("renders the product information", () => {
    render(<CartItem product={mockProduct} quantity={2} />);

    expect(
      screen.getByRole("heading", {
        name: mockProduct.name,
      }),
    ).toBeInTheDocument();

    expect(screen.getByText("$4.99 each")).toBeInTheDocument();

    expect(screen.getByText("$9.98")).toBeInTheDocument();

    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("increases the product quantity", async () => {
    const user = userEvent.setup();

    render(<CartItem product={mockProduct} quantity={2} />);

    await user.click(
      screen.getByRole("button", {
        name: `Increase quantity of ${mockProduct.name}`,
      }),
    );

    expect(useCartStore.getState().items[mockProduct.id]).toBe(3);
  });

  it("decreases the product quantity", async () => {
    const user = userEvent.setup();

    render(<CartItem product={mockProduct} quantity={2} />);

    await user.click(
      screen.getByRole("button", {
        name: `Decrease quantity of ${mockProduct.name}`,
      }),
    );

    expect(useCartStore.getState().items[mockProduct.id]).toBe(1);
  });

  it("removes the product from the cart", async () => {
    const user = userEvent.setup();

    render(<CartItem product={mockProduct} quantity={2} />);

    await user.click(
      screen.getByRole("button", {
        name: `Remove ${mockProduct.name} from cart`,
      }),
    );

    expect(useCartStore.getState().items[mockProduct.id]).toBeUndefined();
  });

  it("shows a toast after removing the product", async () => {
    const user = userEvent.setup();

    render(<CartItem product={mockProduct} quantity={2} />);

    await user.click(
      screen.getByRole("button", {
        name: `Remove ${mockProduct.name} from cart`,
      }),
    );

    expect(toastSuccessMock).toHaveBeenCalledTimes(1);
  });
});
