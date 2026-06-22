"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  useGetProductById,
  useUpdateProduct,
  useGetCategoriesMaster,
} from "../_hooks/use-edit-product";
import { ArrowLeft, Save, Loader2 } from "lucide-react";

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();

  // Retrieve productId directly based on your folder name [productId]
  const productId = params.productId as string;

  // Fetching existing data & master categories data
  const { data: product, isLoading: isLoadingProduct } =
    useGetProductById(productId);
  const { data: categoriesData, isLoading: isLoadingCategories } =
    useGetCategoriesMaster();
  const { mutate: updateProduct, isPending: isUpdating } =
    useUpdateProduct(productId);

  // Main Form State
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

  const [selectedImages, setSelectedImages] = useState<FileList | null>(null);
  const [existingPhotos, setExistingPhotos] = useState<{ photoUrl: string }[]>(
    [],
  );

  // Pre-fill form when product data is successfully loaded from the API
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
        // 2. FIXED: Fallback diubah ke "HALAL" seandainya data dari server kosong
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

    // Appending key must match upload.array("product-photos") in your Express backend
    if (selectedImages && selectedImages.length > 0) {
      Array.from(selectedImages).forEach((file) => {
        submitData.append("product-photos", file);
      });
    }

    updateProduct(submitData, {
      onSuccess: () => {
        router.push("/dashboard/product"); // Redirect after success
      },
      onError: (error: any) => {
        console.error("Failed to update product:", error);
      },
    });
  };

  const categories = Array.isArray(categoriesData) ? categoriesData : [];

  // Loading screen while waiting for product data to load
  if (isLoadingProduct) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-brand-mist-600 gap-2">
        <Loader2 className="w-8 h-8 animate-spin text-brand-emerald-700" />
        <p className="text-sm font-medium">Loading product data...</p>
      </div>
    );
  }

  return (
    <div className="min-h-dvh p-4 md:p-6 lg:p-8 max-w-2xl mx-auto">
      {/* Page Header */}
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
            Edit Product
          </h1>
          <p className="text-sm text-brand-mist-500">
            Modify product specifications or update product photos below.
          </p>
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-xl border border-brand-mist-200 shadow-sm overflow-hidden">
        <div className="bg-brand-mist-50 p-6 border-b border-brand-mist-200 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-brand-emerald-100 flex items-center justify-center text-brand-emerald-700">
            <Save className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-semibold text-brand-mist-800">
              Product Specification Details
            </h2>
            <p className="text-xs text-brand-mist-500">
              Modify the required fields.
            </p>
          </div>
        </div>

        {/* Input Fields */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-brand-mist-700 mb-1.5">
              Product Name
            </label>
            <input
              type="text"
              name="name"
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
              value={formData.storageInstructions}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border border-brand-mist-300 focus:outline-none focus:ring-2 focus:ring-brand-emerald-500 text-sm"
            />
          </div>

          {/* Current Images Preview */}
          {existingPhotos.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-brand-mist-700 mb-1.5">
                Current Images
              </label>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {existingPhotos.map((photo, index) => (
                  <div
                    key={index}
                    className="relative w-20 h-20 rounded-lg overflow-hidden border border-brand-mist-200 flex-shrink-0 bg-brand-mist-50"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={photo.photoUrl}
                      alt={`Product ${index}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Image Upload Input */}
          <div>
            <label className="block text-sm font-medium text-brand-mist-700 mb-1.5">
              Upload New Images{" "}
              <span className="text-xs text-brand-mist-400">
                (Optional - will replace current images)
              </span>
            </label>
            <input
              type="file"
              name="product-photos"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="w-full text-sm text-brand-mist-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-brand-emerald-50 file:text-brand-emerald-700 hover:file:bg-brand-emerald-100"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-6 border-t border-brand-mist-200">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-4 py-2 border border-brand-mist-300 rounded-lg text-sm font-medium text-brand-mist-700 hover:bg-brand-mist-50 transition-colors"
              disabled={isUpdating}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUpdating}
              className="flex items-center gap-2 px-4 py-2 bg-brand-emerald-700 text-white rounded-lg hover:bg-brand-emerald-800 transition-colors text-sm font-medium disabled:opacity-50"
            >
              {isUpdating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Saving Changes...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" /> Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
