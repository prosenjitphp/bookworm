"use client";

import { CartItem } from "@/lib/types";

function deliveryDate(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

interface CheckoutCartItemProps {
  item: CartItem;
  onRemove: (bookId: string) => void;
  onQtyChange: (bookId: string, qty: number) => void;
}

export default function CheckoutCartItem({
  item,
  onRemove,
  onQtyChange,
}: CheckoutCartItemProps) {
  return (
    <div className="bg-card border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row gap-4">
      {/* Cover image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.imageUrl}
        alt={item.title}
        className="w-full sm:w-[90px] sm:min-w-[90px] h-[180px] sm:h-[140px] object-cover rounded-lg bg-slate-900"
      />

      {/* Content */}
      <div className="flex flex-col flex-1 min-w-0 gap-2">
        {/* Title + remove */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-bold text-slate-100 text-sm leading-snug line-clamp-2">
            {item.title}
          </h3>
          <button
            onClick={() => onRemove(item.bookId)}
            aria-label="Remove item"
            className="shrink-0 text-slate-500 hover:text-red-400 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Author */}
        <p className="text-xs text-slate-400">
          by <span className="text-amber-400">{item.author}</span>
        </p>

        {/* Format + tags */}
        <p className="text-xs text-slate-400">{item.format}</p>
        {item.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {item.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="text-[11px] text-amber-400">{tag}</span>
            ))}
          </div>
        )}

        {/* Price + delivery + qty stepper */}
        <div className="flex items-center justify-between flex-wrap gap-2 mt-auto pt-2">
          <div>
            <span className="font-bold text-slate-100">₹{item.price}</span>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Delivery by {deliveryDate(item.deliveryDays)}
            </p>
          </div>

          {/* Qty stepper */}
          <div className="flex items-center gap-2 bg-slate-800 border border-slate-700 rounded-lg px-2 py-1">
            <button
              onClick={() => onQtyChange(item.bookId, Math.max(1, item.qty - 1))}
              aria-label="Decrease quantity"
              className="w-6 h-6 flex items-center justify-center text-slate-300 hover:text-white font-bold rounded hover:bg-slate-700 transition-colors"
            >
              −
            </button>
            <span className="min-w-[1.5rem] text-center text-sm text-slate-100 font-medium">
              {item.qty}
            </span>
            <button
              onClick={() => onQtyChange(item.bookId, Math.min(99, item.qty + 1))}
              aria-label="Increase quantity"
              className="w-6 h-6 flex items-center justify-center text-slate-300 hover:text-white font-bold rounded hover:bg-slate-700 transition-colors"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
