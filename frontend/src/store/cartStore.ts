import { create } from 'zustand';

type Item = { productId: string; title: string; price: number; quantity: number; resellerMargin?: number };

type CartState = {
  items: Item[];
  addItem: (item: Item) => void;
  clear: () => void;
};

export const useCartStore = create<CartState>((set) => ({
  items: [],
  addItem: (item) =>
    set((state) => {
      const existing = state.items.find((i) => i.productId === item.productId);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.productId === item.productId ? { ...i, quantity: i.quantity + item.quantity } : i
          )
        };
      }
      return { items: [...state.items, item] };
    }),
  clear: () => set({ items: [] })
}));
