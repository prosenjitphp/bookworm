"use client";

import React, { useState } from "react";
import { QrCodeIcon } from "@heroicons/react/24/outline";

interface UPIFormProps {
  payableAmount: number;
  onPay: (paymentMethod: "upi", giftPointsUsed?: number) => Promise<void>;
  loading: boolean;
}

export default function UPIForm({ payableAmount, onPay, loading }: UPIFormProps) {
  const [upiId, setUpiId] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmed = upiId.trim();
    if (!trimmed || !trimmed.includes("@")) {
      setError("Please enter a valid UPI ID (e.g., yourname@upi)");
      return;
    }

    await onPay("upi", 0);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-2.5 rounded-lg bg-rose-900/40 border border-rose-600/50 text-xs text-rose-200">
          {error}
        </div>
      )}

      <div>
        <label className="block text-xs font-medium text-slate-300 mb-1.5">
          UPI ID
        </label>
        <input
          type="text"
          value={upiId}
          onChange={(e) => setUpiId(e.target.value)}
          placeholder="yourname@upi"
          className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900/80 border border-slate-700 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />
        <p className="mt-1.5 text-xs text-slate-400">
          Supported apps: Google Pay, PhonePe, Paytm, BHIM, Amazon Pay
        </p>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full mt-4 flex items-center justify-center space-x-2 px-4 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-medium text-sm transition-colors shadow-md"
      >
        <QrCodeIcon className="h-5 w-5" />
        <span>{loading ? "Processing..." : `Pay Now ₹${payableAmount}`}</span>
      </button>
    </form>
  );
}
