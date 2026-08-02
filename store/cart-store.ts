import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { CartStore } from "@/types/cart";
import { CART_STORAGE_KEY } from "@/constants/store";

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: {},
      hasHydrated: false,

      addProduct: (productId) =>
        set((state) => ({
          items: {
            ...state.items,
            [productId]: (state.items[productId] ?? 0) + 1,
          },
        })),

      addProductsBatch: (productId, quantity) =>
        set((state) => ({
          items: {
            ...state.items,
            [productId]: (state.items[productId] ?? 0) + quantity,
          },
        })),

      decreaseProduct: (productId) =>
        set((state) => {
          const currentQuantity = state.items[productId] ?? 0;

          if (currentQuantity <= 1) {
            const nextItems = { ...state.items };
            delete nextItems[productId];

            return {
              items: nextItems,
            };
          }

          return {
            items: {
              ...state.items,
              [productId]: currentQuantity - 1,
            },
          };
        }),

      removeProduct: (productId) =>
        set((state) => {
          const nextItems = { ...state.items };
          delete nextItems[productId];

          return {
            items: nextItems,
          };
        }),

      clearCart: () =>
        set({
          items: {},
        }),

      setHasHydrated: (hasHydrated) =>
        set({
          hasHydrated,
        }),
    }),
    {
      name: CART_STORAGE_KEY,

      partialize: (state) => ({
        items: state.items,
      }),

      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
