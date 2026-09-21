'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Order } from '@/lib/types';
import { useCart } from '@/context/CartContext';
import Toast from '@/components/Toast';

interface Props {
  order: Order;
  onCancelSuccess: (orderId: string) => void;
}

const CANCEL_WINDOW_MS = 48 * 60 * 60 * 1000;

export default function OrderCard({ order, onCancelSuccess }: Props) {
  const router = useRouter();
  const { addToCart } = useCart();
  const [cancelling, setCancelling] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const withinWindow = Date.now() - new Date(order.createdAt).getTime() < CANCEL_WINDOW_MS;
  const canCancel = withinWindow && order.status !== 'cancelled';

  const statusBadge = (() => {
    const s = order.status.toLowerCase();
    if (s === 'cancelled') {
      return (
        <span className="bg-red-900 text-red-300 rounded-full px-2 py-0.5 text-xs font-medium capitalize">
          Cancelled
        </span>
      );
    }
    if (s === 'confirmed') {
      return (
        <span className="bg-green-800 text-green-300 rounded-full px-2 py-0.5 text-xs font-medium capitalize">
          Confirmed
        </span>
      );
    }
    return (
      <span className="bg-slate-700 text-slate-300 rounded-full px-2 py-0.5 text-xs font-medium capitalize">
        {order.status}
      </span>
    );
  })();

  function handleBuyAgain() {
    order.items.forEach((item) => {
      addToCart({
        bookId: item.bookId,
        title: item.title,
        author: item.author,
        price: item.price,
        qty: item.qty,
        imageUrl: item.imageUrl,
        deliveryDays: item.deliveryDays,
        format: item.format,
        tags: item.tags,
        category: item.category,
      });
    });
    router.push('/checkout');
  }

  async function handleCancel() {
    setCancelling(true);
    try {
      const res = await fetch(`/api/orders/${order.id}/cancel`, { method: 'POST' });
      const data = await res.json();
      if (res.ok && data.success) {
        onCancelSuccess(order.id);
        setToast({ message: 'Order cancelled successfully.', type: 'success' });
      } else {
        setToast({ message: data.message || 'Failed to cancel order.', type: 'error' });
      }
    } catch {
      setToast({ message: 'Network error. Please try again.', type: 'error' });
    } finally {
      setCancelling(false);
    }
  }

  return (
    <>
      <div className="bg-card rounded-xl p-4 mb-4 border border-slate-700">
        {/* Header row */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <span className="font-mono text-xs text-slate-400 truncate max-w-[140px]" title={order.id}>
            #{order.id}
          </span>
          <span className="text-xs text-slate-400">
            {new Date(order.createdAt).toLocaleDateString('en-IN')}
          </span>
          {statusBadge}
        </div>

        {/* Items list */}
        <div className="flex flex-wrap gap-3 mb-4">
          {order.items.map((item) => (
            <div key={item.bookId} className="flex gap-2 bg-slate-800 rounded-lg p-2 items-start">
              <div className="relative w-[60px] h-[80px] shrink-0 rounded overflow-hidden">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="60px"
                />
              </div>
              <div className="flex flex-col justify-between h-[80px] min-w-0">
                <p className="text-xs text-slate-200 font-medium line-clamp-2 leading-tight">{item.title}</p>
                <p className="text-xs text-slate-400">Qty: {item.qty}</p>
                <p className="text-xs text-slate-300 font-semibold">₹{item.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer row */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-slate-700">
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-bold text-slate-100">₹{order.total.toFixed(2)}</span>
            <span className="text-xs text-slate-400 capitalize">{order.paymentMethod.replace(/_/g, ' ')}</span>
          </div>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={handleBuyAgain}
              className="text-xs border border-blue-500 text-blue-400 hover:bg-blue-500/10 rounded-lg px-3 py-1.5 transition-colors"
            >
              Buy Again
            </button>
            {canCancel && (
              <button
                onClick={handleCancel}
                disabled={cancelling}
                className="text-xs border border-red-500 text-red-400 hover:bg-red-500/10 rounded-lg px-3 py-1.5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {cancelling ? 'Cancelling…' : 'Cancel Order'}
              </button>
            )}
          </div>
        </div>
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
}
