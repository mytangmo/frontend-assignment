"use client";

import { useEffect, useState } from "react";

import { getProducts } from "@/features/api/get-product";
import type { ProductDetailType } from "@/types/product.type";
import { ProductCard } from "@/features/category/components/ProductCard";
import FiltersPanel from "@/features/filters/components/FiltersPanel";

export function CategoryPage() {
  const [products, setProducts] = useState<ProductDetailType[]>([]);
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

    void loadProducts();
  }, [search]);

  return (
    <>
      <main className="min-h-screen">
        <div className="mx-auto flex max-w-310 justify-center px-4 pt-40">
          {loading && <p>Loading products...</p>}

          {error && <p className="text-red-500">{error}</p>}

          {!loading && !error && products.length === 0 && (
            <p>No products found.</p>
          )}

          {!loading && !error && products.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-[295px_1fr] gap-4">
              <FiltersPanel />
              <div>
                <div className="text-[32px] font-bold pb-2x">Clothes</div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-3">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
