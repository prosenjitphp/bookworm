import { notFound } from "next/navigation";
import { books } from "@/lib/mock-data";
import { Book } from "@/lib/types";
import Breadcrumb from "@/components/Breadcrumb";
import BookCoverPanel from "@/components/BookCoverPanel";
import ProductActions from "@/components/ProductActions";
import AuthorSection from "@/components/AuthorSection";
import ReviewSection from "@/components/ReviewSection";
import RelatedReadsSidebar from "@/components/RelatedReadsSidebar";

interface ProductPageProps {
  params: { id: string };
}

function getRelatedBooks(book: Book): Book[] {
  if (book.relatedIds && book.relatedIds.length > 0) {
    const related = book.relatedIds
      .map((id) => books.find((b) => b.id === id))
      .filter((b): b is Book => b !== undefined);
    if (related.length >= 3) return related.slice(0, 3);
  }

  // Fall back to same category, excluding the current book
  const sameCategory = books
    .filter((b) => b.category === book.category && b.id !== book.id)
    .slice(0, 3);

  if (sameCategory.length >= 3) return sameCategory;

  // Final fallback: any 3 other books
  return books.filter((b) => b.id !== book.id).slice(0, 3);
}

export default function ProductPage({ params }: ProductPageProps) {
  const book = books.find((b) => b.id === params.id);
  if (!book) notFound();

  const relatedBooks = getRelatedBooks(book);

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: book.category, href: `/catalogue/${book.category.toLowerCase().replace(/\s+/g, "-")}` },
    { label: book.title },
  ];

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Breadcrumb items={breadcrumbItems} />

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main content — ~70% */}
          <div className="flex-1 min-w-0">
            {/* Cover + actions */}
            <div className="flex flex-col sm:flex-row gap-6 bg-card border border-slate-800 rounded-xl p-5 mb-2">
              <div className="shrink-0">
                <BookCoverPanel book={book} />
              </div>
              <div className="flex-1 min-w-0">
                <ProductActions book={book} />
              </div>
            </div>

            {/* About the writer */}
            <AuthorSection
              authorName={book.author}
              authorBio={book.authorBio}
              authorAvatar={book.authorAvatar}
            />

            {/* Reviews */}
            <ReviewSection reviews={book.reviews} bookId={book.id} />
          </div>

          {/* Right sidebar — ~30% */}
          <div className="lg:w-[320px] shrink-0">
            <RelatedReadsSidebar books={relatedBooks} />
          </div>
        </div>
      </div>
    </main>
  );
}
