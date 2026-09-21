"use client";

import React, { useState, useEffect } from "react";
import { WalletIcon } from "@heroicons/react/24/outline";

interface WalletFormProps {
  payableAmount: number;
  onPay: (paymentMethod: "wallet", giftPointsUsed?: number) => Promise<void>;
  loading: boolean;
}

export default function WalletForm({
  payableAmount,
  onPay,
  loading,
}: WalletFormProps) {
  const [balance, setBalance] = useState<number>(200);
  const [redeemAmount, setRedeemAmount] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/gift-points")
      .then((res) => res.json())
      .then((data) => {
        if (typeof data.points === "number") {
          setBalance(data.points);
          // Default redeem amount = max redeemable
          setRedeemAmount(Math.min(data.points, payableAmount));
        }
      })
      .catch(() => {
        // keep fallback mock
        setRedeemAmount(Math.min(200, payableAmount));
      });
  }, [payableAmount]);

  const maxRedeemable = Math.min(balance, payableAmount);
  const remainingToPay = Math.max(0, payableAmount - redeemAmount);

  const handleRedeemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    if (isNaN(val)) return;
    if (val < 0) {
      setRedeemAmount(0);
    } else if (val > maxRedeemable) {
      setRedeemAmount(maxRedeemable);
    } else {
      setRedeemAmount(val);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (redeemAmount <= 0 && payableAmount > 0) {
      setError("Please specify points to redeem or select another payment method");
      return;
    }

    await onPay("wallet", redeemAmount);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-2.5 rounded-lg bg-rose-900/40 border border-rose-600/50 text-xs text-rose-200">
          {error}
        </div>
      )}

      {/* Wallet Balance Display */}
      <div className="p-3.5 rounded-lg bg-slate-900/80 border border-slate-700 flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 rounded-md bg-amber-500/20 text-amber-400">
            <WalletIcon className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs text-slate-400">Available Wallet Balance</p>
            <p className="text-base font-bold text-slate-100">₹{balance}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setRedeemAmount(maxRedeemable)}
          className="text-xs text-blue-400 hover:text-blue-300 font-medium"
        >
          Max Out
        </button>
      </div>

      {/* Amount to Redeem Input */}
      <div>
        <label className="block text-xs font-medium text-slate-300 mb-1.5">
          Amount to redeem from wallet (Max: ₹{maxRedeemable})
        </label>
        <div className="relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-sm">
            ₹
          </span>
          <input
            type="number"
            min={0}
            max={maxRedeemable}
            value={redeemAmount || ""}
            onChange={handleRedeemChange}
            placeholder="0"
            className="w-full pl-8 pr-3.5 py-2.5 rounded-lg bg-slate-900/80 border border-slate-700 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>
      </div>

      {/* Breakdown / Remaining balance notice */}
      <div className="p-3 rounded-lg bg-slate-800/60 border border-slate-700/60 space-y-1.5 text-xs">
        <div className="flex justify-between text-slate-300">
          <span>Payable Amount:</span>
          <span className="font-medium text-slate-100">₹{payableAmount}</span>
        </div>
        <div className="flex justify-between text-emerald-400">
          <span>Wallet Points Redeemed:</span>
          <span className="font-medium">-₹{redeemAmount}</span>
        </div>
        <div className="pt-1.5 border-t border-slate-700 flex justify-between text-slate-200 font-semibold">
          <span>Amount to pay by other method:</span>
          <span className="text-amber-400">₹{remainingToPay}</span>
        </div>
      </div>

      {remainingToPay > 0 && (
        <p className="text-xs text-slate-400 italic">
          Note: Redeeming points will apply towards your order total.
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full mt-2 flex items-center justify-center space-x-2 px-4 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-medium text-sm transition-colors shadow-md"
      >
        <WalletIcon className="h-5 w-5" />
        <span>
          {loading
            ? "Processing..."
            : remainingToPay === 0
            ? "Pay Full with Wallet"
            : `Pay Now (Redeem ₹${redeemAmount})`}
        </span>
      </button>
    </form>
  );
}
