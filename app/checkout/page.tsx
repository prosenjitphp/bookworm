"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { Address } from "@/lib/types";
import Breadcrumb from "@/components/Breadcrumb";
import Toast from "@/components/Toast";
import CheckoutCartItem from "@/components/CheckoutCartItem";
import AddressForm from "@/components/AddressForm";
import GrandTotalPanel from "@/components/GrandTotalPanel";

const BREADCRUMB = [
  { label: "Home", href: "/" },
  { label: "Non-Fiction", href: "/catalogue?category=non-fiction" },
  { label: "Self Help", href: "/catalogue?category=self-help" },
  { label: "Joy of Minimalism", href: "#" },
  { label: "Checkout" },
];

type AddressFields = Omit<Address, "id" | "userId">;

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidAddress(addr: Partial<AddressFields>): boolean {
  return !!(
    addr.firstName?.trim() &&
    addr.lastName?.trim() &&
    addr.addressLine?.trim() &&
    addr.email?.trim() &&
    isValidEmail(addr.email) &&
    addr.city?.trim() &&
    addr.pin?.trim() &&
    /^\d{6}$/.test(addr.pin) &&
    addr.phone?.trim() &&
    addr.state?.trim() &&
    addr.country?.trim()
  );
}

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, removeFromCart, updateQty, subtotal, itemCount } = useCart();

  const [savedAddress, setSavedAddress] = useState<Address | undefined>(undefined);
  const [address, setAddress] = useState<Partial<AddressFields>>({});
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  // Redirect if cart is empty (after hydration)
  useEffect(() => {
    if (cart.length === 0) {
      router.replace("/");
    }
  }, [cart, router]);

  // Fetch saved address
  useEffect(() => {
    fetch("/api/addresses")
      .then((r) => r.json())
      .then((data) => {
        if (data.address) {
          setSavedAddress(data.address as Address);
        }
      })
      .catch(() => {
        // silently ignore — user just won't have a saved address
      });
  }, []);

  const formValid = isValidAddress(address);

  function handlePayNow() {
    if (!formValid) return;

    const tax = Math.round(subtotal * 0.12);
    const total = subtotal + tax - appliedDiscount;

    sessionStorage.setItem("checkout_address", JSON.stringify(address));
    sessionStorage.setItem("checkout_total", String(total));

    router.push("/checkout/payment");
  }

  function handleCouponApply(discount: number) {
    setAppliedDiscount(discount);
  }

  function showToast(message: string, type: "success" | "error") {
    setToast({ message, type });
  }

  // Expose showToast for invalid coupon via GrandTotalPanel
  // (GrandTotalPanel handles its own coupon error inline — no toast needed here)
  void showToast;

  if (cart.length === 0) {
    return null; // will redirect
  }

  return (
    <div className="space-y-6">
      <Breadcrumb items={BREADCRUMB} />

      <h1 className="text-2xl font-bold text-slate-100 mb-6">Shopping Cart</h1>

      {/* Cart items — 2 per row on md+, stacked on mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cart.map((item) => (
          <CheckoutCartItem
            key={item.bookId}
            item={item}
            onRemove={removeFromCart}
            onQtyChange={updateQty}
          />
        ))}
      </div>

      {/* Two-column section: Address (60%) + Grand Total (40%) */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Address form — ~60% */}
        <div className="flex-1 lg:basis-3/5 bg-card border border-slate-800 rounded-xl p-6">
          <AddressForm
            onAddressChange={setAddress}
            savedAddress={savedAddress}
          />
        </div>

        {/* Grand Total panel — ~40% */}
        <div className="lg:basis-2/5">
          <GrandTotalPanel
            subtotal={subtotal}
            itemCount={itemCount}
            onPayNow={handlePayNow}
            isFormValid={formValid}
            onCouponApply={handleCouponApply}
            appliedDiscount={appliedDiscount}
          />
        </div>
      </div>

      {/* Toast notifications */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
