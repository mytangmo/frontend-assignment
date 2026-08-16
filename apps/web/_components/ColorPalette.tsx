import { ColorDetail } from "@/types/colors.type";
import React from "react";
import { FiCheck } from "react-icons/fi";

type ColorPaletteProps = {
  colors: ColorDetail[];
  selectedColorIds: string[];
  onChange: (colorIds: string[]) => void;
};

const COLOR_ORDER = new Map([
  ["red", 0],
  ["green", 1],
  ["yellow", 2],
  ["orange", 3],
  ["cyan", 4],
  ["blue", 5],
  ["purple", 6],
  ["pink", 7],
  ["white", 8],
  ["black", 9],
]);

export default function ColorPalette({
  colors,
  selectedColorIds,
  onChange,
}: ColorPaletteProps) {
  const sortedColors = Array.from(colors).sort(
    (first, second) =>
      (COLOR_ORDER.get(first.id) ?? COLOR_ORDER.size) -
      (COLOR_ORDER.get(second.id) ?? COLOR_ORDER.size),
  );

  const handleSelectColor = (colorId: string) => {
    const isSelected = selectedColorIds.includes(colorId);

    const nextColorIds = isSelected
      ? selectedColorIds.filter((id) => id !== colorId)
      : [...selectedColorIds, colorId];

    onChange(nextColorIds);
  };

  return (
    <div className="flex flex-wrap gap-1.5 md:grid md:grid-cols-5 md:gap-3">
      {sortedColors.map((color) => {
        const isSelected = selectedColorIds.includes(color.id);

        return (
          <button
            key={color.id}
            type="button"
            aria-label={`Select ${color.name}`}
            aria-pressed={isSelected}
            className="flex size-9.25 items-center justify-center rounded-full border-2"
            style={{
              backgroundColor: color.hex,
              borderColor:
                color.id === "white" ? "rgba(0, 0, 0, 0.2)" : `${color.hex}33`,
            }}
            onClick={() => handleSelectColor(color.id)}
          >
            {isSelected && (
              <FiCheck
                size={13}
                color={color.id === "white" ? "black" : "white"}
                aria-hidden="true"
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
