import { NextRequest, NextResponse } from "next/server";
import { books } from "@/lib/mock-data";

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const book = books.find((b) => b.id === params.id);
  if (!book) {
    return NextResponse.json({ error: "Book not found" }, { status: 404 });
  }
  return NextResponse.json(book);
}
