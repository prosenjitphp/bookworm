"use client";

import Link from "next/link";

interface ErrorPageProps {
  error: Error;
  reset: () => void;
}

export default function GlobalError({ reset }: ErrorPageProps) {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-2xl font-bold text-slate-100 mb-3">Something went wrong</h1>
      <p className="text-slate-400 text-sm mb-8 max-w-sm">
        An unexpected error occurred. Please try again.
      </p>
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400"
        >
          Try Again
        </button>
        <Link
          href="/"
          className="px-6 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
