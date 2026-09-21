import { Order } from "@/lib/types";

// Shared in-memory orders store — imported by both orders/route.ts and orders/[id]/route.ts
export const ordersStore: Order[] = [];
