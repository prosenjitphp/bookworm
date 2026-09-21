"use client";

import { Fragment, useState } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon, Bars3Icon } from "@heroicons/react/24/outline";
import { categories } from "@/lib/mock-data";

function CategoryList({
  activeSlug,
  onSelect,
}: {
  activeSlug: string;
  onSelect?: () => void;
}) {
  return (
    <nav className="flex flex-col space-y-0.5">
      {categories.map((cat) => {
        const isActive = cat.slug === activeSlug;
        return (
          <Link
            key={cat.id}
            href={cat.slug === "all" ? "/" : `/catalogue/${cat.slug}`}
            onClick={onSelect}
            className={
              isActive
                ? "flex items-center px-4 py-2 text-sm font-medium text-amber-400 bg-white/10 border-l-2 border-amber-400"
                : "flex items-center px-4 py-2 text-sm text-slate-300 hover:text-amber-400 hover:bg-white/5 border-l-2 border-transparent"
            }
          >
            {cat.name}
          </Link>
        );
      })}
    </nav>
  );
}

interface CategorySidebarProps {
  /** Controlled from parent if needed; otherwise derived from URL */
  activeCategory?: string;
}

export default function CategorySidebar({ activeCategory }: CategorySidebarProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Determine active slug from props, URL path (/catalogue/[slug]), or ?category= param
  let activeSlug = activeCategory ?? "all";
  if (!activeCategory) {
    const catalogueMatch = pathname.match(/^\/catalogue\/([^/]+)/);
    if (catalogueMatch) {
      activeSlug = catalogueMatch[1];
    } else {
      const qCat = searchParams.get("category");
      if (qCat) activeSlug = qCat;
    }
  }

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-[185px] shrink-0 bg-sidebar border-r border-slate-800 min-h-[calc(100vh-4rem)] py-4">
        <p className="px-4 pb-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Categories
        </p>
        <CategoryList activeSlug={activeSlug} />
      </aside>

      {/* Mobile: floating button + drawer */}
      <div className="md:hidden">
        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          className="fixed bottom-6 left-4 z-40 flex items-center space-x-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-full shadow-lg transition-colors"
          aria-label="Browse Categories"
        >
          <Bars3Icon className="h-4 w-4" />
          <span>Categories</span>
        </button>

        <Transition.Root show={drawerOpen} as={Fragment}>
          <Dialog as="div" className="relative z-50" onClose={setDrawerOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" />
            </Transition.Child>

            <div className="fixed inset-0 z-50 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex w-64 flex-col bg-sidebar border-r border-slate-800 pt-5 pb-4 overflow-y-auto">
                  <div className="flex items-center justify-between px-4 pb-4 border-b border-slate-800">
                    <p className="text-sm font-semibold text-slate-200">Categories</p>
                    <button
                      type="button"
                      onClick={() => setDrawerOpen(false)}
                      className="p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
                      aria-label="Close categories"
                    >
                      <XMarkIcon className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="mt-3 flex-1">
                    <CategoryList
                      activeSlug={activeSlug}
                      onSelect={() => setDrawerOpen(false)}
                    />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>
      </div>
    </>
  );
}
