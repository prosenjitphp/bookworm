import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { giftPoints } from "@/lib/mock-data";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ points: 0 }, { status: 200 });
  }

  const userId = (session.user as { id?: string }).id;
  const userGiftPoint = giftPoints.find((g) => g.userId === userId);

  return NextResponse.json({ points: userGiftPoint?.points ?? 200 }, { status: 200 });
}
