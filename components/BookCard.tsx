"use client";

import { useState } from "react";
import Link from "next/link";
import { Book, CartItem } from "@/lib/types";
import { useCart } from "@/context/CartContext";
import Toast from "@/components/Toast";

function deliveryDate(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  const { addToCart } = useCart();
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const item: CartItem = {
      bookId: book.id,
      title: book.title,
      author: book.author,
      price: book.price,
      qty: 1,
      imageUrl: book.imageUrl,
      deliveryDays: book.deliveryDays,
      format: book.format,
      tags: book.tags,
      category: book.category,
    };
    addToCart(item);
    setToast({ message: `"${book.title}" added to cart!`, type: "success" });
  };

  return (
    <>
      <Link
        href={`/product/${book.id}`}
        className="group flex flex-row bg-card border border-slate-800 rounded-lg overflow-hidden hover:border-slate-600 hover:shadow-lg transition-all"
      >
        {/* Cover image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={book.imageUrl}
          alt={book.title}
          className="w-[120px] shrink-0 object-cover self-stretch bg-slate-900"
        />

        {/* Card content */}
        <div className="flex flex-col justify-between flex-1 p-3 min-w-0">
          <div className="space-y-1">
            {/* Title */}
            <h3 className="font-bold text-slate-100 text-sm leading-snug line-clamp-2">
              {book.title}
            </h3>

            {/* Author */}
            <p className="text-xs text-slate-400">
              by{" "}
              <span className="text-amber-400 hover:underline">
                {book.author}
              </span>
            </p>

            {/* Description */}
            <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
              {book.description}
            </p>

            {/* Format */}
            <p className="text-xs text-slate-400">{book.format}</p>

            {/* Category tags */}
            {book.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 pt-0.5">
                {book.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] text-amber-400 hover:underline cursor-pointer"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Price + delivery + Add to Cart */}
          <div className="mt-3 space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-100 text-sm">₹{book.price}</span>
              <button
                type="button"
                aria-label={`Add ${book.title} to cart`}
                className="opacity-0 group-hover:opacity-100 text-[11px] px-2.5 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white font-medium transition-all focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            </div>
            <p className="text-[11px] text-slate-400">
              Delivery by {deliveryDate(book.deliveryDays)}
            </p>
          </div>
        </div>
      </Link>

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
