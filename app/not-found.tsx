import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-8xl font-extrabold text-amber-400 mb-4">404</h1>
      <h2 className="text-2xl font-bold text-slate-100 mb-3">Page Not Found</h2>
      <p className="text-slate-400 text-sm mb-8 max-w-sm">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <Link
          href="/"
          className="px-6 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400"
        >
          Go Home
        </Link>
        <Link
          href="/catalogue"
          className="px-6 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400"
        >
          Browse Books
        </Link>
      </div>
    </div>
  );
}
