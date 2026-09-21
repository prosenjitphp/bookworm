import { NextRequest, NextResponse } from "next/server";
import { books } from "@/lib/mock-data";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const category = searchParams.get("category");
  const brand = searchParams.get("brand");
  const format = searchParams.get("format");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const search = searchParams.get("search");
  const sort = searchParams.get("sort");
  const bestseller = searchParams.get("bestseller");
  const newLaunch = searchParams.get("newLaunch");
  const featured = searchParams.get("featured");

  let result = [...books];

  if (category && category !== "all") {
    result = result.filter(
      (b) => b.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (brand) {
    result = result.filter(
      (b) => b.brand.toLowerCase().replace(/\s+/g, "-") === brand.toLowerCase()
    );
  }

  if (format) {
    result = result.filter(
      (b) => b.format.toLowerCase() === format.toLowerCase()
    );
  }

  if (minPrice) {
    result = result.filter((b) => b.price >= Number(minPrice));
  }

  if (maxPrice) {
    result = result.filter((b) => b.price <= Number(maxPrice));
  }

  if (search) {
    const q = search.toLowerCase();
    result = result.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q)
    );
  }

  if (bestseller === "true") {
    result = result.filter((b) => b.bestseller);
  }

  if (newLaunch === "true") {
    result = result.filter((b) => b.newLaunch);
  }

  if (featured === "true") {
    result = result.slice(0, 8);
  }

  if (sort === "price_asc") {
    result = result.sort((a, b) => a.price - b.price);
  } else if (sort === "price_desc") {
    result = result.sort((a, b) => b.price - a.price);
  } else if (sort === "newest") {
    result = result.filter((b) => b.newLaunch).concat(result.filter((b) => !b.newLaunch));
  }

  return NextResponse.json(result);
}
