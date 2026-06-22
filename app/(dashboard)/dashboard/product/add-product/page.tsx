"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  useAddProduct,
  useGetCategoriesMaster,
} from "../_hooks/use-product-mutation";
import { ArrowLeft, PackagePlus, Loader2 } from "lucide-react";

export default function AddProductPage() {
  const router = useRouter();
  const { mutate: addProduct, isPending } = useAddProduct();
  const { data: categoriesData, isLoading: isLoadingCategories } =
    useGetCategoriesMaster();

  // 1. FIXED: dietType diubah default-nya ke "HALAL" (karena "DEFAULT" tidak ada di Prisma)
  const [formData, setFormData] = useState({
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

  // State khusus menampung file gambar (tetap menggunakan FileList sesuai kodemu)
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
      alert("Please upload at least one product image.");
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
        router.push("/dashboard/product");
      },
      onError: (error: any) => {
        console.error("Error creating product:", error);
      },
    });
  };

  const categories = Array.isArray(categoriesData) ? categoriesData : [];

  return (
    <div className="min-h-dvh p-4 md:p-6 lg:p-8 max-w-2xl mx-auto">
      {/* Back Button & Title */}
      <div className="flex items-center gap-3 mb-6">
        <button
          type="button"
          onClick={() => router.back()}
          className="p-2 hover:bg-brand-mist-100 rounded-lg transition-colors text-brand-mist-600"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-brand-mist-800">
            Add New Product
          </h1>
          <p className="text-sm text-brand-mist-500">
            Create a new item configuration. Serial number will be
            auto-generated.
          </p>
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-xl border border-brand-mist-200 shadow-sm overflow-hidden">
        <div className="bg-brand-mist-50 p-6 border-b border-brand-mist-200 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-brand-emerald-100 flex items-center justify-center text-brand-emerald-700">
            <PackagePlus className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-semibold text-brand-mist-800">
              Product Specification Details
            </h2>
            <p className="text-xs text-brand-mist-500">
              Fill all required information to publish this item.
            </p>
          </div>
        </div>

        {/* Form Fields */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-brand-mist-700 mb-1.5">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="e.g. Organic Sweet Sunkist"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 rounded-lg border border-brand-mist-300 focus:outline-none focus:ring-2 focus:ring-brand-emerald-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-brand-mist-700 mb-1.5">
              Description
            </label>
            <textarea
              name="description"
              placeholder="Provide information about the product..."
              value={formData.description}
              onChange={handleChange}
              required
              rows={3}
              className="w-full px-3 py-2 rounded-lg border border-brand-mist-300 focus:outline-none focus:ring-2 focus:ring-brand-emerald-500 text-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-brand-mist-700 mb-1.5">
                Price (IDR)
              </label>
              <input
                type="number"
                name="price"
                placeholder="e.g. 35000"
                value={formData.price}
                onChange={handleChange}
                required
                min="0"
                className="w-full px-3 py-2 rounded-lg border border-brand-mist-300 focus:outline-none focus:ring-2 focus:ring-brand-emerald-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-mist-700 mb-1.5">
                Category
              </label>
              <select
                name="productCategoryId"
                value={formData.productCategoryId}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 rounded-lg border border-brand-mist-300 focus:outline-none focus:ring-2 focus:ring-brand-emerald-500 text-sm bg-white"
              >
                <option value="">Select a category</option>
                {isLoadingCategories ? (
                  <option disabled>Loading categories...</option>
                ) : (
                  categories.map((cat: any) => (
                    <option
                      key={cat.productCategoryId}
                      value={cat.productCategoryId}
                    >
                      {cat.category || cat.name}
                    </option>
                  ))
                )}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-brand-mist-700 mb-1.5">
                Weight (per Gram)
              </label>
              <input
                type="number"
                name="weightPerGram"
                placeholder="e.g. 1000"
                value={formData.weightPerGram}
                onChange={handleChange}
                required
                min="0"
                className="w-full px-3 py-2 rounded-lg border border-brand-mist-300 focus:outline-none focus:ring-2 focus:ring-brand-emerald-500 text-sm"
              />
            </div>
            {/* 3. FIXED: Dropdown Diet Type disesuaikan penuh dengan isi Enum Prisma kamu */}
            <div>
              <label className="block text-sm font-medium text-brand-mist-700 mb-1.5">
                Diet Type
              </label>
              <select
                name="dietType"
                value={formData.dietType}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg border border-brand-mist-300 focus:outline-none focus:ring-2 focus:ring-brand-emerald-500 text-sm bg-white"
              >
                <option value="HALAL">Halal</option>
                <option value="VEGAN">Vegan</option>
                <option value="VEGETARIAN">Vegetarian</option>
                <option value="GLUTEN_FREE">Gluten Free</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-brand-mist-700 mb-1.5">
                Unit Measurements
              </label>
              <select
                name="unit"
                value={formData.unit}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg border border-brand-mist-300 focus:outline-none focus:ring-2 focus:ring-brand-emerald-500 text-sm bg-white"
              >
                <option value="KG">KG (Kilogram)</option>
                <option value="G">G (Gram)</option>
                <option value="PCS">PCS (Pieces)</option>
                <option value="PACK">PACK (Package)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-mist-700 mb-1.5">
                Quality Grade
              </label>
              <select
                name="grade"
                value={formData.grade}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg border border-brand-mist-300 focus:outline-none focus:ring-2 focus:ring-brand-emerald-500 text-sm bg-white"
              >
                <option value="A">Grade A</option>
                <option value="B">Grade B</option>
                <option value="C">Grade C</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-brand-mist-700 mb-1.5">
              Storage Instructions
            </label>
            <input
              type="text"
              name="storageInstructions"
              placeholder="e.g. Keep refrigerated below 5°C"
              value={formData.storageInstructions}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border border-brand-mist-300 focus:outline-none focus:ring-2 focus:ring-brand-emerald-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-brand-mist-700 mb-1.5">
              Product Images
            </label>
            <input
              type="file"
              name="images"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              required
              className="w-full text-sm text-brand-mist-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-brand-emerald-50 file:text-brand-emerald-700 hover:file:bg-brand-emerald-100"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-6 border-t border-brand-mist-200">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-4 py-2 border border-brand-mist-300 rounded-lg text-sm font-medium text-brand-mist-700 hover:bg-brand-mist-50 transition-colors"
              disabled={isPending}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="flex items-center gap-2 px-4 py-2 bg-brand-emerald-700 text-white rounded-lg hover:bg-brand-emerald-800 transition-colors text-sm font-medium disabled:opacity-50"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Adding Product...
                </>
              ) : (
                <>
                  <PackagePlus className="w-4 h-4" /> Add Product
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
