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
      const { data } = await api.get(`/admin/categories`);
      return data.data as Category[];
    },
  });
}

// 2. CREATE CATEGORY
export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (categoryName: string) => {
      const { data } = await api.post(`/admin/categories`, {
        category: categoryName,
      });
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
      const { data } = await api.put(`/admin/categories/${id}`, {
        category: name,
      });
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
      const { data } = await api.delete(`/admin/categories/${id}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product-categories"] });
    },
  });
}
