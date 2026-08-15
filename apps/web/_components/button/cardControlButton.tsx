"use client";
import React from "react";
import { FiPlus, FiMinus } from "react-icons/fi";

interface CardControlButtonProps {
  productId?: string;
  quantity?: number;
  onAdd?: () => void;
  onIncrease?: () => void;
  onDecrease?: () => void;
  disabled?: boolean;
}

export default function CardControlButton(props: CardControlButtonProps) {
  const { quantity = 0, onAdd, onIncrease, onDecrease, disabled } = props;
  const isSelected = quantity > 0;

  return (
    <div>
      {!isSelected ? (
        <button
          type="button"
          aria-label="Add product to cart"
          className="rounded-full bg-white p-4"
          disabled={disabled}
          onClick={onAdd}
        >
          <FiPlus className="size-3 md:size-3.75" />
        </button>
      ) : (
        <div className="flex justify-around items-center rounded-full bg-white w-26.25 h-7.75 md:w-31.75 md:h-11">
          <button
            type="button"
            aria-label="Decrease quantity"
            disabled={disabled}
            onClick={onDecrease}
          >
            <FiMinus className="size-3 md:size-3.75" />
          </button>
          <div className="text-sm">{quantity}</div>
          <button
            type="button"
            aria-label="Increase quantity"
            disabled={disabled}
            onClick={onIncrease}
          >
            <FiPlus className="size-3 md:size-3.75" />
          </button>
        </div>
      )}
    </div>
  );
}
