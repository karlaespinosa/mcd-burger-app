import "@testing-library/jest-dom/vitest";

import { cleanup } from "@testing-library/react";
import { afterEach, beforeEach, vi } from "vitest";

const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: vi.fn((key: string) => store[key] ?? null),

    setItem: vi.fn((key: string, value: string) => {
      store[key] = String(value);
    }),

    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),

    clear: vi.fn(() => {
      store = {};
    }),

    key: vi.fn((index: number) => {
      return Object.keys(store)[index] ?? null;
    }),

    get length() {
      return Object.keys(store).length;
    },
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
  configurable: true,
});

Object.defineProperty(globalThis, "localStorage", {
  value: localStorageMock,
  configurable: true,
});

beforeEach(() => {
  localStorageMock.clear();
  vi.clearAllMocks();
});

afterEach(() => {
  cleanup();
});
