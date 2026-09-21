"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import BookIllustrationBackground from "@/components/BookIllustrationBackground";
import PaymentModal from "@/components/PaymentModal";

export default function PaymentPage() {
  const router = useRouter();
  const [payableAmount, setPayableAmount] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedTotal = sessionStorage.getItem("checkout_total");
      if (!storedTotal) {
        router.replace("/checkout");
      } else {
        setPayableAmount(Number(storedTotal));
      }
    }
  }, [router]);

  if (payableAmount === null) {
    return null;
  }

  return (
    <BookIllustrationBackground>
      <PaymentModal payableAmount={payableAmount} />
    </BookIllustrationBackground>
  );
}
