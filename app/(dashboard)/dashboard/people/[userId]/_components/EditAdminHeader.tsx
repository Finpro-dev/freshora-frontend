"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function EditAdminHeader() {
  const router = useRouter();

  return (
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
          Edit Store Admin
        </h1>
        <p className="text-sm text-brand-mist-500">
          Update profile details and information for this administrator.
        </p>
      </div>
    </div>
  );
}
