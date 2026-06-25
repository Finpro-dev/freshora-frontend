"use client";

import { Image as ImageIcon } from "lucide-react";

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

interface EditProductFormProps {
  formData: FormData;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  existingPhotos: { photoUrl: string }[];
  categories: any[];
  isLoadingCategories: boolean;
}

export default function EditProductForm({
  formData,
  onChange,
  onFileChange,
  existingPhotos,
  categories,
  isLoadingCategories,
}: EditProductFormProps) {
  return (
    <div className="bg-white rounded-xl border border-brand-mist-200 shadow-sm overflow-hidden">
      <div className="bg-brand-mist-50 p-6 border-b border-brand-mist-200 flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-brand-emerald-100 flex items-center justify-center text-brand-emerald-700">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
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

      <div className="p-6 space-y-4">
        {/* Product Name */}
        <div>
          <label className="block text-sm font-medium text-brand-mist-700 mb-1.5">
            Product Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={onChange}
            required
            className="w-full px-3 py-2 rounded-lg border border-brand-mist-300 focus:outline-none focus:ring-2 focus:ring-brand-emerald-500 text-sm"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-brand-mist-700 mb-1.5">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={onChange}
            required
            rows={3}
            className="w-full px-3 py-2 rounded-lg border border-brand-mist-300 focus:outline-none focus:ring-2 focus:ring-brand-emerald-500 text-sm"
          />
        </div>

        {/* Price & Category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-brand-mist-700 mb-1.5">
              Price (IDR)
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={onChange}
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
              onChange={onChange}
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

        {/* Weight & Diet Type */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-brand-mist-700 mb-1.5">
              Weight (per Gram)
            </label>
            <input
              type="number"
              name="weightPerGram"
              value={formData.weightPerGram}
              onChange={onChange}
              required
              min="0"
              className="w-full px-3 py-2 rounded-lg border border-brand-mist-300 focus:outline-none focus:ring-2 focus:ring-brand-emerald-500 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-mist-700 mb-1.5">
              Diet Type
            </label>
            <select
              name="dietType"
              value={formData.dietType}
              onChange={onChange}
              className="w-full px-3 py-2 rounded-lg border border-brand-mist-300 focus:outline-none focus:ring-2 focus:ring-brand-emerald-500 text-sm bg-white"
            >
              <option value="HALAL">Halal</option>
              <option value="VEGAN">Vegan</option>
              <option value="VEGETARIAN">Vegetarian</option>
              <option value="GLUTEN_FREE">Gluten Free</option>
            </select>
          </div>
        </div>

        {/* Unit & Grade */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-brand-mist-700 mb-1.5">
              Unit Measurements
            </label>
            <select
              name="unit"
              value={formData.unit}
              onChange={onChange}
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
              onChange={onChange}
              className="w-full px-3 py-2 rounded-lg border border-brand-mist-300 focus:outline-none focus:ring-2 focus:ring-brand-emerald-500 text-sm bg-white"
            >
              <option value="A">Grade A</option>
              <option value="B">Grade B</option>
              <option value="C">Grade C</option>
            </select>
          </div>
        </div>

        {/* Storage Instructions */}
        <div>
          <label className="block text-sm font-medium text-brand-mist-700 mb-1.5">
            Storage Instructions
          </label>
          <input
            type="text"
            name="storageInstructions"
            value={formData.storageInstructions}
            onChange={onChange}
            className="w-full px-3 py-2 rounded-lg border border-brand-mist-300 focus:outline-none focus:ring-2 focus:ring-brand-emerald-500 text-sm"
          />
        </div>

        {/* Current Images */}
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

        {/* Upload New Images */}
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
            onChange={onFileChange}
            className="w-full text-sm text-brand-mist-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-brand-emerald-50 file:text-brand-emerald-700 hover:file:bg-brand-emerald-100"
          />
        </div>
      </div>
    </div>
  );
}
