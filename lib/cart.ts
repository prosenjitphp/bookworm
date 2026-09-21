import { CartItem } from "./types";

const CART_KEY = "bw_cart";

export function getCart(): CartItem[] {
  if (typeof window === "undefined") {
    return [];
  }
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch (err) {
    console.error("Failed to read cart from localStorage:", err);
    return [];
  }
}

function saveCart(cart: CartItem[]): void {
  if (typeof window === "undefined") {
    return;
  }
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  } catch (err) {
    console.error("Failed to save cart to localStorage:", err);
  }
}

export function addToCart(item: CartItem): CartItem[] {
  const current = getCart();
  const existingIndex = current.findIndex((i) => i.bookId === item.bookId);

  let updated: CartItem[];
  if (existingIndex > -1) {
    updated = current.map((i, idx) =>
      idx === existingIndex ? { ...i, qty: i.qty + item.qty } : i
    );
  } else {
    updated = [...current, item];
  }

  saveCart(updated);
  return updated;
}

export function removeFromCart(bookId: string): CartItem[] {
  const current = getCart();
  const updated = current.filter((i) => i.bookId !== bookId);
  saveCart(updated);
  return updated;
}

export function updateQty(bookId: string, qty: number): CartItem[] {
  const current = getCart();
  let updated: CartItem[];
  if (qty <= 0) {
    updated = current.filter((i) => i.bookId !== bookId);
  } else {
    updated = current.map((i) => (i.bookId === bookId ? { ...i, qty } : i));
  }
  saveCart(updated);
  return updated;
}

export function clearCart(): CartItem[] {
  if (typeof window !== "undefined") {
    try {
      localStorage.removeItem(CART_KEY);
    } catch (err) {
      console.error("Failed to clear cart in localStorage:", err);
    }
  }
  return [];
}
