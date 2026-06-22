import { useQuery } from "@tanstack/react-query";
import { CORS_CREDENTIALS } from "../../../../../shared/config/dotenv-config";
import { api } from "../../../../../shared/lib/axios-instance";

// 1. Definisikan tipe data parameter yang diterima dari frontend
interface UseGetAllProductsParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
}

export function useGetAllProducts(params?: UseGetAllProductsParams) {
  return useQuery({
    // 2. Masukkan params ke queryKey agar TanStack Query otomatis fetch ulang jika ada filter berubah
    queryKey: ["products", params],

    queryFn: async () => {
      // 3. PROSES PEMBERSIHAN (Sanitization)
      // Ini akan menyaring objek params dan membuang key yang nilainya "", "all", atau undefined
      const cleanParams = Object.fromEntries(
        Object.entries(params || {}).filter(([_, value]) => {
          return value !== undefined && value !== "" && value !== "all";
        }),
      );

      // 4. Lakukan hit ke API menggunakan Axios dengan params yang sudah bersih
      const { data } = await api.get(
        `${CORS_CREDENTIALS.API_BASE_URL}/products/`,
        {
          params: cleanParams, // Axios otomatis mengubah objek ini menjadi ?page=1&limit=10 dst.
        },
      );

      return data;
    },
  });
}
