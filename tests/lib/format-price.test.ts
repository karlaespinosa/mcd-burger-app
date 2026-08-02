import { describe, expect, it } from "vitest";

import { formatPrice } from "@/lib/format-price";

describe("formatPrice", () => {
  it("formats cents as US dollars", () => {
    expect(formatPrice(499)).toBe("$4.99");
  });

  it("formats zero cents", () => {
    expect(formatPrice(0)).toBe("$0.00");
  });

  it("formats a cart subtotal", () => {
    expect(formatPrice(1598)).toBe("$15.98");
  });
});
