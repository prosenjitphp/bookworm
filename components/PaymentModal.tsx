"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Tab } from "@headlessui/react";
import { useCart } from "@/context/CartContext";
import CardPaymentForm from "@/components/CardPaymentForm";
import UPIForm from "@/components/UPIForm";
import WalletForm from "@/components/WalletForm";
import Toast from "@/components/Toast";

interface PaymentModalProps {
  payableAmount: number;
}

const TABS = [
  { id: "credit_card", label: "Credit Card" },
  { id: "debit_card", label: "Debit card" },
  { id: "upi", label: "UPI" },
  { id: "wallet", label: "Wallet" },
];

export default function PaymentModal({ payableAmount }: PaymentModalProps) {
  const router = useRouter();
  const { cart, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const handlePay = async (
    paymentMethod: "credit_card" | "debit_card" | "upi" | "wallet",
    giftPointsUsed: number = 0
  ) => {
    setLoading(true);

    try {
      let rawAddress = null;
      let rawTotal = null;

      if (typeof window !== "undefined") {
        rawAddress = sessionStorage.getItem("checkout_address");
        rawTotal = sessionStorage.getItem("checkout_total");
      }

      const address = rawAddress ? JSON.parse(rawAddress) : null;
      const total = rawTotal ? Number(rawTotal) : payableAmount;

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cart,
          address,
          paymentMethod,
          giftPointsUsed,
          total,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Payment failed");
      }

      // 1. Clear cart
      clearCart();

      // 2. Persist order in bw_orders localStorage array
      if (typeof window !== "undefined") {
        try {
          const existing = JSON.parse(localStorage.getItem("bw_orders") || "[]");
          const updatedOrders = [
            {
              id: data.orderId,
              items: cart,
              address,
              paymentMethod,
              giftPointsUsed,
              total,
              status: "confirmed",
              createdAt: new Date().toISOString(),
            },
            ...existing,
          ];
          localStorage.setItem("bw_orders", JSON.stringify(updatedOrders));
        } catch {
          // ignore localStorage parsing errors
        }
      }

      // 3. Redirect to confirmation page
      router.push(`/checkout/confirmation/${data.orderId}`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Payment failed. Please try again.";
      setToast({ message: msg, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-[#1e2337] rounded-xl w-full max-w-2xl mx-4 shadow-2xl border border-slate-700/80 overflow-hidden">
        {/* Header row */}
        <div className="p-4 sm:p-5 border-b border-slate-700 flex items-center justify-between bg-slate-900/40">
          <h2 className="text-lg font-semibold text-slate-100">Complete Payment</h2>
          <span className="text-base sm:text-lg font-bold text-slate-100">
            Payable Amount: <span className="text-amber-400">₹{payableAmount}</span>
          </span>
        </div>

        {/* Body: Two-column layout with Headless UI Tabs */}
        <Tab.Group>
          <div className="flex flex-col md:flex-row min-h-[340px]">
            {/* Left Tab List (~35% width) */}
            <Tab.List className="w-full md:w-[35%] border-b md:border-b-0 md:border-r border-slate-700 p-2 sm:p-4 flex flex-row md:flex-col gap-1 sm:gap-2 bg-slate-900/20">
              {TABS.map((tab) => (
                <Tab
                  key={tab.id}
                  className={({ selected }) =>
                    `px-4 py-3 text-sm text-left w-full rounded-md transition-all font-medium focus:outline-none ${
                      selected
                        ? "border-l-4 border-blue-500 bg-white/10 text-slate-100 shadow-sm"
                        : "text-slate-400 hover:text-slate-200 hover:bg-white/5 border-l-4 border-transparent"
                    }`
                  }
                >
                  {tab.label}
                </Tab>
              ))}
            </Tab.List>

            {/* Right Form Panels (~65% width) */}
            <Tab.Panels className="flex-1 p-5 sm:p-6 bg-[#1e2337]">
              {/* Credit Card */}
              <Tab.Panel className="focus:outline-none">
                <CardPaymentForm
                  payableAmount={payableAmount}
                  paymentMethod="credit_card"
                  onPay={handlePay}
                  loading={loading}
                />
              </Tab.Panel>

              {/* Debit Card */}
              <Tab.Panel className="focus:outline-none">
                <CardPaymentForm
                  payableAmount={payableAmount}
                  paymentMethod="debit_card"
                  onPay={handlePay}
                  loading={loading}
                />
              </Tab.Panel>

              {/* UPI */}
              <Tab.Panel className="focus:outline-none">
                <UPIForm
                  payableAmount={payableAmount}
                  onPay={handlePay}
                  loading={loading}
                />
              </Tab.Panel>

              {/* Wallet */}
              <Tab.Panel className="focus:outline-none">
                <WalletForm
                  payableAmount={payableAmount}
                  onPay={handlePay}
                  loading={loading}
                />
              </Tab.Panel>
            </Tab.Panels>
          </div>
        </Tab.Group>
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
}
