"use client";

import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useAuthStore } from "@/shared/store/auth-store/AuthStoreProvider";
import { useRouter } from "next/navigation";
import { useGetAllProducts } from "./_hooks/use-get-products";
import { useDeleteProduct } from "./_hooks/use-delete-product";
import { toast } from "sonner";
import ProductHeader from "./_components/ProductHeader";
import ProductStats from "./_components/ProductStats";
import ProductFilters from "./_components/ProductFilters";
import ProductTable from "./_components/ProductTable";
import ProductMobileCards from "./_components/ProductMobileCards";
import ProductPagination from "./_components/ProductPagination";

function getGradeColor(grade: string) {
  switch (grade?.toUpperCase()) {
    case "A":
      return "bg-brand-emerald-100 text-brand-emerald-700";
    case "B":
      return "bg-blue-100 text-blue-700";
    case "C":
      return "bg-amber-100 text-amber-700";
    default:
      return "bg-brand-mist-200 text-brand-mist-700";
  }
}

function getStatusColor(status: string) {
  switch (status) {
    case "Active":
      return "bg-brand-emerald-100 text-brand-emerald-700";
    case "Out of Stock":
      return "bg-red-100 text-red-700";
    default:
      return "bg-brand-mist-200 text-brand-mist-700";
  }
}

export default function ProductPage() {
  const router = useRouter();
  const role = useAuthStore((state) => state.role);
  const isSuperAdmin = role === "SUPER_ADMIN";

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, categoryFilter]);
  const { mutate: deleteProduct } = useDeleteProduct();

  const {
    data: apiResponse,
    isLoading,
    isError,
    refetch,
  } = useGetAllProducts({
    page: currentPage,
    limit: 10,
    search: searchTerm,
    category: categoryFilter === "all" ? undefined : categoryFilter,
  });

  const products = apiResponse?.data || [];
  const pagination = apiResponse?.pagination;
  const totalProducts = pagination?.totalItems || 0;
  const outOfStockCount = apiResponse?.stats?.totalOutOfStock || 0;

  const categories = (apiResponse?.categories || []).map((cat: any) => ({
    id: cat.productCategoryId as string,
    name: cat.category as string,
  }));

  const handleAddProduct = () => {
    if (!isSuperAdmin) return;
    router.push("/dashboard/product/add-product");
  };

  const handleManageCategories = () => {
    if (!isSuperAdmin) return;
    router.push("/dashboard/category");
  };

  const handleProductDetail = (productId: string) => {
    router.push(`/dashboard/product/${productId}/detail`);
  };

  const handleUpdateProduct = (productId: string) => {
    if (!isSuperAdmin) return;
    router.push(`/dashboard/product/${productId}`);
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!isSuperAdmin) return;

    Swal.fire({
      title: "Are you sure?",
      theme: "auto",
      text: "You won't be able to undo!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#009966",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        deleteProduct(productId);
        toast.success("Product deleted successfully");
      }
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-dvh flex flex-col items-center justify-center gap-3">
        <span className="text-sm text-brand-mist-500 font-medium">
          Loading product catalog...
        </span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-dvh flex items-center justify-center p-4">
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-6 max-w-md text-center shadow-sm">
          <p className="font-semibold mb-1">Failed to Load Products</p>
          <p className="text-sm text-red-600">
            Please check your internet connection or server status.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-dvh p-4 md:p-6 lg:p-8">
      <ProductHeader
        isSuperAdmin={isSuperAdmin}
        onAddProduct={handleAddProduct}
        onManageCategories={handleManageCategories}
      />
      <ProductStats
        totalProducts={totalProducts}
        outOfStockCount={outOfStockCount}
      />
      <ProductFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        categoryFilter={categoryFilter}
        onCategoryChange={setCategoryFilter}
        categories={categories}
        onRefresh={refetch}
      />
      <ProductTable
        products={products}
        isSuperAdmin={isSuperAdmin}
        getGradeColor={getGradeColor}
        getStatusColor={getStatusColor}
        onView={handleProductDetail}
        onEdit={handleUpdateProduct}
        onDelete={handleDeleteProduct}
      />
      <ProductMobileCards
        products={products}
        isSuperAdmin={isSuperAdmin}
        getGradeColor={getGradeColor}
        getStatusColor={getStatusColor}
        onView={handleProductDetail}
        onEdit={handleUpdateProduct}
        onDelete={handleDeleteProduct}
      />

      {products.length === 0 && (
        <div className="bg-brand-mist-100/10 rounded-xl p-8 text-center border border-brand-mist-200 shadow-sm">
          <p className="text-brand-mist-500">
            No products found matching your criteria.
          </p>
        </div>
      )}

      {pagination && pagination.totalPages > 1 && (
        <ProductPagination
          currentPage={currentPage}
          totalPages={pagination.totalPages}
          totalItems={pagination.totalItems}
          onPageChange={setCurrentPage}
          hasPrev={!!pagination.hasPrev}
          hasNext={!!pagination.hasNext}
        />
      )}
    </div>
  );
}
