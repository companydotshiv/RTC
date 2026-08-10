export interface Product {
  id: number;
  slug: string;
  name: string;
  category: string;
  categoryName: string;
  price: number;
  priceDisplay?: string;
  originalPrice: number;
  badge: string;
  rating: number;
  reviewsCount: number;
  image: string;
  gallery: string[];
  shortDesc: string;
  description: string;
  weights: string[];
  sku: string;
  stock: boolean;
  origin: string;
  shelfLife: string;
  nutrition: Record<string, string>;
  features: string[];
  bullets?: { title: string; text: string }[];
  additionalInfoTable?: { label: string; value: string }[];
  paragraphs?: string[];
  productTypes?: string[];
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  desc: string;
}
