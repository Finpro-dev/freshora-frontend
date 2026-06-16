"use client";

import { CORS_CREDENTIALS } from "@/shared/config/dotenv-config";
import { api } from "@/shared/lib/axios-instance";
import { useQuery } from "@tanstack/react-query";
import { getIdAndNameLocation } from "../_utils/get-id-and-name-location-util";

export const useGetCity = (province: string) => {
  const { id: provinceId, name: _provinceName } =
    getIdAndNameLocation(province);
  return useQuery({
    queryKey: ["city", province],
    queryFn: async () => {
      const { data } = await api.get(
        `${CORS_CREDENTIALS.API_BASE_URL}/location/city/${provinceId}`,
      );

      return data;
    },
  });
};
