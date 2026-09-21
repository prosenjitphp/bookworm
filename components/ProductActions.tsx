"use client";

import { useState, useCallback } from "react";
import { Book, CartItem } from "@/lib/types";
import { useCart } from "@/context/CartContext";
import Toast from "@/components/Toast";
import DeliveryBadge from "@/components/DeliveryBadge";
import {
  ShoppingCartIcon,
  BookmarkIcon,
  GlobeAltIcon,
  ShoppingBagIcon,
  StarIcon,
} from "@heroicons/react/24/solid";

interface ProductActionsProps {
  book: Book;
}

export default function ProductActions({ book }: ProductActionsProps) {
  const { addToCart } = useCart();
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const handleClose = useCallback(() => setToast(null), []);

  const handleAddToCart = () => {
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
    setToast({ message: "Added to cart!", type: "success" });
  };

  const handleAddToWishlist = () => {
    setToast({ message: "Added to wishlist!", type: "success" });
  };

  return (
    <>
      {/* Title & author */}
      <div className="space-y-1 mb-3">
        <h1 className="text-2xl font-bold text-slate-100">{book.title}</h1>
        <p className="text-slate-400">
          by{" "}
          <span className="text-amber-400 font-medium">{book.author}</span>
        </p>
        <p className="text-slate-400 italic text-sm">{book.tagline}</p>
      </div>

      {/* Publisher */}
      <p className="text-slate-400 text-sm mb-2">
        Published by:{" "}
        <span className="text-amber-400 cursor-pointer hover:underline">
          {book.brand}
        </span>
      </p>

      {/* Format */}
      <p className="text-slate-400 text-sm mb-2">{book.format}</p>

      {/* Category tags */}
      <div className="flex flex-wrap gap-2 mb-3">
        {book.tags.map((tag) => (
          <span
            key={tag}
            className="text-sm text-amber-400 hover:underline cursor-pointer"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Price */}
      <p className="text-2xl font-bold text-slate-100 mb-2">₹{book.price}</p>

      {/* Delivery */}
      <div className="mb-4">
        <DeliveryBadge deliveryDays={book.deliveryDays} />
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap gap-3 mb-5">
        <button
          onClick={handleAddToCart}
          className="flex items-center gap-2 px-5 py-2.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm transition-colors"
        >
          <ShoppingCartIcon className="w-5 h-5" />
          Add to Cart
        </button>
        <button
          onClick={handleAddToWishlist}
          className="flex items-center gap-2 px-5 py-2.5 rounded-md border border-slate-600 hover:border-amber-400 text-slate-200 hover:text-amber-400 font-medium text-sm transition-colors"
        >
          <BookmarkIcon className="w-5 h-5" />
          Add to Wishlist
        </button>
      </div>

      {/* Metadata row */}
      <div className="flex flex-wrap items-center gap-5 text-sm text-slate-400">
        {/* Language */}
        <span className="flex items-center gap-1.5">
          <GlobeAltIcon className="w-4 h-4" />
          {book.language}
        </span>

        {/* Rating */}
        <span className="flex items-center gap-1">
          {Array.from({ length: 5 }, (_, i) => (
            <StarIcon
              key={i}
              className={`w-4 h-4 ${
                i < Math.round(book.rating) ? "text-amber-400" : "text-slate-600"
              }`}
            />
          ))}
          <span className="ml-1">{book.rating}</span>
        </span>

        {/* Sells */}
        <span className="flex items-center gap-1.5">
          <ShoppingBagIcon className="w-4 h-4" />
          {book.sells.toLocaleString()} copies sold
        </span>
      </div>

      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={handleClose} />
      )}
    </>
  );
}
