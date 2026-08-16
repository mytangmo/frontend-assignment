"use client";

import { useState } from "react";
import { FiSliders } from "react-icons/fi";

import { Collapse } from "@/_components/Collapse";
import ColorPalette from "@/_components/ColorPalette";
import { RangeFilter, type RangeValue } from "@/_components/RangeFilter";
import Tag from "@/_components/Tag";
import type { ColorDetail } from "@/types/colors.type";
import type { ApplyFilterType } from "@/types/product.type";
import type { SizeDetail } from "@/types/size.type";

import { sortSizes } from "../filters.viewmodel";

interface FilterPanelProps {
  colors: ColorDetail[];
  sizes: SizeDetail[];
  value: ApplyFilterType;
  onApplyFilter: (filters: ApplyFilterType) => void;
}

export default function FilterPanel({
  colors,
  sizes,
  value,
  onApplyFilter,
}: FilterPanelProps) {
  const [draftFilters, setDraftFilters] = useState<ApplyFilterType>(() => ({
    ...value,
    colorIds: [...value.colorIds],
    sizeIds: [...value.sizeIds],
  }));

  const sortedSizes = sortSizes(sizes);
  const priceRange: RangeValue = [
    draftFilters.minPrice,
    draftFilters.maxPrice,
  ];

  const handleSelectSize = (sizeId: string) => {
    setDraftFilters((current) => {
      const isSelected = current.sizeIds.includes(sizeId);
      const sizeIds = isSelected
        ? current.sizeIds.filter((id) => id !== sizeId)
        : [...current.sizeIds, sizeId];

      return {
        ...current,
        sizeIds,
      };
    });
  };

  const handleApplyFilter = () => {
    onApplyFilter({
      ...draftFilters,
      colorIds: [...draftFilters.colorIds],
      sizeIds: [...draftFilters.sizeIds],
    });
  };

  return (
    <aside className="flex flex-col gap-6 rounded-[20px] border border-black/10 px-5 pb-6">
      <div className="flex items-center justify-between border-b border-black/10 py-6">
        <h2 className="text-xl font-bold">Filters</h2>
        <FiSliders className="text-black/40" aria-hidden="true" />
      </div>

      <Collapse title="Price">
        <RangeFilter
          value={priceRange}
          onValueChange={([minPrice, maxPrice]) => {
            setDraftFilters((current) => ({
              ...current,
              minPrice,
              maxPrice,
            }));
          }}
        />
      </Collapse>

      <Collapse title="Colors">
        <ColorPalette
          colors={colors}
          selectedColorIds={draftFilters.colorIds}
          onChange={(colorIds) => {
            setDraftFilters((current) => ({
              ...current,
              colorIds,
            }));
          }}
        />
      </Collapse>

      <Collapse title="Size">
        <div className="flex flex-wrap justify-start gap-1.5">
          {sortedSizes.map((item) => {
            const isSelected = draftFilters.sizeIds.includes(item.id);

            return (
              <Tag
                key={item.id}
                selected={isSelected}
                variant={isSelected ? "solid" : "filled"}
                onSelect={() => handleSelectSize(item.id)}
              >
                {item.name}
              </Tag>
            );
          })}
        </div>
      </Collapse>

      <button
        type="button"
        className="w-full rounded-[62px] bg-black p-4 text-sm text-white transition-colors hover:bg-black/80"
        onClick={handleApplyFilter}
      >
        Apply Filter
      </button>
    </aside>
  );
}
