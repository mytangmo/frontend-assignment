"use client";

import { useInfiniteQuery } from "@tanstack/react-query";

import { getProducts } from "@/features/api/get-product";
import type { ProductFilters } from "@/types/product.type";

const PAGE_SIZE = 20;

type InfiniteProductFilters = Omit<ProductFilters, "limit" | "offset">;

export function useInfiniteProducts(filters: InfiniteProductFilters) {
  return useInfiniteQuery({
    queryKey: ["products", filters],

    queryFn: ({ pageParam }) =>
      getProducts({
        ...filters,
        limit: PAGE_SIZE,
        offset: pageParam,
      }),

    initialPageParam: 0,

    getNextPageParam: (lastPage) => {
      if (!lastPage.hasMore) {
        return undefined;
      }

      return lastPage.offset + lastPage.items.length;
    },
  });
}
