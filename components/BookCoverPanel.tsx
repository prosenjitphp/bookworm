import { Book } from "@/lib/types";

interface BookCoverPanelProps {
  book: Book;
}

export default function BookCoverPanel({ book }: BookCoverPanelProps) {
  return (
    <div className="rounded-lg overflow-hidden flex items-end gap-2 bg-slate-900 p-3">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://picsum.photos/seed/${book.id}/200/300`}
        alt={book.title}
        className="w-[200px] h-[300px] object-cover rounded-md shadow-md shrink-0"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://picsum.photos/seed/${book.id}b/160/260`}
        alt={`${book.title} preview`}
        className="w-[160px] h-[260px] object-cover rounded-md shadow-md shrink-0 opacity-90"
      />
    </div>
  );
}
