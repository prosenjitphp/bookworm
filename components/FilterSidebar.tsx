"use client";

import { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { brands } from "@/lib/mock-data";

export interface SidebarFilters {
  formats: string[];
  priceRange: string;
  brandSlugs: string[];
}

interface FilterSidebarProps {
  filters: SidebarFilters;
  onChange: (next: SidebarFilters) => void;
  /** Hide brand section on brand pages */
  showBrands?: boolean;
}

const FORMAT_OPTIONS = ["Paperback", "Hard Cover", "eBook"];

const PRICE_OPTIONS = [
  { label: "All Prices", value: "" },
  { label: "Under ₹200", value: "under200" },
  { label: "₹200 – ₹500", value: "200-500" },
  { label: "Above ₹500", value: "above500" },
];

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(true);
  return (
    <div className="border-b border-slate-800 py-3">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between text-xs font-semibold text-slate-400 uppercase tracking-wider px-4 pb-2"
      >
        {title}
        {open ? (
          <ChevronUpIcon className="h-4 w-4" />
        ) : (
          <ChevronDownIcon className="h-4 w-4" />
        )}
      </button>
      {open && <div className="px-4 space-y-2">{children}</div>}
    </div>
  );
}

export default function FilterSidebar({
  filters,
  onChange,
  showBrands = true,
}: FilterSidebarProps) {
  function toggleFormat(fmt: string) {
    const next = filters.formats.includes(fmt)
      ? filters.formats.filter((f) => f !== fmt)
      : [...filters.formats, fmt];
    onChange({ ...filters, formats: next });
  }

  function toggleBrand(slug: string) {
    const next = filters.brandSlugs.includes(slug)
      ? filters.brandSlugs.filter((s) => s !== slug)
      : [...filters.brandSlugs, slug];
    onChange({ ...filters, brandSlugs: next });
  }

  return (
    <aside className="w-full bg-sidebar border border-slate-800 rounded-lg overflow-hidden">
      <p className="px-4 py-3 text-xs font-bold text-slate-300 uppercase tracking-wider border-b border-slate-800">
        Filters
      </p>

      {/* Format */}
      <Section title="Format">
        {FORMAT_OPTIONS.map((fmt) => (
          <label key={fmt} className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.formats.includes(fmt)}
              onChange={() => toggleFormat(fmt)}
              className="accent-amber-400 h-3.5 w-3.5"
            />
            <span className="text-sm text-slate-300">{fmt}</span>
          </label>
        ))}
      </Section>

      {/* Price Range */}
      <Section title="Price Range">
        {PRICE_OPTIONS.map((opt) => (
          <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="price-range"
              checked={filters.priceRange === opt.value}
              onChange={() => onChange({ ...filters, priceRange: opt.value })}
              className="accent-amber-400 h-3.5 w-3.5"
            />
            <span className="text-sm text-slate-300">{opt.label}</span>
          </label>
        ))}
      </Section>

      {/* Brand */}
      {showBrands && (
        <Section title="Publisher">
          {brands.map((brand) => (
            <label key={brand.slug} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.brandSlugs.includes(brand.slug)}
                onChange={() => toggleBrand(brand.slug)}
                className="accent-amber-400 h-3.5 w-3.5"
              />
              <span className="text-sm text-slate-300">{brand.name}</span>
            </label>
          ))}
        </Section>
      )}
    </aside>
  );
}
