"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  useGetProductById,
  useUpdateProduct,
  useGetCategoriesMaster,
} from "../_hooks/use-edit-product";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import EditProductHeader from "./_components/EditProductHeader";
import EditProductForm from "./_components/EditProductForm";
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

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params.productId as string;

  const { data: product, isLoading: isLoadingProduct } =
    useGetProductById(productId);
  const { data: categoriesData, isLoading: isLoadingCategories } =
    useGetCategoriesMaster();
  const { mutate: updateProduct, isPending: isUpdating } =
    useUpdateProduct(productId);

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
  const [existingPhotos, setExistingPhotos] = useState<{ photoUrl: string }[]>(
    [],
  );

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        description: product.description || "",
        price: product.price ? String(product.price) : "",
        productCategoryId: product.productCategoryId || "",
        weightPerGram: product.weightPerGram
          ? String(product.weightPerGram)
          : "",
        unit: product.unit || "KG",
        grade: product.grade || "A",
        dietType: product.dietType || "HALAL",
        storageInstructions: product.storageInstructions || "",
      });
      if (product.productPhotos) {
        setExistingPhotos(product.productPhotos);
      }
    }
  }, [product]);

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

    if (selectedImages && selectedImages.length > 0) {
      Array.from(selectedImages).forEach((file) => {
        submitData.append("product-photos", file);
      });
    }

    updateProduct(submitData, {
      onSuccess: () => {
        toast.success("Product updated successfully");
        router.push("/dashboard/product");
      },
      onError: (error: any) => {
        toast.error(
          error?.response?.data?.message || "Failed to update product",
        );
      },
    });
  };

  const handleCancel = () => router.back();

  if (isLoadingProduct) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-brand-emerald-700" />
        <p className="text-sm font-medium text-brand-mist-500">
          Loading product data...
        </p>
      </div>
    );
  }

  const categories = Array.isArray(categoriesData) ? categoriesData : [];

  return (
    <div className="min-h-dvh p-4 md:p-6 lg:p-8 max-w-2xl mx-auto">
      <EditProductHeader />
      <form onSubmit={handleSubmit} className="space-y-6">
        <EditProductForm
          formData={formData}
          onChange={handleChange}
          onFileChange={handleFileChange}
          existingPhotos={existingPhotos}
          categories={categories}
          isLoadingCategories={isLoadingCategories}
        />
        <FormActions
          onCancel={handleCancel}
          isPending={isUpdating}
          submitLabel="Save Changes"
        />
      </form>
    </div>
  );
}
