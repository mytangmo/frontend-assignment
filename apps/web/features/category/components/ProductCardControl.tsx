"use client";
import React from "react";
import { FiPlus, FiMinus } from "react-icons/fi";

interface ProductCardControlProps {
  productId?: string;
  quantity?: number;
  onAdd?: () => void;
  onIncrease?: () => void;
  onDecrease?: () => void;
  disabled?: boolean;
}

export default function ProductCardControl(props: ProductCardControlProps) {
  const { quantity = 0, onAdd, onIncrease, onDecrease, disabled } = props;
  const isSelected = quantity > 0;

  return (
    <div
      className={`flex justify-around items-center rounded-full bg-white h-7.75 md:h-11  ${isSelected ? `w-26.25 md:w-31.75` : "p-4"} `}
    >
      <button
        className={`${!isSelected ? "hidden" : ""}`}
        type="button"
        aria-label="Decrease quantity"
        disabled={disabled}
        onClick={onDecrease}
      >
        <FiMinus className="size-3 md:size-3.75" />
      </button>

      <div className={`${!isSelected ? "hidden" : "text-sm"}`}>{quantity}</div>
      <button
        type="button"
        aria-label="Increase quantity"
        disabled={disabled}
        onClick={!isSelected ? onAdd : onIncrease}
      >
        <FiPlus className="size-3 md:size-3.75" />
      </button>
    </div>
  );
}
