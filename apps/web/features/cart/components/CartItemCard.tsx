"use client";

import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";

export interface CartListProduct {
  id: string;
  name: string;
  imageUrl: string;
  discountedPrice: number;
  colorId: string | null;
  sizeId: string | null;
}

export interface CartListItem {
  id: string;
  quantity: number;
  product: CartListProduct | null;
}

interface CartItemCardProps {
  item: CartListItem & { product: CartListProduct };
  disabled?: boolean;
  onQuantityChange?: (itemId: string, quantity: number) => void;
  onRemove?: (itemId: string) => void;
}

const formatOption = (value: string | null) => {
  if (!value) return "Unspecified";

  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
};

export default function CartItemCard({
  item,
  disabled = false,
  onQuantityChange,
  onRemove,
}: CartItemCardProps) {
  const { product, quantity } = item;
  const canDecrease = quantity > 1;

  return (
    <article className="flex gap-3 py-5 md:gap-4">
      <div
        className="size-24.75 shrink-0 rounded-lg bg-[#f0eeed] bg-cover bg-center bg-no-repeat md:size-31"
        style={{ backgroundImage: `url("${product.imageUrl}")` }}
        role="img"
        aria-label={product.name}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <h3 className="truncate text-base font-bold md:text-xl">
            {product.name}
          </h3>

          <button
            type="button"
            className="grid size-8 shrink-0 place-items-center text-[#FF3333] transition-opacity hover:opacity-70 disabled:cursor-not-allowed disabled:opacity-40"
            aria-label={`Remove ${product.name} from cart`}
            disabled={disabled || !onRemove}
            onClick={() => onRemove?.(item.id)}
          >
            <FiTrash2 className="size-4 md:size-4.5" aria-hidden="true" />
          </button>
        </div>

        <dl className="mt-1 space-y-0.5 text-xs md:text-sm">
          <div className="flex gap-1">
            <dt>Size:</dt>
            <dd className="text-black/60">{formatOption(product.sizeId)}</dd>
          </div>
          <div className="flex gap-1">
            <dt>Color:</dt>
            <dd className="text-black/60">{formatOption(product.colorId)}</dd>
          </div>
        </dl>

        <div className="mt-auto flex items-end justify-between gap-3 pt-2">
          <p className="text-xl font-bold md:text-2xl">
            ${product.discountedPrice}
          </p>

          <div className="flex h-8 min-w-26.25 items-center justify-between rounded-full bg-[#F0F0F0] px-3 md:h-11 md:min-w-[126px] md:px-4">
            <button
              type="button"
              className="grid size-6 place-items-center disabled:cursor-not-allowed disabled:opacity-30"
              aria-label={`Decrease ${product.name} quantity`}
              disabled={disabled || !canDecrease || !onQuantityChange}
              onClick={() => onQuantityChange?.(item.id, quantity - 1)}
            >
              <FiMinus className="size-3.5" aria-hidden="true" />
            </button>

            <span className="text-sm font-medium" aria-label={`Quantity ${quantity}`}>
              {quantity}
            </span>

            <button
              type="button"
              className="grid size-6 place-items-center disabled:cursor-not-allowed disabled:opacity-30"
              aria-label={`Increase ${product.name} quantity`}
              disabled={disabled || quantity >= 99 || !onQuantityChange}
              onClick={() => onQuantityChange?.(item.id, quantity + 1)}
            >
              <FiPlus className="size-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
