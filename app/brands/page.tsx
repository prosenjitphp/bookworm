import Link from "next/link";
import { brands } from "@/lib/mock-data";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

export default function BrandsPage() {
  return (
    <div className="py-6">
      <h1 className="text-2xl font-bold text-white mb-2">Browse by Publisher</h1>
      <p className="text-slate-400 text-sm mb-8">
        Explore books from the world&apos;s leading publishers.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {brands.map((brand) => (
          <div
            key={brand.id}
            className="flex flex-col bg-card border border-slate-800 rounded-xl p-6 hover:border-slate-600 transition-all"
          >
            <h2 className="text-base font-bold text-white mb-2">{brand.name}</h2>
            <p className="text-sm text-slate-400 flex-1 leading-relaxed mb-4">
              {brand.description}
            </p>
            <Link
              href={`/brands/${brand.slug}`}
              className="inline-flex items-center gap-1 text-sm font-medium text-amber-400 hover:text-amber-300 transition-colors group"
            >
              Browse Books
              <ArrowRightIcon className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
