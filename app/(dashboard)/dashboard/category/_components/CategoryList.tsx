"use client";

import { useState } from "react";
import Swal from "sweetalert2";
import { Layers, Loader2, Edit, Check, X, Trash2 } from "lucide-react";
import {
  useGetCategories,
  useUpdateCategory,
  useDeleteCategory,
} from "../_hooks/use-category";
import { Category } from "../_hooks/use-category";

export default function CategoryList() {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");

  const { data: categories = [], isLoading: isLoadingCategories } =
    useGetCategories();

  const { mutate: updateCategory, isPending: isUpdating } = useUpdateCategory();
  const { mutate: deleteCategory, isPending: isDeleting } = useDeleteCategory();

  const startEdit = (id: string, currentName: string) => {
    setEditingId(id);
    setEditName(currentName);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditName("");
  };

  const handleUpdateCategory = async (id: string) => {
    if (!editName.trim()) return;

    updateCategory(
      { id, name: editName },
      {
        onSuccess: () => {
          cancelEdit();
          Swal.fire({
            title: "Updated!",
            text: "Category updated successfully",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });
        },
        onError: (error: any) => {
          Swal.fire(
            "Error",
            error?.response?.data?.message || "Failed to update category",
            "error",
          );
        },
      },
    );
  };

  const handleDeleteCategory = async (categoryId: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to undo this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#009966",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        deleteCategory(categoryId, {
          onSuccess: () => {
            Swal.fire({
              title: "Deleted!",
              text: "Category has been deleted.",
              icon: "success",
              timer: 1500,
              showConfirmButton: false,
            });
          },
          onError: (error: any) => {
            Swal.fire(
              "Error",
              error?.response?.data?.message || "Failed to delete category",
              "error",
            );
          },
        });
      }
    });
  };

  return (
    <div className="md:col-span-2 bg-white rounded-xl border border-brand-mist-200 shadow-sm overflow-hidden">
      <div className="bg-brand-mist-50 p-4 border-b border-brand-mist-200 flex items-center gap-2 text-brand-mist-700">
        <Layers className="w-4 h-4" />
        <h2 className="font-semibold text-sm">Active Master Categories</h2>
      </div>

      <div className="divide-y divide-brand-mist-100 max-h-[400px] overflow-y-auto">
        {isLoadingCategories ? (
          <div className="p-8 flex flex-col items-center justify-center text-brand-mist-400 gap-2">
            <Loader2 className="w-6 h-6 animate-spin text-brand-emerald-600" />
            <span className="text-xs">Loading master categories...</span>
          </div>
        ) : categories.length === 0 ? (
          <div className="p-8 text-center text-sm text-brand-mist-400">
            No categories found. Create one to get started.
          </div>
        ) : (
          categories.map((cat: Category) => {
            const categoryId = cat.productCategoryId;
            const categoryName = cat.category;
            const isEditingThis = editingId === categoryId;

            return (
              <div
                key={categoryId}
                className={`flex items-center justify-between p-4 transition-colors ${
                  isEditingThis
                    ? "bg-brand-emerald-50/40"
                    : "hover:bg-brand-mist-25/50"
                }`}
              >
                {isEditingThis ? (
                  <div className="flex-1 mr-4">
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      disabled={isUpdating}
                      className="w-full px-3 py-1.5 text-sm rounded-lg border border-brand-emerald-500 focus:outline-none bg-white shadow-inner disabled:opacity-60"
                      autoFocus
                    />
                  </div>
                ) : (
                  <div>
                    <p className="font-medium text-brand-mist-800 text-sm">
                      {categoryName}
                    </p>
                    <p className="text-[10px] text-brand-mist-400 font-mono">
                      ID: {categoryId}
                    </p>
                  </div>
                )}

                {/* ACTION BUTTONS */}
                <div className="flex items-center gap-1 flex-shrink-0">
                  {isEditingThis ? (
                    <>
                      <button
                        type="button"
                        onClick={() => handleUpdateCategory(categoryId)}
                        disabled={isUpdating || !editName.trim()}
                        className="p-2 text-brand-emerald-700 hover:bg-brand-emerald-100 rounded-lg transition-colors disabled:opacity-40"
                        title="Save changes"
                      >
                        {isUpdating ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Check className="w-4 h-4" />
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={cancelEdit}
                        disabled={isUpdating}
                        className="p-2 text-brand-mist-500 hover:bg-brand-mist-100 rounded-lg transition-colors"
                        title="Cancel edit"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={() => startEdit(categoryId, categoryName)}
                        disabled={isDeleting}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors disabled:opacity-40"
                        title="Edit category"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteCategory(categoryId)}
                        disabled={isDeleting}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-40"
                        title="Delete category"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
