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
import { FiSliders } from "react-icons/fi";
export default function CategoryContent() {
  const searchParams = useSearchParams();
  const search = searchParams.get("q")?.trim() || undefined;
  const [appliedFilters, setAppliedFilters] = useState<ApplyFilterType>({
    minPrice: 0,
    maxPrice: 300,
    colorIds: [],
    sizeIds: [],
  });
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
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

  const cartMutationError =
    addCartItem.error ?? updateCartItem.error ?? removeCartItem.error;

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
        <div className="mx-auto flex justify-center px-4 pt-36 md:w-full md:pt-40 lg:max-w-310">
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
            <div className="w-full md:grid md:grid-cols-[295px_1fr] md:gap-4">
              <div className="hidden md:block">
                <FiltersPanel
                  colors={colors}
                  sizes={sizes}
                  value={appliedFilters}
                  onApplyFilter={handleApplyFilter}
                />
              </div>

              <section className="min-w-0">
                {cartMutationError && (
                  <p role="alert" className="mb-4 text-sm text-red-500">
                    Unable to update cart. Please try again.
                  </p>
                )}
                <div className="mb-6 flex items-center justify-between md:mb-5">
                  <h1 className="text-2xl font-bold md:text-3xl">Clothes</h1>
                  <button
                    type="button"
                    aria-label="Open filters"
                    aria-expanded={isMobileFiltersOpen}
                    className="grid size-10 place-items-center rounded-full bg-black/5 outline-none focus-visible:ring-2 focus-visible:ring-black md:hidden"
                    onClick={() => setIsMobileFiltersOpen(true)}
                  >
                    <FiSliders size={18} aria-hidden="true" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-x-4 gap-y-6 lg:grid-cols-3 lg:gap-y-10">
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
                  <div className="col-span-full">
                    <InfiniteScrollTrigger
                      hasMore={Boolean(hasNextPage)}
                      isLoading={isFetchingNextPage}
                      onLoadMore={handleLoadMore}
                    />
                  </div>

                  {!hasNextPage && (
                    <p className="col-span-full py-8 text-center text-sm text-black/50">
                      You have reached the end.
                    </p>
                  )}
                </div>
              </section>
            </div>
          )}
        </div>
      </main>

      {isMobileFiltersOpen && (
        <div className="md:hidden">
          <button
            type="button"
            aria-label="Close filters"
            className="fixed inset-0 z-110 bg-black/40"
            onClick={() => setIsMobileFiltersOpen(false)}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Product filters"
            className="fixed inset-x-0 bottom-0 z-120 max-h-[82vh] overflow-y-auto rounded-t-[20px] bg-white"
          >
            <FiltersPanel
              colors={colors}
              sizes={sizes}
              value={appliedFilters}
              onApplyFilter={handleApplyFilter}
              onClose={() => setIsMobileFiltersOpen(false)}
              className="rounded-none border-0"
            />
          </div>
        </div>
      )}
    </>
  );
}
