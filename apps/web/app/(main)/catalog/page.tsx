"use client";

import { Suspense } from "react";

import Loading from "@/_components/Loading";
import CategoryContent from "@/features/category/page";

export function CategoryPage() {
  return (
    <Suspense
      fallback={
        <main className="relative min-h-screen">
          <Loading label="Loading products..." delayMs={0} />
        </main>
      }
    >
      <CategoryContent />
    </Suspense>
  );
}

export default CategoryPage;
