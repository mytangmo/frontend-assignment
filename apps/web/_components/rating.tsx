"use client";
import React from "react";
import { FaStar } from "react-icons/fa";
const MAX_RATING = 5;

type RatingProps = {
  rating: number;
  size?: number;
  showValue?: boolean;
};

export function Rating({ rating, size = 18, showValue = true }: RatingProps) {
  const normalizedRating = Math.min(MAX_RATING, Math.max(0, rating));

  return (
    <div
      className="flex items-center gap-2"
      role="img"
      aria-label={`${normalizedRating} out of ${MAX_RATING} stars`}
    >
      <div className="flex gap-1" aria-hidden="true">
        {Array.from({ length: MAX_RATING }, (_, index) => {
          const fillPercentage = Math.min(
            100,
            Math.max(0, (normalizedRating - index) * 100),
          );

          return (
            <span
              key={index}
              className="relative inline-block shrink-0"
              style={{ width: size, height: size }}
            >
              <FaStar size={size} className="absolute inset-0 text-gray-200" />

              <span
                className="absolute inset-y-0 left-0 overflow-hidden"
                style={{ width: `${fillPercentage}%` }}
              >
                <FaStar size={size} className="max-w-none text-[#FFC633]" />
              </span>
            </span>
          );
        })}
      </div>

      {showValue && (
        <span
          className="whitespace-nowrap text-xs text-gray-600 lg:text-sm"
          aria-hidden="true"
        >
          {normalizedRating.toFixed(1)}
          <span className="text-gray-400">/5</span>
        </span>
      )}
    </div>
  );
}
