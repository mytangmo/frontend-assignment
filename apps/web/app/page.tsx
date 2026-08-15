"use client";
import React, { useEffect, useState } from "react";
import { Header } from "../_components/header/page";
import { ProductCard } from "../_components/card/productCard";
import { getProducts } from "@/features/api/get-product";
import { ProductDetailType } from "@/types/product.type";

const HomePage = () => {
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
        <Header
          cartItemCount={3}
          onSearch={setSearch}
        />
      <div className="min-h-screen">
        <div className="flex justify-center px-4 pt-40 mx-auto max-w-310">
          {loading && <p>Loading products...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {!loading && !error && products.length === 0 && (
            <p>No products found.</p>
          )}
          {!loading && !error && products.length > 0 && (
            <div className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-3">
              {products.map((product) => (
                <div key={product.id} className="flex">
                <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default HomePage;
