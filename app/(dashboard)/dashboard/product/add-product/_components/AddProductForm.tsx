"use client";

import { PackagePlus, ExternalLink, RefreshCw } from "lucide-react";

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

interface AddProductFormProps {
  formData: FormData;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  categories: any[];
  isLoadingCategories: boolean;
  onRefetchCategories: () => void;
}

export default function AddProductForm({
  formData,
  onChange,
  onFileChange,
  categories,
  isLoadingCategories,
  onRefetchCategories,
}: AddProductFormProps) {
  return (
    <div className="bg-brand-mist-100/10 rounded-xl border border-brand-mist-200 shadow-sm overflow-hidden">
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

      <div className="p-6 space-y-4">
        {/* Product Name */}
        <div>
          <label className="block text-sm font-medium text-brand-mist-700 mb-1.5">
            Product Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="e.g. Organic Sweet Sunkist"
            value={formData.name}
            onChange={onChange}
            required
            className="input w-full border border-brand-mist-300 text-brand-mist-700 focus:outline-none focus:border-brand-mist-400 text-sm"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-brand-mist-700 mb-1.5">
            Description
          </label>
          <textarea
            name="description"
            placeholder="Provide information about the product..."
            value={formData.description}
            onChange={onChange}
            required
            rows={3}
            className="textarea w-full border border-brand-mist-300 text-brand-mist-700 focus:outline-none focus:border-brand-mist-400 text-sm"
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
              placeholder="e.g. 35000"
              value={formData.price}
              onChange={onChange}
              required
              min="0"
              className="input w-full border border-brand-mist-300 text-brand-mist-700 focus:outline-none focus:border-brand-mist-400 text-sm"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-sm font-medium text-brand-mist-700">
                Category
              </label>
              <a
                href="/dashboard/category"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-brand-emerald-600 hover:text-brand-emerald-700 font-medium flex items-center gap-0.5"
              >
                Manage Categories
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="flex gap-2">
              <select
                name="productCategoryId"
                value={formData.productCategoryId}
                onChange={onChange}
                required
                className="select flex-1 border border-brand-mist-300 text-brand-mist-700 focus:outline-none focus:border-brand-mist-400 text-sm appearance-none pr-10"
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

              <button
                type="button"
                onClick={onRefetchCategories}
                className="px-3 py-2 border border-brand-mist-300 rounded-lg text-brand-mist-500 hover:bg-brand-mist-50 transition-colors flex items-center justify-center flex-shrink-0"
                title="Refresh categories list"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
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
              placeholder="e.g. 1000"
              value={formData.weightPerGram}
              onChange={onChange}
              required
              min="0"
              className="input w-full border border-brand-mist-300 text-brand-mist-700 focus:outline-none focus:border-brand-mist-400 text-sm"
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
              className="select w-full border border-brand-mist-300 text-brand-mist-700 focus:outline-none focus:border-brand-mist-400 text-sm appearance-none pr-10"
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
              className="select w-full border border-brand-mist-300 text-brand-mist-700 focus:outline-none focus:border-brand-mist-400 text-sm appearance-none pr-10"
            >
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
              className="select w-full border border-brand-mist-300 text-brand-mist-700 focus:outline-none focus:border-brand-mist-400 text-sm appearance-none pr-10"
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
            placeholder="e.g. Keep refrigerated below 5°C"
            value={formData.storageInstructions}
            onChange={onChange}
            className="input w-full border border-brand-mist-300 text-brand-mist-700 focus:outline-none focus:border-brand-mist-400 text-sm"
          />
        </div>

        {/* Images */}
        <div>
          <label className="block text-sm font-medium text-brand-mist-700 mb-1.5">
            Product Images
          </label>
          <input
            type="file"
            name="images"
            accept="image/*"
            multiple
            onChange={onFileChange}
            required
            className="file:input file:input-sm file:border-0 file:bg-brand-emerald-50 file:text-brand-emerald-700 hover:file:bg-brand-emerald-100 text-sm text-brand-mist-500 w-full"
          />
        </div>
      </div>
    </div>
  );
}
