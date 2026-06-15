"use client";

import { CORS_CREDENTIALS } from "@/shared/config/dotenv-config";
import { api } from "@/shared/lib/axios-instance";
import { useQuery } from "@tanstack/react-query";

export const useGetProvinces = () => {
  return useQuery({
    queryKey: ["provinces"],
    queryFn: async () => {
      const { data } = await api.get(
        `${CORS_CREDENTIALS.API_BASE_URL}/location/provinces`,
      );

      return data;
    },
  });
};
