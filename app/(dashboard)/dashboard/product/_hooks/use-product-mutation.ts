import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CORS_CREDENTIALS } from "../../../../../shared/config/dotenv-config";
import { api } from "../../../../../shared/lib/axios-instance";

export function useAddProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formDataPayload: FormData) => {
      // Menggunakan instance api murni dan base URL dari shared config kamu
      // Selipkan ini tepat sebelum perintah axios.post(...)
      const { data } = await api.post(
        `${CORS_CREDENTIALS.API_BASE_URL}/products/create-product`,
        formDataPayload,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Wajib karena backend pake Multer
          },
        },
      );

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

export function useGetCategoriesMaster() {
  return useQuery({
    queryKey: ["categories-master"],
    queryFn: async () => {
      // Mengikuti pola destructuring { data } seperti useGetUser
      const { data } = await api.get(
        `${CORS_CREDENTIALS.API_BASE_URL}/admin/categories`,
      );

      // Menangani jika backend membungkus response dalam format { data: [...] } atau langsung array
      return data?.data || data;
    },
  });
}
