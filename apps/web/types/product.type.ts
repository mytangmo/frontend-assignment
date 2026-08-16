export interface ProductFilters {
  q?: string;
  colorIds?: string[] | undefined;
  sizeIds?: string[] | undefined;
  minPrice?: number;
  maxPrice?: number;
  limit?: number;
  offset?: number;
  sort?: "name" | "price" | "rating" | "createdAt" | undefined;
  order?: "asc" | "desc" | undefined;
}
export interface ProductDetailType {
  id: string;
  name: string;
  description: string;
  price: number;
  discountedPrice: number;
  percentageDiscount: number;
  colorId: string | null;
  sizeId: string | null;
  imageUrl: string;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ApplyFilterType {
  minPrice: number;
  maxPrice: number;
  colorIds: string[];
  sizeIds: string[];
}
