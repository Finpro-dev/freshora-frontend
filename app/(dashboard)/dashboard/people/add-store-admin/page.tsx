"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAddStoreAdmin } from "../_hooks/use-add-store-admin";
import { toast } from "sonner";
import { UserPlus, Loader2 } from "lucide-react";
import AddAdminHeader from "./_components/AddAdminHeader";
import AdminFormFields from "./_components/AdminFormFields";
import AdminFormActions from "./_components/AdminFormActions";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: "MALE" | "FEMALE";
}

export default function AddStoreAdminPage() {
  const router = useRouter();
  const { mutate: addStoreAdmin, isPending } = useAddStoreAdmin();

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "MALE",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }) as FormData);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ...formData,
      phone: formData.phone.trim() === "" ? null : formData.phone,
    };

    addStoreAdmin(payload, {
      onSuccess: () => {
        toast.success("Store admin added successfully");
        router.push("/dashboard/people");
      },
      onError: (error: any) => {
        toast.error(
          error?.response?.data?.message || "Failed to create store admin",
        );
      },
    });
  };

  return (
    <div className="min-h-dvh p-4 md:p-6 lg:p-8 max-w-2xl mx-auto">
      <AddAdminHeader />
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-xl border border-brand-mist-200 shadow-sm overflow-hidden">
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

          <div className="p-6 space-y-4">
            <AdminFormFields
              formData={formData}
              onChange={handleChange}
              isEdit={false}
            />
            <AdminFormActions
              onCancel={() => router.push("/dashboard/people")}
              isPending={isPending}
              submitLabel="Add Store Admin"
            />
          </div>
        </div>
      </form>
    </div>
  );
}
