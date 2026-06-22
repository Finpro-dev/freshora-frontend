"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import {
  ArrowLeft,
  FolderPlus,
  Trash2,
  Loader2,
  Layers,
  Edit,
  Check,
  X,
} from "lucide-react";

// 🆕 IMPORT HOOK ASLI YANG SUDAH KITA FIX TADI
import {
  useGetCategories,
  useCreateCategory,
  useUpdateCategory,
  useDeleteCategory,
} from "./_hooks/use-category"; // <-- Sesuaikan path folder hook-mu

export default function CategoryPage() {
  const router = useRouter();
  const [newCategory, setNewCategory] = useState("");

  // State untuk melacak inline editing
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");

  // 🆕 1. AMBIL DATA & MUTATION DARI REACT QUERY
  const { data: categories = [], isLoading: isLoadingCategories } =
    useGetCategories();

  const { mutate: createCategory, isPending: isAdding } = useCreateCategory();
  const { mutate: updateCategory, isPending: isUpdating } = useUpdateCategory();
  const { mutate: deleteCategory, isPending: isDeleting } = useDeleteCategory();

  // 🆕 2. FUNGSI TAMBAH KATEGORI (PROSES SAVE)
  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategory.trim()) return;

    // Menjalankan mutasi ke backend
    createCategory(newCategory, {
      onSuccess: () => {
        setNewCategory(""); // Reset input form jika berhasil
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

  // Fungsi mengaktifkan Mode Edit row tabel
  const startEdit = (id: string, currentName: string) => {
    setEditingId(id);
    setEditName(currentName);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditName("");
  };

  // 🆕 3. FUNGSI UPDATE KATEGORI (PROSES SAVE HASIL EDIT)
  const handleUpdateCategory = async (id: string) => {
    if (!editName.trim()) return;

    // Menjalankan mutasi update ke backend
    updateCategory(
      { id, name: editName },
      {
        onSuccess: () => {
          cancelEdit(); // Keluar dari mode edit jika berhasil
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

  // 🆕 4. FUNGSI DELETE KATEGORI (SWEETALERT2)
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
        // Menjalankan mutasi delete ke backend
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
    <div className="min-h-dvh p-4 md:p-6 lg:p-8 max-w-4xl mx-auto">
      {/* BACK BUTTON & TITLE */}
      <div className="flex items-center gap-3 mb-6">
        <button
          type="button"
          onClick={() => router.push("/dashboard/product")}
          className="p-2 hover:bg-brand-mist-100 rounded-lg transition-colors text-brand-mist-600 flex items-center justify-center border border-brand-mist-200 bg-white shadow-sm"
          title="Back to Products"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-brand-mist-800">
            Product Categories
          </h1>
          <p className="text-sm text-brand-mist-500">
            Manage your store's product classifications and master data.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 1. FORM: TAMBAH KATEGORI BARU */}
        <div className="md:col-span-1 bg-white rounded-xl border border-brand-mist-200 shadow-sm p-5 h-fit">
          <div className="flex items-center gap-2 mb-4 text-brand-emerald-700">
            <FolderPlus className="w-5 h-5" />
            <h2 className="font-semibold text-brand-mist-800 text-sm">
              Add New Category
            </h2>
          </div>

          <form onSubmit={handleAddCategory} className="space-y-3">
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
                className="w-full px-3 py-2 rounded-lg border border-brand-mist-300 focus:outline-none focus:ring-2 focus:ring-brand-emerald-500 text-sm disabled:opacity-60"
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

        {/* 2. TABLE/LIST: DAFTAR KATEGORI YANG ADA */}
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
              categories.map((cat: any) => {
                const categoryId = cat.productCategoryId;
                const categoryName = cat.category; // 🆕 FIXED: Sesuai properti DB 'category'
                const isEditingThis = editingId === categoryId;

                return (
                  <div
                    key={categoryId}
                    className={`flex items-center justify-between p-4 transition-colors ${isEditingThis ? "bg-brand-emerald-50/40" : "hover:bg-brand-mist-25/50"}`}
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
                            disabled={isDeleting || isAdding}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors disabled:opacity-40"
                            title="Edit category"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteCategory(categoryId)}
                            disabled={isDeleting || isAdding}
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
      </div>
    </div>
  );
}
