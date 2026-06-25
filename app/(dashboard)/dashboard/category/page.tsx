"use client";

import CategoryHeader from "./_components/CategoryHeader";
import AddCategoryForm from "./_components/AddCategoryForm";
import CategoryList from "./_components/CategoryList";
export default function CategoryPage() {
  return (
    <div className="min-h-dvh p-4 md:p-6 lg:p-8 max-w-4xl mx-auto">
      <CategoryHeader />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AddCategoryForm />
        <CategoryList />
      </div>
    </div>
  );
}
