import { api } from "@/lib/eden";
import { ProductFilters } from "@/types/product.type";

export async function getProducts(filters: ProductFilters = {}) {
  const filter = {
    query: {
      q: filters.q || undefined,
      colorIds: filters.colorIds,
      sizeIds: filters.sizeIds,
      minPrice: filters.minPrice,
      maxPrice: filters.maxPrice,
      limit: filters.limit ?? 20,
      offset: filters.offset ?? 0,
    },
  };
  const { data, error } = await api.products.get(filter);

  console.log("data", data);

  if (error) {
    throw new Error("Unable to load products");
  }

  return data;
}
