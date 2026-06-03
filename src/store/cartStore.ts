"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "@/types";

interface CartState {
  items: CartItem[];
  couponCode: string | null;
  couponDiscount: number;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string, discount: number) => void;
  removeCoupon: () => void;
  getItemCount: () => number;
  getSubtotal: () => number;
  getTotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      couponCode: null,
      couponDiscount: 0,

      addItem: (item) => {
        // Ensure price and comparePrice are numbers (Prisma Decimal serialization fix)
        const sanitizedItem = {
          ...item,
          price: Number(item.price),
          comparePrice: item.comparePrice ? Number(item.comparePrice) : undefined
        };

        set((state) => {
          const existing = state.items.find((i) => i.id === sanitizedItem.id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === sanitizedItem.id
                  ? { ...i, quantity: Math.min(i.quantity + sanitizedItem.quantity, i.stock) }
                  : i
              ),
            };
          }
          return { items: [...state.items, sanitizedItem] };
        });
      },

      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        }));
      },

      updateQuantity: (id, quantity) => {
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id ? { ...i, quantity: Math.max(1, Math.min(quantity, i.stock)) } : i
          ),
        }));
      },

      clearCart: () => {
        set({ items: [], couponCode: null, couponDiscount: 0 });
      },

      applyCoupon: (code, discount) => {
        set({ couponCode: code, couponDiscount: discount });
      },

      removeCoupon: () => {
        set({ couponCode: null, couponDiscount: 0 });
      },

      getItemCount: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },

      getSubtotal: () => {
        return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      },

      getTotal: () => {
        const subtotal = get().getSubtotal();
        const discount = get().couponDiscount;
        return Math.max(0, subtotal - discount);
      },
    }),
    {
      name: "techstore-cart",
    }
  )
);
