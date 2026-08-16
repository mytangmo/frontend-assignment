"use client";

import { ProductRating } from "./ProductRating";
import ProductCardControl from "./ProductCardControl";
interface ProductCardProps {
  product: {
    id: string;
    name: string;
    rating: number;
    price: number;
    discountedPrice: number;
    percentageDiscount: number;
    imageUrl: string;
  };
  quantity?: number;
  disabled?: boolean;
  onAdd?: () => void;
  onIncrease?: () => void;
  onDecrease?: () => void;
}

export function ProductCard(props: ProductCardProps): React.ReactNode {
  const {
    product,
    quantity = 0,
    disabled = false,
    onAdd,
    onIncrease,
    onDecrease,
  } = props;
  const handleDisplayPrice = (value: number) => {
    if (!value) return;
    return `$${value}`;
  };
  const handleDisplayPercent = (value: number) => {
    if (!value) return;
    return `-${value}%`;
  };

  return (
    <article className="flex w-full min-w-0 flex-col lg:h-101.75 lg:max-w-73.75">
      <div className="relative h-43.5 shrink-0 overflow-hidden rounded-[13.42px] bg-[#f0eeed] lg:h-74.5 lg:rounded-[20px]">
        <div
          className="relative h-full w-full overflow-hidden rounded-[13.42px] bg-[#f0eeed] bg-contain bg-center bg-no-repeat lg:rounded-[20px]"
          style={{
            backgroundImage: `url("${product.imageUrl}")`,
          }}
          role="img"
          aria-label={product.name}
        >
          <div className="absolute bottom-3 right-3 lg:bottom-4 lg:right-4">
            <ProductCardControl
              quantity={quantity}
              disabled={disabled}
              onAdd={onAdd}
              onIncrease={onIncrease}
              onDecrease={onDecrease}
            />
          </div>
        </div>
      </div>

      <div className="flex min-h-0 flex-col gap-1 pt-2.5 lg:gap-1.5 lg:pt-3">
        <h3 className="truncate text-base font-bold lg:text-xl">
          {product.name}
        </h3>
        <div className="flex items-center gap-1 lg:mt-1 lg:gap-2">
          <ProductRating rating={product.rating} size={16} />
        </div>
        <div className="flex items-center gap-1.5 lg:gap-2.5">
          <div className="text-xl font-bold lg:text-2xl">
            {handleDisplayPrice(product.discountedPrice)}
          </div>
          {!product.discountedPrice ||
          product.price === product.discountedPrice ? null : (
            <div className="text-xl font-bold text-black/40 lg:text-2xl  line-through">
              {handleDisplayPrice(product.price)}
            </div>
          )}

          {!product.percentageDiscount ? null : (
            <div className="flex shrink-0 items-center justify-center rounded-[62px] bg-[#FF33331A] px-2 py-1 text-[10px] lg:px-3.5 lg:py-1.5 lg:text-xs">
              <div className="flex items-center justify-center text-[#FF3333]">
                {handleDisplayPercent(product.percentageDiscount)}
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
