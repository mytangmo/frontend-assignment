"use client";

import { useInfiniteQuery } from "@tanstack/react-query";

import { getProducts } from "@/features/api/get-product";
import type { ProductFilters } from "@/types/product.type";

const PAGE_SIZE = 20;

type InfiniteProductFilters = Omit<ProductFilters, "limit" | "offset">;

const delay = (ms: number) =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });

export function useInfiniteProducts(filters: InfiniteProductFilters) {
  return useInfiniteQuery({
    queryKey: ["products", filters],

    queryFn: async ({ pageParam }) => {
      const [products] = await Promise.all([
        getProducts({
          ...filters,
          limit: PAGE_SIZE,
          offset: pageParam,
        }),
        delay(1000),
      ]);

      return products;
    },

    initialPageParam: 0,

    getNextPageParam: (lastPage) => {
      if (!lastPage.hasMore) {
        return undefined;
      }

      return lastPage.offset + lastPage.items.length;
    },
  });
}
