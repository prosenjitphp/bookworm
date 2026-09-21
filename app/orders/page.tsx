'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Order } from '@/lib/types';
import OrderCard from '@/components/OrderCard';

export default function OrdersPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/login');
    }
  }, [status, router]);

  useEffect(() => {
    if (status !== 'authenticated') return;

    async function fetchOrders() {
      try {
        // Fetch server-side orders
        const res = await fetch('/api/orders');
        const serverOrders: Order[] = res.ok ? (await res.json()).orders ?? [] : [];

        // Merge with localStorage orders
        let localOrders: Order[] = [];
        try {
          const raw = localStorage.getItem('bw_orders');
          if (raw) localOrders = JSON.parse(raw) as Order[];
        } catch {
          localOrders = [];
        }

        // Deduplicate by id — server data takes precedence
        const merged = [...serverOrders];
        for (const lo of localOrders) {
          if (!merged.some((o) => o.id === lo.id)) {
            merged.push(lo);
          }
        }

        // Sort newest first
        merged.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        setOrders(merged);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, [status]);

  function handleCancelSuccess(orderId: string) {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: 'cancelled' } : o))
    );
  }

  if (status === 'loading' || loading) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <span className="text-slate-400 text-sm animate-pulse">Loading orders…</span>
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="max-w-2xl mx-auto py-6">
      <h1 className="text-2xl font-bold text-slate-100 mb-6">My Orders</h1>

      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
          <span className="text-6xl">📦</span>
          <p className="text-slate-300 text-lg font-medium">No orders yet</p>
          <p className="text-slate-400 text-sm">Looks like you haven&apos;t placed any orders.</p>
          <Link
            href="/"
            className="mt-2 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div>
          {orders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onCancelSuccess={handleCancelSuccess}
            />
          ))}
        </div>
      )}
    </div>
  );
}
