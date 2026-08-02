import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { ProductCard } from "@/components";
import { mockProduct } from "@/tests/mocks/product";

vi.mock("next/image", () => ({
  default: ({ src, alt }: { src: string; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} />
  ),
}));

vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
    children: React.ReactNode;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe("ProductCard", () => {
  it("renders the product information", () => {
    render(<ProductCard product={mockProduct} />);

    expect(
      screen.getByRole("heading", {
        name: mockProduct.name,
      }),
    ).toBeInTheDocument();

    expect(screen.getByText("$4.99")).toBeInTheDocument();

    expect(screen.getByText(mockProduct.description)).toBeInTheDocument();

    expect(
      screen.getByText(`🔥 ${mockProduct.calorie} Cal`),
    ).toBeInTheDocument();
  });

  it("renders the product image with an accessible alt text", () => {
    render(<ProductCard product={mockProduct} />);

    const image = screen.getByRole("img", {
      name: mockProduct.name,
    });

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", mockProduct.image);
  });

  it("links to the product details page using the slug", () => {
    render(<ProductCard product={mockProduct} />);

    const link = screen.getByRole("link", {
      name: new RegExp(mockProduct.name, "i"),
    });

    expect(link).toHaveAttribute("href", `/products/${mockProduct.slug}`);
  });
});
