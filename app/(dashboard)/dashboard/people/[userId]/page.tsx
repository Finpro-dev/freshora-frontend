"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useGetStoreAdminById } from "../_hooks/use-get-store-admin-by-id";
import { useUpdateStoreAdmin } from "../_hooks/use-update-store-admin";
import { toast } from "sonner";
import { Loader2, Save } from "lucide-react";
import EditAdminHeader from "./_components/EditAdminHeader";
import AdminFormFields from "./_components/AdminFormFields";
import AdminFormActions from "./_components/AdminFormActions";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: "MALE" | "FEMALE";
}

export default function EditStoreAdmin() {
  const params = useParams();
  const router = useRouter();
  const userId = String(params.userId);

  const { data: storeAdmin, isLoading: isFetching } =
    useGetStoreAdminById(userId);
  const { mutate: updateStoreAdmin, isPending: isUpdating } =
    useUpdateStoreAdmin();
  const storeAdminData = storeAdmin?.data;

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "MALE",
  });

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
    setFormData((prev) => ({ ...prev, [name]: value }) as FormData);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateStoreAdmin(
      { userId, ...formData },
      {
        onSuccess: () => {
          toast.success("Store admin updated successfully");
          router.push("/dashboard/people");
        },
        onError: (error: any) => {
          toast.error(
            error?.response?.data?.message || "Failed to update store admin",
          );
        },
      },
    );
  };

  if (isFetching) {
    return (
      <div className="min-h-dvh flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-brand-emerald-700" />
        <p className="text-sm text-brand-mist-500">Loading admin data...</p>
      </div>
    );
  }

  if (!storeAdminData) {
    return (
      <div className="min-h-dvh flex flex-col items-center justify-center gap-3">
        <p className="text-sm text-red-500 font-medium">
          Store admin not found
        </p>
        <button
          onClick={() => router.push("/dashboard/people")}
          className="px-4 py-2 bg-brand-mist-800 text-white rounded-lg text-sm"
        >
          Back to People
        </button>
      </div>
    );
  }

  const fullName = `${formData.firstName} ${formData.lastName}`.trim();
  const initials =
    `${formData.firstName?.[0] || ""}${formData.lastName?.[0] || ""}`.toUpperCase();

  return (
    <div className="min-h-dvh p-4 md:p-6 lg:p-8 max-w-2xl mx-auto">
      <EditAdminHeader />
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Profile Quick View */}
        <div className="bg-white rounded-xl border border-brand-mist-200 shadow-sm overflow-hidden">
          <div className="bg-brand-mist-50 p-6 border-b border-brand-mist-200 flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-brand-emerald-100 flex items-center justify-center overflow-hidden border border-brand-mist-200">
              {storeAdminData.avatar ? (
                <img
                  src={storeAdminData.avatar}
                  alt={fullName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-lg font-bold text-brand-emerald-700">
                  {initials || "U"}
                </span>
              )}
            </div>
            <div>
              <h2 className="font-semibold text-brand-mist-800">
                {storeAdminData.firstName} {storeAdminData.lastName}
              </h2>
              <p className="text-xs text-brand-emerald-700 font-medium bg-brand-emerald-50 px-2 py-0.5 rounded-full inline-block mt-0.5">
                {storeAdminData.role?.replace("_", " ")}
              </p>
            </div>
          </div>

          <div className="p-6 space-y-4">
            <AdminFormFields formData={formData} onChange={handleChange} />
            <AdminFormActions
              onCancel={() => router.push("/dashboard/people")}
              isPending={isUpdating}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
