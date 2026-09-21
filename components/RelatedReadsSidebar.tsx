import { Book } from "@/lib/types";
import BookCard from "@/components/BookCard";

interface RelatedReadsSidebarProps {
  books: Book[];
}

export default function RelatedReadsSidebar({ books }: RelatedReadsSidebarProps) {
  return (
    <aside className="sticky top-20 space-y-4">
      <h2 className="text-lg font-bold text-slate-100 border-b border-slate-700 pb-2">
        Related Reads
      </h2>
      <div className="space-y-3">
        {books.slice(0, 3).map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </aside>
  );
}
