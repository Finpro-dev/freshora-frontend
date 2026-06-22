import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { CORS_CREDENTIALS } from "../../../../../shared/config/dotenv-config";
import { api } from "../../../../../shared/lib/axios-instance";

export interface Category {
  productCategoryId: string;
  category: string;
}

// 1. GET ALL CATEGORIES
export function useGetCategories() {
  return useQuery({
    queryKey: ["product-categories"],
    queryFn: async () => {
      const { data } = await api.get(
        `${CORS_CREDENTIALS.API_BASE_URL}/admin/categories`, // 🆕 UPDATED: Jalur baru lewat admin
      );
      return data.data as Category[];
    },
  });
}

// 2. CREATE CATEGORY
export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (categoryName: string) => {
      const { data } = await api.post(
        `${CORS_CREDENTIALS.API_BASE_URL}/admin/categories`, // 🆕 UPDATED: Jalur baru lewat admin
        { category: categoryName },
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product-categories"] });
    },
  });
}

// 3. UPDATE CATEGORY
export function useUpdateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, name }: { id: string; name: string }) => {
      const { data } = await api.put(
        `${CORS_CREDENTIALS.API_BASE_URL}/admin/categories/${id}`, // 🆕 UPDATED: Jalur baru lewat admin
        { category: name },
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product-categories"] });
    },
  });
}

// 4. DELETE CATEGORY
export function useDeleteCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await api.delete(
        `${CORS_CREDENTIALS.API_BASE_URL}/admin/categories/${id}`, // 🆕 UPDATED: Jalur baru lewat admin
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product-categories"] });
    },
  });
}
