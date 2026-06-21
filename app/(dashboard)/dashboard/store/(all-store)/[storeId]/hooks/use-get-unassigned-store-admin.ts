import { api } from "@/shared/lib/axios-instance";
import { useQuery } from "@tanstack/react-query";

export const useGetUnassignedStoreAdmin = () => {
  const etUnassignedStoreAdminQuery = useQuery({
    queryKey: ["store-admin"],
    queryFn: async () => {
      const { data } = await api.get(`/users/store-admin/unassigned`);

      return data;
    },
  });

  return etUnassignedStoreAdminQuery;
};
