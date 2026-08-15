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
