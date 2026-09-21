"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { CartItem } from "@/lib/types";
import * as cartUtil from "@/lib/cart";

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (bookId: string) => void;
  updateQty: (bookId: string, qty: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setCart(cartUtil.getCart());
    setHydrated(true);
  }, []);

  const addToCart = (item: CartItem) => {
    const updated = cartUtil.addToCart(item);
    setCart(updated);
  };

  const removeFromCart = (bookId: string) => {
    const updated = cartUtil.removeFromCart(bookId);
    setCart(updated);
  };

  const updateQty = (bookId: string, qty: number) => {
    const updated = cartUtil.updateQty(bookId, qty);
    setCart(updated);
  };

  const clearCart = () => {
    const updated = cartUtil.clearCart();
    setCart(updated);
  };

  const itemCount = hydrated
    ? cart.reduce((total, item) => total + item.qty, 0)
    : 0;

  const subtotal = hydrated
    ? cart.reduce((total, item) => total + item.price * item.qty, 0)
    : 0;

  return (
    <CartContext.Provider
      value={{
        cart: hydrated ? cart : [],
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        itemCount,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
