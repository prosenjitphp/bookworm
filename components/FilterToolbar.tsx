"use client";

import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";

type Option = { label: string; value: string };

const languageOptions: Option[] = [
  { label: "All Languages", value: "" },
  { label: "English", value: "English" },
  { label: "Hindi", value: "Hindi" },
  { label: "Tamil", value: "Tamil" },
];

const formatOptions: Option[] = [
  { label: "All Formats", value: "" },
  { label: "Paperback", value: "Paperback" },
  { label: "Hard Cover", value: "Hard Cover" },
  { label: "eBook", value: "eBook" },
];

const priceOptions: Option[] = [
  { label: "All Prices", value: "" },
  { label: "Under ₹200", value: "under200" },
  { label: "₹200–500", value: "200-500" },
  { label: "Above ₹500", value: "above500" },
];

const sortOptions: Option[] = [
  { label: "Relevance", value: "" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Newest", value: "newest" },
];

interface FilterState {
  search: string;
  language: string;
  format: string;
  price: string;
  sort: string;
}

interface FilterToolbarProps {
  filters: FilterState;
  onChange: (next: FilterState) => void;
}

function DropdownSelect({
  options,
  value,
  onChange,
}: {
  options: Option[];
  value: string;
  onChange: (v: string) => void;
}) {
  const selected = options.find((o) => o.value === value) ?? options[0];

  return (
    <Listbox value={value} onChange={onChange}>
      <div className="relative">
        <Listbox.Button className="relative flex items-center justify-between w-full min-w-[130px] cursor-pointer rounded-md bg-slate-800 border border-slate-700 pl-3 pr-8 py-2 text-left text-xs text-slate-200 hover:border-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-400">
          <span className="block truncate">{selected.label}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon className="h-4 w-4 text-slate-400" aria-hidden="true" />
          </span>
        </Listbox.Button>

        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute z-20 mt-1 max-h-56 w-full min-w-[150px] overflow-auto rounded-md bg-slate-800 border border-slate-700 py-1 text-xs text-slate-200 shadow-lg focus:outline-none">
            {options.map((opt) => (
              <Listbox.Option
                key={opt.value}
                value={opt.value}
                className={({ active }) =>
                  `cursor-pointer select-none px-3 py-2 ${
                    active ? "bg-slate-700 text-amber-400" : "text-slate-300"
                  }`
                }
              >
                {({ selected: isSelected }) => (
                  <span className={isSelected ? "font-semibold text-amber-400" : ""}>
                    {opt.label}
                  </span>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}

export default function FilterToolbar({ filters, onChange }: FilterToolbarProps) {
  function set<K extends keyof FilterState>(key: K, value: FilterState[K]) {
    onChange({ ...filters, [key]: value });
  }

  return (
    <div className="sticky top-16 z-30 w-full bg-sidebar border-b border-slate-800 px-4 py-3">
      <div className="flex flex-wrap items-center gap-2">
        {/* Search input */}
        <div className="relative flex-1 min-w-[180px]">
          <MagnifyingGlassIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
          <input
            type="search"
            placeholder="Search books or authors…"
            value={filters.search}
            onChange={(e) => set("search", e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-md pl-8 pr-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-400 focus:border-amber-400"
          />
        </div>

        {/* Language */}
        <DropdownSelect
          options={languageOptions}
          value={filters.language}
          onChange={(v) => set("language", v)}
        />

        {/* Format */}
        <DropdownSelect
          options={formatOptions}
          value={filters.format}
          onChange={(v) => set("format", v)}
        />

        {/* Price Range */}
        <DropdownSelect
          options={priceOptions}
          value={filters.price}
          onChange={(v) => set("price", v)}
        />

        {/* Sort By */}
        <DropdownSelect
          options={sortOptions}
          value={filters.sort}
          onChange={(v) => set("sort", v)}
        />
      </div>
    </div>
  );
}

export type { FilterState };
