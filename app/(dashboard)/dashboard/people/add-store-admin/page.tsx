"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAddStoreAdmin } from "../_hooks/use-add-store-admin";
import { ArrowLeft, UserPlus, Loader2 } from "lucide-react";

export default function AddStoreAdminPage() {
  const router = useRouter();
  const { mutate: addStoreAdmin, isPending } = useAddStoreAdmin();

  // Initial State untuk Form Data Baru
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "MALE" as "MALE" | "FEMALE",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Sesuaikan payload, jika phone kosong kirim null sesuai tipe data di hook
    const payload = {
      ...formData,
      phone: formData.phone.trim() === "" ? null : formData.phone,
    };

    addStoreAdmin(payload, {
      onSuccess: () => {
        // Kembali ke halaman people setelah sukses membuat admin baru
        router.push("/dashboard/people");
      },
      onError: (error: any) => {
        console.error("Error creating store admin:", error);
        // Kamu bisa tambahkan toast notification di sini jika ada
      },
    });
  };

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
            Add New Store Admin
          </h1>
          <p className="text-sm text-brand-mist-500">
            Create a new administrator account to manage store operations and
            permissions.
          </p>
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-xl border border-brand-mist-200 shadow-sm overflow-hidden">
        {/* Decorative Header */}
        <div className="bg-brand-mist-50 p-6 border-b border-brand-mist-200 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-brand-emerald-100 flex items-center justify-center text-brand-emerald-700">
            <UserPlus className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-semibold text-brand-mist-800">
              Admin Account Details
            </h2>
            <p className="text-xs text-brand-mist-500">
              All fields except phone number are required.
            </p>
          </div>
        </div>

        {/* Form Fields */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-brand-mist-700 mb-1.5">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                placeholder="e.g. Novpa"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 rounded-lg border border-brand-mist-300 focus:outline-none focus:ring-2 focus:ring-brand-emerald-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-mist-700 mb-1.5">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                placeholder="e.g. Rodriguez"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 rounded-lg border border-brand-mist-300 focus:outline-none focus:ring-2 focus:ring-brand-emerald-500 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-brand-mist-700 mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="e.g. admin@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 rounded-lg border border-brand-mist-300 focus:outline-none focus:ring-2 focus:ring-brand-emerald-500 text-sm"
            />
            <p className="text-xs text-brand-mist-400 mt-1">
              An invitation or verification link will be sent to this email.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-brand-mist-700 mb-1.5">
              Phone Number{" "}
              <span className="text-brand-mist-400 font-normal">
                (Optional)
              </span>
            </label>
            <input
              type="text"
              name="phone"
              placeholder="e.g. 08123456789"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border border-brand-mist-300 focus:outline-none focus:ring-2 focus:ring-brand-emerald-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-brand-mist-700 mb-1.5">
              Gender
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border border-brand-mist-300 focus:outline-none focus:ring-2 focus:ring-brand-emerald-500 text-sm bg-white"
            >
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-6 border-t border-brand-mist-200 heavy-top-margin">
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
                  <Loader2 className="w-4 h-4 animate-spin" /> Adding Admin...
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4" /> Add Store Admin
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
