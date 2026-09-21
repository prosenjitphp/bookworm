import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-1 text-sm text-slate-400 mb-4">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <span key={index} className="flex items-center gap-1">
            {index > 0 && <span className="text-slate-600">/</span>}
            {isLast || !item.href ? (
              <span className={isLast ? "text-slate-300" : ""}>{item.label}</span>
            ) : (
              <Link href={item.href} className="text-amber-400 hover:underline">
                {item.label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
