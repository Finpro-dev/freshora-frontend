"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useGetDiscounts, useDeleteDiscount } from "./_hooks/use-discount"; // Sesuaikan path ini
// Tambahkan import hook auth yang kamu gunakan, ini adalah contoh jika menggunakan hook kustom/next-auth
// import { useAuth } from "@/hooks/use-auth";
import {
  Plus,
  Trash2,
  Tag,
  ChevronLeft,
  ChevronRight,
  Loader2,
  AlertCircle,
  SlidersHorizontal,
} from "lucide-react";
import { toast } from "sonner";

export default function DiscountManagementPage() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [typeFilter, setTypeFilter] = useState<string>("");

  // --- MOCK/CONTOH AMBIL DATA USER ROLE ---
  // Silakan ganti dengan state auth/session riil di aplikasimu (misal: const { user } = useAuth())
  const currentUser = { role: "SUPER_ADMIN", storeId: null };
  const isSuperAdmin = currentUser?.role === "SUPER_ADMIN";
  const isStoreOwner = currentUser?.role === "STORE_OWNER";
  const isStoreAdmin = currentUser?.role === "STORE_ADMIN";

  // --- DATA HOOKS INTEGRATION ---
  const {
    data: discountResult,
    isLoading,
    isError,
  } = useGetDiscounts({
    page,
    limit: 5,
    // Filter status dan type diaktifkan jika BUKAN store admin
    status: isStoreAdmin ? undefined : statusFilter || undefined,
    type: isStoreAdmin ? undefined : typeFilter || undefined,

    // --- LOGIKA SCOPING PARAMETER BACKEND BERDASARKAN ROLE ---
    ...(isStoreOwner && {
      storeId: currentUser.storeId || undefined, // Terkunci ke store miliknya sendiri
    }),
    ...(isStoreAdmin && {
      storeId: currentUser.storeId || undefined, // Terkunci ke store tempatnya bekerja
      createdBy: "STORE_OWNER", // Hanya memuat diskon buatan store owner
    }),
  });

  const deleteDiscountMutation = useDeleteDiscount();

  // --- HANDLERS ---
  const handleDelete = async (discountId: string) => {
    if (
      confirm(
        "Are you sure you want to deprecate this discount rule? (Soft Delete)",
      )
    ) {
      try {
        await deleteDiscountMutation.mutateAsync(discountId);
        toast.success("Discount parameter decoupled successfully.");
      } catch (error: any) {
        toast.error(
          error?.response?.data?.message ||
            "Failed to deprecate discount matrix.",
        );
      }
    }
  };

  return (
    <div className="min-h-screen bg-brand-mist-50/50 p-4 md:p-8 space-y-6 relative">
      {/* Top Promotion Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-brand-mist-200 pb-5">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold text-brand-mist-800">Promotions</h1>
          <p className="text-sm text-brand-mist-500">Promotions Management</p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto shrink-0">
          <button
            onClick={() => router.push("/dashboard/promotion/add-promotion")}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-brand-emerald-700 text-white text-sm font-bold rounded-xl hover:bg-brand-emerald-800 shadow-md transition-all group flex-1 sm:flex-initial"
          >
            <Plus className="w-4 h-4 group-hover:scale-110 transition-transform" />
            Create New Promotion
          </button>
        </div>
      </div>

      {/* CONDITIONAL RENDERING: Ditampilkan untuk Super Admin atau Role lain yang BUKAN Store Admin */}
      {(isSuperAdmin || !isStoreAdmin) && (
        <div className="flex flex-wrap items-center gap-3 bg-white p-4 rounded-xl border border-brand-mist-200 shadow-sm">
          {/* CONTROL FILTER UTAMA */}
          <div className="flex items-center gap-2 text-brand-mist-500 text-xs font-bold uppercase tracking-wider mr-2">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Control Filters:</span>
          </div>

          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
            className="bg-brand-mist-50/70 border border-brand-mist-300 text-brand-mist-800 font-semibold text-xs rounded-xl px-3 py-2 h-[38px] focus:outline-none focus:ring-2 focus:ring-brand-emerald-500 cursor-pointer"
          >
            <option value="">All Promotion</option>
            <option value="ACTIVE">Active</option>
            <option value="UPCOMING">Upcoming</option>
            <option value="EXPIRED">Expired</option>
          </select>

          <select
            value={typeFilter}
            onChange={(e) => {
              setTypeFilter(e.target.value);
              setPage(1);
            }}
            className="bg-brand-mist-50/70 border border-brand-mist-300 text-brand-mist-800 font-semibold text-xs rounded-xl px-3 py-2 h-[38px] focus:outline-none focus:ring-2 focus:ring-brand-emerald-500 cursor-pointer"
          >
            <option value="">All Promotion Types</option>
            <option value="NO_REQUIREMENT">No Requirement</option>
            <option value="MIN_TRANSACTION">Minimum Transaction</option>
            <option value="BUY_ONE_GET_ONE">Buy One Get One (BOGO)</option>
          </select>
        </div>
      )}

      {/* Data Presentation Table View Grid */}
      {isLoading ? (
        <div className="h-64 flex flex-col items-center justify-center gap-3 bg-white rounded-2xl border border-brand-mist-200 shadow-sm">
          <Loader2 className="w-8 h-8 animate-spin text-brand-emerald-700" />
          <p className="text-sm font-medium text-brand-mist-500">
            Syncing Promotion Data...
          </p>
        </div>
      ) : isError ? (
        <div className="h-64 flex flex-col items-center justify-center gap-2 bg-white rounded-2xl border border-brand-mist-200 shadow-sm text-center p-6">
          <AlertCircle className="w-8 h-8 text-red-500" />
          <p className="text-sm font-bold text-brand-mist-800">
            Promotion Synchronization Failed
          </p>
          <p className="text-xs text-brand-mist-400">
            Please verify secure network handshakes or promo engine gateway
            status.
          </p>
        </div>
      ) : !discountResult || discountResult.data.length === 0 ? (
        <div className="h-64 flex items-center justify-center text-center text-sm text-brand-mist-400 bg-white rounded-2xl border border-brand-mist-200 shadow-sm">
          No active markdown architectures recorded matching current parameter
          matrices.
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-brand-mist-200 shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-brand-mist-50/70 border-b border-brand-mist-200 text-xs font-bold text-brand-mist-500 uppercase tracking-wider">
                <th className="p-4">Promotion Targets</th>
                <th className="p-4">Promotion Type</th>
                <th className="p-4">Promo Amount</th>
                <th className="p-4">Eligibility Rules</th>
                <th className="p-4">Validity Period</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-brand-mist-100 text-brand-mist-700">
              {discountResult.data.map((discount) => (
                <tr
                  key={discount.discountId}
                  className="hover:bg-brand-mist-50/40 transition-colors"
                >
                  <td className="p-4 font-medium text-brand-mist-900">
                    <div className="flex items-center gap-2.5">
                      <Tag className="w-4 h-4 text-brand-emerald-600" />
                      <div>
                        {discount.product ? (
                          <>
                            <p className="font-bold text-brand-mist-800">
                              {discount.product.name}
                            </p>
                            <p className="text-xs text-brand-mist-400 mt-0.5">
                              Product-Specific Target Mapping
                            </p>
                          </>
                        ) : (
                          <>
                            <p className="font-bold text-brand-emerald-700">
                              All Distributed Store Products
                            </p>
                            <p className="text-xs text-brand-mist-400 mt-0.5">
                              Global Store Voucher Architecture
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold tracking-wide ${
                        discount.type === "BUY_ONE_GET_ONE"
                          ? "bg-purple-50 text-purple-700 border border-purple-200"
                          : discount.type === "MIN_TRANSACTION"
                            ? "bg-blue-50 text-blue-700 border border-blue-200"
                            : "bg-brand-emerald-50 text-brand-emerald-700 border border-brand-emerald-200"
                      }`}
                    >
                      {discount.type === "BUY_ONE_GET_ONE"
                        ? "BOGO"
                        : discount.type === "MIN_TRANSACTION"
                          ? "Minimal Transaction"
                          : "No Requirement"}
                    </span>
                  </td>
                  <td className="p-4 font-bold text-brand-mist-900">
                    {discount.valueType === "PERCENTAGE"
                      ? `${discount.discountAmount}% Markdown`
                      : `Rp ${Number(discount.discountAmount).toLocaleString("id-ID")}`}
                  </td>
                  <td className="p-4 text-xs space-y-1 text-brand-mist-500 font-medium">
                    {discount.minTransaction && (
                      <div>
                        • Min Transaction: Rp{" "}
                        {Number(discount.minTransaction).toLocaleString(
                          "id-ID",
                        )}
                      </div>
                    )}
                    {discount.maxDiscount && (
                      <div>
                        • Cap Allowance: Rp{" "}
                        {Number(discount.maxDiscount).toLocaleString("id-ID")}
                      </div>
                    )}
                    {!discount.minTransaction && !discount.maxDiscount && (
                      <span className="text-brand-mist-400 font-mono">
                        - None -
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-xs text-brand-mist-500 font-medium space-y-0.5">
                    <div>
                      <span className="text-brand-mist-400 font-bold">
                        Start:
                      </span>{" "}
                      {new Date(discount.validFrom).toLocaleDateString(
                        "en-US",
                        {
                          dateStyle: "medium",
                        },
                      )}
                    </div>
                    <div>
                      <span className="text-brand-mist-400 font-bold">
                        End:
                      </span>{" "}
                      {new Date(discount.validUntil).toLocaleDateString(
                        "en-US",
                        {
                          dateStyle: "medium",
                        },
                      )}
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <button
                      onClick={() => handleDelete(discount.discountId)}
                      disabled={deleteDiscountMutation.isPending}
                      className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      title="Deprecate Rule"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* INTEGRATED BACKEND PAGINATION */}
          <div className="p-3 border-t border-brand-mist-100 bg-brand-mist-50/70 flex items-center justify-between text-xs font-semibold text-brand-mist-500">
            <span>
              Page {discountResult.meta.page} of{" "}
              {discountResult.meta.totalPages} ({discountResult.meta.totalData}{" "}
              records mapped)
            </span>
            <div className="flex gap-1">
              <button
                type="button"
                disabled={page === 1}
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                className="p-1.5 bg-white border border-brand-mist-300 rounded-lg disabled:opacity-40 font-bold flex items-center gap-1 shadow-sm text-brand-mist-700 hover:bg-brand-mist-50 transition"
              >
                <ChevronLeft className="w-4 h-4" /> Prev
              </button>
              <button
                type="button"
                disabled={page >= discountResult.meta.totalPages}
                onClick={() =>
                  setPage((p) =>
                    Math.min(p + 1, discountResult.meta.totalPages),
                  )
                }
                className="p-1.5 bg-white border border-brand-mist-300 rounded-lg disabled:opacity-40 font-bold flex items-center gap-1 shadow-sm text-brand-mist-700 hover:bg-brand-mist-50 transition"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
