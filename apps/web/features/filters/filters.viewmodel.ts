import { Size } from "../../../../packages/backend/src/db";

export const SIZE_ORDER = [
  "XXS",
  "XS",
  "S",
  "M",
  "L",
  "XL",
  "XXL",
  "3XL",
  "4XL",
];

const SIZE_RANK = new Map<string, number>(
  SIZE_ORDER.map((size, index) => [size, index]),
);

export function sortSizes(sizes: Size[]): Size[] {
  return [...sizes].sort((a, b) => {
    const aRank = SIZE_RANK.get(a.value) ?? Number.MAX_SAFE_INTEGER;
    const bRank = SIZE_RANK.get(b.value) ?? Number.MAX_SAFE_INTEGER;

    return aRank - bRank || a.name.localeCompare(b.name);
  });
}
