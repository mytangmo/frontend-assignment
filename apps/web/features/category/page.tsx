"use client";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

import type { ApplyFilterType, ProductDetailType } from "@/types/product.type";
import { getAllColors } from "@/features/api/color";
import { getAllSize } from "@/features/api/size";
import { ProductCard } from "@/features/category/components/ProductCard";
import FiltersPanel from "@/features/filters/components/FiltersPanel";
import { useInfiniteProducts } from "@/features/hooks/useInfiniteProduct";
import { InfiniteScrollTrigger } from "@/features/category/components/InfiniteScrollTrigger";
import {
  useAddCartItem,
  useCart,
  useRemoveCartItem,
  useUpdateCartItem,
} from "@/features/hooks/useCart";
import Loading from "@/_components/Loading";
import { useState } from "react";
export default function CategoryContent() {
  const searchParams = useSearchParams();
  const search = searchParams.get("q")?.trim() || undefined;
  const [appliedFilters, setAppliedFilters] = useState<ApplyFilterType>({
    minPrice: 0,
    maxPrice: 300,
    colorIds: [],
    sizeIds: [],
  });
  const {
    data: colors = [],
    error: colorsError,
    isPending: colorsPending,
  } = useQuery({
    queryKey: ["colors"],
    queryFn: getAllColors,
  });
  const {
    data: sizes = [],
    error: sizesError,
    isPending: sizesPending,
  } = useQuery({
    queryKey: ["sizes"],
    queryFn: getAllSize,
  });

  const {
    data,
    error: productsError,
    isPending,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteProducts({
    q: search,
    colorIds:
      appliedFilters.colorIds.length > 0 ? appliedFilters.colorIds : undefined,

    sizeIds:
      appliedFilters.sizeIds.length > 0 ? appliedFilters.sizeIds : undefined,

    minPrice: appliedFilters.minPrice,
    maxPrice: appliedFilters.maxPrice,
  });
  const { data: cart } = useCart();
  const addCartItem = useAddCartItem();
  const updateCartItem = useUpdateCartItem();
  const removeCartItem = useRemoveCartItem();

  const handleLoadMore = () => {
    void fetchNextPage();
  };

  const handleApplyFilter = (filters: ApplyFilterType) => {
    setAppliedFilters(filters);
  };

  const products: ProductDetailType[] =
    data?.pages.flatMap((page) => page.items) ?? [];
  const cartItemsByProductId = new Map(
    (cart?.items ?? []).map((item) => [item.productId, item]),
  );
  const isPagePending = isPending || colorsPending || sizesPending;

  return (
    <>
      <main className="relative min-h-screen">
        <div className="mx-auto flex md:w-full lg:max-w-310 justify-center px-4 pt-40">
          {isPagePending && <Loading label="Loading products..." delayMs={0} />}
          {productsError && (
            <p className="py-10 text-center text-red-500">
              Unable to load products
            </p>
          )}

          {(colorsError || sizesError) && (
            <p className="text-red-500">Unable to load filter options</p>
          )}
          {!isPending && !productsError && products.length === 0 && (
            <p className="py-10 text-center">No products found.</p>
          )}
          {!isPending && !productsError && products.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-[295px_1fr] gap-4">
              <FiltersPanel
                colors={colors}
                sizes={sizes}
                value={appliedFilters}
                onApplyFilter={handleApplyFilter}
              />

              <div className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-3">
                {products.map((product) => {
                  const cartItem = cartItemsByProductId.get(product.id);

                  const quantity = cartItem?.quantity ?? 0;

                  const isUpdating =
                    (addCartItem.isPending &&
                      addCartItem.variables?.productId === product.id) ||
                    (updateCartItem.isPending &&
                      updateCartItem.variables?.itemId === cartItem?.id) ||
                    (removeCartItem.isPending &&
                      removeCartItem.variables === cartItem?.id);

                  return (
                    <ProductCard
                      key={product.id}
                      product={product}
                      quantity={quantity}
                      disabled={isUpdating}
                      onAdd={() => {
                        addCartItem.mutate({
                          productId: product.id,
                          quantity: 1,
                        });
                      }}
                      onIncrease={() => {
                        if (!cartItem) return;

                        updateCartItem.mutate({
                          itemId: cartItem.id,
                          quantity: Math.min(cartItem.quantity + 1, 99),
                        });
                      }}
                      onDecrease={() => {
                        if (!cartItem) return;

                        if (cartItem.quantity === 1) {
                          removeCartItem.mutate(cartItem.id);
                          return;
                        }

                        updateCartItem.mutate({
                          itemId: cartItem.id,
                          quantity: cartItem.quantity - 1,
                        });
                      }}
                    />
                  );
                })}
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
            </div>
          )}
        </div>
      </main>
    </>
  );
}
