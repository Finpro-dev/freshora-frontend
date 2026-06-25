import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CORS_CREDENTIALS } from "../../../../../shared/config/dotenv-config";
import { api } from "../../../../../shared/lib/axios-instance";

// Hook untuk mengambil 1 data produk berdasarkan productId (untuk pre-fill form)
export function useGetProductById(productId: string) {
  return useQuery({
    queryKey: ["product", productId],
    queryFn: async () => {
      if (!productId) return null;
      const { data } = await api.get(
        `${CORS_CREDENTIALS.API_BASE_URL}/products/${productId}`,
      );
      return data?.data || data;
    },
    enabled: !!productId, // Query hanya berjalan jika productId valid
  });
}

// Hook untuk memproses update data produk (PUT)
export function useUpdateProduct(productId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formDataPayload: FormData) => {
      // Disinkronkan dengan route backend: /products/update/:productId
      const { data } = await api.put(
        `${CORS_CREDENTIALS.API_BASE_URL}/products/update/${productId}`,
        formDataPayload,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Wajib untuk upload file Multer
          },
        },
      );
      return data;
    },
    onSuccess: () => {
      // Membersihkan cache agar halaman list produk & detail produk otomatis ter-refresh
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["product", productId] });
    },
  });
}

// Hook master kategori untuk dropdown select
export function useGetCategoriesMaster() {
  return useQuery({
    queryKey: ["categories-master"],
    queryFn: async () => {
      const { data } = await api.get(
        `${CORS_CREDENTIALS.API_BASE_URL}/admin/categories`,
      );
      return data?.data || data;
    },
  });
}
