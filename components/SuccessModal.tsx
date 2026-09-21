"use client";

import { useRouter } from "next/navigation";
import { CheckIcon, BookOpenIcon } from "@heroicons/react/24/solid";
import { Order } from "@/lib/types";
import PurchasedBookCard from "@/components/PurchasedBookCard";

interface SuccessModalProps {
  order: Order;
}

export default function SuccessModal({ order }: SuccessModalProps) {
  const router = useRouter();

  return (
    <div className="bg-[#1e2337] rounded-xl w-full max-w-3xl mx-4 p-8">
      {/* Green checkmark circle */}
      <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckIcon className="w-8 h-8 text-white" />
      </div>

      {/* Success text */}
      <p className="text-xl text-slate-100 text-center leading-relaxed">
        Your purchase of the
        <br />
        following reads is successful
      </p>

      {/* Purchased books grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
        {order.items.map((item) => (
          <PurchasedBookCard key={item.bookId} item={item} />
        ))}
      </div>

      {/* Continue Shopping button */}
      <button
        onClick={() => router.push("/")}
        className="w-full mt-6 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
      >
        <BookOpenIcon className="w-5 h-5" />
        Continue your Shopping
      </button>
    </div>
  );
}
