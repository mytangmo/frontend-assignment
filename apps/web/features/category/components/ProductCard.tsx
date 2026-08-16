"use client";
import React, { useState } from "react";

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
}

export function ProductCard(props: ProductCardProps): React.ReactNode {
  const [quantityValue, setQuantityValue] = useState<number>(0);
  const { product } = props;
  const handleDisplayPrice = (value: number) => {
    if (!value) return;
    return `$${value}`;
  };
  const handleDisplayPercent = (value: number) => {
    if (!value) return;
    return `-${value}%`;
  };

  return (
    <div className="flex h-101.75 w-full max-w-73.75 flex-col overflow-hidden">
      <div className="relative h-74.5 shrink-0 overflow-hidden rounded-[20px] bg-[#f0eeed]">
        <div
          className="relative h-74.5  w-full overflow-hidden rounded-[13.42px] bg-[#f0eeed] bg-cover bg-center bg-no-repeat lg:h-74.5 lg:rounded-[20px]"
          style={{
            backgroundImage: `url("${product.imageUrl}")`,
          }}
          role="img"
          aria-label={product.name}
        >
          <div className="absolute bottom-3 right-3 lg:bottom-4 lg:right-4">
            <ProductCardControl
              onAdd={() => setQuantityValue(1)}
              onIncrease={() => setQuantityValue((value) => value + 1)}
              onDecrease={() =>
                setQuantityValue((value) => Math.max(0, value - 1))
              }
              quantity={quantityValue}
            />
          </div>
        </div>
      </div>

      <div className="min-h-0 pt-3 gap-1.5 flex flex-col">
        <h3 className="truncate text-xl font-bold">{product.name}</h3>
        <div className="mt-1 flex items-center gap-2">
          <ProductRating rating={product.rating} />
        </div>
        <div className="gap-2.5 flex align-middle ">
          <div className="text-2xl font-bold">
            {handleDisplayPrice(product.discountedPrice)}
          </div>
          {!product.discountedPrice ||
          product.price === product.discountedPrice ? null : (
            <div className="text-2xl font-bold text-[rgba(0,0,0,0.4)]">
              {handleDisplayPrice(product.price)}
            </div>
          )}

          {!product.percentageDiscount ? null : (
            <div className="flex align-middle justify-center py-1.5 px-3.5 bg-[#FF33331A] rounded-[62px] text-xs ">
              <div className=" flex align-middle justify-center text-[#FF3333]">
                {handleDisplayPercent(product.percentageDiscount)}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
