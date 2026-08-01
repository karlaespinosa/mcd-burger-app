export type CartItems = Record<string, number>;

export interface CartStore {
  items: CartItems;
  hasHydrated: boolean;

  addProduct: (productId: string) => void;
  decreaseProduct: (productId: string) => void;
  removeProduct: (productId: string) => void;
  clearCart: () => void;

  setHasHydrated: (hasHydrated: boolean) => void;
}
