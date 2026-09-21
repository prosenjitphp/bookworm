"use client";

import { useEffect, useState } from "react";
import BookCard from "@/components/BookCard";
import { Book, Order } from "@/lib/types";

export default function RecommendedSection() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        // Read bw_orders from localStorage to get categories from past orders
        let url = "/api/books?featured=true";

        const raw = localStorage.getItem("bw_orders");
        if (raw) {
          const orders: Order[] = JSON.parse(raw);
          const categories = Array.from(
            new Set(orders.flatMap((o) => o.items.map((i) => i.category)))
          );
          if (categories.length > 0) {
            url = `/api/books?category=${encodeURIComponent(categories[0])}`;
          }
        }

        const res = await fetch(url);
        if (!res.ok) throw new Error("fetch failed");
        const data: Book[] = await res.json();
        setBooks(data.slice(0, 8));
      } catch {
        setBooks([]);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  if (loading) {
    return (
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-2">
          Recommended for You
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-36 bg-card rounded-lg border border-slate-800 animate-pulse"
            />
          ))}
        </div>
      </section>
    );
  }

  if (books.length === 0) return null;

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-2">
        Recommended for You
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </section>
  );
}
