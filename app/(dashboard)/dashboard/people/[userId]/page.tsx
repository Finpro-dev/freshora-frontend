"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useGetStoreAdminById } from "../_hooks/use-get-store-admin-by-id";
import { useUpdateStoreAdmin } from "../_hooks/use-update-store-admin";
import { ArrowLeft, Save, Loader2 } from "lucide-react";

export default function EditStoreAdmin() {
  const { userId } = useParams();
  const router = useRouter();

  // Hooks Data Fetching & Mutation
  const { data: storeAdmin, isLoading: isFetching } = useGetStoreAdminById(
    String(userId),
  );
  const { mutate: updateStoreAdmin, isPending: isUpdating } =
    useUpdateStoreAdmin();

  const storeAdminData = storeAdmin?.data;

  // Form States
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "MALE",
  });

  // Sinkronisasi data dari API ke State Form setelah fetch selesai
  useEffect(() => {
    if (storeAdminData) {
      setFormData({
        firstName: storeAdminData.firstName || "",
        lastName: storeAdminData.lastName || "",
        email: storeAdminData.email || "",
        phone: storeAdminData.phone || "",
        gender: storeAdminData.gender || "MALE",
      });
    }
  }, [storeAdminData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Panggil hook update data
    updateStoreAdmin(
      { userId: String(userId), ...formData },
      {
        onSuccess: () => {
          // Redirect balik ke halaman users setelah sukses
          router.push("/dashboard/people");
        },
      },
    );
  };

  if (isFetching) {
    return (
      <div className="min-h-dvh flex flex-col items-center justify-center gap-2">
        <Loader2 className="w-8 h-8 animate-spin text-brand-emerald-700" />
        <p className="text-sm text-brand-mist-500">Loading admin data...</p>
      </div>
    );
  }

  return (
    <div className="min-h-dvh p-4 md:p-6 lg:p-8 max-w-2xl mx-auto">
      {/* Back Button & Title */}
      <div className="flex items-center gap-3 mb-6">
        <button
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

      {/* Form Card */}
      <div className="bg-white rounded-xl border border-brand-mist-200 shadow-sm overflow-hidden">
        {/* Profile Quick View Header */}
        <div className="bg-brand-mist-50 p-6 border-b border-brand-mist-200 flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-brand-emerald-100 flex items-center justify-center overflow-hidden border border-brand-mist-200">
            {storeAdminData?.avatar ? (
              <img
                src={storeAdminData.avatar}
                alt={formData.firstName}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-lg font-bold text-brand-emerald-700">
                {(formData.firstName?.[0] || "") +
                  (formData.lastName?.[0] || "")}
              </span>
            )}
          </div>
          <div>
            <h2 className="font-semibold text-brand-mist-800">
              {storeAdminData?.firstName} {storeAdminData?.lastName}
            </h2>
            <p className="text-xs text-brand-emerald-700 font-medium bg-brand-emerald-50 px-2 py-0.5 rounded-full inline-block mt-0.5">
              {storeAdminData?.role?.replace("_", " ")}
            </p>
          </div>
        </div>

        {/* Input Fields */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-brand-mist-700 mb-1.5">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
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
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 rounded-lg border border-brand-mist-300 focus:outline-none focus:ring-2 focus:ring-brand-emerald-500 text-sm bg-brand-mist-50 text-brand-mist-500 cursor-not-allowed"
              disabled // Email biasanya dikunci agar tidak merusak auth / referral unik
            />
            <p className="text-xs text-brand-mist-400 mt-1">
              Email cannot be changed.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-brand-mist-700 mb-1.5">
              Phone Number
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

          {/* Metadata Readonly */}
          <div className="pt-4 border-t border-brand-mist-100 grid grid-cols-2 gap-4 text-xs text-brand-mist-500">
            <div>
              <span className="block font-medium">Referral Code:</span>
              <span className="font-mono text-brand-mist-700">
                {storeAdminData?.myReferralCode || "-"}
              </span>
            </div>
            <div>
              <span className="block font-medium">Verification Status:</span>
              <span
                className={
                  storeAdminData?.isVerified
                    ? "text-emerald-600 font-semibold"
                    : "text-red-600 font-semibold"
                }
              >
                {storeAdminData?.isVerified ? "Verified" : "Unverified"}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-brand-mist-200">
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
                  <Loader2 className="w-4 h-4 animate-spin" /> Saving...
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
