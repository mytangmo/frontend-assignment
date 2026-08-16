"use client";

import { useEffect, useState } from "react";

import { getProducts } from "@/features/api/get-product";
import type { ApplyFilterType, ProductDetailType } from "@/types/product.type";
import { ProductCard } from "@/features/category/components/ProductCard";
import FiltersPanel from "@/features/filters/components/FiltersPanel";
import { getAllColors } from "@/features/api/color";
import { ColorDetail } from "@/types/colors.type";
import { getAllSize } from "@/features/api/size";
import { SizeDetail } from "@/types/size.type";

export function CategoryPage() {
  const [products, setProducts] = useState<ProductDetailType[]>([]);
  const [colors, setSetColors] = useState<ColorDetail[]>([]);
  const [sizes, setSizes] = useState<SizeDetail[]>();
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        setError("");

        const response = await getProducts({
          q: search,
          limit: 20,
          offset: 0,
        });

        setProducts(response.items);
      } catch {
        setError("Unable to load products");
      } finally {
        setLoading(false);
      }
    }
    async function loadColors() {
      try {
        setLoading(true);
        setError("");

        const response = await getAllColors();
        console.log("response", response);
        setSetColors(response);
      } catch {
        setError("Unable to load products");
      } finally {
        setLoading(false);
      }
    }
    async function loadAllSize() {
      try {
        setLoading(true);
        setError("");
        const response = await getAllSize();
        setSizes(response);
      } catch {
        setError("Unable to load products");
      } finally {
        setLoading(false);
      }
    }
    void loadAllSize();

    void loadProducts();
    void loadColors();
  }, [search]);

  const handleApplyFilter = async (filterVal: ApplyFilterType) => {
    console.log("filterVal", filterVal);
    const filter = {
      colorIds: filterVal.color,
      sizeIds: filterVal.size,
      minPrice: filterVal.minPrice,
      maxPrice: filterVal.maxPrice,
    };
    const response = await getProducts({
      ...filter,
      limit: 20,
      offset: 0,
    });
    setProducts(response.items);
  };

  return (
    <>
      <main className="min-h-screen">
        <div className="mx-auto flex md:w-full lg:max-w-310 justify-center px-4 pt-40">
          {loading && <p>Loading products...</p>}

          {error && <p className="text-red-500">{error}</p>}
          <div className="grid grid-cols-1 md:grid-cols-[295px_1fr] gap-4">
            <FiltersPanel
              colors={colors ?? []}
              sizes={sizes ?? []}
              handleApplyFilter={(value) => handleApplyFilter(value)}
            />
            {!loading && !error && products.length === 0 && (
              <div className="mx-auto flex w-[full">
                <h1>No products found.</h1>
              </div>
            )}

            {!loading && !error && products.length > 0 && (
              <div>
                <div className="text-[32px] font-bold pb-2x">Clothes</div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-3">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
