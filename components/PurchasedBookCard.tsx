import { OrderItem } from "@/lib/types";
import DeliveryBadge from "@/components/DeliveryBadge";

interface PurchasedBookCardProps {
  item: OrderItem;
}

export default function PurchasedBookCard({ item }: PurchasedBookCardProps) {
  const coverUrl = `https://picsum.photos/seed/${item.bookId}/80/120`;

  return (
    <div className="bg-slate-800 rounded-lg p-3 flex gap-3">
      {/* Cover image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={coverUrl}
        alt={item.title}
        className="w-[60px] min-w-[60px] h-[90px] object-cover rounded bg-slate-700"
      />

      {/* Metadata */}
      <div className="flex flex-col gap-1 min-w-0 flex-1">
        <p className="font-bold text-slate-100 text-sm leading-snug line-clamp-2">
          {item.title}
        </p>
        <p className="text-xs text-slate-400">
          by <span className="text-amber-400">{item.author}</span>
        </p>
        <p className="text-slate-400 text-xs line-clamp-2">{item.category}</p>
        <p className="text-slate-400 text-xs">{item.format}</p>
        {item.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {item.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="text-[11px] text-amber-400">{tag}</span>
            ))}
          </div>
        )}
        <p className="font-bold text-slate-100 text-sm">₹{item.price}</p>
        <DeliveryBadge deliveryDays={item.deliveryDays} />
      </div>
    </div>
  );
}
