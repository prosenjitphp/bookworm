import { Suspense } from "react";
import { notFound } from "next/navigation";
import { books as allBooks, brands } from "@/lib/mock-data";
import CategorySidebar from "@/components/CategorySidebar";
import BrandBooks from "./BrandBooks";

interface BrandPageProps {
  params: { brand: string };
}

export function generateStaticParams() {
  return brands.map((b) => ({ brand: b.slug }));
}

export default function BrandPage({ params }: BrandPageProps) {
  const { brand: slug } = params;

  const brand = brands.find((b) => b.slug === slug);
  if (!brand) notFound();

  // Match brand by converting stored name to slug format
  const brandBooks = allBooks.filter(
    (b) => b.brand.toLowerCase().replace(/\s+/g, "-") === slug
  );

  return (
    <div className="flex -mx-4 sm:-mx-6 lg:-mx-8 min-h-[calc(100vh-4rem)]">
      <Suspense fallback={null}>
        <CategorySidebar activeCategory="all" />
      </Suspense>

      <BrandBooks brandName={brand.name} initialBooks={brandBooks} />
    </div>
  );
}
