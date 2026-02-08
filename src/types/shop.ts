export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  occasion: string[];
  recipient: string[];
  rating: number;
  reviews: number;
  badge?: string;
  description: string;
  variants?: { type: string; options: string[] }[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariants?: Record<string, string>;
  customMessage?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
}

export interface Occasion {
  id: string;
  name: string;
  emoji: string;
}
