import { Suspense } from "react";
import { books as allBooks } from "@/lib/mock-data";
import CategorySidebar from "@/components/CategorySidebar";
import BookCard from "@/components/BookCard";
import RecommendedSection from "@/components/RecommendedSection";
import HomeFilters from "@/components/HomeFilters";

// Fetch bestsellers and new launches from the mock data directly (server component)
const bestsellers = allBooks.filter((b) => b.bestseller).slice(0, 8);
const newLaunches = allBooks.filter((b) => b.newLaunch).slice(0, 8);

export default function HomePage() {
  return (
    <div className="flex -mx-4 sm:-mx-6 lg:-mx-8 min-h-[calc(100vh-4rem)]">
      {/* Sidebar — desktop only, full height */}
      <Suspense fallback={null}>
        <CategorySidebar />
      </Suspense>

      {/* Main content area */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Sticky filter toolbar */}
        <Suspense fallback={null}>
          <HomeFilters />
        </Suspense>

        {/* Book sections */}
        <div className="flex-1 px-4 sm:px-6 py-6 space-y-10">
          {/* Recommended for You — client component */}
          <RecommendedSection />

          {/* Bestsellers this Month */}
          {bestsellers.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-2">
                Bestsellers this Month
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {bestsellers.map((book) => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
            </section>
          )}

          {/* New Launches */}
          {newLaunches.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-2">
                New Launches
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {newLaunches.map((book) => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
