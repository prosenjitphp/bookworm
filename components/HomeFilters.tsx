"use client";

import { useState } from "react";
import FilterToolbar, { FilterState } from "@/components/FilterToolbar";

const defaultFilters: FilterState = {
  search: "",
  language: "",
  format: "",
  price: "",
  sort: "",
};

export default function HomeFilters() {
  const [filters, setFilters] = useState<FilterState>(defaultFilters);

  return <FilterToolbar filters={filters} onChange={setFilters} />;
}
