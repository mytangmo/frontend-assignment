import { api } from "@/lib/eden";

export type ProductFilters = {
  q?: string;
  colorIds?: string[] | undefined;
  sizeIds?: string[] | undefined;
  minPrice?: number;
  maxPrice?: number;
  limit?: number;
  offset?: number;
};

export async function getProducts(filters: ProductFilters = {}) {
  const { data, error } = await api.products.get({
    query: {
      q: filters.q || undefined,
      colorIds: filters.colorIds,
      sizeIds: filters.sizeIds,
      minPrice: filters.minPrice,
      maxPrice: filters.maxPrice,
      limit: filters.limit ?? 20,
      offset: filters.offset ?? 0,
    },
  });

  if (error) {
    throw new Error("Unable to load products");
  }

  return data;
}
