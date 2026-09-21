export interface Review {
  id: string;
  reviewer: string;
  text: string;
  rating: number;
  date: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  authorId: string;
  category: string;
  brand: string;
  format: string;
  price: number;
  imageUrl: string;
  stock: number;
  deliveryDays: number;
  description: string;
  tagline: string;
  tags: string[];
  relatedIds: string[];
  bestseller: boolean;
  newLaunch: boolean;
  sells: number;
  language: string;
  rating: number;
  authorBio: string;
  authorAvatar: string;
  reviews: Review[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  description: string;
}

export interface Address {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  addressLine: string;
  email: string;
  city: string;
  pin: string;
  phone: string;
  state: string;
  country: string;
}

export interface OrderItem {
  bookId: string;
  title: string;
  author: string;
  price: number;
  qty: number;
  imageUrl: string;
  deliveryDays: number;
  format: string;
  tags: string[];
  category: string;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  address: Address;
  paymentMethod: string;
  giftPointsUsed: number;
  total: number;
  status: "Processing" | "Delivered" | "Cancelled" | string;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
}

export interface CartItem {
  bookId: string;
  title: string;
  author: string;
  price: number;
  qty: number;
  imageUrl: string;
  deliveryDays: number;
  format: string;
  tags: string[];
  category: string;
}

export interface GiftPoints {
  userId: string;
  points: number;
}
