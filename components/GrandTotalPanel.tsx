"use client";

import { useState } from "react";
import { CreditCardIcon } from "@heroicons/react/24/solid";

const COUPON_CODE = "BOOK100";
const COUPON_DISCOUNT = 100;

interface GrandTotalPanelProps {
  subtotal: number;
  itemCount: number;
  onPayNow: () => void;
  isFormValid: boolean;
  onCouponApply: (discount: number) => void;
  appliedDiscount: number;
}

export default function GrandTotalPanel({
  subtotal,
  itemCount,
  onPayNow,
  isFormValid,
  onCouponApply,
  appliedDiscount,
}: GrandTotalPanelProps) {
  const [couponInput, setCouponInput] = useState("");
  const [couponError, setCouponError] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);

  const tax = Math.round(subtotal * 0.12);
  const total = subtotal + tax - appliedDiscount;

  function handleApplyCoupon() {
    if (couponInput.trim().toUpperCase() === COUPON_CODE) {
      onCouponApply(COUPON_DISCOUNT);
      setCouponApplied(true);
      setCouponError("");
    } else {
      setCouponError("Invalid coupon code");
      setTimeout(() => setCouponError(""), 3000);
    }
  }

  function fmt(n: number) {
    return `₹${n.toFixed(2)}`;
  }

  return (
    <div className="bg-card border border-slate-800 rounded-xl overflow-hidden sticky top-4">
      {/* Decorative illustration */}
      <div className="bg-blue-900 h-48 flex flex-col items-center justify-center gap-2">
        <span className="text-6xl select-none" role="img" aria-label="Books">📚</span>
        <p className="text-blue-200 text-sm font-medium">Your selected reads</p>
      </div>

      {/* Line items */}
      <div className="p-4 space-y-3">
        {/* Price (N items) */}
        <div className="flex justify-between text-sm text-slate-300">
          <span>Price ({itemCount} item{itemCount !== 1 ? "s" : ""})</span>
          <span>{fmt(subtotal)}</span>
        </div>

        {/* Tax */}
        <div className="flex justify-between text-sm text-slate-300">
          <span>Tax (12%)</span>
          <span>{fmt(tax)}</span>
        </div>

        {/* Delivery */}
        <div className="flex justify-between text-sm text-slate-300">
          <span>Delivery Charges</span>
          <span className="text-green-400 font-medium">Free</span>
        </div>

        <hr className="border-slate-700" />

        {/* Coupon */}
        <div className="space-y-1">
          <div className="flex gap-2">
            <input
              value={couponInput}
              onChange={(e) => setCouponInput(e.target.value)}
              placeholder="Enter coupon code"
              disabled={couponApplied}
              className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 text-sm focus:outline-none focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <button
              onClick={handleApplyCoupon}
              disabled={couponApplied || !couponInput.trim()}
              className="px-3 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm rounded-lg font-medium transition-colors"
            >
              Apply
            </button>
          </div>
          {couponError && (
            <p className="text-xs text-red-400">{couponError}</p>
          )}
          {couponApplied && (
            <p className="text-xs text-green-400">Coupon applied!</p>
          )}
        </div>

        {/* Discount (only when applied) */}
        {appliedDiscount > 0 && (
          <div className="flex justify-between text-sm text-green-400">
            <span>Discount</span>
            <span>−{fmt(appliedDiscount)}</span>
          </div>
        )}

        <hr className="border-slate-700" />

        {/* Total Amount */}
        <div className="flex justify-between text-base font-bold text-slate-100">
          <span>Total Amount</span>
          <span>{fmt(total)}</span>
        </div>

        {/* Pay Now */}
        <button
          onClick={onPayNow}
          disabled={!isFormValid}
          className="w-full mt-2 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-colors"
        >
          <CreditCardIcon className="h-5 w-5" />
          Pay Now
        </button>
        {!isFormValid && (
          <p className="text-xs text-slate-500 text-center">
            Complete the address form to continue
          </p>
        )}
      </div>
    </div>
  );
}
