"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useGetDiscounts, useDeleteDiscount } from "./_hooks/use-discount";
import { toast } from "sonner";
import { Loader2, AlertCircle, Trash2 } from "lucide-react";
import PromotionHeader from "./_components/PromotionHeader";
import PromotionFilters from "./_components/PromotionFilters";
import PromotionTable from "./_components/PromotionTable";
import PromotionPagination from "./_components/PromotionPagination";

export default function DiscountManagementPage() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [typeFilter, setTypeFilter] = useState<string>("");

  const currentUser = { role: "SUPER_ADMIN", storeId: null };
  const isSuperAdmin = currentUser?.role === "SUPER_ADMIN";
  const isStoreAdmin = currentUser?.role === "STORE_ADMIN";

  const {
    data: discountResult,
    isLoading,
    isError,
  } = useGetDiscounts({
    page,
    limit: 5,
    status: isStoreAdmin ? undefined : statusFilter || undefined,
    type: isStoreAdmin ? undefined : typeFilter || undefined,
    ...(currentUser?.role === "STORE_OWNER" && {
      storeId: currentUser.storeId || undefined,
    }),
    ...(isStoreAdmin && {
      storeId: currentUser.storeId || undefined,
      createdBy: "STORE_OWNER",
    }),
  });

  const deleteDiscountMutation = useDeleteDiscount();

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

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-brand-emerald-700" />
        <p className="text-sm font-medium text-brand-mist-500">
          Syncing Promotion Data...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-6 max-w-md text-center shadow-sm">
          <p className="font-semibold mb-1">Promotion Synchronization Failed</p>
          <p className="text-sm text-red-600">
            Please verify secure network handshakes or promo engine gateway
            status.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-mist-50/50 p-4 md:p-8 space-y-6 relative">
      <PromotionHeader
        onCreateNew={() => router.push("/dashboard/promotion/add-promotion")}
      />

      {(isSuperAdmin || !isStoreAdmin) && (
        <PromotionFilters
          statusFilter={statusFilter}
          onStatusChange={(v) => {
            setStatusFilter(v);
            setPage(1);
          }}
          typeFilter={typeFilter}
          onTypeChange={(v) => {
            setTypeFilter(v);
            setPage(1);
          }}
        />
      )}

      <PromotionTable
        discounts={discountResult?.data || []}
        onDelete={handleDelete}
        isDeleting={deleteDiscountMutation.isPending}
      />

      {(!discountResult || discountResult.data.length === 0) && (
        <div className="h-64 flex items-center justify-center text-center text-sm text-brand-mist-400 bg-white rounded-2xl border border-brand-mist-200 shadow-sm">
          No active markdown architectures recorded matching current parameter
          matrices.
        </div>
      )}

      {discountResult && discountResult.meta.totalPages > 1 && (
        <PromotionPagination
          currentPage={discountResult.meta.page}
          totalPages={discountResult.meta.totalPages}
          totalData={discountResult.meta.totalData}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}
