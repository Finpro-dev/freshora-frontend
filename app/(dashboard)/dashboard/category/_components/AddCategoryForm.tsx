"use client";

import { useState } from "react";
import Swal from "sweetalert2";
import { FolderPlus, Loader2 } from "lucide-react";
import { useCreateCategory } from "../_hooks/use-category";

export default function AddCategoryForm() {
  const [newCategory, setNewCategory] = useState("");
  const { mutate: createCategory, isPending: isAdding } = useCreateCategory();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategory.trim()) return;

    createCategory(newCategory, {
      onSuccess: () => {
        setNewCategory("");
        Swal.fire({
          title: "Success!",
          text: "Category created successfully",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      },
      onError: (error: any) => {
        Swal.fire(
          "Error",
          error?.response?.data?.message || "Failed to create category",
          "error",
        );
      },
    });
  };

  return (
    <div className="md:col-span-1 bg-brand-mist-100/10 rounded-xl border border-brand-mist-200 shadow-sm p-5 h-fit">
      <div className="flex items-center gap-2 mb-4 text-brand-emerald-700">
        <FolderPlus className="w-5 h-5" />
        <h2 className="font-semibold text-brand-mist-800 text-sm">
          Add New Category
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-xs font-medium text-brand-mist-600 mb-1">
            Category Name
          </label>
          <input
            type="text"
            placeholder="e.g. Fresh Fruits"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            required
            disabled={isAdding}
            className="input w-full border border-brand-mist-300 text-brand-mist-700 focus:outline-none focus:border-brand-mist-400 text-sm disabled:opacity-60"
          />
        </div>

        <button
          type="submit"
          disabled={isAdding || !newCategory.trim()}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-brand-emerald-700 text-white rounded-lg hover:bg-brand-emerald-800 transition-colors text-sm font-medium disabled:opacity-50"
        >
          {isAdding ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Saving...
            </>
          ) : (
            "Save Category"
          )}
        </button>
      </form>
    </div>
  );
}
