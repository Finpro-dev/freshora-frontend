"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  useAddProduct,
  useGetCategoriesMaster,
} from "../_hooks/use-product-mutation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import AddProductHeader from "./_components/AddProductHeader";
import AddProductForm from "./_components/AddProductForm";
import FormActions from "./_components/FormActions";

interface FormData {
  name: string;
  description: string;
  price: string;
  productCategoryId: string;
  weightPerGram: string;
  unit: string;
  grade: string;
  dietType: string;
  storageInstructions: string;
}

export default function AddProductPage() {
  const router = useRouter();
  const { mutate: addProduct, isPending } = useAddProduct();

  const {
    data: categoriesData,
    isLoading: isLoadingCategories,
    refetch: refetchCategories,
  } = useGetCategoriesMaster();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    price: "",
    productCategoryId: "",
    weightPerGram: "",
    unit: "KG",
    grade: "A",
    dietType: "HALAL",
    storageInstructions: "",
  });

  const [selectedImages, setSelectedImages] = useState<FileList | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImages(e.target.files);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedImages || selectedImages.length === 0) {
      toast.error("Please upload at least one product image.");
      return;
    }

    const submitData = new FormData();
    submitData.append("name", formData.name.trim());
    submitData.append("description", formData.description.trim());
    submitData.append("price", formData.price);
    submitData.append("productCategoryId", formData.productCategoryId);
    submitData.append("weightPerGram", formData.weightPerGram);
    submitData.append("unit", formData.unit);
    submitData.append("grade", formData.grade);
    submitData.append("dietType", formData.dietType);
    submitData.append(
      "storageInstructions",
      formData.storageInstructions.trim(),
    );

    Array.from(selectedImages).forEach((file) => {
      submitData.append("product-photos", file);
    });

    addProduct(submitData, {
      onSuccess: () => {
        toast.success("Product added successfully");
        router.push("/dashboard/product");
      },
      onError: (error: any) => {
        toast.error(
          error?.response?.data?.message || "Failed to create product",
        );
      },
    });
  };

  const categories = Array.isArray(categoriesData) ? categoriesData : [];

  return (
    <div className="min-h-dvh p-4 md:p-6 lg:p-8 max-w-2xl mx-auto">
      <AddProductHeader />
      <form onSubmit={handleSubmit} className="space-y-6">
        <AddProductForm
          formData={formData}
          onChange={handleChange}
          onFileChange={handleFileChange}
          categories={categories}
          isLoadingCategories={isLoadingCategories}
          onRefetchCategories={refetchCategories}
        />
        <FormActions
          onCancel={() => router.back()}
          isPending={isPending}
          submitLabel="Add Product"
        />
      </form>
    </div>
  );
}
