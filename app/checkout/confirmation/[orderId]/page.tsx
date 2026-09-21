"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import BookIllustrationBackground from "@/components/BookIllustrationBackground";
import SuccessModal from "@/components/SuccessModal";
import { Order } from "@/lib/types";

export default function ConfirmationPage() {
  const params = useParams();
  const orderId = params?.orderId as string;

  const [order, setOrder] = useState<Order | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!orderId) return;

    fetch(`/api/orders/${orderId}`)
      .then(async (res) => {
        if (!res.ok) {
          setNotFound(true);
          return;
        }
        const data = await res.json();
        setOrder(data.order);
      })
      .catch(() => setNotFound(true));
  }, [orderId]);

  if (notFound) {
    return (
      <BookIllustrationBackground>
        <div className="bg-[#1e2337] rounded-xl w-full max-w-md mx-4 p-8 text-center">
          <p className="text-slate-100 text-xl mb-4">Order not found</p>
          <Link
            href="/"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </BookIllustrationBackground>
    );
  }

  if (!order) {
    return (
      <BookIllustrationBackground>
        <div className="text-slate-300 text-lg">Loading…</div>
      </BookIllustrationBackground>
    );
  }

  return (
    <BookIllustrationBackground>
      <SuccessModal order={order} />
    </BookIllustrationBackground>
  );
}
