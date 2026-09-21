"use client";

import { useState, useMemo } from "react";
import { Book } from "@/lib/types";
import BookCard from "@/components/BookCard";
import FilterToolbar, { FilterState } from "@/components/FilterToolbar";
import Breadcrumb from "@/components/Breadcrumb";

interface BrandBooksProps {
  brandName: string;
  initialBooks: Book[];
}

export default function BrandBooks({ brandName, initialBooks }: BrandBooksProps) {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    language: "",
    format: "",
    price: "",
    sort: "",
  });

  const filtered = useMemo(() => {
    let result = [...initialBooks];

    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.author.toLowerCase().includes(q)
      );
    }

    if (filters.language) {
      result = result.filter(
        (b) => b.language.toLowerCase() === filters.language.toLowerCase()
      );
    }

    if (filters.format) {
      result = result.filter(
        (b) => b.format.toLowerCase() === filters.format.toLowerCase()
      );
    }

    if (filters.price === "under200") {
      result = result.filter((b) => b.price < 200);
    } else if (filters.price === "200-500") {
      result = result.filter((b) => b.price >= 200 && b.price <= 500);
    } else if (filters.price === "above500") {
      result = result.filter((b) => b.price > 500);
    }

    if (filters.sort === "price_asc") {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (filters.sort === "price_desc") {
      result = [...result].sort((a, b) => b.price - a.price);
    } else if (filters.sort === "newest") {
      result = [...result].sort((a, b) => (b.newLaunch ? 1 : 0) - (a.newLaunch ? 1 : 0));
    }

    return result;
  }, [initialBooks, filters]);

  return (
    <div className="flex-1 min-w-0 flex flex-col">
      {/* Sticky filter toolbar */}
      <FilterToolbar filters={filters} onChange={setFilters} />

      {/* Content */}
      <div className="px-4 sm:px-6 py-6">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Publishers", href: "/brands" },
            { label: brandName },
          ]}
        />

        <h1 className="text-2xl font-bold text-white mb-6">{brandName} Books</h1>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-slate-500">
            <p className="text-lg">No books found for this publisher.</p>
            <p className="text-sm mt-1">Try adjusting your filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filtered.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
