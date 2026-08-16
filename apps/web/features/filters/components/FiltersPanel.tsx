"use client";
import { Collapse } from "@/_components/Collapse";
import ColorPalette from "@/_components/ColorPalette";
import { RangeFilter, RangeFilterValue } from "@/_components/RangeFilter";
import React, { useState } from "react";
import { FiSliders } from "react-icons/fi";

export default function FiltersPanel() {
  const [priceRange, setPriceRange] = useState<RangeFilterValue>([0, 300]);

  return (
    <div className="flex flex-col border border-[#0000001A] rounded-[20px] gap-6 py-6 px-5">
      <div className="flex justify-between  border-b-[#0000001A]">
        <div className="font-bold text-[20px]">Filters</div>
        <FiSliders color="#00000066" />
      </div>
      <Collapse title="Price">
        <RangeFilter
          value={priceRange}
          onValueChange={setPriceRange}
          onValueCommit={(value) => {
            console.log({
              minPrice: value[0],
              maxPrice: value[1],
            });
          }}
        />
      </Collapse>
      <Collapse title="Colors">
        <ColorPalette />
      </Collapse>
      {/* <Collapse title="Size"></Collapse> */}
      <button
        className="bg-black text-white w-full rounded-[62px] p-4 text-sm"
        onClick={() => {}}
      >
        Apply Filter
      </button>
    </div>
  );
}
