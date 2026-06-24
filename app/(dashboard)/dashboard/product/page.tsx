"use client";

import { useState, useMemo } from "react";
import { useGetAllProducts } from "./_hooks/use-get-products";
import Swal from "sweetalert2";
import { useAuthStore } from "@/shared/store/auth-store/AuthStoreProvider";

import {
  Search,
  Plus,
  Package,
  Edit,
  Trash2,
  Eye,
  ChevronDown,
  Image as ImageIcon,
  Loader2,
  Layers,
  RefreshCw,
  ExternalLink,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useDeleteProduct } from "./_hooks/use-delete-product";

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
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const { mutate: deleteProduct } = useDeleteProduct();

  // Dapatkan role dari auth store
  const role = useAuthStore((state) => state.role);
  const isSuperAdmin = role === "SUPER_ADMIN";

  const handleProductDetail = (productId: string) => {
    return router.push(`/dashboard/product/${productId}/detail`);
  };

  // Sembunyikan tombol ini untuk STORE_ADMIN
  const handleAddProduct = () => {
    if (!isSuperAdmin) return; // Safety check
    return router.push(`/dashboard/product/add-product`);
  };

  // Sembunyikan tombol ini untuk STORE_ADMIN
  const handleManageCategories = () => {
    if (!isSuperAdmin) return; // Safety check
    return router.push(`/dashboard/category`);
  };

  // Sembunyikan tombol ini untuk STORE_ADMIN
  const handleUpdateProduct = (productId: string) => {
    if (!isSuperAdmin) return; // Safety check
    return router.push(`/dashboard/product/${productId}`);
  };

  const handleDeleteProduct = async (productId: string) => {
    // Sembunyikan fitur ini untuk STORE_ADMIN
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
        const res = deleteProduct(productId);
      }
    });
  };

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

  if (isLoading) {
    return (
      <div className="min-h-dvh flex flex-col items-center justify-center gap-2">
        <Loader2 className="w-8 h-8 animate-spin text-brand-emerald-700" />
        <p className="text-sm text-brand-mist-500 font-medium">
          Loading product catalog...
        </p>
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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-brand-mist-800">Products</h1>
          <p className="text-brand-mist-500">Manage your product catalog</p>
        </div>

        {isSuperAdmin && (
          <div className="flex items-center gap-2 self-end md:self-auto">
            <button
              type="button"
              className="group flex items-center gap-2 px-4 py-2 border border-brand-mist-300 text-brand-mist-700 bg-white rounded-lg hover:text-brand-emerald-700 hover:border-brand-emerald-300 hover:bg-brand-mist-25 transition-all duration-200 text-sm font-medium shadow-sm"
              onClick={handleManageCategories}
            >
              <Layers className="w-4 h-4 text-brand-mist-500 group-hover:text-brand-emerald-600 transition-colors duration-200" />
              <span>Manage Categories</span>
              <ExternalLink className="w-3.5 h-3.5 text-brand-mist-400 group-hover:text-brand-emerald-500 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>

            <button
              type="button"
              className="flex items-center gap-2 px-4 py-2 bg-brand-emerald-700 text-white rounded-lg hover:bg-brand-emerald-800 transition-colors text-sm font-medium"
              onClick={handleAddProduct}
            >
              <Plus className="w-4 h-4" />
              Add Product
            </button>
          </div>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 md:p-6 border border-brand-mist-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-brand-mist-500">Total Products</span>
            <Package className="w-5 h-5 text-brand-emerald-600" />
          </div>
          <p className="text-2xl font-bold text-brand-mist-800">
            {totalProducts}
          </p>
        </div>

        <div className="bg-white rounded-xl p-4 md:p-6 border border-brand-mist-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-brand-mist-500">Out of Stock</span>
            <Package className="w-5 h-5 text-red-600" />
          </div>
          <p className="text-2xl font-bold text-red-600">{outOfStockCount}</p>
          <p className="text-xs text-red-600 mt-1">Needs restock</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 border border-brand-mist-200 shadow-sm mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-mist-500" />
            <input
              type="text"
              placeholder="Search by product name..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-brand-mist-300 bg-white focus:outline-none focus:ring-2 focus:ring-brand-emerald-500 focus:border-transparent text-sm"
            />
          </div>

          <div className="flex flex-row gap-2 items-center w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-initial">
              <select
                value={categoryFilter}
                onChange={(e) => {
                  setCategoryFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full sm:w-auto appearance-none px-4 py-2.5 pr-10 rounded-lg border border-brand-mist-300 bg-white focus:outline-none focus:ring-2 focus:ring-brand-emerald-500 text-sm"
              >
                <option value="all">All Categories</option>
                {categories.map((cat: any) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-mist-500 pointer-events-none" />
            </div>

            <button
              type="button"
              onClick={() => refetch()}
              className="p-2.5 border border-brand-mist-300 rounded-lg bg-white hover:bg-brand-mist-50 text-brand-mist-500 transition-colors flex items-center justify-center"
              title="Refresh Categories & Products"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="hidden lg:block bg-white rounded-xl border border-brand-mist-200 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-brand-mist-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-brand-mist-500 uppercase tracking-wider">
                Product
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-brand-mist-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-brand-mist-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-brand-mist-500 uppercase tracking-wider">
                Stock
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-brand-mist-500 uppercase tracking-wider">
                Weight/Unit
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-brand-mist-500 uppercase tracking-wider">
                Grade
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-brand-mist-500 uppercase tracking-wider">
                Status
              </th>
              {isSuperAdmin && (
                <th className="px-6 py-3 text-right text-xs font-medium text-brand-mist-500 uppercase tracking-wider">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-mist-200">
            {products.map((product: any) => {
              const stock = product.stocks?.[0]?.quantity ?? 0;
              const status = stock > 0 ? "Active" : "Out of Stock";
              const photoUrl = product.productPhotos?.[0]?.photoUrl;

              return (
                <tr
                  key={product.productId}
                  className="hover:bg-brand-mist-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-brand-mist-100 flex items-center justify-center overflow-hidden flex-shrink-0 border border-brand-mist-200">
                        {photoUrl ? (
                          <img
                            src={photoUrl}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <ImageIcon className="w-6 h-6 text-brand-mist-400" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-brand-mist-800">
                          {product.name}
                        </p>
                        <p className="text-xs text-brand-mist-500">
                          {product.serialNumber}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-brand-mist-600">
                    {product.productCategory?.category || "-"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-brand-mist-800">
                    Rp {Number(product.finalPrice).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`font-medium ${stock === 0 ? "text-red-600" : "text-brand-mist-800"}`}
                    >
                      {stock} pcs
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-brand-mist-600">
                    {product.weightPerGram}g / {product.unit}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getGradeColor(product.grade)}`}
                    >
                      Grade {product.grade || "-"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}
                    >
                      {status}
                    </span>
                  </td>
                  {isSuperAdmin && (
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          className="p-1.5 rounded-lg hover:bg-emerald-100 text-brand-emerald-600 transition-colors"
                          onClick={() => handleProductDetail(product.productId)}
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          className="p-1.5 rounded-lg hover:bg-blue-100 text-blue-600 transition-colors"
                          onClick={() => handleUpdateProduct(product.productId)}
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          className="p-1.5 rounded-lg hover:bg-red-100 text-red-600 transition-colors"
                          onClick={() => handleDeleteProduct(product.productId)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="lg:hidden space-y-4">
        {products.map((product: any) => {
          const stock = product.stocks?.[0]?.quantity ?? 0;
          const status = stock > 0 ? "Active" : "Out of Stock";
          const photoUrl = product.productPhotos?.[0]?.photoUrl;

          return (
            <div
              key={product.productId}
              className="bg-white rounded-xl p-4 border border-brand-mist-200 shadow-sm"
            >
              <div className="flex items-start gap-4 mb-3">
                <div className="w-16 h-16 rounded-lg bg-brand-mist-100 flex items-center justify-center overflow-hidden flex-shrink-0 border border-brand-mist-200">
                  {photoUrl ? (
                    <img
                      src={photoUrl}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <ImageIcon className="w-8 h-8 text-brand-mist-400" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-brand-mist-800 truncate">
                        {product.name}
                      </p>
                      <p className="text-xs text-brand-mist-500">
                        {product.serialNumber}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}
                    >
                      {status}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-medium ${getGradeColor(product.grade)}`}
                    >
                      Grade {product.grade || "-"}
                    </span>
                    <span className="text-xs text-brand-mist-500">
                      {product.productCategory?.category}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm mb-3">
                <div>
                  <span className="font-semibold text-brand-mist-800">
                    Rp {Number(product.finalPrice).toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <span
                    className={
                      stock === 0 ? "text-red-600" : "text-brand-mist-600"
                    }
                  >
                    Stock: {stock}
                  </span>
                  <span className="text-brand-mist-500">
                    {product.weightPerGram}g / {product.unit}
                  </span>
                </div>
              </div>
              {isSuperAdmin && (
                <div className="flex items-center gap-2 pt-3 border-t border-brand-mist-200">
                  <button
                    onClick={() => handleProductDetail(product.productId)}
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg bg-brand-emerald-50 text-brand-emerald-600 text-xs font-medium hover:bg-brand-emerald-100 transition-colors"
                  >
                    <Eye className="w-3 h-3" />
                    View
                  </button>
                  <button
                    onClick={() => handleUpdateProduct(product.productId)}
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 text-xs font-medium hover:bg-blue-100 transition-colors"
                  >
                    <Edit className="w-3 h-3" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product.productId)}
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg bg-red-50 text-red-600 text-xs font-medium hover:bg-red-100 transition-colors"
                  >
                    <Trash2 className="w-3 h-3" />
                    Delete
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {products.length === 0 && (
        <div className="bg-white rounded-xl p-8 text-center border border-brand-mist-200 shadow-sm">
          <p className="text-brand-mist-500">
            No products found matching your criteria.
          </p>
        </div>
      )}

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="px-4 md:px-6 py-4 mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="text-sm text-brand-mist-500">
            Showing page{" "}
            <span className="font-medium text-brand-mist-700">
              {pagination.page}
            </span>{" "}
            of{" "}
            <span className="font-medium text-brand-mist-700">
              {pagination.totalPages}
            </span>{" "}
            pages ({pagination.totalItems} items)
          </p>
          <div className="flex items-center gap-2">
            <button
              className="px-3 py-1.5 rounded-lg border border-brand-mist-300 text-brand-mist-600 hover:bg-brand-mist-200 transition-colors text-sm disabled:opacity-50"
              disabled={!pagination.hasPrev}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            >
              Previous
            </button>

            {Array.from({ length: pagination.totalPages }, (_, index) => {
              const pageNumber = index + 1;
              return (
                <button
                  key={pageNumber}
                  onClick={() => setCurrentPage(pageNumber)}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                    currentPage === pageNumber
                      ? "bg-brand-emerald-700 text-white"
                      : "border border-brand-mist-300 text-brand-mist-600 hover:bg-brand-mist-200"
                  }`}
                >
                  {pageNumber}
                </button>
              );
            })}

            <button
              className="px-3 py-1.5 rounded-lg border border-brand-mist-300 text-brand-mist-600 hover:bg-brand-mist-200 transition-colors text-sm disabled:opacity-50"
              disabled={!pagination.hasNext}
              onClick={() =>
                setCurrentPage((prev) =>
                  Math.min(prev + 1, pagination.totalPages),
                )
              }
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
