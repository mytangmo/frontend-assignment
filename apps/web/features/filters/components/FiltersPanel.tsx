"use client";
import { Collapse } from "@/_components/Collapse";
import ColorPalette from "@/_components/ColorPalette";
import { RangeFilter, RangeFilterValue } from "@/_components/RangeFilter";
import Tag from "@/_components/Tag";
import type { SizeDetail } from "@/types/size.type";
import React, { useMemo, useState } from "react";
import { FiSliders } from "react-icons/fi";
import { sortSizes } from "../filters.viewmodel";

type FilterPanelProps = {
  colors: {
    id: string;
    name: string;
    hex: string;
  }[];
  sizes?: SizeDetail[];
  handleApplyFilter: (req: any) => void;
};

export default function FilterPanel(props: FilterPanelProps) {
  const { colors, handleApplyFilter, sizes } = props;
  const [priceRange, setPriceRange] = useState<RangeFilterValue>([0, 300]);

  const [selectedSizeIds, setSelectedSizeIds] = useState<string[]>([]);
  const [selectedColorIds, setSelectedColorIds] = useState<string[]>([]);
  const [minMaxPrice, setMinMaxPrice] = useState({
    minPrice: 0,
    maxPrice: 300,
  });

  const sortedSizes = useMemo(() => sortSizes(sizes ?? []), [sizes]);

  const handleSelectSize = (sizeId: string) => {
    setSelectedSizeIds((current) =>
      current.includes(sizeId)
        ? current.filter((id) => id !== sizeId)
        : [...current, sizeId],
    );
  };

  const handleColorChange = (colorIds: string[]) => {
    setSelectedColorIds(colorIds);
  };

  const onApplyFilter = () => {
    const filterValue = {
      ...minMaxPrice,
      color: selectedColorIds,
      size: selectedSizeIds,
    };
    handleApplyFilter(filterValue);
  };

  return (
    <div className="flex flex-col border border-[#0000001A] rounded-[20px] gap-6  px-5">
      <div className="flex items-center justify-between border-b border-black/10 py-6">
        <div className="font-bold text-[20px]">Filters</div>
        <FiSliders color="#00000066" />
      </div>
      <Collapse title="Price">
        <RangeFilter
          value={priceRange}
          onValueChange={setPriceRange}
          onValueCommit={(value) => {
            setMinMaxPrice({
              minPrice: value[0],
              maxPrice: value[1],
            });
          }}
        />
      </Collapse>
      <Collapse title="Colors">
        <ColorPalette
          colors={colors}
          selectedColorIds={selectedColorIds}
          onChange={handleColorChange}
        />
      </Collapse>
      <Collapse title="Size">
        <div className="flex justify-items-start flex-wrap gap-1.5">
          {sortedSizes?.map((item) => {
            const isSelected = selectedSizeIds.includes(item.value);
            return (
              <Tag
                key={item.id}
                selected={isSelected}
                variant={isSelected ? "solid" : "filled"}
                onSelect={() => {
                  handleSelectSize(item.value);
                }}
              >
                {item.name}
              </Tag>
            );
          })}
        </div>
      </Collapse>
      <button
        className="bg-black text-white w-full rounded-[62px] p-4 text-sm"
        onClick={() => {
          onApplyFilter();
        }}
      >
        Apply Filter
      </button>
    </div>
  );
}
