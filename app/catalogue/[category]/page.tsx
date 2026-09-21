import { Suspense } from "react";
import { notFound } from "next/navigation";
import { books as allBooks, categories } from "@/lib/mock-data";
import CategorySidebar from "@/components/CategorySidebar";
import CategoryBooks from "./CategoryBooks";

interface CategoryPageProps {
  params: { category: string };
}

export function generateStaticParams() {
  return categories
    .filter((c) => c.slug !== "all")
    .map((c) => ({ category: c.slug }));
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { category: slug } = params;

  const cat = categories.find((c) => c.slug === slug);
  if (!cat) notFound();

  const categoryBooks = allBooks.filter(
    (b) => b.category.toLowerCase() === cat.name.toLowerCase()
  );

  return (
    <div className="flex -mx-4 sm:-mx-6 lg:-mx-8 min-h-[calc(100vh-4rem)]">
      <Suspense fallback={null}>
        <CategorySidebar activeCategory={slug} />
      </Suspense>

      <CategoryBooks
        categoryName={cat.name}
        initialBooks={categoryBooks}
      />
    </div>
  );
}
