"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/shared/store/auth-store/AuthStoreProvider";
import {
  useCreateDiscount,
  useGetProducts,
  useGetStoreStocks,
  DiscountType,
  DiscountValueType,
} from "../_hooks/use-discount";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import CreatePromotionHeader from "./_components/CreatePromotionHeader";
import PromotionTypeSelector from "./_components/PromotionTypeSelector";
import ProductSelector from "./_components/ProductSelector";
import DiscountValueFields from "./_components/DiscountValueFields";
import DateRangePicker from "./_components/DateRangePicker";
import FormActions from "./_components/FormActions";
import ProductModal from "./_components/ProductModal";

export default function CreateDiscountPage() {
  const router = useRouter();
  const role = useAuthStore((state) => state.role);
  const storeId = useAuthStore((state) => state.storeId);

  const isGlobal = role === "SUPER_ADMIN";
  const currentStoreId = storeId;

  const [formData, setFormData] = useState({
    type: "NO_REQUIREMENT" as DiscountType,
    valueType: "PERCENTAGE" as DiscountValueType,
    discountAmount: "",
    minTransaction: "",
    maxDiscount: "",
    validFrom: "",
    validUntil: "",
  });
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [productSearch, setProductSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [productPage, setProductPage] = useState(1);

  const { data: globalProductResponse, isLoading: isLoadingGlobal } =
    useGetProducts({
      page: productPage,
      limit: 5,
      search: productSearch,
      category: categoryFilter === "all" ? undefined : categoryFilter,
      enabled: isGlobal,
    });

  const { data: stockResponse, isLoading: isLoadingStocks } = useGetStoreStocks(
    {
      storeId: currentStoreId || undefined,
      page: productPage,
      limit: 5,
      search: productSearch,
      enabled: !isGlobal && !!currentStoreId,
    },
  );

  const createDiscountMutation = useCreateDiscount();

  if (role === "STORE_ADMIN" && !currentStoreId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-mist-50/50">
        <div className="flex flex-col items-center gap-3 max-w-sm text-center">
          <h2 className="text-lg font-bold text-brand-mist-800">
            Access Denied
          </h2>
          <p className="text-sm text-brand-mist-500">
            Your account is not associated with any store. Please contact
            SUPER_ADMIN.
          </p>
          <button
            type="button"
            onClick={() => router.push("/dashboard")}
            className="mt-4 px-4 py-2 bg-brand-emerald-700 text-white rounded-lg text-sm"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (!role) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-mist-50/50">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="w-8 h-8 animate-spin text-brand-emerald-700" />
          <p className="text-xs text-brand-mist-500 font-medium">
            Loading session...
          </p>
        </div>
      </div>
    );
  }

  const isLoadingProducts = isGlobal ? isLoadingGlobal : isLoadingStocks;

  const productItems = isGlobal
    ? globalProductResponse?.data || []
    : (stockResponse?.data || stockResponse || []).map((item: any) => {
        const productDetails = item?.product || item?.Product;
        if (productDetails) {
          return {
            ...productDetails,
            stockId: item.id || item.stockId,
            currentStock: item.quantity || item.stock,
          };
        }
        return item;
      });

  const totalProductPages = isGlobal
    ? globalProductResponse?.meta?.totalPages ||
      globalProductResponse?.pagination?.totalPages ||
      globalProductResponse?.totalPages ||
      1
    : stockResponse?.meta?.totalPages ||
      stockResponse?.pagination?.totalPages ||
      stockResponse?.totalPages ||
      1;

  const categories = (globalProductResponse?.categories || []).map(
    (cat: any) => ({
      id: cat.productCategoryId as string,
      name: cat.category as string,
    }),
  );

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedType = e.target.value as DiscountType;
    if (selectedType === "BUY_ONE_GET_ONE") {
      setFormData((prev) => ({
        ...prev,
        type: selectedType,
        valueType: "PERCENTAGE",
        discountAmount: "100",
        minTransaction: "",
        maxDiscount: "",
      }));
    } else if (selectedType === "MIN_TRANSACTION") {
      setFormData((prev) => ({ ...prev, type: selectedType }));
      setSelectedProduct(null);
    } else {
      setFormData((prev) => ({ ...prev, type: selectedType }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      type: formData.type,
      valueType: formData.valueType,
      discountAmount: Number(formData.discountAmount),
      productId:
        formData.type === "MIN_TRANSACTION"
          ? null
          : selectedProduct?.productId || selectedProduct?.id || null,
      storeId: isGlobal ? null : storeId || null,
      minTransaction: formData.minTransaction
        ? Number(formData.minTransaction)
        : null,
      maxDiscount: formData.maxDiscount ? Number(formData.maxDiscount) : null,
      validFrom: new Date(formData.validFrom).toISOString(),
      validUntil: new Date(formData.validUntil).toISOString(),
    };

    try {
      await createDiscountMutation.mutateAsync(payload);
      toast.success("Promotion initialized successfully.");
      router.push("/dashboard/promotion");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to initialize discount rule.",
      );
    }
  };

  return (
    <div className="min-h-screen bg-brand-mist-50/50 p-4 md:p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <CreatePromotionHeader
          onBack={() => router.push("/dashboard/promotion")}
          isGlobal={isGlobal}
        />

        <form
          onSubmit={handleSubmit}
          className="bg-brand-mist-100/10 border border-brand-mist-200 rounded-2xl p-6 md:p-8 shadow-sm space-y-6"
        >
          <PromotionTypeSelector
            value={formData.type}
            onChange={handleTypeChange}
          />

          {formData.type !== "MIN_TRANSACTION" && (
            <ProductSelector
              selectedProduct={selectedProduct}
              onSelect={setSelectedProduct}
              onOpenModal={() => setIsProductModalOpen(true)}
            />
          )}

          <DiscountValueFields
            formData={formData}
            onChange={(partial) =>
              setFormData((prev) => ({ ...prev, ...partial }))
            }
          />

          <DateRangePicker
            formData={formData}
            onChange={(partial) =>
              setFormData((prev) => ({ ...prev, ...partial }))
            }
          />

          <FormActions
            onCancel={() => router.push("/dashboard/promotion")}
            isPending={createDiscountMutation.isPending}
            submitLabel="Create Promotion"
          />
        </form>
      </div>

      <ProductModal
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        isGlobal={isGlobal}
        productItems={productItems}
        categories={categories}
        isLoading={isLoadingProducts}
        productSearch={productSearch}
        onSearchChange={(v) => {
          setProductSearch(v);
          setProductPage(1);
        }}
        categoryFilter={categoryFilter}
        onCategoryChange={(v) => {
          setCategoryFilter(v);
          setProductPage(1);
        }}
        productPage={productPage}
        totalProductPages={totalProductPages}
        onPageChange={setProductPage}
        onSelectProduct={(p) => {
          setSelectedProduct(p);
          setIsProductModalOpen(false);
        }}
      />
    </div>
  );
}
