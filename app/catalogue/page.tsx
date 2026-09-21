import { Suspense } from "react";
import Link from "next/link";
import { categories } from "@/lib/mock-data";
import CategorySidebar from "@/components/CategorySidebar";
import { BookOpenIcon } from "@heroicons/react/24/outline";

// Exclude the "All" entry from the category grid
const displayCategories = categories.filter((c) => c.slug !== "all");

export default function CataloguePage() {
  return (
    <div className="flex -mx-4 sm:-mx-6 lg:-mx-8 min-h-[calc(100vh-4rem)]">
      {/* Sidebar */}
      <Suspense fallback={null}>
        <CategorySidebar activeCategory="all" />
      </Suspense>

      {/* Main content */}
      <div className="flex-1 min-w-0 px-4 sm:px-6 py-6">
        <h1 className="text-2xl font-bold text-white mb-6">Browse by Category</h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {displayCategories.map((cat) => (
            <Link
              key={cat.id}
              href={`/catalogue/${cat.slug}`}
              className="group flex flex-col items-center justify-center gap-3 bg-card border border-slate-800 rounded-xl p-6 hover:border-amber-400/50 hover:bg-white/5 transition-all text-center"
            >
              <BookOpenIcon className="h-8 w-8 text-amber-400 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium text-slate-200 group-hover:text-amber-400 transition-colors leading-snug">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
