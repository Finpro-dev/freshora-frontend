import { CORS_CREDENTIALS } from "../../../../../shared/config/dotenv-config";
import { api } from "../../../../../shared/lib/axios-instance";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// Interface untuk data admin baru yang akan dikirim ke API
interface AddStoreAdminPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  gender: "MALE" | "FEMALE";
}

export function useAddStoreAdmin() {
  const queryClient = useQueryClient();
  const addStoreAdminMutation = useMutation({
    // Menggunakan metode POST untuk membuat data baru
    mutationFn: async (body: AddStoreAdminPayload) => {
      const { data } = await api.post(`/admin/store-admin`, body);
      return data;
    },
    onSuccess: () => {
      // Invalidate query agar daftar user/admin di halaman utama otomatis ter-refresh
      queryClient.invalidateQueries({ queryKey: ["store-admin"] });

      // Jika di halaman list "People" kamu menggunakan query key berbeda (misal: "users"),
      // kamu bisa uncomment baris di bawah ini:
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  return addStoreAdminMutation;
}
