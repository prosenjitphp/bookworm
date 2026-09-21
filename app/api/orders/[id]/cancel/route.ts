import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { ordersStore } from "@/lib/ordersStore";

const CANCEL_WINDOW_MS = 48 * 60 * 60 * 1000;

export async function POST(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = (session.user as { id?: string }).id;
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const order = ordersStore.find((o) => o.id === params.id);

  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  if (order.userId !== userId) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const ageMs = Date.now() - new Date(order.createdAt).getTime();
  if (ageMs >= CANCEL_WINDOW_MS) {
    return NextResponse.json(
      { success: false, message: "Cancellation window has passed (48 hours)" },
      { status: 400 }
    );
  }

  order.status = "cancelled";
  return NextResponse.json({ success: true }, { status: 200 });
}
