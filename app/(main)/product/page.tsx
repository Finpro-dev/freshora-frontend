"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import ProductSearchFilter from "./_components/ProductSearchFilter";
import ProductListing from "./_components/ProductListing";
import { usePublicProducts } from "./_hooks/use-public-products";
import Pagination from "@/shared/components/Pagination";

export default function ProductPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "all";
  const page = Number(searchParams.get("page")) || 1;

  const [localSearch, setLocalSearch] = useState(search);
  const [localCategory, setLocalCategory] = useState(category);

  // Sync local state when URL changes (e.g. back/forward browser)
  useEffect(() => {
    setLocalSearch(search);
    setLocalCategory(category);
  }, [search, category]);

  const { data, isLoading, isError } = usePublicProducts({
    page,
    limit: 12,
    search: search || undefined,
    category: category !== "all" ? category : undefined,
  });

  const categories =
    (data?.categories || []).map((cat) => ({
      productCategoryId: cat.productCategoryId,
      category: cat.category,
    })) || [];

  const updateUrl = useCallback(
    (newSearch: string, newCategory: string, newPage: number) => {
      const params = new URLSearchParams();
      if (newSearch) params.set("search", newSearch);
      if (newCategory !== "all") params.set("category", newCategory);
      if (newPage > 1) params.set("page", String(newPage));

      const queryString = params.toString();
      router.push(queryString ? `/product?${queryString}` : "/product");
    },
    [router],
  );

  // Debounce search: wait 300ms after user stops typing
  useEffect(() => {
    const timer = setTimeout(() => {
      updateUrl(localSearch, localCategory, 1);
    }, 300);

    return () => clearTimeout(timer);
  }, [localSearch, localCategory, updateUrl]);

  const handleSearchChange = useCallback((value: string) => {
    setLocalSearch(value);
  }, []);

  const handleCategoryChange = useCallback((value: string) => {
    setLocalCategory(value);
  }, []);

  const handleCategorySelect = useCallback(
    (value: string) => {
      handleCategoryChange(value);
      updateUrl(localSearch, value, 1);
    },
    [handleCategoryChange, localSearch, updateUrl],
  );

  const handlePageChange = useCallback(
    (newPage: number) => {
      updateUrl(search, category, newPage);
    },
    [search, category, updateUrl],
  );

  return (
    <div className="min-h-dvh w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-brand-mist-800 mb-3 tracking-tight">
            Our Products
          </h1>
          <p className="text-brand-mist-500 max-w-2xl mx-auto text-base">
            Browse our fresh, high-quality products. Search or filter by
            category to find exactly what you need.
          </p>
        </div>

        {/* Search & Filter */}
        <ProductSearchFilter
          search={localSearch}
          onSearchChange={handleSearchChange}
          category={localCategory}
          onCategoryChange={handleCategorySelect}
          categories={categories}
        />

        {/* Results Count */}
        {!isLoading && data && (
          <p className="text-sm text-brand-mist-500 mb-4">
            Showing{" "}
            <span className="font-semibold text-brand-mist-700">
              {(data.pagination.page - 1) * data.pagination.limit + 1}
            </span>{" "}
            –{" "}
            <span className="font-semibold text-brand-mist-700">
              {Math.min(
                data.pagination.page * data.pagination.limit,
                data.pagination.totalItems,
              )}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-brand-mist-700">
              {data.pagination.totalItems}
            </span>{" "}
            products
          </p>
        )}

        {/* Product Grid */}
        <ProductListing data={data} isLoading={isLoading} isError={isError} />

        {/* Pagination */}
        {!isLoading && data && data.pagination.totalPages > 1 && (
          <div className="mt-8">
            <Pagination totalPages={data.pagination.totalPages} />
          </div>
        )}
      </div>
    </div>
  );
}
