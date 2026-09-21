import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Order } from "@/lib/types";
import { ordersStore } from "@/lib/ordersStore";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = (session.user as { id?: string }).id;
  if (!userId) {
    return NextResponse.json({ error: "User ID not found in session" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { items, address, paymentMethod, giftPointsUsed, total } = body;

    const orderId = `order_${Date.now()}`;

    const newOrder: Order = {
      id: orderId,
      userId,
      items: items || [],
      address: address || ({} as Order["address"]),
      paymentMethod: paymentMethod || "credit_card",
      giftPointsUsed: Number(giftPointsUsed) || 0,
      total: Number(total) || 0,
      status: "confirmed",
      createdAt: new Date().toISOString(),
    };

    ordersStore.unshift(newOrder);

    return NextResponse.json({ success: true, orderId }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to process order" }, { status: 500 });
  }
}

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = (session.user as { id?: string }).id;
  if (!userId) {
    return NextResponse.json({ error: "User ID not found in session" }, { status: 401 });
  }

  const userOrders = ordersStore.filter((o) => o.userId === userId);
  return NextResponse.json({ orders: userOrders }, { status: 200 });
}
