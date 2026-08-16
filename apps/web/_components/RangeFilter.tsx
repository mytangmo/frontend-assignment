"use client";

import * as Slider from "@radix-ui/react-slider";

export type RangeValue = [number, number];


type RangeFilterProps = {
  value: RangeValue;
  onValueChange: (value: RangeValue) => void;
  onValueCommit?: (value: RangeValue) => void;
  min?: number;
  max?: number;
  step?: number;
};

export function RangeFilter({
  value,
  onValueChange,
  onValueCommit,
  min = 0,
  max = 300,
  step = 1,
}: RangeFilterProps) {
  const toRange = (nextValue: number[]): RangeValue => [
    nextValue[0] ?? min,
    nextValue[1] ?? max,
  ];

  return (
    <section className="px-7 md:px-0">
      <Slider.Root
        className="relative flex h-5 w-full touch-none select-none items-center"
        min={min}
        max={max}
        step={step}
        value={value}
        minStepsBetweenThumbs={1}
        onValueChange={(nextValue) => {
          onValueChange(toRange(nextValue));
        }}
        onValueCommit={(nextValue) => {
          onValueCommit?.(toRange(nextValue));
        }}
      >
        <Slider.Track className="relative h-1 grow overflow-hidden rounded-full bg-black/10">
          <Slider.Range className="absolute h-full rounded-full bg-black" />
        </Slider.Track>

        <Slider.Thumb
          className="block size-5 rounded-full bg-black outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
          aria-label="Minimum range"
        />

        <Slider.Thumb
          className="block size-5 rounded-full bg-black outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
          aria-label="Maximum range"
        />
      </Slider.Root>

      <div className="mt-1 flex justify-between text-sm font-medium">
        <span>${value[0]}</span>
        <span>${value[1]}</span>
      </div>
    </section>
  );
}
