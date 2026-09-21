"use client";

import React, { useState } from "react";
import { CreditCardIcon } from "@heroicons/react/24/outline";

interface CardPaymentFormProps {
  payableAmount: number;
  paymentMethod: "credit_card" | "debit_card";
  onPay: (paymentMethod: "credit_card" | "debit_card", giftPointsUsed?: number) => Promise<void>;
  loading: boolean;
}

export default function CardPaymentForm({
  payableAmount,
  paymentMethod,
  onPay,
  loading,
}: CardPaymentFormProps) {
  const [cardNumber, setCardNumber] = useState("");
  const [nameOnCard, setNameOnCard] = useState("");
  const [cvv, setCvv] = useState("");
  const [expiry, setExpiry] = useState("");
  const [error, setError] = useState<string | null>(null);

  // Format card number with spaces every 4 digits
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "").slice(0, 16);
    const formatted = raw.match(/.{1,4}/g)?.join(" ") || raw;
    setCardNumber(formatted);
  };

  // Format expiry MM/YYYY
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value.replace(/\D/g, "").slice(0, 6);
    if (raw.length > 2) {
      raw = `${raw.slice(0, 2)}/${raw.slice(2)}`;
    }
    setExpiry(raw);
  };

  // CVV max 3 digits
  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "").slice(0, 3);
    setCvv(raw);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const digitsOnly = cardNumber.replace(/\s/g, "");
    if (digitsOnly.length < 16) {
      setError("Please enter a valid 16-digit card number");
      return;
    }
    if (!nameOnCard.trim()) {
      setError("Please enter name on card");
      return;
    }
    if (cvv.length < 3) {
      setError("Please enter a valid 3-digit CVV");
      return;
    }
    if (expiry.length < 7) {
      setError("Please enter expiry in MM/YYYY format");
      return;
    }

    await onPay(paymentMethod, 0);
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
          Card Number
        </label>
        <input
          type="text"
          value={cardNumber}
          onChange={handleCardNumberChange}
          placeholder="XXXX-XXXX-XXXX-XXXX"
          maxLength={19}
          className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900/80 border border-slate-700 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-slate-300 mb-1.5">
          Name on Card
        </label>
        <input
          type="text"
          value={nameOnCard}
          onChange={(e) => setNameOnCard(e.target.value)}
          placeholder="Name"
          className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900/80 border border-slate-700 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">
            CVV
          </label>
          <input
            type="password"
            value={cvv}
            onChange={handleCvvChange}
            placeholder="XXX"
            maxLength={3}
            className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900/80 border border-slate-700 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">
            Date of Expiry
          </label>
          <input
            type="text"
            value={expiry}
            onChange={handleExpiryChange}
            placeholder="MM/YYYY"
            maxLength={7}
            className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900/80 border border-slate-700 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full mt-2 flex items-center justify-center space-x-2 px-4 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-medium text-sm transition-colors shadow-md"
      >
        <CreditCardIcon className="h-5 w-5" />
        <span>{loading ? "Processing..." : `Pay Now ₹${payableAmount}`}</span>
      </button>
    </form>
  );
}
