import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { addresses } from "@/lib/mock-data";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ addresses: [] }, { status: 200 });
  }

  const userId = (session.user as { id?: string }).id;
  const userAddresses = addresses.filter((a) => a.userId === userId);
  const first = userAddresses[0] ?? null;

  return NextResponse.json({ address: first });
}
