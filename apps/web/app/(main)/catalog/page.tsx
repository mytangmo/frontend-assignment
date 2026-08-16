"use client";

import { useEffect, useState } from "react";

import type { ApplyFilterType, ProductDetailType } from "@/types/product.type";
import { ProductCard } from "@/features/category/components/ProductCard";
import FiltersPanel from "@/features/filters/components/FiltersPanel";
import { getAllColors } from "@/features/api/color";
import { ColorDetail } from "@/types/colors.type";
import { getAllSize } from "@/features/api/size";
import { SizeDetail } from "@/types/size.type";
import { useInfiniteProducts } from "@/features/hooks/useInfiniteProduct";
import { InfiniteScrollTrigger } from "@/features/category/components/InfiniteScrollTrigger";

export function CategoryPage() {
  const [colors, setColors] = useState<ColorDetail[]>([]);
  const [sizes, setSizes] = useState<SizeDetail[]>();
  const [error, setError] = useState("");
  const [appliedFilters, setAppliedFilters] = useState<ApplyFilterType>({
    minPrice: 0,
    maxPrice: 300,
    colorIds: [],
    sizeIds: [],
  });

  const {
    data,
    error: productsError,
    isPending,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteProducts({
    colorIds:
      appliedFilters.colorIds.length > 0 ? appliedFilters.colorIds : undefined,

    sizeIds:
      appliedFilters.sizeIds.length > 0 ? appliedFilters.sizeIds : undefined,

    minPrice: appliedFilters.minPrice,
    maxPrice: appliedFilters.maxPrice,
  });

  useEffect(() => {
    let isActive = true;

    async function loadFilterOptions() {
      try {
        setError("");

        const [colorsResponse, sizesResponse] = await Promise.all([
          getAllColors(),
          getAllSize(),
        ]);

        if (isActive) {
          setColors(colorsResponse);
          setSizes(sizesResponse);
        }
      } catch {
        if (isActive) {
          setError("Unable to load filter options");
        }
      }
    }

    void loadFilterOptions();

    return () => {
      isActive = false;
    };
  }, []);

  const handleLoadMore = () => {
    void fetchNextPage();
  };

  const handleApplyFilter = (filters: ApplyFilterType) => {
    setAppliedFilters(filters);
  };

  const products: ProductDetailType[] =
    data?.pages.flatMap((page) => page.items) ?? [];

  return (
    <>
      <main className="min-h-screen">
        <div className="mx-auto flex md:w-full lg:max-w-310 justify-center px-4 pt-40">
          {isPending && (
            <p className="py-10 text-center">Loading products...</p>
          )}
          {productsError && (
            <p className="py-10 text-center text-red-500">
              Unable to load products
            </p>
          )}

          {error && <p className="text-red-500">{error}</p>}
          <div className="grid grid-cols-1 md:grid-cols-[295px_1fr] gap-4">
            <FiltersPanel
              colors={colors}
              sizes={sizes ?? []}
              value={appliedFilters}
              onApplyFilter={handleApplyFilter}
            />
            {!isPending && !productsError && products.length === 0 && (
              <p className="py-10 text-center">No products found.</p>
            )}

            {!isPending && !productsError && products.length > 0 && (
              <>
                <div className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-3">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                <InfiniteScrollTrigger
                  hasMore={Boolean(hasNextPage)}
                  isLoading={isFetchingNextPage}
                  onLoadMore={handleLoadMore}
                />

                {!hasNextPage && (
                  <p className="py-8 text-center text-sm text-black/50">
                    You have reached the end.
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export default CategoryPage;
